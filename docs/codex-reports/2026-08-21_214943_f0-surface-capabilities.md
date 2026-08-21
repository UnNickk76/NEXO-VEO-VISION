# NEXO 2 — F0 Surface Capabilities provider-neutral

- **Branch:** `nexo2/f0-surface-capabilities`
- **Base verificata:** `main` `213fb129201230c3875e5fb8fc157260f995fe04`
- **PR:** #20 — DRAFT
- **Requisiti/ID:** V05, V44, V45, V46
- **Stato:** correzioni P1 di NEXO REVIEW applicate; nuova review richiesta dopo VERIFY finale.

## Obiettivo

Creare il primo contratto provider-neutral delle Surface NEXO (`ios-phone`, `android-phone`, `carplay`, `android-auto`) senza implementare UI/runtime automotive reale, provider, entitlement, template CarPlay o host Android Auto.

## Implementazione

Il modulo `frontend/src/core/surface/` definisce contratto versionato, capability, availability runtime, policy prodotto, vincoli moving/stopped, ruolo Driver/Passenger e profili conservativi phone/automotive. Il core non importa API Apple/Google e non deduce availability dal nome della Surface.

La funzione `resolveSurfaceCapability` mantiene **ortogonali** policy e availability: `availability` conserva sempre il valore riportato dal runtime/adattatore; `policy = prohibited` rende `usable = false` senza riscrivere l'availability a `unsupported`.

## Correzioni review PR #20

NEXO REVIEW sullo SHA `5a98d959370f95a66dc1ac6e9f8ec6ab7bc9c765` ha rilevato due P1.

### P1.1 — policy/availability

Corretto in:
- `3541d2fda8f10929ffa253b2f35d833d424102f1` — `frontend/src/core/surface/policy.ts` preserva `reportedAvailability` anche con policy `prohibited`, con `usable = false`.
- `a69af5635e591cbfa985bfb8c173b124cce1f85f` — checker aggiornato con prova esplicita `available + prohibited` e ulteriore caso `degraded + prohibited`; in entrambi availability resta quella runtime e la capability resta inutilizzabile.

### P1.2 — evidenze concettuali

Corretto in:
- `f52e2f24882becb612439c24dc9fdc3fbf2541e8` — `docs/product/NEXO_CONCEPTUAL_MASTER.md` mantiene V05/V44/V45/V46 `[ ]` / `parziale` e aggiunge evidenze riproducibili con PR #20, commit di fix, commit test e checker pertinente.

Nessuna voce è stata marcata `[x]`.

## VERIFY realmente eseguito dopo le correzioni

Il clone Git completo del repository nel runtime shell continua a fallire per DNS (`Could not resolve host: github.com`), quindi non viene dichiarato alcun checkout completo o lint globale PASS.

È stato ricostruito localmente il modulo Surface esatto dai contenuti GitHub del branch e sono stati eseguiti:

```sh
tsc --strict --target ES2022 --module node16 --moduleResolution node16 --skipLibCheck --outDir /tmp/nexo2verify/out src/core/surface/*.ts scripts/check-surface-capabilities.ts
node /tmp/nexo2verify/out/scripts/check-surface-capabilities.js
```

**Exit code:** 0  
**Output:** `surface-capabilities checks: PASS`

Casi verificati includono:
- quattro Surface presenti;
- regole automotive precedono il ruolo;
- availability `available` preservata con policy `prohibited`;
- availability `degraded` preservata con policy `prohibited`;
- `usable = false` quando policy proibisce la capability;
- free text bloccato su automotive e telefono in movimento;
- touch budget conservativo;
- runtime `unsupported` non viene inferito/alterato dal `SurfaceKind`;
- Passenger non bypassa i limiti automotive.

## Limiti dichiarati

Non verificati né implementati: runtime CarPlay/Android Auto, entitlement, template/host nativi, UI finale, mappe/routing reali, test in auto, EAS/TestFlight, credenziali. Nessuna nuova dipendenza aggiunta.

## Concorrenza

Non toccati: saved-places/location NEXO 1, voice NEXO 3, navigation NEXO CODEX, Android workflow, `app.json`, `eas.json`, TestFlight/credenziali. I file documentali condivisi restano da serializzare dal Coordinatore prima di un eventuale merge.

## Commit principali

- `dfc1380ae5934d753450068ed1475cbcd8c8f8f0` — tipi Surface.
- `1dde5afb9669003a4823d4a294cb42f4b64534a1` — profili Surface.
- `ae9d809f50bda52133e51d67f03f6402873d5b20` — policy iniziale.
- `a1e8bbf7269b867625c8cdd2e7cdec955367fb43` — API pubblica.
- `4f4759c0d5f1b43aeee91037e31a195d928d96d4` — checker iniziale.
- `6abb17c5addf847282941727591ffae55e10f53a` — conceptual iniziale.
- `5a98d959370f95a66dc1ac6e9f8ec6ab7bc9c765` — reporting/consegna iniziale revisionata.
- `3541d2fda8f10929ffa253b2f35d833d424102f1` — fix availability/policy.
- `a69af5635e591cbfa985bfb8c173b124cce1f85f` — checker ortogonalità rafforzato.
- `f52e2f24882becb612439c24dc9fdc3fbf2541e8` — evidenze conceptual riproducibili.

Il commit finale che aggiorna reporting viene registrato sulla Board dopo la pubblicazione, evitando auto-riferimenti circolari.

## Prossimo passo

VERIFY remoto finale di PR #20 sul nuovo SHA, conferma DRAFT/mergeability/perimetro, quindi nuova review indipendente NEXO REVIEW. N2.2 non parte finché N2.1 non è riconsegnato secondo la coda Batch.
