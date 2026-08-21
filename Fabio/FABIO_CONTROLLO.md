# Fabio Controllo

> Cruscotto di sola consultazione. Il rapporto tecnico completo è in
> `docs/codex-reports/LATEST.md`.

## Stato semplice

- **Data:** 21 agosto 2026, 06:49 UTC
- **Attività:** aggiunta concettuale di Casa, Lavoro e luoghi salvati.
- **Stato:** specifica completata su ramo separato; non è ancora implementata nell'app.
- **Ramo:** `codex/luoghi-salvati-concetto`
- **Pull request:** da creare.
- **Priorità principale invariata:** prima build visibile su TestFlight tramite PR #9.
- **Costi:** nessuna spesa.

## Cosa è stato aggiunto realmente

- Casa e Lavoro opzionali, rinominabili e con icone rapide dedicate.
- Altri luoghi salvati con nome, icona, ordine, modifica ed eliminazione.
- Accesso rapido da mappa, ricerca, menu e voce.
- Suggerimenti contestuali basati su posizione, orario e abitudini soltanto con consenso.
- Nessuna navigazione avviata automaticamente: serve sempre conferma.
- Gestione completa fuori guida e scorciatoie essenziali Voice-First durante la guida.
- Prima versione pianificata nella Fase 1.

## Controlli

### Superati
- Letti direttamente Vision, UX/UI, Roadmap ed espansione concettuale.
- Confermato che il requisito non era ancora definito con questa completezza.
- Aggiornati i tre documenti sul ramo dedicato.

### Non eseguiti
- UI, database, geocoding, suggerimenti runtime, lint, build e TestFlight: attività soltanto concettuale.
- Codex Review: da richiedere dopo la creazione della PR.

## Problemi e rischi

- I luoghi e le abitudini sono dati personali: dovranno essere opzionali, cancellabili e preferibilmente elaborati localmente.
- Provider, database e schema tecnico non sono ancora scelti.
- La funzione non deve distrarre durante la guida né anticipare una destinazione senza conferma.

## Cosa deve fare Fabio adesso

Nulla. La specifica verrà proposta in una PR documentale separata. Il lavoro sulla PR #9 verso TestFlight continua indipendentemente.
