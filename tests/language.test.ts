import {test} from "node:test";
import assert from "node:assert/strict";
import {skills,normalizeAnswer,shuffled} from "../lib/language-course.ts";
test("each learning concept has a valid answer and distinct rephrasing",()=>{
 assert.equal(new Set(skills.map(k=>k.id)).size,skills.length);
 for(const k of skills){assert.ok(k.correct>=0&&k.correct<k.options.length);assert.equal(k.wrong.length,k.options.length);assert.ok(k.simple&&k.ar&&k.translation&&k.cloze.includes("___")&&k.answer);for(const v of k.variants){assert.notEqual(v.question,k.question);assert.ok(v.correct>=0&&v.correct<v.options.length)}}
});
test("answer comparison tolerates case, whitespace and punctuation",()=>{assert.equal(normalizeAnswer(" Mindre. "),normalizeAnswer("mindre"));assert.notEqual(normalizeAnswer("mer"),normalizeAnswer("mindre"))});
test("shuffling preserves option identities and the original input",()=>{const a=[0,1,2],b=shuffled(a,()=>0);assert.deepEqual(a,[0,1,2]);assert.deepEqual([...b].sort(),a);assert.notDeepEqual(b,a);for(const k of skills){const opts=shuffled(k.options.map((_,i)=>i),()=>0).map(i=>k.options[i]);assert.equal(opts.filter(o=>o===k.options[k.correct]).length,1)}});
