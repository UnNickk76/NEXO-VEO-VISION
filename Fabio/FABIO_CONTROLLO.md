# Fabio Controllo

> Cruscotto di sola consultazione. Il rapporto tecnico completo è in
> `docs/codex-reports/LATEST.md`.

## NEXO 2 — PR #20 Surface Capabilities
- **Data:** 22 agosto 2026, 20:18 UTC.
- **Stato:** reconciliation e VERIFY completati; PR #20 DRAFT in attesa di NEXO REVIEW exact-SHA.
- **Branch:** `nexo2/f0-surface-capabilities`.
- **Main di riferimento:** `84c4799307adb6e63421bc0fa58ccb3dd0ad8a76`.
- **Backup:** `backup/pr20-before-84c47993` → `6e13d42379a5cff26cb37a67944f89302b925ac4`.

## Fatto realmente
- Surface Capabilities provider-neutral preservate per phone/CarPlay/Android Auto.
- Availability runtime e product policy restano ortogonali; `prohibited` rende `usable=false` senza fingere `unsupported`.
- Vincoli moving/stopped, touch, free-text, rich details e passenger preservati.
- V05/V44/V45/V46 restano `[ ] / parziale`; nessun runtime automotive dichiarato.
- Aggiunta CI Surface di sola validazione; nessun nuovo slice funzionale.

## VERIFY reale sul contenuto functional+conceptual `4a12effd...`
- Surface Capabilities `32595962428`: **SUCCESS**.
- Voice Validation `32595962430`: **SUCCESS**.
- Navigation Domain `32595962460`: **SUCCESS**.
- Android Readiness `32595962426`: **SUCCESS**.
- Location Quality Policy `32595962463`: **SUCCESS**.
- Location State Machine `32595962436`: **SUCCESS**.
- Location Contract `32595962371`: **SUCCESS**.

Surface Validation comprende npm ci, Expo Doctor, lint, TypeScript strict, checker Surface e conceptual validator.

## Limiti
Nessun runtime CarPlay/Android Auto, nessun test in auto, nessuna UI automotive finale, nessun EAS/TestFlight, nessuna credenziale.

## Prossimo passo
NEXO REVIEW sul final exact HEAD; se CLEAN, Ready + merge #20. Poi report finale di consolidamento. Nessuna nuova feature parte automaticamente.

## Cosa deve fare Fabio adesso
Nulla fino al report di consolidamento.
