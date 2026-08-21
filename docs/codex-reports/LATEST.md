Rapporto storico: `docs/codex-reports/2026-08-21_113546_fix-ascappid-testflight-run12.md`

# Configurazione ascAppId per EAS Submit / TestFlight

## Dati dell'attività

- **Data e ora UTC:** 2026-08-21 11:35:46 UTC; reporting riallineato dopo review alle 11:55 UTC.
- **Obiettivo:** correggere esclusivamente il blocco della TestFlight run #12 causato dall'assenza di `ascAppId` nel profilo EAS Submit `production`, senza modificare il workflow o funzionalità NEXO.
- **Stato finale:** `parziale`; configurazione corretta e verificata staticamente, PR #14 aperta e in attesa di nuova review indipendente, nuova pipeline TestFlight su `main` non ancora eseguita.
- **Branch:** `nexo-codex/fix-ascappid-testflight-run12`
- **Base verificata:** `main` `a123a3c5e5d22a757eac9dda9dd20e44e3362f17`.
- **Pull request:** PR #14 — `https://github.com/UnNickk76/NEXO-VEO-VISION/pull/14`.

## Commit creati

Commit presenti nella PR prima della correzione documentale richiesta dalla review 4992945074:

- `168a19f2793261b98164d8e748fcc84e4472ca71` — configurazione funzionale `ascAppId` in `frontend/eas.json`;
- `a65afd7400b84d94578a1f2a6505b0f4d28db95f` — creazione del rapporto storico;
- `bd6d58a355d9a1451ff985c274067dbe236253a8` — aggiornamento `docs/codex-reports/LATEST.md`;
- `8022b29f23d3be8272dab3211b0f626a50b5e68d` — aggiornamento `Fabio/FABIO_CONTROLLO.md`.

La presente correzione di review viene pubblicata in un ulteriore commit atomico che aggiorna insieme rapporto storico, `LATEST.md` e `FABIO_CONTROLLO.md`. Il relativo SHA non può essere incorporato nel contenuto dello stesso commit senza auto-riferimento circolare; viene registrato sulla Coordination Board #11 e usato come nuovo SHA di review della PR #14.

## READ e PLAN realmente eseguiti

- Letto integralmente `AGENTS.md`.
- Letta Issue #11 — NEXO Coordination Board e gli aggiornamenti recenti.
- Verificata la review indipendente NEXO REVIEW `4992945074` sullo SHA `8022b29f23d3be8272dab3211b0f626a50b5e68d`.
- Verificata `main` a `a123a3c5e5d22a757eac9dda9dd20e44e3362f17`.
- Verificati PR #14, commenti e thread: nessun thread inline; review COMMENTED con P1 e P2; PR aperta e mergeable.
- Verificati i lavori concorrenti: PR #12 resta aperta e condivide soltanto `docs/codex-reports/LATEST.md` e `Fabio/FABIO_CONTROLLO.md`; nessuna sovrapposizione funzionale con `frontend/eas.json`.
- Riletti `frontend/eas.json`, `.github/workflows/testflight.yml` e `frontend/app.json` pertinenti.

## File modificati nell'attività

- `frontend/eas.json`
- `docs/codex-reports/2026-08-21_113546_fix-ascappid-testflight-run12.md`
- `docs/codex-reports/LATEST.md`
- `Fabio/FABIO_CONTROLLO.md`

`.github/workflows/testflight.yml`, `frontend/app.json`, package/lock, codice applicativo, concettuale e aree NEXO 1/2/3 non sono stati modificati.

## Modifica funzionale applicata

In `frontend/eas.json` il profilo submit production è configurato così:

```json
"submit": {
  "production": {
    "ios": {
      "ascAppId": "6803879211"
    }
  }
}
```

Il bundle identifier resta `com.fabioandreola.nexoveovision`.

## Evidenza primaria del valore ascAppId

Il Coordinatore/proprietario ha verificato direttamente nell'account App Store Connect, pagina **NEXO VEO VISION → Informazioni sull'App**, i seguenti dati:

- **ID Apple:** `6803879211`;
- **Bundle ID:** `com.fabioandreola.nexoveovision`.

Questa è l'evidenza primaria App Store Connect fornita dal proprietario che conferma l'associazione tra l'`ascAppId` configurato e l'app NEXO VEO VISION. Il valore non è dedotto dal repository, dall'EAS projectId, dal Team ID o da altri identificatori e non viene modificato in questa correzione di review.

## Controlli realmente eseguiti

### Validità JSON di eas.json

Controllo già eseguito sulla materializzazione esatta del contenuto pubblicato sul branch:

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

### Perimetro funzionale

Il confronto GitHub tra la base `a123a3c5e5d22a757eac9dda9dd20e44e3362f17` e il commit funzionale `168a19f2793261b98164d8e748fcc84e4472ca71` ha mostrato:

- **Stato:** `ahead`, 1 commit;
- **File funzionale modificato:** esclusivamente `frontend/eas.json`;
- **Diff stats:** 5 aggiunte, 1 eliminazione;
- **Workflow TestFlight:** non modificato.

La correzione successiva alla review 4992945074 modifica soltanto i tre file di reporting. Il diff funzionale di `frontend/eas.json` rispetto allo SHA revisionato `8022b29f23d3be8272dab3211b0f626a50b5e68d` deve quindi restare invariato e viene ricontrollato sul nuovo SHA prima della nuova richiesta di review.

### Controlli non ripetuti perché non influenzati dalla correzione documentale

- Expo Doctor e lint non vengono dichiarati nuovamente eseguiti: questa correzione di review non tocca dipendenze, lockfile o codice applicativo.
- EAS Build/EAS Submit non vengono avviati prima della review/merge.

## Fatti verificati

- `main` corrente è `a123a3c5e5d22a757eac9dda9dd20e44e3362f17`.
- PR #14 esiste, è aperta e risulta mergeable allo stato verificato prima della correzione documentale.
- `frontend/eas.json` contiene `submit.production.ios.ascAppId = "6803879211"`.
- Il bundle identifier resta `com.fabioandreola.nexoveovision`.
- Il workflow TestFlight usa `production`, `--non-interactive` e `--auto-submit` e non è stato modificato.
- L'evidenza primaria App Store Connect fornita dal Coordinatore/proprietario associa ID Apple `6803879211` al bundle `com.fabioandreola.nexoveovision`.

## Deduzioni

- La configurazione aggiunta risolve il messaggio specifico `Set ascAppId in the submit profile (eas.json) or re-run this command in interactive mode` secondo la configurazione EAS. Questo non dimostra che l'intera submission TestFlight riuscirà.

## Non verificato

- Nuova pipeline su `main` dopo merge.
- Nuovo esito Expo Doctor e lint dopo merge.
- EAS Build completa sulla nuova pipeline.
- EAS Submit completo verso Apple.
- Ricezione/visibilità della build in App Store Connect/TestFlight.
- Eventuali successivi requisiti Apple/EAS di autenticazione, accordi o ruoli.

## Errori, warning e problemi residui

- Review NEXO REVIEW 4992945074 sul vecchio SHA: P1 sulla provenienza dell'`ascAppId` e P2 sul reporting.
- P1 è indirizzato registrando l'evidenza primaria App Store Connect fornita dal proprietario, senza cambiare il valore.
- P2 è indirizzato registrando PR #14, tutti i quattro commit già presenti allo SHA revisionato e riallineando `FABIO_CONTROLLO.md` allo stato reale.
- Resta un rischio di conflitto documentale con PR #12 sui soli `docs/codex-reports/LATEST.md` e `Fabio/FABIO_CONTROLLO.md`; non riguarda `frontend/eas.json`.

## Dipendenze e credenziali

- Nessuna nuova dipendenza software richiesta.
- Le credenziali Apple/EAS non sono state lette, modificate o esposte.
- La loro effettiva validità per EAS Submit sarà verificabile solo dalla pipeline successiva.

## Rischi tecnici

- Dopo la correzione `ascAppId` può emergere un blocco successivo Apple/EAS non ancora osservato; non vengono predisposti workaround preventivi.
- PR #12 dovrà riallineare i file di reporting se viene mergeata dopo PR #14.

## Prossimo passo consigliato

1. Verificare il nuovo SHA della PR #14 e il diff completo.
2. Confermare `ascAppId`, bundle identifier e invariabilità del diff funzionale rispetto allo SHA già revisionato.
3. Richiedere una nuova review indipendente a NEXO REVIEW tramite Issue #11, indicando il nuovo SHA e senza usare `@codex review`.
4. Non fare merge da NEXO CODEX.
5. Dopo review e merge autorizzato, verificare separatamente nella nuova pipeline: Expo Doctor → PASS; Lint → PASS; EAS Build → PASS; EAS Submit → PASS; App Store Connect/TestFlight → build ricevuta.

## Decisioni richieste a Fabio

Nessuna in questa fase. Se la pipeline successiva espone un nuovo blocco Apple/EAS, verrà riportato integralmente senza workaround improvvisati.
