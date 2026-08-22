# Fabio Controllo

> Cruscotto di sola consultazione. Il rapporto tecnico completo è in
> `docs/codex-reports/LATEST.md`.

## FULL BACKLOG CONSOLIDATION — COMPLETATO
- **Data:** 22 agosto 2026, 20:25 UTC.
- **Functional main consolidata:** `8cdfff156ca0e1a5f11e42bbd08db1e4469285db` prima del merge del presente report docs-only.
- **Backlog:** #24, #18, #19 e #20 tutte mergeate; #17 già mergeata; #25 resta chiusa senza merge.
- **PR aperte:** nessuna prima della PR docs-only del report.
- **Freeze funzionale:** resta attivo finché Fabio non sceglie il prossimo macro-obiettivo.

## Cosa c'è davvero in main
- Saved Places local-first core.
- Location Contract + Permission/Degraded State Machine + Freshness/Quality Policy.
- Voice Intent → Command core provider-neutral.
- Android Readiness non-EAS.
- Navigation Domain Core provider-neutral con lifecycle, alternative e recalculation foundation.
- Surface Capabilities/constraints provider-neutral.
- TestFlight workflow manuale (`workflow_dispatch`).

## Cosa NON c'è ancora
- GPS OS reale collegato all'app.
- mappa/provider reale e posizione utente visualizzata.
- geocoding/destinazione e routing reale end-to-end.
- STT/TTS/wake-word runtime completo.
- CarPlay/Android Auto runtime reale.
- APK/AAB o test Android device.
- nuova TestFlight dopo il consolidamento.

## Stato TestFlight / Android
- TestFlight: nessun EAS/build/submit eseguito durante il consolidamento; resta manuale e richiede autorizzazione Fabio.
- Android: prebuild/readiness verificata; nessuna EAS Build, APK/AAB o Google Play.

## Agenti
NEXO 1, NEXO CODEX, NEXO 2, NEXO 3 e NEXO REVIEW non hanno più vecchie PR bloccanti. Restano disponibili/standby senza avviare automaticamente nuovi task.

## Prossimo macro-obiettivo proposto
Primo vertical slice runtime provabile su iPhone:
**Avvio NEXO → permission Location reale → GPS reale → mappa reale → posizione utente → destinazione → routing reale → percorso visualizzato.**

Nessun TestFlight/EAS va avviato senza autorizzazione esplicita.

## Cosa deve fare Fabio adesso
Valutare e autorizzare il prossimo macro-obiettivo. Il vecchio backlog è chiuso.
