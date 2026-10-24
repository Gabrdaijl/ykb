import {test} from "node:test";
import assert from "node:assert/strict";
import {schedule, questions} from "../lib/course.ts";
test("wrong answers return in ten minutes and reset repetition",()=>{
 const now=new Date("2026-10-23T10:00:00Z");const r=schedule(undefined,false,1,now);
 assert.equal(r.next,"2026-10-23T10:10:00.000Z");assert.equal(r.mistakes,1);assert.equal(r.reps,0);
});
test("consistent recall expands spacing",()=>{
 const now=new Date("2026-10-23T10:00:00Z");const a=schedule(undefined,true,3,now),b=schedule(a,true,3,now),c=schedule(b,true,3,now);
 assert.equal(a.interval,1);assert.equal(b.interval,3);assert.ok(c.interval>3);
 const reset=schedule(c,false,1,now);assert.equal(reset.reps,0);assert.equal(reset.mistakes,1);
});
test("question integrity and bilingual content",()=>{
 assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
 for(const q of questions){assert.ok(q.correct>=0&&q.correct<q.options.length);assert.ok(q.ar&&q.arabic&&q.explanation);assert.ok(["www.trafikverket.se","www.transportstyrelsen.se","www.av.se","polisen.se","www.sosalarm.se"].includes(new URL(q.source).hostname))}
});
