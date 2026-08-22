# Rapporto più recente

Percorso: `docs/codex-reports/2026-08-21_214943_f0-surface-capabilities.md`

# NEXO 2 — N2.1 CLOSE PR #20 REPORTING / VERIFY P1

- **Data/ora UTC:** 2026-08-22 00:26 UTC
- **Branch:** `nexo2/f0-surface-capabilities`
- **PR:** #20 — DRAFT
- **Task:** N2.1
- **Stato:** completato per handoff a NEXO REVIEW; nessun CLEAN o merge dichiarato.

## Lavoro recuperato e preservato

La PR contiene già il fix funzionale `3541d2fda8f10929ffa253b2f35d833d424102f1`, il checker rafforzato `a69af5635e591cbfa985bfb8c173b124cce1f85f` e le evidenze conceptual `f52e2f24882becb612439c24dc9fdc3fbf2541e8`. N2.1 non ricomincia il task: chiude reporting e VERIFY/handoff.

## Verificato realmente

Prima del commit N2.1 PR #20 era OPEN / DRAFT / mergeable, HEAD `dbb78f17fec64cabd3537e8c80ca7998da54b696`, 13 commit, 9 file modificati. GitHub non restituiva commit status su tale SHA: nessun CI PASS viene dichiarato.

`policy.ts` preserva `reportedAvailability` anche sotto policy `prohibited` e forza `usable=false`. Il checker contiene casi espliciti `available + prohibited` e `degraded + prohibited`. V05/V44/V45/V46 restano `[ ]` / `parziale`.

## Test/check realmente eseguiti e recuperati

```sh
tsc --strict --target ES2022 --module node16 --moduleResolution node16 --skipLibCheck --outDir /tmp/nexo2verify/out src/core/surface/*.ts scripts/check-surface-capabilities.ts
node /tmp/nexo2verify/out/scripts/check-surface-capabilities.js
```

- **Exit code:** 0
- **Output:** `surface-capabilities checks: PASS`
- **Limite:** modulo ricostruito dai contenuti GitHub del branch; checkout Git completo non disponibile nel runtime shell per DNS. Lint globale non dichiarato PASS.

## File coinvolti

Funzionali/check: `frontend/src/core/surface/types.ts`, `profiles.ts`, `policy.ts`, `index.ts`, `frontend/scripts/check-surface-capabilities.ts`.

Concettuale/reporting: `docs/product/NEXO_CONCEPTUAL_MASTER.md`, rapporto storico, `docs/codex-reports/LATEST.md`, `Fabio/FABIO_CONTROLLO.md`.

## Limiti e perimetro

Nessun runtime/UI CarPlay o Android Auto reale; nessun entitlement/template/host nativo; nessun test in auto; nessun EAS/TestFlight; nessuna credenziale modificata. Non toccate aree location/saved-places, voice, navigation, Android workflow, `app.json`, `eas.json`.

## Prossimo passo

Completare l'allineamento di `Fabio/FABIO_CONTROLLO.md`, verificare il nuovo HEAD remoto, registrare exact SHA nel Control Plane/report personale e consegnare a NEXO REVIEW. N2.2 resta in attesa della review del nuovo SHA.
