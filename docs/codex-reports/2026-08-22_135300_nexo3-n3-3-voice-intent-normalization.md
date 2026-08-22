# NEXO 3 — N3.3 Voice Intent Normalization

## Dati attività
- Data e ora UTC: 2026-08-22 13:53 UTC.
- Task: N3.3 — VOICE INTENT NORMALIZATION.
- Obiettivo: rendere deterministica e testabile la normalizzazione degli input Voice, con semantica esplicita unknown/confidence, ambiguità conservativa e divieto di inventare destinazioni.
- Stato al momento di questo rapporto: completamento lato autore in corso; implementation/conceptual verificati su SHA `3b22a1e33e9c95817d88e7d7892e6028a1b5c1f5`, reporting finale ancora da committare.
- Branch: `nexo3/n3-3-voice-intent-normalization`.
- Pull request: PR #25, DRAFT.
- Base: `main` merge PR #17 `1d0a01c91bb328baf141560a534f4b62fe406b01`.

## READ realmente eseguito
- `AGENTS.md` su main.
- Issue #11 e commenti recenti: NEXO REVIEW R4RR PR #17 CLEAN sull'exact SHA `8f82b692...`, poi PR #17 verificata realmente merged.
- `coordination/agents/README.md`, `coordination/agents/NEXO_3.md`, `coordination/reports/NEXO_3_REPORT.md` su `coordination/agent-control`.
- PR #17: CLOSED/MERGED, merge commit `1d0a01c91bb328baf141560a534f4b62fe406b01`.
- `frontend/src/voice/command-core.ts`, checker Voice e registro concettuale sulla main risultante.

## PLAN applicato
1. Creare un branch dedicato dalla main dopo merge PR #17.
2. Modificare soltanto il core Voice e il checker per N3.3.
3. Mantenere navigation start fail-closed e destination-ID-only.
4. Aggiornare V02/V03/V34 conservativamente, mantenendo `[ ] / parziale`.
5. Aprire PR DRAFT e usare la workflow Voice esistente per TypeScript/checker/conceptual validator.
6. Correggere eventuali errori emersi realmente dalla run, senza espandere scope.
7. Completare reporting/LATEST/Fabio, verificare HEAD finale e fare handoff a NEXO REVIEW.

## WRITE realmente eseguito
### `frontend/src/voice/command-core.ts`
- Esportata `normalizeVoiceInput` deterministica: Unicode NFKC, trim, lowercase `it-IT`, collapse whitespace.
- Aggiunta normalizzazione separata per control intent con rimozione esclusiva della punteggiatura terminale `. ! ?`; la grammatica destinazione non viene allargata.
- Confidence resa esplicita e binaria nel layer deterministico corrente: `1` per intent riconosciuto esatto, `0` per `unknown`.
- Raw input preservato per gli unknown.
- Aggiunto rilevamento conservativo di segnali di controllo contrastanti (`ambiguous`).
- Dopo una prima run fallita su `sì no`, corretto il rilevamento dei token accentati evitando `\b` JavaScript, che non tratta `ì` come word character ASCII.
- Nessuna destinazione libera viene risolta: `navigation.start` richiede ancora `naviga a id:<destinationId>` con ID già risolto.

### `frontend/scripts/check-voice-command-core.mjs`
Aggiunti casi reali per:
- Unicode full-width (`ＯＫ`);
- whitespace/case normalization;
- punteggiatura terminale sui control intent;
- ambiguità (`sì no`, `annulla conferma`, `va bene no`, `conferma ma no`);
- reason esatta per ogni unknown;
- confidence `1` recognized / `0` unknown;
- raw input preservation;
- rifiuto free text `portami a Roma` senza destinazione inventata;
- regressione invarianti envelope/Command Bus già esistenti.

### `docs/product/NEXO_CONCEPTUAL_MASTER.md`
V02/V03/V34 restano `[ ] / parziale`; aggiunta evidenza PR #25 e commit N3.3, senza dichiarare STT/TTS/microfono/wake-word/provider/native automotive runtime.

## Commit pertinenti
- `f6f0c938abfa1a18151adef48087fa8ba5d9b8ff` — prima implementazione normalization.
- `b3ec02e82c59cf23eb237c58c8631c2d5e084b4d` — edge-case checker.
- `684f71ccbc27015cf8346705fd0dfb363ddc8e16` — fix deterministico per token accentati/ambiguità.
- `3b22a1e33e9c95817d88e7d7892e6028a1b5c1f5` — evidenza concettuale N3.3.

## Test/check realmente eseguiti
### Run iniziale fallita — evidenza conservata
GitHub Actions `NEXO 3 Voice Validation` run `32576736422`, job `97040062658` sullo stato precedente alla correzione:
- Checkout: SUCCESS.
- Setup Node: SUCCESS.
- `npm ci`: SUCCESS, con 12 vulnerabilità npm riportate (1 moderate, 11 high), non introdotte né corrette in questo task.
- Voice checker: FAILURE.
- Errore reale: per input `sì no`, actual reason `unsupported`, expected `ambiguous`.
- Conceptual validator: SKIPPED per fallimento precedente.
Questa run NON viene dichiarata PASS.

### Run dopo correzione + conceptual update
Exact SHA validato: `3b22a1e33e9c95817d88e7d7892e6028a1b5c1f5`.
GitHub Actions `NEXO 3 Voice Validation` run `32576880341`, job `97040401580`: SUCCESS.
- Checkout exact branch content: SUCCESS.
- Setup Node: SUCCESS.
- Install frontend dependencies (`npm ci`): SUCCESS.
- Voice checker (`node scripts/check-voice-command-core.mjs`): SUCCESS.
- Il checker compila `command-core.ts` con TypeScript `--strict`: SUCCESS.
- Conceptual master validator (`python3 scripts/check_conceptual_master.py .`): SUCCESS.

## Verificato realmente
- PR #25 DRAFT e mergeable prima del reporting finale.
- Base PR: main con merge PR #17.
- Normalizzazione e ambiguità sono provider-neutral.
- Nessuna destinazione viene inventata da free text.
- Nessun STT/TTS/microfono/wake-word/provider mappe/navigation runtime/CarPlay/Android Auto/EAS/TestFlight/credenziale è stato introdotto o toccato.

## Non verificato / limiti
- Nessun test su device reale.
- Nessuna acquisizione audio/STT/TTS.
- Nessuna NLU conversazionale completa.
- Nessun adapter automotive o provider mappe.
- I commit di reporting successivi a questo rapporto sono documentali; una fresh `NEXO 3 Voice Validation` sull'HEAD post-reporting viene comunque osservata nel Control Plane/handoff prima della consegna finale.

## Errori e warning
- Prima run: failure reale sull'ambiguità accentata, poi corretta.
- `npm ci` ha riportato 12 vulnerabilità già presenti (1 moderate, 11 high); nessun `npm audit fix` eseguito perché fuori perimetro.
- Runtime container della chat non risolve `github.com`; le prove conclusive usano GitHub Actions.

## Problemi residui
- Serve completare `LATEST.md` e `Fabio/FABIO_CONTROLLO.md`.
- Serve verificare la run exact-head post-reporting e poi consegnare PR #25 a NEXO REVIEW.
- NEXO 3 non dichiara CLEAN autonomamente.

## Dipendenze / credenziali
Nessuna credenziale richiesta o modificata. Apple/EAS/TestFlight restano fuori perimetro.

## Rischi tecnici
- Il parser resta intenzionalmente deterministico, non NLU completa.
- La tolleranza alla punteggiatura è limitata ai control intent; non deve allargare la grammatica delle destinazioni.
- Confidence `1/0` descrive la certezza del matcher deterministico corrente, non una probabilità STT/NLU futura.

## Decisioni richieste a Fabio
Nessuna.

## Prossimo passo
Aggiornare `LATEST.md` con questo rapporto completo, riallineare il cruscotto Fabio, osservare la validation sull'HEAD post-reporting e fare handoff a NEXO REVIEW. N3.4 non deve iniziare prima del completamento/reviewability di N3.3 secondo il Control Plane.
