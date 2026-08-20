Rapporto storico: `docs/codex-reports/2026-08-20_202900_creazione-sistema-report.md`

# Creazione del sistema permanente di report tecnici Codex

## Dati dell'attività

- **Data e ora UTC:** 2026-08-20 20:29:00 UTC
- **Obiettivo richiesto:** introdurre istruzioni permanenti e una struttura di
  report tecnici per tutte le future attività Codex, senza modificare
  applicazione, backend, workflow o configurazioni Expo/EAS.
- **Stato finale:** completato
- **Ramo utilizzato:** `codex/sistema-report-tecnici`
- **Commit creati:** un commit con oggetto `Add permanent Codex reporting system`
  (l'identificativo non è disponibile all'interno del rapporto incluso nel
  commit stesso).
- **Pull request:** da creare manualmente dopo il commit; URL e numero non erano
  disponibili al momento della redazione. Non è prevista alcuna unione
  automatica.

## File interessati

### Creati

- `AGENTS.md`
- `docs/codex-reports/README.md`
- `docs/codex-reports/LATEST.md`
- `docs/codex-reports/2026-08-20_202900_creazione-sistema-report.md`

### Modificati

- Nessuno.

### Eliminati

- Nessuno.

## Modifiche effettuate

- Aggiunto `AGENTS.md` alla radice con il protocollo obbligatorio per la
  produzione, il contenuto e la gestione dei report futuri.
- Documentata in `README.md` la funzione della cartella dei report, la
  convenzione dei nomi e l'immutabilità dei rapporti storici.
- Creato questo primo rapporto storico.
- Inizializzato `LATEST.md` con una copia integrale di questo rapporto e con il
  percorso del rapporto storico in apertura.
- Nessun file dell'applicazione, backend, workflow o configurazione Expo/EAS è
  stato modificato.

## Comandi realmente eseguiti

1. `pwd`
2. `find .. -name AGENTS.md -print`
3. `find . -maxdepth 2 -mindepth 1 -printf '%p\n' | sort | head -200`
4. `git status --short --branch`
5. `git remote -v`
6. `git log -5 --oneline`
7. `git branch -vv`
8. `date -u '+%Y-%m-%d %H:%M:%S UTC|%Y-%m-%d_%H%M%S'`
9. `command -v make_pr`
10. `git config --get user.name`
11. `git config --get user.email`
12. `git switch -c codex/sistema-report-tecnici`
13. Creazione dei quattro file elencati mediante applicazione di patch.
14. `git add AGENTS.md docs/codex-reports/README.md docs/codex-reports/LATEST.md docs/codex-reports/2026-08-20_202900_creazione-sistema-report.md`
15. `git diff --name-only --cached`
16. `cmp docs/codex-reports/2026-08-20_202900_creazione-sistema-report.md docs/codex-reports/LATEST.md`
17. `git diff --cached --check`
18. Controllo `awk` sui percorsi restituiti da `git diff --name-only --cached`
    per rifiutare file diversi dai quattro richiesti.
19. `git diff --cached --stat`

## Test e controlli realmente eseguiti

| Controllo | Esito individuale |
| --- | --- |
| Ispezione dello stato Git iniziale con `git status --short --branch` | Superato: al momento del controllo non risultavano modifiche locali. |
| Ricerca di istruzioni `AGENTS.md` preesistenti con `find .. -name AGENTS.md -print` | Superato: nessun file preesistente è stato trovato nell'albero esaminato. |
| Verifica del timestamp tramite `date -u` | Superato: il timestamp è stato prodotto in UTC. |
| Controllo dei soli quattro percorsi previsti tramite `git diff --name-only --cached` e `awk` | Superato: sono presenti esclusivamente i quattro file richiesti. |
| Controllo di identità tra rapporto storico e `LATEST.md` tramite `cmp` | Superato: codice di uscita 0. |
| Controllo whitespace tramite `git diff --cached --check` | Superato: codice di uscita 0, nessun errore. |
| Test applicativi | Non eseguiti: nessun codice applicativo è stato modificato. |

## Evidenze e limiti

### Verificato realmente

- Lo stato iniziale del repository era privo di modifiche locali.
- Non erano presenti altri file `AGENTS.md` nell'albero ispezionato.
- La data e l'ora usate nel nome del rapporto sono UTC.
- I file introdotti sono esclusivamente documentazione e istruzioni per Codex.
- Il rapporto storico e `LATEST.md` sono byte per byte identici.
- L'area di staging contiene soltanto i quattro file richiesti e non presenta
  errori di whitespace rilevati da Git.

### Dedotto

- Le istruzioni sono compatibili con Codex perché sono espresse in un file
  `AGENTS.md`, con obblighi operativi espliciti, percorsi deterministici e una
  convenzione di denominazione non ambigua.
- Il protocollo non influisce sul comportamento runtime dell'applicazione perché
  non modifica file eseguibili o configurazioni applicative.

### Non verificato

- URL, numero e stato remoto della pull request, non ancora disponibile al
  momento della redazione.
- Esecuzione dei test applicativi, non pertinente a modifiche esclusivamente
  documentali.

## Errori e warning rilevati

- Nessun errore rilevato.
- Warning operativo: URL e numero della pull request possono essere registrati
  soltanto dopo la sua creazione; non sono stati inventati nel rapporto.

## Problemi non risolti

- Nessuno relativo ai file richiesti.

## Dipendenze o credenziali ancora necessarie

- Nessuna dipendenza applicativa.
- Per pubblicare la pull request è necessaria l'autenticazione GitHub già
  configurata nell'ambiente; nessun segreto è riportato in questo documento.

## Rischi tecnici

- La conformità futura dipende dal rispetto di `AGENTS.md` da parte di ogni
  sessione Codex.
- `LATEST.md` duplica intenzionalmente il rapporto più recente e deve essere
  mantenuto sincronizzato.
- L'identificativo e l'URL della pull request non possono essere inseriti nel
  commit iniziale senza un successivo aggiornamento documentale.

## Prossimo passo consigliato

- Revisionare manualmente la pull request e mantenerla non unita finché Fabio
  non ne approva contenuto e protocollo.

## Decisioni richieste a Fabio

- Decidere se approvare e unire manualmente la pull request. Nessuna decisione
  ulteriore è necessaria per la creazione del sistema.
