# NEXO 1 — F1 Saved Places local-first core

## Dati attività

- **Data e ora UTC:** 2026-08-21 09:12:31 UTC
- **Obiettivo:** implementare il primo slice F1 realmente indipendente emerso dall'Audit F1: core local-first per Casa, Lavoro e preferiti, senza geocoding, routing, provider o integrazione root UI.
- **Stato finale del task:** completato nel perimetro del core; i requisiti utente C001/C002/C005 restano correttamente `parziale` e `[ ]` perché UI, ricerca, voce e suggerimenti non sono ancora integrati.
- **Ramo:** `nexo1/f1-saved-places-core`
- **Pull request:** PR #12 — `feat(f1): saved places local-first core`
- **Base finale:** `main` `1c66a29b24df20ce7bded3b514ce88e534077281` (PR #9 TestFlight già unita).
- **SHA esaminato prima del commit documentale finale:** `5e46f43b51af44fcdc8226ce6c54e033bb8e0955`.
- **SHA del commit documentale finale:** non disponibile al momento della creazione del rapporto; viene creato atomically con questo rapporto, `LATEST.md` e il cruscotto Fabio.

## READ verificato realmente

Sono stati letti e confrontati prima dell'implementazione:

- Issue #11, inclusi gli aggiornamenti operativi e le aree riservate;
- `AGENTS.md`;
- `docs/product/NEXO_CONCEPTUAL_MASTER.md`;
- `NEXO_VEO_VISION_ROADMAP.txt`;
- UX/UI e Audit F1 già registrato sulla Coordination Board;
- stato reale di `main` e PR aperte;
- `frontend/src/utils/storage/index.ts` e struttura frontend reale.

Durante il lavoro `main` è avanzata per il merge della PR #9. NEXO 1 si è fermato, ha ripetuto READ e ha ricostruito il proprio branch sopra la nuova `main` prima di proseguire.

## PLAN applicato

Task selezionato: **F1-SAVED-PLACES** perché non richiede provider, backend, SDK, `app.json`, `package.json`, shell o file del lavoro TestFlight. Il perimetro è stato registrato sulla Issue #11 prima di scrivere codice.

Aree funzionali riservate a NEXO 1:

- `frontend/src/features/saved-places/`
- `frontend/scripts/check-saved-places.mjs`
- aggiornamenti documentali obbligatori del task dopo il rilascio delle aree PR #9.

## File creati

- `frontend/src/features/saved-places/types.ts`
- `frontend/src/features/saved-places/codec.ts`
- `frontend/src/features/saved-places/repository.ts`
- `frontend/src/features/saved-places/service.ts`
- `frontend/src/features/saved-places/index.ts`
- `frontend/scripts/check-saved-places.mjs`
- `docs/codex-reports/2026-08-21_091231_f1-saved-places-core.md`

## File modificati

- `docs/product/NEXO_CONCEPTUAL_MASTER.md`
- `docs/codex-reports/LATEST.md`
- `Fabio/FABIO_CONTROLLO.md`

## Modifiche concrete

- Modello provider-neutral `SavedPlace` con tipi `home`, `work`, `favorite`.
- Casa e Lavoro sono unici e opzionali; hanno icone rapide di default e non possono perderle tramite aggiornamento con icona vuota.
- Preferiti nominabili, modificabili, eliminabili e riordinabili.
- Repository local-first con chiave versionata `nexo.saved-places.v1`, senza nuovi package e senza modificare il wrapper storage condiviso.
- Codec testuale versionato con percent-encoding, così valori con separatori, percentuali o newline persistono senza collisioni.
- Scritture fallite producono errore esplicito invece di dichiarare successo.
- La richiesta di navigazione è neutrale e viene prodotta soltanto con `confirmed === true`; con conferma assente restituisce `null` e non chiama provider/router.
- C001, C002 e C005 aggiornati a `parziale` mantenendo `[ ]`; C003 resta `concettuale`.

## Commit del branch prima del commit documentale finale

1. `2c05b5766052c7da147d9191a1c09981a6f1e634` — core local-first ricostruito sopra la `main` post-PR9.
2. `4878b6e2d4804d3a8ad1d70ada76406317a3a204` — checker comportamentale riproducibile.
3. `c58d8d5cf3662b24ab1df7a2ff7066baed08e346` — preservazione icone rapide Home/Work emersa nel self-review.
4. `711eb86f07bcb2146f02ac5b348d7b258768ffc4` — copertura test dell'invariante icona rapida.
5. `5e46f43b51af44fcdc8226ce6c54e033bb8e0955` — stato concettuale parziale e stato reale aggiornato.

Il precedente commit `15fb1c8...` derivato dalla vecchia `main` è stato sostituito durante il riallineamento del branch e non appartiene alla cronologia finale della PR.

## VERIFY — controlli realmente eseguiti

### 1. Compilazione TypeScript strict del core

Comando:

```sh
tsc --strict --target ES2022 --module commonjs --moduleResolution node --skipLibCheck --outDir /tmp/nexo1work/out/features/saved-places src/features/saved-places/*.ts
```

- **Exit code:** `0`
- **Esito:** PASS.

### 2. Checker comportamentale versionato

Comando:

```sh
node scripts/check-saved-places.mjs
```

- **Exit code:** `0`
- **Output:** `saved-places checks: PASS`
- **Esito:** PASS.

Scenari coperti: creazione, trim input, unicità Casa, icone rapide, persistenza dopo ricreazione repository/service, caratteri speciali/newline, update, reorder persistente, reorder incompleto rifiutato, conferma navigazione, delete, fallimento write storage.

### 3. Scansione euristica segreti sui file funzionali/checker

Comando:

```sh
if grep -RInE '(api[_-]?key|secret|token|password|BEGIN [A-Z ]*PRIVATE KEY)' src/features/saved-places scripts/check-saved-places.mjs; then exit 1; else exit 0; fi
```

- **Exit code:** `0`
- **Esito:** PASS, nessun pattern trovato.

### 4. Trailing whitespace sui file funzionali/checker

Comando:

```sh
if grep -RInE '[[:blank:]]+$' src/features/saved-places scripts/check-saved-places.mjs; then exit 1; else exit 0; fi
```

- **Exit code:** `0`
- **Esito:** PASS.

## Controlli non eseguiti / limiti ambiente

- `python3 scripts/check_conceptual_master.py .` **non eseguito localmente**: l'ambiente shell disponibile non riesce a risolvere `github.com`/`raw.githubusercontent.com`, quindi non è stato possibile materializzare in modo affidabile l'intero repository corrente. Non viene dichiarato PASS.
- Test su device reale: non applicabile a questo slice, che non è ancora collegato alla UI/runtime utente.
- Geocoding, routing, mappa, voce/STT e backend: volutamente fuori perimetro.

## Self-review e correzioni prima della Codex Review

Il self-review ha trovato un'incoerenza: un update con icona vuota poteva rimuovere l'icona rapida da Casa/Lavoro. È stata corretta prima della review e il checker ora copre l'invariante.

## Rischi tecnici / debito residuo

- Il wrapper storage condiviso restituisce il fallback sia su miss sia su errore di lettura; il repository feature non può distinguere questi due casi senza cambiare il contratto shared. Le scritture fallite sono invece rilevate. Questa limitazione va rivalutata quando verrà definita la politica storage/persistenza F1 completa.
- Nessun adapter di geocoding/routing è ancora collegato: `destinationText` resta intenzionalmente provider-neutral.
- Nessuna UI rende ancora i luoghi accessibili; per questo C001/C002/C005 non sono marcati implementati e C003 resta concettuale.

## Verificato / dedotto / non verificato

### Verificato realmente

- isolamento del diff funzionale rispetto a PR #9;
- branch basato sulla `main` post-merge PR9;
- compilazione strict e checker comportamentale;
- assenza di nuovi package/config/provider/backend;
- stati C001/C002/C005 mantenuti parziali e non spuntati.

### Dedotto ma non dichiarato come test

- il core è compatibile strutturalmente con il singleton storage esistente perché ne usa soltanto i metodi `getItem`/`setItem` previsti dal contratto.

### Non verificato

- esperienza utente su iPhone;
- integrazione con mappa/search/voice/routing;
- comportamento su failure reale di AsyncStorage del device;
- validatore globale del registro nell'ambiente locale, per il limite di rete sopra descritto.

## Prossimo passo

Portare PR #12 a review, richiedere `@codex review` sullo SHA finale e correggere qualsiasi rilievo prima del merge. L'integrazione UI/search/voice resta un task separato successivo, non va assorbita in questa PR.

## Decisioni richieste a Fabio

Nessuna per questo slice. Il task non introduce costi, provider, credenziali o scelte di prodotto irreversibili.
