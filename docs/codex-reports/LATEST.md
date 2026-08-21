Rapporto storico: `docs/codex-reports/2026-08-21_071443_correzione-controlli-concettuali.md`

# Correzione dei controlli permanenti del quadro concettuale

## Dati dell'attività

- **Data e ora UTC:** 2026-08-21 07:14:43 UTC
- **Obiettivo:** verificare la nuova Codex Review della PR #10 e correggere i rilievi reali prima del merge.
- **Stato finale:** completato sul ramo; nuova review ancora da richiedere.
- **Ramo:** `codex/luoghi-salvati-concetto`
- **Pull request:** [PR #10](https://github.com/UnNickk76/NEXO-VEO-VISION/pull/10)
- **SHA revisionato da Codex:** `1566537ac6c71559efd9fd8207c8002d873bd5be`
- **Commit creati prima di questo rapporto:** `d7a78835d7fde68a395f4a5d590eb35f92c6278f`, `ebe0b2b2dd640319a3367169b105a34ea06ff516`
- **Costi:** nessuna spesa.

## File modificati

- `scripts/check_conceptual_master.py`
- `Fabio/FABIO_CONTROLLO.md`
- `docs/codex-reports/LATEST.md`

## File creato

- `docs/codex-reports/2026-08-21_071443_correzione-controlli-concettuali.md`

## Rilievi della review

1. **P1 — spunte:** lo script rifiutava ogni `[x]`, anche quando accompagnato da implementazione ed evidenze valide.
2. **P1 — ID:** lo script verificava soltanto quantità e unicità, quindi una rinumerazione poteva sostituire una voce senza cambiare il conteggio.

## Modifiche concrete

- Gli ID vengono confrontati con gli insiemi esatti `V01–V51`, `E01–E47`, `U01–U31` e `C001–C006`.
- Una riga `[x]` è accettata soltanto se:
  - lo stato è `implementata`;
  - l'evidenza non è vuota;
  - contiene un riferimento `PR #numero`;
  - contiene uno SHA Git valido da 7 a 40 caratteri;
  - contiene un riferimento riconoscibile ai test.
- Una riga incompleta fallisce indicando ID e prove mancanti.
- Il cruscotto Fabio registra review, correzioni, SHA e prossimo passo.

## Operazioni realmente eseguite

### Lettura dello stato remoto

- `github_fetch_pr(repo_full_name="UnNickk76/NEXO-VEO-VISION", pr_number=10)`
- `github_list_pull_request_reviews(repo_full_name="UnNickk76/NEXO-VEO-VISION", pr_number=10)`
- `github_list_pull_request_review_threads(repo_full_name="UnNickk76/NEXO-VEO-VISION", pr_number=10)`
- `github_fetch_commit_workflow_runs(repo_full_name="UnNickk76/NEXO-VEO-VISION", commit_sha="1566537ac6c71559efd9fd8207c8002d873bd5be")`

Risultato: PR aperta e unibile, review sullo SHA corretto, due thread P1 aperti, nessun workflow PR associato allo SHA.

### Verifica conclusiva locale

I sette file precedentemente materializzati senza trasformazioni in
`/workspace/scratch/40abb2bd44cb/verify-conceptual/` sono stati controllati
usando la versione corretta dello script in `fix-pr10/check_conceptual_master.py`.

Comando esatto:

```bash
python3 fix-pr10/check_conceptual_master.py verify-conceptual
```

- **Directory di esecuzione:** `/workspace/scratch/40abb2bd44cb`
- **Exit code:** `0`
- **Output individuale:**

```text
PASS V: exact stable ID set (51 rows)
PASS E: exact stable ID set (47 rows)
PASS U: exact stable ID set (31 rows)
PASS C: exact stable ID set (6 rows)
PASS completion evidence: 0 checked rows valid
PASS assertion: master protocol
PASS assertion: AGENTS registry
PASS assertion: Vision saved places
PASS assertion: UX saved places
PASS assertion: Roadmap phase 1
PASS assertion: README discovery
PASS: conceptual master registry is coherent
```

## Verificato realmente

- La review riguarda lo SHA `1566537ac6`.
- I due nuovi P1 sono presenti e non sono falsi positivi.
- La versione corretta dello script termina con exit code 0 sui file correnti.
- Gli insiemi esatti degli ID correnti sono preservati.
- Nessuna riga è attualmente marcata `[x]`.
- Il parser è predisposto ad accettare future spunte solo con tutte le prove richieste.

## Dedotto

- Il nuovo controllo impedisce la sostituzione silenziosa di un ID mantenendo invariato il numero di righe.
- Le future implementazioni potranno essere spuntate senza disabilitare il controllo, purché la riga contenga evidenza completa.

## Non verificato

- Nessuna funzione runtime dell'app è stata implementata o verificata.
- Non sono stati eseguiti build, lint applicativo o TestFlight perché la PR è documentale.
- La nuova Codex Review sullo SHA finale non è ancora disponibile.

## Errori e warning

- Il primo tentativo locale della versione corretta ha restituito exit code `1` con `ValueError: not enough values to unpack (expected 7, got 6)`; il parser è stato corretto per le sei colonne catturate e il controllo è stato ripetuto con exit `0`.
- Nessun workflow GitHub PR risultava associato allo SHA revisionato.

## Problemi non risolti

- I due nuovi thread P1 restano aperti fino alla pubblicazione completa della correzione e della risposta.
- La PR non può essere unita fino a una Codex Review pulita sul nuovo SHA finale.

## Dipendenze o credenziali

Nessuna.

## Rischi tecnici

- Il riconoscimento dell'evidenza usa pattern testuali; se in futuro cambia il formato delle colonne, script e protocollo devono essere aggiornati nella stessa PR.
- Un documento concettuale non dimostra l'implementazione runtime.

## Prossimo passo consigliato

Sincronizzare `LATEST.md`, rispondere e risolvere i due thread, richiedere Codex Review sullo SHA finale e fare squash merge soltanto se la review è pulita e la PR resta unibile.

## Decisioni richieste a Fabio

Nessuna.
