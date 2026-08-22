# Fabio Controllo

> Cruscotto di sola consultazione. Il rapporto tecnico completo è in
> `docs/codex-reports/LATEST.md`.

## NEXO 3 — N3.3 Voice Intent Normalization
- **Data:** 22 agosto 2026, 13:53 UTC.
- **Task:** N3.3 — normalizzazione deterministica degli intent Voice.
- **Stato:** implementazione e conceptual verificati; PR #25 resta DRAFT e viene preparata per NEXO REVIEW. NEXO 3 non dichiara CLEAN.
- **Branch:** `nexo3/n3-3-voice-intent-normalization`.
- **Pull request:** PR #25.
- **Base:** main dopo merge CLEAN della PR #17.

## Cosa è stato fatto realmente
- Normalizzazione Unicode NFKC, spazi, maiuscole/minuscole resa esplicita e testabile.
- Punteggiatura terminale tollerata solo per control intent, senza allargare la grammatica delle destinazioni.
- Segnali di controllo contrastanti vengono classificati `ambiguous`.
- Confidence deterministica: `1` per intent riconosciuto esatto, `0` per unknown.
- Raw input preservato sugli unknown.
- Free text come `portami a Roma` non produce una destinazione inventata.
- V02/V03/V34 restano `[ ] / parziale`; nessuna funzione Voice completa viene dichiarata implementata.

## Controlli reali
Prima run `32576736422`: **FAILURE** sul caso `sì no` (unsupported invece di ambiguous); il difetto è stato corretto.

Dopo correzione + conceptual, exact SHA `3b22a1e33e9c95817d88e7d7892e6028a1b5c1f5`:
- `NEXO 3 Voice Validation` run `32576880341`, job `97040401580`: **SUCCESS**.
- `npm ci`: SUCCESS.
- Voice checker: SUCCESS.
- TypeScript strict: SUCCESS, eseguito dal checker.
- Conceptual master validator: SUCCESS.

La validation sull'HEAD finale post-reporting viene osservata nel Control Plane/handoff prima della consegna a REVIEW.

## Limiti dichiarati
- Nessun STT/TTS/microfono/wake-word runtime.
- Nessuna NLU conversazionale completa.
- Nessun provider mappe o navigazione reale.
- Nessun runtime CarPlay/Android Auto.
- Nessun TestFlight/EAS o credenziale Apple/EAS toccati.

## Prossimo passo
Verifica exact-head post-reporting e handoff di PR #25 a NEXO REVIEW. N3.4 resta congelato finché N3.3 non è completato/reviewable secondo il Control Plane.

## Cosa deve fare Fabio adesso
Nulla.
