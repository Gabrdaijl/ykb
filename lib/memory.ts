export type MemoryRecord={correct:number;wrong:number;next:number;last:number;unsupported:number;reps?:number;ease?:number;interval?:number;confidence?:number;forms?:string[];days?:string[]};
const dateKey=(d:Date)=>d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
export function updateMemory(previous:MemoryRecord|undefined,correct:boolean,confidence:number,form:string,assisted:boolean,now=Date.now()):MemoryRecord{
 const old=previous||{correct:0,wrong:0,next:0,last:0,unsupported:0};
 const certain=correct&&confidence>=2;
 const reps=certain?(old.reps||0)+1:0;
 const ease=Math.max(1.3,(old.ease||2.5)+(correct?(confidence===3?.1:-.05):-.2));
 const interval=!correct?600000:confidence===1?1800000:reps===1?86400000:reps===2?259200000:Math.min(60*86400000,Math.round((old.interval||259200000)*ease));
 const eligible=certain&&!assisted;
 return {correct:old.correct+(correct?1:0),wrong:old.wrong+(correct?0:1),next:now+interval,last:now,unsupported:old.unsupported+(eligible&&form==="variant"?1:0),reps,ease,interval,confidence,forms:eligible?Array.from(new Set([...(old.forms||[]),form])):old.forms||[],days:eligible?Array.from(new Set([...(old.days||[]),dateKey(new Date(now))])):old.days||[]};
}
export function isMastered(record:MemoryRecord|undefined){return !!record&&(record.reps||0)>=3&&(record.forms||[]).length>=2&&(record.days||[]).length>=2}
export function selectPractice<T extends {id:string}>(items:T[],records:Record<string,MemoryRecord>,limit=5,now=Date.now()):T[]{
 const priority=(id:string)=>{const r=records[id];return !r?200:r.next<=now?500+(r.confidence===1?30:0)+Math.min(50,r.wrong*5):isMastered(r)?0:100+(r.confidence===1?50:0)+Math.min(30,r.wrong*3)};
 return items.map((item,index)=>({item,index,score:priority(item.id)})).sort((a,b)=>b.score-a.score||a.index-b.index).slice(0,Math.max(0,limit)).map(x=>x.item);
}
