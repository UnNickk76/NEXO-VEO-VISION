# Fabio Controllo

> Cruscotto di sola consultazione. Il rapporto tecnico completo è in
> `docs/codex-reports/LATEST.md`.

## Stato semplice
- **Data:** 22 agosto 2026, 04:28 UTC
- **Attività:** NEXO 1 — N1.4 Location Permission / Degraded State Machine.
- **Stato:** state machine Location provider-neutral implementata e verificata; PR #23 resta DRAFT e viene consegnata a NEXO REVIEW. Nessun GPS/provider runtime viene dichiarato implementato.
- **Branch:** `nexo1/f1-location-permission-state-machine`
- **Pull request:** PR #23
- **Base:** `main` `8d8dee4a31416acb38c2e654082ca15efafd6fec`
- **SHA funzionale/conceptual verificato:** `f9c53e40732dce009379a67fd899cfd7679865a7`

## Cosa è stato fatto realmente
- Aggiunta una state machine per gli stati `denied`, `restricted`, `unavailable`, `degraded`, `stale` ed `error`.
- Solo `permission=granted + status=ready + fix valido` è considerato utilizzabile.
- Fix ricevuti senza permission granted vengono ignorati.
- `denied`, `restricted`, `unavailable` ed errori provider non espongono coordinate.
- `degraded` e `stale` possono conservare soltanto un ultimo fix reale, ma non viene considerato utilizzabile.
- Un fix invalido porta a `error` e non genera fallback.
- Creato checker deterministico e workflow dedicato.
- C007 resta `[ ] / parziale`; è stata aggiunta evidenza PR #23 senza dichiarare GPS reale.

## Controlli reali
GitHub Actions — Location State Machine run #2 `32551730907`, job `96979479985`: **SUCCESS**.
GitHub Actions — Location Contract run #8 `32551730913`: **SUCCESS**.

- `npm ci`: PASS; audit segnala 15 vulnerabilità già presenti (1 moderate, 14 high).
- `npx expo-doctor`: **18/18 PASS**.
- `npm run lint`: PASS con 0 errori / 1 warning preesistente in `frontend/app/index.tsx` (`Text` non usato).
- TypeScript strict compile contract + state machine: PASS.
- checker: `location-state-machine checks: PASS`.
- validator concettuale: PASS, incluso `PASS C: exact stable ID set (7 rows)` e `PASS: conceptual master registry is coherent`.

## Limiti dichiarati
- Nessun test su device reale.
- Nessuna permission OS realmente richiesta.
- Nessun GPS/provider location OS collegato.
- Nessuna soglia quantitativa freshness/accuracy: prevista in N1.5.
- Nessun adapter iOS/Android: previsto in N1.6.
- Nessun EAS/TestFlight o credenziale Apple/EAS toccati.

## Prossimo passo
NEXO REVIEW deve revisionare l'exact SHA finale della PR #23 dopo il reporting. NEXO 1 congela la PR durante la review e non avvia N1.5 sullo stesso branch.

## Cosa deve fare Fabio adesso
Nulla.

## NEXO 3 — PR #17 Voice core — 2026-08-22 09:58 UTC
- Stato: consegna autore in preparazione per NEXO REVIEW; PR #17 resta DRAFT.
- Main incorporata: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
- Modifiche: Voice Intent → Command core provider-neutral + checker; V02/V03/V34 `[ ] / parziale`.
- Verifica: GitHub Actions `NEXO 3 Voice Validation` esegue Voice checker/TypeScript strict e conceptual validator sul checkout completo.
- Limiti: nessun STT/TTS/microfono/wake-word runtime, provider o automotive runtime.
- Prossimo passo per Fabio: nessuna azione; attesa NEXO REVIEW/Coordinatore.
