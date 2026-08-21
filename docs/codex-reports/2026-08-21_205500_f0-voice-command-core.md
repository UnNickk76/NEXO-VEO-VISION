# NEXO 3 — nucleo Voice Intent → Command

- Data e ora UTC: 2026-08-21 20:55 UTC
- Obiettivo: implementare un nucleo provider-neutral Voice Intent → Command → Command Bus per V02, V03 e V34, senza STT/microfono, provider, navigazione reale o API automotive.
- Stato finale: parziale
- Ramo: `nexo3/f0-voice-command-core`
- Commit creati prima di questo report: `9d42eec90b3c94e103a151cbb49a8f4263bca6ab`, `26edb26edfb262aba83fe110476081417c8608d4`
- Pull request: da creare dopo il reporting minimo possibile.

## Verificato realmente

- `AGENTS.md` e Coordination Board #11 letti prima della scrittura.
- Main verificata a `213fb129201230c3875e5fb8fc157260f995fe04`.
- PR #12 verificata come unica PR aperta e proprietaria del core saved-places e dei file di reporting condivisi.
- ADR F0 verificata: dipendenza canonica `Surface → Voice Intent → Command → Command Bus → dominio/use case → Provider Adapter`; Voice Intent non esegue azioni e Command Bus impedisce accesso diretto ai provider.
- Creato `frontend/src/voice/command-core.ts`: intenti deterministici minimi, conversione in Command, envelope e Command Bus con fallback `unhandled`.
- Il comando di navigazione accetta soltanto un destination ID già risolto; il core non geocodifica né inventa destinazioni.
- Creato `frontend/scripts/check-voice-command-core.mjs` come checker riproducibile senza nuove dipendenze.

## Comandi realmente eseguiti

Tentativo di materializzare il repository per eseguire checker e TypeScript:

`git clone -q https://github.com/UnNickk76/NEXO-VEO-VISION.git /tmp/nexo3`

Esito: exit 128 — ambiente container senza risoluzione DNS/rete verso GitHub (`Could not resolve host: github.com`). I comandi successivi concatenati (`node frontend/scripts/check-voice-command-core.mjs` e `npx tsc --noEmit`) NON sono stati eseguiti e NON vengono dichiarati PASS.

## Test/check

- Checker deterministico: NON ESEGUITO per impossibilità di materializzare il repository nel runtime shell.
- TypeScript strict: NON ESEGUITO per la stessa causa.
- Review statica tramite lettura dei file GitHub: eseguita durante la costruzione; non sostituisce TypeScript/checker.
- Nessun test device: fuori perimetro, nessun runtime voce/automotive implementato.

## File creati/modificati

- `frontend/src/voice/command-core.ts` — creato.
- `frontend/scripts/check-voice-command-core.mjs` — creato.
- questo rapporto storico — creato.

## Limiti e problemi non risolti

- `docs/product/NEXO_CONCEPTUAL_MASTER.md` deve essere aggiornato conservativamente portando V02/V03/V34 a `parziale`, mantenendo `[ ]`, ma non viene ancora modificato finché non è possibile completare il gate di reporting senza interferire con PR #12.
- `docs/codex-reports/LATEST.md` e `Fabio/FABIO_CONTROLLO.md` sono file di reporting obbligatori ma sono contemporaneamente modificati/riservati dalla PR #12 di NEXO 1. Per Zero-Rework NEXO 3 non li sovrascrive in questa fase.
- Nessun provider, Siri/Google Assistant, CarPlay/Android Auto runtime, navigazione reale o credenziale è stato introdotto.

## Rischi tecnici

Il parser è volutamente minimale e deterministico. Non è STT/NLU completo e non va presentato come navigazione conversazionale completata. La semantica di autorizzazione/safety del Command Bus dovrà crescere con i use case reali.

## Prossimo passo consigliato

Aprire PR DRAFT atomica per rendere visibile il lavoro; mantenere stato parziale/bloccato finché i test non sono realmente eseguibili e finché i file di reporting condivisi con PR #12 non possono essere aggiornati senza sovrapposizione. Solo dopo tali gate aggiornare il registro V02/V03/V34 e richiedere review indipendente.
