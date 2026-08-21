Rapporto storico: `docs/codex-reports/2026-08-21_044612_testflight-prima-build-visibile.md`

# Preparazione della prima build iOS visibile su TestFlight

## Dati dell'attività

- **Data e ora UTC:** 2026-08-21 04:46:12 UTC
- **Obiettivo:** rendere automatica la build iOS di produzione e l'invio a TestFlight, mantenendo visibili gli errori della prima esecuzione.
- **Stato:** implementazione preparata sul ramo `codex/testflight-first-visible-build`; build reale non ancora eseguita.
- **Priorità:** mostrare almeno la schermata iniziale di NEXO VEO VISION su iPhone.
- **Costi:** nessuna spesa autorizzata o sostenuta da questa attività.

## Verifiche realmente eseguite

- Letto il workflow `.github/workflows/testflight.yml` su `main`: eseguiva soltanto `eas build` e non effettuava la submission.
- Letti `frontend/app.json` ed `frontend/eas.json`: bundle identifier e project ID EAS sono presenti; `submit.production` è disponibile ma senza identificativo App Store Connect esplicito.
- Letti `frontend/package.json`, `frontend/app/_layout.tsx` e la struttura dell'app: l'entry Expo Router è valida e la schermata iniziale può essere resa anche senza backend.
- Verificata la presenza degli asset di splash e dell'immagine iniziale.
- Non è stato possibile recuperare dal connettore il log della precedente esecuzione manuale `workflow_dispatch`.

## Modifiche preparate

- Il workflow ora:
  - parte manualmente oppure dopo il merge su `main` di modifiche iOS/frontend rilevanti;
  - esegue `npx expo-doctor` e `npm run lint`;
  - verifica esplicitamente la presenza di `EXPO_TOKEN`;
  - esegue `eas build --platform ios --profile production --non-interactive --wait --auto-submit`;
  - impedisce due build di produzione concorrenti.
- `frontend/app/_layout.tsx` non nasconde più tutti i log e gestisce in sicurezza le Promise dello splash screen.

## Comandi previsti dalla pipeline

```bash
npm install
npx expo-doctor
npm run lint
eas build --platform ios --profile production --non-interactive --wait --auto-submit
```

Questi comandi sono configurati ma non vengono dichiarati come superati: saranno eseguiti da GitHub Actions soltanto dopo il merge della pull request.

## Limiti e possibili blocchi

- L'invio non interattivo richiede `EXPO_TOKEN` e credenziali Apple/App Store Connect già configurate in EAS.
- Se manca l'associazione all'app App Store Connect o il suo `ascAppId`, la build può riuscire ma la submission fallirà indicando il dato preciso da configurare.
- Il repository non contiene ancora un lockfile npm; `npm install` resta temporaneamente non deterministico. Il lockfile dovrà essere generato e verificato, non inventato.
- Nessuna chiave `.p8`, certificato, provisioning profile o token deve essere salvato nel repository.

## Prossimo passo

Aprire la pull request, richiedere Codex Review sul commit corrente, correggere eventuali rilievi e fare merge solo con review pulita. Il merge avvierà automaticamente la prima pipeline build+submit. Aggiornare poi questo stato con il risultato reale.
