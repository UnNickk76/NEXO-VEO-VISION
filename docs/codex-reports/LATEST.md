Rapporto storico: `docs/codex-reports/2026-08-21_074400_correzione-motivazione-decisione-utc.md`

# Correzione finale di motivazione, decisione e cronologia UTC

## Dati dell'attività

- **Data e ora UTC:** 2026-08-21 07:44:00 UTC
- **Obiettivo richiesto:** controllare la Codex Review sullo SHA `58fd97eb38a0733265f875c1adb68fb638d00e4b` e correggere i rilievi reali.
- **Stato finale:** completato sul ramo; in attesa di nuova review.
- **Ramo utilizzato:** `codex/luoghi-salvati-concetto`
- **Commit creati prima del rapporto:** `ae43caef0ac9c77beb3266106184c55eb6c64a45`, `4d3aeef814465e474726b1d186ee5195687557cd`
- **Pull request:** [PR #10](https://github.com/UnNickk76/NEXO-VEO-VISION/pull/10)
- **Costi:** nessuna spesa.

## File modificati

- `scripts/check_conceptual_master.py`
- `Fabio/FABIO_CONTROLLO.md`
- `docs/codex-reports/LATEST.md`

## File creato

- `docs/codex-reports/2026-08-21_074400_correzione-motivazione-decisione-utc.md`

## Modifiche concrete

### P1 — motivazione e decisione entrambe obbligatorie

Il precedente pattern accettava una motivazione oppure un riferimento alla decisione. Il protocollo permanente richiede invece entrambi. Il validatore ora calcola separatamente:

- `has_motivation`: riconosce `motivazione` e relative forme;
- `has_decision_reference`: riconosce `decisione`, ADR, issue numerata o PR numerata.

Una voce `sostituita` o `scartata` fallisce se manca uno qualsiasi dei due elementi.

### P2 — cronologia UTC

Il rapporto storico `2026-08-21_093200_correzione-motivazioni-registro.md` indicava erroneamente l'ora locale UTC+2 come UTC. In conformità al divieto di sovrascrivere i rapporti storici, quel file resta immutato come registrazione dell'errore. Questo rapporto correttivo usa il nome e l'orario UTC reale e `LATEST.md` viene sostituito integralmente con questa versione. Anche `Fabio/FABIO_CONTROLLO.md` usa ora UTC reale.

## Comandi realmente eseguiti

### Verifica completa del registro

```bash
python3 scripts/check_conceptual_master.py .
```

- **Directory di lavoro:** radice della struttura materializzata della PR.
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

### Test mirato della coppia obbligatoria

```bash
python3 - <<'PY'
import re
motivation = re.compile(r'\bmotivazion\w*\b', re.I)
decision = re.compile(r'\b(decision\w*|adr|issue\s*#?\d+|pr\s*#\d+)\b', re.I)
cases = {
    'Motivazione: requisito obsoleto; Decisione documentata': True,
    'Motivazioni tecniche; ADR-004': True,
    'Motivazione verificata; issue #12': True,
    'Motivazione verificata; PR #10': True,
    'Motivazione: requisito obsoleto': False,
    'PR #10': False,
    'Decisione documentata': False,
    'testo generico': False,
}
for value, expected in cases.items():
    actual = bool(motivation.search(value) and decision.search(value))
    print(f"{'PASS' if actual == expected else 'FAIL'} pair: {value!r} -> {actual}")
    assert actual == expected
PY
```

- **Exit code:** `0`
- **Risultati individuali:** quattro coppie complete accettate; motivazione sola, PR sola, decisione sola e testo generico rifiutati.

## Verificato realmente

- La review è ancorata allo SHA `58fd97eb38a0733265f875c1adb68fb638d00e4b`.
- Contiene due thread nuovi: un P1 sul requisito congiunto e un P2 sull'ora UTC.
- La PR risultava aperta e unibile prima delle correzioni.
- Il controllo completo e il test mirato terminano con exit code `0`.

## Dedotto

- Una voce sostituita o scartata non potrà più superare il checker con la sola motivazione o il solo riferimento PR/ADR/issue.

## Non verificato

- La nuova Codex Review sul futuro SHA finale non è ancora disponibile.
- Nessuna funzione runtime dell'app è stata modificata o verificata.
- Build iOS, EAS e TestFlight non sono applicabili a questa PR documentale.

## Errori e warning

- Corretto un errore logico P1.
- Corretto mediante rapporto successivo un errore cronologico P2.
- Il rapporto storico con nome `093200` resta immutato per rispettare il protocollo di immutabilità.

## Problemi non risolti

- I due thread devono ricevere risposta ed essere risolti.
- Serve una review pulita sul nuovo SHA prima dello squash merge.

## Dipendenze o credenziali

Nessuna.

## Rischi tecnici

- Il formato delle evidenze resta un contratto testuale; variazioni future richiederanno aggiornamento e test del checker.
- La documentazione non equivale a implementazione runtime.

## Prossimo passo consigliato

Pubblicare rapporto e `LATEST.md`, rispondere e risolvere entrambi i thread, richiedere Codex Review sullo SHA finale e fare squash merge soltanto dopo review pulita.

## Decisioni richieste a Fabio

Nessuna.
