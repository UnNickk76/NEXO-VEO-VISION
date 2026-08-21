# Fabio Controllo

> Cruscotto di sola consultazione. Il rapporto tecnico completo è in
> `docs/codex-reports/LATEST.md`.

## Stato semplice

- **Data:** 21 agosto 2026, 19:45 UTC
- **Attività:** test diagnostico EAS con Xcode 16.4.
- **Stato:** PR #16 DRAFT; modifica repository minima applicata e verificata staticamente; in attesa di review NEXO REVIEW. Nessun merge e nessuna nuova pipeline TestFlight avviati.
- **Branch:** `nexo-codex/diagnostic-xcode-16-4-testflight`
- **Pull request:** PR #16
- **Base:** `main` `d3170fd874461c3734954f8f2d208350599673ca`.

## Cosa è stato modificato realmente

- `frontend/eas.json`: aggiunto esclusivamente `build.production.ios.image = "macos-sequoia-15.6-xcode-16.4"`.
- `autoIncrement` preservato.
- `submit.production.ios.ascAppId = "6803879211"` preservato.
- `submit.production.ios.appleTeamId = "853F5S8843"` preservato.
- Nessuna modifica ad `app.json`, workflow TestFlight, dipendenze, codice o credenziali.

## Controlli

- Percorso EAS `build.production.ios.image`: supportato dalla documentazione Expo corrente.
- Immagine `macos-sequoia-15.6-xcode-16.4`: supportata e raccomandata per SDK 54 se non si vuole usare Xcode 26.
- JSON e valori invarianti verificati staticamente: PASS.
- Nessuna nuova EAS Build/TestFlight eseguita in questa attività.

## Problemi e review

- Il cambio immagine è solo diagnostico: non dimostra ancora che il problema di importazione del Distribution Certificate dipenda da Xcode 26.
- Dopo review CLEAN e merge autorizzato, la pipeline dovrà mostrare realmente Xcode 16.4 e verificare Prepare credentials.
- Se ricompare lo stesso identico errore del certificato, nessun altro workaround repository: stato BLOCKED e pista Xcode 26 esclusa come spiegazione.
- PR #12 resta concorrente soltanto sui file di reporting e dovrà essere riallineata/serializzata prima di un proprio merge.

## Cosa deve fare Fabio adesso

Nulla durante la review. NEXO CODEX passa PR #16 a NEXO REVIEW sullo SHA finale esatto. Merge vietato fino a verdetto CLEAN.
