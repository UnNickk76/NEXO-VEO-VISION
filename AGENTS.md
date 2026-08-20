# Istruzioni permanenti per Codex

Queste istruzioni si applicano all'intero repository.

## Protocollo obbligatorio dei report

Al termine di **ogni attività** svolta nel repository — inclusi audit, analisi,
correzioni, implementazioni, test e attività parzialmente fallite — Codex deve:

1. Creare un rapporto Markdown storico e univoco in `docs/codex-reports/`.
2. Nominare il rapporto nel formato
   `YYYY-MM-DD_HHMMSS_descrizione-breve.md`, usando data e ora UTC e una
   descrizione breve, minuscola e separata da trattini.
3. Aggiornare `docs/codex-reports/LATEST.md`. Il file deve riportare in apertura
   il percorso del rapporto storico corrispondente e deve contenere **l'intero
   rapporto più recente**, non soltanto un collegamento.
4. Includere sempre nel rapporto:
   - titolo dell'attività;
   - data e ora UTC;
   - obiettivo richiesto;
   - stato finale: `completato`, `parziale`, `bloccato` o `fallito`;
   - ramo utilizzato;
   - commit creati;
   - pull request creata, se disponibile;
   - elenco completo dei file creati, modificati o eliminati;
   - spiegazione concreta delle modifiche;
   - comandi realmente eseguiti;
   - test e controlli realmente eseguiti;
   - esito individuale di ogni controllo;
   - errori e warning rilevati;
   - problemi non risolti;
   - dipendenze o credenziali ancora necessarie;
   - rischi tecnici;
   - prossimo passo consigliato;
   - eventuali decisioni richieste a Fabio.
5. Separare chiaramente, con sezioni o etichette esplicite:
   - ciò che è stato verificato realmente;
   - ciò che è soltanto dedotto;
   - ciò che non è stato possibile verificare.
6. Non dichiarare mai superato un test che non è stato realmente eseguito.
7. Non inserire mai password, token, chiavi private, certificati, contenuti di
   file `.env` o altri segreti. È consentito indicare soltanto il nome della
   variabile o del file mancante.
8. Creare comunque il rapporto se l'attività si blocca o fallisce, indicando il
   punto esatto del blocco e ciò che rimane da fare.
9. Inserire il rapporto storico e l'aggiornamento di `LATEST.md` nella stessa
   pull request delle modifiche relative all'attività.
10. Se l'attività è esclusivamente diagnostica e non modifica il codice, creare
    comunque una pull request contenente soltanto il rapporto.
11. Non sovrascrivere né eliminare i rapporti storici. Soltanto `LATEST.md` deve
    essere sostituito con il rapporto più recente.

## Chiusura dell'attività

Il rapporto deve descrivere soltanto azioni ed esiti reali. Prima della consegna,
Codex deve verificare che il rapporto storico e `LATEST.md` siano inclusi nella
stessa pull request dell'attività. Se dati finali come URL o numero della pull
request non sono ancora disponibili al momento della creazione del rapporto,
deve dichiararlo esplicitamente senza inventarli.
