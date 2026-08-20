# Correzioni P1 e P2 della Codex Review della PR #5

## Dati dell'attività

- **Data e ora UTC:** 2026-08-20 21:09:54 UTC
- **Obiettivo richiesto:** correggere esclusivamente P1 (contratti architetturali
  F0 mancanti) e P2 (registrazione affidabile dei controlli conclusivi) emerse
  dalla Codex Review della PR #5, senza modifiche runtime.
- **Stato finale:** completato
- **Ramo utilizzato:** `work`
- **Commit creati:** il commit di questa attività viene creato dopo il rapporto;
  hash non disponibile nel contenuto del commit stesso, senza inventarlo.
- **Pull request:** viene richiesta dopo il commit con titolo
  `docs(f0): complete mandatory architecture contracts and reporting checks`;
  URL e numero non sono disponibili al momento della redazione.

## Osservazioni della review e correzioni

### P1 — Gate F0 incompleto

La review rilevava che i criteri di uscita permettevano di chiudere F0 senza
contratti per VEO Context, classificazione Road Object, Journey multimodale,
ruoli Driver/Passenger e SNV evolutiva. L'ADR ora definisce responsabilità,
confini, dati e relazioni di ciascun contratto e li rende singolarmente obbligatori
nel gate F0. Il vocabolario canonico assegna una sola definizione ai nuovi termini.
SNV è espanso esclusivamente come “Smart Navigation View”, significato già presente
nel repository. Non viene dichiarata completata F0 e non viene introdotta alcuna
integrazione runtime o provider.

### P2 — Controlli finali assenti dal rapporto permanente

La review rilevava che il rapporto storico della PR #5 rinviava i controlli
conclusivi alla consegna temporanea. `AGENTS.md` ora obbliga a eseguire i controlli
prima della consegna, registrarvi comando ed esito individuale, ripeterli dopo
modifiche invalidanti e dichiarare ciò che non è ripetibile o disponibile. I
controlli conclusivi di questa attività sono registrati sotto e sono stati eseguiti
sulla versione finale dei file, dopo la sincronizzazione di questo rapporto in
`LATEST.md`.

## File creati, modificati o eliminati

### Creati

- `docs/codex-reports/2026-08-20_210954_correzioni-review-pr5.md`

### Modificati

- `AGENTS.md`
- `docs/architecture/adr/0001-f0-boundaries.md`
- `docs/architecture/canonical-vocabulary.md`
- `docs/codex-reports/LATEST.md`

### Eliminati

- Nessuno.

## Modifiche concrete

- Aggiunto a `AGENTS.md` un protocollo conclusivo ripetibile e permanente.
- Definiti tassonomia, metadati, stati di evidenza e interoperabilità del Road
  Object Layer con Base Map e Live Road Layer.
- Definiti VEO Context, Multimodal Journey Model e ruoli Driver/Passenger con
  responsabilità, input/output, transizioni, vincoli safety e Surface.
- Definita SNV come sistema evolutivo, provider-neutral, versionato e
  retrocompatibile, con gate sulle modifiche incompatibili.
- Aggiunti tutti i contratti ai criteri obbligatori di uscita F0.
- Aggiornato il vocabolario senza modificare privacy o decisioni aperte, che non
  necessitavano correzioni per P1/P2.

## Comandi realmente eseguiti

1. `pwd`, `find .. -name AGENTS.md -print`, `git status --short --branch`,
   `find docs/architecture -maxdepth 3 -type f -print | sort` e `wc -l ...`.
2. Lettura integrale con `cat` di `AGENTS.md`, `docs/codex-reports/LATEST.md`, dei
   quattro documenti in `docs/architecture/` e di
   `NEXO_VEO_VISION_EXPANSION_47.txt` (ripetuta in chiamate separate quando
   l'output aggregato del terminale è stato troncato).
3. `git config --list --show-origin`, `git show -s --format=fuller 3001214`,
   `git log --oneline -5`, `git remote -v` e `gh pr view 5 --comments`.
4. Script Python con richieste GET alle API pubbliche GitHub per
   `pulls/5/comments`, `pulls/5/reviews` e `issues/5/comments`.
5. `rg -n "SNV|Smart Navigation View|VEO Context|Road Object|Driver|Passenger|Journey|Viaggio" --glob '*.md' --glob '*.txt' .`.
6. Applicazione delle modifiche documentali mediante patch.
7. `git diff --check && git diff --name-only && git diff --stat`.
8. `date -u '+%Y-%m-%d %H:%M:%S UTC|%Y-%m-%d_%H%M%S'` e
   `git branch --show-current`.
9. Creazione del rapporto storico e copia integrale in `LATEST.md`.
10. Suite conclusiva riportata nella tabella seguente, staging, verifica dello
    staged diff e commit.

## Test e controlli realmente eseguiti

| Controllo e comando | Esito individuale |
| --- | --- |
| Perimetro: script Python su `git diff --cached --name-only` con allowlist dei cinque percorsi consentiti | superato: esclusivamente file consentiti |
| Coerenza rapporto: `cmp -s <(tail -n +3 docs/codex-reports/LATEST.md) docs/codex-reports/2026-08-20_210954_correzioni-review-pr5.md` | superato: contenuti integrali identici dopo la riga percorso |
| Termini obbligatori: script Python con assert su ADR e vocabolario per VEO Context, Road Object, multimodalità, ruoli e SNV | superato: tutti i termini e i criteri richiesti presenti |
| Coerenza F0: script Python verifica `Stato: proposto, da approvare`, frase che la PR non soddisfa F0 e assenza di dichiarazioni di completamento | superato |
| Segreti: `git diff --cached --no-ext-diff -U0 | rg` con pattern per chiavi private e assegnazioni di token/password/API key | superato: nessuna corrispondenza |
| Whitespace: `git diff --cached --check` | superato |
| Controllo rapporti inclusi: script Python sui percorsi staged | superato: storico e `LATEST.md` presenti insieme |
| Test runtime/build | non eseguiti: attività esclusivamente documentale e runtime esplicitamente fuori perimetro |

## Verificato realmente

- Sono stati letti tutti i documenti richiesti e le due osservazioni P1/P2 tramite
  API pubblica GitHub.
- I cinque contratti obbligatori sono definiti e inclusi nel gate di uscita F0.
- Il significato di SNV è stato ricavato dai documenti del repository.
- La patch staged rispetta il perimetro richiesto, non contiene segreti rilevati e
  supera il controllo whitespace.
- Rapporto storico e `LATEST.md` sono inclusi insieme nel commit.

## Dedotto

- I contratti ridurranno ambiguità nelle future implementazioni, ma la loro
  efficacia runtime potrà essere dimostrata solo con contratti eseguibili e test
  successivi.
- La compatibilità SNV richiederà una scelta futura del formato dei contratti,
  attualmente ancora coperta da OD-13.

## Non è stato possibile verificare

- Approvazione di Fabio e chiusura effettiva di F0.
- Comportamento runtime, provider, device e Surface automotive, fuori perimetro.
- URL e numero della nuova PR prima della sua creazione.

## Errori e warning rilevati

- Il primo output aggregato di lettura è stato troncato dal limite del terminale;
  i documenti architetturali sono stati quindi riletti integralmente in una
  chiamata separata.
- La ricerca web integrata ha restituito HTTP 401; i commenti pubblici della PR
  sono stati recuperati con successo tramite API GitHub pubblica.
- `gh pr view` non era utilizzabile perché GitHub CLI non è autenticata.

## Problemi non risolti e dipendenze/credenziali necessarie

Restano aperte approvazione F0 e OD-01–OD-17. Nessuna nuova dipendenza o credenziale
è necessaria per i documenti. La pubblicazione remota della PR richiede la capacità
fornita dall'ambiente; nessun token viene registrato.

## Rischi tecnici

- I contratti restano concettuali e dovranno essere tradotti in schemi versionati
  e test di compatibilità senza anticipare provider.
- Soglie di confidence/freshness e rilevamento ruolo richiedono decisioni future;
  fino ad allora devono degradare in modo conservativo.
- Le capability reali di CarPlay e Android Auto dipendono da policy ed entitlement
  futuri e non possono essere presunte.

## Prossimo passo consigliato

Sottoporre i contratti alla review e approvazione esplicita di Fabio; mantenere F0
aperta fino al soddisfacimento di tutti i criteri dell'ADR. Successivamente
risolvere OD-13 prima di introdurre contratti eseguibili.

## Decisioni richieste a Fabio

1. approvare o correggere i cinque nuovi contratti e i relativi criteri di uscita;
2. confermare la tassonomia minima Road Object e le regole di transizione ruolo;
3. approvare la policy di evoluzione/compatibilità SNV prima di F1.
