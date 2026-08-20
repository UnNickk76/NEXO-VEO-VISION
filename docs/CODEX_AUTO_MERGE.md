# Validazione sicura delle pull request Codex e merge manuale

Il workflow `.github/workflows/codex-auto-merge.yml` è un workflow di
**validazione in sola lettura** per pull request Codex interne. Non abilita
l'auto-merge e non unisce pull request: dopo il completamento dei controlli e della
Codex Review, ogni PR deve essere valutata e unita manualmente da un responsabile.

Questa scelta è fail-safe. Nell'integrazione attuale non è stato verificato un
segnale machine-readable affidabile che distingua una Codex Review non ancora
iniziata da una review conclusa senza rilievi e da una review conclusa con thread
irrisolti. La momentanea assenza di commenti non è quindi considerata approvazione.

## Condizioni di ammissione alla validazione

Una pull request viene validata soltanto quando tutte le condizioni seguenti sono
vere:

- non è una bozza;
- è aperta da `UnNickk76`;
- proviene dallo stesso repository del ramo base, mai da un fork;
- ha `main` come ramo di destinazione;
- il branch di origine inizia con `codex/`;
- contiene almeno un file e non modifica alcun percorso protetto.

Nel progetto attuale il workflow installa le dipendenze di `frontend` e rileva
separatamente gli script `lint`, `typecheck`, `test` e `build`: esegue quelli
definiti e segnala esplicitamente quelli non applicabili. Un filtro non superato o
un controllo fallito interrompe la validazione, ma un esito positivo non causa il
merge.

Il workflow TestFlight esistente è manuale (`workflow_dispatch`), usa credenziali
Expo e pubblica una build: non viene richiamato da questa validazione e non è stato
modificato.

## Percorsi protetti

La validazione viene bloccata se la pull request modifica:

- workflow, configurazioni GitHub, `CODEOWNERS`, file o cartelle `SECURITY`;
- file il cui nome indica segreti, token, credenziali, certificati o provisioning;
- configurazione Expo/EAS (`app.json`, `app.config.*`, `eas.json`, `Expo.plist`);
- configurazione o artefatti iOS, firma e provisioning (`ios/`, `Podfile`,
  entitlements, chiavi, certificati e mobile provisioning);
- Fastlane, firma o TestFlight.

Queste modifiche sensibili restano escluse dal percorso di validazione automatica
e richiedono controllo e merge manuali. I filtri non sostituiscono branch
protection, ruleset, CODEOWNERS o review umana.

## Permessi e modello di sicurezza

Il workflow dichiara `permissions: {}` a livello globale. Il job di ammissibilità
riceve soltanto `contents: read` e `pull-requests: read`; il job di validazione
riceve soltanto `contents: read`. Il checkout usa lo SHA della pull request e
`persist-credentials: false`.

Non esiste un job finale con permessi `contents: write` o
`pull-requests: write`. Il workflow non esegue `gh pr merge --auto`, non richiede
uno squash merge, non elimina automaticamente il branch e non dispone di permessi
di bypass. Il token in lettura usato per elencare i file non viene esposto al
codice della pull request; il codice viene eseguito nel job separato in sola
lettura e senza credenziali Git persistenti.

## Procedura di merge manuale

1. Attendere che la validazione applicabile sia terminata con successo.
2. Attendere che la Codex Review sia realmente conclusa sullo SHA corrente.
3. Esaminare e risolvere esplicitamente tutti i rilievi e thread aperti, inclusi
   P1/P2, e rieseguire la review se il commit cambia.
4. Verificare branch protection, review richieste e gli altri controlli configurati.
5. Scegliere manualmente la strategia di merge consentita dalle policy del
   repository e unire la PR senza bypassare protezioni.
6. Gestire manualmente il branch di origine secondo la policy del repository.

Non è necessario abilitare **Allow auto-merge**, **Allow squash merging** o
**Automatically delete head branches** per il funzionamento di questo workflow.
Tali impostazioni possono esistere per altri processi del repository, ma non sono
requisiti né effetti della validazione Codex descritta qui.

## Condizioni per una futura riattivazione dell'auto-merge

L'auto-merge potrà essere riprogettato soltanto dopo avere documentato, reso
disponibile e verificato su GitHub un segnale machine-readable affidabile che:

1. distingua review non iniziata, review conclusa senza rilievi e review conclusa
   con osservazioni o thread irrisolti;
2. sia associato inequivocabilmente allo SHA corrente della pull request;
3. generi un evento affidabile che rivaluti la PR dopo la conclusione della review;
4. blocchi fail-safe in caso di segnale assente, ambiguo, scaduto o contestato;
5. non richieda bypass, non esponga credenziali scrivibili a codice non fidato e
   continui a escludere i percorsi protetti.

Fino alla verifica di tutte queste condizioni, l'assenza di rilievi visibili non è
una review superata e tutte le pull request restano destinate al merge manuale.
