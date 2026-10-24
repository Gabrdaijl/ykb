import {questionSchema} from "../../../lib/validation";
import {getChatGPTUser} from "../../chatgpt-auth";
import {getDb} from "../../../db";
import {content,roles} from "../../../db/schema";
import {eq} from "drizzle-orm";
export async function GET(){const rows=await getDb().select().from(content).all();return Response.json(rows.map(r=>JSON.parse(r.data)))}
export async function POST(r:Request){
 const u=await getChatGPTUser();if(!u)return new Response(null,{status:401});
 const role=await getDb().select().from(roles).where(eq(roles.userId,u.userId)).get();
 if(role?.role!=="admin")return Response.json({error:"Administratörsbehörighet krävs."},{status:403});
 if(r.headers.get("origin")!==new URL(r.url).origin)return new Response(null,{status:403});
 const raw=await r.text();if(raw.length>100000)return new Response(null,{status:413});
 let q;try{q=JSON.parse(raw)}catch{return new Response(null,{status:400})}
 const parsed=questionSchema.safeParse(q);if(!parsed.success)return Response.json({error:"Ogiltig fråga. Kontrollera alla språkfält och myndighetskällan."},{status:400});q=parsed.data;
 await getDb().insert(content).values({id:q.id,data:JSON.stringify(q),updatedAt:new Date().toISOString()}).onConflictDoUpdate({target:content.id,set:{data:JSON.stringify(q),updatedAt:new Date().toISOString()}});
 return Response.json({saved:true});
}

