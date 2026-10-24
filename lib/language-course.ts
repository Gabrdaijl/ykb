import {expandedYkb} from "./expanded-ykb.ts";
import {arabicSupport} from "./arabic-support.ts";
export const drivingSource="https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/kor-och-vilotider/regler-om-kor--och-vilotider/";
export type Skill={verification?:"source-checked"|"curriculum-based";optionsAr?:string[];wrongAr?:string[];exampleAr?:string;memoryAr?:string;source?:string;track?:"both"|"Lastbil"|"Buss";id:string;title:string;category:string;word:string;meaning:string;simple:string;ar:string;example:string;question:string;translation:string;options:string[];correct:number;why:string;wrong:string[];cloze:string;answer:string;variants:{optionsAr?:string[];translation?:string;question:string;options:string[];correct:number}[]};
const suppliedExample:Skill={"id": "ykb-start-check", "title": "Innan du kör", "category": "Fordon & säkerhetskontroll", "track": "both", "verification": "curriculum-based", "source": "https://www.transportstyrelsen.se/TSFS/TSFS%202020_29k.pdf", "word": "kontrollera", "meaning": "يفحص / يتأكد", "simple": "Gå igenom fordonets säkerhet före körningen. Ignorera aldrig en varning utan att undersöka vad den betyder.", "ar": "افحص سلامة المركبة قبل القيادة. لا تتجاهل التحذيرات، بل تحقق من معناها وما يجب فعله.", "question": "Vad ska du göra innan du kör lastbilen?", "translation": "ماذا يجب أن تفعل قبل قيادة الشاحنة؟", "options": ["Kontrollera fordonet.", "Öka hastigheten.", "Ignorera varningslamporna.", "Köra utan att kontrollera något."], "optionsAr": ["فحص المركبة.", "زيادة السرعة.", "تجاهل أضواء التحذير.", "القيادة دون فحص أي شيء."], "correct": 0, "why": "En kontroll hjälper dig att upptäcka fel innan färden. Vid ett fel behöver du bedöma och åtgärda det innan fordonet kan användas säkert.", "wrong": ["", "Att öka hastigheten är ingen säkerhetskontroll.", "Varningslampor kan visa ett fel som måste undersökas.", "Utan kontroll kan du missa fel som påverkar säkerheten."], "wrongAr": ["", "زيادة السرعة ليست فحصاً للسلامة.", "قد يدل ضوء التحذير على عطل يجب فحصه.", "بدون الفحص قد تفوتك أعطال تؤثر على السلامة."], "example": "Du ser att ett däck är skadat vid kontrollen. Du undersöker problemet och ser till att fordonet är säkert innan du kör.", "exampleAr": "تلاحظ أثناء الفحص تلفاً في إطار. تتحقق من المشكلة وتتأكد من سلامة المركبة قبل القيادة.", "memoryAr": "قبل القيادة: افحص، افهم التحذير، ثم تأكد من السلامة.", "cloze": "Före körningen ska du ___ fordonet.", "answer": "kontrollera", "variants": [{"question": "Du ska börja ett körpass. Vilket arbetssätt är säkrast?", "translation": "ستبدأ رحلة عمل. أي أسلوب هو الأكثر أماناً؟", "options": ["Kör först och kontrollera senare.", "Kontrollera fordonet före avfärd.", "Dölj en varningslampa.", "Utgå från att allt fungerar."], "optionsAr": ["قُد أولاً وافحص لاحقاً.", "افحص المركبة قبل الانطلاق.", "أخفِ ضوء التحذير.", "افترض أن كل شيء يعمل."], "correct": 1}]};
const originalSkills:Skill[]=[
{id:"rast",title:"Rast efter en körperiod",category:"Kör- och vilotider",word:"sammanlagd",meaning:"إجمالي / مجموع",simple:"Enligt huvudregeln: efter totalt 4 timmar och 30 minuters körning ska du ta minst 45 minuters rast.",ar:"وفق القاعدة العامة: بعد قيادة مجموعها 4 ساعات و30 دقيقة، يجب أخذ استراحة لا تقل عن 45 دقيقة.",example:"Du kör 2 timmar och sedan ytterligare 2 timmar och 30 minuter. Den sammanlagda körningen är 4 timmar och 30 minuter.",question:"Du har kört sammanlagt 4 timmar och 30 minuter. Hur lång sammanhängande rast kräver huvudregeln minst?",translation:"قدت ما مجموعه 4 ساعات و30 دقيقة. ما الحد الأدنى للاستراحة المتصلة وفق القاعدة العامة؟",options:["15 minuter","30 minuter","45 minuter"],correct:2,why:"Huvudregeln är minst 45 minuters rast efter denna körperiod. Frågan gäller en sammanhängande rast, inte delad rast. Andra arbetstidsregler och särskilda undantag kan också vara relevanta.",wrong:["15 minuter är för kort som hela rasten enligt huvudregeln.","30 minuter är för kort som hela rasten enligt huvudregeln.",""],cloze:"Efter 4 timmar och 30 minuters körning: minst ___ minuters rast enligt huvudregeln.",answer:"45",variants:[{question:"En förare når 4,5 timmars sammanlagd körning. Vilken hel rast uppfyller huvudregelns minimum?",options:["45 minuter","20 minuter","30 minuter"],correct:0}]},
{id:"delad",title:"Förstå delad rast",category:"Kör- och vilotider",word:"därefter",meaning:"بعد ذلك",simple:"Huvudregeln för delad rast är minst 15 minuter först och minst 30 minuter sedan. Ordningen är viktig.",ar:"القاعدة العامة للاستراحة المقسمة: 15 دقيقة على الأقل أولاً ثم 30 دقيقة على الأقل. الترتيب مهم.",example:"Detta gäller huvudregeln. Särskilda regler finns för tillfällig persontrafik med buss. Kontrollera alltid vilket regelverk som gäller.",question:"Vilken ordning följer huvudregeln för delad rast under körperioden?",translation:"أي ترتيب يوافق القاعدة العامة للاستراحة المقسمة خلال فترة القيادة؟",options:["Först 30 minuter, sedan 15 minuter","Först minst 15 minuter, sedan minst 30 minuter","Tre raster om 5 minuter"],correct:1,why:"Enligt huvudregeln kommer delen om minst 15 minuter först och delen om minst 30 minuter sedan. Bussbeställningstrafik har särskilda regler; denna fråga gäller huvudregeln.",wrong:["Ordningen är omvänd jämfört med huvudregeln. Särskilda bussregler behandlas separat.","","Tre femminuterspauser uppfyller varken huvudregelns längd eller uppdelning."],cloze:"Huvudregeln: först minst 15 minuter, därefter minst ___ minuter.",answer:"30",variants:[{question:"En fråga gäller huvudregeln, inte särskild tillfällig busstrafik. Vilken del ska komma sist i en delad rast?",options:["Minst 30 minuter","5 minuter","Minst 15 minuter"],correct:0}]},
{id:"daglig",title:"Daglig körtid – huvudregeln",category:"Kör- och vilotider",word:"daglig körtid",meaning:"مدة القيادة اليومية",simple:"Huvudregeln är högst 9 timmars daglig körning. Förlängning till 10 timmar är möjlig två gånger per kalendervecka.",ar:"القاعدة العامة هي 9 ساعات قيادة يومية كحد أقصى. يمكن التمديد إلى 10 ساعات مرتين في الأسبوع التقويمي.",example:"Frågan kan gälla huvudregeln eller en tillåten förlängning. Läs vilket av dessa som efterfrågas.",question:"Vad är huvudregelns gräns för daglig körtid, utan förlängning?",translation:"ما الحد الأساسي لمدة القيادة اليومية دون تمديد؟",options:["9 timmar","11 timmar","12 timmar"],correct:0,why:"Utan förlängning gäller högst 9 timmars daglig körtid. Körning är inte samma sak som all arbetstid.",wrong:["","11 timmar är inte huvudregelns gräns för daglig körtid.","12 timmar är inte huvudregelns gräns för daglig körtid."],cloze:"Utan förlängning är daglig körtid högst ___ timmar.",answer:"9",variants:[{question:"En fråga handlar om normal daglig körning och inget undantag. Vilket tak gäller?",options:["12 timmar","9 timmar","11 timmar"],correct:1}]}
];
const extraYkb:Skill[]=[
 {
  "id": "ykb-dygn",
  "title": "Normal dygnsvila",
  "category": "Kör- och vilotider",
  "track": "both",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/kor-och-vilotider/regler-om-kor--och-vilotider/",
  "question": "Hur lång ska en normal, sammanhängande dygnsvila vara minst enligt huvudregeln?",
  "translation": "ما الحد الأدنى للراحة اليومية العادية المتصلة وفق القاعدة العامة؟",
  "options": [
   "9 timmar",
   "11 timmar",
   "8 timmar"
  ],
  "correct": 1,
  "simple": "Normal sammanhängande dygnsvila är minst 11 timmar. Reducerad och delad vila har egna villkor.",
  "ar": "الراحة اليومية العادية المتصلة لا تقل عن 11 ساعة. للراحة المخفضة والمقسمة شروط أخرى.",
  "why": "Normal sammanhängande dygnsvila är minst 11 timmar. Reducerad och delad vila har egna villkor.",
  "wrong": [
   "Det alternativet uppfyller inte den regel som frågan gäller. Normal sammanhängande dygnsvila är minst 11 timmar. Reducerad och delad vila har egna villkor.",
   "",
   "Det alternativet uppfyller inte den regel som frågan gäller. Normal sammanhängande dygnsvila är minst 11 timmar. Reducerad och delad vila har egna villkor."
  ],
  "word": "dygnsvila",
  "meaning": "الراحة اليومية",
  "example": "Frågan gäller normal vila. Läs noga om en annan fråga uttryckligen gäller reducerad vila.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "11 timmar",
  "variants": [
   {
    "question": "Du planerar normal dygnsvila utan uppdelning eller reducering. Vilken vilotid uppfyller minimikravet?",
    "options": [
     "8 timmar",
     "10 timmar",
     "11 timmar"
    ],
    "correct": 2
   }
  ]
 },
 {
  "id": "ykb-split-dygn",
  "title": "Delad dygnsvila",
  "category": "Kör- och vilotider",
  "track": "both",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/kor-och-vilotider/regler-om-kor--och-vilotider/",
  "question": "Vilken uppdelning uppfyller huvudregelns krav på delad normal dygnsvila?",
  "translation": "أي تقسيم يحقق شروط الراحة اليومية العادية المقسمة وفق القاعدة العامة؟",
  "options": [
   "3 timmar först och 9 timmar sist",
   "6 timmar först och 5 timmar sist",
   "2 timmar först och 9 timmar sist"
  ],
  "correct": 0,
  "simple": "Delad normal dygnsvila kan bestå av minst 3 timmar först och minst 9 timmar sist. Tiderna måste också rymmas inom det tillämpliga dygnet.",
  "ar": "يمكن تقسيم الراحة اليومية العادية إلى 3 ساعات على الأقل أولاً ثم 9 ساعات على الأقل في النهاية، ضمن الفترة الزمنية المقررة.",
  "why": "Delad normal dygnsvila kan bestå av minst 3 timmar först och minst 9 timmar sist. Tiderna måste också rymmas inom det tillämpliga dygnet.",
  "wrong": [
   "",
   "Det alternativet uppfyller inte den regel som frågan gäller. Delad normal dygnsvila kan bestå av minst 3 timmar först och minst 9 timmar sist. Tiderna måste också rymmas inom det tillämpliga dygnet.",
   "Det alternativet uppfyller inte den regel som frågan gäller. Delad normal dygnsvila kan bestå av minst 3 timmar först och minst 9 timmar sist. Tiderna måste också rymmas inom det tillämpliga dygnet."
  ],
  "word": "avslutande",
  "meaning": "الجزء الأخير",
  "example": "3 + 9 blir minst 12 timmars delad vila. Blanda inte ihop den med 11 timmars sammanhängande vila.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "3 timmar först och 9 timmar sist",
  "variants": [
   {
    "question": "En förare tar 3 timmars första vilodel. Hur lång måste den avslutande delen vara minst vid delad normal dygnsvila?",
    "options": [
     "6 timmar",
     "9 timmar",
     "8 timmar"
    ],
    "correct": 1
   }
  ]
 },
 {
  "id": "ykb-week-drive",
  "title": "Körtid under en vecka",
  "category": "Kör- och vilotider",
  "track": "both",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/kor-och-vilotider/regler-om-kor--och-vilotider/",
  "question": "Vilken är huvudregelns högsta körtid under en vecka?",
  "translation": "ما الحد الأعلى الأساسي لمدة القيادة خلال أسبوع؟",
  "options": [
   "60 timmar",
   "56 timmar",
   "70 timmar"
  ],
  "correct": 1,
  "simple": "Enligt huvudregeln är veckans körtid högst 56 timmar. Tvåveckorsgränsen och arbetstidsreglerna måste också följas.",
  "ar": "الحد الأساسي للقيادة الأسبوعية هو 56 ساعة. ويجب أيضاً مراعاة حد الأسبوعين وقواعد وقت العمل.",
  "why": "Enligt huvudregeln är veckans körtid högst 56 timmar. Tvåveckorsgränsen och arbetstidsreglerna måste också följas.",
  "wrong": [
   "Det alternativet uppfyller inte den regel som frågan gäller. Enligt huvudregeln är veckans körtid högst 56 timmar. Tvåveckorsgränsen och arbetstidsreglerna måste också följas.",
   "",
   "Det alternativet uppfyller inte den regel som frågan gäller. Enligt huvudregeln är veckans körtid högst 56 timmar. Tvåveckorsgränsen och arbetstidsreglerna måste också följas."
  ],
  "word": "veckokörtid",
  "meaning": "مدة القيادة الأسبوعية",
  "example": "Summera körningen under hela veckan. En kortare nästa vecka tar inte bort veckogränsen.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "56 timmar",
  "variants": [
   {
    "question": "Din plan innehåller 57 timmars körning under samma vecka. Vad gäller enligt huvudregeln?",
    "options": [
     "Det är alltid tillåtet",
     "Det är tillåtet om nästa vecka är ledig",
     "Det överskrider veckans körtidsgräns"
    ],
    "correct": 2
   }
  ]
 },
 {
  "id": "ykb-two-weeks",
  "title": "Körtid under två veckor",
  "category": "Kör- och vilotider",
  "track": "both",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/kor-och-vilotider/regler-om-kor--och-vilotider/",
  "question": "Du körde 56 timmar förra veckan. Hur mycket kan du högst köra denna vecka med hänsyn till huvudregelns tvåveckorsgräns?",
  "translation": "قدت 56 ساعة الأسبوع الماضي. كم يمكنك القيادة هذا الأسبوع كحد أقصى وفق الحد الأساسي للأسبوعين؟",
  "options": [
   "34 timmar",
   "56 timmar",
   "45 timmar"
  ],
  "correct": 0,
  "simple": "Körtiden under två på varandra följande veckor får enligt huvudregeln vara högst 90 timmar. 90 minus 56 blir 34 timmar. Andra gränser gäller samtidigt.",
  "ar": "الحد الأساسي لأسبوعين متتاليين هو 90 ساعة. بعد 56 ساعة يتبقى 34 ساعة، مع مراعاة بقية الحدود.",
  "why": "Körtiden under två på varandra följande veckor får enligt huvudregeln vara högst 90 timmar. 90 minus 56 blir 34 timmar. Andra gränser gäller samtidigt.",
  "wrong": [
   "",
   "Det alternativet uppfyller inte den regel som frågan gäller. Körtiden under två på varandra följande veckor får enligt huvudregeln vara högst 90 timmar. 90 minus 56 blir 34 timmar. Andra gränser gäller samtidigt.",
   "Det alternativet uppfyller inte den regel som frågan gäller. Körtiden under två på varandra följande veckor får enligt huvudregeln vara högst 90 timmar. 90 minus 56 blir 34 timmar. Andra gränser gäller samtidigt."
  ],
  "word": "på varandra följande",
  "meaning": "متتالية",
  "example": "Titta på två veckor tillsammans, inte bara på varje veckas egen gräns.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "34 timmar",
  "variants": [
   {
    "question": "En förare kör 45 timmar ena veckan och 46 nästa. Hur bedöms summan enligt huvudregelns tvåveckorsgräns?",
    "options": [
     "91 timmar är för mycket",
     "91 timmar är tillåtet",
     "Det finns ingen gräns över två veckor"
    ],
    "correct": 0
   }
  ]
 },
 {
  "id": "ykb-week-rest",
  "title": "Normal veckovila",
  "category": "Kör- och vilotider",
  "track": "both",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/kor-och-vilotider/regler-om-kor--och-vilotider/",
  "question": "Vilken är den minsta längden för en normal veckovila?",
  "translation": "ما الحد الأدنى لمدة الراحة الأسبوعية العادية؟",
  "options": [
   "24 timmar",
   "36 timmar",
   "45 timmar"
  ],
  "correct": 2,
  "simple": "En normal veckovila omfattar minst 45 sammanhängande timmar. En reducerad veckovila är en annan kategori med särskilda villkor.",
  "ar": "الراحة الأسبوعية العادية لا تقل عن 45 ساعة متصلة. الراحة المخفضة فئة أخرى بشروط خاصة.",
  "why": "En normal veckovila omfattar minst 45 sammanhängande timmar. En reducerad veckovila är en annan kategori med särskilda villkor.",
  "wrong": [
   "Det alternativet uppfyller inte den regel som frågan gäller. En normal veckovila omfattar minst 45 sammanhängande timmar. En reducerad veckovila är en annan kategori med särskilda villkor.",
   "Det alternativet uppfyller inte den regel som frågan gäller. En normal veckovila omfattar minst 45 sammanhängande timmar. En reducerad veckovila är en annan kategori med särskilda villkor.",
   ""
  ],
  "word": "veckovila",
  "meaning": "الراحة الأسبوعية",
  "example": "Kontrollera om frågan gäller normal eller reducerad veckovila.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "45 timmar",
  "variants": [
   {
    "question": "Du planerar en normal veckovila. Vilken av dessa tider räcker?",
    "options": [
     "30 timmar",
     "45 timmar",
     "24 timmar"
    ],
    "correct": 1
   }
  ]
 },
 {
  "id": "ykb-reduced-week",
  "title": "Reducerad veckovila",
  "category": "Kör- och vilotider",
  "track": "both",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/kor-och-vilotider/regler-om-kor--och-vilotider/",
  "question": "Vilken tid får en reducerad veckovila aldrig understiga enligt huvudregeln?",
  "translation": "ما الحد الأدنى الذي لا يجوز أن تقل عنه الراحة الأسبوعية المخفضة وفق القاعدة العامة؟",
  "options": [
   "24 timmar",
   "20 timmar",
   "11 timmar"
  ],
  "correct": 0,
  "simple": "Reducerad veckovila måste vara minst 24 sammanhängande timmar. Minskningen behöver normalt kompenseras och övriga villkor måste följas.",
  "ar": "الراحة الأسبوعية المخفضة لا تقل عن 24 ساعة متصلة. ويجب عادة تعويض التخفيض ومراعاة الشروط الأخرى.",
  "why": "Reducerad veckovila måste vara minst 24 sammanhängande timmar. Minskningen behöver normalt kompenseras och övriga villkor måste följas.",
  "wrong": [
   "",
   "Det alternativet uppfyller inte den regel som frågan gäller. Reducerad veckovila måste vara minst 24 sammanhängande timmar. Minskningen behöver normalt kompenseras och övriga villkor måste följas.",
   "Det alternativet uppfyller inte den regel som frågan gäller. Reducerad veckovila måste vara minst 24 sammanhängande timmar. Minskningen behöver normalt kompenseras och övriga villkor måste följas."
  ],
  "word": "reducerad",
  "meaning": "مخفضة",
  "example": "24 timmar är en lägsta gräns, inte en generell rätt att alltid välja kortare veckovila.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "24 timmar",
  "variants": [
   {
    "question": "En förare planerar 23 timmars reducerad veckovila. Vad gäller enligt huvudregeln?",
    "options": [
     "23 timmar räcker",
     "Det är för kort",
     "Det räcker om fordonet står still"
    ],
    "correct": 1
   }
  ]
 },
 {
  "id": "ykb-cabin",
  "title": "Veckovila i fordonet",
  "category": "Kör- och vilotider",
  "track": "both",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/kor-och-vilotider/regler-om-kor--och-vilotider/",
  "question": "Får en normal veckovila tas i fordonet?",
  "translation": "هل يجوز أخذ الراحة الأسبوعية العادية داخل المركبة؟",
  "options": [
   "Ja, om det finns en säng",
   "Ja, om föraren är ensam",
   "Nej"
  ],
  "correct": 2,
  "simple": "Normal veckovila får inte tas i fordonet. En säng i hytten gör inte normal veckovila i fordonet tillåten.",
  "ar": "لا يجوز أخذ الراحة الأسبوعية العادية داخل المركبة، حتى إن كانت الكابينة مزودة بسرير.",
  "why": "Normal veckovila får inte tas i fordonet. En säng i hytten gör inte normal veckovila i fordonet tillåten.",
  "wrong": [
   "Det alternativet uppfyller inte den regel som frågan gäller. Normal veckovila får inte tas i fordonet. En säng i hytten gör inte normal veckovila i fordonet tillåten.",
   "Det alternativet uppfyller inte den regel som frågan gäller. Normal veckovila får inte tas i fordonet. En säng i hytten gör inte normal veckovila i fordonet tillåten.",
   ""
  ],
  "word": "sovhytt",
  "meaning": "كابينة نوم",
  "example": "Skilj på dygnsvila, reducerad veckovila och normal veckovila.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "Nej",
  "variants": [
   {
    "question": "Lastbilen har en bekväm sovhytt. Var får föraren ändå inte tillbringa sin normala veckovila?",
    "options": [
     "I fordonet",
     "På ett hotell",
     "I bostaden"
    ],
    "correct": 0
   }
  ]
 },
 {
  "id": "ykb-tacho",
  "title": "Färdskrivare vid kontroll",
  "category": "Färdskrivare",
  "track": "both",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/kor-och-vilotider/foretagskontroll-av-kor--och-vilotider/",
  "question": "Du kör med digital färdskrivare. Vilken period ska kunna redovisas vid vägkontroll?",
  "translation": "تقود باستخدام جهاز تسجيل رقمي. أي فترة يجب أن تستطيع إثباتها عند التفتيش على الطريق؟",
  "options": [
   "Bara idag",
   "Innevarande dag och de föregående 56 dagarna",
   "Bara de senaste 7 dagarna"
  ],
  "correct": 1,
  "simple": "Vid kontroll ska föraren kunna redovisa innevarande dag och de föregående 56 dagarna med relevanta förarkortsuppgifter, utskrifter och eventuella diagramblad.",
  "ar": "يجب إثبات اليوم الحالي والأيام الـ56 السابقة ببيانات بطاقة السائق والمطبوعات والسجلات اللازمة.",
  "why": "Vid kontroll ska föraren kunna redovisa innevarande dag och de föregående 56 dagarna med relevanta förarkortsuppgifter, utskrifter och eventuella diagramblad.",
  "wrong": [
   "Det alternativet uppfyller inte den regel som frågan gäller. Vid kontroll ska föraren kunna redovisa innevarande dag och de föregående 56 dagarna med relevanta förarkortsuppgifter, utskrifter och eventuella diagramblad.",
   "",
   "Det alternativet uppfyller inte den regel som frågan gäller. Vid kontroll ska föraren kunna redovisa innevarande dag och de föregående 56 dagarna med relevanta förarkortsuppgifter, utskrifter och eventuella diagramblad."
  ],
  "word": "förarkort",
  "meaning": "بطاقة السائق",
  "example": "Om du också har kört med analog färdskrivare kan diagramblad behövas för samma period.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "Innevarande dag och de föregående 56 dagarna",
  "variants": [
   {
    "question": "Räcker uppgifter från bara den senaste veckan vid kontroll av digital färdskrivare?",
    "options": [
     "Ja, alltid",
     "Ja, om bilen är svensk",
     "Nej, kontrollperioden är längre"
    ],
    "correct": 2
   }
  ]
 },
 {
  "id": "ykb-other-work",
  "title": "Arbete eller rast?",
  "category": "Yrkesförarens ansvar",
  "track": "both",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/kor-och-vilotider/regler-om-kor--och-vilotider/",
  "question": "Du lastar gods medan fordonet står stilla. Är lastningen en kör- och vilotidsrast?",
  "translation": "تقوم بتحميل البضائع والمركبة متوقفة. هل يعد التحميل استراحة وفق قواعد القيادة والراحة؟",
  "options": [
   "Ja, fordonet rör sig inte",
   "Ja, om arbetet tar mindre än 45 minuter",
   "Nej, lastning är arbete"
  ],
  "correct": 2,
  "simple": "Lastning är arbete. Att fordonet står stilla gör inte arbete till rast.",
  "ar": "التحميل عمل. توقف المركبة لا يحوّل العمل إلى استراحة.",
  "why": "Lastning är arbete. Att fordonet står stilla gör inte arbete till rast.",
  "wrong": [
   "Det alternativet uppfyller inte den regel som frågan gäller. Lastning är arbete. Att fordonet står stilla gör inte arbete till rast.",
   "Det alternativet uppfyller inte den regel som frågan gäller. Lastning är arbete. Att fordonet står stilla gör inte arbete till rast.",
   ""
  ],
  "word": "annat arbete",
  "meaning": "عمل آخر",
  "example": "Körtid är en del av arbetstiden. Även lastning, underhåll och passagerarhjälp kan vara arbete.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "Nej, lastning är arbete",
  "variants": [
   {
    "question": "En bussförare hjälper passagerare av och på bussen. Vad är det för typ av tid?",
    "options": [
     "Arbete",
     "Automatiskt en rast",
     "Automatiskt dygnsvila"
    ],
    "correct": 0
   }
  ]
 },
 {
  "id": "ykb-cargo-forward",
  "title": "Lastsäkring framåt",
  "category": "Gods & lastsäkring",
  "track": "Lastbil",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/gods-och-buss/matt-och-vikt/att-lasta-ratt/",
  "question": "Vilken kraft framåt ska lastsäkringen minst kunna motstå i förhållande till lastens vikt?",
  "translation": "ما القوة الأمامية التي يجب أن يتحملها تثبيت الحمولة على الأقل مقارنة بوزنها؟",
  "options": [
   "50 procent",
   "80 procent",
   "20 procent"
  ],
  "correct": 1,
  "simple": "Lastsäkringen ska framåt kunna motstå en kraft motsvarande minst 80 procent av lastens vikt.",
  "ar": "يجب أن يتحمل تثبيت الحمولة قوة إلى الأمام تعادل 80 بالمئة على الأقل من وزن الحمولة.",
  "why": "Lastsäkringen ska framåt kunna motstå en kraft motsvarande minst 80 procent av lastens vikt.",
  "wrong": [
   "Det alternativet uppfyller inte den regel som frågan gäller. Lastsäkringen ska framåt kunna motstå en kraft motsvarande minst 80 procent av lastens vikt.",
   "",
   "Det alternativet uppfyller inte den regel som frågan gäller. Lastsäkringen ska framåt kunna motstå en kraft motsvarande minst 80 procent av lastens vikt."
  ],
  "word": "färdriktning",
  "meaning": "اتجاه السير",
  "example": "Vid inbromsning vill lasten fortsätta framåt. Beräkning av surrning kräver fler uppgifter än bara procentsatsen.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "80 procent",
  "variants": [
   {
    "question": "En fråga gäller lastsäkring i färdriktningen. Vilket krav är rätt?",
    "options": [
     "Minst 80 procent av lastens vikt",
     "Minst 10 procent",
     "Det behövs ingen säkring framåt"
    ],
    "correct": 0
   }
  ]
 },
 {
  "id": "ykb-cargo-side",
  "title": "Lastsäkring åt sidorna",
  "category": "Gods & lastsäkring",
  "track": "Lastbil",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/gods-och-buss/matt-och-vikt/att-lasta-ratt/",
  "question": "Vilket minsta krav gäller för lastsäkringens förmåga att motstå kraft åt sidorna?",
  "translation": "ما الحد الأدنى لتحمل تثبيت الحمولة للقوة الجانبية؟",
  "options": [
   "Hela lastens vikt",
   "10 procent av lastens vikt",
   "Halva lastens vikt"
  ],
  "correct": 2,
  "simple": "Bakåt och åt sidorna ska lastsäkringen kunna motstå en kraft motsvarande minst halva lastens vikt.",
  "ar": "إلى الخلف وإلى الجانبين يجب تحمل قوة تعادل نصف وزن الحمولة على الأقل.",
  "why": "Bakåt och åt sidorna ska lastsäkringen kunna motstå en kraft motsvarande minst halva lastens vikt.",
  "wrong": [
   "Det alternativet uppfyller inte den regel som frågan gäller. Bakåt och åt sidorna ska lastsäkringen kunna motstå en kraft motsvarande minst halva lastens vikt.",
   "Det alternativet uppfyller inte den regel som frågan gäller. Bakåt och åt sidorna ska lastsäkringen kunna motstå en kraft motsvarande minst halva lastens vikt.",
   ""
  ],
  "word": "sidled",
  "meaning": "الاتجاه الجانبي",
  "example": "Halva vikten är 50 procent. Framåt gäller ett annat krav.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "Halva lastens vikt",
  "variants": [
   {
    "question": "Hur stor del av lastens vikt motsvarar minstakravet bakåt?",
    "options": [
     "80 procent",
     "50 procent",
     "5 procent"
    ],
    "correct": 1
   }
  ]
 },
 {
  "id": "ykb-cargo-all",
  "title": "Säkra lasten i alla riktningar",
  "category": "Gods & lastsäkring",
  "track": "Lastbil",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/gods-och-buss/matt-och-vikt/att-lasta-ratt/",
  "question": "Du har säkrat lasten framåt. Vad måste du också tänka på?",
  "translation": "ثبتّ الحمولة إلى الأمام. ما الذي يجب مراعاته أيضاً؟",
  "options": [
   "Att den är säkrad bakåt och åt sidorna",
   "Att enbart långsam körning räcker",
   "Att lastsäkring inte behövs på korta resor"
  ],
  "correct": 0,
  "simple": "Lasten ska vara säkrad framåt, bakåt och åt sidorna. Låg hastighet ersätter inte lastsäkring.",
  "ar": "يجب تثبيت الحمولة إلى الأمام والخلف والجانبين. القيادة البطيئة لا تغني عن تثبيت الحمولة.",
  "why": "Lasten ska vara säkrad framåt, bakåt och åt sidorna. Låg hastighet ersätter inte lastsäkring.",
  "wrong": [
   "",
   "Det alternativet uppfyller inte den regel som frågan gäller. Lasten ska vara säkrad framåt, bakåt och åt sidorna. Låg hastighet ersätter inte lastsäkring.",
   "Det alternativet uppfyller inte den regel som frågan gäller. Lasten ska vara säkrad framåt, bakåt och åt sidorna. Låg hastighet ersätter inte lastsäkring."
  ],
  "word": "lastsäkring",
  "meaning": "تثبيت الحمولة",
  "example": "Tänk på bromsning och svängar redan före avfärd.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "Att den är säkrad bakåt och åt sidorna",
  "variants": [
   {
    "question": "Lasten sitter stadigt vid jämn körning. Kan du därför bortse från sidledssäkring?",
    "options": [
     "Ja, på korta transporter",
     "Nej, även sidled måste hanteras",
     "Ja, om föraren kör försiktigt"
    ],
    "correct": 1
   }
  ]
 },
 {
  "id": "ykb-bus-info",
  "title": "Informera om säkerhetsbälte",
  "category": "Passagerarsäkerhet",
  "track": "Buss",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/trafikregler-och-vagmarken/trafikregler/i-fordonet/baltesregler/",
  "question": "Vad ska resenärer i en buss i beställningstrafik informeras om före resan?",
  "translation": "ما المعلومات التي يجب إعطاؤها لركاب حافلة الرحلات الخاصة قبل الرحلة؟",
  "options": [
   "Att bälte bara behövs vid hög fart",
   "Att bälte ska användas under resan",
   "Att bältet alltid är frivilligt"
  ],
  "correct": 1,
  "simple": "Resenärer i beställningstrafik ska informeras om bältesanvändning. Informationen kan exempelvis lämnas med utrop eller förinspelat meddelande.",
  "ar": "يجب إعلام ركاب الرحلات الخاصة باستخدام حزام الأمان. يمكن تقديم المعلومات بإعلان مباشر أو رسالة مسجلة.",
  "why": "Resenärer i beställningstrafik ska informeras om bältesanvändning. Informationen kan exempelvis lämnas med utrop eller förinspelat meddelande.",
  "wrong": [
   "Det alternativet uppfyller inte den regel som frågan gäller. Resenärer i beställningstrafik ska informeras om bältesanvändning. Informationen kan exempelvis lämnas med utrop eller förinspelat meddelande.",
   "",
   "Det alternativet uppfyller inte den regel som frågan gäller. Resenärer i beställningstrafik ska informeras om bältesanvändning. Informationen kan exempelvis lämnas med utrop eller förinspelat meddelande."
  ],
  "word": "beställningstrafik",
  "meaning": "نقل ركاب برحلة خاصة",
  "example": "Informationskraven gäller även linjetrafik med få stopp. Frågan här gäller beställningstrafik.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "Att bälte ska användas under resan",
  "variants": [
   {
    "question": "Kan ett förinspelat meddelande användas för information om bältesanvändning i beställningstrafik?",
    "options": [
     "Nej, aldrig",
     "Bara om alla redan kan reglerna",
     "Ja"
    ],
    "correct": 2
   }
  ]
 },
 {
  "id": "ykb-bus-standing",
  "title": "Stående passagerare",
  "category": "Passagerarsäkerhet",
  "track": "Buss",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/trafikregler-och-vagmarken/trafikregler/i-fordonet/baltesregler/",
  "question": "Ingen sittplats med bälte finns tillgänglig. Vilket krav måste vara uppfyllt för att en resenär ska få stå i bussen enligt den beskrivna regeln?",
  "translation": "لا يتوفر مقعد مزود بحزام. ما الشرط اللازم للسماح للراكب بالوقوف وفق القاعدة المذكورة؟",
  "options": [
   "Att bussen är godkänd för stående passagerare",
   "Att resan är längre än en timme",
   "Att passageraren själv föredrar att stå"
  ],
  "correct": 0,
  "simple": "I den beskrivna situationen måste bussen vara godkänd för stående passagerare. Särskilda regler finns för lokala transporter i tättbebyggda områden.",
  "ar": "في الحالة المذكورة يجب أن تكون الحافلة معتمدة لنقل ركاب واقفين. توجد قواعد خاصة للنقل المحلي في المناطق المبنية.",
  "why": "I den beskrivna situationen måste bussen vara godkänd för stående passagerare. Särskilda regler finns för lokala transporter i tättbebyggda områden.",
  "wrong": [
   "",
   "Det alternativet uppfyller inte den regel som frågan gäller. I den beskrivna situationen måste bussen vara godkänd för stående passagerare. Särskilda regler finns för lokala transporter i tättbebyggda områden.",
   "Det alternativet uppfyller inte den regel som frågan gäller. I den beskrivna situationen måste bussen vara godkänd för stående passagerare. Särskilda regler finns för lokala transporter i tättbebyggda områden."
  ],
  "word": "godkänd",
  "meaning": "معتمدة",
  "example": "Bussens godkännande sätter ramarna. Passagerarens önskemål ändrar inte fordonets godkännande.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "Att bussen är godkänd för stående passagerare",
  "variants": [
   {
    "question": "Räcker en resenärs önskemål för att få stå i en buss som inte är godkänd för stående?",
    "options": [
     "Ja, alltid",
     "Nej",
     "Ja, om det är en vuxen"
    ],
    "correct": 1
   }
  ]
 },
 {
  "id": "ykb-bus-charter",
  "title": "Särskild rast i beställningstrafik",
  "category": "Kör- och vilotider · Buss",
  "track": "Buss",
  "source": "https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/kor-och-vilotider/regler-om-kor--och-vilotider/",
  "question": "Du kör tillfällig persontrafik med buss som omfattas av den särskilda rastregeln. Vilken uppdelning kan då vara tillåten?",
  "translation": "تقود حافلة لنقل ركاب عرضي مشمول بقاعدة الاستراحة الخاصة. أي تقسيم يمكن أن يكون مسموحاً؟",
  "options": [
   "5 minuter och 40 minuter",
   "25 minuter och 20 minuter",
   "10 minuter och 35 minuter"
  ],
  "correct": 1,
  "simple": "I den särskilda regeln för tillfällig persontrafik kan 45 minuter delas i två raster om minst 15 minuter vardera. Detta är inte huvudregelns vanliga uppdelning.",
  "ar": "في القاعدة الخاصة بنقل الركاب العرضي يمكن تقسيم 45 دقيقة إلى استراحتين لا تقل أي منهما عن 15 دقيقة. تختلف هذه القاعدة عن التقسيم العام.",
  "why": "I den särskilda regeln för tillfällig persontrafik kan 45 minuter delas i två raster om minst 15 minuter vardera. Detta är inte huvudregelns vanliga uppdelning.",
  "wrong": [
   "Det alternativet uppfyller inte den regel som frågan gäller. I den särskilda regeln för tillfällig persontrafik kan 45 minuter delas i två raster om minst 15 minuter vardera. Detta är inte huvudregelns vanliga uppdelning.",
   "",
   "Det alternativet uppfyller inte den regel som frågan gäller. I den särskilda regeln för tillfällig persontrafik kan 45 minuter delas i två raster om minst 15 minuter vardera. Detta är inte huvudregelns vanliga uppdelning."
  ],
  "word": "tillfällig persontrafik",
  "meaning": "نقل الركاب العرضي",
  "example": "Identifiera trafikslaget först. Läs myndighetskällan om villkor och dokumentation.",
  "cloze": "Rätt alternativ i sak: ___.",
  "answer": "25 minuter och 20 minuter",
  "variants": [
   {
    "question": "Får du automatiskt använda denna flexibla uppdelning för all godstrafik?",
    "options": [
     "Ja, för alla tunga fordon",
     "Ja, om du har YKB",
     "Nej, den särskilda regeln gäller tillfällig persontrafik"
    ],
    "correct": 2
   }
  ]
 }
];
const variantTranslations:Record<string,string>={"rast": "وصل سائق إلى مجموع 4.5 ساعات قيادة. أي استراحة كاملة تحقق الحد الأدنى وفق القاعدة العامة؟", "delad": "يتعلق السؤال بالقاعدة العامة وليس بنقل الركاب العرضي الخاص. ما الحد الأدنى للجزء الأخير من الاستراحة المقسمة؟", "daglig": "يتعلق السؤال بمدة القيادة اليومية العادية دون استثناء. ما الحد الأعلى؟", "ykb-dygn": "تخطط لراحة يومية عادية غير مقسمة وغير مخفضة. أي مدة تحقق الحد الأدنى؟", "ykb-split-dygn": "يأخذ السائق 3 ساعات في الجزء الأول من الراحة. ما الحد الأدنى للجزء الأخير من الراحة اليومية العادية المقسمة؟", "ykb-week-drive": "تتضمن خطتك 57 ساعة قيادة في الأسبوع نفسه. ماذا تنص القاعدة العامة؟", "ykb-two-weeks": "يقود سائق 45 ساعة في أسبوع و46 في الأسبوع التالي. كيف يُقيّم المجموع وفق الحد الأساسي للأسبوعين؟", "ykb-week-rest": "تخطط لراحة أسبوعية عادية. أي مدة من هذه المدد تكفي؟", "ykb-reduced-week": "يخطط سائق لراحة أسبوعية مخفضة مدتها 23 ساعة. ماذا تنص القاعدة العامة؟", "ykb-cabin": "الشاحنة مزودة بكابينة نوم مريحة. أين لا يجوز للسائق رغم ذلك قضاء راحته الأسبوعية العادية؟", "ykb-tacho": "هل تكفي بيانات الأسبوع الماضي فقط عند فحص جهاز التسجيل الرقمي؟", "ykb-other-work": "يساعد سائق حافلة الركاب على الصعود والنزول. ما نوع هذا الوقت؟", "ykb-cargo-forward": "يتعلق السؤال بتثبيت الحمولة في اتجاه السير. أي متطلب صحيح؟", "ykb-cargo-side": "ما نسبة وزن الحمولة التي تعادل الحد الأدنى المطلوب إلى الخلف؟", "ykb-cargo-all": "تبدو الحمولة ثابتة أثناء القيادة المنتظمة. هل يمكنك لذلك إهمال تثبيتها جانبياً؟", "ykb-bus-info": "هل يمكن استخدام رسالة مسجلة لإعلام ركاب الرحلات الخاصة بوجوب استخدام حزام الأمان؟", "ykb-bus-standing": "هل تكفي رغبة الراكب للسماح له بالوقوف في حافلة غير معتمدة لنقل ركاب واقفين؟", "ykb-bus-charter": "هل يمكنك تلقائياً استخدام هذا التقسيم المرن للاستراحة في كل عمليات نقل البضائع؟"};
export const skills:Skill[]=[...originalSkills.filter(k=>["rast","delad","daglig"].includes(k.id)).map(k=>({...k,track:"both" as const,source:drivingSource})),...extraYkb,...expandedYkb,suppliedExample].map(k=>{const a=arabicSupport[k.id];return {...k,verification:k.verification||"source-checked",optionsAr:k.optionsAr||a?.options,exampleAr:k.exampleAr||a?.example,memoryAr:k.memoryAr||a?.example||k.ar,wrongAr:k.wrongAr||k.options.map((_,i)=>i===k.correct?"":"هذا الاختيار لا يوافق الحالة المذكورة. "+k.ar),variants:k.variants.map(v=>({...v,translation:variantTranslations[k.id]||v.translation,optionsAr:v.optionsAr||a?.variantOptions}))}});
export const sentenceWords=[
{sv:"minst",ar:"على الأقل",help:"En lägsta gräns. Mer kan fungera."},
{sv:"högst",ar:"على الأكثر",help:"En övre gräns. Mindre kan fungera."},
{sv:"inte",ar:"لا / ليس",help:"Frågan kan be dig hitta det felaktiga."},
{sv:"sammanlagt",ar:"إجمالاً",help:"Lägg ihop delarna."},
{sv:"sammanhängande",ar:"متواصل",help:"I ett enda stycke, utan avbrott."},
{sv:"därefter",ar:"بعد ذلك",help:"Det som kommer sedan."},
{sv:"huvudregeln",ar:"القاعدة العامة",help:"Den allmänna regeln. Undantag kan finnas."}
];
export function normalizeAnswer(x:string){return x.trim().toLocaleLowerCase("sv-SE").replace(/[.!?]$/,"")}
export function shuffled<T>(items:T[],random=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
