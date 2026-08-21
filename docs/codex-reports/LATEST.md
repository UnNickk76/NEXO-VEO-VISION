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

### Matrice Expo SDK 54 finale

```bash
__UNSAFE_EXPO_HOME_DIRECTORY=/tmp/nexo-expo-home EXPO_NO_TELEMETRY=1 ./node_modules/.bin/expo install --check
```

- **Exit code:** `0`
- **Output conclusivo:** `Dependencies are up to date`.

### Installazione pulita dal lockfile

```bash
npm ci --cache=/tmp/nexo-npm-cache
```

- **Exit code:** `0`
- **Risultato finale:** 938 package installati; nessun errore di installazione.

### Versioni registrate nel lockfile

```bash
node -e "const l=require('./package-lock.json'); for (const p of ['node_modules/expo','node_modules/expo-constants']) console.log(p,l.packages[p].version)"
```

- **Exit code:** `0`
- **Output:** `expo 54.0.37`; `expo-constants 18.0.14`.

### Overrides npm equivalenti alle resolutions canoniche

```bash
node - <<'NODE'
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
```

- **Exit code:** `0`
- **Risultato:** tutte le nove versioni transitive coincidono con le risoluzioni canoniche.

### Lint first-party equivalente al workflow

```bash
./node_modules/.bin/eslint app src
```

- **Exit code:** `0`
- **Risultato:** zero errori; un warning preesistente per `Text` inutilizzato in `app/index.tsx`.

### Integrità del diff

```bash
git diff --check
```

- **Exit code:** `0`.

### Expo Doctor e lint remoti senza build EAS

- **Run finale:** [NEXO TestFlight #10](https://github.com/UnNickk76/NEXO-VEO-VISION/actions/runs/32470746191)
- **Job:** `96736897331`, conclusione `success`
- **Commit effimero di verifica:** `8586ca2dbb9f348c244143bdcd8bd7a2eb6b0c46`
- **Expo Doctor:** exit `0`, output `18/18 checks passed. No issues detected!`
- **Lint:** exit `0`, zero errori e un warning preesistente.
- **Guardia costi:** il workflow effimero si è arrestato dopo Doctor/lint; EAS Build non è stato eseguito.
- **Identità del contenuto verificato:** confronto byte-per-byte del contenuto base64 restituito dall'API GitHub per `frontend/package.json` e `frontend/package-lock.json` sui branch `codex/fix-expo-sdk54-testflight` e `codex/verify-pr13-expo-doctor`: entrambi `true` (lunghezze base64 rispettivamente `3304` e `657228`).

Due tentativi precedenti del solo ramo effimero (`32469244624` e `32469972795`) non sono partiti per una sintassi YAML errata introdotta nel meccanismo temporaneo di verifica. Non riguardano il workflow su `main`, non hanno eseguito EAS e sono stati sostituiti dalla run finale riuscita sopra indicata.

## Limiti e verifiche ancora obbligatorie

- L'ambiente locale ha negato la rete richiesta da Expo Doctor prima dell'esecuzione; non viene dichiarato superato localmente, ma è superato nella run remota sopra documentata.
- La prima Codex Review ha rilevato due problemi reali: stato finale non canonico e mancata equivalenza tra `resolutions` Yarn e lockfile npm. Entrambi sono stati corretti; la nuova review sullo SHA corrente, il merge e la nuova run TestFlight su `main` non sono ancora conclusi e non vengono anticipati.

## Prossimo passo

Attendere la Codex Review sullo SHA corrente e unire soltanto se è pulita e la PR è unibile. Dopo il merge, controllare il punto esatto raggiunto dalla nuova pipeline TestFlight.
