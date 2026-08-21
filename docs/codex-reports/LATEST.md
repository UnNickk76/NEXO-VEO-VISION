Rapporto storico: `docs/codex-reports/2026-08-21_093200_correzione-motivazioni-registro.md`

# Correzione del riconoscimento delle motivazioni nel registro concettuale

## Dati dell'attività

- **Data e ora UTC:** 2026-08-21 09:32:00 UTC
- **Obiettivo richiesto:** controllare la nuova Codex Review della PR #10 e correggere i rilievi reali.
- **Stato finale:** completato sul ramo; in attesa di nuova review.
- **Ramo utilizzato:** `codex/luoghi-salvati-concetto`
- **Commit creati prima del rapporto:** `1442dbb9aaab75e659ef08a7007c8cbb068805fb`, `8c8a68a07a434b60025ae8ce320eaf341996230b`
- **Pull request:** [PR #10](https://github.com/UnNickk76/NEXO-VEO-VISION/pull/10)
- **Costi:** nessuna spesa.

## File modificati

- `scripts/check_conceptual_master.py`
- `Fabio/FABIO_CONTROLLO.md`
- `docs/codex-reports/LATEST.md`

## File creato

- `docs/codex-reports/2026-08-21_093200_correzione-motivazioni-registro.md`

## Modifica concreta

La review sul commit `4c1977d983c46e3ac4618332ae8dbd6bfcb5ea64` ha rilevato che il pattern `\b(motiv|decision|adr|issue|pr\s*#\d+)\b` riconosceva soltanto le parole esatte `motiv` e `decision`, non le forme italiane previste `motivazione` e `decisione`.

Il pattern è stato sostituito con `\b(motivazion\w*|decision\w*|adr|issue|pr\s*#\d+)\b`. In questo modo accetta le forme italiane singolari e plurali, continuando ad accettare ADR, issue e riferimenti PR e a rifiutare testo generico privo di decisione o motivazione.

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

### Test mirato del pattern

```bash
python3 - <<'PY'
import re
pattern = re.compile(r'\b(motivazion\w*|decision\w*|adr|issue|pr\s*#\d+)\b', re.I)
cases = {
    'Motivazione: requisito obsoleto': True,
    'Decisione documentata': True,
    'ADR-004': True,
    'issue #12': True,
    'PR #10': True,
    'testo generico': False,
}
for value, expected in cases.items():
    actual = bool(pattern.search(value))
    print(f"{'PASS' if actual == expected else 'FAIL'} regex: {value!r} -> {actual}")
    assert actual == expected
PY
```

- **Exit code:** `0`
- **Risultati individuali:** tutti i cinque casi validi riconosciuti; il caso generico rifiutato.

## Verificato realmente

- La nuova review è ancorata allo SHA `4c1977d983c46e3ac4618332ae8dbd6bfcb5ea64`.
- Esiste un solo nuovo thread aperto, priorità P2, sul pattern delle motivazioni.
- La PR era aperta e GitHub la indicava unibile prima della nuova correzione.
- Il controllo completo e il test mirato terminano entrambi con exit code `0`.

## Dedotto

- Le evidenze conformi che usano `Motivazione`, `Motivazioni`, `Decisione` o `Decisioni` non saranno più respinte per il precedente errore di confine parola.

## Non verificato

- La nuova Codex Review sul commit finale non è ancora disponibile.
- Nessuna funzione runtime dell'app è stata modificata o verificata.
- Build iOS, EAS e TestFlight non sono applicabili a questa PR documentale.

## Errori e warning

- Rilievo P2 reale trovato e corretto.
- Nessun errore nei controlli locali conclusivi.

## Problemi non risolti

- Il thread P2 deve ricevere risposta ed essere risolto.
- Serve una Codex Review pulita sul nuovo SHA finale prima dello squash merge.

## Dipendenze o credenziali

Nessuna.

## Rischi tecnici

- Il pattern accetta suffissi alfanumerici dopo gli stem italiani; resta intenzionalmente limitato alle famiglie di parole previste.
- La documentazione non equivale a implementazione runtime.

## Prossimo passo consigliato

Pubblicare rapporto e `LATEST.md`, rispondere e risolvere il thread P2, richiedere Codex Review sullo SHA finale e fare squash merge soltanto dopo review pulita e controlli applicabili superati.

## Decisioni richieste a Fabio

Nessuna.
