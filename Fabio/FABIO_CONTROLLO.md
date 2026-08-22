# Fabio Controllo

> Cruscotto di sola consultazione. Il rapporto tecnico completo è in `docs/codex-reports/LATEST.md`.

## Stato semplice

- **Data/ora UTC:** 22 agosto 2026, 00:26 UTC
- **Attività:** NEXO 2 — N2.1 chiusura reporting/VERIFY PR #20.
- **Stato:** 🟣 handoff a NEXO REVIEW; PR #20 resta DRAFT. Nessun CLEAN e nessun merge dichiarato.
- **Branch:** `nexo2/f0-surface-capabilities`

## Cosa è stato realmente fatto

- Recuperato il lavoro già presente senza ricominciare da zero.
- Preservato il fix che separa availability runtime e policy prodotto: `prohibited` rende la capability inutilizzabile ma non falsifica availability.
- Preservato il checker con casi `available + prohibited` e `degraded + prohibited`.
- V05/V44/V45/V46 restano `[ ]` / `parziale` con evidenze e limiti espliciti.
- Rapporto storico e `LATEST.md` riallineati al task N2.1 e al nuovo handoff.

## VERIFY

- TypeScript strict + checker Surface già eseguiti dopo i fix: **PASS**, exit 0, output `surface-capabilities checks: PASS`.
- GitHub commit status sullo SHA pre-handoff `dbb78f17...`: nessuno status disponibile; non viene dichiarato CI PASS.
- Checkout Git completo/lint globale: **NON verificati** per limite DNS del runtime shell.

## Perimetro protetto

Non toccati: location/saved places, voice, navigation, Android workflow, `app.json`, `eas.json`, TestFlight, credenziali, runtime/UI CarPlay o Android Auto reali.

## Problemi aperti

La PR deve essere revisionata da NEXO REVIEW sul nuovo exact SHA. I file documentali condivisi possono richiedere serializzazione dal Coordinatore prima di un eventuale merge.

## Cosa deve fare Fabio adesso

Nulla. NEXO 2 registra il nuovo exact SHA nel Control Plane e consegna PR #20 a NEXO REVIEW. N2.2 non parte finché la review del nuovo SHA non è avvenuta.
