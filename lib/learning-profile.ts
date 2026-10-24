import type {ImportedQuestion} from "./imported-learning";
import type {MemoryRecord} from "./memory";
export type DifficultyCause="language"|"knowledge"|"situation"|"rushed"|"uncertain";
export type LearningProfile=Record<string,{id:string;title:string;total:number;attempted:number;due:number;mastered:number;wrong:number;causes:Partial<Record<DifficultyCause,number>>}>;
const topics:[string,string,RegExp][]=[
 ["rest","Kör- och vilotider",/rast|dygnsvila|veckovila|körtid|arbetstid|nattarbete|24 timmar/i],
 ["load","Last och lastsäkring",/last|spännband|friktion|surr|kolli|gods|lastning/i],
 ["safety","Trafiksäkerhet och olyckor",/olyck|skadad|112|brand|chock|l-abc|säkerhet/i],
 ["vehicle","Fordon och teknik",/broms|fordon|ebs|däck|motor|retarder|färdskrivare/i],
 ["health","Hälsa och arbetsmiljö",/hälsa|sömn|stress|ergonomi|lyft|trött|motion/i],
 ["economy","Miljö och sparsam körning",/bränsle|förbrukning|miljö|tomgång|sparsam|ekonomisk/i],
 ["rules","Regler och yrkesansvar",/lag|fraktsedel|bevis|behörighet|ykb|kort|truck|myndighet/i]
];
export function topicForQuestion(q:Pick<ImportedQuestion,"question"|"options">){const text=q.question+" "+q.options.join(" ");return topics.find(([, ,re])=>re.test(text))?.[0]||"other"}
export function topicTitle(id:string){return topics.find(([key])=>key===id)?.[1]||"Övriga frågor"}
export function summarizeLearningProfile(questions:ImportedQuestion[],reviews:Record<string,MemoryRecord>,causes:Record<string,DifficultyCause>,now=Date.now()):LearningProfile{
 const profile:LearningProfile={};
 for(const q of questions){const id=topicForQuestion(q),r=reviews[q.id];profile[id]??={id,title:topicTitle(id),total:0,attempted:0,due:0,mastered:0,wrong:0,causes:{}};const t=profile[id];t.total++;if(r){t.attempted++;t.wrong+=r.wrong;t.due+=r.next<=now?1:0;t.mastered+=(r.reps||0)>=3&&(r.forms||[]).length>=2&&(r.days||[]).length>=2?1:0}const cause=causes[q.id];if(cause)t.causes[cause]=(t.causes[cause]||0)+1}
 return profile;
}
export function promptIntent(question:string){
 const q=question.trim().toLocaleLowerCase("sv");
 if(/^hur många|^hur mycket/.test(q))return "Hitta rätt antal, tid eller mängd.";
 if(/^när/.test(q))return "Hitta rätt tidpunkt eller villkor.";
 if(/^vem/.test(q))return "Hitta vem som ansvarar eller får göra något.";
 if(/^var/.test(q))return "Hitta rätt plats eller situation.";
 if(/^varför/.test(q))return "Hitta orsaken eller förklaringen.";
 if(/^hur /.test(q))return "Välj hur något ska göras eller hur något fungerar.";
 if(/^vilken|^vilket|^vilka/.test(q))return "Jämför alternativen och välj det som passar bäst.";
 if(/^vad/.test(q))return "Ta reda på vad som gäller i situationen.";
 return "Läs situationen och ta reda på vad frågan vill att du ska välja.";
}
const clueTerms:[RegExp,string][]=[[/\binte\b/i,"inte · välj det som inte stämmer"],[/\bminst\b/i,"minst · den lägsta tillåtna gränsen"],[/\bhögst|maximalt|maximal\b/i,"högst/maximalt · den övre gränsen"],[/\bförst(a)?\b/i,"första · vad som ska göras före annat"],[/\bi följd\b/i,"i följd · utan avbrott"],[/\bsammanlagt|totalt\b/i,"sammanlagt/totalt · lägg ihop delarna"],[/\bföre\b/i,"före · ordningen spelar roll"],[/\befter\b/i,"efter · ordningen spelar roll"]];
export function questionClues(question:string,options:string[]){const text=question+" "+options.join(" ");return clueTerms.filter(([re])=>re.test(text)).map(([,label])=>label)}
export function simpleQuestionGuide(question:string){return "Enkel svenska: "+promptIntent(question)+" Läs hela situationen och jämför varje svar med det som faktiskt frågas."}


export function buildStudyWeek<T extends {id:string;due:number;wrong:number;attempted:number}>(topics:T[],selected:string[]=[]){
 const chosen=selected.length?topics.filter(t=>selected.includes(t.id)):topics;
 const ranked=[...chosen].sort((a,b)=>b.due-a.due||b.wrong-a.wrong||a.attempted-b.attempted);
 return Array.from({length:7},(_,i)=>({day:i+1,topic:ranked.length?ranked[i%ranked.length]:null,task:i%3===0?"Repetera":i%3===1?"Lär och förstå":"Blandad träning"}));
}
