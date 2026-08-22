# NEXO 1 — PR #12 Saved Places: correzione serializzazione multi-instance

## Dati attività
- Data e ora UTC: 2026-08-22 00:06 UTC.
- Obiettivo: risolvere i P1 della review indipendente su PR #12, con priorità alla serializzazione globale delle mutazioni Saved Places e al gate del validatore concettuale.
- Stato finale: **parziale / bloccato sul gate governance**. Il P1 funzionale è stato corretto e coperto da checker; il validatore canonico non è stato eseguito su un checkout completo finale e quindi non viene dichiarato PASS.
- Branch: `nexo1/f1-saved-places-core`.
- Pull request: PR #12 `feat(f1): saved places local-first core`.
- Base verificata: `main` `213fb129201230c3875e5fb8fc157260f995fe04`.
- PR verificata prima della consegna: OPEN, DRAFT, mergeable, non mergeata.

## READ realmente eseguito
Sono stati riletti/verificati tramite GitHub connector:
- `AGENTS.md`;
- Issue #11 — NEXO Coordination Board, inclusi mandato lungo NEXO 1 e CHANGES REQUIRED di NEXO REVIEW;
- PR #12 e review/thread pertinenti;
- stato reale di `main` e della PR #12;
- `frontend/src/features/saved-places/{types,codec,repository,service,index}.ts`;
- `frontend/scripts/check-saved-places.mjs`;
- `scripts/check_conceptual_master.py` e i file che esso richiede;
- aree concorrenti: PR #17/#18 e vincolo di non interferenza con iOS/EAS/TestFlight.

## P1 funzionale — diagnosi
La prima correzione spostava la coda dalla singola `SavedPlacesService` al repository, ma la coda era inizialmente indicizzata per **identità dell'oggetto storage**. Questo proteggeva due repository che condividono la stessa istanza `SavedPlacesStorage`, ma non due adapter distinti che puntano allo stesso backend AsyncStorage globale e alla stessa chiave.

Durante VERIFY questo limite è stato individuato prima della riconsegna. La soluzione finale serializza quindi le mutazioni per **namespace/chiave canonica di Saved Places**, non per identità dell'adapter. In questo modo repository e service distinti nello stesso runtime JS non possono eseguire contemporaneamente read-modify-write sulla stessa collezione `nexo.saved-places.v1`.

## Modifiche funzionali reali
Commit della correzione successiva allo SHA revisionato `c5bb2e2b358f1319453697304a9e23ec775d81cc`:
1. `32153cad7277a274c8d2dea6026013b50fc61aeb` — prima serializzazione condivisa nel repository.
2. `c5df731e81c8bc46bf0dba556faed1b8d6030003` — contratto `SavedPlacesRepository.mutate<T>` / `SavedPlacesMutation<T>`.
3. `9048424ebbc857e09ee52f9c45bd4ed315c10fee` — service migrato da queue per istanza a transazioni repository.
4. `fdb641cedb9d56f7db1b6ca961d4ab95b9456b1c` — prima regressione cross-instance.
5. `fe7cebb31b8ed5fd35238c93c654adaa3b7cbb00` — serializzazione rinforzata per namespace/chiave, indipendente dall'identità dell'adapter storage.
6. `3fba5b39ad1aaccbf99353db2be8a42e247ec745` — regressione con **due adapter storage distinti** sullo stesso backend simulato.

File funzionali modificati in questa correzione:
- `frontend/src/features/saved-places/repository.ts`;
- `frontend/src/features/saved-places/types.ts`;
- `frontend/src/features/saved-places/service.ts`;
- `frontend/scripts/check-saved-places.mjs`.

Nessuna modifica funzionale a iOS/EAS/TestFlight, credenziali, mappe/provider, voice core, surface core, PR #17 o PR #18.

## VERIFY realmente eseguito
### 1. Confronto remoto della correzione iniziale
Tramite GitHub connector è stato confrontato `c5bb2e2...` → `fdb641c...`:
- `ahead_by=4`;
- `behind_by=0`;
- file toccati: esattamente i quattro file Saved Places sopra indicati.

Dopo questo controllo sono stati aggiunti i due commit di rinforzo `fe7cebb...` e `3fba5b3...`; il diff finale remoto deve essere nuovamente verificato prima della consegna a review.

### 2. TypeScript / checker comportamentale in harness locale ricostruito
Il runtime di questa chat non dispone del checkout GitHub né delle dipendenze del repository. I file Saved Places correnti sono stati ricostruiti in `/tmp/nexo1verify` dai contenuti letti via connector. Per permettere il caricamento runtime di `repository.js` è stato creato **solo nel workspace temporaneo**, non nel repository, uno stub di `@react-native-async-storage/async-storage`.

Primo tentativo di output directory:
```sh
cd /tmp/nexo1verify/frontend
npx tsc --strict --target ES2022 --module node16 --moduleResolution node16 --skipLibCheck --outDir ../../out/features/saved-places src/features/saved-places/*.ts
node scripts/check-saved-places.mjs
```
Esito: TypeScript exit `0`; checker exit `1` perché l'output era stato scritto un livello troppo in alto rispetto all'import `../../out/...` del checker. Questo tentativo **non è PASS**.

Secondo tentativo con output relativo corretto:
```sh
cd /tmp/nexo1verify/frontend
npx tsc --strict --target ES2022 --module node16 --moduleResolution node16 --skipLibCheck --outDir ../out/features/saved-places src/features/saved-places/*.ts
node scripts/check-saved-places.mjs
```
Esito iniziale: TypeScript exit `0`; checker exit `1` per `MODULE_NOT_FOUND: @react-native-async-storage/async-storage` nel workspace temporaneo.

È stato quindi aggiunto soltanto nel test harness `/tmp/nexo1verify/node_modules/@react-native-async-storage/async-storage/index.js` uno stub minimale, perché i test usano `MemoryStorage` e non invocano l'adapter reale. Nuova esecuzione:
```sh
cd /tmp/nexo1verify/frontend
node scripts/check-saved-places.mjs
```
Esito: exit `0`; output `saved-places checks: PASS`.

Copertura del checker corrente:
- create Home/Work concorrenti;
- unicità Home/Work;
- persistenza e codec con caratteri speciali/newline;
- icone rapide Home/Work;
- update/delete/reorder;
- read failure senza perdita dati;
- write failure;
- stale navigation confirmation;
- **due `SavedPlacesService` distinti, due `LocalSavedPlacesRepository` distinti e due adapter `MemoryStorage` distinti che condividono lo stesso backend simulato**, con create Home/Work concorrenti e verifica che entrambe le scritture sopravvivano.

**Limite importante:** questo controllo è stato eseguito su un harness ricostruito dai contenuti letti via connector, non su un checkout byte-per-byte del branch. Per questo viene registrato come evidenza comportamentale utile, ma non sostituisce un controllo finale su checkout completo.

### 3. Validatore canonico `scripts/check_conceptual_master.py`
È stato letto realmente lo script corrente. Il validatore usa esclusivamente file locali e non richiede rete durante l'esecuzione, ma questa sessione non possiede un checkout completo da passargli.

Tentativo di ottenere i file direttamente dal runtime via GitHub/raw URL:
- rete del container non disponibile per GitHub / DNS (`Temporary failure in name resolution` / precedente `Could not resolve host: github.com`).

Di conseguenza il comando richiesto:
```sh
python3 scripts/check_conceptual_master.py .
```
**NON è stato eseguito contro un checkout completo finale e NON viene dichiarato PASS.** Questo resta il blocco reale che impedisce a NEXO 1 di dichiarare PR #12 CLEAN/completata.

## Verificato realmente
- PR #12 resta DRAFT e non mergeata;
- il P1 multi-instance esisteva nello SHA revisionato;
- il service corrente usa il contratto repository `mutate` invece della queue per singola istanza;
- la serializzazione finale è per namespace Saved Places nel runtime, quindi non dipende dall'identità dell'adapter storage;
- il checker contiene una regressione con due adapter distinti sullo stesso backend simulato;
- il checker dell'harness ricostruito termina PASS dopo la predisposizione locale dello stub runtime;
- nessun file iOS/EAS/TestFlight è stato intenzionalmente modificato in questa correzione.

## Deducibile ma non dichiarato come verifica finale
La nuova serializzazione per chiave elimina nel singolo runtime JavaScript il lost-update fra repository/service distinti che operano sulla stessa collezione Saved Places. Non dimostra atomicità fra processi/runtime separati; tale scenario non è richiesto dal core local-first corrente e richiederebbe un meccanismo di storage transazionale esterno.

## Non verificato / blocchi
- `python3 scripts/check_conceptual_master.py .` su checkout completo finale: **BLOCCATO dall'assenza di checkout/materializzazione completa nel runtime della chat**.
- test su device/UI: non eseguiti, fuori perimetro del core.
- workflow CI sullo SHA corrente: nessun run dedicato disponibile al momento del controllo.

## Stato requisito concettuale
Nessuna casella viene promossa a `[x]`:
- C001: `[ ]`, `parziale`;
- C002: `[ ]`, `parziale`;
- C003: `concettuale`, fuori perimetro;
- C005: `[ ]`, `parziale`.

## Rischi residui
- Gate governance del validatore concettuale ancora aperto.
- PR #12 deve restare DRAFT finché NEXO REVIEW non rivaluta il nuovo SHA e il Coordinatore non autorizza diversamente.
- La serializzazione è in-process; non è una transazione cross-process.

## Prossimo passo consigliato
1. verificare il diff remoto finale e lo SHA dopo reporting;
2. consegnare PR #12 a NEXO REVIEW dichiarando esplicitamente il gate validator non chiuso;
3. non effettuare merge;
4. appena disponibile un ambiente con checkout completo, eseguire `python3 scripts/check_conceptual_master.py .`, registrare exit code/output e riconsegnare lo SHA finale.

## Decisioni richieste a Fabio
Nessuna decisione di prodotto. Il blocco è esclusivamente di evidenza/verifica; nessun workaround o rilancio iOS è necessario.
