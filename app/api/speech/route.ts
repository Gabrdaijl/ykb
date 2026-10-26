import {env} from "cloudflare:workers";
import {getChatGPTUser} from "../../chatgpt-auth";


type SpeechEnv={ELEVENLABS_API_KEY?:string;DB:D1Database};
const ADAM_VOICE_ID="x0u3EW21dbrORJzOq1m9";
const ADAM_VOICE_NAME="Adam Composer - Resonant and Smooth";
const config=()=>env as unknown as SpeechEnv;

export async function GET(){const e=config();return Response.json({configured:!!e.ELEVENLABS_API_KEY,provider:"ElevenLabs",voice:ADAM_VOICE_NAME,model:"Eleven v4"},{headers:{"Cache-Control":"no-store"}})}
export async function POST(r:Request){
 const user=await getChatGPTUser();
 if(r.headers.get("origin")!==new URL(r.url).origin)return new Response(null,{status:403});
 const e=config();if(!e.ELEVENLABS_API_KEY)return Response.json({error:"ElevenLabs är inte anslutet ännu. Använd webbläsarens röst."},{status:503});
 const raw=await r.text();if(raw.length>5000)return new Response(null,{status:413});
 let text,language,speed;try{({text,language="sv",speed=1}=JSON.parse(raw))}catch{return new Response(null,{status:400})}
 // Swedish course text is sent only after the learner explicitly presses a listen button.
 // Imported YKB questions are supported; authenticated calls remain rate limited.
 if(typeof text!=="string"||text.trim().length<1||text.length>1200||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text)||!["sv","ar"].includes(language)||typeof speed!=="number"||!Number.isFinite(speed)||speed<0.7||speed>1.2)return Response.json({error:"Välj en svensk kursfråga eller förklaring på högst 1 200 tecken."},{status:400});
 const visitor=user?.userId||"guest:"+Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(r.headers.get("CF-Connecting-IP")||"local")))).map(n=>n.toString(16).padStart(2,"0")).join("").slice(0,32);
 const bucket=visitor+":"+new Date().toISOString().slice(0,13);
 const quotaLimit=user?24:6;
 const quota=await e.DB.prepare("INSERT INTO speech_usage (id, count) VALUES (?, 1) ON CONFLICT(id) DO UPDATE SET count = count + 1 WHERE count < ? RETURNING count").bind(bucket,quotaLimit).first();
 if(!quota)return Response.json({error:"Timgränsen är nådd. Försök senare eller fortsätt med enhetsrösten."},{status:429});
 try{const response=await fetch("https://api.elevenlabs.io/v1/text-to-speech/"+encodeURIComponent(ADAM_VOICE_ID)+"?output_format=mp3_44100_128",{method:"POST",headers:{"xi-api-key":e.ELEVENLABS_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({text,model_id:"eleven_v4",language_code:language,voice_settings:{stability:.5,similarity_boost:.75,speed}}),signal:AbortSignal.timeout(25000)});
 if(response.status===402)return Response.json({error:"Adam Composer kräver Creator eller API-krediter hos ElevenLabs för användning i TR-os."},{status:402});
 if(!response.ok)return Response.json({error:"Rösttjänsten kunde inte skapa ljud. Prova webbläsarens röst."},{status:502});
 return new Response(response.body,{headers:{"Content-Type":"audio/mpeg","Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});
 }catch{return Response.json({error:"Rösttjänsten svarade inte i tid."},{status:504})}
}
