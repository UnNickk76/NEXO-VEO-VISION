# Rapporto più recente

Percorso: `docs/codex-reports/2026-08-21_214943_f0-surface-capabilities.md`

# NEXO 2 — F0 Surface Capabilities provider-neutral

- **Branch:** `nexo2/f0-surface-capabilities`
- **Base verificata:** `main` `213fb129201230c3875e5fb8fc157260f995fe04`
- **PR:** #20 — DRAFT
- **Requisiti/ID:** V05, V44, V45, V46
- **Stato:** correzioni P1 di NEXO REVIEW applicate; nuova review richiesta dopo VERIFY finale.

## Correzioni review

NEXO REVIEW sullo SHA `5a98d959370f95a66dc1ac6e9f8ec6ab7bc9c765` ha rilevato due P1.

1. `resolveSurfaceCapability` ora preserva l'availability runtime anche con policy `prohibited`; la capability resta `usable = false` senza trasformare availability in `unsupported`. Commit: `3541d2fda8f10929ffa253b2f35d833d424102f1`.
2. Il checker prova esplicitamente sia `available + prohibited` sia `degraded + prohibited`. Commit: `a69af5635e591cbfa985bfb8c173b124cce1f85f`.
3. V05/V44/V45/V46 restano `[ ]` / `parziale` ma ora riportano PR #20, commit di fix/test e checker pertinente. Commit: `f52e2f24882becb612439c24dc9fdc3fbf2541e8`.

## VERIFY realmente eseguito

Il checkout Git completo resta non disponibile nel runtime shell per DNS (`Could not resolve host: github.com`), quindi non viene dichiarato lint globale o repository checkout PASS.

Il modulo Surface è stato ricostruito dai contenuti GitHub del branch e verificato con TypeScript strict + checker:

```sh
tsc --strict --target ES2022 --module node16 --moduleResolution node16 --skipLibCheck --outDir /tmp/nexo2verify/out src/core/surface/*.ts scripts/check-surface-capabilities.ts
node /tmp/nexo2verify/out/scripts/check-surface-capabilities.js
```

**Exit code:** 0  
**Output:** `surface-capabilities checks: PASS`

La prova include la preservazione di availability `available` e `degraded` sotto policy `prohibited`, con `usable = false`.

## Perimetro e limiti

Nessuna UI/runtime CarPlay o Android Auto reale, nessun entitlement/template/host nativo, nessun provider, nessuna navigazione reale, nessun EAS/TestFlight o credenziale. Non sono stati toccati location, voice, navigation, Android workflow, `app.json` o `eas.json`.

## Commit rilevanti

- `5a98d959370f95a66dc1ac6e9f8ec6ab7bc9c765` — SHA iniziale revisionato.
- `3541d2fda8f10929ffa253b2f35d833d424102f1` — fix availability/policy.
- `a69af5635e591cbfa985bfb8c173b124cce1f85f` — checker ortogonalità.
- `f52e2f24882becb612439c24dc9fdc3fbf2541e8` — evidenze conceptual.
- `17424dbab6be2963d1acf72ba822d643fe775ebb` — rapporto storico aggiornato dopo review.

Il nuovo HEAD finale viene verificato e registrato sulla Coordination Board dopo l'aggiornamento di `LATEST.md` e `Fabio/FABIO_CONTROLLO.md`.
