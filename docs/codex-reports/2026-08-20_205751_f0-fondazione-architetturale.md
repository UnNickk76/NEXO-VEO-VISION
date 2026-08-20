Rapporto storico: `docs/codex-reports/2026-08-20_205751_f0-fondazione-architetturale.md`

# F0 — Prima fondazione architetturale documentale

## Dati dell'attività

- **Data e ora UTC:** 2026-08-20 20:57:51 UTC
- **Obiettivo richiesto:** realizzare esclusivamente la prima PR documentale F0,
  definendo confini architetturali, vocabolario canonico, classi privacy e decisioni
  aperte, senza modifiche runtime o configurazioni.
- **Stato finale:** completato
- **Ramo utilizzato:** `work`
- **Commit creati:** il commit verrà creato dopo la redazione del rapporto; hash e
  titolo non sono disponibili nel contenuto incluso nel commit stesso.
- **Pull request:** da creare dopo il commit con titolo richiesto. URL e numero non
  sono disponibili al momento della redazione e non vengono inventati.

## Sintesi e modifiche concrete

È stato definito il perimetro normativo F0, inclusi esclusioni, dependency rule,
separazione Base Map/Live Road Layer, dominio/adapter, Command Bus/Voice
Intent/Surface/Provider, ownership frontend/backend/shared, offline-first,
degradazione e criteri di uscita verificabili. Sono stati preservati voice-first,
wake word future Nexo/Veo, global-first e limiti delle Surface automotive.

È stato creato un vocabolario univoco con invarianti di provenance, confidence,
freshness, time decay, verifica e presentazione di dati official, provider,
community, inferred e simulated. Sono state classificate le categorie privacy con
finalità, minimizzazione, consenso, retention, condivisione, protezione,
cancellazione, luogo di trattamento e rischi. Le scelte di provider, routing,
backend/MongoDB, auth, voce, automotive, offline, contratti, legal e costi sono
registrate come aperte, con criteri, dipendenze e scadenza di fase.

Non sono stati modificati codice applicativo, backend, dipendenze, lockfile,
workflow, configurazioni Expo/EAS, iOS o Android. Non sono stati aggiunti SDK.

## File creati, modificati o eliminati

### Creati

- `docs/architecture/adr/0001-f0-boundaries.md`
- `docs/architecture/canonical-vocabulary.md`
- `docs/architecture/privacy-data-classes.md`
- `docs/architecture/open-decisions.md`
- `docs/codex-reports/2026-08-20_205751_f0-fondazione-architetturale.md`

### Modificati

- `docs/codex-reports/LATEST.md` — sostituito con la copia integrale di questo
  rapporto e il percorso storico in apertura.

### Eliminati

- Nessuno.

## Documentazione analizzata

Sono stati letti integralmente `AGENTS.md`, il rapporto `LATEST.md`, roadmap,
visione, UX/UI ed espansione concettuale. Sono stati inoltre inventariati i file
tracciati e i documenti del repository. Le contraddizioni/tensioni documentate
nell'ADR riguardano: provider collocati in fasi successive rispetto ai contratti
F0; predisposizione automotive iniziale contro hardening F10; nome prodotto contro
nomi assistente; ampliamenti concettuali non equivalenti a deliverable runtime.

## Comandi realmente eseguiti

1. `pwd`
2. `find .. -name AGENTS.md -print`
3. `cat AGENTS.md`
4. `cat docs/codex-reports/LATEST.md`
5. `find docs -maxdepth 3 -type f ... | sort`
6. `git status --short --branch`
7. `git ls-files | sort`
8. Lettura con `cat` dei file Markdown/TXT concettuali individuati.
9. Lettura integrale separata con `cat ... >/tmp/...` di roadmap, UX/UI,
   espansione e Vision, seguita da `wc -l`.
10. `rg -n` mirato per intestazioni, fasi, stato, approvazioni, provider e Surface.
11. Creazione dei quattro documenti architetturali mediante patch.
12. Script di controllo iniziale su perimetro, segreti, termini, decisioni,
    criteri di uscita e whitespace.
13. `date -u '+%Y-%m-%d %H:%M:%S UTC|%Y-%m-%d_%H%M%S'`
14. `git branch --show-current`
15. `command -v make_pr`
16. `git remote -v`
17. `gh auth status`

I controlli finali, staging, commit e tentativo di creazione PR vengono eseguiti
dopo la redazione di questo testo e sono riepilogati nella consegna finale; non
sono anticipati come già riusciti.

## Test e controlli realmente eseguiti

| Controllo | Esito individuale |
| --- | --- |
| Individuazione e lettura `AGENTS.md` | superato; un solo file applicabile trovato |
| Lettura `LATEST.md` | superato |
| Lettura integrale dei quattro documenti concettuali principali | superato; 1.115 righe complessive |
| Inventario dei file tracciati/documentali | superato |
| Primo script di verifica perimetro | fallito per limite del controllo: `git status` comprimeva la directory non tracciata in `docs/architecture/`; non indica un file vietato e viene corretto nel controllo finale dopo staging |
| Ricerca segreti/termini/decisioni/criteri/whitespace nello stesso script | non raggiunta a causa dell'uscita anticipata del controllo precedente; non dichiarata superata |
| `command -v make_pr` | nessun eseguibile shell disponibile |
| `git remote -v` | nessun remote configurato |
| `gh auth status` | non verificabile/fallito: GitHub CLI non autenticata |
| Test runtime/build | non eseguiti: modifica esclusivamente documentale e vincolo esplicito di non intervenire sul runtime |

## Verificato realmente

- I quattro documenti richiesti esistono e trattano i contenuti richiesti.
- Le scelte non approvate sono presentate come decisioni aperte.
- Nessun file runtime o di configurazione è stato intenzionalmente modificato.
- Il working tree iniziale era pulito sul ramo `work`.
- Il repository locale non dispone di remote e la CLI GitHub non è autenticata.

## Dedotto

- I confini neutrali ridurranno lock-in e accoppiamento, ma l'effetto sarà
  dimostrabile soltanto quando esisteranno contratti e implementazioni.
- Local-first e provider fallback sono obiettivi architetturali, non capacità
  attualmente disponibili.

## Non è stato possibile verificare

- Approvazione di Fabio dei documenti e chiusura effettiva di F0.
- Fattibilità, costi, licenze, copertura e policy correnti dei provider.
- Requisiti/entitlement automotive e comportamento su veicolo reale.
- URL/numero/stato remoto della PR al momento della redazione.
- Runtime, build e test su device, volutamente fuori perimetro.

## Errori e warning rilevati

- Il primo controllo automatico di perimetro ha prodotto un falso positivo sulla
  directory non tracciata; deve essere rieseguito sui percorsi staged.
- `make_pr` non è disponibile come comando shell, non esiste un remote locale e
  GitHub CLI non è autenticata. La creazione PR dipende dallo strumento fornito
  dall'ambiente dopo il commit.
- Nessun warning applicativo è stato cercato o prodotto, perché il runtime non è
  stato eseguito.

## Problemi non risolti e dipendenze/credenziali necessarie

Restano aperte tutte le OD-01–OD-17 e l'approvazione di Fabio. Non sono necessarie
credenziali o dipendenze per questa PR documentale. Serviranno in futuro accessi
ufficiali e parere legale per valutare provider, dati, store e automotive; nessun
valore segreto deve essere inserito nel repository.

## Rischi tecnici

- I contratti sono ancora concettuali: una futura implementazione potrebbe
  divergere senza test di conformità e ownership.
- Capability offline e automotive dipendono da licenze e limiti OS non ancora
  verificati.
- Confidence, time decay e precedence richiedono soglie specifiche per categoria.
- Retention e basi giuridiche richiedono decisioni legali prima di dati reali.
- Ampliare F0 con selezioni provider premature reintrodurrebbe lock-in.

## Prossimo passo consigliato

Revisionare e approvare esplicitamente i quattro documenti. Solo dopo, avviare una
PR F0 separata per formato/versionamento dei contratti e relativi test neutrali,
senza integrare SDK finché le ADR di scelta non sono approvate.

## Decisioni richieste a Fabio

1. approvare o correggere confini e criteri di uscita F0;
2. approvare vocabolario e invarianti su fonti reali/inferred/simulated;
3. validare matrice privacy e incaricare la review legale;
4. indicare mercati, promessa offline e budget necessari alle future valutazioni;
5. confermare che nessuna decisione provider sia implicita in questa PR.
