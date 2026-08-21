Rapporto storico: `docs/codex-reports/2026-08-21_140000_fix-apple-team-id-testflight-run13.md`

# Fix Apple Team ID per EAS/TestFlight run #13

## Dati attività
- **Data e ora UTC:** 2026-08-21 14:00 UTC.
- **Obiettivo:** correggere esclusivamente il prompt non-interattivo `Apple Team ID` emerso nella TestFlight run #13 configurando il Team ID verificato nei due percorsi repository supportati, senza modificare workflow, dipendenze, codice applicativo o credenziali remote.
- **Stato finale:** `parziale` — fix repository applicato e verificato staticamente; PR #15 DRAFT in attesa di review indipendente NEXO REVIEW; nessuna nuova pipeline TestFlight avviata.
- **Branch:** `nexo-codex/fix-apple-team-id-testflight-run13`.
- **Base:** `main` `2679343a9e0766097cbc89263ecccca9861b97e7`.
- **Pull request:** PR #15 — `https://github.com/UnNickk76/NEXO-VEO-VISION/pull/15`.

## Commit creati prima del reporting
- `0a6747e734cec67cf0e6e00044ede19b4cd71954` — `frontend/app.json`: aggiunto `expo.ios.appleTeamId`.
- `f93aed5a99c1ffaf8b3ada26fee28a2ce453d179` — `frontend/eas.json`: aggiunto `submit.production.ios.appleTeamId` mantenendo `ascAppId`.

I commit che pubblicano questo rapporto, `LATEST.md` e `FABIO_CONTROLLO.md` non possono includere il proprio SHA nel contenuto dello stesso commit senza auto-riferimento circolare. I relativi SHA finali vengono registrati sulla Coordination Board #11 insieme allo SHA esatto richiesto per la review.

## READ / PLAN realmente eseguiti
- Letto integralmente `AGENTS.md`.
- Letta Coordination Board #11, inclusa la direttiva: PR operative DRAFT durante sviluppo/fallback review; nessuna menzione GitHub invocante verso l'account Codex.
- Verificato `main` a `2679343a9e0766097cbc89263ecccca9861b97e7`.
- Verificata PR #12: aperta, base `1c66a29...`, head `7bdb767...`, non mergeable allo stato letto; nessuna modifica a `frontend/app.json` o `frontend/eas.json`; sovrapposizione solo sui file di reporting.
- Letti `frontend/app.json`, `frontend/eas.json`, `.github/workflows/testflight.yml` su `main`.
- Verificata TestFlight run #13 `32486273893`, job `96783389638`: Expo Doctor `18/18` PASS; lint 0 errori/1 warning preesistente; EAS account autenticato; `ascAppId` letto; primo errore reale `Failed to authenticate with the App Store Connect API key from EAS credentials service: Input is required, but stdin is not readable. Failed to display prompt: Apple Team ID:`; build remota fallita in Prepare credentials.
- Team ID `853F5S8843` trattato come dato primario verificato dal Coordinatore in Apple Developer Membership; Apple ID `6803879211` e bundle `com.fabioandreola.nexoveovision` già confermati dal Coordinatore/App Store Connect e dalla run #13.
- Verificata documentazione Expo corrente: `expo.ios.appleTeamId` è supportato nell'app config; `submit.<profile>.ios.appleTeamId` è supportato nello schema EAS Submit insieme ad `ascAppId`.

## File funzionali modificati
1. `frontend/app.json`
2. `frontend/eas.json`

## Modifica funzionale
### `frontend/app.json`
Dentro `expo.ios` è stato aggiunto:
```json
"appleTeamId": "853F5S8843"
```
Il bundle resta:
```json
"bundleIdentifier": "com.fabioandreola.nexoveovision"
```

### `frontend/eas.json`
Il profilo submit production iOS è ora:
```json
"ios": {
  "ascAppId": "6803879211",
  "appleTeamId": "853F5S8843"
}
```
Non è stato aggiunto alcun `build.production.ios.appleTeamId`.

## File deliberatamente non modificati
- `.github/workflows/testflight.yml`
- `frontend/package.json`
- `frontend/package-lock.json`
- codice applicativo NEXO
- concettuale/roadmap
- file funzionali PR #12/NEXO 1
- credenziali Apple/EAS remote, API key, Distribution Certificate, Provisioning Profile, Push Key

## Verifiche realmente eseguite
### JSON e assertion
Contenuti remoti finali dei due file funzionali materializzati in `/tmp/nexo-app.json` e `/tmp/nexo-eas.json`, quindi eseguito:
```bash
python3 -m json.tool /tmp/nexo-app.json >/dev/null && python3 -m json.tool /tmp/nexo-eas.json >/dev/null && python3 - <<'PY'
import json
app=json.load(open('/tmp/nexo-app.json'))
eas=json.load(open('/tmp/nexo-eas.json'))
assert app['expo']['ios']['appleTeamId']=='853F5S8843'
assert app['expo']['ios']['bundleIdentifier']=='com.fabioandreola.nexoveovision'
assert eas['submit']['production']['ios']['ascAppId']=='6803879211'
assert eas['submit']['production']['ios']['appleTeamId']=='853F5S8843'
assert 'ios' not in eas['build']['production'] or 'appleTeamId' not in eas['build']['production'].get('ios', {})
print('assertions: PASS')
PY
```
- **Exit code:** `0`.
- **Output:** `assertions: PASS`.

### Perimetro funzionale
Confronto GitHub `2679343a9e0766097cbc89263ecccca9861b97e7...f93aed5a99c1ffaf8b3ada26fee28a2ce453d179`:
- `ahead_by: 2`, `behind_by: 0`;
- file modificati: solo `frontend/app.json` e `frontend/eas.json`;
- `.github/workflows/testflight.yml` assente dal diff.

### Stato PR iniziale
PR #15 creata DRAFT da base `main` `2679343a...`, head iniziale `f93aed5a...`; nessun merge eseguito.

## Verificato realmente
- `expo.ios.appleTeamId == "853F5S8843"`.
- `expo.ios.bundleIdentifier == "com.fabioandreola.nexoveovision"`.
- `submit.production.ios.ascAppId == "6803879211"`.
- `submit.production.ios.appleTeamId == "853F5S8843"`.
- assenza di `build.production.ios.appleTeamId`.
- workflow TestFlight invariato nel diff funzionale.
- nessuna modifica a credenziali remote.

## Dedotto ma non ancora provato da pipeline
La presenza dei due campi `appleTeamId` nei percorsi supportati fornisce a EAS CLI il Team ID che la run #13 tentava di richiedere interattivamente. Questo rende ragionevole aspettarsi la scomparsa del prompt `Failed to display prompt: Apple Team ID:`, ma non viene dichiarato risolto finché una nuova pipeline reale su `main` non lo dimostra.

## Non verificato / limiti
- Nessuna nuova EAS Build o submission avviata in questa attività.
- Nessuna modifica o verifica diretta dell'associazione remota della API key EAS oltre alle evidenze della run #13.
- Nessuna build ricevuta in App Store Connect/TestFlight.
- Warning secondario `ITSAppUsesNonExemptEncryption` non trattato perché fuori perimetro e non primo blocco della run #13.

## Errori e warning noti
- Run #13: prompt Apple Team ID in CI e failure Prepare credentials.
- Lint: 1 warning preesistente (`Text` inutilizzato in `frontend/app/index.tsx`), 0 errori.
- Warning secondari Node/cache/cripto della run #13 non trattati in questo fix.

## Concorrenza / rischio
PR #12 condivide `docs/codex-reports/LATEST.md` e `Fabio/FABIO_CONTROLLO.md`, ma non i due file funzionali. Poiché #12 parte da una base precedente ed è non mergeable allo stato verificato, dovrà essere riallineata/serializzata prima del proprio merge; questa attività non modifica il suo branch.

## Prossimo passo
1. Completare reporting obbligatorio nella PR #15.
2. Verificare SHA finale, diff completo e stato DRAFT.
3. Richiedere review indipendente a NEXO REVIEW sullo SHA esatto tramite Coordination Board #11.
4. Nessun merge da NEXO CODEX e nessun TestFlight manuale.
5. Solo dopo review CLEAN e merge autorizzato, nuova pipeline reale: Expo Doctor → Lint → autenticazione EAS/ASC senza prompt Team ID → Prepare credentials → EAS Build → EAS Submit → ricezione TestFlight.

## Decisioni richieste a Fabio
Nessuna prima della review. Se il prompt Apple Team ID ricompare con entrambi i campi presenti, fermarsi e registrare BLOCKED: servirà verificare/correggere l'associazione remota della credenziale EAS, senza workaround repository aggiuntivi.
