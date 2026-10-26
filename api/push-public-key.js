import { json } from "./push-store.js";
export default function pushPublicKey(req,res){if(req.method!=="GET"){res.setHeader("Allow","GET");return json(res,405,{error:"Metoden stöds inte."})}const key=process.env.TR_OS_PUSH_VAPID_PUBLIC_KEY;return json(res,key?200:503,key?{configured:true,publicKey:key}:{configured:false,error:"Pushnotiser är inte konfigurerade ännu."})}
