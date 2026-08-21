# Fabio Controllo

> Cruscotto di sola consultazione. Il rapporto tecnico completo è in
> `docs/codex-reports/LATEST.md`.

## Stato semplice

- **Data:** 21 agosto 2026, 04:46 UTC
- **Obiettivo attuale:** vedere NEXO VEO VISION su iPhone tramite TestFlight.
- **Stato:** correzione della pipeline preparata; pull request e review in corso.
- **Ramo:** `codex/testflight-first-visible-build`
- **PC di Fabio:** non serve che rimanga acceso per build e controlli cloud.
- **Costi:** nessuna spesa autorizzata.

## Cosa è stato fatto

- Verificato che l'app ha già una schermata iniziale avviabile e gli asset necessari.
- Individuato il difetto principale: il vecchio workflow creava la build ma non la inviava a TestFlight.
- Preparata l'esecuzione automatica dopo il merge con build EAS e `--auto-submit`.
- Aggiunti Expo Doctor, lint e controllo esplicito del token Expo.
- Rimossa la soppressione totale degli errori runtime, così un problema iniziale resta diagnosticabile.
- Resa più sicura la gestione dello splash screen.

## Cosa succede dopo

1. Viene aperta la pull request.
2. Codex Review controlla le modifiche.
3. Se la review è pulita, la pull request viene unita automaticamente come autorizzato da Fabio.
4. Il merge avvia GitHub Actions.
5. EAS prova a costruire l'app e a inviarla a TestFlight.

## Possibili blocchi

- `EXPO_TOKEN` mancante o non valido.
- Credenziali Apple/App Store Connect non ancora collegate in EAS.
- App Store Connect richiede il valore numerico `ascAppId`.
- Expo Doctor o lint rilevano un errore.
- Piano EAS senza build disponibile: non verrà autorizzata alcuna spesa automaticamente.

## Cosa deve fare Fabio adesso

Nulla. Attendere qui l'esito della review e della prima pipeline. Verrà chiesto un intervento soltanto se Apple/EAS richiede un dato o un'autorizzazione che non può essere dedotta.
