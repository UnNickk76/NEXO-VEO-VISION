# Fabio Controllo

> Cruscotto di sola consultazione. Il rapporto tecnico completo è in
> `docs/codex-reports/LATEST.md`.

## Stato semplice

- **Data e ora UTC:** 22 agosto 2026, 00:06 UTC
- **Attività:** F0/F1 — Navigation Domain Core provider-neutral.
- **Stato:** PR #19 DRAFT; core implementato e verificato, ma le funzioni V06/V21/V26/V27/V28 restano correttamente `parziale` e attendono nuova review NEXO REVIEW.
- **Branch:** `nexo-codex/f0-navigation-domain-core`
- **Pull request:** PR #19
- **Base:** `main` `213fb129201230c3875e5fb8fc157260f995fe04`
- **SHA del VERIFY funzionale/conceptual finale:** `30200968757d9c1e28e9040317f32d3157a9757d`

## Cosa è stato modificato realmente

- `frontend/src/navigation/domain.ts`: nuovo core navigazione provider-neutral.
- `frontend/scripts/check-navigation-domain.mjs`: checker deterministico.
- `.github/workflows/navigation-domain.yml`: CI dedicata al domain core.
- `docs/product/NEXO_CONCEPTUAL_MASTER.md`: V06/V21/V26/V27/V28 aggiornati a `parziale`, mantenendo `[ ]` e senza fingere routing reale.
- Reporting tecnico aggiornato secondo `AGENTS.md`.
- Nessuna modifica a iOS/EAS/TestFlight, Android readiness, package/lock, provider mappe reali o credenziali.

## Test realmente eseguiti

Navigation Domain run #7 — ID `32539167286`, job `96945567260`, SHA `30200968757d9c1e28e9040317f32d3157a9757d`: **SUCCESS**.

- `npm ci`: PASS.
- `npx expo-doctor`: PASS — 18/18 checks.
- `npm run lint`: PASS — 0 errori, 1 warning preesistente (`Text` inutilizzato in `frontend/app/index.tsx`).
- `node scripts/check-navigation-domain.mjs`: PASS — `navigation-domain checks: PASS`.

## Warning e limiti

- `npm ci` segnala 15 vulnerabilità preesistenti: 1 moderate, 14 high; package e lock non sono stati modificati in questa attività.
- GitHub Actions segnala deprecazioni Node.js 20 per alcune actions; non bloccanti nella run #7.
- Non esistono ancora provider routing reale, GPS reale, mappa collegata, Alternative Live reale, Route Explanation reale o ricalcolo continuo runtime.
- PR #19 deve restare DRAFT fino a verdetto CLEAN e decisione del Coordinatore.

## Review ancora aperta

NEXO REVIEW aveva dichiarato NON CLEAN sul vecchio SHA `aee16726372f58208630f387481c517396695426` esclusivamente per due P1 di governance/evidenza. Entrambi sono stati corretti: conceptual master aggiornato e reporting riallineato alla run finale reale.

## Cosa deve fare Fabio adesso

Nulla durante la nuova review. NEXO CODEX riconsegna PR #19 a NEXO REVIEW sul nuovo SHA finale. Nessun merge automatico e nessuna scelta provider mappe è richiesta ora.
