# NEXO 2 — F0 Surface Capabilities provider-neutral

- **Data/ora UTC:** 2026-08-21 21:49:43 UTC
- **Obiettivo:** creare il primo contratto provider-neutral delle Surface NEXO condiviso tra iOS phone, Android phone, CarPlay e Android Auto, senza implementare UI/runtime automotive reale.
- **Stato finale:** parziale — implementazione e verifiche statiche/comportamentali completate nel perimetro assegnato; PR #20 DRAFT in attesa di review indipendente.
- **Branch:** `nexo2/f0-surface-capabilities`
- **Base verificata:** `main` `213fb129201230c3875e5fb8fc157260f995fe04`
- **Pull request:** #20 — DRAFT
- **Requisiti/ID:** V05, V44, V45, V46; architettura `Surface → Voice Intent → Command → Command Bus → dominio`.

## Verificato realmente

Prima della prima modifica sono stati letti integralmente `AGENTS.md`, la Coordination Board #11 e l'ADR F0 pertinente; sono stati verificati `main`, PR aperte e aree riservate. Al momento del READ risultavano aperte PR #12 (NEXO 1 / saved-places), #17 (NEXO 3 / voice core) e #18 (NEXO CODEX / Android readiness). `frontend/src/` su `main` conteneva soltanto `hooks/` e `utils/`: non esisteva un contratto Surface eseguibile.

L'ADR F0 stabilisce che Surface adatta presentazione/input al contesto, non contiene regole di dominio e non accede direttamente ai provider; le capability devono essere negoziate, non presunte. I limiti della Surface automotive prevalgono sul ruolo Driver/Passenger.

## Modifiche concrete

### Contratto Surface

Creato `frontend/src/core/surface/types.ts` con:
- `SurfaceKind`: `ios-phone`, `android-phone`, `carplay`, `android-auto`;
- versione esplicita `SURFACE_CONTRACT_VERSION = 1`;
- capability provider-neutral;
- availability runtime canonica `available | degraded | offline | unsupported`;
- policy prodotto `permitted | constrained | prohibited`;
- vincoli moving/stopped, ruolo Driver/Passenger e precedenza obbligatoria delle regole Surface;
- `SurfaceContext` in cui l'availability viene fornita dall'adapter/runtime e non dedotta dal nome della piattaforma.

Creato `frontend/src/core/surface/profiles.ts` con profili NEXO conservativi:
- phone: touch completo da fermo, free text/rich detail bloccati in movimento;
- automotive: touch fortemente limitato, free text proibito, voice preferred, nessuna espansione Passenger oltre i limiti Surface;
- commento esplicito che i profili NON dimostrano entitlement, runtime support, template o permessi della piattaforma.

Creato `frontend/src/core/surface/policy.ts` con funzioni pure:
- `resolveSurfaceCapability`;
- `canUseFreeText`;
- `canPresentRichDetails`;
- `maxTouchSteps`.

Creato `frontend/src/core/surface/index.ts` come API pubblica del modulo.

### Checker

Creato `frontend/scripts/check-surface-capabilities.ts` con casi positivi/negativi per:
- presenza delle quattro Surface;
- precedenza delle regole automotive sul ruolo;
- capability proibita che resta inutilizzabile anche se il runtime la dichiara disponibile;
- free text vietato su CarPlay/Android Auto;
- free text vietato sul telefono in movimento;
- touch budget ridotto in movimento e più restrittivo su automotive;
- nessuna inferenza di supporto dal solo `SurfaceKind` quando runtime dichiara `unsupported`;
- rich details vietati al driver in movimento;
- Passenger phone consentito solo entro limiti Surface;
- Passenger automotive incapace di bypassare i vincoli automotive.

### Registro concettuale

Aggiornato `docs/product/NEXO_CONCEPTUAL_MASTER.md` in modo conservativo:
- V05 = `[ ]` / `parziale`;
- V44 = `[ ]` / `parziale`;
- V45 = `[ ]` / `parziale`;
- V46 = `[ ]` / `parziale`.

Nessun requisito è stato marcato `[x]`. Le evidenze dichiarano esplicitamente l'assenza di runtime automotive/UI finale/test in auto.

## Commit creati

1. `dfc1380ae5934d753450068ed1475cbcd8c8f8f0` — tipi del contratto Surface.
2. `1dde5afb9669003a4823d4a294cb42f4b64534a1` — profili conservativi Surface.
3. `ae9d809f50bda52133e51d67f03f6402873d5b20` — policy capability/safety.
4. `a1e8bbf7269b867625c8cdd2e7cdec955367fb43` — API pubblica del modulo.
5. `4f4759c0d5f1b43aeee91037e31a195d928d96d4` — checker comportamentale.
6. `6abb17c5addf847282941727591ffae55e10f53a` — aggiornamento conservativo conceptual.
7. `HEAD` — commit finale di reporting contenente questo rapporto, `LATEST.md` e `Fabio/FABIO_CONTROLLO.md`.

`HEAD` è usato per il commit auto-referenziale che materializza contemporaneamente i tre file di reporting; il suo SHA è verificato separatamente nella Board/PR dopo la pubblicazione.

## Elenco completo file creati/modificati

### Creati — funzionali/check
- `frontend/src/core/surface/types.ts`
- `frontend/src/core/surface/profiles.ts`
- `frontend/src/core/surface/policy.ts`
- `frontend/src/core/surface/index.ts`
- `frontend/scripts/check-surface-capabilities.ts`

### Modificato — registro prodotto
- `docs/product/NEXO_CONCEPTUAL_MASTER.md`

### Creati/modificati — reporting
- `docs/codex-reports/2026-08-21_214943_f0-surface-capabilities.md` — creato.
- `docs/codex-reports/LATEST.md` — sostituito con questo rapporto completo.
- `Fabio/FABIO_CONTROLLO.md` — aggiornato allo stato della PR #20.

Nessun file eliminato.

## Comandi realmente eseguiti e risultati individuali

### 1. Tentativo checkout reale del branch

```sh
rm -rf /tmp/nexo2-git && git clone --depth 1 --branch nexo2/f0-surface-capabilities https://github.com/UnNickk76/NEXO-VEO-VISION.git /tmp/nexo2-git
```

- **Exit code:** 128
- **Esito:** FALLITO per limite ambiente: `Could not resolve host: github.com`.
- **Conseguenza:** nessun test viene dichiarato eseguito su un checkout Git completo. Per i test isolati sono stati ricostruiti localmente i file funzionali/checker dai contenuti pubblicati sul branch tramite il connettore GitHub.

### 2. Primo tentativo TypeScript con flag dell'ambiente più recente

```sh
cd /tmp/nexo2-local/frontend && rm -rf /tmp/nexo2-out-ignore && tsc --ignoreConfig --strict --target ES2022 --module node16 --moduleResolution node16 --skipLibCheck --outDir /tmp/nexo2-out-ignore src/core/surface/*.ts scripts/check-surface-capabilities.ts
```

- **Exit code:** 1
- **Esito:** FALLITO perché il `tsc` installato nel runtime locale non supporta `--ignoreConfig` (`TS5023`).
- **Correzione:** rimosso il flag non supportato; la directory temporanea non contiene `tsconfig`, quindi il comando resta isolato e riproducibile.

### 3. TypeScript strict + checker finale

```sh
cd /tmp/nexo2-local/frontend && rm -rf /tmp/nexo2-out && tsc --strict --target ES2022 --module node16 --moduleResolution node16 --skipLibCheck --outDir /tmp/nexo2-out src/core/surface/*.ts scripts/check-surface-capabilities.ts && node /tmp/nexo2-out/scripts/check-surface-capabilities.js
```

- **Exit code:** 0
- **Output:** `surface-capabilities checks: PASS`
- **Esito:** PASS.

### 4. Scansione import provider-specific, whitespace e token API piattaforma

```sh
set -o pipefail
cd /tmp/nexo2-local/frontend
if rg -n "from ['\"](?:react-native-carplay|androidx|@?apple|.*carplay.*|.*android-auto.*)['\"]|require\(['\"](?:react-native-carplay|androidx|@?apple)" src/core/surface scripts/check-surface-capabilities.ts; then exit 2; else code=$?; if [ "$code" -eq 1 ]; then echo 'provider-specific import scan: PASS (no matches)'; else exit "$code"; fi; fi
if rg -n '[[:blank:]]+$' src/core/surface scripts/check-surface-capabilities.ts; then exit 3; else code=$?; if [ "$code" -eq 1 ]; then echo 'trailing whitespace scan: PASS (no matches)'; else exit "$code"; fi; fi
if rg -n 'Mapbox|GoogleMaps|MKMap|CPMapTemplate|CarContext|androidx\.car' src/core/surface scripts/check-surface-capabilities.ts; then exit 4; else code=$?; if [ "$code" -eq 1 ]; then echo 'provider/platform API token scan: PASS (no matches)'; else exit "$code"; fi; fi
```

- **Exit code:** 0
- **Risultati:**
  - provider-specific import scan: PASS, nessun match;
  - trailing whitespace scan: PASS, nessun match;
  - provider/platform API token scan: PASS, nessun match.

### 5. Verifica remota del diff funzionale prima del reporting

Confronto GitHub `main 213fb129...` → branch dopo i primi cinque commit:
- `ahead_by = 5`, `behind_by = 0`;
- esattamente 5 file aggiunti, tutti nel perimetro `frontend/src/core/surface/` + checker;
- nessun file saved-places, voice, Android config, iOS/EAS o workflow toccato.

### 6. Verifica conceptual dopo aggiornamento

Rilettura remota delle righe V01–V48 sul branch:
- V05/V44/V45/V46 risultano `[ ]` e `parziale`;
- evidenze puntano a PR #20 e descrivono esplicitamente ciò che manca;
- nessuna casella dei quattro requisiti è stata trasformata in `[x]`.

## Self-review

Il diff funzionale è stato riletto come reviewer. Non sono state trovate dipendenze Apple/Google, accessi diretti a provider o tentativi di dichiarare runtime support in base al nome Surface. Il punto chiave del contratto è che la runtime availability entra da `SurfaceContext.availability`; il core non presume che CarPlay/Android Auto siano disponibili solo perché esiste il relativo `SurfaceKind`.

La policy `constrained` resta separata da `availability`: una capability può essere tecnicamente disponibile ma sottoposta a vincoli di interazione. Le funzioni contestuali applicano moving/stopped e ruolo senza consentire al Passenger di superare i limiti automotive.

## Deducibile ma non dimostrato runtime

- Il contratto è predisposto per essere consumato in futuro da iOS, Android, CarPlay e Android Auto.
- La separazione rende possibile mantenere Command/domain provider-neutral.
- La struttura è compatibile con il confine architetturale ADR F0.

Questi punti non equivalgono a integrazione automotive funzionante.

## Non verificato / fuori perimetro

- Nessun entitlement CarPlay.
- Nessun template CarPlay.
- Nessun Android Auto host/runtime.
- Nessun test in automobile o simulatore automotive.
- Nessuna navigazione reale, map provider o UI finale.
- Nessun test del repository completo tramite checkout locale, per DNS di rete indisponibile nel runtime shell.
- Nessun lint globale del frontend dichiarato PASS in questa attività: il test mirato è TypeScript strict + checker isolato.
- Nessuna build EAS/TestFlight iOS; gate iOS esplicitamente chiuso dal Coordinatore.

## Errori e warning rilevati

- Checkout Git fallito per DNS/rete del runtime shell.
- Primo comando `tsc` fallito perché la versione locale non supporta `--ignoreConfig`; il comando è stato corretto e rieseguito con esito PASS.
- Nessun warning del checker finale.

## Rischi tecnici residui

1. I profili sono policy NEXO conservative, non sostituiscono i vincoli reali Apple/Google che verranno applicati dagli adapter Surface futuri.
2. La lista capability iniziale è deliberatamente minima e dovrà evolvere in modo versionato.
3. PR #12/#17/#18 sono concorrenti; non c'è sovrapposizione funzionale nota, ma `LATEST.md`, `FABIO_CONTROLLO.md` e conceptual richiederanno serializzazione/riallineamento prima del merge.
4. Non avendo un checkout Git completo nel runtime locale, il gate conclusivo si basa su test isolati dei file funzionali e verifiche remote del diff tramite GitHub.

## Dipendenze / credenziali necessarie

Nessuna credenziale richiesta. Nessuna dipendenza nuova aggiunta.

## Prossimo passo consigliato

1. Verificare SHA finale e diff completo PR #20.
2. Confermare PR ancora DRAFT e mergeability dopo l'assestamento GitHub.
3. Richiedere review indipendente NEXO REVIEW sullo SHA finale.
4. In caso CLEAN, lasciare al Coordinatore il passaggio Ready/merge dopo serializzazione con la main più recente.
5. Non implementare runtime automotive in questa PR.

## Decisioni richieste a Fabio

Nessuna decisione necessaria per la review di questo slice. Le future scelte entitlement/runtime CarPlay e Android Auto restano fuori perimetro.
