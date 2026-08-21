Rapporto storico: `docs/codex-reports/2026-08-22_000500_navigation-domain-core.md`

# NEXO CODEX — F0/F1 Navigation Domain Core

- Branch: `nexo-codex/f0-navigation-domain-core`
- PR: #19 (DRAFT)
- Base: `main` `213fb129201230c3875e5fb8fc157260f995fe04`
- Incarico: Coordination Board #11, commento 5375694268.
- Dominio: provider-neutral; nessun provider mappe/routing scelto o integrato.

## Implementato
- `frontend/src/navigation/domain.ts`: contratti `DestinationRef`, `LocationSample`, `RouteRequest`, `RouteCandidate`, `RecalculationRequest`, `RoutingAdapter`, eventi/sessione e state machine.
- Stati: `idle`, `planning`, `ready`, `navigating`, `recalculating`, `completed`, `cancelled`, `failed`.
- Guardie per transizioni illegali, candidate/request mismatch, selezione, start, recalculation e terminal states.
- `frontend/scripts/check-navigation-domain.mjs`: checker deterministico.
- `.github/workflows/navigation-domain.yml`: `npm ci -> Expo Doctor -> lint -> checker`.

## VERIFY
Navigation Domain run #1 — ID `32530696140` — **SUCCESS** sullo SHA `7217c6c2c0cbfa910307b10b509d6b2f940e41d5`.

## Stato concettuale
V06/V21/V26/V27/V28 restano non completate: questa PR crea le fondamenta contrattuali ma non integra routing reale, alternative live o route explanation reale.

## Vincoli rispettati
PR #18 lasciata intatta; nessuna dipendenza da PR #12/#17 non mergeate; nessuna modifica a provider reali, UI, iOS/EAS, Android readiness, package/lockfile o credenziali.

## Prossimo passo
VERIFY finale sul nuovo HEAD e review indipendente NEXO REVIEW. Merge vietato fino a CLEAN.