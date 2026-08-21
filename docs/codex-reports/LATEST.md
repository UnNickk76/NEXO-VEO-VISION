Rapporto storico: `docs/codex-reports/2026-08-21_194500_diagnostic-xcode-16-4-testflight.md`

# Test diagnostico EAS con Xcode 16.4

## Dati attività
- Data e ora UTC: 2026-08-21 19:45 UTC.
- Obiettivo: eseguire una prova minima e isolata cambiando esclusivamente l'immagine iOS EAS Build da Xcode 26.0 a Xcode 16.4.
- Stato finale: parziale — modifica repository applicata e verificata staticamente; PR #16 DRAFT in attesa di nuova review NEXO REVIEW; nessun merge e nessun TestFlight manuale.
- Branch: `nexo-codex/diagnostic-xcode-16-4-testflight`.
- Base: `main` `d3170fd874461c3734954f8f2d208350599673ca`.
- Pull request: PR #16.
- SHA revisionato da NEXO REVIEW prima della correzione P1: `c6195318c9c03e7cc1aa815382e31872bde14eff`.

## READ / PLAN verificati
- `AGENTS.md` letto integralmente.
- Coordination Board #11 e aggiornamenti recenti letti.
- PR #16 verificata DRAFT sullo SHA revisionato `c6195318c9c03e7cc1aa815382e31872bde14eff`.
- Ricostruita la catena reale dei 7 commit presenti allo SHA revisionato.
- Verificati i 4 file reali del diff.
- `frontend/eas.json` verificato corretto e fuori dal perimetro della correzione documentale.

## Cronologia completa dei commit PR #16
Ordine dal più vecchio al più recente:
1. `2de78c1a2818960abf416c631d2f26e028831480` — `test(ios): pin EAS build image to Xcode 16.4`.
2. `982aee46a44f5686b1f109a20cbc914f1ecde6da` — `docs: report Xcode 16.4 diagnostic`.
3. `cf55902d03e3cfe870ad2bd9f4992489215457a4` — `docs: update latest Xcode 16.4 diagnostic`.
4. `10f4d80bf531329fcd988b71af5fb54f0e1ef628` — `docs: update Fabio control for Xcode 16.4 diagnostic`.
5. `4207d18ed08821951422103ad7fa334c07bd627f` — `docs: align Xcode 16.4 report with PR 16`.
6. `0e2559904026c59aae17ff33387cbca78693bbdf` — `docs: align latest report with PR 16`.
7. `c6195318c9c03e7cc1aa815382e31872bde14eff` — `docs: align Fabio control with PR 16`.
8. `HEAD` — correzione P1 documentale che aggiorna atomicamente rapporto storico e `LATEST.md`. Per evitare auto-riferimento circolare, lo SHA di questo stesso commit non è hardcodato nel suo contenuto: `HEAD` indica esattamente lo SHA corrente della PR dopo questa correzione e viene registrato sulla Coordination Board #11 e nella richiesta di review.

## Inventario completo dei file reali della PR

### FILE FUNZIONALE
- `frontend/eas.json` — modificato.

### FILE DI REPORTING
- `docs/codex-reports/2026-08-21_194500_diagnostic-xcode-16-4-testflight.md` — creato e poi aggiornato.
- `docs/codex-reports/LATEST.md` — modificato.
- `Fabio/FABIO_CONTROLLO.md` — modificato.

### File eliminati
- Nessuno.

Il diff complessivo della PR deve quindi contenere esattamente 4 file: 1 funzionale e 3 di reporting.

## Modifica funzionale
File: `frontend/eas.json`.

Nel profilo `build.production` è stato aggiunto esclusivamente:
```json
"ios": {
  "image": "macos-sequoia-15.6-xcode-16.4"
}
```

Preservati integralmente:
- `autoIncrement: true`;
- `submit.production.ios.ascAppId = "6803879211"`;
- `submit.production.ios.appleTeamId = "853F5S8843"`.

La correzione P1 documentale NON modifica `frontend/eas.json`.

## File non modificati intenzionalmente
- `frontend/app.json`;
- `.github/workflows/testflight.yml`;
- `frontend/package.json`;
- `frontend/package-lock.json`;
- codice applicativo;
- Distribution Certificate, Provisioning Profile, App Store Connect API Key, Push Key e altre credenziali Apple/EAS.

## VERIFY statico
Comando riproducibile per la configurazione:
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
Esito già ottenuto sul contenuto remoto funzionale: PASS, exit code 0.

Controlli conclusivi della correzione P1 da eseguire sul nuovo HEAD:
- PR open e DRAFT;
- mergeable;
- confronto `main` → HEAD;
- conteggio commit reale;
- conteggio file reale;
- corrispondenza della cronologia dichiarata con GitHub, usando `HEAD` per il commit auto-referenziale corrente;
- corrispondenza esatta dei 4 file dichiarati con il diff GitHub;
- blob SHA di `frontend/eas.json` identico a quello dello SHA revisionato `c6195318...`.

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
Verificare il nuovo SHA/diff/stato DRAFT di PR #16 e richiedere nuova review indipendente NEXO REVIEW sullo SHA esatto. Merge vietato fino a CLEAN.
