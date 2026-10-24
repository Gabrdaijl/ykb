import {test} from "node:test";
import assert from "node:assert/strict";
import {topicForQuestion,promptIntent,questionClues,summarizeLearningProfile,buildStudyWeek} from "../lib/learning-profile.ts";
import type {ImportedQuestion} from "../lib/imported-learning.ts";
import {rankRelevantQuestions} from "../lib/study-tools.ts";
const q=(id:string,question:string,options=["A","B"]):ImportedQuestion=>({id,sourceId:id,number:1,question,options,correct:null,images:[]});
test("question lab labels question purpose and catches meaning-changing words",()=>{assert.match(promptIntent("Hur många timmar får du arbeta?"),/antal, tid eller mängd/);assert.match(promptIntent("Vem får använda trucken?"),/ansvarar/);assert.deepEqual(questionClues("Hur många timmar i följd får du arbeta?",["Minst 4 timmar","Högst 6 timmar"]),["minst · den lägsta tillåtna gränsen","högst/maximalt · den övre gränsen","i följd · utan avbrott"])});
test("profile maps concepts and only reports evidence in saved review records",()=>{assert.equal(topicForQuestion(q("a","Hur lång dygnsvila?")),"rest");assert.equal(topicForQuestion(q("b","Vilken spännbandslast?")),"load");const p=summarizeLearningProfile([q("a","Hur lång dygnsvila?"),q("b","Vilken spännbandslast?")],{}, {a:"language"},0);assert.equal(p.rest.attempted,0);assert.equal(p.rest.causes.language,1);assert.equal(p.load.attempted,0)});


test("study plan has seven daily sessions and prioritises selected weak areas",()=>{const topics=[{id:"rest",title:"Rest",total:3,due:0,wrong:0,attempted:0,mastered:0,causes:{}},{id:"load",title:"Load",total:3,due:3,wrong:2,attempted:1,mastered:0,causes:{}}];const week=buildStudyWeek(topics);assert.equal(week.length,7);assert.equal(week[0].topic?.id,"load");assert.ok(buildStudyWeek(topics,["rest"]).every(day=>day.topic?.id==="rest"))});

test("tutor search ranks matching approved text and returns no invented match",()=>{const a=q("rest","Hur lång är dygnsvilan?"),b=q("load","Hur säkrar du lasten?");assert.deepEqual(rankRelevantQuestions("dygnsvila",[b,a]).map(x=>x.id),["rest"]);assert.deepEqual(rankRelevantQuestions("xyz-unmatched",[a,b]),[])});
