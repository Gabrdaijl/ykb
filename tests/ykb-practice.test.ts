import {test} from "node:test";
import assert from "node:assert/strict";
import {skills} from "../lib/language-course.ts";
import {questions} from "../lib/course.ts";
test("question practice is exclusively YKB and has both vehicle tracks",()=>{
 assert.equal(skills.length,51);
 assert.ok(skills.every(k=>k.category!=="Provspråk"&&!["minst","hogst","inte"].includes(k.id)));
 for(const track of ["Lastbil","Buss"]){const list=skills.filter(k=>k.track==="both"||k.track===track);assert.equal(list.length,43);assert.ok(list.some(k=>k.track===track))}
});
test("every YKB formulation has Arabic translation and official provenance",()=>{for(const k of skills){assert.ok(k.translation);assert.ok(k.source?.startsWith("https://"));assert.ok(k.optionsAr&&k.optionsAr.length===k.options.length);assert.ok(k.memoryAr&&k.exampleAr&&k.wrongAr);for(const v of k.variants){assert.ok(v.translation);assert.equal(v.optionsAr?.length,v.options.length)}}assert.equal(questions.length,108);assert.equal(new Set(questions.map(q=>q.id)).size,108)});
