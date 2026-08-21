# Test diagnostico EAS con Xcode 16.4

## Dati attività
- Data e ora UTC: 2026-08-21 19:45 UTC.
- Obiettivo: eseguire una prova minima e isolata cambiando esclusivamente l'immagine iOS EAS Build da Xcode 26.0 a Xcode 16.4.
- Stato finale: parziale — modifica repository applicata e verificata staticamente; PR #16 DRAFT in attesa di review NEXO REVIEW; nessun merge e nessun TestFlight manuale.
- Branch: `nexo-codex/diagnostic-xcode-16-4-testflight`.
- Base: `main` `d3170fd874461c3734954f8f2d208350599673ca`.
- Pull request: PR #16.

## READ / PLAN verificati
- `AGENTS.md` letto integralmente.
- Coordination Board #11 e aggiornamenti recenti letti.
- `main` verificata a `d3170fd874461c3734954f8f2d208350599673ca`.
- PR aperte verificate: PR #12 resta aperta/non mergeable e non tocca `frontend/eas.json`; sovrapposizione solo sui file di reporting.
- `frontend/eas.json` letto su main.
- Run #14 `32491498688` e build EAS `a7639bdf-c5de-443d-8a37-b11faa9f0ba3` prese come riferimento diagnostico.
- Documentazione Expo corrente verificata: `build.<profile>.ios.image` è il percorso supportato per selezionare l'immagine iOS; `macos-sequoia-15.6-xcode-16.4` è immagine supportata e raccomandata per SDK 54 se non si vuole usare Xcode 26.

## Modifica funzionale
File: `frontend/eas.json`.

Aggiunto esclusivamente nel profilo `build.production`:
```json
"ios": {
  "image": "macos-sequoia-15.6-xcode-16.4"
}
```

Preservati integralmente:
- `autoIncrement: true`;
- `submit.production.ios.ascAppId = "6803879211"`;
- `submit.production.ios.appleTeamId = "853F5S8843"`.

## File non modificati intenzionalmente
- `frontend/app.json`;
- `.github/workflows/testflight.yml`;
- `frontend/package.json`;
- `frontend/package-lock.json`;
- codice applicativo;
- Distribution Certificate, Provisioning Profile, App Store Connect API Key, Push Key e altre credenziali Apple/EAS.

## VERIFY statico
Comando riproducibile:
```bash
python3 - <<'PY'
import json
p='frontend/eas.json'
e=json.load(open(p))
assert e['build']['production']['ios']['image']=='macos-sequoia-15.6-xcode-16.4'
assert e['build']['production']['autoIncrement'] is True
assert e['submit']['production']['ios']['ascAppId']=='6803879211'
assert e['submit']['production']['ios']['appleTeamId']=='853F5S8843'
print('assertions: PASS')
PY
```
Esito sul contenuto remoto finale: PASS, exit code 0.

Il confronto GitHub finale base→HEAD deve mostrare un solo file funzionale modificato, `frontend/eas.json`; gli altri file della PR sono esclusivamente reporting obbligatorio.

## Dedotto ma non ancora provato
Il pin dell'immagine deve far usare alla prossima EAS Build l'ambiente `macos-sequoia-15.6-xcode-16.4` / Xcode 16.4. Non viene dichiarato che questo risolva l'importazione del Distribution Certificate finché una pipeline reale post-merge non lo dimostra.

## Non verificato / limiti
- Nessuna nuova EAS Build avviata.
- Nessun EAS Submit eseguito.
- Nessuna nuova build TestFlight ricevuta.
- Nessuna credenziale modificata o rigenerata.

## Criterio diagnostico post-merge
Se la pipeline usa realmente Xcode 16.4 e `Prepare credentials` supera l'importazione del certificato, registrare che il cambio immagine ha superato il blocco osservato con Xcode 26. Se fallisce con lo stesso identico errore del certificato, registrare BLOCKED e concludere che la pista Xcode 26 non spiega il problema; nessun workaround aggiuntivo.

## Prossimo passo
Verificare SHA/diff/stato DRAFT di PR #16 e richiedere review indipendente NEXO REVIEW sullo SHA esatto. Merge vietato fino a CLEAN.
