# Correzione integrale Codex Review PR #6 e auto-merge fail-safe

## Dati dell'attività

- **Data e ora UTC:** 2026-08-20 21:26:29 UTC
- **Obiettivo richiesto:** correggere P1/P2 della Codex Review PR #6, separare le tre dimensioni del VEO Context, rendere condizionale la corsia, rendere riproducibili i report e impedire merge automatici prima della review Codex.
- **Stato finale:** completato
- **Ramo utilizzato:** `work`
- **Commit creati:** il commit viene creato dopo questo rapporto; hash non disponibile nel contenuto del commit stesso.
- **Pull request:** richiesta dopo il commit con titolo `fix(ci): require completed Codex review before safe auto-merge`; URL/numero non disponibili alla redazione. Deve restare non draft e a merge manuale perché modifica `.github/workflows/codex-auto-merge.yml`.

## File creati, modificati o eliminati

### Creati
- `scripts/check_codex_review_safety.py`
- `docs/codex-reports/2026-08-20_212629_codex-review-pr6-auto-merge-sicuro.md`

### Modificati
- `.github/workflows/codex-auto-merge.yml`
- `AGENTS.md`
- `docs/architecture/adr/0001-f0-boundaries.md`
- `docs/architecture/canonical-vocabulary.md`
- `docs/codex-reports/LATEST.md`

### Eliminati
- Nessuno.

## Modifiche concrete

- VEO Context ora separa Availability, Provenance/Derivation e Verification Status; inferenza e verifica possono coesistere e l'assenza non è verifica.
- Road Object richiede la corsia solo quando determinabile e vieta di inventarla.
- `AGENTS.md` richiede comando/invocazione, input/pattern/assertion, exit code, risultato e limiti per ogni controllo. I vecchi rapporti non sono stati modificati; questo rapporto registra che le descrizioni generiche del rapporto PR #6 non erano riproducibili.
- Il job con permessi `contents: write`/`pull-requests: write` e `gh pr merge --auto` è stato eliminato. Eligibility, filtro percorsi e validazioni lint/typecheck/test/build restano. In assenza di un segnale Codex verificabile, ogni merge è manuale.
- Aggiunto uno script Python standard-library, non distruttivo, che verifica otto scenari, permessi read-only, assenza del comando di merge e conservazione delle protezioni.
- Non sono stati creati schemi runtime e F0 non è dichiarata completata.

## Analisi del segnale Codex e documentazione

Le API pubbliche REST hanno mostrato per PR #5 e #6 una review `COMMENTED` del bot e commenti inline P1/P2; le PR risultavano già unite. Il testo del bot afferma che in assenza di suggerimenti Codex aggiunge una reazione 👍, anziché una review. Non è stato verificato un check/status o evento Actions affidabile che distingua review non iniziata, review pulita e thread irrisolti. La REST Reviews API espone review, mentre lo stato `isResolved` dei thread appartiene al modello GraphQL; ciò non fornisce da solo un segnale di completamento pulito né un trigger verificato. Perciò l'unica implementazione dimostrabilmente fail-safe è disabilitare l'auto-merge e mantenere la validazione.

Documentazione consultata: GitHub Actions `pull_request_target`, sintassi `permissions`, REST pull request reviews e oggetto GraphQL `PullRequestReviewThread`. Il download HTML ha avuto esito HTTP positivo, ma non è stato possibile certificare dall'ambiente un'integrazione specifica Codex/GitHub oltre ai dati API osservati.

## Comandi realmente eseguiti prima dei controlli conclusivi

- Letture: `cat AGENTS.md`, `cat docs/codex-reports/LATEST.md`, `cat` di tutti i file restituiti da `find docs/architecture -type f -print | sort`, e `cat .github/workflows/codex-auto-merge.yml`.
- Review: `curl -fsSL "https://api.github.com/repos/UnNickk76/NEXO-VEO-VISION/$endpoint" | jq ...` per `pulls/{5,6}/comments`, `pulls/{5,6}/reviews`, `issues/{5,6}/comments` e `pulls/{5,6}`.
- Documentazione: `curl -LfsS` sugli URL ufficiali GitHub Actions/REST/GraphQL indicati sopra.
- Actionlint: `url=$(curl -fsSL https://api.github.com/repos/rhysd/actionlint/releases/latest | jq -r '.assets[] | select(.name|test("_linux_amd64.tar.gz$")) | .browser_download_url'); curl -fsSL "$url" | tar -xz -C /tmp/actionlint; /tmp/actionlint/actionlint .github/workflows/codex-auto-merge.yml`.

## Test e controlli conclusivi realmente eseguiti

| Controllo (comando esatto) | Exit code | Risultato individuale / limiti |
| --- | ---: | --- |
| `ruby -e 'require "yaml"; doc=YAML.safe_load(File.read(".github/workflows/codex-auto-merge.yml"), aliases: true); abort "jobs missing" unless doc["jobs"].is_a?(Hash); puts "PASS: YAML parsed, #{doc["jobs"].size} jobs"'` | 0 | Superato: YAML valido, 2 job. Usa Ruby/Psych 3.4.4 dell'ambiente. |
| `/tmp/actionlint/actionlint .github/workflows/codex-auto-merge.yml` | 0 | Superato: sintassi/espressioni Actions accettate da actionlint 1.7.12 scaricato dalla release ufficiale; non equivale a un'esecuzione GitHub hosted. |
| `python3 scripts/check_codex_review_safety.py` | 0 | Superato: assertion versionate per review non iniziata, pulita, P1/P2, thread irrisolto, draft, fork, altro autore, file sensibile; verifica permissions, filtri e lint/typecheck/test/build. Nei primi quattro casi la validazione può partire ma il merge resta impossibile. |
| `python3 - <<'PY'` con assertion dei termini esatti `Availability`, `available`, `unavailable`, `unknown`, `Provenance/Derivation`, `official`, `provider`, `community`, `observed`, `inferred`, `simulated`, `Verification Status`, `unverified`, `corroborated`, `verified`, `disputed`, `expired` in ADR e vocabolario, più assenza della stringa ``stato `verified`, `inferred` o `unavailable` `` `PY` | 0 | Superato: tre dimensioni separate e coerenti. Input completi esplicitati nel comando. |
| `python3 - <<'PY'` con assertion delle frasi `corsia è obbligatoria`, `facoltativa o non applicabile`, `non deve mai essere inventata` (ADR) e `corsia è obbligatoria solo quando determinabile`, `facoltativa o non applicabile`, `non va mai inventata` (vocabolario) `PY` | 0 | Superato: condizionalità coerente senza campo inventato. |
| `git diff --cached --name-only` | 0 | Superato: elenco esatto corrispondente ai sette file dichiarati sopra. |
| `! git diff --cached --no-ext-diff -U0 | rg -ni '(BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY|(api[_-]?key|token|password|secret)[[:space:]]*[:=][[:space:]]*[A-Za-z0-9_/-]{16,})'` | 0 | Superato: nessuna corrispondenza nel diff staged. Pattern riportato integralmente; controllo euristico, non sostituisce secret scanning remoto. |
| `git diff --cached --check` | 0 | Superato: nessun errore whitespace. |
| `cmp -s <(tail -n +3 docs/codex-reports/LATEST.md) docs/codex-reports/2026-08-20_212629_codex-review-pr6-auto-merge-sicuro.md` | 0 | Superato: rapporto completo identico dopo intestazione/percorso di `LATEST.md`. |
| `test "$(git diff --cached --name-only | wc -l)" -eq 7 && git diff --cached --name-only | diff -u - <(printf '%s\n' '.github/workflows/codex-auto-merge.yml' 'AGENTS.md' 'docs/architecture/adr/0001-f0-boundaries.md' 'docs/architecture/canonical-vocabulary.md' 'docs/codex-reports/2026-08-20_212629_codex-review-pr6-auto-merge-sicuro.md' 'docs/codex-reports/LATEST.md' 'scripts/check_codex_review_safety.py')` | 0 | Superato: perimetro esatto, nessun frontend/backend/mobile/dipendenza/lockfile e rapporti inclusi insieme. |

## Verificato realmente

- Thread completi accessibili PR #5/#6, timestamp di merge e review REST del bot.
- Workflow finale parsabile, validato staticamente, senza permessi write o comando auto-merge.
- Filtri su draft, autore, fork/repository, base/ramo e percorsi protetti conservati; controlli frontend disponibili conservati.
- Coerenza ADR/vocabolario, corsia condizionale, tre dimensioni VEO Context, file staged, segreti euristici, whitespace e identità dei rapporti.

## Dedotto

- L'assenza del job di merge impedisce a questo workflow di unire PR; altre automazioni o utenti con privilegi restano fuori dal suo controllo.
- Un futuro segnale potrebbe consentire riattivazione sicura solo se documenta commit revisionato, completamento pulito e zero thread Codex irrisolti, e genera un evento affidabile per rivalutare lo stesso SHA.

## Non è stato possibile verificare

- Un segnale Codex machine-readable affidabile per tutti e tre gli stati richiesti: non individuato né documentato nell'ambiente.
- Esecuzione reale su runner GitHub e branch protection del repository.
- Stato clean della Codex Review della nuova PR, URL/numero PR e merge manuale, disponibili solo dopo pubblicazione.

## Errori e warning rilevati

- La ricerca web integrata ha restituito HTTP 401; sono state usate API pubbliche e documentazione ufficiale via `curl`.
- Il primo tentativo di download actionlint cercava erroneamente un asset con pattern `linux_x86_64` e ha fallito; corretto a `_linux_amd64`, poi actionlint è stato eseguito con exit 0.
- PyYAML non è installato; il parsing YAML usa Ruby/Psych già disponibile.

## Problemi non risolti, dipendenze e credenziali

L'auto-merge rimane volutamente disabilitato. Per riattivarlo servono un contratto ufficiale verificabile del segnale Codex, un trigger affidabile, binding allo SHA e interrogazione dei thread irrisolti, più test su GitHub. Nessun segreto è richiesto dalle modifiche. Pubblicare la PR richiede l'integrazione dell'ambiente; GitHub CLI locale non è autenticata.

## Rischi tecnici

- I controlli sono statici e non provano comportamento hosted o protezioni configurate fuori Git.
- La scansione segreti è euristica.
- Il workflow `pull_request_target` resta sicuro rispetto al codice non fidato perché il job con token PR legge solo metadati e il checkout dello SHA della PR avviene nel job con solo `contents: read` e `persist-credentials: false`.

## Prossimo passo consigliato

Aprire la PR non draft e lasciarla al merge manuale dopo Codex Review e risoluzione esplicita dei thread. Valutare la riattivazione automatica solo dopo disponibilità e test del segnale completo sopra descritto.

## Decisioni richieste a Fabio

Nessuna per applicare il blocco fail-safe. Fabio dovrà approvare esplicitamente una futura integrazione machine-readable prima di riabilitare l'auto-merge; F0 resta aperta.
