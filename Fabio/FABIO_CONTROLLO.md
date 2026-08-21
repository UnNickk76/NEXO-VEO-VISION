# Fabio Controllo

> Cruscotto di sola consultazione. Rapporto tecnico completo in `docs/codex-reports/LATEST.md`.

## Stato semplice
- **Data:** 22 agosto 2026 UTC
- **Attività:** F0/F1 Navigation Domain Core provider-neutral.
- **Branch:** `nexo-codex/f0-navigation-domain-core`
- **PR:** #19 — DRAFT, non mergeata.
- **Base:** `main` `213fb129201230c3875e5fb8fc157260f995fe04`.

## Cosa è stato fatto
È stato creato il nucleo di navigazione indipendente dal futuro provider mappe/routing: contratti per destinazione, posizione, richiesta percorso, alternative, ricalcolo e adapter, più una state machine esplicita per il ciclo di navigazione.

Stati gestiti:
`idle -> planning -> ready -> navigating -> recalculating`, con `completed`, `cancelled`, `failed` terminali.

Sono presenti guardie deterministiche contro transizioni illegali, route non appartenenti alla richiesta, avvio senza selezione e ricalcoli incoerenti.

## Controlli reali
Workflow GitHub Actions `Navigation Domain` run #1, ID `32530696140`: **SUCCESS** sul commit `7217c6c2c0cbfa910307b10b509d6b2f940e41d5`.

La CI esegue installazione dipendenze, Expo Doctor, lint e checker specifico del dominio navigazione.

## Cosa NON significa
- NEXO non sta ancora calcolando percorsi reali.
- Nessun provider mappe è stato scelto.
- Nessuna posizione GPS reale è stata collegata a questo core.
- V06/V21/V26/V27/V28 non vengono dichiarate completate.
- Nessun lavoro iOS/TestFlight o credenziale è stato toccato.

## Concorrenza
PR #18 precedente lasciata intatta. Nessuna dipendenza dai branch non mergeati #12 Saved Places e #17 Voice Core.

## Cosa deve fare Fabio
Nulla durante la review. PR #19 resta DRAFT e deve ricevere review indipendente NEXO REVIEW sullo SHA finale prima di qualsiasi merge.