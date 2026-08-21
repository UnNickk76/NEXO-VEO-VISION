# Configurazione ascAppId per EAS Submit / TestFlight

## Dati dell'attività

- **Data e ora UTC:** 2026-08-21 11:35:46 UTC
- **Obiettivo:** correggere esclusivamente il blocco della TestFlight run #12 causato dall'assenza di `ascAppId` nel profilo EAS Submit `production`, senza modificare il workflow o funzionalità NEXO.
- **Stato finale:** `parziale`; configurazione corretta e verificata staticamente, PR/review indipendente ancora da completare, nuova pipeline TestFlight su `main` non ancora eseguita.
- **Branch:** `nexo-codex/fix-ascappid-testflight-run12`
- **Base verificata:** `main` `a123a3c5e5d22a757eac9dda9dd20e44e3362f17`.
- **Pull request:** non ancora disponibile al momento della creazione iniziale del rapporto; verrà registrata sulla Coordination Board e nella consegna dopo la pubblicazione.
- **Commit funzionale:** `168a19f2793261b98164d8e748fcc84e4472ca71`.

## READ e PLAN realmente eseguiti

- Letto integralmente `AGENTS.md`.
- Letta Issue #11 — NEXO Coordination Board e gli aggiornamenti recenti, incluso il rapporto NEXO REVIEW sulla TestFlight run #12.
- Verificata `main` a `a123a3c5e5d22a757eac9dda9dd20e44e3362f17`, merge della PR #13.
- Verificati `frontend/eas.json`, `.github/workflows/testflight.yml` e `frontend/app.json` su `main`.
- Verificato che `frontend/eas.json` contenesse `submit.production: {}` e che il workflow eseguisse `eas build --platform ios --profile production --non-interactive --wait --auto-submit`.
- Verificato che il bundle identifier iOS restasse `com.fabioandreola.nexoveovision` e l'EAS projectId `284193bc-8b9c-4268-80c8-c1aec9a05238`.
- Verificata la documentazione Expo ufficiale corrente: il profilo `submit.production.ios` supporta/richiede `ascAppId` per submission iOS non-interattiva/CI; non è necessaria una modifica al workflow per correggere questo errore specifico.
- Verificato il lavoro concorrente NEXO 1 / PR #12: non modifica `frontend/eas.json` né il workflow TestFlight; condivide soltanto i file di reporting obbligatori, che dovranno essere serializzati/riallineati prima del proprio merge.

## File modificati

- `frontend/eas.json`
- `docs/codex-reports/2026-08-21_113546_fix-ascappid-testflight-run12.md`
- `docs/codex-reports/LATEST.md`
- `Fabio/FABIO_CONTROLLO.md`

`.github/workflows/testflight.yml`, `frontend/app.json`, package/lock, codice applicativo, concettuale e aree NEXO 1/2/3 non sono stati modificati.

## Modifica applicata

In `frontend/eas.json` il profilo submit production è stato configurato così:

```json
"submit": {
  "production": {
    "ios": {
      "ascAppId": "6803879211"
    }
  }
}
```

Il valore `6803879211` è l'Apple ID / App Store Connect App ID fornito e verificato per NEXO VEO VISION. Il bundle identifier resta `com.fabioandreola.nexoveovision`.

## Controlli realmente eseguiti

### Validità JSON di eas.json

Controllo eseguito sulla materializzazione esatta del contenuto pubblicato sul branch:

```bash
python3 -m json.tool /tmp/nexo-eas.json >/dev/null
```

- **Exit code:** `0`.
- **Risultato:** JSON valido.

### Assertion ascAppId e bundle identifier

```bash
python3 - <<'PY'
import json
with open('/tmp/nexo-eas.json') as f: eas=json.load(f)
with open('/tmp/nexo-app.json') as f: app=json.load(f)
assert eas['submit']['production']['ios']['ascAppId'] == '6803879211'
assert app['expo']['ios']['bundleIdentifier'] == 'com.fabioandreola.nexoveovision'
print('ascAppId=6803879211')
print('bundleIdentifier=com.fabioandreola.nexoveovision')
PY
```

- **Exit code:** `0`.
- **Output:** `ascAppId=6803879211`; `bundleIdentifier=com.fabioandreola.nexoveovision`.

### Perimetro funzionale prima del reporting

Confronto GitHub tra la base `a123a3c5e5d22a757eac9dda9dd20e44e3362f17` e il commit funzionale `168a19f2793261b98164d8e748fcc84e4472ca71`:

- **Stato:** `ahead`, 1 commit.
- **File modificato:** esclusivamente `frontend/eas.json`.
- **Diff stats:** 5 aggiunte, 1 eliminazione.
- **Workflow TestFlight:** non modificato.

### Controlli non ripetuti perché non influenzati dalla modifica

- Expo Doctor e lint non vengono dichiarati nuovamente eseguiti in questa attività: la modifica riguarda esclusivamente `eas.json`, non package, lockfile o codice applicativo. Verranno verificati nuovamente dalla pipeline reale su `main` dopo review e merge.
- EAS Build/EAS Submit non sono stati avviati da questo branch per evitare di anticipare il gate di review/merge e generare build o submit fuori dal flusso autorizzato.

## Fatti verificati

- `main` corrente è `a123a3c5e5d22a757eac9dda9dd20e44e3362f17`.
- `frontend/eas.json` su `main` aveva `submit.production: {}`.
- Il workflow TestFlight usa `production`, `--non-interactive` e `--auto-submit`.
- Il branch contiene `submit.production.ios.ascAppId = "6803879211"`.
- Il bundle identifier resta `com.fabioandreola.nexoveovision`.
- La correzione funzionale non modifica `.github/workflows/testflight.yml`.

## Deduzioni

- La configurazione aggiunta risolve il messaggio specifico `Set ascAppId in the submit profile (eas.json) or re-run this command in interactive mode` secondo la configurazione EAS e la documentazione ufficiale. Questo non dimostra che l'intera submission TestFlight riuscirà.

## Non verificato

- Nuova pipeline su `main` dopo merge.
- Nuovo esito Expo Doctor e lint dopo merge.
- EAS Build completa sulla nuova pipeline.
- EAS Submit completo verso Apple.
- Ricezione/visibilità della build in App Store Connect/TestFlight.
- Eventuali successivi requisiti Apple/EAS di autenticazione, accordi o ruoli.

## Errori, warning e problemi residui

- Root cause della run #12: `ascAppId` mancante nel profilo submit production per un flusso non-interattivo con auto-submit.
- Nessun nuovo errore è emerso nei controlli statici di questa modifica.
- Resta un rischio di conflitto documentale con PR #12 sui soli `docs/codex-reports/LATEST.md` e `Fabio/FABIO_CONTROLLO.md`; non riguarda `frontend/eas.json`.

## Dipendenze e credenziali

- Nessuna nuova dipendenza software richiesta.
- Le credenziali Apple/EAS non sono state lette, modificate o esposte.
- La loro effettiva validità per EAS Submit sarà verificabile solo dalla pipeline successiva.

## Rischi tecnici

- Dopo la correzione `ascAppId` può emergere un blocco successivo Apple/EAS non ancora osservato; non vengono predisposti workaround preventivi.
- La PR #12 dovrà riallineare i file di reporting se viene mergeata dopo questa PR.

## Prossimo passo consigliato

1. Creare la PR atomica dal branch corrente.
2. Verificare SHA finale, diff, mergeability e assenza di modifiche estranee.
3. Richiedere review indipendente a NEXO REVIEW tramite Issue #11, senza usare `@codex review`.
4. Non fare merge da NEXO CODEX.
5. Dopo review e merge autorizzato, verificare separatamente nella nuova pipeline: Expo Doctor → PASS; Lint → PASS; EAS Build → PASS; EAS Submit → PASS; App Store Connect/TestFlight → build ricevuta.

## Decisioni richieste a Fabio

Nessuna in questa fase. Se la pipeline successiva espone un nuovo blocco Apple/EAS, verrà riportato integralmente senza workaround improvvisati.
