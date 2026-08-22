# NEXO CODEX — PR #19 Navigation Domain Core reconciliation finalization

## Dati attività
- **Data e ora UTC:** 2026-08-22 20:05 UTC.
- **Obiettivo richiesto:** riconciliare in sicurezza la PR #19 sul main corrente dopo il merge di #18, preservando il Navigation Domain Core esistente, correggendo soltanto finding ancora reali e completando VERIFY/reporting/handoff exact-SHA senza introdurre provider, runtime mappa/GPS, EAS o TestFlight.
- **Stato finale:** completato lato autore per reconciliation, correzione conceptual e VERIFY; attende NEXO REVIEW exact-SHA.
- **Branch:** `nexo-codex/f0-navigation-domain-core`.
- **Pull request:** #19 — `feat(navigation): add provider-neutral domain core`, DRAFT.
- **Current main:** `b1fa88453a81b15f1dc433fa6503c81292a4a48e`.
- **HEAD storico preservato:** `7210baef8693f1a8e77da8750ff2e4e597534cbe` sul backup `backup/pr19-before-b1fa8845`.
- **HEAD tecnico riconciliato pre-conceptual:** `40645cd3930e1278b21e8d5de44e59a230a626df`.
- **HEAD conceptual verificato:** `fa10def694ef9b642358cd6e4ab94a697e22d5b9`.

## READ realmente eseguito
Prima della scrittura sono stati riletti/verificati:
- `AGENTS.md` integralmente su main;
- Issue #11 — NEXO COORDINATION BOARD e direttive recenti di strict serial merge queue;
- current main dopo merge #18;
- PR #19 storico, diff, exact HEAD, mergeability e file modificati;
- backup storico della PR #19;
- `frontend/src/navigation/domain.ts` storico;
- `frontend/scripts/check-navigation-domain.mjs` storico;
- `.github/workflows/navigation-domain.yml` storico;
- `docs/product/NEXO_CONCEPTUAL_MASTER.md` su current main e sul vecchio branch;
- report storico `2026-08-22_000500_navigation-domain-core.md`;
- stato della PR #20, mantenuta fuori perimetro fino al merge #19.

## PLAN applicato
1. Salvare l'exact HEAD storico #19 su un backup prima di qualsiasi spostamento branch.
2. Usare il current main come base canonica, senza trascinare copie stale di `LATEST.md`, `FABIO_CONTROLLO.md` o altri file globali.
3. Ripristinare soltanto Navigation Domain Core, checker e workflow già esistenti.
4. Verificare il core sul branch riconciliato.
5. Aggiornare esclusivamente V06/V21/V26/V27 con evidenza reale e mantenere V28 `concettuale`, perché Route Explanation non è implementata/testata in questa PR.
6. Rieseguire i workflow applicabili dopo la modifica conceptual.
7. Preservare il rapporto storico originario e generare reporting finale corrente.
8. Consegnare un final exact SHA a NEXO REVIEW; nessun merge autonomo da CODEX.

## WRITE realmente eseguito
### Reconciliation sicura
È stato creato il backup `backup/pr19-before-b1fa8845` sul vecchio HEAD `7210baef...`. Il branch PR #19 è stato riallineato al current main `b1fa8845...` e sono stati ripristinati esclusivamente:
- `frontend/src/navigation/domain.ts`;
- `frontend/scripts/check-navigation-domain.mjs`;
- `.github/workflows/navigation-domain.yml`.

Il reset temporaneo del branch al current main ha fatto chiudere automaticamente GitHub la PR perché non esisteva più un delta; dopo il ripristino dei file Navigation la PR #19 è stata riaperta. Nessun contenuto è andato perso grazie al backup exact-SHA.

### Navigation Core preservato
Restano presenti e invariati nel significato:
- `DestinationRef`;
- `LocationSample`;
- `RouteRequest`;
- `RouteCandidate`;
- `RecalculationRequest`;
- `RoutingAdapter` provider-neutral;
- `NavigationSession` con stati `idle/planning/ready/navigating/recalculating/completed/cancelled/failed`;
- guardie su transizioni illegali, request/candidate, selezione route e ricalcolo;
- selezione alternativa deterministica;
- checker lifecycle/cancel/failure/recalculation/immutabilità/idempotenza;
- nessuna dipendenza da provider mappe.

### Correzione conceptual reale
Il current main era canonico e riportava V06/V21/V26/V27/V28 tutti `concettuale`. Dopo il VERIFY del core, sono state aggiornate solo cinque righe:
- V06 → `[ ] / parziale` con evidenza PR #19, core reconciliato e Navigation Domain SUCCESS; nessuna mappa/routing reale.
- V21 → `[ ] / parziale` per `RoutePreference` fastest/shortest/balanced/scenic; nessun provider reale.
- V26 → `[ ] / parziale` per candidates, `alternativesLimit` e selezione deterministica; nessuna Alternative Live runtime.
- V27 → `[ ] / parziale` per `RecalculationRequest` e lifecycle di ricalcolo; nessun ricalcolo continuo GPS/provider.
- V28 → resta `[ ] / concettuale`; PR #19 non implementa né testa Route Explanation. Il finding storico che l'aveva promossa a `parziale` è quindi corretto conservativamente.

La patch del commit conceptual `fa10def694ef9b642358cd6e4ab94a697e22d5b9` modifica esclusivamente queste cinque righe del registro.

## Cronologia commit della reconciliation corrente
- `3a1f11cfc3b5d0400c1f50306b6621d3b90489e4` — ripristino Navigation Domain Core sul current main.
- `d0576c61d5f777114cfc39d921d1f3802b7e2253` — ripristino checker deterministico.
- `40645cd3930e1278b21e8d5de44e59a230a626df` — ripristino workflow Navigation Domain.
- `fa10def694ef9b642358cd6e4ab94a697e22d5b9` — evidenze conceptual riconciliate e V28 mantenuta conservativa.
- `5d2f0cae8482ac8ac5621c310b534eb4487c834a` — ripristino verbatim del rapporto storico originale dal backup.
- commit reporting finali successivi — presente rapporto, `LATEST.md`, `FABIO_CONTROLLO.md`; exact HEAD finale registrato nell'handoff.

## Inventario completo file della PR dopo reconciliation
### Funzionali/workflow
- `frontend/src/navigation/domain.ts` — ripristinato sul current main.
- `frontend/scripts/check-navigation-domain.mjs` — ripristinato.
- `.github/workflows/navigation-domain.yml` — ripristinato.

### Conceptual
- `docs/product/NEXO_CONCEPTUAL_MASTER.md` — soltanto V06/V21/V26/V27/V28.

### Reporting
- `docs/codex-reports/2026-08-22_000500_navigation-domain-core.md` — storico originale preservato verbatim.
- `docs/codex-reports/2026-08-22_200500_pr19-navigation-reconciliation.md` — presente rapporto.
- `docs/codex-reports/LATEST.md` — aggiornato con path + copia integrale del presente rapporto.
- `Fabio/FABIO_CONTROLLO.md` — aggiornato sinteticamente.

### Eliminati
- nessuno.

## Comandi/check realmente eseguiti e risultati
### VERIFY reconciled technical HEAD `40645cd3930e1278b21e8d5de44e59a230a626df`
Workflow osservati:
- Navigation Domain run `32595355232`: **SUCCESS**.
- NEXO 3 Voice Validation run `32595355258`: **SUCCESS**.
- Android Readiness run `32595355237`: **SUCCESS**.

La workflow Navigation Domain esegue realmente:
1. `npm ci`;
2. `npx expo-doctor`;
3. `npm run lint`;
4. `node scripts/check-navigation-domain.mjs`.

### VERIFY post-conceptual exact SHA `fa10def694ef9b642358cd6e4ab94a697e22d5b9`
Tutti i workflow applicabili osservati sono `completed/success`:
- Navigation Domain run `32595518558`: **SUCCESS**;
- NEXO 3 Voice Validation run `32595518559`: **SUCCESS**;
- Android Readiness run `32595518694`: **SUCCESS**;
- Location Contract run `32595518590`: **SUCCESS**;
- Location State Machine run `32595518652`: **SUCCESS**;
- Location Quality Policy run `32595518566`: **SUCCESS**.

Il conceptual validator canonico è eseguito dalla NEXO 3 Voice Validation; la conclusione SUCCESS del run `32595518559` verifica il registro dopo l'edit V06/V21/V26/V27/V28.

## Verificato realmente
- PR #19 è stata ricostruita sul current main dopo backup del vecchio HEAD.
- Sul technical HEAD `40645cd...` la PR risultava OPEN/DRAFT/mergeable=true, base current main.
- Navigation Domain, Expo Doctor, lint e checker hanno conclusione SUCCESS tramite run `32595355232`.
- Dopo l'edit conceptual, Navigation Domain e conceptual validator risultano nuovamente SUCCESS sul contenuto `fa10def...`.
- Voice, Android Readiness e l'intera foundation Location non risultano regrediti nei workflow post-conceptual.
- V28 non viene promossa senza evidenza.
- Nessun provider mappe/routing reale, GPS runtime, UI mappa, EAS Build o TestFlight è stato introdotto.

## Dedotto ma non usato come prova conclusiva
I commit successivi che ripristinano lo storico e aggiornano esclusivamente reporting non modificano gli input di Navigation Domain, conceptual validator o codice applicativo. Il loro effetto viene comunque controllato mediante diff/fresh metadata prima del verdetto REVIEW.

## Non verificato / limiti
- nessun routing reale end-to-end;
- nessun provider mappe/routing;
- nessun GPS/device reale;
- nessuna mappa/UI di navigazione;
- nessuna Route Explanation runtime;
- nessuna Alternative Live reale;
- nessun ricalcolo continuo guidato da GPS/provider;
- nessun CarPlay/Android Auto runtime;
- nessun EAS Build/TestFlight;
- nessuna credenziale letta o modificata.

## Errori e warning rilevati
- Chiusura temporanea automatica della PR #19 quando il branch è stato portato esattamente a current main: comportamento GitHub previsto, risolto riaprendo la PR dopo il ripristino del delta; backup storico preservato.
- Nessun errore nei workflow post-conceptual elencati sopra.
- Warning/deprecazioni di dipendenze eventualmente presenti restano preesistenti e non vengono corretti opportunisticamente in questa PR.

## Problemi non risolti
- PR #19 richiede NEXO REVIEW sul final exact HEAD post-reporting.
- PR #20 resta congelata finché #19 non è CLEAN e mergeata dal Coordinatore.

## Dipendenze / credenziali ancora necessarie
Nessuna per chiudere il domain core. Provider mappe/routing e relative credenziali saranno necessari solo per un futuro vertical slice runtime e richiedono decisione separata.

## Rischi tecnici
- Il domain core è una foundation e non deve essere confuso con navigazione reale.
- L'adapter provider-neutral dovrà essere preservato quando verrà scelto un provider reale.
- V26/V27 sono parziali soltanto a livello di dominio: la parola `Live`/`continuo` non è ancora soddisfatta runtime.
- V28 deve restare concettuale finché non esiste una Route Explanation realmente implementata e testata.

## Prossimo passo consigliato
Fresh exact HEAD/mergeability/thread/diff review da NEXO REVIEW. Se CLEAN e HEAD invariato, Ready + squash merge Coordinator. Solo dopo il merge rileggere il nuovo main e autorizzare esclusivamente la PR #20.

## Decisioni richieste a Fabio
Nessuna. Nessuna spesa, credenziale o TestFlight/EAS è richiesta per questo merge gate.
