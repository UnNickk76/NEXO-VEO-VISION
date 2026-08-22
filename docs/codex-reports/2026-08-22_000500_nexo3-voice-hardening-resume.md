# NEXO 3 — ripresa hardening Voice Intent → Command

- Data UTC: 2026-08-22 00:05 UTC
- Stato: in corso / parziale
- Branch: `nexo3/f0-voice-command-core`
- PR: #17 (DRAFT)
- Obiettivo: riprendere N3.1 dopo il nuovo dispatch del Coordinatore e irrobustire il core Voice Intent → Command senza dipendenze da STT, provider, mappe o runtime automotive.

## Verificato realmente

- Ultimo dispatch della Coordination Board ordina a NEXO 3 di continuare PR #17 e chiudere conceptual/reporting/test riproducibili prima della consegna.
- PR #17 resta DRAFT.
- Hardening applicato esclusivamente a `frontend/src/voice/command-core.ts` e checker voice dedicato.
- Parser fail-closed per input vuoto, con control characters, troppo lungo, incompleto o non supportato.
- Nessun testo libero produce una destinazione: start-navigation richiede sempre un destination ID già risolto.
- Command Envelope esteso con correlation ID, idempotency key, source, surface e timestamp.
- Command Bus gestisce handled, unhandled e rejected e impedisce la riesecuzione dello stesso idempotency key.

## VERIFY realmente eseguito

Ambiente shell disponibile con Node `v22.16.0` e TypeScript `5.8.3`.

Contenuto finale del core/checker ricostruito fedelmente dai file letti sul branch e verificato con:

```sh
node frontend/scripts/check-voice-command-core.mjs
```

Esito: PASS, exit code 0.
Output: `voice-command-core checks: PASS`.

Il checker compila realmente `command-core.ts` con TypeScript strict prima dei test comportamentali e copre: intenti positivi, input unsafe/ambigui/incompleti, assenza di navigazione da testo libero, envelope invariants, unhandled, handler rejection, duplicate/idempotency e registrazione handler duplicata.

## File modificati in questa ripresa

- `frontend/src/voice/command-core.ts`
- `frontend/scripts/check-voice-command-core.mjs`
- questo rapporto storico

## Non modificato

- PR #12 / saved-places
- PR #18 Android readiness
- PR #20 Surface
- navigation domain NEXO CODEX
- iOS/EAS/TestFlight/credenziali
- runtime CarPlay/Android Auto

## Residui prima della consegna N3.1

- aggiornare V02/V03/V34 conservativamente a `parziale`, mantenendo `[ ]`;
- riallineare `docs/codex-reports/LATEST.md` e `Fabio/FABIO_CONTROLLO.md` preservando i contenuti concorrenti;
- VERIFY finale sullo SHA definitivo;
- consegna a NEXO REVIEW sullo SHA esatto.
