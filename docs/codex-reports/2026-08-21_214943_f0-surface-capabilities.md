# NEXO 2 — F0 Surface Capabilities provider-neutral

- **Data/ora UTC handoff N2.1:** 2026-08-22 00:26 UTC
- **Branch:** `nexo2/f0-surface-capabilities`
- **Base originaria verificata:** `main` `213fb129201230c3875e5fb8fc157260f995fe04`
- **PR:** #20 — DRAFT
- **Requisiti/ID:** V05, V44, V45, V46
- **Task Control Plane:** N2.1 — CLOSE PR #20 REPORTING / VERIFY P1
- **Stato finale N2.1:** completato per handoff; PR resta DRAFT in attesa di NEXO REVIEW.

## Obiettivo

Chiudere il P1 di reporting/VERIFY senza ricominciare il lavoro: preservare il fix funzionale già presente, rendere coerenti rapporto storico, `LATEST.md` e `Fabio/FABIO_CONTROLLO.md`, registrare exact SHA e riconsegnare PR #20 a NEXO REVIEW.

## Verificato realmente

- `AGENTS.md` letto su `main`.
- Issue #11 letta per governance/conflitti/ownership e stato storico.
- `coordination/agents/README.md`, `coordination/agents/NEXO_2.md` e `coordination/reports/NEXO_2_REPORT.md` letti sul branch `coordination/agent-control`.
- PR #20 verificata OPEN / DRAFT / mergeable prima del commit N2.1, HEAD `dbb78f17fec64cabd3537e8c80ca7998da54b696`, 13 commit e 9 file modificati.
- Stato CI sullo SHA `dbb78f17...`: nessun commit status restituito da GitHub; quindi nessun CI PASS viene dichiarato.
- `frontend/src/core/surface/policy.ts` verificato sul branch: `availability` preserva `reportedAvailability`; `usable` è false quando policy è `prohibited`.
- `frontend/scripts/check-surface-capabilities.ts` verificato sul branch: contiene assertion esplicite per `available + prohibited` e `degraded + prohibited`.
- conceptual verificato: V05/V44/V45/V46 restano `[ ]` / `parziale` con riferimenti a PR #20, fix, test/checker e limiti runtime.

## Implementazione già presente e preservata

- `3541d2fda8f10929ffa253b2f35d833d424102f1` — fix policy/availability.
- `a69af5635e591cbfa985bfb8c173b124cce1f85f` — checker ortogonalità.
- `f52e2f24882becb612439c24dc9fdc3fbf2541e8` — evidenze conceptual.

N2.1 non altera il comportamento funzionale Surface: corregge e chiude esclusivamente reporting/handoff sul lavoro già esistente.

## Test/check realmente eseguiti e recuperati

Il VERIFY funzionale post-fix già eseguito sul modulo Surface ricostruito dai contenuti GitHub del branch è:

```sh
tsc --strict --target ES2022 --module node16 --moduleResolution node16 --skipLibCheck --outDir /tmp/nexo2verify/out src/core/surface/*.ts scripts/check-surface-capabilities.ts
node /tmp/nexo2verify/out/scripts/check-surface-capabilities.js
```

- **Exit code:** 0
- **Output:** `surface-capabilities checks: PASS`
- **Limite:** checkout Git completo non disponibile nel runtime shell per DNS (`Could not resolve host: github.com`); lint globale/repository checkout non dichiarati PASS.

Per N2.1 è stato inoltre interrogato GitHub sul commit status dello SHA pre-handoff `dbb78f17...`: lista status vuota. Questo è registrato come **nessun check CI disponibile**, non come PASS.

## File della PR

Funzionali/check già presenti:
- `frontend/src/core/surface/types.ts`
- `frontend/src/core/surface/profiles.ts`
- `frontend/src/core/surface/policy.ts`
- `frontend/src/core/surface/index.ts`
- `frontend/scripts/check-surface-capabilities.ts`

Concettuale/reporting:
- `docs/product/NEXO_CONCEPTUAL_MASTER.md`
- `docs/codex-reports/2026-08-21_214943_f0-surface-capabilities.md`
- `docs/codex-reports/LATEST.md`
- `Fabio/FABIO_CONTROLLO.md`

Nessun file location/saved-places, voice, navigation, Android workflow, `app.json`, `eas.json`, TestFlight o credenziale viene toccato da N2.1.

## Dedotto ma non dimostrato runtime

Il contratto è predisposto per adapter futuri phone/CarPlay/Android Auto, ma non dimostra entitlement, template, host, UI automotive o funzionamento in auto.

## Non verificato / limiti

- Nessun runtime CarPlay/Android Auto.
- Nessun test in auto o simulatore automotive.
- Nessun lint globale del repository.
- Nessuna EAS Build/TestFlight.
- Nessuna credenziale Apple/EAS modificata.
- Nessun CI status disponibile sullo SHA pre-handoff.

## Errori e warning

- Limite storico shell: clone Git completo fallito per DNS.
- Nessun nuovo errore funzionale rilevato nel perimetro N2.1.
- I file documentali condivisi della PR possono richiedere serializzazione/riallineamento dal Coordinatore prima del merge.

## Stato review

PR #20 resta DRAFT. N2.1 produce un nuovo SHA documentale e richiede una nuova review indipendente NEXO REVIEW sullo SHA esatto risultante. Nessun CLEAN viene dichiarato da NEXO 2 e nessun merge viene eseguito.

## Prossimo passo

1. Verificare il nuovo HEAD remoto dopo questo aggiornamento e dopo l'allineamento di `LATEST.md`/`FABIO_CONTROLLO.md`.
2. Registrare exact SHA nel Control Plane/report personale.
3. Handoff a NEXO REVIEW.
4. N2.2 resta non eleggibile finché NEXO REVIEW non revisiona il nuovo SHA.
