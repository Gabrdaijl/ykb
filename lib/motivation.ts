export type XPEvent={date:string;earned:number};
export function dayKey(date=new Date()){return date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,"0")+"-"+String(date.getDate()).padStart(2,"0")}
export function learningStats(events:XPEvent[],now=new Date()){
 const today=dayKey(now),days=new Set(events.filter(e=>e.earned>0).map(e=>dayKey(new Date(e.date))));
 const cursor=new Date(now);let streak=0;if(!days.has(today))cursor.setDate(cursor.getDate()-1);
 while(days.has(dayKey(cursor))){streak++;cursor.setDate(cursor.getDate()-1)}
 return {xp:events.reduce((n,e)=>n+e.earned,0),todayXP:events.filter(e=>dayKey(new Date(e.date))===today).reduce((n,e)=>n+e.earned,0),streak};
}
export function lessonStatus(ids:string[],records:Record<string,{unsupported?:number}>,id:string){
 const index=ids.indexOf(id);if(index<0)return {done:false,unlocked:false};
 return {done:(records[id]?.unsupported||0)>0,unlocked:ids.slice(0,index).every(k=>(records[k]?.unsupported||0)>0)};
}
export function canClaimChest(ids:string[],records:Record<string,{unsupported?:number}>,claimed:string[],chest:string){
 return !claimed.includes(chest)&&ids.every(id=>(records[id]?.unsupported||0)>0);
}
