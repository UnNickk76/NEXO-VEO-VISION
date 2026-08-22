# NEXO — Agent Control Plane

Branch canonico operativo: `coordination/agent-control`.

Questa directory è il canale di contatto operativo dedicato tra Coordinatore NEXO e agenti. La Issue #11 resta fonte globale di governance, conflitti, decisioni e storico; i singoli incarichi operativi vengono invece letti prima dal file dedicato dell'agente.

## Ordine di lettura obbligatorio
1. `AGENTS.md` su `main`.
2. Issue #11 per regole globali, conflitti e direttive più recenti.
3. Questo README.
4. Il proprio file dedicato in `coordination/agents/` sul branch `coordination/agent-control`.
5. Il proprio file report dedicato in `coordination/reports/` sullo stesso branch.
6. Solo dopo: repository, main, PR, branch e file necessari al task corrente.

## Regola fondamentale
Ogni agente lavora **un task alla volta**. La checklist nel proprio file è una coda, non autorizza lavoro parallelo.

Per ogni task:
- prendere in carico il primo `[ ]` con `START CONDITION` soddisfatta;
- applicare READ → PLAN → WRITE → VERIFY;
- produrre output realmente verificabile/reviewabile;
- aggiornare GitHub (PR/commit/check/report secondo governance);
- aggiornare il proprio file dedicato: `[x]` solo se il task è realmente completato; se bloccato resta `[ ]` con motivo;
- registrare `LAST EVIDENCE` con PR/SHA/check/report;
- aggiungere SEMPRE un report operativo completo al proprio file in `coordination/reports/`;
- produrre anche il report finale copiabile nella propria chat, come già previsto dal workflow;
- rileggere immediatamente il proprio file e passare al task successivo solo se la start condition è soddisfatta e non esistono nuovi conflitti.

## File report dedicati
- NEXO 1 → `coordination/reports/NEXO_1_REPORT.md`
- NEXO 2 → `coordination/reports/NEXO_2_REPORT.md`
- NEXO 3 → `coordination/reports/NEXO_3_REPORT.md`
- NEXO CODEX → `coordination/reports/NEXO_CODEX_REPORT.md`
- NEXO REVIEW → `coordination/reports/NEXO_REVIEW_REPORT.md`

I file report sono append-only logici: non cancellare report precedenti. Aggiungere ogni nuovo report in testa o in fondo con timestamp UTC, task ID, stato, PR/SHA, verifiche reali, limiti, problemi residui e prossimo passo.

## Ownership
- Coordinatore: può creare/riordinare task in tutti i file dedicati, correggere stato/coda sulla base di evidenze GitHub e leggere tutti i report per generare i successivi lavori o task di rettifica.
- Ogni agente implementativo: può aggiornare esclusivamente il proprio file task e il proprio file report.
- NEXO REVIEW: aggiorna `NEXO_REVIEW.md` e `NEXO_REVIEW_REPORT.md`; inoltre può APPENDERE una sezione `REVIEW NOTE` ai file report dei quattro agenti implementativi quando revisiona il loro lavoro. Non modifica le loro checklist/task direttamente.

## Regola REVIEW NOTE
Per ogni review, NEXO REVIEW deve:
1. produrre il report copiabile nella propria chat;
2. aggiungere il report completo a `NEXO_REVIEW_REPORT.md`;
3. aggiungere nel report file dell'agente autore una `REVIEW NOTE` con:
   - PR e exact SHA revisionato;
   - CLEAN oppure CHANGES REQUIRED;
   - P0/P1/P2;
   - cosa è corretto;
   - rettifiche richieste, se presenti;
   - prova necessaria per chiudere ogni rettifica;
   - divieto di modificare la checklist dell'agente.
4. aggiornare la propria queue review.

Il Coordinatore legge periodicamente sia i file task sia tutti i file report. Se una REVIEW NOTE contiene rettifiche, il Coordinatore crea nel file task dell'agente interessato un lavoro esplicito di correzione con priorità coerente, evitando sovrapposizioni.

## Fonte di verità sullo stato
La dicitura `IN PROGRESS` non basta. Lo stato deve essere supportato da evidenze reali: commit/SHA, PR aggiornata, check/workflow, review, report o commento operativo con dati verificabili.

## Nessun lavoro inventato
Se nessun task ha start condition soddisfatta, l'agente passa a `BLOCKED` o `STANDBY` e non modifica aree altrui. Il Coordinatore riempie la coda quando esiste lavoro sicuro.
