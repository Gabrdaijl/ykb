import {test} from "node:test";
import assert from "node:assert/strict";
import {lessonStatus,canClaimChest} from "../lib/motivation.ts";
test("path opens sequentially and remembers completed lessons",()=>{const ids=["a","b","c"];assert.deepEqual(lessonStatus(ids,{},"a"),{done:false,unlocked:true});assert.equal(lessonStatus(ids,{},"b").unlocked,false);assert.equal(lessonStatus(ids,{a:{unsupported:1}},"b").unlocked,true);assert.equal(lessonStatus(ids,{a:{unsupported:1}},"c").unlocked,false);assert.equal(lessonStatus(ids,{a:{unsupported:1},b:{unsupported:1}},"c").unlocked,true);assert.equal(lessonStatus(ids,{},"unknown").unlocked,false)});
test("chest needs all lessons and cannot be claimed twice",()=>{const r={a:{unsupported:1},b:{unsupported:1}};assert.equal(canClaimChest(["a","b"],r,[],"chapter"),true);assert.equal(canClaimChest(["a","b"],r,["chapter"],"chapter"),false);assert.equal(canClaimChest(["a","b"],{a:{unsupported:1}},[],"chapter"),false)});
