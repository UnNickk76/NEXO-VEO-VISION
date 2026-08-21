Rapporto storico: `docs/codex-reports/2026-08-21_093545_fix-expo-sdk54-testflight.md`

# Ripristino Expo Doctor per TestFlight

## Dati dell'attività

- **Data e ora UTC:** 2026-08-21 09:35:45 UTC
- **Obiettivo:** correggere il mismatch Expo SDK 54 che ha bloccato la pipeline TestFlight dopo il merge della PR #9, senza disabilitare Expo Doctor.
- **Stato:** in corso; dipendenze e lockfile corretti, verifica remota Expo Doctor ancora necessaria prima del merge.
- **Branch:** `codex/fix-expo-sdk54-testflight`
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

## Limiti e verifiche ancora obbligatorie

- L'ambiente locale ha negato la rete richiesta da Expo Doctor prima dell'esecuzione; **Expo Doctor non viene dichiarato superato localmente**.
- Prima del merge deve essere eseguito realmente su GitHub Actions sullo SHA finale e deve terminare con exit code `0`.
- PR, SHA finale, Codex Review, merge e nuova run TestFlight verranno registrati quando esistono; non sono anticipati.

## Prossimo passo

Pubblicare la PR atomica, eseguire Expo Doctor in GitHub Actions senza avviare una build a pagamento, richiedere Codex Review e unire soltanto dopo entrambi gli esiti puliti. Dopo il merge, controllare il punto esatto raggiunto dalla nuova pipeline TestFlight.
