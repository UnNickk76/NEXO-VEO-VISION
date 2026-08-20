Rapporto storico: `docs/codex-reports/2026-08-20_204401_audit-tecnico-completo.md`

# Audit tecnico completo e rigoroso di NEXO VEO VISION

## Dati dell'attività

- **Data e ora UTC:** 2026-08-20 20:44:01 UTC
- **Obiettivo richiesto:** audit diagnostico non distruttivo dell'intero repository,
  con verifica di frontend, backend, dipendenze, configurazioni mobili, eseguibilità,
  qualità, sicurezza, automazioni, TestFlight e aderenza alla roadmap; nessuna
  correzione o installazione consentita.
- **Stato finale:** completato
- **Ramo utilizzato:** `work`
- **Commit creati:** il commit documentale verrà creato dopo la redazione del
  rapporto; hash e titolo non sono ancora disponibili nel contenuto incluso nel
  commit stesso.
- **Pull request:** da creare dopo il commit. URL e numero non sono disponibili al
  momento della redazione e non vengono inventati.
- **Perimetro delle modifiche:** esclusivamente questo rapporto storico e
  `docs/codex-reports/LATEST.md`; nessun file applicativo o di progetto è stato
  modificato.

## Sintesi esecutiva

Il repository non contiene oggi il prodotto descritto dalla roadmap. Contiene un
guscio Expo SDK 54 che mostra una sola immagine a pieno schermo, alcuni helper di
storage e caricamento font, e un backend FastAPI dimostrativo con tre endpoint di
status MongoDB. Non esistono mappa, posizione, routing, voice intent/command bus,
surface abstraction, modelli canonici Base Map/Live Road Layer, autenticazione,
client API frontend, test applicativi o contratti F0.

Il frontend supera realmente TypeScript e lint (quest'ultimo con un warning), e la
configurazione Expo pubblica viene risolta. La build web avviata non è terminata ed
è stata interrotta perché Metro è rimasto fermo allo 0%; non è quindi dichiarata
superata. Il backend compila sintatticamente, ma non può essere importato o avviato
in questo ambiente perché le dipendenze dichiarate non sono installate. Pytest non
parte perché manca il plugin obbligatorio `pytest-xdist`, e comunque non esistono
test collezionabili. Non esiste alcun lockfile: installazioni e audit di sicurezza
non sono riproducibili.

**Conclusione:** F0 non è iniziata. Il primo lavoro utile non è una feature UI ma
una piccola PR documentale/di contratti che fissi confini, vocabolario, ownership e
decision record prima di aggiungere infrastruttura. Le build TestFlight risultano
soltanto configurate nel repository; esecuzioni remote, credenziali, firma,
submission e installazione su dispositivo non sono state verificabili.

## 1. Struttura generale verificata

| Area | Stato osservato | Valutazione |
| --- | --- | --- |
| Radice | roadmap, visione UX/UI, memoria, README quasi vuoto, istruzioni Codex | molta pianificazione, poca documentazione operativa |
| `frontend/` | Expo Router/React Native, una route, helper storage/font, asset, script guard | scaffold eseguibile in teoria, non prodotto |
| `backend/` | `server.py`, requirements e configurazione pytest | prototipo monolitico dimostrativo |
| `tests/` | solo `__init__.py` | nessun test |
| `.github/workflows/` | auto-merge Codex e TestFlight manuale | automazioni presenti ma stato remoto non verificato |
| Native | nessuna directory `ios/` o `android/` tracciata | progetto Expo managed/prebuild, nessun artefatto nativo revisionabile |
| Lockfile | nessun `package-lock.json`, `yarn.lock`, lock Python | riproducibilità assente |

Sono stati enumerati tutti i file tracciati con `git ls-files` (68 percorsi) e i
file sorgente nelle aree applicative. `frontend/node_modules` è presente localmente
ma ignorato e non costituisce una fonte riproducibile del repository.

## 2. Frontend Expo / React Native

### Fatti verificati

- Entrypoint `expo-router/entry`, Expo 54.0.36, React 19.1.0, React Native 0.81.5,
  TypeScript strict e typed routes.
- La sola schermata `app/index.tsx` legge `EXPO_PUBLIC_BACKEND_URL`, lo stampa in
  console e visualizza `app-image.png`. Non effettua richieste di rete.
- Il root layout nasconde globalmente tutti i LogBox, mantiene lo splash fino al
  caricamento font e, in Expo Go, dipende da font caricati da jsDelivr.
- Esistono wrapper storage native/web. Su native i dati sensibili possono usare
  SecureStore; sul web i metodi `secure*` ricadono esplicitamente su AsyncStorage e
  non sono storage sicuro.
- I test ID di login/register/logout esistono soltanto come costanti commentate:
  nessuna UI o logica auth li usa.
- `npm run lint` termina con codice 0 ma segnala l'import `Text` inutilizzato.
- `npx --no-install tsc --noEmit` termina con codice 0.
- `npx --no-install expo config --type public` risolve correttamente le piattaforme
  iOS, Android e web e conferma SDK 54.
- `npm ls --all` termina con codice 0; sono riportate dipendenze opzionali mancanti,
  non errori bloccanti dell'albero installato locale.

### Architettura effettiva

Non esistono separazione per feature, navigazione prodotto, design system, state
management, API client, error boundary, telemetry, domain layer o test. Il codice
riutilizzabile si limita a storage e font. Il caricamento remoto di tutti i font
icona in Expo Go e la soppressione globale dei LogBox sono workaround operativi,
non fondamenta di prodotto.

### Eseguibilità reale

- **Verificato:** lint, typecheck e risoluzione config funzionano usando il
  `node_modules` già presente.
- **Non superato:** l'export web è stato avviato due volte in `/tmp`, è rimasto a
  `0.0% (0/1)` e ha lasciato processi Metro, poi terminati. Nessun bundle prodotto
  è stato validato.
- **Non verificato:** avvio interattivo, rendering in browser, Expo Go, simulatori,
  device iOS/Android, sviluppo nativo e build EAS. L'ambiente non ha `eas` globale,
  simulatori né credenziali; non sono stati installati strumenti.

## 3. Backend

### Fatti verificati

- Un unico modulo FastAPI crea il client MongoDB all'import, richiede
  `MONGO_URL` e `DB_NAME`, monta `/api/`, `POST /api/status` e `GET /api/status`.
- Il root restituisce ancora `Hello World`; il dominio è un generico status check.
- Non esistono autenticazione, autorizzazione, migration, repository/service layer,
  health/readiness distinti, rate limiting, pagination robusta o gestione errori DB.
- CORS usa origine `*`, metodi/header `*` e credenziali abilitate.
- `python -m py_compile backend/server.py` supera il controllo sintattico.
- Il runtime Python non ha FastAPI, Uvicorn, PyMongo, Motor, Pydantic o
  `emergentintegrations`; entrambe le prove d'import falliscono subito con
  `ModuleNotFoundError: fastapi`.
- `pytest` 9.0.3 è presente, ma `pytest-xdist` no. La configurazione dichiara il
  plugin obbligatorio: la sessione termina con codice 4 prima della collection.
- `tests/` contiene soltanto `__init__.py`; non ci sono test applicativi.

### Deduzione architetturale

Anche con le dipendenze installate e le due variabili definite, il backend è un
prototipo CRUD dimostrativo, non un backend NEXO. L'inizializzazione DB a import
rende configurazione e test strettamente accoppiati all'ambiente. I metodi
Pydantic `dict()`, `datetime.utcnow()` e l'evento FastAPI `on_event` indicano inoltre
API da migrare/deprecare, pur non essendo stati eseguiti abbastanza da osservare i
relativi warning runtime.

## 4. Dipendenze, compatibilità e vulnerabilità

### Verificato realmente

- `package.json` dichiara Yarn 1.22.22, mentre README e workflow TestFlight usano
  `npm install`; non esiste lockfile di nessuno dei due package manager.
- `npm outdated` ha consultato il registry e restituito codice 1 con numerosi
  aggiornamenti disponibili. Le versioni Expo 57 mostrate come `latest` non sono
  aggiornamenti isolabili: richiedono una migrazione coordinata dell'SDK.
- `expo-doctor`: 15/18 controlli superati; falliscono lockfile, schema remoto Expo
  e React Native Directory. Gli ultimi due falliscono per rete (`ENETUNREACH` /
  risposta remota inattesa), non provano un difetto di config.
- `expo install --check` non produce un verdetto per `fetch failed`.
- `npm audit --omit=dev` non può partire (`ENOLOCK`); creare il lockfile avrebbe
  violato il vincolo di non modificare dipendenze/file.
- Le `resolutions` di Yarn non proteggono un'installazione npm in modo affidabile;
  inoltre l'assenza di `yarn.lock` impedisce di dimostrare che le versioni forzate
  siano effettivamente applicate.
- `backend/requirements.txt` mescola runtime, sviluppo/test e librerie molto ampie,
  usa diversi limiti inferiori senza limite superiore e non ha hash/lock.
- `pip check` riporta “No broken requirements found”, ma quasi tutte le dipendenze
  backend non sono installate: il risultato descrive solo l'ambiente Python
  corrente e **non** valida `requirements.txt`.

### Non verificabile

- Un elenco affidabile di CVE frontend/backend e severità: npm audit è bloccato
  dal lockfile assente e le dipendenze Python non sono installate; non è stato
  installato alcun auditor.
- Compatibilità completa delle dipendenze Expo: `expo install --check` non ha
  completato la consultazione remota.
- Risoluzione fresca su macchina pulita: vietata perché avrebbe creato lockfile e
  modificato l'ambiente dipendenze.

## 5. Expo, EAS, iOS e Android

### Verificato

- Nome/slug: `NEXO VEO VISION` / `nexo-veo-vision`; versione 1.0.0.
- Bundle ID iOS e package Android sono stabili e uguali nel dominio:
  `com.fabioandreola.nexoveovision`.
- EAS project ID è presente; profili development, preview e production esistono;
  production usa auto-increment e versione remota.
- Non sono dichiarati permessi/location/microfono, background mode, privacy usage
  descriptions, associated domains, CarPlay entitlement o configurazione Android
  Auto. Non esistono progetti nativi generati da ispezionare.
- Lo scheme è ancora il generico `frontend`, non un'identità NEXO.
- Il workflow TestFlight esegue solo build iOS, non un comando `eas submit`; il
  blocco `submit.production` in `eas.json` è vuoto. Il nome “TestFlight” non prova
  alcuna pubblicazione a TestFlight.

### Non verificato

- Accesso/ownership del progetto EAS, stato remoto versioni/build, certificati,
  provisioning, App Store Connect, TestFlight, entitlement Apple, keystore Android
  e console Google. Nessun contenuto sensibile è stato letto o riportato.
- Validità del progetto su servizi Expo: la rete Expo era irraggiungibile durante
  Expo Doctor.

## 6. Script, test e build disponibili

| Capacità | Presenza dichiarata | Controllo reale | Esito |
| --- | --- | --- | --- |
| start | `expo start` | non avviato interattivamente | non verificato |
| android | `expo start --android` | non eseguito | non verificato |
| ios | `expo start --ios` | non eseguito | non verificato |
| web | `expo start --web` | non eseguito interattivamente | non verificato |
| lint | `expo lint` | `npm run lint` | superato con 1 warning |
| typecheck | nessuno script | `npx --no-install tsc --noEmit` | superato |
| test frontend | nessuno | non applicabile | assente |
| build/export frontend | nessuno script | export web diagnostico in `/tmp` | incompleto/bloccato |
| reset | script distruttivo/interattivo | non eseguito | correttamente evitato |
| test backend | pytest configurato | `python -m pytest -c backend/pytest.ini` | fallito: plugin mancante |
| sintassi backend | nessuno script | `python -m py_compile` | superato |
| import/start backend | nessuno script | due import controllati | fallito: FastAPI mancante |
| EAS iOS | workflow manuale | non eseguito | stato remoto non verificato |

## 7. Collegamenti frontend/backend, auth, DB, API ed environment

- Il solo collegamento è nominale: il frontend legge
  `EXPO_PUBLIC_BACKEND_URL`, ma non la usa per una richiesta.
- Il backend espone `/api`, ma non esiste un contratto condiviso, schema OpenAPI
  versionato/client generato, gestione base URL, timeout, retry o mapping errori.
- Variabili individuate come necessarie: `EXPO_PUBLIC_BACKEND_URL`, `MONGO_URL` e
  `DB_NAME`. Il workflow EAS richiede inoltre il secret GitHub denominato
  `EXPO_TOKEN`. Nessun valore è stato letto o riportato.
- Non esistono `.env` o template `.env.example` tracciati.
- MongoDB è l'unico database referenziato; non vi sono migration/indici/retention,
  backup o modelli del dominio roadmap.
- Autenticazione e autorizzazione non sono implementate. Le librerie auth nel
  requirements e i test ID UI non equivalgono a una feature.

## 8. Mock, placeholder, TODO, dati fittizi e funzionalità incomplete

La ricerca testuale non trova TODO/FIXME applicativi, ma questo non significa
completezza. Sono stati verificati questi elementi:

- endpoint backend “Hello World” e modello `StatusCheck` generico;
- README frontend originale di create-expo-app e README radice privo di istruzioni
  progetto;
- unica UI costituita da un'immagine statica;
- costanti auth senza schermate/handler;
- import inutilizzato, log della URL backend, `@ts-nocheck` nell'HTML;
- numerose capacità “SIMULATE” descritte soltanto nei documenti roadmap, senza
  generatori demo nel codice;
- script `reset-project` del template ancora disponibile e potenzialmente
  distruttivo se invocato.

## 9. Sicurezza

Non sono stati mostrati o letti segreti. La ricerca ha riguardato nomi/riferimenti.

### Rischi verificati

- Nessuna auth sugli endpoint di scrittura/lettura.
- CORS permissivo e semanticamente problematico con wildcard più credenziali.
- Nessuna validazione di lunghezza esplicita per `client_name`, rate limiting o
  limiti operativi oltre il massimo fisso di 1000 record in lettura.
- Config DB obbligatoria e client creato all'import; errori di configurazione
  causano indisponibilità immediata.
- LogBox globale nasconde warning/errori agli sviluppatori e può mascherare
  regressioni in device.
- La URL backend viene stampata in console. Non è di norma un segreto, ma la
  pratica aumenta esposizione di metadati e rumore.
- Il fallback `secure*` web non è cifrato; non deve ospitare token ad alto valore.
- Dipendenze non bloccate e audit CVE impossibile.
- Il caricamento font Expo Go dipende da CDN terza: rischio disponibilità/privacy
  di rete e comportamento offline degradato.

### Segreti e credenziali ancora necessari

Per verifiche reali servirebbero, senza inserirli nel repository: accesso GitHub,
accesso EAS/Expo, `EXPO_TOKEN`, credenziali/signing Apple e configurazione MongoDB
di test. Per l'app locale servono valori validi delle sole variabili nominate sopra.

## 10. GitHub Actions, build e TestFlight

### Verificato nel repository

- Entrambi i file workflow sono YAML parseabile con Ruby.
- L'auto-merge usa `pull_request_target`, filtri stretti su autore/branch/repo,
  checkout senza persistenza credenziali, percorso protetto e job finale separato.
- La validazione auto-merge esegue `npm install`, non un'installazione frozen;
  senza lockfile può risolvere alberi diversi a ogni PR.
- La validazione rileva script lint/typecheck/test/build; oggi trova soltanto lint,
  quindi un merge “verde” non garantisce typecheck, test o build.
- TestFlight è solo `workflow_dispatch`, Node 20, `npm install`, EAS `latest` e
  `eas build ...`; non effettua submit.

### Non verificato

`gh auth status` conferma che l'ambiente non è autenticato e `git remote -v` non
restituisce remote. Non è stato quindi possibile verificare run Actions, branch
protection, secret configurati, stato PR, artefatti EAS o TestFlight. Anche la
precedente osservazione Codex Review è riportata su richiesta, ma il thread remoto
non è interrogabile da questo ambiente.

### Osservazione precedente della Codex Review

Va conservata la nota che la Codex Review aveva segnalato **il titolo inesatto del
commit nel rapporto iniziale**. Il rapporto storico
`2026-08-20_202900_creazione-sistema-report.md` non è stato modificato né cancellato,
come richiesto. Localmente il commit risultante è visualizzato da `git log` come
`Add permanent Codex reporting system (#3)`, mentre il rapporto archiviato indica
`Add permanent Codex reporting system`: questa discrepanza è ora esplicitamente
registrata, senza riscrivere la storia.

## 11. Aderenza alla roadmap

| Area roadmap | Stato reale | Evidenza |
| --- | --- | --- |
| F0 contratti Base Map/Live Layer | assente | nessun modello/schema/ADR |
| F0 provider abstraction | assente | nessuna interfaccia provider |
| F0 voice intent/command bus | assente | nessun codice voice |
| F0 surface phone/CarPlay/Android Auto | assente | una sola route immagine |
| F0 privacy-by-design | non definita | storage helper, nessun data map/policy |
| Identificatori mobile stabili | presente | bundle/package configurati |
| Predisposizione automotive | solo testo | nessun entitlement/template/manifest |
| F1 mappa/GPS/routing/voice | assente | nessuna dipendenza/provider/permesso |
| F2–F10 | assenti | presenti esclusivamente nella roadmap |
| Backend Road Intelligence | assente | solo status check MongoDB |

La roadmap stessa dichiara che nessuna fase è approvata o implementata. Lo stato
del codice è coerente con “pre-F0”, salvo l'esistenza di scaffold generici non
riconosciuti come implementazione delle fondamenta.

## 12. Registro problemi prioritizzato

| ID | Priorità | Problema e file coinvolti | Conseguenza | Soluzione consigliata |
| --- | --- | --- | --- | --- |
| P01 | **BLOCCANTE** | F0 assente: `NEXO_VEO_VISION_ROADMAP.txt`, `frontend/`, `backend/server.py` | ogni feature rischia contratti incompatibili e rilavoro | approvare e versionare contratti/ADR minimi prima delle feature |
| P02 | **BLOCCANTE** | nessun lockfile; `frontend/package.json`, workflow | installazioni non riproducibili, audit impossibile, CI variabile | scegliere npm o Yarn, generare e validare un solo lockfile in PR dedicata |
| P03 | **BLOCCANTE** | backend non avviabile nell'ambiente; `backend/requirements.txt`, `backend/server.py` | API e test non verificabili | separare requirements, creare ambiente riproducibile e smoke test con DB test |
| P04 | **BLOCCANTE** | nessun test; `tests/`, `frontend/package.json`, `backend/pytest.ini` | regressioni invisibili e CI priva di gate | aggiungere test minimi e script espliciti, dopo contratti F0 |
| P05 | **ALTA** | frontend/backend non collegati; `frontend/app/index.tsx`, `backend/server.py` | URL stampata ma nessuna funzionalità end-to-end | definire contratto health/API e client tipizzato con error handling |
| P06 | **ALTA** | auth assente; backend e costanti test ID | endpoint pubblici e aspettativa UI ingannevole | definire threat model/auth contract; non esporre write API prima dell'auth |
| P07 | **ALTA** | CORS wildcard+credentials; `backend/server.py` | policy insicura/incompatibile con browser credentialed | allowlist per ambiente, credenziali solo se necessarie |
| P08 | **ALTA** | TestFlight non invia a TestFlight; `.github/workflows/testflight.yml` | nome workflow induce falsa certezza di distribuzione | rinominare come build o aggiungere submit controllato dopo verifica credenziali |
| P09 | **ALTA** | CI installa senza lock ed esegue solo lint; workflow/package | merge verde senza build/typecheck/test | install frozen e script/gate obbligatori |
| P10 | **ALTA** | permessi e automotive assenti; `frontend/app.json` | F1/CarPlay/Android Auto non predisposti realmente | ADR/censimento F0, poi config native autorizzata in PR protetta |
| P11 | **ALTA** | LogBox disabilitato globalmente; `frontend/app/_layout.tsx` | errori e warning occultati | limitarlo a warning noti e solo dove indispensabile |
| P12 | **ALTA** | requirements Python non bloccati e misti; `backend/requirements.txt` | drift, superficie supply-chain e deploy pesante | separare runtime/dev, pin/lock e audit |
| P13 | **MEDIA** | init Mongo all'import e env obbligatorie; `backend/server.py` | testabilità bassa e crash precoce poco diagnosticabile | settings validati e lifespan/dependency injection |
| P14 | **MEDIA** | API/deprecazioni potenziali; `backend/server.py` | warning e futura rottura con upgrade | migrare `model_dump`, UTC aware e lifespan, coperti da test |
| P15 | **MEDIA** | storage web “secure” non sicuro; `frontend/src/utils/storage/index.web.ts` | token rubabili via XSS/device | session strategy web distinta, CSP e documentazione vincoli |
| P16 | **MEDIA** | dipendenza font da CDN in Expo Go; hook font | boot degradato/offline e dipendenza terza | asset locali/build dev verificata; evitare workaround globale |
| P17 | **MEDIA** | URL backend loggata/import inutilizzato; index UI | metadata leakage e warning lint | rimuovere quando si implementa client/config validata |
| P18 | **MEDIA** | schema/config Expo non validato online | compatibilità EAS incerta | rieseguire Doctor/install check con rete Expo funzionante |
| P19 | **MEDIA** | niente indici/retention/pagination DB; backend | crescita non controllata e query inefficienti | data contract F0, indici e retention prima dei dati reali |
| P20 | **BASSA** | README generici; README radice/frontend | onboarding e comandi reali non documentati | README operativo dopo scelta toolchain |
| P21 | **BASSA** | scheme `frontend`; `frontend/app.json` | deep link poco identificabile | scegliere scheme stabile NEXO in PR config autorizzata |
| P22 | **BASSA** | `@ts-nocheck` HTML e script template reset | riduce copertura statica/rischio comando accidentale | tipizzare HTML e rimuovere template quando autorizzato |

## 13. Cosa funziona realmente

- Repository Git leggibile e integro per i controlli eseguiti.
- Parsing YAML dei due workflow.
- Risoluzione locale della config Expo pubblica.
- Albero npm locale coerente secondo `npm ls`.
- Typecheck strict sui file inclusi.
- Lint senza errori (un warning).
- Compilazione sintattica Python di `server.py`.
- Asset immagine, splash, icone e font presenti come file.
- Identificatori EAS/bundle/package e profili EAS presenti come configurazione.

“Funziona” qui significa esclusivamente il controllo indicato, non una prova su
device o un flusso utente end-to-end.

## 14. Presente solo nell'interfaccia o nella documentazione

- La UI comunica il brand tramite un'immagine, ma non offre interazioni.
- Login/register/logout sono solo nomi di test ID.
- Backend URL è solo letta/loggata.
- EAS/TestFlight sono configurazioni non validate da una run osservabile.
- Tutte le capacità di navigazione, AI, community, road intelligence, voice e
  automotive sono roadmap, non implementazione.
- Secure storage è implementato come utility, ma nessun flusso auth lo usa.

## 15. Cosa impedisce di iniziare correttamente F0

F0 può iniziare solo dopo decisioni esplicite, non dopo l'aggiunta di feature:

1. approvazione formale del perimetro F0 e dei deliverable “nessuna feature”;
2. scelta del formato/ownership dei contratti e regole di versionamento;
3. definizione del vocabolario canonico fonte/confidence/time decay/privacy;
4. decisione sui confini frontend/backend e sul livello condiviso;
5. scelta toolchain riproducibile (package manager, lock, Python env);
6. criteri di accettazione automatici minimi;
7. censimento Apple/Google automotive e privacy come vincoli, senza ancora
   integrare provider o richiedere segreti.

Non bloccano invece F0: scelta definitiva Mapbox/OSM, credenziali provider, una DB
reale o la build TestFlight. La roadmap dice che F0 deve creare astrazioni, non
integrazioni.

## 16. Roadmap tecnica consigliata

| Ordine | PR/fase | Contenuto circoscritto | Criterio di uscita | Rischio |
| ---: | --- | --- | --- | --- |
| 1 | **F0-PR1 proposta** | soli ADR Markdown: confini, glossario sorgenti, envelope/versioning contratti, invarianti privacy, decisioni aperte | review/approvazione Fabio; zero runtime change | basso |
| 2 | F0-PR2 | toolchain: package manager unico, lockfile, requirements runtime/dev separati | install frozen pulita e audit eseguibile | medio |
| 3 | F0-PR3 | script `typecheck`, test e build/smoke minimi; CI li esegue | gate verdi realmente eseguiti | medio |
| 4 | F0-PR4 | package domain puro: source provenance, coordinates/direction/lane/time/confidence | unit test e serializzazione versionata | medio |
| 5 | F0-PR5 | contratti provider/command bus/surface senza SDK esterni | contract tests e nessuna dipendenza provider | medio |
| 6 | F0-PR6 | privacy data map, retention/consent/identity boundaries | threat-model review approvata | basso |
| 7 | F0-PR7 | backend settings/lifespan/health e client frontend health | smoke end-to-end locale, nessuna auth finta | medio |
| 8 | F0 closeout | ADR automotive/entitlement + matrice requisiti F1 | checklist F0 completa e firmata | basso |
| 9 | F1 discovery | spike comparativo provider fuori dal core | decisione con costi/licenze/capacità | medio |
| 10 | F1 implementazione | prima vertical slice mappa/posizione su device | test reale documentato | alto |

### Prima PR F0 piccola, sicura e realizzabile

**Titolo proposto:** `docs(f0): define architecture boundaries and canonical vocabulary`

**File nuovi proposti, esclusivamente documentali:**

- `docs/architecture/adr/0001-f0-boundaries.md`
- `docs/architecture/canonical-vocabulary.md`
- `docs/architecture/privacy-data-classes.md`
- `docs/architecture/open-decisions.md`

**Contenuto:** definire Base Map vs Live Road Layer; enumerare provenance
`official/provider/community/inferred/simulated`; stabilire che simulated non può
essere presentato come reale; definire confini Command/Surface/Provider e classi
privacy; elencare decisioni non ancora prese. Nessun SDK, schema eseguibile,
config, dependency o feature. È revisionabile, reversibile e riduce il rischio di
implementare prematuramente.

## 17. Debito tecnico e regressioni probabili

- Drift dipendenze/CI per assenza lockfile e uso incoerente npm/Yarn.
- Regressioni invisibili per assenza test/build gate e LogBox silenziato.
- Accoppiamento a Mongo/config globale che renderà fragili test e deployment.
- Rischio di trasformare scaffold/template in architettura senza decisioni F0.
- Upgrade Expo “a pacchetto”: aggiornare singole librerie ai latest mostrati da
  npm sarebbe una regressione probabile.
- Contraddizione documentazione/runtime su TestFlight e auth può generare false
  aspettative di readiness.
- Dipendenze dichiarate ma inutilizzate aumentano costo di audit e superficie.

## 18. Comandi realmente eseguiti

I comandi seguenti sono riportati senza contenuti sensibili. Dove un comando
conteneva variabili dummy, sono indicate come tali.

1. `pwd`
2. `find .. -name AGENTS.md -print`
3. `find / -maxdepth 2 -name AGENTS.md -print 2>/dev/null`
4. `git status --short --branch`
5. `find . -maxdepth 2 -mindepth 1 -not -path './.git*' -print | sort`
6. `cat AGENTS.md`
7. `git ls-files`
8. `git log --oneline --decorate -15`
9. `find docs/codex-reports -maxdepth 1 -type f ...`
10. Lettura con `cat`/`sed` di package, configurazioni, sorgenti frontend/backend,
    roadmap, README, workflow, report esistenti e ignore file.
11. `node --version`, `npm --version`, `yarn --version`, `python --version`,
    `gh --version`, `eas --version`
12. Conteggio file tracciati per area con `git ls-files | awk ...`
13. Ricerca non ricorsiva indiscriminata dei lockfile/config native/env con `find`.
14. Ricerche mirate `rg -n` per TODO/mock/placeholder/log/env/API/auth/DB.
15. `git remote -v` e `git branch -vv`
16. `npm ls --all`
17. `npm outdated`
18. `npm audit --omit=dev`
19. `npx --no-install expo-doctor`
20. `npx --no-install expo install --check`
21. `npm run lint`
22. `npx --no-install tsc --noEmit`
23. `npx --no-install expo config --type public`
24. `CI=1 npx --no-install expo export --platform web --output-dir /tmp/nexo-audit-web`
    (due tentativi, poi processi terminati)
25. `python -m py_compile backend/server.py`
26. `python -m pytest -c backend/pytest.ini`
27. `python -m pip check`
28. Ispezione versioni installate tramite `importlib.metadata`.
29. Import backend con env rimosso e con URL/DB dummy, entrambi sotto `timeout 10`.
30. Parsing dei workflow con `ruby -e 'require "yaml"; ... YAML.load_file ...'`
31. `gh auth status`
32. `gh repo view --json nameWithOwner,defaultBranchRef,url`
33. `gh run list --limit 15`
34. `gh pr view 3 --json url,title,state,commits,reviews,comments`
35. `command -v make_pr`
36. `pkill -f 'expo export --platform web --output-dir /tmp/nexo-audit-web'`
37. `date -u '+%Y-%m-%d %H:%M:%S UTC|%Y-%m-%d_%H%M%S'`

## 19. Test e controlli: esiti individuali

| Comando/controllo | Esito reale |
| --- | --- |
| `git status --short --branch` iniziale | superato: working tree pulito, ramo `work` |
| enumerazione/lettura file tracciati | superato: perimetro ispezionato |
| `npm ls --all` | superato, exit 0; optional peer mancanti segnalati |
| `npm outdated` | exit 1 con elenco aggiornamenti, controllo informativo riuscito |
| `npm audit --omit=dev` | non eseguito fino all'audit: fallito `ENOLOCK` |
| `npx --no-install expo-doctor` | parziale: 15/18; lock assente e 2 check remoti falliti |
| `npx --no-install expo install --check` | non verificabile: `fetch failed` |
| `npm run lint` | superato exit 0 con 1 warning, non “pulito” |
| `npx --no-install tsc --noEmit` | superato exit 0 |
| `npx --no-install expo config --type public` | superato exit 0 |
| export web in `/tmp` | incompleto: Metro fermo a 0%, processi terminati |
| `python -m py_compile backend/server.py` | superato exit 0 |
| `python -m pytest -c backend/pytest.ini` | fallito exit 4: `pytest-xdist` mancante |
| `python -m pip check` | exit 0 solo per ambiente installato; non valida requirements |
| import backend | fallito exit 1: `fastapi` non installato |
| parsing YAML workflow | superato exit 0 per entrambi i file |
| `gh auth status` e query remote | falliti/non verificabili: nessuna auth GitHub |
| ricerca placeholder/env/API | completata; risultati sintetizzati sopra |
| device/simulator/EAS/TestFlight | non eseguiti/non verificabili |

## 20. Errori e warning rilevati

- Warning npm ripetuto: configurazione env `http-proxy` sconosciuta e destinata a
  non essere supportata da una futura versione npm.
- ESLint: `Text` importato ma inutilizzato.
- Expo Doctor: lockfile assente; rete Expo/React Native Directory non disponibile.
- Expo install check: `fetch failed` e warning Undici proxy agent sperimentale.
- npm audit: lockfile mancante.
- Backend import: `ModuleNotFoundError: fastapi`.
- Pytest: plugin richiesto `pytest-xdist` mancante.
- EAS CLI globale assente.
- Export web bloccato allo 0%; non è stato attribuito a una causa non dimostrata.
- GitHub CLI non autenticata e repository senza remote configurato localmente.

## 21. Verificato, dedotto, non verificato

### Verificato realmente

Tutte le osservazioni esplicitamente marcate “verificato” nelle sezioni precedenti,
inclusi contenuto dei file, assenza di implementazioni, risultati comando, script,
config locale, warning e failure.

### Dedotto

- Il frontend dovrebbe poter mostrare almeno l'immagine se Metro completa e gli
  asset/font sono accessibili; non è una prova runtime.
- Con dipendenze e Mongo validi il backend dovrebbe esporre gli endpoint dichiarati;
  non è una prova di startup o DB.
- L'assenza di F0 rende probabile rilavoro se si implementano subito feature.
- Gli aggiornamenti major indicati da npm richiedono migrazione coordinata Expo.

### Non è stato possibile verificare

- app realmente avviata/renderizzata su web, Expo Go, iOS o Android;
- build native/EAS, firma, submission e TestFlight;
- servizi/setting/segreti GitHub ed esecuzioni Actions;
- CVE completi e compatibilità fresca delle dipendenze;
- connessione Mongo/API end-to-end, auth, database reale e performance;
- accessibilità visiva, UX in guida, GPS, voce e automotive, perché non implementati;
- commento remoto originale della Codex Review, per assenza auth/remoto.

## 22. Problemi non risolti, rischi e dipendenze necessarie

Tutti i problemi P01–P22 restano intenzionalmente non risolti: l'attività vietava
correzioni. I rischi principali sono non riproducibilità, falsa confidenza da CI,
assenza di contratti F0, sicurezza API, mancanza test e distanza totale dalla
roadmap funzionale.

Per procedere serviranno decisioni prima delle credenziali. Solo successivamente:
ambiente Python/Node riproducibile, MongoDB di test, accessi EAS/GitHub e credenziali
Apple/Google gestite fuori dal repository. Nessun provider map/AI è necessario per
la prima PR F0 proposta.

## 23. Prossimo passo consigliato e decisioni richieste a Fabio

**Prossimo passo:** autorizzare esclusivamente la F0-PR1 documentale proposta,
senza modificare runtime, dipendenze o config. Dopo approvazione dei confini,
autorizzare separatamente la PR toolchain/lockfile.

**Decisioni richieste a Fabio:**

1. approvare o correggere perimetro e criteri di uscita F0;
2. approvare la piccola PR ADR proposta;
3. scegliere, in una decisione successiva, npm oppure Yarn come package manager;
4. stabilire se il workflow attuale debba essere chiamato “EAS iOS build” finché
   non esegue davvero una submission TestFlight;
5. confermare che nessuna feature F1 inizi prima della chiusura documentata di F0.

## 24. File creati, modificati o eliminati

### Creati

- `docs/codex-reports/2026-08-20_204401_audit-tecnico-completo.md`

### Modificati

- `docs/codex-reports/LATEST.md` — sostituito con la copia integrale di questo
  rapporto, incluso il percorso storico in apertura.

### Eliminati

- Nessuno.

Il rapporto storico precedente è rimasto immutato. La verifica finale di identità,
perimetro Git, commit e creazione PR viene eseguita dopo questa redazione e sarà
riportata nella consegna; URL/numero PR non possono essere retroinseriti senza un
ulteriore commit, quindi qui restano correttamente dichiarati non disponibili.
