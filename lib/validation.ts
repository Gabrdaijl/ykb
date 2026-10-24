import {z} from "zod";
const iso=z.string().datetime();
export const learnerSchema=z.object({
 answers:z.array(z.object({id:z.string().max(100),correct:z.boolean(),date:iso})).max(10000),
 bookmarks:z.array(z.string().max(100)).max(2000),
 lessons:z.array(z.string().max(100)).max(2000),
 reviews:z.record(z.object({reps:z.number().int().min(0),interval:z.number().min(0),ease:z.number().min(1.3),mistakes:z.number().int().min(0),next:iso,last:iso,confidence:z.number().int().min(1).max(3)})),
 exams:z.array(z.object({score:z.number().min(0),total:z.number().min(1),date:iso})).max(1000),
 track:z.enum(["Lastbil","Buss"]),minutes:z.number().int().min(0)
});
export const questionSchema=z.object({
 id:z.string().regex(/^[a-zA-Z0-9_-]{1,100}$/),topic:z.enum(["rules","safe","cargo","people"]),
 track:z.enum(["both","Lastbil","Buss"]),sv:z.string().min(5).max(3000),ar:z.string().min(5).max(3000),
 simple:z.string().min(5).max(3000),options:z.array(z.string().min(1).max(1000)).min(2).max(6),
 optionsAr:z.array(z.string().min(1).max(1000)).optional(),correct:z.number().int().min(0),explanation:z.string().min(10).max(5000),arabic:z.string().min(5).max(5000),
 word:z.string().min(1).max(200),meaning:z.string().min(1).max(200),memory:z.string().min(1).max(1000),
 source:z.string().url().refine(s=>{const u=new URL(s);return u.protocol==="https:"&&["www.trafikverket.se","www.transportstyrelsen.se","www.av.se","polisen.se","www.sosalarm.se"].includes(u.hostname)})
}).refine(q=>q.correct<q.options.length&&(!q.optionsAr||q.optionsAr.length===q.options.length));
