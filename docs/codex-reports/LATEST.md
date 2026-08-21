Rapporto storico: `docs/codex-reports/2026-08-21_093545_fix-expo-sdk54-testflight.md`

# Ripristino Expo Doctor per TestFlight

## Dati dell'attività

- **Data e ora UTC:** 2026-08-21 09:35:45 UTC
- **Obiettivo:** correggere il mismatch Expo SDK 54 che ha bloccato la pipeline TestFlight dopo il merge della PR #9, senza disabilitare Expo Doctor.
- **Stato:** in review; dipendenze e lockfile corretti, Expo Doctor remoto superato, merge ancora vietato fino a review pulita sullo SHA corrente.
- **Branch:** `codex/fix-expo-sdk54-testflight`
- **Pull request:** [PR #13](https://github.com/UnNickk76/NEXO-VEO-VISION/pull/13)
- **SHA PR esaminato:** `1bdfd4c6629a15bb6238152e6867910333be35d4`
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
- **Risultato:** 936 package installati; nessun errore di installazione.

### Versioni registrate nel lockfile

```bash
node -e "const l=require('./package-lock.json'); for (const p of ['node_modules/expo','node_modules/expo-constants']) console.log(p,l.packages[p].version)"
```

- **Exit code:** `0`
- **Output:** `expo 54.0.37`; `expo-constants 18.0.14`.

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

- **Run:** [NEXO TestFlight #8](https://github.com/UnNickk76/NEXO-VEO-VISION/actions/runs/32470136178)
- **Job:** `96735005038`, conclusione `success`
- **Commit di verifica:** `25e693ec645b527b5907cf8ca76a715939fa2eb8`
- **Expo Doctor:** exit `0`, output `18/18 checks passed. No issues detected!`
- **Lint:** exit `0`, zero errori e un warning preesistente.
- **Guardia costi:** il workflow effimero si è arrestato dopo Doctor/lint; EAS Build non è stato eseguito.
- **Identità del contenuto verificato:** i blob `frontend/package.json` (`127762b83448e4ea81f0b18599f3676c5178e65c`) e `frontend/package-lock.json` (`e21e663bc294ea6aff243c73e009c4f4ec1f2b82`) sono identici tra il commit di verifica e lo SHA della PR #13.

## Limiti e verifiche ancora obbligatorie

- L'ambiente locale ha negato la rete richiesta da Expo Doctor prima dell'esecuzione; non viene dichiarato superato localmente, ma è superato nella run remota sopra documentata.
- La Codex Review sullo SHA corrente, il merge e la nuova run TestFlight su `main` non sono ancora conclusi e non vengono anticipati.

## Prossimo passo

Attendere la Codex Review sullo SHA corrente e unire soltanto se è pulita e la PR è unibile. Dopo il merge, controllare il punto esatto raggiunto dalla nuova pipeline TestFlight.
