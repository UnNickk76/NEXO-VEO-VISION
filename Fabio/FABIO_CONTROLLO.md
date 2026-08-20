# Fabio Controllo

> Cruscotto di sola consultazione per Fabio. Il rapporto tecnico completo resta in
> `docs/codex-reports/LATEST.md`.

## Ultimo aggiornamento

- **Data e ora UTC:** 2026-08-20 22:17:30 UTC
- **Attività:** correzione documentale successiva alla PR #7 e creazione del cruscotto permanente.
- **Stato:** in preparazione su ramo dedicato.
- **Ramo:** `codex/fabio-controllo-e-correzione-pr7`
- **Pull request:** non ancora disponibile al momento di questo aggiornamento.

## Cosa è stato fatto realmente

- Verificato su `main` che la PR #7 è stata unita.
- Verificato che la correzione locale preparata da Codex non era inclusa nel merge.
- Conservato il rapporto storico già unito, perché i rapporti storici non possono essere sovrascritti.
- Preparato un nuovo rapporto correttivo con l'evidenza completa e riproducibile.
- Aggiunta in `AGENTS.md` la regola che obbliga Codex ad aggiornare questo cruscotto dopo ogni attività.

## Controlli

- **Superato:** lettura diretta dello stato della PR #7 e del contenuto su `main` tramite integrazione GitHub.
- **Superato:** individuazione nel rapporto unito dei segnaposto `$endpoint`, `jq ...` e `{5,6}`.
- **Non eseguito:** test runtime dell'app; questa attività modifica soltanto documentazione.
- **Da verificare:** nuova Codex Review sul commit finale della pull request correttiva.

## Problemi ancora aperti

- I vecchi thread della PR #7 risultano formalmente irrisolti, ma la PR è già chiusa e unita.
- La nuova pull request deve ricevere una review pulita prima del merge.
- L'auto-merge resta disabilitato: il merge deve essere richiesto esplicitamente da Fabio.

## Prossimo passo per Fabio

Attendere la nuova review. Non unire la pull request finché questo file non indica
che la review sul commit corrente è pulita.
