Rapporto storico: `docs/codex-reports/2026-08-21_093545_fix-expo-sdk54-testflight.md`

# Ripristino Expo Doctor per TestFlight

## Dati dell'attività

- **Data e ora UTC:** 2026-08-21 09:35:45 UTC
- **Obiettivo:** correggere il mismatch Expo SDK 54 che ha bloccato la pipeline TestFlight dopo il merge della PR #9, senza disabilitare Expo Doctor.
- **Stato finale:** `parziale`; dipendenze e lockfile corretti, Expo Doctor remoto superato, merge ancora vietato fino a review pulita sullo SHA corrente.
- **Branch:** `codex/fix-expo-sdk54-testflight`
- **Pull request:** [PR #13](https://github.com/UnNickk76/NEXO-VEO-VISION/pull/13)
- **SHA delle dipendenze candidate:** `49124bfa1a5030291f948b71862757a8041cda5f`; il successivo commit di solo reporting viene registrato sulla Board e nella PR.
- **Base verificata:** `main` `1c66a29b24df20ce7bded3b514ce88e534077281`
- **Run fallita esaminata:** [NEXO TestFlight 32465874331](https://github.com/UnNickk76/NEXO-VEO-VISION/actions/runs/32465874331), job `96722214081`
- **Costi:** nessuna spesa.

## READ e PLAN realmente eseguiti

- Letti integralmente Issue #11, `AGENTS.md`, `Fabio/FABIO_CONTROLLO.md`, workflow TestFlight, `frontend/package.json` e i log completi del job fallito.
- Verificati `main`, PR aperte e lavoro NEXO 1 sulla PR #12. Il codice saved-places resta fuori perimetro; i file condivisi di reporting vengono serializzati.
- Il log reale di Expo Doctor richiede `expo ~54.0.37` e `expo-constants ~18.0.14`; il repository conteneva rispettivamente `54.0.36` e `18.0.13`.
- La run non ha raggiunto EAS Build, firma Apple o invio TestFlight.

## File modificati

- `frontend/package.json`
- `frontend/package-lock.json` (nuovo lockfile npm coerente con il workflow, che usa `npm install`)
- `docs/codex-reports/2026-08-21_093545_fix-expo-sdk54-testflight.md`
- `docs/codex-reports/LATEST.md`
- `Fabio/FABIO_CONTROLLO.md`

Nessuna funzione NEXO, configurazione EAS/Apple, workflow, segreto o certificato è stato modificato.

## Modifica applicata

- `expo`: da `54.0.36` a `~54.0.37`.
- `expo-constants`: da `18.0.13` a `~18.0.14`.
- Aggiunti gli `overrides` npm equivalenti alle `resolutions` Yarn già canoniche, così il nuovo lockfile non reintroduce versioni transitive escluse dal progetto.
- Generato il lockfile npm e installate esattamente `expo 54.0.37` ed `expo-constants 18.0.14`.

## Comandi ed esiti realmente ottenuti

Tutti i comandi relativi al frontend sono riportati dalla radice del repository e includono esplicitamente il cambio di directory realmente usato.

### Matrice Expo SDK 54 finale

```bash
(cd frontend && __UNSAFE_EXPO_HOME_DIRECTORY=/tmp/nexo-expo-home EXPO_NO_TELEMETRY=1 ./node_modules/.bin/expo install --check)
```

- **Exit code:** `0`
- **Output conclusivo:** `Dependencies are up to date`.

### Installazione pulita dal lockfile

```bash
(cd frontend && npm ci --cache=/tmp/nexo-npm-cache)
```

- **Exit code:** `0`
- **Risultato finale:** 938 package installati; nessun errore di installazione.

### Versioni registrate nel lockfile

```bash
(cd frontend && node -e "const l=require('./package-lock.json'); for (const p of ['node_modules/expo','node_modules/expo-constants']) console.log(p,l.packages[p].version)")
```

- **Exit code:** `0`
- **Output:** `expo 54.0.37`; `expo-constants 18.0.14`.

### Overrides npm equivalenti alle resolutions canoniche

```bash
(cd frontend && node - <<'NODE'
const l = require('./package-lock.json');
const expected = {
  'node_modules/@eslint/plugin-kit': '0.3.4',
  'node_modules/postcss': '8.5.10',
  'node_modules/uuid': '11.1.1',
  'node_modules/undici': '6.27.0',
  'node_modules/tar': '7.5.19',
  'node_modules/shell-quote': '1.9.0',
  'node_modules/@eslint/eslintrc/node_modules/js-yaml': '4.3.0',
  'node_modules/@expo/xcpretty/node_modules/js-yaml': '4.3.0',
  'node_modules/@istanbuljs/load-nyc-config/node_modules/js-yaml': '3.15.0'
};
for (const [path, version] of Object.entries(expected)) {
  if (l.packages[path]?.version !== version) process.exitCode = 1;
  console.log(path, l.packages[path]?.version);
}
NODE
)
```

- **Exit code:** `0`
- **Risultato:** tutte le nove versioni transitive coincidono con le risoluzioni canoniche.

### Lint first-party equivalente al workflow

```bash
(cd frontend && ./node_modules/.bin/eslint app src)
```

- **Exit code:** `0`
- **Risultato:** zero errori; un warning preesistente per `Text` inutilizzato in `app/index.tsx`.

### Integrità del diff

```bash
git diff --check
```

- **Exit code:** `0`.

### Identità immutabile dei file, Expo Doctor e lint remoti senza build EAS

- **Run finale:** [NEXO TestFlight #11](https://github.com/UnNickk76/NEXO-VEO-VISION/actions/runs/32472238247)
- **Job:** `96741261097`, conclusione `success`
- **Commit del workflow effimero:** `cd4f8edf1baf97476f14390104bff6333bb5cb81`
- **SHA immutabile della coppia nella PR:** `49124bfa1a5030291f948b71862757a8041cda5f`
- **SHA immutabile della coppia sottoposta a Doctor/lint:** `8586ca2dbb9f348c244143bdcd8bd7a2eb6b0c46`
- **Comando realmente eseguito dal job, dalla radice del repository:**

```bash
set -euo pipefail
for path in frontend/package.json frontend/package-lock.json; do
  file="$(basename "$path")"
  curl -fsSL "https://raw.githubusercontent.com/UnNickk76/NEXO-VEO-VISION/49124bfa1a5030291f948b71862757a8041cda5f/$path" -o "/tmp/pr-$file"
  curl -fsSL "https://raw.githubusercontent.com/UnNickk76/NEXO-VEO-VISION/8586ca2dbb9f348c244143bdcd8bd7a2eb6b0c46/$path" -o "/tmp/verified-$file"
  cmp -s "/tmp/pr-$file" "/tmp/verified-$file"
  printf '%s identical; sha256=' "$path"
  sha256sum "/tmp/pr-$file" | cut -d' ' -f1
done
```

- **Exit code del passo:** `0`
- **Risultati individuali:**
  - `frontend/package.json`: identico, SHA-256 `fc9dbcd8b36675978eaaa63b7e1e7ce320997d0bd6b2ccdebe88bfb9a0eca2ea`;
  - `frontend/package-lock.json`: identico, SHA-256 `ec5e7e9de927450ca422d7d5aa3a8441e07b7610f499e26cba096d01d725be6a`.
- **Expo Doctor:** exit `0`, output `18/18 checks passed. No issues detected!`
- **Lint:** exit `0`, zero errori e un warning preesistente.
- **Guardia costi:** il workflow effimero si è arrestato dopo Doctor/lint; EAS Build non è stato eseguito.

Due tentativi precedenti del solo ramo effimero (`32469244624` e `32469972795`) non sono partiti per una sintassi YAML errata introdotta nel meccanismo temporaneo di verifica. Non riguardano il workflow su `main`, non hanno eseguito EAS e sono stati sostituiti dalla run finale riuscita sopra indicata.

## Commit creati

La PR contiene i seguenti commit già materializzati prima dell'ultimo aggiornamento del rapporto:

- `525ed458f554b91f1619370a0d6921171dcc6674` — allineamento dipendenze Expo;
- `f5785c0950910acc288281d10a63e89cc4ec16bf` — lockfile npm iniziale;
- `1495198428039d0cf8bcaa1556eca25c2004dbc6`, `9282f82c80733f61d7dfdee8cba84fd8adaa95b6`, `1bdfd4c6629a15bb6238152e6867910333be35d4` — rapporto iniziale, `LATEST.md` e cruscotto;
- `ec96fdb3ad9415b20e6cc34e0e2ab9963d6a91fc`, `70c5a72c9cfea4ad0efbd35749749c718b2e738f`, `d16a994041a0354dcd96446a7c710fc19b330af1` — evidenza remota iniziale;
- `ebfee1ef0d80467a7a2ad7851330c05959235cb3`, `49124bfa1a5030291f948b71862757a8041cda5f` — overrides npm e lockfile finale;
- `41e1a7f561ffd1eeae177083adc113323f81ab7c`, `7a480f6e8cb82f819b262ebebe24cbfe405e49f9`, `21251cd85b4079b1bdea3638aa0d7826684921c8` — consolidamento delle evidenze finali nei documenti.

Il commit che contiene la presente correzione del rapporto è indicato nella cronologia della PR #13 e sulla Coordination Board: il suo SHA non può essere incorporato nello stesso contenuto prima della creazione del commit senza una dipendenza circolare.

## Fatti verificati, deduzioni e dati non verificabili

### Verificato realmente

- Le versioni finali installate, gli overrides, l'installazione pulita, lint ed Expo Doctor sono stati controllati con i comandi e gli esiti individuali sopra riportati.
- La run remota finale ha usato contenuti di `package.json` e `package-lock.json` identici a quelli della PR, verificati con SHA immutabili, `cmp` e SHA-256 riproducibili sopra riportati.
- La build EAS, la firma Apple e l'invio TestFlight non sono stati eseguiti dalla run di verifica.

### Dedotto

- Poiché il workflow su `main` esegue gli stessi passi `npm install`, `npx expo-doctor` e lint prima di EAS, è ragionevole attendersi che superi il precedente blocco Expo Doctor. Questa è una deduzione e non viene registrata come esito della futura run su `main`.

### Non verificato

- Non sono ancora verificati su `main`: disponibilità di `EXPO_TOKEN`, autenticazione EAS, generazione dell'IPA, firma Apple, auto-submit e comparsa della build in TestFlight.

## Errori, warning e problemi non risolti

- Warning preesistente: import `Text` inutilizzato in `frontend/app/index.tsx`; zero errori lint.
- Warning infrastrutturale remoto: alcune action Node 20 vengono forzate su Node 24 dal runner GitHub; non ha causato il fallimento.
- I due tentativi effimeri con YAML errato sono dichiarati sopra; la run finale li sostituisce.
- Problemi ancora aperti: review sullo SHA finale, merge e pipeline TestFlight reale su `main`.

## Dipendenze, credenziali, rischi e decisioni

- **Dipendenze ancora necessarie:** nessuna ulteriore dipendenza nota per superare Expo Doctor.
- **Credenziali ancora necessarie:** `EXPO_TOKEN` e credenziali Apple/EAS configurate nel servizio; presenza e validità non sono state ispezionate né esposte.
- **Rischi tecnici:** un blocco successivo può emergere soltanto nei passi EAS/firma/submit non ancora raggiunti; il warning lint resta debito preesistente fuori perimetro.
- **Decisioni richieste a Fabio:** nessuna ora. Se la pipeline successiva richiederà un intervento Apple/Expo, verrà indicato un singolo gesto preciso senza chiedere o mostrare segreti.

## Limiti e verifiche ancora obbligatorie

- L'ambiente locale ha negato la rete richiesta da Expo Doctor prima dell'esecuzione; non viene dichiarato superato localmente, ma è superato nella run remota sopra documentata.
- La prima Codex Review ha rilevato due problemi reali: stato finale non canonico e mancata equivalenza tra `resolutions` Yarn e lockfile npm. Entrambi sono stati corretti; la nuova review sullo SHA corrente, il merge e la nuova run TestFlight su `main` non sono ancora conclusi e non vengono anticipati.

## Prossimo passo

Attendere la Codex Review sullo SHA corrente e unire soltanto se è pulita e la PR è unibile. Dopo il merge, controllare il punto esatto raggiunto dalla nuova pipeline TestFlight.
