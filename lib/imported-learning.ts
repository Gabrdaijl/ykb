export type ImportedQuestion={id:string;sourceId:string;number:number;question:string;questionAr?:string;options:string[];optionsAr?:string[];correct:number|null;explanation?:string;explanationAr?:string;translationStatus?:string;answerVerification?:{status:string;source:string;checkedAt:string};images:{src:string;source:string;alt:string}[]};
export type ImportedSet={id:string;title:string;questions:ImportedQuestion[]};
export type ImportedStep={id:string;unit:string;number:number;questions:ImportedQuestion[]};
export function buildImportedSteps(sets:ImportedSet[],size=13):ImportedStep[]{if(!Number.isInteger(size)||size<1)throw Error("Invalid step size");const steps:ImportedStep[]=[];for(const set of sets)for(let i=0;i<set.questions.length;i+=size)steps.push({id:set.id+"-"+(i/size+1),unit:set.id,number:steps.length+1,questions:set.questions.slice(i,i+size)});return steps}
export function hasVerifiedAnswer(q:ImportedQuestion):boolean{return q.correct!==null&&Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length&&(q.answerVerification?.status==="independently-verified"||q.answerVerification?.status==="source-verified")&&!!q.answerVerification.source&&!!q.explanation&&!!q.explanationAr}
export function importedStepSeen(step:ImportedStep,answers:Record<string,unknown>){return step.questions.every(q=>!!answers[q.id])}
export function earnedAnswerIds(old:string[],id:string,correct:boolean){return correct&&!old.includes(id)?[...old,id]:old}

