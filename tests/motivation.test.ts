import {test} from "node:test";
import assert from "node:assert/strict";
import {learningStats} from "../lib/motivation.ts";
test("XP and daily goal count actual events only",()=>{const now=new Date(2026,9,23,12);const stats=learningStats([{date:new Date(2026,9,22,12).toISOString(),earned:10},{date:now.toISOString(),earned:2},{date:now.toISOString(),earned:10}],now);assert.equal(stats.xp,22);assert.equal(stats.todayXP,12);assert.equal(stats.streak,2)});
test("streak survives yesterday and breaks after missed day",()=>{const events=[{date:new Date(2026,9,21,12).toISOString(),earned:10}];assert.equal(learningStats(events,new Date(2026,9,22,12)).streak,1);assert.equal(learningStats(events,new Date(2026,9,23,12)).streak,0);assert.deepEqual(learningStats([],new Date(2026,9,23,12)),{xp:0,todayXP:0,streak:0})});
