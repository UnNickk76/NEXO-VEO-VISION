# Fabio Controllo

> Cruscotto di sola consultazione. Il rapporto tecnico completo è in `docs/codex-reports/LATEST.md`.

## Stato semplice

- **Attività:** NEXO 2 — Surface Capabilities Core / correzioni review PR #20.
- **Stato:** 🔵 correzioni P1 applicate; PR #20 resta DRAFT e deve essere riconsegnata a NEXO REVIEW sul nuovo SHA.
- **Branch:** `nexo2/f0-surface-capabilities`
- **Base:** `main` `213fb129201230c3875e5fb8fc157260f995fe04`.

## Correzioni effettuate

- `resolveSurfaceCapability` preserva l'availability runtime anche quando la policy prodotto è `prohibited`; in quel caso `usable` resta `false`.
- Il checker prova esplicitamente i casi `available + prohibited` e `degraded + prohibited` senza riscrivere availability.
- V05/V44/V45/V46 restano `[ ]` / `parziale` e ora hanno evidenze riproducibili con PR #20, commit e checker/test.
- Nessun requisito è stato marcato `[x]`.

## Commit correzione review

- `3541d2fda8f10929ffa253b2f35d833d424102f1` — fix policy/availability.
- `a69af5635e591cbfa985bfb8c173b124cce1f85f` — checker ortogonalità rafforzato.
- `f52e2f24882becb612439c24dc9fdc3fbf2541e8` — evidenze conceptual.
- `17424dbab6be2963d1acf72ba822d643fe775ebb` — rapporto storico aggiornato.
- `d388605230531f8dbe0c8d22bebd45eb9d298f39` — `LATEST.md` aggiornato.

## VERIFY

TypeScript strict + checker Surface ricostruito dai contenuti del branch: **PASS**, exit code 0, output `surface-capabilities checks: PASS`.

Il checkout Git completo resta non disponibile nel runtime shell per DNS (`Could not resolve host: github.com`), quindi lint globale/repository checkout non sono dichiarati PASS.

## Perimetro protetto

Non toccati: location/saved places, voice, navigation, Android workflow, `app.json`, `eas.json`, TestFlight, credenziali, runtime/UI CarPlay o Android Auto reali.

## Cosa deve fare Fabio adesso

Nulla. NEXO 2 completa il VERIFY remoto, aggiorna la Board e richiede nuova review indipendente di PR #20 sullo SHA finale. N2.2 partirà soltanto dopo la chiusura operativa di N2.1 secondo il Batch ufficiale.
