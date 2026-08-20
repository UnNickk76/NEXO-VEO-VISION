# Auto-merge sicuro delle pull request Codex

Il workflow `.github/workflows/codex-auto-merge.yml` abilita l'auto-merge soltanto
per pull request Codex interne e dopo una validazione dedicata. La pull request che
introduce il workflow deve essere revisionata e unita manualmente: i workflow
`pull_request_target` vengono sempre caricati dal ramo base, quindi questa
configurazione non può auto-approvare la propria introduzione.

## Condizioni di ammissione

Una pull request è ammessa soltanto quando tutte le condizioni seguenti sono vere:

- non è una bozza;
- è aperta da `UnNickk76`;
- proviene dallo stesso repository del ramo base (mai da un fork);
- ha `main` come ramo di destinazione;
- il branch di origine inizia con `codex/`;
- contiene almeno un file e non modifica alcun percorso protetto;
- il commit validato è ancora il commit in testa alla pull request;
- GitHub dichiara la pull request unibile, senza conflitti;
- installazione e tutti gli script di controllo realmente presenti terminano con
  successo.

Nel progetto attuale il solo `package.json` è `frontend/package.json`. Il workflow
esegue `npm install` e rileva separatamente gli script `lint`, `typecheck`, `test` e
`build`: esegue quelli definiti e segnala esplicitamente quelli non applicabili.
Attualmente è definito soltanto `lint`. Il workflow TestFlight esistente è manuale
(`workflow_dispatch`), usa credenziali Expo e pubblica una build: non viene richiamato
dall'auto-merge e non è stato modificato.

## Modifiche che richiedono sempre un merge manuale

L'auto-merge viene bloccato se la pull request modifica:

- workflow, configurazioni GitHub, `CODEOWNERS`, file o cartelle `SECURITY`;
- file il cui nome indica segreti, token, credenziali, certificati o provisioning;
- configurazione Expo/EAS (`app.json`, `app.config.*`, `eas.json`, `Expo.plist`);
- configurazione o artefatti iOS, firma e provisioning (`ios/`, `Podfile`,
  entitlements, chiavi, certificati e mobile provisioning);
- Fastlane, firma o TestFlight.

Un percorso protetto, un controllo fallito, una configurazione mancante, una PR
vuota, un nuovo commit non ancora validato, un conflitto o uno stato non unibile
interrompono il workflow senza eseguire il merge.

## Permessi e modello di sicurezza

I job di selezione e validazione hanno soltanto accesso in lettura. Il checkout del
commit della pull request disabilita la persistenza delle credenziali. Soltanto il
job finale, che non esegue codice della pull request, riceve `contents: write` e
`pull-requests: write`. Il workflow usa esclusivamente `GITHUB_TOKEN`, GitHub CLI e
azioni ufficiali GitHub; non richiede PAT o segreti esterni.

Il merge viene richiesto con modalità **squash** e con eliminazione del branch. La
protezione di `main` resta l'autorità finale: l'auto-merge attende tutti i controlli
richiesti e non aggira review o regole del branch.

## Configurazione manuale su GitHub

Dopo avere unito manualmente la pull request di configurazione:

1. Aprire **Settings → General → Pull Requests**.
2. Abilitare **Allow auto-merge**.
3. Verificare che **Allow squash merging** sia abilitato.
4. Facoltativo ma consigliato: abilitare **Automatically delete head branches**,
   così GitHub elimina il branch anche quando la cancellazione richiesta dalla CLI
   non può essere completata immediatamente.
5. Aprire **Settings → Branches → Branch protection rules** (oppure **Settings →
   Rules → Rulesets**, se il repository usa i ruleset) e modificare la regola di
   `main` senza rimuovere alcuna protezione.
6. Abilitare **Require status checks to pass before merging**, mantenere tutti i
   controlli già richiesti e aggiungere **Codex PR validation** dopo che il workflow
   è stato eseguito almeno una volta. Abilitare anche **Require branches to be up to
   date before merging** se compatibile con il flusso del repository.
7. Conservare le review obbligatorie e ogni altra protezione già attiva: il workflow
   non deve avere autorizzazioni di bypass.

Se **Allow auto-merge**, lo squash merge o i permessi del `GITHUB_TOKEN` non sono
disponibili, il comando finale fallisce in modo sicuro e la pull request resta
aperta per il merge manuale.
