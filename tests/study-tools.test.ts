import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {findBestVerifiedQuestion,rankRelevantQuestions} from "../lib/study-tools.ts";
const bank=JSON.parse(readFileSync(new URL("../public/data/komarken.json",import.meta.url),"utf8"));
const questions=bank.sets.flatMap((set:any)=>set.questions);

test("offline study search matches a verified Swedish YKB question",()=>{
 const result=findBestVerifiedQuestion("vägarbetstidslagen timmar rast",questions);
 assert.ok(result);
 assert.equal(result.id,"komarken-1-7");
});

test("offline study search normalizes Arabic and finds the corresponding question",()=>{
 const result=findBestVerifiedQuestion("استراحة ساعات العمل",questions);
 assert.ok(result);
 assert.equal(result.id,"komarken-1-7");
});

test("offline study search refuses broad or unsupported prompts",()=>{
 assert.equal(findBestVerifiedQuestion("rast",questions),null);
 assert.equal(findBestVerifiedQuestion("كيف حالك",questions),null);
});

test("question ranking includes Swedish and Arabic terms",()=>{
 const result=rankRelevantQuestions("تثبيت الحمولة",questions,3);
 assert.ok(result.length>0);
 assert.ok(result.some(q=>q.question.includes("last")));
});
