# NEXO 1 — N1.4 Location Permission / Degraded State Machine

## Dati attività
- **Data e ora UTC:** 2026-08-22 04:28 UTC.
- **Task Control Plane:** `N1.4 — LOCATION PERMISSION / DEGRADED STATE MACHINE`.
- **Obiettivo richiesto:** introdurre semantiche deterministiche `denied`, `restricted`, `unavailable`, `stale`, `degraded` ed `error` sopra il contratto location provider-neutral già in main, preservando comportamento fail-closed e divieto di inventare una posizione.
- **Stato finale:** completato / pronto per handoff a NEXO REVIEW; NEXO 1 non dichiara CLEAN.
- **Branch:** `nexo1/f1-location-permission-state-machine`.
- **Base:** `main` `8d8dee4a31416acb38c2e654082ca15efafd6fec`.
- **Pull request:** PR #23 `feat(location): add permission degraded state machine`, DRAFT.
- **SHA funzionale/conceptual verificato:** `f9c53e40732dce009379a67fd899cfd7679865a7`.
- **Workflow conclusivi:** Location State Machine run #2 `32551730907`, job `96979479985`, SUCCESS; Location Contract run #8 `32551730913`, SUCCESS.

## READ realmente eseguito
Prima della scrittura sono stati riletti/verificati:
- `AGENTS.md` su `main`;
- Issue #11 e aggiornamenti recenti di governance/conflitti;
- `coordination/agents/README.md`;
- `coordination/agents/NEXO_1.md`;
- `coordination/reports/NEXO_1_REPORT.md` e REVIEW NOTE disponibili;
- `main` corrente `8d8dee4a31416acb38c2e654082ca15efafd6fec`;
- PR aperte #17, #18, #19, #20;
- `frontend/src/location/contract.ts` e `frontend/src/location/index.ts`;
- `.github/workflows/location-contract.yml`;
- `docs/product/NEXO_CONCEPTUAL_MASTER.md`.

È stato verificato che nessuna PR aperta possiede `frontend/src/location/**`. PR #18/#19/#20 risultavano non mergeable nel controllo corrente, mentre PR #17 restava DRAFT; nessuna di esse autorizzava modifica delle aree Location. L'overlap residuo riguarda soltanto file condivisi conceptual/reporting e richiede serializzazione prima del merge, non impedisce una PR dedicata da current main.

## PLAN
Piano registrato sulla Coordination Board #11 prima della prima modifica, commento `5377849285`.

Piano applicato:
1. nuovo branch da current main;
2. state machine provider-neutral isolata;
3. checker deterministico senza nuove dipendenze;
4. workflow dedicato;
5. aggiornamento conservativo di C007 mantenendo `[ ] / parziale`;
6. verifica finale su SHA aggiornato dopo il conceptual;
7. reporting e handoff REVIEW senza proseguire N1.5 sullo stesso exact SHA.

## Modifiche concrete
### State machine Location
Creato `frontend/src/location/state-machine.ts` con:
- stati runtime `idle`, `ready`, `degraded`, `stale`, `unavailable`, `denied`, `restricted`, `error`;
- eventi permission, fix, degraded, stale, unavailable, provider-error e reset;
- `denied` e `restricted` eliminano qualsiasi fix e restano inutilizzabili;
- fix ricevuti senza permission `granted` vengono ignorati;
- fix invalido produce `error` e nessun fix utilizzabile;
- `unavailable` e provider error eliminano il fix;
- `degraded` e `stale` possono conservare esclusivamente l'ultimo fix reale ricevuto, ma `isUsableLocationRuntimeState()` restituisce sempre false per tali stati;
- solo `granted + ready + fix valido` è considerato utilizzabile.

Non viene mai sintetizzata una coordinata o una posizione di fallback.

### Export
Aggiornato `frontend/src/location/index.ts` per esportare anche la state machine.

### Checker deterministico
Creato `frontend/scripts/check-location-state-machine.mjs` con casi reali e riproducibili:
- initial idle non usable;
- fix prima del grant ignorato;
- denied senza fix;
- restricted senza fix;
- granted + fix valido => ready/usable;
- degraded conserva ultimo fix reale ma non usable;
- stale conserva ultimo fix reale ma non usable;
- unavailable elimina fix;
- provider-error elimina fix;
- fix invalido => error/no fix/unusable.

### CI dedicata
Creato `.github/workflows/location-state-machine.yml` con:
- `npm ci`;
- Expo Doctor;
- lint;
- compilazione TypeScript strict isolata di contract + state machine;
- checker state machine;
- validator concettuale canonico.

### Registro concettuale
Aggiornato solo C007, mantenendolo `[ ] / parziale`, aggiungendo evidenza PR #23, commit funzionale, checker e workflow. Nessun nuovo ID e nessun `[x]` aggiunto.

## File creati/modificati
File funzionali/verifica/conceptual:
- `frontend/src/location/state-machine.ts` — creato;
- `frontend/src/location/index.ts` — modificato;
- `frontend/scripts/check-location-state-machine.mjs` — creato;
- `.github/workflows/location-state-machine.yml` — creato;
- `docs/product/NEXO_CONCEPTUAL_MASTER.md` — modificato solo per C007.

File reporting dell'attività:
- `docs/codex-reports/2026-08-22_042800_f1-location-permission-state-machine.md` — creato;
- `docs/codex-reports/LATEST.md` — da aggiornare con copia integrale del presente rapporto;
- `Fabio/FABIO_CONTROLLO.md` — da aggiornare con stato sintetico.

Nessun file eliminato.

## Commit creati prima del reporting finale
- `3389f5bcb93838924a33207afb79f73c6bac407f` — state machine;
- `a7d6aacf979c81a40c7d08fde0f5a3d1f08a9975` — checker deterministico;
- `5c2722c4cc86af84d5c0400e3aa9e2d3903ec8ba` — export location;
- `ad4f4d7ba14ae3a3ec0c6b5ce339f3d82a93ba21` — workflow dedicato;
- `f9c53e40732dce009379a67fd899cfd7679865a7` — evidenza C007 nel conceptual master.

I commit di reporting successivi sono auto-referenziali rispetto allo SHA finale del branch; il nuovo exact HEAD viene quindi registrato nella PR, Board e Control Plane dopo l'ultimo commit di reporting invece di inventarlo anticipatamente.

## Comandi/check realmente eseguiti
Dopo il commit conceptual `f9c53e40732dce009379a67fd899cfd7679865a7` sono stati rieseguiti fresh i workflow applicabili.

### GitHub Actions — Location State Machine run #2 / job `96979479985`
1. `npm ci`
   - esito: PASS;
   - 938 package installati;
   - audit: 15 vulnerabilità già presenti (1 moderate, 14 high).

2. `npx expo-doctor`
   - esito: PASS;
   - output: `18/18 checks passed. No issues detected!`.

3. `npm run lint`
   - esito: PASS con warning;
   - 0 errori, 1 warning preesistente in `frontend/app/index.tsx`: `Text` definito ma non usato.

4. `npx tsc src/location/contract.ts src/location/state-machine.ts --target ES2020 --module commonjs --strict --skipLibCheck --outDir /tmp/nexo-location-state`
   - esito: PASS.

5. `node scripts/check-location-state-machine.mjs /tmp/nexo-location-state/state-machine.js`
   - esito: PASS;
   - output: `location-state-machine checks: PASS`.

6. `python3 ../scripts/check_conceptual_master.py ..`
   - esito: PASS;
   - `PASS V: exact stable ID set (51 rows)`;
   - `PASS E: exact stable ID set (47 rows)`;
   - `PASS U: exact stable ID set (31 rows)`;
   - `PASS C: exact stable ID set (7 rows)`;
   - `PASS completion evidence: 0 checked rows valid`;
   - tutte le assertion canoniche PASS;
   - `PASS: conceptual master registry is coherent`.

### GitHub Actions — Location Contract run #8
- esito complessivo: SUCCESS sullo stesso exact SHA funzionale/conceptual `f9c53e40732dce009379a67fd899cfd7679865a7`.
- Conferma che l'estensione N1.4 non rompe il contract Location N1.3 già canonico.

### Run precedenti
Prima dell'aggiornamento conceptual erano già passati Location State Machine run #1 `32551620125` e Location Contract run #7 `32551620193`. Non vengono usati come verifica conclusiva perché il conceptual master è stato modificato successivamente; fanno fede run #2 e #8 fresh sul contenuto aggiornato.

## VERIFY finale prima del reporting
- PR #23: OPEN / DRAFT / mergeable.
- Exact SHA funzionale/conceptual verificato: `f9c53e40732dce009379a67fd899cfd7679865a7`.
- Location State Machine run #2: SUCCESS.
- Location Contract run #8: SUCCESS.
- C007 resta `[ ] / parziale`.
- Nessun provider OS/GPS introdotto.
- Nessuna posizione inventata o fallback sintetico introdotto.
- Nessuna modifica alle aree voice/surface/navigation/automotive/EAS/TestFlight.

I successivi commit di reporting non appartengono ai path funzionali/conceptual osservati dai due workflow e servono esclusivamente a registrare gli esiti reali. Se un file che influenza i workflow venisse modificato dopo questo punto, i check dovrebbero essere rieseguiti.

## Errori, warning e limiti
- `npm ci` segnala 15 vulnerabilità già presenti; N1.4 non modifica `package.json` o lockfile.
- Lint: 1 warning preesistente, 0 errori.
- GitHub Actions segnala deprecazione del runtime Node.js 20 delle action; il setup progetto usa Node 20.20.2 e il job conclude SUCCESS.
- Alcuni package npm riportano warning di deprecazione preesistenti.
- Nessun test su device reale.
- Nessuna permission OS realmente richiesta.
- Nessun provider GPS/location reale collegato.
- Nessuna soglia quantitativa di freshness/accuracy implementata: appartiene a N1.5.
- Nessun adapter iOS/Android concreto o fake adapter: appartiene a N1.6.

## Aree non toccate
- voice / PR #17;
- Android readiness / PR #18;
- navigation / PR #19;
- surface / PR #20;
- automotive native;
- `frontend/app.json`, `frontend/eas.json`, TestFlight/EAS;
- credenziali Apple/EAS, certificati, provisioning, API key e Push Key.

## Problemi residui / rischi tecnici
- La PR #23 deve ricevere review indipendente su exact SHA finale post-reporting prima di qualunque merge.
- Shared conceptual/reporting con altri lavori richiede serializzazione da parte del Coordinatore prima del merge.
- N1.5 non deve essere appeso alla PR #23 mentre la review è in corso, perché cambierebbe l'exact SHA consegnato.

## Prossimo passo consigliato
1. completare `LATEST.md` e `FABIO_CONTROLLO.md` con questo rapporto;
2. registrare l'exact HEAD finale post-reporting;
3. handoff a NEXO REVIEW sulla PR #23 DRAFT;
4. aggiornare task/report Control Plane NEXO 1;
5. rileggere la queue: N1.5 deve restare `[ ] / SAFE FREEZE` finché la review su PR #23 è pendente, salvo diversa direttiva del Coordinatore.

## Decisioni richieste a Fabio
Nessuna.
