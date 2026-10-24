import type {ImportedQuestion} from "./imported-learning";

function normalize(value:string){
 return value.toLocaleLowerCase("sv").normalize("NFD").replace(/\p{M}/gu,"").replace(/[ـ]/g,"").replace(/[أإآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/[^\p{L}\p{N}]+/gu," ").trim();
}
const stopWords=new Set("vad hur var vem vilket vilka mycket många får få ska kan den det och att som enligt med till från utan för på i är över efter innan hur man a an the what how is are does do of from to in on and or the التي الذي ماذا كيف هل من ما هو هي في على عن إلى مع كم لا هذا هذه تكون يمكن".split(/\s+/));
function tokensOf(value:string){return normalize(value).split(/\s+/).filter(token=>token.length>=2&&!stopWords.has(token))}

export function findBestVerifiedQuestion(query:string,questions:ImportedQuestion[]){
 const tokens=[...new Set(tokensOf(query))];
 if(tokens.length<2)return null;
 let best:{question:ImportedQuestion;score:number}|null=null;
 for(const question of questions){
  const parts=[question.question,...question.options,question.questionAr||"",...(question.optionsAr||[]),question.explanation||"",question.explanationAr||""];
  const normalized=parts.map(normalize);
  let score=0;
  for(const token of tokens){
   const qIndex=normalized[0].includes(token)?1:normalized[1]?.includes(token)?0:-1;
   if(qIndex>=0){score+=qIndex?4:3;continue}
   const arQuestion=normalized[1+question.options.length].includes(token);
   const arOption=normalized.slice(2+question.options.length,2+question.options.length+(question.optionsAr||[]).length).some(part=>part.includes(token));
   if(arQuestion)score+=3;else if(arOption)score+=2;else if(normalized.slice(2+question.options.length+(question.optionsAr||[]).length).some(part=>part.includes(token)))score+=1;
  }
  if(best&&score<=best.score)continue;
  best={question,score};
 }
 const minimum=tokens.length>=4?6:tokens.length===3?4:3;
 return best&&best.score>=minimum?best.question:null;
}

export function rankRelevantQuestions(query:string,questions:ImportedQuestion[],limit=6){
 const terms=[...new Set(tokensOf(query))];if(!terms.length)return [];
 return questions.map((q,index)=>{const text=normalize([q.question,...q.options,q.questionAr||"",...(q.optionsAr||[])].join(" ")),sv=normalize(q.question);const score=terms.reduce((n,t)=>n+(text.includes(t)?(sv.includes(t)?3:1):0),0);return{q,index,score}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.index-b.index).slice(0,limit).map(x=>x.q);
}
