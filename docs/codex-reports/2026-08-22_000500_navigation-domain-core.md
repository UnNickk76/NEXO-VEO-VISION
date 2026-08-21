# NEXO CODEX — F0/F1 Navigation Domain Core

## Dati attività
- Data: 2026-08-22 UTC.
- Incarico: Coordination Board #11, commento 5375694268.
- Branch: `nexo-codex/f0-navigation-domain-core`.
- PR: #19, DRAFT.
- Base verificata: `main` `213fb129201230c3875e5fb8fc157260f995fe04`.
- Obiettivo: fondazione provider-neutral del dominio navigazione, senza scegliere o integrare provider mappe/routing.

## READ / concorrenza
- `AGENTS.md` letto integralmente prima delle modifiche.
- Coordination Board #11 e direttive correnti verificate.
- PR #18 verificata OPEN/DRAFT senza CHANGES REQUIRED prima di iniziare e lasciata intatta.
- PR concorrenti #12 Saved Places e #17 Voice Core considerate: questa PR non dipende dai loro branch non mergeati.

## Implementazione funzionale
### `frontend/src/navigation/domain.ts`
Introduce contratti provider-neutral:
- `DestinationRef`;
- `LocationSample`;
- `RouteRequest`;
- `RouteCandidate`;
- `RecalculationRequest`;
- `RoutingAdapter`;
- `NavigationEvent`;
- `NavigationSession`.

State machine esplicita:
`idle -> planning -> ready -> navigating -> recalculating -> ready`, con terminali `completed`, `cancelled`, `failed`.

Garanzie implementate:
- transizioni illegali rifiutate;
- route candidate vincolate al request attivo;
- selezione consentita solo fra alternative correnti;
- navigazione avviabile solo dopo selezione;
- recalculation vincolata a sessione e route attive;
- terminal states non riapribili;
- candidati copiati e congelati;
- riselezione della stessa route deterministica/idempotente;
- scelta preferita deterministica con fallback.

### `frontend/scripts/check-navigation-domain.mjs`
Checker riproducibile che transpila il dominio TypeScript e verifica lifecycle nominale, invalid transitions, candidate mismatch, selection, idempotency, recalculation, cancel, failure, terminal-state guard e assenza di riferimenti a provider mappe noti.

### `.github/workflows/navigation-domain.yml`
CI dedicata e non distruttiva:
`npm ci -> Expo Doctor -> lint -> navigation-domain checker`.

## VERIFY reale
Workflow: `Navigation Domain` run #1, ID `32530696140`.
SHA verificato dal workflow: `7217c6c2c0cbfa910307b10b509d6b2f940e41d5`.
Risultato complessivo: **SUCCESS**.

Il workflow include esplicitamente:
- installazione deterministica via `npm ci`;
- `npx expo-doctor`;
- `npm run lint`;
- `node scripts/check-navigation-domain.mjs`.

## Conceptual master
Nessuna voce V06/V21/V26/V27/V28 viene marcata `[x]`: il domain core crea soltanto le fondamenta contrattuali. Non esistono ancora provider reale, navigazione utente end-to-end, alternative live o route explanation reale. Il documento canonico resta quindi conservativamente invariato in questa PR.

## File funzionali/infrastrutturali
- `frontend/src/navigation/domain.ts` — nuovo.
- `frontend/scripts/check-navigation-domain.mjs` — nuovo.
- `.github/workflows/navigation-domain.yml` — nuovo.

## File di reporting
- `docs/codex-reports/2026-08-22_000500_navigation-domain-core.md` — nuovo.
- `docs/codex-reports/LATEST.md` — aggiornato.
- `Fabio/FABIO_CONTROLLO.md` — aggiornato.

## Non modificato intenzionalmente
- provider mappe/routing reali;
- UI/map surface;
- saved places;
- voice core;
- `frontend/app.json`;
- `frontend/eas.json`;
- workflow TestFlight e Android readiness;
- package/lockfile;
- credenziali.

## Limiti / non dichiarato
- Nessun routing reale è stato eseguito.
- Nessuna posizione GPS reale è stata acquisita.
- Nessun provider è stato scelto.
- Nessuna voce V06/V21/V26/V27/V28 è dichiarata completata.
- Nessun merge è autorizzato prima del verdetto CLEAN di NEXO REVIEW.

## Stato
Implementazione pronta per VERIFY finale sul nuovo HEAD e review indipendente NEXO REVIEW. PR #19 deve restare DRAFT.