Rapporto storico: `docs/codex-reports/2026-08-21_082215_riallineamento-pr9-testflight.md`

# Riallineamento della PR #9 e prima build visibile su TestFlight

## Dati dell'attività

- **Data e ora UTC:** 2026-08-21 08:22:15 UTC
- **Obiettivo:** recuperare la PR #9 dopo il merge della PR #10, correggere i due rilievi P1 e predisporre una build iOS realmente inviata a TestFlight.
- **Stato finale:** parziale; modifiche e controlli locali completati, pubblicazione e nuova review ancora da eseguire.
- **Ramo locale:** `pr9-realigned`, derivato da `main` allo SHA `17b798bc1bc34e4597b16028957940aed81fc153`.
- **Ramo della PR:** `codex/testflight-first-visible-build`.
- **Commit funzionali remoti creati:** `d11b526abb45239b6d537d33fdfa4f75726a77d4` (`ci: realign first TestFlight build with main`) e `a322b857e37bf0690579a8e256836803ca40ae4d` (`fix(ios): preserve visible startup failures`).
- **Commit locale equivalente usato per i controlli preliminari:** `a1f13b5260c13d8af97b3d0fdd4322c0d29a0ed0`.
- **Pull request:** [PR #9](https://github.com/UnNickk76/NEXO-VEO-VISION/pull/9).
- **Costi:** nessuna spesa.

## File modificati

- `.github/workflows/testflight.yml`
- `frontend/app/_layout.tsx`
- `Fabio/FABIO_CONTROLLO.md`
- `docs/codex-reports/LATEST.md`

## File creato

- `docs/codex-reports/2026-08-21_082215_riallineamento-pr9-testflight.md`

## Modifiche concrete

- Ricostruito il lavoro della PR #9 sopra il `main` corrente, senza incorporare né sovrascrivere il lavoro concettuale della PR #10.
- Il workflow si attiva manualmente e dopo modifiche pertinenti confluite in `main`, installa le dipendenze, esegue Expo Doctor e lint limitato al codice applicativo proprietario, verifica la presenza di `EXPO_TOKEN`, costruisce iOS e attende l'invio automatico a TestFlight.
- Lo splash non nasconde più globalmente i log e gestisce esplicitamente le promise native rifiutate, così un errore iniziale non blocca la prima schermata né diventa invisibile.
- Il lint è limitato a `app` e `src`: il repository contiene anche codice vendorizzato in `frontend/scripts/cmd-guard/vendor/`, non appartenente a questa attività e non conforme alle regole ESLint dell'app.
- Il precedente rapporto storico della PR #9 resta immutato. Questo nuovo rapporto corregge le sue lacune documentando sorgente, identità del commit, perimetro e cronologia completa.

## Provenienza e materializzazione verificate

- Repository clonato: `https://github.com/UnNickk76/NEXO-VEO-VISION.git`.
- Base materializzata: commit `17b798bc1bc34e4597b16028957940aed81fc153` di `main`.
- Commit remoto funzionale controllato dopo il riallineamento: `a322b857e37bf0690579a8e256836803ca40ae4d`.
- Radice della materializzazione: checkout Git del repository; i controlli leggono direttamente i percorsi versionati `.github/workflows/testflight.yml` e `frontend/app/_layout.tsx` dello stesso commit.
- Identità preliminare verificata localmente con `git rev-parse HEAD`, `git show --format='%H %s' --no-patch HEAD` e `git diff-tree --no-commit-id --name-status -r HEAD`.
- Identità remota verificata rileggendo entrambi i file con `github_fetch_file(..., ref="a322b857e37bf0690579a8e256836803ca40ae4d", encoding="utf-8")`: contenuti identici byte per byte alla materializzazione controllata; blob `d20222118fd5528545d0c9b9b9d2c9e14dd33499` e `76d95c055af10c8106348a0792f3f87f42a7a9ff`.

## Cronologia completa del precedente ramo PR #9

La materializzazione del vecchio ramo remoto prima del riallineamento conteneva, in ordine:

1. `5d3d572b548827ccaa5212d92ad66d49fce366b4` — `ci: build and submit iOS app to TestFlight`
2. `d51f1b0caea9549c50175ffe4a80e926b1104da6` — `fix(ios): keep startup errors visible`
3. `f95d7f4d4c670f5e39758eab56e116fbab5e1679` — `docs: record TestFlight preparation`
4. `79712df8205ae7e1a6c3fe9b2840765535029efb` — `docs: update latest TestFlight status`
5. `538df863435dd8cc7728c47dab622c3d7e890edf` — `docs: update Fabio TestFlight dashboard`
6. `f414bd14ccfa567dfdc2eedb5598cb79b2d7445d` — `fix(ci): include every frontend build input`
7. `87029b691c55f2e4432cd6988fdbab27d7da2fa6` — `docs: record reproducible TestFlight checks`
8. `00def1d7077dbbe84a4ef2f7e966b0f275525197` — `docs: mirror reproducible TestFlight report`
9. `6afdcca36b3b4bd77d5dc352521919b3b216588e` — `docs: record PR 9 review outcomes for Fabio`
10. `b187154f370fc2513e3e19e6a4cbcd448fbab849` — `fix(docs): clarify guarded manual merge state`
11. `db924d91e16d40b099422977ea179d5ee999682e` — `fix(audit): make secret scan evidence fail-safe`
12. `2a4f400833e9cef0fc58afa709ed26559f6e9348` — `docs: sync latest TestFlight report`

Il contenuto funzionale rilevante è stato ricostruito in un nuovo commit lineare sopra `main`; la cronologia precedente viene preservata con un ramo di backup prima dell'aggiornamento remoto.

## Comandi realmente eseguiti e risultati

### Dipendenze

```bash
npm install --cache /tmp/nexo-pr9-npm-cache
```

- **Directory:** `frontend`
- **Exit code:** `0`
- **Risultato:** 933 pacchetti installati; warning di deprecazione presenti. Il `package-lock.json` generato localmente non è stato incluso perché il progetto dichiara Yarn e il vecchio ramo non lo versionava.

### Lint applicativo

```bash
node_modules/.bin/eslint app src
```

- **Exit code:** `0`
- **Risultato:** zero errori; un warning preesistente per l'import `Text` inutilizzato in `frontend/app/index.tsx`.

### Controllo statico riproducibile

```bash
python3 - <<'PY'
from pathlib import Path
import re
import yaml
workflow = Path('.github/workflows/testflight.yml').read_text()
layout = Path('frontend/app/_layout.tsx').read_text()
data = yaml.safe_load(workflow)
assert data['jobs']['build-and-submit-ios']['timeout-minutes'] == 90
assert 'push' in data[True] and 'workflow_dispatch' in data[True]
assert 'frontend/**' in data[True]['push']['paths']
for needle in ('npx expo-doctor', 'npx expo lint app src', 'EXPO_TOKEN', '--wait --auto-submit'):
    assert needle in workflow, needle
assert 'LogBox.ignoreAllLogs' not in layout
assert 'preventAutoHideAsync().catch' in layout
assert 'hideAsync().catch' in layout
patterns = {
    'private_key': r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',
    'github_token': r'gh[pousr]_[A-Za-z0-9_]{20,}',
    'expo_token_literal': r'EXPO_TOKEN\s*[:=]\s*["\'][^$][^"\']+["\']',
}
for path, text in [('.github/workflows/testflight.yml', workflow), ('frontend/app/_layout.tsx', layout)]:
    for name, pattern in patterns.items():
        assert not re.search(pattern, text), f'{name} in {path}'
print('PASS yaml, semantics, startup and secret patterns')
PY
```

- **Exit code:** `0`
- **Risultati individuali:** YAML valido; trigger, timeout, doctor, lint, guardia token, attesa e auto-submit presenti; soppressione globale log assente; promise splash gestite; nessuna chiave privata, token GitHub o valore letterale di `EXPO_TOKEN` nei due file.

### Perimetro e integrità Git

```bash
git diff-tree --no-commit-id --name-status -r HEAD
git show --format='%H %s' --no-patch HEAD
git diff --check HEAD^
git status --short --branch
```

- **Exit code complessivo:** `0`
- **Risultato:** il commit funzionale contiene soltanto workflow e layout; nessun errore whitespace; working tree pulito prima dei file di rapporto.

### Specchio del rapporto e perimetro finale

```bash
git diff --check
cmp -s docs/codex-reports/2026-08-21_082215_riallineamento-pr9-testflight.md docs/codex-reports/LATEST.md
python3 - <<'PY'
from pathlib import Path
import subprocess
allowed = {
 '.github/workflows/testflight.yml',
 'frontend/app/_layout.tsx',
 'Fabio/FABIO_CONTROLLO.md',
 'docs/codex-reports/LATEST.md',
 'docs/codex-reports/2026-08-21_082215_riallineamento-pr9-testflight.md',
}
paths = set(subprocess.check_output(['git','diff','--name-only','HEAD^'], text=True).splitlines())
paths.update(subprocess.check_output(['git','ls-files','--others','--exclude-standard'], text=True).splitlines())
assert paths == allowed, (paths, allowed)
report = Path('docs/codex-reports/2026-08-21_082215_riallineamento-pr9-testflight.md').read_text()
for heading in ("## Dati dell'attività", '## File modificati',
                '## Comandi realmente eseguiti e risultati', '## Verificato realmente',
                '## Dedotto', '## Non verificato', '## Problemi non risolti',
                '## Prossimo passo consigliato'):
    assert heading in report, heading
print('PASS perimeter: exactly five allowed paths')
print('PASS report: required audit sections present')
PY
```

- **Exit code individuali:** `git diff --check` = `0`; `cmp` = `0`; script Python = `0`.
- **Risultati:** rapporto storico e `LATEST.md` identici byte per byte; esattamente cinque percorsi autorizzati; sezioni obbligatorie presenti.

## Verificato realmente

- Le dipendenze si installano nell'ambiente locale.
- Il lint del codice applicativo termina senza errori.
- Il workflow è YAML valido e contiene tutti i passi dichiarati.
- Il commit funzionale è basato sul `main` che include la PR #10.

## Dedotto

- Dopo il merge, il trigger `push` dovrebbe avviare il workflow perché la PR modifica sia il workflow sia `frontend/**`.
- Con `EXPO_TOKEN` valido e credenziali Apple/EAS già configurate, EAS dovrebbe costruire e inviare la build a TestFlight.

## Non verificato

- Expo Doctor non ha potuto completare localmente perché richiede accesso di rete Expo non disponibile in questo ambiente; verrà eseguito dal workflow GitHub.
- Non è stato letto né verificato il valore di `EXPO_TOKEN`.
- Non sono state verificate credenziali Apple, firma, disponibilità EAS, build iOS o presenza della build in TestFlight.
- La nuova Codex Review e i controlli GitHub sul futuro SHA remoto non sono ancora disponibili.

## Errori e warning

- Il primo `npm install` è fallito perché la cache predefinita `/root/.npm` non era scrivibile; il comando ripetuto con cache in `/tmp` è riuscito.
- Il lint completo della radice frontend trova 19 errori `no-var` nel codice vendorizzato del command guard; per questo il controllo della PR è stato correttamente ristretto al codice applicativo `app` e `src`.
- Un warning applicativo preesistente riguarda `Text` inutilizzato in `frontend/app/index.tsx`.
- Due prime formulazioni del controllo di perimetro non includevano rispettivamente i file già commitati e il nuovo file non tracciato; sono fallite e sono state sostituite dal comando completo sopra, che combina diff e file non tracciati.

## Problemi non risolti

- Pubblicare il ramo riallineato, ottenere una review pulita sul nuovo SHA e verificare i check GitHub.
- Solo dopo il merge sarà possibile osservare l'esito reale della build e dell'invio.

## Dipendenze o credenziali

- Segreto GitHub `EXPO_TOKEN` valido.
- Credenziali Apple/EAS già associate al progetto Expo; nessun segreto deve essere copiato nel repository.

## Rischi tecnici

- Un token mancante o credenziali Apple incomplete bloccheranno il workflow prima o durante EAS.
- La disponibilità di Expo/EAS e Apple è esterna al repository.
- Una build riuscita non dimostra ancora il completamento delle funzioni concettuali dell'app.

## Prossimo passo consigliato

Pubblicare il nuovo ramo nella PR #9, richiedere Codex Review sullo SHA corrente, unire soltanto con review pulita e controlli superati, quindi leggere il run TestFlight e documentare l'eventuale singolo blocco manuale.

## Decisioni richieste a Fabio

Nessuna prima dell'esito del workflow. Se EAS segnala credenziali Apple mancanti, il cruscotto indicherà un solo gesto manuale preciso.
