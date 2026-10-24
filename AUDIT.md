# TR-os – projektgranskning och genomförandeplan

Granskning: 24 oktober 2026. Projektet använder Next/Vinext, React och TypeScript med Cloudflare D1 för inloggad elevdata.

## Redan implementerat

- 325 Komarken-frågeplatser med svensk originaltext, automatöversatt arabiska, bilder där tillgängligt och facit med tydlig källstatus.
- Träningsbana med fem steg per prov, återkoppling, sparade misstag, repetitionsschema, självskattad säkerhet och ämnesöversikt.
- YKB-förklaring, arabiskt stöd, ledtrådar, läsläge, ordlista, studieplan, korta prov och åtta interaktiva körsituationer.
- Begreppskarta, personlig framstegssammanställning, lokal/offline kursbaserad sökning samt Nilo-avatar.
- Säker serverväg för OpenAI-baserad Nilo och ElevenLabs TTS; dessa fungerar bara när servernycklar och databasmigreringar är konfigurerade.
- Gästframsteg sparas lokalt. Inloggade elevdata kan sparas i D1. Ingen elevadministrationspanel finns.

## Viktigaste luckor

- Nilos offlinehjälp söker främst i introduktionskursen och språkövningarna; den letar inte systematiskt i hela importerade Komarken-banken.
- Frågeformaten är mest flervalsfrågor. Sökning, ordlista och begreppskarta är startversioner, inte full täckning.
- Elevöversikten visar ämnesförsök och repetition men saknar tillförlitlig tidsmätning och tydlig resultatkurva över tid.
- Buss/lastbil är inte konsekvent klassificerat i varje importerad fråga. Arabiska banktexter är maskinöversatta.
- Svensk kvinnoröst, generativ AI, molnsynk och hel produktionsbyggnad kräver verifiering i den anslutna driftsmiljön.
- Projektets tester finns; installerad system-Node är 20 men projektet kräver minst 22.13. En separat Node 24-runtime finns för verifiering.

## Genomförande

1. **Stabilitet och innehåll:** förbättra frågeflöde, källmärkning och säker fallback; behåll spärren mot gissade facit.
2. **Språk och Nilo:** gör offlinehjälpen sökbar över den lokala, källmärkta frågebanken; verifiera AI-kontext och felmeddelanden utan att exponera nycklar.
3. **Aktiv träning och framsteg:** utöka användbara träningsformat och elevens faktiska historik där befintliga data räcker.
4. **Kvalitet:** kör relevanta automatiska tester, typkontroll och produktionsbygge; kontrollera sedan den lokala förhandsvisningen och dokumentera kvarvarande driftkrav.

Frågor som bygger på Komarkens övningsresultat markeras som källfacit, inte som officiella Trafikverket-/Transportstyrelseprov. Ingen framgång i det officiella provet garanteras.

## Resultat i den här genomgången

- **Fas 1 — stabilt innehåll:** Frågeflödet visar nu feedback direkt efter kontroll och scrollar till förklaringen.
- **Fas 2 — språk och Nilo:** Offlinehjälpen söker i den svenska/arabiska frågebanken. När server-AI är konfigurerad hämtar servern en relevant källverifierad fråga och dess facit; API-nycklar och elevdata exponeras inte i klienten.
- **Fas 3 — träning och framsteg:** Plan, misstag, repetition, självskattad säkerhet och begreppskarta finns redan. Fler träningsformat, studietid och resultatkurva över tid återstår.
- **Fas 4 — kvalitet:** 29 automatiska tester passerar. Ändrade TypeScript-filer ger inga syntaxdiagnoser och den lokala förhandsvisningen är granskad. Produktionsbygget kunde inte köras eftersom `vinext` och `typescript` saknas i den lokala `node_modules`-installationen.

Arabisk språkgranskning, klassificering mellan buss/lastbil, livekoppling för röst och AI samt verifiering av molnsynk behöver fortfarande redaktionell kontroll eller rätt driftinställningar.
### Uppföljning — studiesökning 24 oktober 2026
Studiesökningen länkar nu mellan lokala YKB-frågor, ordlista, begreppskarta, scenarier och misstagsbok, inklusive förvalda mål. Webbläsarkontroll verifierade frågeträff/facitstatus, rätt ordlisteterm och rätt scenariolänk. 29 automatiska tester och syntaxkontroll för sex ändrade moduler passerar. Förhandsvisningen är uppdaterad. Fullt produktionsbygge och full typkontroll återstår på grund av saknade beroenden i `node_modules`.
