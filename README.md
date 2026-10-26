# YKB Akademi
A working bilingual sample learning application, built on the supported Sites Vinext/React runtime with D1 storage and Sites authentication.

## Scope and limitations
Includes a responsive dashboard, truck/bus tracks, four introductory lessons, six original source-backed questions, Swedish/Arabic explanations, Swedish speech synthesis, bookmarks, mistake review, transparent SM-2-inspired scheduling, short timed quizzes, reports, glossary, and server-authorized question import/update/export.

This is a sample course, not a complete official curriculum, authorized training provider or official question bank. Safe driving/cargo/passenger lessons are introductions; they do not yet have corresponding verified practice questions. Full content authoring, varied active-recall formats, comprehensive administration/user management, email/password authentication and a generative AI tutor remain unfinished. Arabic translations require qualified review. Readiness is deliberately not estimated from the small question sample.

## Authentication and data
Hosting uses Sites sign-in, not Supabase. No external credentials are required. Guest progress is device-local; signed-in progress is stored in D1 against the trusted platform user ID. The APIs derive user ID server-side and never accept a client user ID. Avoid using shared browser profiles for guest study.

The database schema stores a versioned learner document containing attempts, answers, bookmarks, lesson completion, exams, and per-question review records. Content overrides and administrator roles are separate tables. This compact model is a starting point; normalized question/answer tables, analytics and conflict-safe multi-device updates should precede a large launch.

Never expose privileged credentials. Provision an administrator out of band by inserting the trusted user ID and role 'admin' into the roles table. No public endpoint assigns roles. The UI's import button is server-authorized.

## Development
Node 22.13+ required.
1. Install dependencies with the Sites install-dependencies helper or npm install.
2. npm run db:generate after schema changes.
3. Apply local migrations using the bundled starter instructions.
4. npm run dev.
5. npm run build; deployment uses the Sites build-site and site-workflow helpers.
Sites provisions the DB binding declared in .openai/hosting.json and applies generated migrations.

Local preview without platform identity operates in guest mode. Guest changes persist in localStorage. Hosted sign-in enables database synchronization. Failed sync is shown in the header; no fake cloud success is displayed.

## Verification
Run node --experimental-strip-types --test tests/learning.test.ts on a recent Node version.
Run npx tsc --noEmit and the production build.
Manually test: sign in, read lesson, answer wrongly, read feedback, save, complete quiz, open mistakes, reload, switch track and Arabic layout, complete timed quiz.

## Sources
Verified 2026-10-23:
- https://www.trafikverket.se/korkort/yrkesprov/yrkeskompetensbevis/
- https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/yrkesforarkompetens/for-forare/grundutbildning/
- https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/yrkesforarkompetens/for-forare/fortbildning/

## AI integration pending
The course guide currently searches approved course text; it is explicitly not a live AI model. A future server-side provider integration must retrieve approved passages, cite sources, reject unsupported legal answers and require administrator review before publishing generated questions. Never put provider keys in NEXT_PUBLIC variables.

## Swedish learning coach (updated)
The home screen now offers a four-stage language learning flow: understand a short bilingual explanation, retrieve a missing word, answer with optional support, then answer a rephrased Swedish question. Includes six concepts (three language concepts and three driving/rest concepts), three support levels, adjustable speech rate, larger text, word saving, shuffled answer positions, feedback, and local review scheduling.
This coach's progress and preferences are separate browser-local records; they do not yet sync with the authenticated server progress. It is a limited sample and cannot establish full exam readiness.
Rules source checked during this update:
https://www.transportstyrelsen.se/sv/vagtrafik/yrkestrafik/kor-och-vilotider/regler-om-kor--och-vilotider/
The exercises explicitly use general rules; special bus charter exceptions are distinguished.
Six automated tests pass. Manual browser checks cover the four-stage interface, incorrect fill-in answer feedback, correct multiple-choice grading, shuffled option display, a new Swedish wording, and reload persistence.

## ElevenLabs speech
Server-side integration: GET /api/speech reports configuration; authenticated POST /api/speech reads approved course text using ElevenLabs Multilingual v2.
Configure ELEVENLABS_API_KEY as a server secret (see .env.example); the endpoint uses ElevenLabs’ Adam preset voice for Swedish questions and accepts a learner-selected speed from 0.7× to 1.2×. Never send the key through chat or put it in client code. Apply migration 0001_speech_usage before enabling.
Speech generation is limited to 24 requests per authenticated user per UTC hour using an atomic database counter. Provider errors are sanitized. Course text is transmitted to ElevenLabs only when the learner selects that voice and presses a listening button.
The static local preview has no server integration: ElevenLabs is visibly marked as awaiting connection, and browser speech remains available. No live provider call has been tested because credentials are absent.
API reference: https://elevenlabs.io/docs/api-reference/text-to-speech/convert

## Game-inspired learning path
Home now includes a six-lesson path, an original SVG study buddy (Viggo), lesson completion markers, per-attempt XP, a configurable daily XP goal, consecutive study-day counts, a session progress bar and encouragement after answers.
XP starts from recorded attempts after this feature was introduced: 10 XP for correct answers and 2 XP for an incorrect attempt. Historical aggregated answers are not converted to XP. Study days use the browser's local calendar dates; progress remains local to the browser.
All eight unit tests pass, including XP aggregation, current-day totals and streak gaps. Syntax checks pass. Browser verification confirms the path, folded speech controls and keyboard activation of the correct lesson. Motion respects reduced-motion preferences. The sample course still contains six coached concepts.

## Sequential lessons and dimensional feedback
The path now unlocks lessons in order. Completion requires a correct answer to the final rephrased question without revealing help; a wrong or assisted final answer offers another attempt before completion. Previously saved completion markers remain valid.
A claimable chest after the first three lessons awards 20 XP once. Levels advance every 100 XP. The system has no competitive ranking, payments or limited lives.
New motion includes dimensional button press states, an active lesson ring, a breathing original mascot, stage transitions, answer feedback and one-shot celebration particles. Reduced-motion preferences suppress animation and confetti. The reward dialog supports Escape and keyboard focus containment.
Ten unit tests pass. Browser checks confirm sequential disabled states, available current lesson, one-time reward eligibility display and persisted prior completion. Live reward collection and ElevenLabs playback were not exercised.

## YKB-first redesign — 2026-10-24
Standalone Swedish vocabulary lessons have been removed from the published learning path and exercise rendering. Every coached session now starts directly with a YKB multiple-choice question. Optional simple Swedish, Arabic translation, key vocabulary and listening remain inside the question.
The coached bank contains 18 YKB concepts, each with two formulations (36 total), including 12 shared concepts, 3 truck concepts and 3 bus concepts. Each track exposes 15 concepts / 30 formulations. The general question bank also retains 6 original introductory questions, for 42 unique question IDs across both tracks.
Home offers a five-question quick session, a 15-question mixed session and topic-specific practice. Quick and topic modes allow all selected subjects without sequential unlocks. The game path retains a two-formulation learning mode and sequential progression. The first YKB chest has a new ID so an old language-course reward cannot be mistaken for completion of the new YKB section.
Official sources were consulted 2026-10-24. Questions explicitly identify general rules and special bus charter rules. A discovered temporary exception TSFS 2026:56 expired 2026-06-14 and was not used as the general rule.
12 unit tests pass. Browser checks confirm direct entry into question 1 of 5 and optional Swedish/Arabic support within the question. All progress remains browser-local in this preview; the bank is original sample practice and does not claim official examination-question status.

## Expanded Arabic YKB bank and memory system — 2026-10-24
The coached bank now contains 50 YKB concepts / 100 original formulations across both tracks. There are 34 shared concepts and 8 specific to each vehicle track, exposing 42 concepts / 84 formulations per track. Six older introductory questions remain in the classic bank (106 total unique IDs).
All 100 coached formulations have Arabic questions and answer options. Each concept includes Arabic explanation, an explanation for a wrong answer and an Arabic memory/example text. Course-derived scenario questions are labelled separately from source-checked numeric rules; they are not official examination questions. New coverage includes economy, risk, vehicle checks, fatigue/stress, ergonomics, emergency response, accessibility and professional conduct. The sample is broader, not a claim of complete official curriculum coverage or a complete official examination bank. Arabic text and scenario answers still need qualified editorial review before broad production use.

Transparent memory scheduling (lib/memory.ts):
- Incorrect answer: 10 minutes.
- Correct but uncertain: 30 minutes.
- Confident recall: initially 1 day, then 3 days, then an ease-adjusted interval capped at 60 days.
- Independent mastery requires at least 3 confident recalls, both formulations, and at least 2 distinct study days.
- Arabic/hint-assisted answers do not establish independent Swedish recall.
- Quick sessions reinsert an incorrectly answered concept later in the queue, at most twice per concept per session.
- A review dashboard shows actual scheduled dates. Daily sessions prioritise due material, then unseen or weak material.

Arabic explanations have optional Arabic speech with browser voice fallback. Browser voice availability varies by device; live ElevenLabs playback remains unconfigured. All progress is device-local in this preview.
16 automated tests pass, covering content integrity, Arabic-option alignment, answer identities, repeated-recall intervals, uncertainty, mastery, and practice selection. Browser checks confirm the enlarged bank counts, bilingual question/answer rendering and confidence controls. The official YKB test-information page and current consolidated TSFS 2020:29 (through TSFS 2026:71) were consulted; no complete reusable official YKB question bank was found.

Manual browser verification in a separate test storage profile:
- Started an unrestricted topic session.
- Answered the split-break question incorrectly.
- Confirmed the queue expanded from 10 to 11 questions.
- Confirmed Arabic correct answer, selected wrong answer, explanation and memory cue.
- Confirmed the review dashboard persisted 1 error and a next-review time approximately ten minutes later.
The test did not modify the user's study history. The temporary test page was removed.

## Visuellt lärstöd – 24 oktober 2026
Ny egen figur Nilo, avatarval, situationsbilder, två korta lokala MP4-filmer med svenska/arabiska undertexter, stegvis frågehjälp och lugnt läsläge. Hjälpanvändning räknas även efter stängning. Se ../asset-notes.md. Filmuppspelning och hjälp kontrollerade i webbläsaren. Befintliga 16 tester passerar; full produktionsbyggnad fortfarande ej verifierad.

## TR-os – fokuserad frågevy, 24 oktober 2026
Bytte synligt namn, sidtitel och videobrandning till TR-os utan att ändra befintliga lagringsnycklar. Ett fokuserat lektionsläge med stora svarskort, blandad svarsordning, progressindikator, fast kontrollrad, läsläge och stegvis valbar hjälp ersätter den tidigare långa frågesidan. Tangentbordsfokus hålls inom frågeläget.
Den bifogade filen är huvudsakligen en specifikation, med en färdig flervalsfråga om kontroll före körning. Denna fråga är införd med fyra alternativ, arabiska texter, felsvarsförklaringar och en andra egen formulering. Inga nya officiella provfrågor påstås.
Frågemotorn hanterar nu olika antal svarsalternativ. Coachbanken har 51 begrepp / 102 formuleringar, 86 formuleringar per spår. Klassiska frågebanken har 108 frågor. Provade hela flödet med separat testprofil: fel svar → förklaring → återkommande ny formulering → rätt svar → resultatsida. Alla 16 tester passerar, syntaxkontroll utan fel. Full produktionsbyggnad och molnfunktioner är fortfarande inte verifierade.

## Komarken – extern frågekälla, 24 oktober 2026
Användaren angav https://www.komarken.se/ykb-provfragor/. Sidan laddade efter timeout och visar fem interaktiva övningsprov. Lade till ett källkort med direktlänk, arabiskt stöd och tydlig information om att externa resultat inte ingår i TR-os-planen. Ingen frågebank kopierades och inga rättigheter till återpublicering kunde verifieras. Inför eventuell import behövs tillstånd/licens och en genomgång av sakuppgifter; webbplatsens egna övningsprov ska inte likställas med officiellt provformat. Syntaxtranspilering utan fel. Ingen förändring av frågebank eller inlärningslogik.


## 3D-frågor och spelljud – 24 oktober 2026
Svarskorten har fått lager, skuggor, mjuka gradienter och tydlig tryckkänsla. En liten 3D-scen med Nilo, fordon och polletter reagerar på rätt, fel och sparat svar. Rätt svar firas med stjärnor och en kort reaktion. Långa sviter visas utifrån verkliga svar i det aktuella passet. Lugnt läsläge och systeminställningen för minskad rörelse stänger av animationerna.
Tre egna lokala WAV-ljud: rätt (0,63 s), fel (0,49 s) och neutralt sparat (0,33 s). Ingen extern ljudtjänst används. Ljud på/av sparas per profil och uppdateras mellan appens frågevyer. Inga ljud spelas automatiskt när sidan öppnas. Fel på ljuduppspelning visas som statusmeddelande.
Alla 325 Komarken-frågeplatser (324 unika källfrågor) är importerade. Kompletterade bilder från separata bildbehållare: 55 unika bildfiler används på 68 platser. Bildfilerna har öppnats och verifierats med Pillow. Källänk visas under varje importerad fråga enligt användarens uppgift om tillstånd.
Facit saknas fortfarande: den publika rättningsfunktionen svarade "Invalid request" på ett försök med parametrarna från sidans egen kod. Ingen genomförd provomgång eller personuppgift skickades. De importerade svaren sparas utan rättning eller poäng och använder ett neutralt ljud. Arabiska översättningar för denna importerade bank återstår. Den befintliga kursens rättade övningar har svenska/arabiska förklaringar.
Verifierat i separat webbläsarprofil: felljud spelades efter fel svar, rättljud efter rätt svar, sparljud efter orättat importerat svar. Kontroll av ljudens DOM-tillstånd visade rätt ljudkälla och uppspelning utan mediefel. Tyst läge gav ingen uppspelning, och inställningen återställdes efter omladdning. Ljudfilerna är separata, korta och utan klippning. Alla 18 automatiska tester passerar efter bildkompletteringen; syntaxtranspilering utan fel. Full produktionsbyggnad är fortfarande inte verifierad.

## Komarkens träningsbana och arabiska – 24 oktober 2026
Huvudträningen och navigeringen använder nu Komarkens importerade frågebank. De tidigare egna övningarna är inte längre huvudflödet. Fem källprov har delats i 25 steg (5 steg per prov) med 13 frågor per steg i oförändrad ordning, alla 325 frågeplatser och 324 unika källfrågor. Kortens avsnitt och steg är minipass, inte simuleringar av det officiella provformatet.
Alla frågor och svarsalternativ har arabiska automatöversättningar från Google Translate. 146 texter med facktermer bearbetades med skyddade termersättningar; ett fåtal frågor språkjusterades manuellt. Detta är inte en fullständig professionell språkgranskning. Originalsvenskan visas tillsammans med arabiskan och automatöversättningen anges vid varje fråga.
15 svar har dessutom kontrollerats separat mot Transportstyrelsens och SOS Alarms uppgifter. Den 2026-10-24 hämtades rättningsresultaten från Komarkens fem publika övningsprov efter att proven genomförts. De övriga 310 svaren är därför markerade som källverifierade från Komarkens rättning, inte som officiellt myndighetsfacit.
Kontrollerade fel återkommer högst två extra gånger i samma pass och läggs i repetitionsplanen. Rätt svar kan ge 10 XP en gång per fråga. Ej rättningsbara frågor ger inget XP eller rätt/fel-ljud. Genomgånget steg betyder att frågorna har besvarats, inte att begreppen är behärskade. Befintliga lagringsnycklar och svar bevaras.
Verifierat i separat lokal profil: ett minipass med fel svar, fyra ej rättningsbara frågor och återkommande rättat svar; svensk/arabiskt facit och myndighetslänk; 10 XP och ett genomgånget steg kvar efter omladdning; nästa steg föreslås. 21 automatiska tester passerar, inklusive full innehållstäckning, arabisk fältintegritet, 25 steg utan bortfall, graderingsspärr och XP-skydd mot upprepad belöning. Syntaxtranspilering passerar. Full produktionsbyggnad fortfarande ej verifierad.


## Question lab and learner profile — 24 October 2026
The imported question view now includes a plain-Swedish prompt guide, question-intent cues, and meaning-changing terms (such as negation and minimum/maximum limits). Arabic support can be reduced in steps. Learners can rate their confidence and optionally identify whether language, subject knowledge, situation understanding, rushing, or uncertainty made a question difficult. These are recorded as the learner’s own selections; the app does not infer thoughts. The local topic profile reports attempts, due reviews, spaced mastery evidence, and those selections by topic.

A local seven-day plan collects goal, Swedish support level, prior knowledge, daily study time, an optional target date, and topics to focus on. A searchable Swedish-Arabic starter glossary includes 15 terms with device speech. Short knowledge checks and review queues use answers with explicit provenance. The full Komarken source bank has 325 verified answer occurrences, including 15 independently checked answers; source-based keys are labeled as Komarken results. The plan and glossary are a starter set; target track labeling is not available on every imported question.


## Scenario practice and study search
Eight interactive driver situations cover slippery roads, sudden braking, visibility, cargo checks, fatigue, pre-trip checks, passenger safety, and economical driving. They are practical learning exercises, not official exam questions. The study helper searches the imported Swedish/Arabic questions locally, shows the source-backed explanation only for verified answers, and says when the answer is unknown. No query is sent to an AI provider. Social study groups and the learner-facing administration console are not implemented; protected content write access remains available only to configured server-side administrators.

## Situationsövning från förarhytten — 24 oktober 2026
Situationerna skrivs nu i du-form som händelser i förarhytten, med en cockpitillustration som visar vägen genom vindrutan och animerar relevanta detaljer (regn, bromsljus, varning och trafikljus). Eleven kan slå på svensk uppläsning och själv trycka på Lyssna. Appen väljer en installerad svensk röst med kvinnligt kodad röstnamn när en sådan finns; annars används bästa tillgängliga svenska röst. Röst och naturlighet beror på enhetens installerade röster. Övningen har fortfarande valfri arabisk förklaring och är tydligt märkt som pedagogiska situationer, inte officiella YKB-provfrågor.

## Träningssteg — 24 oktober 2026
Varje källprov visar fem steg, med 13 av provets 65 frågor i varje. Samtliga 325 frågeplatser och ursprunglig frågeordning bevaras. Facit finns nu för alla 325 frågeplatser och är märkt efter källtyp.



## Fem steg per övningsprov — 24 oktober 2026
Varje källprov visar fem steg med 13 frågor i varje. Alla 325 frågeplatser och den ursprungliga frågeordningen bevaras. Facit avlästes från de fem rättningsresultaten hos Komarken den 2026-10-24; 15 svar har dessutom separat myndighetskontroll. Källfacit är inte Transportstyrelsens officiella provfacit.


## Snabbare start och aktiv studieavatar — 24 oktober 2026
Startsidan förklarar nu kort att ett steg har 13 frågor, facit och stöd på svenska/arabiska, med en tydlig knapp för att börja första steget. Nilo visas bredvid varje fråga, ger varierande uppmuntran vid start/rätt/fel/sparat svar och har en knapp som läser upp stödet. Figuren reagerar visuellt medan uppläsningen pågår; mindre rörelse respekteras.
Uppläsningen väljer en installerad svensk kvinnoröst om sådan finns, annars svensk enhetsröst. På den kontrollerade enheten var rösten Microsoft Bengt (svenska); ingen svensk kvinnoröst fanns installerad. Appen visar därför vilken röst som används och hittar automatiskt en svensk kvinnoröst om en sådan installeras. ElevenLabs är inte konfigurerat i den lokala förhandsvisningen.

## Nilo and natural Swedish voice

A floating Nilo companion gives page-aware study prompts throughout the main learning flow and can read them aloud. The server speech endpoint accepts Swedish course text and imported YKB questions after an explicit listen action. Signed-in learners receive 24 requests per hour; visitors can use it without an account with a stricter 6-request hourly limit hashed by client IP. When the server reports ElevenLabs as configured, the app selects it automatically; otherwise it falls back to the available device voice.

The Swedish question voice uses ElevenLabs’ Adam preset when ELEVENLABS_API_KEY and the speech-usage database migration are configured. Learners can choose a saved playback speed from 0.7× to 1.2×; otherwise the app falls back to the device voice. Never put the API key in client code.

Nilo now uses a custom animated SVG character with blinking eyes, waving arms, speech motion, and interactive simple-language, hint, and encouragement actions. The small context-aware teaser opens the coach from any page.

## Nilo AI study coach
Nilo can answer short Swedish or Arabic study questions from the approved introductory course material. The server sends the question and that course material to the OpenAI Responses API. The prompt requires short, accessible answers, source-backed explanations, and an explicit "cannot verify" response when the course material does not support an answer. Imported Komarken questions without verified answers are not used as an answer key.
Set the server-only `OPENAI_API_KEY` secret to enable the feature. Do not place it in client code or send it in chat. Apply migration `drizzle/0002_ai_usage.sql` before enabling; requests are limited to 6 per guest and 24 per signed-in learner per UTC hour. Questions are not stored by the Responses API (`store: false`). Provider credentials are not configured in the local preview, so the AI panel reports when it is unavailable. See the official [Responses API reference](https://developers.openai.com/api/reference/resources/responses/methods/create) and [API key quickstart](https://developers.openai.com/api/docs/quickstart).

## Komarken-sökning i Nilos offlinehjälp — 24 oktober 2026
Nilo söker nu i den svenska och arabiska frågetexten, svarsalternativen och den verifierade förklaringen i den lokala Komarken-banken. Ett svar visar facitets källa och skiljer Komarkens övningsrättning från separat myndighetskontroll. Breda eller svaga träffar ger inget gissat svar. Om banken inte kan hämtas används fortfarande den begränsade introduktionskursen och Nilo berättar när den saknar stöd.

När server-AI är konfigurerad väljer servern själv den relevanta verifierade frågan och lägger endast den frågans facit och förklaring till kursmaterialet. Klienten kan inte skicka ett eget facit som betrodd kontext. Prompten instruerar Nilo att märka Komarkens källfacit och inte kalla det officiellt myndighetsfacit. Ingen API-nyckel flyttas till klienten.

Verifierat: 29 automatiska tester passerar, inklusive fyra nya svenska/arabiska söktester. Förhandsvisningen visar en matchad fråga, rätt svar, förklaring och myndighetskälla. TypeScript-transpilering ger noll syntaxdiagnoser för ändrade moduler. Full typkontroll och produktionsbygge återstår eftersom den lokala installationen saknar `typescript` och `vinext`-paketen.

## Unified studiesökning — 24 oktober 2026
Studiesökningen söker nu lokalt i importerade YKB-frågor, arabiska översättningar, ordlistan, begreppskartan, körscenarier och elevens sparade misstag. Sökresultat länkar vidare till rätt övning och förvalda objekt. Frågeresultat visar facitstatus och källan. Generiska frågor utan stark matchning avvisas i stället för att få ett gissat svar. Sökningen skickar inte text till AI.

## Public Vercel preview
Run `npm run build:vercel` to generate `dist/` for Vercel. This publishes the student-facing static learning app, including the local question bank, bilingual learning flow, scenarios, and browser-local progress. It does not publish `.openai/hosting.json` or any secret files. Account-backed cloud progress, server AI, and ElevenLabs require a Vercel-compatible backend and secure environment-variable/database setup; those services remain unavailable in the static deployment.
