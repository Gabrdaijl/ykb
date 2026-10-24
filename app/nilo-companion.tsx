"use client";
import {useEffect,useState} from "react";
import {ArrowRight,Lightbulb,MessageCircle,Volume2,X,Zap,Send,LoaderCircle,BookOpen,Globe2} from "lucide-react";
import {questions as ykbQuestions,topics as ykbTopics} from "../lib/course";
import {skills as courseSkills} from "../lib/language-course";
import {findBestVerifiedQuestion} from "../lib/study-tools";
import {hasVerifiedAnswer,type ImportedQuestion} from "../lib/imported-learning";

type Mode="context"|"simple"|"hint"|"cheer";
function localYkbHelp(text:string,language:"sv"|"ar",questionBank:ImportedQuestion[]=[]){
 const q=text.toLocaleLowerCase("sv-SE").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[\u064b-\u065f\u0670]/g,"");
 const tokens=q.split(/[^\p{L}\p{N}]+/u).filter(t=>t.length>=3&&!/^(vad|hur|var|kan|ska|det|den|med|för|att|och|som|the|what|how|are|does|this|that|من|ماذا|كيف|هل|على|في|ما|هو|هي)$/u.test(t));
 const matchedQuestion=findBestVerifiedQuestion(text,questionBank);
 if(matchedQuestion){
  if(!hasVerifiedAnswer(matchedQuestion))return language==="ar"?"وجدت السؤال في بنك التدريب، لكن لا أملك مفتاح إجابة موثقًا له، لذلك لن أخمّن.":"Jag hittade frågan i träningsbanken, men saknar ett verifierat facit och tänker därför inte gissa.";
  const answer=matchedQuestion.options[matchedQuestion.correct!],answerAr=matchedQuestion.optionsAr?.[matchedQuestion.correct!]||answer;
  const provenance=matchedQuestion.answerVerification?.status==="independently-verified"?"Kontrollerat separat mot myndighetskälla.":"Enligt Komarkens rättningsresultat; inte ett officiellt myndighetsfacit.";
  return language==="ar"?`وجدت سؤالًا مطابقًا في بنك Komarken.\nالإجابة في نتيجة التصحيح: ${answerAr}\n\n${matchedQuestion.explanationAr}\n\nالمصدر: ${matchedQuestion.answerVerification?.source}\nهذه إجابة تدريبية من Komarken وليست مفتاحًا رسميًا من هيئة حكومية.`:`Fråga från Komarkens träningsbank: ${matchedQuestion.question}\n\nSvar enligt rättningen: ${answer}\n\n${matchedQuestion.explanation}\n\n${provenance}\nKälla: ${matchedQuestion.answerVerification?.source}`;
 } const bankQuestion=/fortbild|forny|35 timmar/.test(q)?ykbQuestions.find(x=>x.id==="q2"):/grundutbild|registr|140|280|kunskapsprov/.test(q)?ykbQuestions.find(x=>x.id==="q3"):/giltig|fem ar|5 ar|slutdatum/.test(q)?ykbQuestions.find(x=>x.id==="q4"):/korkort|yrkeskompetens|vad ar ykb|vad betyder ykb/.test(q)?ykbQuestions.find(x=>x.id==="q1"):null;
 if(bankQuestion)return language==="ar"?`${bankQuestion.arabic}\n\nقاعدة للتذكر: ${bankQuestion.memory}`:`Enkelt svar: ${bankQuestion.options[bankQuestion.correct]}.\n\n${bankQuestion.explanation}\n\nMinnesknep: ${bankQuestion.memory}\nKälla: Transportstyrelsen.`;
 const skillMatches=courseSkills.map(skill=>{const corpus=[skill.word,skill.meaning,skill.question,skill.translation,skill.simple,skill.ar,skill.example,skill.exampleAr,skill.why,...skill.options,...(skill.optionsAr||[])].filter(Boolean).join(" ").toLocaleLowerCase("sv-SE").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[\u064b-\u065f\u0670]/g,"");const score=tokens.reduce((n,token)=>n+(corpus.includes(token)?(token.length>=6?3:2):0),0)+(corpus.includes(q)?5:0);return{skill,score}}).sort((a,b)=>b.score-a.score);
 if(skillMatches[0]?.score>=2){const skill=skillMatches[0].skill;return language==="ar"?`${skill.ar}\n\n${skill.word}: ${skill.meaning}\n\nمثال: ${skill.exampleAr||skill.example}`:`${skill.word}: ${skill.meaning}.\n\n${skill.simple}\n\nExempel: ${skill.example}\n\nKälla: ${skill.source||"TR-os kursmaterial"}.`}
 const topic=/last|gods|lastsakr/.test(q)?ykbTopics.find(x=>x.id==="cargo"):/buss|passager/.test(q)?ykbTopics.find(x=>x.id==="people"):/risk|sikt|vaglag|hastig|saker kor|halka|glatt/.test(q)?ykbTopics.find(x=>x.id==="safe"):null;
 if(topic)return language==="ar"?topic.arabic:`${topic.body}\n\nDet här är en introduktion. Kontrollera detaljerade regler hos Transportstyrelsen.`;
 return language==="ar"?"لم أجد جواباً مؤكداً في مادة YKB المتاحة دون اتصال. أرسل كلمة سويدية من السؤال، مثل rast أو dygnsvila أو lastsäkring، وسأبحث عنها في قاموس الدورة. لا أخمّن في القواعد التي لا أستطيع توثيقها.":"Jag hittar inget verifierat svar på just den här formuleringen offline. Skriv ett nyckelord från frågan, till exempel rast, dygnsvila eller lastsäkring, så söker jag i kursmaterialet. Jag gissar inte på regler som jag inte kan belägga.";
}
export default function NiloCompanion({message,onSpeak,speaking=false,hidden=false}:{message:string;onSpeak:(text:string)=>void;speaking?:boolean;hidden?:boolean}){
 const [open,OPEN]=useState(false),[mode,MODE]=useState<Mode>("context");
 const [question,QUESTION]=useState("");const [answer,ANSWER]=useState("");const [questionBank,QUESTION_BANK]=useState<ImportedQuestion[]>([]);const [asking,ASKING]=useState(false);const [aiError,AI_ERROR]=useState("");const [aiReady,AI_READY]=useState<boolean|null>(null);const [language,LANGUAGE]=useState<"sv"|"ar">("sv");
 useEffect(()=>MODE("context"),[message]);
 useEffect(()=>{if(!open)return;let active=true;fetch("/api/tutor").then(r=>r.ok?r.json():null).then(data=>{if(active)AI_READY(!!data?.configured)}).catch(()=>{if(active)AI_READY(false)});return()=>{active=false}},[open]);
 useEffect(()=>{if(!open||questionBank.length)return;let active=true;fetch("/data/komarken.json?revision=20261024-key-325",{cache:"force-cache"}).then(r=>r.ok?r.json():null).then(data=>{if(active&&Array.isArray(data?.sets))QUESTION_BANK(data.sets.flatMap((set:{questions?:ImportedQuestion[]})=>Array.isArray(set.questions)?set.questions:[]))}).catch(()=>{});return()=>{active=false}},[open,questionBank.length]); const copy=mode==="simple"?"Vi gör det enkelt: läs vad frågan ber dig ta reda på. Hitta nyckelord som ”inte”, ”minst” eller ”högst”. Tänk sedan på vilken regel som passar.":mode==="hint"?"Ledtråd: hitta först ämnet i frågan. Stryk ett svar i taget som inte följer regeln. Du behöver inte skynda dig.":mode==="cheer"?"Du behöver inte kunna allt på en gång. Varje fråga du försöker förstå gör dig säkrare. Ett lugnt steg i taget räcker.":message;
 const title=answer?"Så här kan du tänka":mode==="simple"?"Vi tar det på enkel svenska":mode==="hint"?"Här kommer en ledtråd":mode==="cheer"?"Du är på väg framåt":"Din YKB-coach";
 async function askNilo(e:React.FormEvent){
  e.preventDefault();const prompt=question.trim();if(prompt.length<3||asking)return;ANSWER("");AI_ERROR("");ASKING(true);let availableQuestions=questionBank;
  try{
   if(!availableQuestions.length){try{const bankResponse=await fetch("/data/komarken.json?revision=20261024-key-325",{cache:"force-cache"});if(bankResponse.ok){const data=await bankResponse.json();if(Array.isArray(data?.sets)){availableQuestions=data.sets.flatMap((set:{questions?:ImportedQuestion[]})=>Array.isArray(set.questions)?set.questions:[]);QUESTION_BANK(availableQuestions)}}}catch{}}
   if(aiReady!==true){ANSWER(localYkbHelp(prompt,language,availableQuestions));QUESTION("");return}
   const response=await fetch("/api/tutor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:prompt,language})});const data=await response.json().catch(()=>({}));if(!response.ok)throw Error(data?.error||"Nilo kunde inte svara just nu.");ANSWER(data.answer);QUESTION("");
  }catch(error){const fallback=localYkbHelp(prompt,language,availableQuestions);if(!fallback.startsWith("Jag hittar inget verifierat svar")&&!fallback.startsWith("لم أجد جواباً مؤكداً")){ANSWER(fallback);AI_READY(false)}else AI_ERROR(error instanceof Error?error.message:"Nilo kunde inte svara just nu.")}
  finally{ASKING(false)}
 }
 if(hidden)return null;
 return <aside className={"nilo-companion"+(open?" is-open":"")+(speaking?" is-speaking":"")} aria-label="Nilo, din aktiva YKB-coach">
  {open&&<div className={"nilo-companion-card mood-"+mode} role="dialog" aria-label="Fråga och få hjälp av Nilo">
   <div className="nilo-card-top"><div className="nilo-card-mascot"><NiloMascot speaking={speaking||asking} mood={mode==="hint"?"thinking":mode==="simple"?"teaching":mode==="cheer"?"celebrating":"friendly"}/></div><div className="nilo-companion-heading"><span className="nilo-live-label"><i/> NILO · YKB-COACH</span><button onClick={()=>OPEN(false)} aria-label="Stäng Nilo"><X size={17}/></button></div></div>
   <strong className="nilo-card-title">{title}</strong><small className="nilo-card-subtitle">Vi tar frågan lugnt, ett steg i taget.</small>
   <p aria-live="polite" aria-atomic="true">{copy}</p>
   <div className="nilo-coach-actions" aria-label="Välj hjälp från Nilo">
    <button aria-pressed={mode==="simple"} onClick={()=>MODE("simple")}><MessageCircle size={15}/>Enklare</button>
    <button aria-pressed={mode==="hint"} onClick={()=>MODE("hint")}><Lightbulb size={15}/>Ledtråd</button>
    <button aria-pressed={mode==="cheer"} onClick={()=>MODE("cheer")}><Zap size={15}/>Peppa</button>
   </div>
   <div className="nilo-ai-chat" dir={language==="ar"?"rtl":"ltr"}><div className="nilo-ai-title"><span><BookOpen size={14}/> Fråga Nilo om YKB</span><button type="button" onClick={()=>LANGUAGE(v=>v==="sv"?"ar":"sv")} aria-label="Byt svarsspråk"><Globe2 size={12}/>{language==="sv"?"SV · العربية":"العربية · SV"}</button></div><small className={"nilo-ai-status "+(aiReady===true?"online":aiReady===false?"offline":"checking")}>{aiReady===true?"AI ansluten · källbaserade svar":aiReady===false?"Offlinecoach · kursbaserad snabbhjälp":"Kontrollerar AI-anslutning…"}</small><small className="nilo-ai-privacy">{aiReady===true?"Din fråga skickas till OpenAI med kursmaterial som stöd.":"Offline-läge: din fråga stannar i appen."}</small><div className="nilo-suggested-questions"><button type="button" onClick={()=>QUESTION("Hur lång är YKB-fortbildningen?")}>Fortbildning</button><button type="button" onClick={()=>QUESTION("Hur länge gäller YKB?")}>Giltighet</button><button type="button" onClick={()=>QUESTION("Vad måste vara klart före provet?")}>Inför provet</button></div><form onSubmit={askNilo}><input value={question} onChange={e=>QUESTION(e.target.value)} placeholder={language==="sv"?"Vad vill du förstå?":"ما الذي تريد فهمه؟"} aria-label="Skriv en fråga till Nilo" maxLength={300}/><button disabled={asking||question.trim().length<3} aria-label="Skicka fråga till Nilo">{asking?<LoaderCircle size={16} className="nilo-loading"/>:<Send size={16}/>}</button></form>{answer&&<p className="nilo-ai-answer" aria-live="polite" dir={language==="ar"?"rtl":"ltr"}>{answer}</p>}{aiError&&<small className="nilo-ai-error" role="status">{aiError}</small>}</div>
   <button className="nilo-companion-listen" onClick={()=>onSpeak(answer||copy)} aria-pressed={speaking}><Volume2 size={16}/>{speaking?"Nilo pratar…":answer?"Lyssna på Nilos svar":"Lyssna på hjälpen"}<ArrowRight size={15}/></button>
  </div>}
  {!open&&<button type="button" className="nilo-companion-teaser" onClick={()=>OPEN(true)} aria-label="Öppna Nilo och välj YKB-hjälp"><strong>Nilo</strong><span>{message}</span><small>Tryck här så hjälper jag dig</small></button>}
  <button className="nilo-companion-toggle" onClick={()=>OPEN(v=>!v)} aria-expanded={open} aria-label={open?"Stäng Nilo":"Öppna Nilo och välj YKB-hjälp"}>
   <NiloMascot speaking={speaking||asking}/>
   <span className="nilo-companion-pulse" aria-hidden="true"/>
  </button>
 </aside>
}

export function NiloMascot({speaking=false,className="",mood="friendly"}:{speaking?:boolean;className?:string;mood?:"friendly"|"thinking"|"teaching"|"celebrating"}){
 return <svg className={"nilo-mascot"+(speaking?" talking":"")+(className?" "+className:"")+" nilo-mood-"+mood} viewBox="0 0 150 132" role="img" aria-label="Nilo är en animerad YKB-lastbil med ansikte, hjul och vinkande armar">
  <defs><linearGradient id="niloTruckPaint" x1=".1" y1="0" x2=".8" y2="1"><stop stopColor="#a3f0cf"/><stop offset=".42" stopColor="#55c9a5"/><stop offset="1" stopColor="#228a77"/></linearGradient><linearGradient id="niloWindshield" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#427b91"/><stop offset=".55" stopColor="#183e56"/><stop offset="1" stopColor="#102c41"/></linearGradient><linearGradient id="niloBumper" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f5fffb"/><stop offset="1" stopColor="#a9c6ba"/></linearGradient><radialGradient id="niloWheelMetal"><stop stopColor="#f4fff9"/><stop offset=".55" stopColor="#a8c8bc"/><stop offset="1" stopColor="#628d7e"/></radialGradient></defs>
 <ellipse cx="75" cy="124" rx="49" ry="5" fill="#123d39" opacity=".2"/>
  <g className="nilo-left-arm"><path d="M35 68Q17 65 13 50Q11 42 17 40Q23 39 26 47L31 55L39 59" fill="#65c9a9" stroke="#278b77" strokeWidth="3"/><circle cx="16" cy="42" r="5" fill="#a0e5c8"/></g>
  <g className="nilo-right-arm"><path d="M114 69Q132 65 136 50Q138 42 132 40Q126 39 123 47L118 55L110 59" fill="#65c9a9" stroke="#278b77" strokeWidth="3"/><circle cx="134" cy="42" r="5" fill="#a0e5c8"/></g>
  <path d="M22 51V39Q22 35 27 35H47V65H22Z" fill="#31977e" stroke="#248b77" strokeWidth="2.5" strokeLinejoin="round"/><path d="M26 40H43V48H26Z" fill="#8fe3c2"/><text x="26" y="59" fontSize="5.5" fontWeight="900" fill="#effff6">TR-os</text><path className="nilo-body" d="M26 53Q28 43 41 40L51 20Q55 13 65 13H97Q107 13 112 22L125 46Q130 52 129 65V91H23V62Q23 56 26 53Z" fill="url(#niloTruckPaint)" stroke="#248b77" strokeWidth="3.5" strokeLinejoin="round"/>
  <path d="M47 40L56 23Q58 20 64 20H96Q101 20 104 25L112 42Z" fill="url(#niloWindshield)" stroke="#1d4359" strokeWidth="3" strokeLinejoin="round"/><path d="M53 37L60 24H77V39ZM84 24H95Q99 24 101 28L106 39H84Z" fill="#9ee5d5" opacity=".9"/><path d="M81 22V41" stroke="#173e55" strokeWidth="2.5"/>
  <g className="nilo-eyes"><ellipse cx="66" cy="31" rx="3" ry="4" fill="#19394d"/><ellipse cx="96" cy="31" rx="3" ry="4" fill="#19394d"/><circle cx="67" cy="29" r="1" fill="white"/><circle cx="97" cy="29" r="1" fill="white"/></g><path className="nilo-blink" d="M62 31Q66 35 70 31M92 31Q96 35 100 31" fill="none" stroke="#19394d" strokeWidth="2.5" strokeLinecap="round"/><path className="nilo-mouth" d="M75 36Q81 42 87 36" fill="none" stroke="#163f4b" strokeWidth="2.3" strokeLinecap="round"/>
  <path d="M27 51Q76 46 126 51L129 62Q77 57 24 63Z" fill="#f4fff4" stroke="#d3f3df" strokeWidth="2"/><path d="M26 57Q77 53 128 57" stroke="#ffcf61" strokeWidth="3"/>
  <rect x="35" y="68" width="82" height="18" rx="6" fill="#eafff5"/><path d="M44 73H108M49 78H102" stroke="#69c5a9" strokeWidth="2" strokeLinecap="round"/>
  <path d="M19 86H131L137 96V103H15V96Z" fill="url(#niloBumper)" stroke="#206354" strokeWidth="3" strokeLinejoin="round"/><rect x="54" y="90" width="42" height="11" rx="3" fill="#326178"/><path d="M59 93H91" stroke="#8edccb" strokeWidth="2"/><rect x="18" y="79" width="12" height="8" rx="3" fill="#fff0a6"/><rect x="121" y="79" width="11" height="8" rx="3" fill="#fff0a6"/>
  <g className="nilo-wheel nilo-wheel-left"><circle cx="43" cy="103" r="13" fill="#23495a" stroke="#183c4a" strokeWidth="3"/><circle cx="43" cy="103" r="5" fill="url(#niloWheelMetal)"/><path d="M43 98V108M38 103H48" stroke="#7db9a5" strokeWidth="1.5"/></g><g className="nilo-wheel nilo-wheel-right"><circle cx="109" cy="103" r="13" fill="#23495a" stroke="#183c4a" strokeWidth="3"/><circle cx="109" cy="103" r="5" fill="url(#niloWheelMetal)"/><path d="M109 98V108M104 103H114" stroke="#7db9a5" strokeWidth="1.5"/></g>
  <g className="nilo-celebrate-stars" fill="#ffd66b"><path d="M39 16L41 22L47 24L41 26L39 32L37 26L31 24L37 22Z"/><path d="M119 17L121 21L125 22L121 24L119 28L117 24L113 22L117 21Z"/></g><circle cx="77" cy="13" r="4" fill="#f5c858"/><g className="nilo-spark" fill="#f6c75d"><path d="M137 18L139 24L145 26L139 28L137 34L135 28L129 26L135 24Z"/><circle cx="14" cy="101" r="2.5"/></g>
 </svg>
}
