# NEXO 2 — PR #20 Surface Capabilities reconciliation finalization

## Dati attività
- **Data e ora UTC:** 2026-08-22 20:15 UTC.
- **Obiettivo:** riconciliare in sicurezza PR #20 sul main corrente dopo #19, preservare Surface Capabilities, availability/policy ortogonali, fail-closed constraints e conceptual V05/V44/V45/V46, quindi produrre VERIFY/reporting/handoff exact-SHA.
- **Stato finale:** completato lato autore; attende NEXO REVIEW exact-SHA.
- **Branch:** `nexo2/f0-surface-capabilities`.
- **PR:** #20, DRAFT.
- **Current main:** `84c4799307adb6e63421bc0fa58ccb3dd0ad8a76`.
- **HEAD storico preservato:** `6e13d42379a5cff26cb37a67944f89302b925ac4` su `backup/pr20-before-84c47993`.
- **HEAD conceptual verificato:** `4a12effd03ab4034c31a9f45e52ab8c1c8c7d699`.

## READ realmente eseguito
Riletti AGENTS.md, Issue #11, current main, PR #20, review storiche, thread, file del diff, Surface core/checker, conceptual current-main e storico, report storico e stato della queue. La review storica CLEAN su `6e13d423...` è stata usata solo come evidenza storica, non come autorizzazione al merge sul nuovo main.

## PLAN applicato
1. Salvare exact HEAD storico prima della reconciliation.
2. Fare di current main la base canonica.
3. Ripristinare soltanto Surface core/checker già approvati, senza copie stale dei file condivisi.
4. Aggiungere una CI Surface dedicata esclusivamente al VERIFY di reconciliation: npm ci, Expo Doctor, lint, TypeScript strict, checker e conceptual validator.
5. Reintegrare solo V05/V44/V45/V46 nel conceptual corrente, mantenendo `[ ] / parziale` e tutti i nuovi contenuti di main.
6. Preservare il rapporto storico originale e creare reporting finale corrente.
7. Handoff a NEXO REVIEW; nessun nuovo Surface slice.

## WRITE realmente eseguito
Il branch è stato portato al current main dopo aver creato `backup/pr20-before-84c47993`. GitHub ha chiuso temporaneamente la PR quando branch e main coincidevano; la PR è stata riaperta dopo il ripristino del delta.

Ripristinati:
- `frontend/src/core/surface/types.ts`;
- `frontend/src/core/surface/profiles.ts`;
- `frontend/src/core/surface/policy.ts`;
- `frontend/src/core/surface/index.ts`;
- `frontend/scripts/check-surface-capabilities.ts`.

Aggiunto per il solo VERIFY di reconciliation:
- `.github/workflows/surface-capabilities.yml`.

Il fix storico fondamentale resta preservato: `resolveSurfaceCapability()` mantiene la runtime availability (`available/degraded/...`) distinta dalla product policy (`permitted/constrained/prohibited`); una policy `prohibited` imposta `usable=false` senza riscrivere availability. Il checker prova esplicitamente `available + prohibited` e `degraded + prohibited`.

## Conceptual
Partendo dal conceptual canonico post-#19 sono state modificate soltanto V05/V44/V45/V46:
- V05 `[ ] / parziale`: contratti smartphone/CarPlay/Android Auto, nessun runtime automotive.
- V44 `[ ] / parziale`: constraints moving/stopped, nessuna UI finale.
- V45 `[ ] / parziale`: capability/policy e availability ortogonali, nessuna presentazione runtime.
- V46 `[ ] / parziale`: touch/free-text/rich-detail constraints, nessun test in auto.

Un typo involontario su E45 introdotto durante la sostituzione completa del file è stato immediatamente corretto nel commit successivo; la net diff conceptual rispetto a main resta limitata alle quattro righe Surface.

## Commit reconciliation pertinenti
- `9eba1a49de8f970ad3a2623a15e69abbe1657bb3` — Surface types.
- `ce85c1d3682e49f5708044e836a37c64faea56fe` — profiles.
- `55d4d6c26c772d01532630eb8dade853e8801ded` — orthogonal policy.
- `06d322a365f2eda66b7fb65890fe2c82957ef7ff` — public API.
- `4962b4a79a2c5e720daba1596990a0b4bf79c3e5` — checker.
- `f735b7019ca9136e0c208302f620adcfc1c002f2` — Surface reconciliation CI.
- `a5912991083ff60d3c3fea27bc18c3e5ab020438` — V05/V44/V45/V46 evidence.
- `4a12effd03ab4034c31a9f45e52ab8c1c8c7d699` — rimozione typo non intenzionale, nessun altro conceptual change.
- `4a83d69edfb644888d226dc611de75edcce07e91` — storico Surface preservato dal backup.

## Inventario finale atteso della PR
- `.github/workflows/surface-capabilities.yml` — nuovo, solo validation.
- `frontend/src/core/surface/types.ts` — ripristinato.
- `frontend/src/core/surface/profiles.ts` — ripristinato.
- `frontend/src/core/surface/policy.ts` — ripristinato.
- `frontend/src/core/surface/index.ts` — ripristinato.
- `frontend/scripts/check-surface-capabilities.ts` — ripristinato.
- `docs/product/NEXO_CONCEPTUAL_MASTER.md` — V05/V44/V45/V46 soltanto nella net diff.
- `docs/codex-reports/2026-08-21_214943_f0-surface-capabilities.md` — storico originale preservato.
- `docs/codex-reports/2026-08-22_201500_pr20-surface-reconciliation.md` — presente rapporto.
- `docs/codex-reports/LATEST.md` — copia integrale del presente rapporto + percorso.
- `Fabio/FABIO_CONTROLLO.md` — dashboard corrente.

Nessun file eliminato.

## VERIFY realmente eseguito
### Exact conceptual HEAD `4a12effd03ab4034c31a9f45e52ab8c1c8c7d699`
- Surface Capabilities run `32595962428`: **SUCCESS**.
- NEXO 3 Voice Validation run `32595962430`: **SUCCESS**.
- Navigation Domain run `32595962460`: **SUCCESS**.
- Android Readiness run `32595962426`: **SUCCESS**.
- Location Quality Policy run `32595962463`: **SUCCESS**.
- Location State Machine run `32595962436`: **SUCCESS**.
- Location Contract run `32595962371`: inizialmente ancora in progress al momento della prima osservazione finale; deve essere ricontrollato prima del verdetto REVIEW.

La workflow Surface esegue realmente:
1. `npm ci`;
2. `npx expo-doctor`;
3. `npm run lint`;
4. `npx tsc --strict --target ES2022 --module node16 --moduleResolution node16 --skipLibCheck --outDir /tmp/nexo-surface src/core/surface/*.ts scripts/check-surface-capabilities.ts`;
5. `node /tmp/nexo-surface/scripts/check-surface-capabilities.js`;
6. `python3 scripts/check_conceptual_master.py .`.

La conclusione SUCCESS del Surface run dimostra install/Doctor/lint/TypeScript strict/checker/conceptual sul contenuto finale functional+conceptual.

## Verificato realmente
- backup storico creato prima della reconciliation;
- current main usato come base canonica;
- Surface functional core preservato senza riscrittura di comportamento;
- availability e policy restano ortogonali;
- V05/V44/V45/V46 restano `[ ] / parziale`;
- no runtime CarPlay/Android Auto, nessuna UI automotive, nessun EAS/TestFlight, nessuna credenziale.

## Dedotto ma non usato come prova
I successivi commit reporting-only non modificano input del workflow Surface/conceptual. Il final exact HEAD viene comunque sottoposto a fresh diff/mergeability/thread review.

## Non verificato / limiti
- runtime CarPlay/Android Auto;
- entitlements/template automotive;
- test su auto o simulatori automotive;
- UI Surface finale;
- EAS/TestFlight;
- credenziali Apple/EAS.

## Errori e warning
- chiusura temporanea automatica della PR durante il reset a main: prevista, risolta riaprendo dopo il delta;
- typo E45 introdotto accidentalmente durante la sostituzione del conceptual: rilevato dal diff e corretto immediatamente;
- nessun errore nel Surface run `32595962428`.

## Problemi residui
- ricontrollare la conclusione finale del Location Contract run `32595962371`;
- NEXO REVIEW deve revisionare il final exact HEAD post-reporting.

## Dipendenze/credenziali
Nessuna per il merge gate. Runtime automotive futuro richiederà capability native/entitlements e test reali, fuori scope.

## Rischi tecnici
Surface Capabilities è una foundation policy/constraints, non dimostra integrazione CarPlay/Android Auto. La nuova CI è validation-only e non aggiunge runtime.

## Prossimo passo consigliato
Verificare Location Contract final status, final PR metadata/diff/threads; NEXO REVIEW exact-SHA. Se CLEAN, Ready + squash merge Coordinator. Poi produrre report di FULL BACKLOG CONSOLIDATION e non avviare nuovi slice.

## Decisioni richieste a Fabio
Nessuna per il merge. Il prossimo macro-obiettivo, dopo il report di consolidamento, resta una decisione umana; nessun TestFlight/EAS viene avviato.
