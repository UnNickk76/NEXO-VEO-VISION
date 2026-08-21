Rapporto storico: `docs/codex-reports/2026-08-21_044612_testflight-prima-build-visibile.md`

# Preparazione della prima build iOS visibile su TestFlight

## Dati dell'attività

- **Data e ora UTC:** 2026-08-21 04:46:12 UTC; verifica review e correzioni: 2026-08-21 06:12 UTC.
- **Obiettivo richiesto:** rendere automatica la build iOS di produzione e l'invio a TestFlight, mantenendo visibili gli errori della prima esecuzione.
- **Stato finale:** `parziale`, in attesa della nuova Codex Review e della pipeline successiva al merge.
- **Ramo utilizzato:** `codex/testflight-first-visible-build`.
- **Commit creati prima dell'aggiornamento finale del rapporto:** `5d3d572b548827ccaa5212d92ad66d49fce366b4`, `d51f1b0caea9549c50175ffe4a80e926b1104da6`, `f95d7f4d4c670f5e39758eab56e116fbab5e1679`, `79712df8205ae7e1a6c3fe9b2840765535029efb`, `538df863435dd8cc7728c47dab622c3d7e890edf`, `f414bd14ccfa567dfdc2eedb5598cb79b2d7445d`.
- **Pull request:** [PR #9](https://github.com/UnNickk76/NEXO-VEO-VISION/pull/9).
- **Costi:** nessuna spesa autorizzata o sostenuta.

## File modificati

- `.github/workflows/testflight.yml`
- `frontend/app/_layout.tsx`
- `Fabio/FABIO_CONTROLLO.md`
- `docs/codex-reports/2026-08-21_044612_testflight-prima-build-visibile.md`
- `docs/codex-reports/LATEST.md`

Nessun file è stato eliminato.

## Modifiche concrete

- Il workflow parte manualmente oppure dopo un push su `main` che modifichi il workflow stesso o qualunque input sotto `frontend/**`.
- Prima della build esegue Expo Doctor e lint, poi controlla esplicitamente `EXPO_TOKEN`.
- La build usa `eas build --platform ios --profile production --non-interactive --wait --auto-submit`.
- La concorrenza impedisce due build di produzione simultanee senza cancellare quella già avviata.
- Lo startup non sopprime più globalmente i log e gestisce i rifiuti delle Promise dello splash screen.
- Il cruscotto Fabio distingue controlli superati, falliti e non ancora eseguiti.

## Verificato realmente

- Il precedente workflow eseguiva soltanto `eas build`, senza submission.
- Bundle identifier, EAS project ID, asset splash e immagine iniziale sono presenti.
- L'entry Expo Router è valida e la schermata iniziale non dipende dal backend per il rendering.
- La Codex Review sul commit `538df86343` ha prodotto tre rilievi aperti: due P1 sulla tracciabilità dei controlli e un P2 sui path del trigger.
- Il P2 è stato corretto sostituendo la lista parziale con `frontend/**`.
- I due P1 sono corretti da questo rapporto e dal cruscotto aggiornato.

## Controlli realmente eseguiti

Tutti i comandi seguenti sono stati eseguiti su copie byte-per-byte del contenuto destinato alla PR, nella directory locale `automation-check`.

### 1. Parsing YAML

```bash
python3 - <<'PY'
from pathlib import Path
import yaml
doc=yaml.safe_load(Path("automation-check/.github/workflows/testflight.yml").read_text())
assert isinstance(doc.get("jobs"),dict) and len(doc["jobs"])==1
print("PASS: YAML parsed, 1 job")
PY
```

- **Exit code:** `0`
- **Esito:** superato; un job riconosciuto.
- **Dipendenza ambiente:** PyYAML `6.0.3`.

### 2. Assertion statiche del workflow

```bash
python3 - <<'PY'
from pathlib import Path
p=Path("automation-check/.github/workflows/testflight.yml").read_text()
checks={"manual trigger":"workflow_dispatch:" in p,"main push trigger":"push:" in p and "- main" in p,"all frontend inputs":'- "frontend/**"' in p,"read-only permissions":"permissions:\n  contents: read" in p,"Expo Doctor":"run: npx expo-doctor" in p,"lint":"run: npm run lint" in p,"EXPO_TOKEN guard":'GitHub secret EXPO_TOKEN is missing.' in p,"auto-submit":'--wait --auto-submit' in p,"concurrency protection":"cancel-in-progress: false" in p}
for name,ok in checks.items(): print(("PASS" if ok else "FAIL")+": "+name)
assert all(checks.values())
PY
```

- **Exit code:** `0`
- **Esiti individuali:** superati trigger manuale, push su main, `frontend/**`, permessi read-only, Expo Doctor, lint, guardia token, auto-submit e protezione concorrenza.

### 3. Assertion statiche dello startup

```bash
python3 - <<'PY'
from pathlib import Path
p=Path("automation-check/frontend/app/_layout.tsx").read_text()
checks={"LogBox suppression removed":"LogBox" not in p and "ignoreAllLogs" not in p,"preventAutoHide rejection handled":"preventAutoHideAsync().catch" in p,"hide rejection handled":"hideAsync().catch" in p,"font failure allows boot":"if (!loaded && !error) return null;" in p}
for name,ok in checks.items(): print(("PASS" if ok else "FAIL")+": "+name)
assert all(checks.values())
PY
```

- **Exit code:** `0`
- **Esiti individuali:** superati rimozione LogBox globale, gestione delle due Promise e fallback font.

### 4. Scansione fail-safe di chiavi private

I due file sorgente modificati (workflow e startup) sono stati prima letti dal ramo tramite GitHub e materializzati byte-per-byte sotto `/tmp/nexo-review-input`. La directory dei report è esclusa intenzionalmente perché contiene il pattern euristico come documentazione; il perimetro dichiarato e verificato è quindi esattamente composto dai due file eseguibili modificati.

```bash
set +e
mapfile -d '' scan_files < <(find /tmp/nexo-review-input -type f -print0 | sort -z)
if [ "${#scan_files[@]}" -ne 2 ]; then
  echo "ERROR: expected 2 materialized source files, found ${#scan_files[@]}"
  exit 2
fi
rg -n '(BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY|AuthKey_[A-Z0-9]+\.p8|[A-Za-z0-9+/]{40,}={0,2})' -- "${scan_files[@]}"
scan_status=$?
case "$scan_status" in
  1) echo "PASS: no private-key heuristic match; rg_exit=1; files=${#scan_files[@]}"; exit 0 ;;
  0) echo "FAIL: possible private-key material detected; rg_exit=0"; exit 1 ;;
  *) echo "ERROR: scanner failed; rg_exit=$scan_status"; exit "$scan_status" ;;
esac
```

- **Exit code complessivo:** `0`
- **Exit code individuale di ripgrep:** `1`
- **Esito:** superato; nessuna corrispondenza in entrambi i file materializzati.
- **Fail-safe:** `rg=0` viene trattato come rilevamento e fallimento; `rg>=2` come errore di scansione; solo `rg=1` è un input pulito.

## Errori e warning rilevati

- Un primo tentativo di parsing con `ruby -e ...` non è stato eseguibile perché Ruby non è installato: `ruby: command not found`, exit `127` per quel comando. È stato sostituito dal controllo PyYAML sopra, realmente superato.
- Il repository non contiene un lockfile npm; `npm install` resta temporaneamente non deterministico.
- Il connettore non ha restituito i log della precedente esecuzione manuale `workflow_dispatch`.

## Dedotto

- L'app dovrebbe almeno avviarsi e mostrare la schermata iniziale, ma questo non è ancora provato su una build TestFlight reale.
- `submit.production` può usare credenziali EAS già memorizzate, ma la loro completezza sarà nota soltanto durante la submission.

## Non è stato possibile verificare

- `npm install`, `npx expo-doctor`, `npm run lint`, build EAS e submission TestFlight non sono stati eseguiti in questa sessione: richiedono la pipeline GitHub/EAS successiva al merge.
- Non è stato verificato un `ascAppId` esplicito né la presenza delle credenziali Apple in EAS.
- Non è stato inventato alcun esito per certificati, provisioning profile o App Store Connect.

## Credenziali e dipendenze necessarie

- Secret GitHub `EXPO_TOKEN`.
- Certificato di distribuzione e provisioning profile iOS validi gestiti da EAS.
- Credenziale App Store Connect per la submission; può essere richiesto il valore numerico `ascAppId`.
- Nessuna chiave `.p8` deve essere inserita nel repository.

## Rischi tecnici e problemi non risolti

- La review positiva delle 06:07 UTC riguarda ancora il vecchio SHA `6afdcca36b` e non chiude due thread P1; serve una nuova review sul commit successivo alle correzioni.
- Expo Doctor o lint possono bloccare la pipeline prima della build.
- La build può riuscire e la submission fallire se manca l'associazione App Store Connect.
- Non sarà autorizzata automaticamente alcuna spesa EAS.

## Prossimo passo consigliato

Richiedere una nuova Codex Review sullo SHA corrente. Effettuare squash merge soltanto se la review è pulita e la PR è unibile. Il merge avvierà la pipeline build+submit; leggere quindi il primo esito reale e aggiornare cruscotto e nuovo rapporto.

## Decisioni richieste a Fabio

Nessuna adesso. Fabio dovrà intervenire soltanto se la pipeline indica una credenziale Apple/Expo mancante o richiede una spesa.
