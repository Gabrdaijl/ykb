import {learnerSchema} from "../../../lib/validation";
import {getChatGPTUser} from "../../chatgpt-auth";
import {getDb} from "../../../db";
import {learnerState} from "../../../db/schema";
import {eq} from "drizzle-orm";
export async function GET(){
 const u=await getChatGPTUser(); if(!u)return Response.json({error:"Logga in för att synkronisera."},{status:401});
 const row=await getDb().select().from(learnerState).where(eq(learnerState.userId,u.userId)).get();
 return Response.json(row?JSON.parse(row.data):null);
}
export async function PUT(r:Request){
 const u=await getChatGPTUser(); if(!u)return Response.json({error:"Logga in."},{status:401});
 if(r.headers.get("origin") && r.headers.get("origin")!==new URL(r.url).origin)return new Response(null,{status:403});
 const raw=await r.text();if(raw.length>200000)return new Response(null,{status:413});
 let data;try{data=JSON.parse(raw)}catch{return new Response(null,{status:400})}
 const parsed=learnerSchema.safeParse(data);if(!parsed.success)return Response.json({error:"Ogiltiga studiedata."},{status:400});data=parsed.data;
 await getDb().insert(learnerState).values({userId:u.userId,data:JSON.stringify(data),updatedAt:new Date().toISOString()}).onConflictDoUpdate({target:learnerState.userId,set:{data:JSON.stringify(data),updatedAt:new Date().toISOString()}});
 return Response.json({saved:true});
}

