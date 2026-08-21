# Fabio Controllo

> Cruscotto di sola consultazione. Il rapporto tecnico completo è in
> `docs/codex-reports/LATEST.md`.

## Stato semplice

- **Data:** 21 agosto 2026, 21:49 UTC
- **Attività:** NEXO 2 — primo contratto provider-neutral delle Surface NEXO.
- **Stato:** PR #20 DRAFT; implementazione del core Surface completata nel perimetro assegnato e verificata con TypeScript strict + checker isolato. In attesa di review indipendente. Nessun merge autonomo.
- **Branch:** `nexo2/f0-surface-capabilities`
- **Pull request:** PR #20
- **Base:** `main` `213fb129201230c3875e5fb8fc157260f995fe04`.

## Cosa è stato modificato realmente

- Creato `frontend/src/core/surface/` con tipi, profili, policy e API pubblica per `ios-phone`, `android-phone`, `carplay`, `android-auto`.
- Le capability runtime devono essere dichiarate esplicitamente: non vengono dedotte dal nome della piattaforma.
- In movimento il contratto limita free text, rich details e touch; i limiti automotive prevalgono sul ruolo Passenger.
- Creato checker dedicato `frontend/scripts/check-surface-capabilities.ts`.
- Registro concettuale aggiornato in modo conservativo: V05/V44/V45/V46 restano `[ ]` e diventano soltanto `parziale`.
- Nessuna modifica a saved-places, voice core, Android build config, `app.json`, `eas.json`, workflow TestFlight o credenziali.

## Controlli

- TypeScript strict + checker Surface: **PASS** (`surface-capabilities checks: PASS`).
- Scansione import provider/platform-specific: **PASS**, nessun match.
- Scansione token API Apple/Google/Map provider: **PASS**, nessun match.
- Trailing whitespace sui file funzionali/checker: **PASS**, nessun match.
- Verifica remota conceptual: V05/V44/V45/V46 = `[ ]` / `parziale`.
- Checkout Git locale completo: **NON DISPONIBILE** per DNS del runtime shell (`Could not resolve host: github.com`); i test sono stati eseguiti sul modulo isolato ricostruito dai contenuti pubblicati sul branch.
- Lint globale frontend: non eseguito e non dichiarato PASS.

## Problemi e review

- Nessun problema funzionale aperto individuato dal self-review.
- Il contratto NON dimostra entitlement/runtime CarPlay o Android Auto e non contiene UI automotive reale.
- PR #12, #17 e #18 sono concorrenti; nessuna sovrapposizione funzionale rilevata, ma i file di reporting/conceptual dovranno essere serializzati prima del merge.
- PR #20 deve restare DRAFT fino a review CLEAN e decisione del Coordinatore.

## Cosa deve fare Fabio adesso

Nulla. NEXO 2 consegna PR #20 a NEXO REVIEW sullo SHA finale. Il Coordinatore gestirà eventuale Ready/merge dopo review e riallineamento con la main corrente.
