# NEXO — Agent Control Plane

Branch canonico operativo: `coordination/agent-control`.

Questa directory è il canale di contatto operativo dedicato tra Coordinatore NEXO e agenti. La Issue #11 resta fonte globale di governance, conflitti, decisioni e storico; i singoli incarichi operativi vengono invece letti prima dal file dedicato dell'agente.

## Ordine di lettura obbligatorio
1. `AGENTS.md` su `main`.
2. Issue #11 per regole globali, conflitti e direttive più recenti.
3. Questo README.
4. Il proprio file dedicato in `coordination/agents/` sul branch `coordination/agent-control`.
5. Solo dopo: repository, main, PR, branch e file necessari al task corrente.

## Regola fondamentale
Ogni agente lavora **un task alla volta**. La checklist nel proprio file è una coda, non autorizza lavoro parallelo.

Per ogni task:
- prendere in carico il primo `[ ]` con `START CONDITION` soddisfatta;
- applicare READ → PLAN → WRITE → VERIFY;
- produrre output realmente verificabile/reviewabile;
- aggiornare GitHub (PR/commit/check/report secondo governance);
- aggiornare il proprio file dedicato: `[x]` solo se il task è realmente completato; se bloccato resta `[ ]` con motivo;
- registrare `LAST EVIDENCE` con PR/SHA/check/report;
- rileggere immediatamente il proprio file e passare al task successivo solo se la start condition è soddisfatta e non esistono nuovi conflitti.

## Ownership
- Coordinatore: può creare/riordinare task in tutti i file dedicati e correggere stato/coda sulla base di evidenze GitHub.
- Ogni agente: può aggiornare esclusivamente il proprio file dedicato per spuntare task, aggiungere stato, blocchi ed evidenze.
- NEXO REVIEW: usa solo `NEXO_REVIEW.md` e non modifica i file degli agenti implementativi.

## Fonte di verità sullo stato
La dicitura `IN PROGRESS` non basta. Lo stato deve essere supportato da evidenze reali: commit/SHA, PR aggiornata, check/workflow, review, report o commento operativo con dati verificabili.

## Nessun lavoro inventato
Se nessun task ha start condition soddisfatta, l'agente passa a `BLOCKED` o `STANDBY` e non modifica aree altrui. Il Coordinatore riempie la coda quando esiste lavoro sicuro.
