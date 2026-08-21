# Android build readiness — preflight non-EAS

## Dati attività
- Data e ora UTC: 2026-08-21 20:55 UTC.
- Obiettivo: rendere il progetto Android-ready in modo indipendente dal blocco iOS, verificando configurazione Expo/EAS Android e aggiungendo un preflight riproducibile non a pagamento.
- Stato finale: completato per la readiness statica/prebuild; nessuna build Android reale APK/AAB è stata eseguita.
- Branch: `nexo-codex/android-build-readiness`.
- Base: `main` `213fb129201230c3875e5fb8fc157260f995fe04`.
- Pull request: PR #18, DRAFT.

## READ verificato realmente
- `AGENTS.md` letto integralmente.
- Issue #11 riletta, incluso incarico Coordinatore `5375213098`.
- Main verificata a `213fb129201230c3875e5fb8fc157260f995fe04` prima della scrittura.
- PR concorrenti verificate: #12 NEXO 1 (saved places) e #17 NEXO 3 (voice core), entrambe DRAFT e senza sovrapposizione funzionale con Android readiness.
- `frontend/app.json`: `expo.android.package = com.fabioandreola.nexoveovision`, adaptive icon presente, edge-to-edge attivo.
- `frontend/eas.json`: profilo `production` esistente; configurazione iOS preservata e non modificata.
- `frontend/package.json`: Expo `~54.0.37`, React Native `0.81.5`.
- `frontend/package-lock.json`: coppia coerente con package.json sul ramo base.
- Workflow esistenti: solo `codex-auto-merge.yml` e `testflight.yml`; nessun preflight Android dedicato.
- Documentazione Expo SDK 54/EAS corrente verificata: `android.package` è il package standalone; il profilo EAS `production` è valido anche per Android e produce AAB di default; `expo prebuild --platform android` è un controllo locale/prebuild, non una EAS Build.

## Deduzione tecnica
La configurazione Android di base era già sufficiente per richiedere in futuro una EAS Build Android. Non era necessario modificare `app.json`, `eas.json`, package o lockfile. La lacuna reale era l'assenza di una verifica Android riproducibile separata dal TestFlight iOS.

## Modifica effettuata
### File funzionale/infrastrutturale
- `.github/workflows/android-readiness.yml` — creato.

Il workflow è separato da TestFlight e non invoca `eas build` o `eas submit`. Esegue soltanto:
1. checkout;
2. Node 20;
3. `npm ci`;
4. `npx expo-doctor`;
5. `npx expo lint app src`;
6. `npx expo config --type public --json` con assertion del package Android e della dipendenza Expo SDK 54;
7. `CI=1 npx expo prebuild --platform android --no-install --clean`.

### File di reporting
- `docs/codex-reports/2026-08-21_205500_android-build-readiness.md` — creato.
- `docs/codex-reports/LATEST.md` — aggiornato con l'intero rapporto.
- `Fabio/FABIO_CONTROLLO.md` — aggiornato sinteticamente.

### File eliminati
- Nessuno.

## Commit della PR
1. `f3cdbccda4f283a10f170e098f72648d7a5e52a4` — `ci(android): add non-EAS readiness preflight`.
2. `HEAD` — commit atomico di reporting che contiene rapporto storico, `LATEST.md` e `FABIO_CONTROLLO.md`. Lo SHA esatto del commit corrente viene registrato sulla Coordination Board e nella richiesta di review per evitare auto-riferimento circolare nel contenuto dello stesso commit.

## Comandi/verifiche realmente eseguiti
Tutti i controlli seguenti sono stati eseguiti dalla GitHub Actions `Android Readiness`, run #1, run ID `32525822573`, job `android-readiness` ID `96907496549`.

### Install
Comando:
```bash
npm ci
```
Esito: PASS, step success.
Nota: npm ha riportato 12 vulnerabilità del dependency tree (1 moderate, 11 high); non sono state modificate dipendenze perché fuori perimetro.

### Expo Doctor
Comando:
```bash
npx expo-doctor
```
Esito: PASS, `18/18 checks passed. No issues detected!`.

### Lint
Comando:
```bash
npx expo lint app src
```
Esito: PASS, 0 errori; 1 warning preesistente in `frontend/app/index.tsx`: `Text` importato ma non usato.

### Expo config Android / SDK
Comandi:
```bash
npx expo config --type public --json > /tmp/nexo-expo-config.json
node - <<'NODE'
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('/tmp/nexo-expo-config.json', 'utf8'));
const pkg = require('./package.json');
const expectedPackage = 'com.fabioandreola.nexoveovision';
if (config.android?.package !== expectedPackage) throw new Error(`Unexpected Android package: ${config.android?.package}`);
if (!String(pkg.dependencies?.expo ?? '').includes('54.0.')) throw new Error(`Expected Expo SDK 54 dependency, found: ${pkg.dependencies?.expo}`);
console.log(`Android package: ${config.android.package}`);
console.log(`Expo dependency: ${pkg.dependencies.expo}`);
console.log('Android config assertions: PASS');
NODE
```
Esito: PASS.
Output essenziale:
- `Android package: com.fabioandreola.nexoveovision`
- `Expo dependency: ~54.0.37`
- `Android config assertions: PASS`

### Native Android prebuild
Comando:
```bash
CI=1 npx expo prebuild --platform android --no-install --clean
```
Esito: PASS.
Output essenziale:
- Android code cleared;
- native directory created;
- package.json aggiornato nel workspace effimero del runner;
- `Finished prebuild`.
Le modifiche generate dal prebuild non sono state committate e non fanno parte della PR.

## Verificato realmente
- Package Android valido e risolto a `com.fabioandreola.nexoveovision`.
- Expo SDK 54 presente (`~54.0.37`).
- Expo Doctor PASS 18/18.
- Lint senza errori.
- Expo prebuild Android completa con successo su Ubuntu runner.
- Nessun accesso a credenziali Apple/EAS/Google.
- Nessun `eas build`, `eas submit`, TestFlight o Google Play avviato.
- `.github/workflows/testflight.yml`, `frontend/app.json`, `frontend/eas.json`, package e lockfile non sono stati modificati.

## Dedotto ma non verificato con build reale
- Il progetto è pronto a tentare una futura EAS Build Android dal punto di vista della configurazione e della generazione nativa.
- Il profilo `production` produrrebbe un AAB Android di default secondo la documentazione Expo corrente.

## Non verificato / limiti
- Nessuna compilazione Gradle completa.
- Nessun APK/AAB prodotto.
- Nessuna firma Android/keystore verificata.
- Nessuna EAS Build Android eseguita.
- Nessuna Google Play Console o service account configurata/verificata.
- Nessun test su dispositivo/emulatore Android.

## Registro concettuale
`V05` NON viene marcato `[x]` né spostato a implementato: questa attività è infrastruttura Android phone/prebuild e non implementa Android Auto/CarPlay runtime. Nessuna modifica a `NEXO_CONCEPTUAL_MASTER.md` è necessaria per evitare di sovrastimare lo stato funzionale.

## Rischi e concorrenza
- PR #12 e #17 possono modificare reporting/conceptual in parallelo. Questa PR modifica i file di reporting obbligatori partendo da main; prima di qualunque merge dovrà essere riallineata/serializzata preservando gli aggiornamenti altrui.
- Il warning npm sulle vulnerabilità resta fuori perimetro e richiede attività separata se il Coordinatore la assegna.
- Il warning lint preesistente resta fuori perimetro.

## Prossimo passo consigliato
Review indipendente NEXO REVIEW sullo SHA finale esatto della PR #18. Nessun merge autonomo. Dopo eventuale CLEAN e serializzazione sulla main corrente, il Coordinatore potrà decidere se autorizzare una prima EAS Build Android separata; tale build non è stata eseguita in questa attività.
