# Fabio Controllo

> Cruscotto di sola consultazione. Il rapporto tecnico completo è in
> `docs/codex-reports/LATEST.md`.

## NEXO 2 — PR #20 Surface Capabilities
- **Data:** 22 agosto 2026, 20:15 UTC.
- **Task:** reconciliation/finalizzazione PR #20 sul current main dopo merge #19.
- **Stato:** completato lato autore; PR #20 resta DRAFT e attende NEXO REVIEW sull'exact HEAD finale.
- **Branch:** `nexo2/f0-surface-capabilities`.
- **Pull request:** #20.
- **Main di riferimento:** `84c4799307adb6e63421bc0fa58ccb3dd0ad8a76`.
- **Backup storico:** `backup/pr20-before-84c47993` → `6e13d42379a5cff26cb37a67944f89302b925ac4`.

## Cosa è stato fatto realmente
- Preservato Surface Core per iOS/Android phone, CarPlay e Android Auto come modello provider-neutral, senza runtime automotive.
- Availability runtime e product policy restano dimensioni ortogonali; policy `prohibited` non riscrive availability e rende soltanto `usable=false`.
- Preservati vincoli moving/stopped, free-text, rich details, touch limits e ruolo passenger entro i limiti Surface.
- V05/V44/V45/V46 restano `[ ] / parziale`; nessuna funzione automotive è dichiarata completa.
- Aggiunta una CI Surface di sola validazione per eseguire davvero TypeScript strict/checker/conceptual sul branch riconciliato.
- Nessun EAS/TestFlight, credenziale o nuovo runtime.

## Controlli reali
Sull'exact conceptual HEAD `4a12effd03ab4034c31a9f45e52ab8c1c8c7d699`:
- Surface Capabilities `32595962428`: **SUCCESS**.
- Voice Validation `32595962430`: **SUCCESS**.
- Navigation Domain `32595962460`: **SUCCESS**.
- Android Readiness `32595962426`: **SUCCESS**.
- Location Quality Policy `32595962463`: **SUCCESS**.
- Location State Machine `32595962436`: **SUCCESS**.
- Location Contract `32595962371`: da ricontrollare prima del verdetto REVIEW, perché alla prima lettura finale era ancora in progress.

## Limiti dichiarati
- Nessun runtime CarPlay/Android Auto.
- Nessuna UI automotive finale.
- Nessun test in auto/simulatore automotive.
- Nessun EAS/TestFlight.

## Prossimo passo
Ricontrollo conclusione Location Contract, fresh metadata/diff/thread; NEXO REVIEW exact-SHA. Se CLEAN, Ready + merge #20. Poi report finale di consolidamento, senza partire automaticamente con nuove feature.

## Cosa deve fare Fabio adesso
Nulla.
