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

È stato verificato che nessuna PR aperta possiede `frontend/src/location/**`. L'overlap residuo riguarda soltanto file condivisi conceptual/reporting e richiede serializzazione prima del merge.

## PLAN
Piano registrato sulla Coordination Board #11 prima della prima modifica, commento `5377849285`.

Piano applicato: branch da current main; state machine provider-neutral isolata; checker deterministico; workflow dedicato; aggiornamento conservativo C007 `[ ] / parziale`; verifica finale; reporting e handoff REVIEW.

## Modifiche concrete
Creato `frontend/src/location/state-machine.ts` con stati `idle`, `ready`, `degraded`, `stale`, `unavailable`, `denied`, `restricted`, `error`. Denied/restricted eliminano fix; fix senza grant ignorato; fix invalido produce error; unavailable/provider-error eliminano fix; degraded/stale conservano soltanto ultimo fix reale ma non sono usable; solo granted + ready + fix valido è usable. Nessuna posizione viene sintetizzata.

Aggiornato `frontend/src/location/index.ts`; creato `frontend/scripts/check-location-state-machine.mjs`; creato `.github/workflows/location-state-machine.yml`; aggiornato C007 senza promuoverlo a implementato.

## File creati/modificati
- `frontend/src/location/state-machine.ts` — creato;
- `frontend/src/location/index.ts` — modificato;
- `frontend/scripts/check-location-state-machine.mjs` — creato;
- `.github/workflows/location-state-machine.yml` — creato;
- `docs/product/NEXO_CONCEPTUAL_MASTER.md` — modificato solo per C007;
- `docs/codex-reports/2026-08-22_042800_f1-location-permission-state-machine.md` — creato e finalizzato;
- `docs/codex-reports/LATEST.md` — aggiornato con percorso + copia integrale verbatim del presente rapporto;
- `Fabio/FABIO_CONTROLLO.md` — aggiornato con stato sintetico.

Nessun file eliminato.

## Commit creati prima del reporting finale
- `3389f5bcb93838924a33207afb79f73c6bac407f` — state machine;
- `a7d6aacf979c81a40c7d08fde0f5a3d1f08a9975` — checker;
- `5c2722c4cc86af84d5c0400e3aa9e2d3903ec8ba` — export;
- `ad4f4d7ba14ae3a3ec0c6b5ce339f3d82a93ba21` — workflow;
- `f9c53e40732dce009379a67fd899cfd7679865a7` — evidenza C007.

## Comandi/check realmente eseguiti
Sul contenuto funzionale/conceptual `f9c53e40732dce009379a67fd899cfd7679865a7`:
- `npm ci` — PASS; 15 vulnerabilità dipendenze preesistenti (1 moderate, 14 high).
- `npx expo-doctor` — PASS, 18/18.
- `npm run lint` — PASS, 0 errori / 1 warning preesistente.
- `npx tsc src/location/contract.ts src/location/state-machine.ts --target ES2020 --module commonjs --strict --skipLibCheck --outDir /tmp/nexo-location-state` — PASS.
- `node scripts/check-location-state-machine.mjs /tmp/nexo-location-state/state-machine.js` — PASS, `location-state-machine checks: PASS`.
- `python3 ../scripts/check_conceptual_master.py ..` — PASS; V=51, E=47, U=31, C=7; registry coherent.
- Location State Machine run #2 `32551730907`, job `96979479985` — SUCCESS.
- Location Contract run #8 `32551730913` — SUCCESS.

Run precedenti al conceptual non sono usati come verifica conclusiva.

## VERIFY finale prima del reporting
- PR #23 OPEN / DRAFT / mergeable.
- C007 resta `[ ] / parziale`.
- Nessun provider OS/GPS introdotto.
- Nessuna posizione inventata.
- Nessuna modifica a voice/surface/navigation/automotive/EAS/TestFlight.

I commit di reporting successivi non modificano path funzionali/conceptual. Eventuali workflow osservati su SHA post-reporting vengono registrati separatamente senza sostituire l'evidenza funzionale sopra.

## Errori, warning e limiti
- 15 vulnerabilità npm preesistenti.
- 1 warning lint preesistente.
- warning GitHub Actions sulla deprecazione runtime Node 20 delle action.
- Nessun test device reale.
- Nessuna permission OS reale.
- Nessun provider GPS/location reale.
- Nessuna soglia freshness/accuracy: N1.5.
- Nessun adapter iOS/Android: N1.6.

## Aree non toccate
Voice, Android readiness, navigation, surface, automotive native, `frontend/app.json`, `frontend/eas.json`, TestFlight/EAS e credenziali Apple/EAS.

## Problemi residui / rischi tecnici
- PR #23 richiede review indipendente sul nuovo exact SHA post-rettifica reporting prima di merge.
- Shared conceptual/reporting richiede serializzazione del Coordinatore.
- N1.5 non va aggiunto alla PR #23 durante review.

## Prossimo passo consigliato
Handoff a NEXO REVIEW sul nuovo exact SHA della PR #23; attendere CLEAN/serializzazione prima di N1.5 salvo direttiva separata del Coordinatore.

## Decisioni richieste a Fabio
Nessuna.
