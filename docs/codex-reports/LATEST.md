Rapporto storico: `docs/codex-reports/2026-08-22_022837_f1-location-contract.md`

# NEXO 1 — N1.3 F1 Location Contract

## Dati attività
- **Data e ora UTC:** 2026-08-22 02:28:37 UTC.
- **Task Control Plane:** `N1.3 — F1 LOCATION CONTRACT`.
- **Obiettivo richiesto:** introdurre un contratto foreground location provider-neutral con coordinate, accuratezza, timestamp e semantiche permission/status/error, senza provider concreto e senza inventare una posizione.
- **Stato finale:** completato / pronto per handoff a NEXO REVIEW.
- **Branch:** `nexo1/f1-location-contract`.
- **Base:** `main` `47b9d0a5c20490f0b73e95e52fadca151e89e136` (merge PR #12 CLEAN).
- **Pull request:** PR #22 `feat(location): add provider-neutral foreground location contract`, DRAFT.
- **SHA funzionale/conceptual verificato:** `0d148712426e381b83a3cb0fe2f8895dcca57096`.
- **Workflow verificato:** Location Contract run #3 `32546311607`, job `96965279495`, SUCCESS.

## READ realmente eseguito
Prima della scrittura sono stati riletti/verificati:
- `AGENTS.md` su `main`;
- Issue #11 e aggiornamenti di governance/concorrenza;
- `coordination/agents/README.md`;
- `coordination/agents/NEXO_1.md`;
- `coordination/reports/NEXO_1_REPORT.md`, inclusa REVIEW NOTE CLEAN della PR #12;
- `main` post-merge PR #12, SHA `47b9d0a...`;
- PR aperte #17, #18, #19 e #20;
- `docs/product/NEXO_CONCEPTUAL_MASTER.md`;
- `scripts/check_conceptual_master.py`;
- `frontend/tsconfig.json` e `frontend/package.json`;
- workflow Navigation Domain come riferimento di verifica isolata.

È stato verificato che nessuna PR aperta possiede `frontend/src/location/**`. Le sovrapposizioni residue sono documentali: conceptual/reporting condivisi con altri lavori devono essere serializzati prima del merge.

## PLAN
Piano registrato sulla Coordination Board #11 prima della prima modifica, commento `5377348213`.

Durante il lavoro è emersa una dipendenza reale: il validator canonico accettava esattamente C001–C006. Poiché il nuovo contratto richiede un nuovo ID stabile C007, il piano è stato raffinato e registrato sulla Board, commento `5377366858`, includendo il solo aggiornamento `expected_ids("C", 7, 3)` nel validator.

## Modifiche concrete
### Contratto location
Creato `frontend/src/location/contract.ts` con:
- `LocationPermissionStatus`: `undetermined`, `granted`, `denied`, `restricted`;
- `ForegroundLocationStatus`: `idle`, `ready`, `unavailable`, `error`;
- error code espliciti per permission denied/restricted, location unavailable, provider error e invalid fix;
- `LocationFix` con `latitude`, `longitude`, `horizontalAccuracyM`, `timestampMs`;
- `ForegroundLocationState` con permission/status/fix/error;
- `isValidLocationFix()` per range/finiteness/accuracy/timestamp;
- `isCoherentForegroundLocationState()` con fail-closed semantics.

Un `ready` è coerente soltanto con permission `granted`, fix reale valido e nessun errore. Stati non-ready non sintetizzano mai coordinate.

Creato `frontend/src/location/index.ts` per esportare il contratto.

### Checker riproducibile
Creato `frontend/scripts/check-location-contract.mjs` con casi deterministici:
- fix valido;
- latitudine > 90 rifiutata;
- longitudine < -180 rifiutata;
- accuratezza negativa rifiutata;
- timestamp NaN rifiutato;
- `ready + granted + valid fix` accettato;
- `ready + denied` rifiutato;
- `unavailable` senza fix con errore coerente accettato;
- `error` senza fix e con errore accettato;
- `idle` senza fix/errore accettato.

### CI dedicata
Creato `.github/workflows/location-contract.yml` con:
1. checkout;
2. Node 20;
3. `npm ci`;
4. Expo Doctor;
5. lint;
6. TypeScript compile isolata del contract;
7. checker location;
8. validator concettuale canonico.

### Registro concettuale
Aggiunto `C007` come `[ ] / parziale`: il solo contratto provider-neutral è presente e verificato; non esistono ancora provider/GPS runtime, integrazione UI o lettura posizione reale.

Aggiornato `scripts/check_conceptual_master.py` esclusivamente da C count 6 a 7 per includere il nuovo stable ID C007.

## File creati/modificati
File funzionali/verifica/conceptual:
- `.github/workflows/location-contract.yml` — creato;
- `frontend/src/location/contract.ts` — creato;
- `frontend/src/location/index.ts` — creato;
- `frontend/scripts/check-location-contract.mjs` — creato;
- `docs/product/NEXO_CONCEPTUAL_MASTER.md` — modificato, aggiunto C007;
- `scripts/check_conceptual_master.py` — modificato, stable C set da 6 a 7.

File reporting dell'attività:
- `docs/codex-reports/2026-08-22_022837_f1-location-contract.md` — creato;
- `docs/codex-reports/LATEST.md` — aggiornato con copia integrale di questo rapporto;
- `Fabio/FABIO_CONTROLLO.md` — aggiornato.

Nessun file eliminato.

## Commit creati prima del reporting finale
- `3771d8569b198498d7e32c5c8e3068ac0ccefed5` — contratto provider-neutral;
- `4f272cd6325cda533cfde7ea17f61cd299cd0e87` — export location;
- `7f315756a6be1eaf2c598903c6411aa48e0cf242` — checker deterministico;
- `ae85c941094e787c8132756cf06f7b42f3eb0b1d` — workflow Location Contract;
- `cbed2ac128dc0da5d3d1d5304c7d74b041956dcd` — registro C007;
- `0d148712426e381b83a3cb0fe2f8895dcca57096` — validator stable-set C007.

I commit di reporting successivi sono auto-referenziali rispetto al contenuto di questo stesso rapporto; l'exact SHA finale viene registrato nella PR, nella Board e nel Control Plane dopo l'ultimo commit invece di inventarlo anticipatamente.

## Comandi/check realmente eseguiti
### GitHub Actions — run #3 / job `96965279495`
Checkout della merge ref PR #22 con head funzionale/conceptual `0d148712...`.

1. `npm ci`
   - esito: PASS;
   - 938 package installati;
   - audit: 15 vulnerabilità dipendenze esistenti (1 moderate, 14 high).

2. `npx expo-doctor`
   - esito: PASS;
   - output: `18/18 checks passed. No issues detected!`.

3. `npm run lint`
   - esito: PASS con warning;
   - 0 errori, 1 warning preesistente in `frontend/app/index.tsx`: `Text` definito ma non usato.

4. `npx tsc src/location/contract.ts --target ES2020 --module commonjs --strict --skipLibCheck --outDir /tmp/nexo-location-contract`
   - esito: PASS.

5. `node scripts/check-location-contract.mjs /tmp/nexo-location-contract/contract.js`
   - esito: PASS;
   - output: `location-contract checks: PASS`.

6. `python3 ../scripts/check_conceptual_master.py ..`
   - esito: PASS;
   - `PASS V: exact stable ID set (51 rows)`;
   - `PASS E: exact stable ID set (47 rows)`;
   - `PASS U: exact stable ID set (31 rows)`;
   - `PASS C: exact stable ID set (7 rows)`;
   - `PASS completion evidence: 0 checked rows valid`;
   - tutte le assertion canoniche PASS;
   - `PASS: conceptual master registry is coherent`.

### Verifica locale supplementare
Il tentativo reale di `git clone` del branch nel runtime locale è fallito con exit 128 per DNS: `Could not resolve host: github.com`; non è stato usato come evidenza di checkout.

È stata comunque eseguita una ricostruzione esatta dei due file contract/checker già scritti su GitHub e sono stati eseguiti:
- TypeScript compile strict isolata;
- checker Node;
- risultato: `location-contract checks: PASS`.

L'evidenza conclusiva primaria resta la GitHub Actions run #3 sul contenuto della PR.

## VERIFY finale
- PR #22: OPEN / DRAFT / mergeable.
- Head funzionale/conceptual verificato: `0d148712426e381b83a3cb0fe2f8895dcca57096`.
- CI Location Contract run #3: SUCCESS.
- Tutti gli step del job `96965279495`: SUCCESS.
- C007 resta `[ ] / parziale`; nessuna funzione utente viene marcata `[x]`.
- Nessun provider location concreto introdotto.
- Nessuna posizione di fallback o inventata introdotta.

Le sole modifiche successive al run #3 sono reporting obbligatorio; non modificano i path che influenzano il contract/checker/conceptual validator.

## Errori, warning e limiti
- `npm ci` segnala 15 vulnerabilità nelle dipendenze già esistenti; nessuna dipendenza è stata modificata da N1.3.
- Lint: 1 warning preesistente in `frontend/app/index.tsx`, 0 errori.
- GitHub Actions segnala deprecazione Node.js 20 per action runtime; il job usa Node 20.20.2 per il progetto e conclude SUCCESS.
- Nessun test su device reale.
- Nessun GPS/OS location provider collegato.
- Nessuna permission OS realmente richiesta.
- Nessuna mappa, routing, UI o navigazione reale implementata.

## Aree non toccate
- voice core / PR #17;
- Android readiness / PR #18;
- navigation domain / PR #19;
- surface core / PR #20;
- `frontend/app.json`, `frontend/eas.json`, TestFlight/EAS;
- credenziali Apple/EAS, certificati, provisioning, API key, Push Key.

## Problemi residui / rischi tecnici
- La semantica permission/degraded più completa è il task N1.4, non anticipata qui.
- Freshness/quality policy è N1.5.
- Adapter iOS/Android e fake adapters sono N1.6.
- PR #19/#20 e altri lavori aperti condividono conceptual/reporting: prima del merge serve serializzazione sul main corrente per evitare perdita di evidenze.

## Prossimo passo consigliato
1. consegnare PR #22 a NEXO REVIEW sul nuovo exact SHA finale dopo reporting;
2. mantenere PR DRAFT;
3. aggiornare Control Plane NEXO 1 con N1.3 `[x]` soltanto dopo conferma di report/handoff;
4. rileggere immediatamente la queue e prendere N1.4 solo se ancora eleggibile e senza nuovi conflitti.

## Decisioni richieste a Fabio
Nessuna.
