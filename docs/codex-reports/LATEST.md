Rapporto storico: `docs/codex-reports/2026-08-21_064924_luoghi-salvati-concetto.md`

# Aggiunta concettuale di Casa, Lavoro e luoghi salvati

## Dati dell'attività

- **Data e ora UTC:** 2026-08-21 06:49:24 UTC
- **Obiettivo richiesto:** verificare il quadro concettuale di NEXO VEO VISION e aggiungere Casa, Lavoro e luoghi salvati con accesso rapido e suggerimenti contestuali.
- **Stato finale:** completato sul ramo, in attesa di pull request e Codex Review.
- **Ramo utilizzato:** `codex/luoghi-salvati-concetto`
- **Commit creati:** `8cfb0cfc29c925d95ea2b328da52c9f4c8141e3b`, `119f6ef2f78a41e73968cbe56eb2568ef721599a`, `0e64d5a60b57ed472e9df913ba557c3c1210fff9`; il commit contenente questo rapporto non era disponibile durante la redazione.
- **Pull request:** non ancora disponibile durante la redazione.
- **Implementazione runtime:** nessuna; questa attività modifica soltanto la specifica.

## File creati o modificati

### Creato
- `docs/codex-reports/2026-08-21_064924_luoghi-salvati-concetto.md`

### Modificati
- `memory/NEXO_VEO_VISION.md`
- `NEXO_VEO_VISION_UX_UI.txt`
- `NEXO_VEO_VISION_ROADMAP.txt`
- `docs/codex-reports/LATEST.md`
- `Fabio/FABIO_CONTROLLO.md`

## Modifiche concrete

- La Vision definisce Casa e Lavoro come scorciatoie opzionali, rinominabili e dotate di icone dedicate.
- Sono previsti preferiti ulteriori con nome, icona, ordine, modifica ed eliminazione.
- L'accesso è previsto da mappa, ricerca, menu rapido e voce.
- I suggerimenti contestuali possono usare posizione, orario, Journey e abitudini soltanto con consenso.
- Nessun suggerimento avvia autonomamente la navigazione: serve sempre conferma.
- La UX distingue gestione completa fuori guida e scorciatoie essenziali Voice-First durante la guida.
- La Roadmap colloca una prima versione nella Fase 1, senza dichiararla implementata.

## Operazioni realmente eseguite

| Operazione esatta | Esito | Risultato |
| --- | --- | --- |
| `github_fetch_file(repository_full_name="UnNickk76/NEXO-VEO-VISION", path="AGENTS.md", ref="codex/testflight-first-visible-build", encoding="utf-8")` | Superato | Istruzioni permanenti lette. |
| `github_fetch_file(..., path="memory/NEXO_VEO_VISION.md", ref="main", encoding="utf-8")` | Superato | Visione principale individuata. |
| `github_fetch_file(..., path="NEXO_VEO_VISION_UX_UI.txt", ref="main", encoding="utf-8")` | Superato | Fondamento UX/UI individuato. |
| `github_fetch_file(..., path="NEXO_VEO_VISION_ROADMAP.txt", ref="main", encoding="utf-8")` | Superato | Roadmap individuata. |
| `github_fetch_file(..., path="NEXO_VEO_VISION_EXPANSION_47.txt", ref="codex/testflight-first-visible-build", encoding="utf-8")` | Superato | Espansione concettuale verificata; il requisito specifico non era definito. |
| `github_create_branch(repository_full_name="UnNickk76/NEXO-VEO-VISION", branch_name="codex/luoghi-salvati-concetto", sha="c5f464d4e943215e4ab89ee28f2993a9f63a61ed")` | Superato | Ramo separato creato da `main`. |
| Tre invocazioni `github_update_file` sui file Vision, UX/UI e Roadmap, con SHA blob letti e contenuto UTF-8 completo | Superato | Commit elencati sopra creati in sequenza. |

## Controlli realmente eseguiti

| Controllo | Esito | Limite |
| --- | --- | --- |
| Ricerca concettuale tramite `github_search` con query `casa lavoro luoghi salvati preferiti destinazioni concetto visione prodotto` | Nessun risultato | L'indice non ha restituito occorrenze; sono stati quindi letti direttamente i documenti canonici. |
| Lettura diretta dei quattro documenti concettuali principali | Superato | Il requisito specifico Casa/Lavoro e gestione luoghi salvati non risultava definito. |
| Verifica delle sostituzioni tramite confronto esatto delle sezioni sorgente prima di ogni `github_update_file` | Superato | Ogni trasformazione ha prodotto contenuto diverso; in caso contrario l'operazione avrebbe fallito. |
| Test runtime, lint, build e TestFlight | Non eseguiti | Non applicabili a una modifica esclusivamente concettuale. |

## Verificato realmente

- Il quadro concettuale esiste ed è distribuito tra Vision, UX/UI, Roadmap, espansione e ADR.
- Il requisito dei luoghi salvati non era descritto con questa completezza.
- Le tre specifiche sono state aggiornate sul ramo dedicato.

## Dedotto

- Casa e Lavoro sono casi speciali del dominio dei luoghi salvati, non entità separate dal modello generale.
- La persistenza futura dovrà essere provider-agnostica e rispettare privacy e consenso; tecnologia e schema non sono decisi qui.

## Non verificato

- UI reale, database, geocoding, suggerimenti e apprendimento: non implementati.
- Esito della Codex Review: non ancora richiesto al momento della redazione.

## Errori, warning e rischi

- Il quadro concettuale non è ancora un documento unico; modifiche future devono mantenere coerenza fra le fonti.
- I suggerimenti basati su abitudini possono diventare invasivi o rivelare dati sensibili se non sono opzionali e controllabili.
- La precisione degli indirizzi dipenderà dal provider di geocoding futuro.

## Prossimo passo consigliato

Aprire una pull request documentale separata, richiedere Codex Review e unirla soltanto dopo una review pulita. La priorità runtime resta la prima build TestFlight della PR #9.

## Decisioni richieste a Fabio

Nessuna per registrare il requisito. In futuro servirà approvare il comportamento visivo definitivo e il livello di personalizzazione consentito.
