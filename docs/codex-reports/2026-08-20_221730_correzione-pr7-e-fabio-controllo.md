# Correzione evidenza PR #7 e cruscotto Fabio Controllo

## Dati dell'attività

- **Data e ora UTC:** 2026-08-20 22:17:30 UTC
- **Obiettivo richiesto:** correggere senza alterare lo storico l'evidenza incompleta della PR #7 e creare un cruscotto permanente consultabile da Fabio.
- **Stato finale:** parziale, in attesa di pull request e nuova Codex Review.
- **Ramo utilizzato:** `codex/fabio-controllo-e-correzione-pr7`
- **Commit creati:** disponibili nella cronologia del ramo; il rapporto è stato redatto prima del commit finale.
- **Pull request:** non ancora disponibile al momento della redazione.
- **Test runtime dell'app:** non eseguiti perché l'attività è esclusivamente documentale.

## File creati o modificati

### Creati

- `Fabio/FABIO_CONTROLLO.md`
- `docs/codex-reports/2026-08-20_221730_correzione-pr7-e-fabio-controllo.md`

### Modificati

- `AGENTS.md`
- `docs/codex-reports/LATEST.md`

### Non modificati intenzionalmente

- `docs/codex-reports/2026-08-20_212629_codex-review-pr6-auto-merge-sicuro.md`: rapporto storico già unito e quindi immutabile secondo `AGENTS.md`.

## Modifiche concrete

- Aggiunto il cruscotto `Fabio/FABIO_CONTROLLO.md` con stato, modifiche, controlli, problemi e prossimo passo in linguaggio semplice.
- Aggiunta in `AGENTS.md` una regola permanente che obbliga Codex ad aggiornare il cruscotto nella stessa PR di ogni attività.
- Registrata in questo nuovo rapporto l'evidenza completa mancante nel rapporto della PR #7, senza riscrivere il documento storico.
- Aggiornato `LATEST.md` con la copia integrale di questo rapporto.

## Correzione riproducibile del rilievo P1 della PR #7

Il rapporto storico della PR #7 abbreviava le verifiche REST con `$endpoint`,
`jq ...` e `{5,6}`. La correzione preparata nella successiva attività Codex
ha dichiarato exit code complessivo `0` e exit code individuale `0` per tutte
le otto pipeline. Le invocazioni complete corrispondenti sono:

```bash
set -o pipefail
for number in 5 6; do
  curl -fsSL "https://api.github.com/repos/UnNickk76/NEXO-VEO-VISION/pulls/$number/comments" |
    jq -r '.[] | [.user.login, .path, (.line // .original_line // "null"), .created_at, .body] | @tsv'
  curl -fsSL "https://api.github.com/repos/UnNickk76/NEXO-VEO-VISION/pulls/$number/reviews" |
    jq -r '.[] | [.user.login, .state, .submitted_at, .commit_id, .body] | @tsv'
  curl -fsSL "https://api.github.com/repos/UnNickk76/NEXO-VEO-VISION/issues/$number/comments" |
    jq -r '.[] | [.user.login, .created_at, .updated_at, .body] | @tsv'
  curl -fsSL "https://api.github.com/repos/UnNickk76/NEXO-VEO-VISION/pulls/$number" |
    jq -r '[.number, .state, .merged, .merged_at, .base.ref, .head.ref, .head.sha] | @tsv'
done
```

Risultati individuali registrati dall'attività correttiva Codex:

| Pipeline | Exit code | Risultato osservato |
| --- | ---: | --- |
| `pulls/5/comments` | 0 | Commenti inline della PR #5 restituiti. |
| `pulls/5/reviews` | 0 | Review Codex della PR #5 restituita. |
| `issues/5/comments` | 0 | Commenti di conversazione della PR #5 restituiti. |
| `pulls/5` | 0 | Metadati e stato di merge della PR #5 restituiti. |
| `pulls/6/comments` | 0 | Commenti inline della PR #6 restituiti. |
| `pulls/6/reviews` | 0 | Review Codex della PR #6 restituita. |
| `issues/6/comments` | 0 | Commenti di conversazione della PR #6 restituiti. |
| `pulls/6` | 0 | Metadati e stato di merge della PR #6 restituiti. |

La verifica specifica dei commenti inline della PR #7 è stata registrata con:

```bash
set -o pipefail
curl -fsSL "https://api.github.com/repos/UnNickk76/NEXO-VEO-VISION/pulls/7/comments" |
  jq -r '.[] | [.user.login, .path, (.line // .original_line // "null"), .created_at, .body] | @tsv'
```

- **Exit code registrato:** `0`
- **Risultato osservato:** restituiti il precedente rilievo P2 e il rilievo P1 sui comandi incompleti.
- **Limite:** la REST API dei commenti non espone lo stato GraphQL `isResolved` dei thread.

Questi comandi sono riportati come evidenza della precedente attività Codex. Non
sono stati rieseguiti da questa sessione Work mediante shell; lo stato corrente
della PR #7 e i thread sono stati invece letti direttamente tramite
l'integrazione GitHub autenticata.

## Operazioni e controlli realmente eseguiti in questa attività

| Operazione o controllo | Esito | Risultato individuale / limite |
| --- | --- | --- |
| Lettura PR #7 tramite integrazione GitHub, repository `UnNickk76/NEXO-VEO-VISION` | Superato | PR chiusa e unita; merge commit `13a5e9f9fb3267414f584ce7442af3be48dcf04c`. |
| Lettura dei review thread della PR #7 tramite integrazione GitHub | Superato | P1 e P2 ancora formalmente irrisolti nella PR chiusa. |
| Lettura su `main` del rapporto storico PR #7 | Superato | Presenti i segnaposto `$endpoint`, `jq ...` e `{5,6}`. |
| Lettura di `AGENTS.md`, `LATEST.md` e `docs/CODEX_AUTO_MERGE.md` su `main` | Superato | Confermate immutabilità dei rapporti storici e documentazione del merge manuale. |
| Creazione ramo `codex/fabio-controllo-e-correzione-pr7` da `main` | Superato | Ramo creato tramite integrazione GitHub. |
| Aggiornamento `AGENTS.md` sul ramo | Superato | Commit `136c68e3625ea7335d840747f6c6152fe0c1dffa`. |
| Creazione `Fabio/FABIO_CONTROLLO.md` sul ramo | Superato | Commit `147bf73d9819e733580b29f7ce12b67a35424030`. |
| Test applicativi, lint, build e TestFlight | Non eseguiti | Non applicabili alle sole modifiche documentali. |
| Nuova Codex Review sul commit finale | Non ancora eseguita | Da richiedere dopo la creazione della pull request. |

## Verificato realmente

- La PR #7 è stata unita senza la successiva correzione locale `bac05a61d8e2cb3241d4bb46d6bf389045254673`.
- Il rapporto storico presente su `main` contiene ancora l'evidenza abbreviata.
- `docs/CODEX_AUTO_MERGE.md` descrive correttamente validazione in sola lettura e merge manuale.
- Il cruscotto e la regola permanente sono stati creati sul ramo dedicato.

## Dedotto

- La nuova evidenza completa dovrebbe risolvere il problema sostanziale del P1 senza violare l'immutabilità dello storico, ma soltanto una nuova Codex Review può confermarlo.
- I vecchi thread della PR #7 non possono rappresentare da soli lo stato della nuova PR correttiva.

## Non è stato possibile verificare

- Esito della nuova Codex Review, perché la pull request non era ancora disponibile durante la redazione.
- Comportamento runtime, build Expo/EAS o TestFlight, non pertinenti a questa attività.
- Protezioni GitHub esterne ai file del repository.

## Errori e warning

- La correzione `bac05a61d8e2cb3241d4bb46d6bf389045254673` era rimasta nell'ambiente isolato Codex e non era stata pubblicata prima del merge manuale della PR #7.
- I rapporti storici non possono essere sovrascritti; la rettifica viene quindi conservata in questo nuovo rapporto.

## Problemi non risolti e rischi tecnici

- La nuova PR deve ancora essere revisionata.
- Il cruscotto è “di sola consultazione” come regola operativa, non come permesso GitHub per singolo file.
- L'auto-merge resta disabilitato; un merge anticipato può ancora essere effettuato manualmente da un utente autorizzato.

## Prossimo passo consigliato

Aprire la pull request correttiva, richiedere `@codex review`, correggere eventuali
nuovi rilievi e unire soltanto dopo una review pulita sullo SHA corrente.

## Decisioni richieste a Fabio

Autorizzare il merge soltanto dopo la conferma esplicita che la nuova review è
pulita. Nessun'altra decisione è richiesta per creare il cruscotto.
