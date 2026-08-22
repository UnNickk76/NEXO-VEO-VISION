Rapporto storico: `docs/codex-reports/2026-08-22_000500_navigation-domain-core.md`

# NEXO CODEX — F0/F1 Navigation Domain Core

## Dati attività
- Data e ora UTC: 2026-08-22 00:06:00 UTC.
- Incarico: Coordination Board #11, commento `5375694268`.
- Obiettivo richiesto: implementare il primo nucleo canonico di dominio navigazione/routing provider-neutral, testabile e indipendente da provider mappe, UI e blocchi iOS/EAS.
- Stato finale attività: `parziale` — slice F0/F1 implementato e verificato, ma V06/V21/V26/V27/V28 restano parziali e PR #19 attende nuovo verdetto NEXO REVIEW.
- Branch: `nexo-codex/f0-navigation-domain-core`.
- Pull request: PR #19, DRAFT.
- Base verificata: `main` `213fb129201230c3875e5fb8fc157260f995fe04`.
- Ultimo SHA con modifiche funzionali/conceptual/workflow sottoposto a VERIFY: `30200968757d9c1e28e9040317f32d3157a9757d`.

## READ / PLAN / concorrenza verificati
- `AGENTS.md` letto integralmente.
- Coordination Board #11 e direttive correnti verificate.
- PR #18 verificata prima dell'avvio: in seguito NEXO REVIEW l'ha dichiarata CLEAN sullo SHA `1e50e747a60c9ebba0dc98fa6efb136ff456bbf1`; il suo perimetro non è stato modificato da questa attività.
- PR concorrenti #12 Saved Places e #17 Voice Core considerate; questa PR non dipende dai loro branch non mergeati.
- Aree iOS/EAS/TestFlight, Android readiness, credenziali, provider mappe reali, UI e codice degli altri agenti non toccati.

## Commit creati
Ordine cronologico della PR fino al commit di reporting finale:
1. `ccf33e68033756b3f68d9272152e145f367649f7` — `feat(navigation): add provider-neutral domain core`.
2. `6de6ab926f9c28b0b4954f47dd1a90efe7038d57` — `test(navigation): add deterministic domain checker`.
3. `7217c6c2c0cbfa910307b10b509d6b2f940e41d5` — `ci(navigation): verify provider-neutral domain core`.
4. `c08ff7c83c45645a901d72aba276784bdafe89a6` — creazione rapporto storico iniziale.
5. `910d0b49f60cfd65c0f31151eb60d4d701524a0e` — aggiornamento `LATEST.md` iniziale.
6. `aee16726372f58208630f387481c517396695426` — aggiornamento `Fabio/FABIO_CONTROLLO.md` iniziale.
7. `db35335300848841b9730b1061935d7ecb38462f` — estensione temporanea dei path CI per permettere il VERIFY delle correzioni governance.
8. `7fa9b91f8541bfbcb6b4807e642c01c459cd68b4` — aggiornamento conservativo `NEXO_CONCEPTUAL_MASTER.md` per V06/V21/V26/V27/V28.
9. `30200968757d9c1e28e9040317f32d3157a9757d` — ripristino del trigger CI ai soli file funzionali/conceptual/workflow e SHA del VERIFY finale.
10. `HEAD` — commit atomico finale che aggiorna soltanto rapporto storico, `LATEST.md` e `Fabio/FABIO_CONTROLLO.md`; lo SHA esatto è registrato sulla Coordination Board nella riconsegna a NEXO REVIEW per evitare auto-riferimento circolare.

## Elenco completo file creati/modificati nella PR
### File funzionali/infrastrutturali
- `frontend/src/navigation/domain.ts` — creato.
- `frontend/scripts/check-navigation-domain.mjs` — creato.
- `.github/workflows/navigation-domain.yml` — creato e poi riallineato per il VERIFY finale.

### Registro concettuale
- `docs/product/NEXO_CONCEPTUAL_MASTER.md` — modificato conservativamente solo per V06, V21, V26, V27, V28; tutte le caselle restano `[ ]`, stato `parziale`, con evidenze PR/commit/checker/workflow.

### File di reporting
- `docs/codex-reports/2026-08-22_000500_navigation-domain-core.md` — creato e aggiornato.
- `docs/codex-reports/LATEST.md` — aggiornato; deve contenere questa relazione integralmente dopo il percorso iniziale.
- `Fabio/FABIO_CONTROLLO.md` — aggiornato.

### File eliminati
- Nessuno.

## Modifiche concrete
### `frontend/src/navigation/domain.ts`
Introduce i contratti provider-neutral:
- `DestinationRef`;
- `LocationSample`;
- `RouteRequest`;
- `RouteCandidate`;
- `RecalculationRequest`;
- `RoutingAdapter`;
- `NavigationEvent`;
- `NavigationSession`.

State machine esplicita:
- `idle`;
- `planning`;
- `ready`;
- `navigating`;
- `recalculating`;
- `completed`;
- `cancelled`;
- `failed`.

Garanzie del dominio:
- transizioni illegali rifiutate deterministicamente;
- route candidate vincolate al request attivo;
- selezione ammessa solo fra candidati correnti;
- navigazione avviabile solo dopo selezione;
- ricalcolo vincolato a sessione e route attive;
- stati terminali non riapribili;
- candidati copiati e congelati;
- riselezione della stessa route deterministica/idempotente;
- scelta preferita deterministica con fallback;
- nessuna chiamata rete/provider reale.

### `frontend/scripts/check-navigation-domain.mjs`
Checker riproducibile che transpila il dominio TypeScript e verifica:
- lifecycle nominale;
- transizioni illegali;
- candidate/request mismatch;
- route selection;
- requisito di selezione prima dello start;
- idempotenza della riselezione;
- contratto ricalcolo;
- cancel;
- failure;
- terminal-state guard;
- immutabilità dei candidati;
- assenza di riferimenti a provider mappe noti.

### `.github/workflows/navigation-domain.yml`
Workflow CI dedicato, non distruttivo, con:
`npm ci -> npx expo-doctor -> npm run lint -> node scripts/check-navigation-domain.mjs`.
Il trigger finale copre file navigation, checker, conceptual master e workflow. I soli file di reporting non fanno scattare una nuova run, così il report può registrare fedelmente l'ultimo VERIFY senza loop auto-referenziali.

### Registro concettuale
Le righe V06/V21/V26/V27/V28 sono state aggiornate da `concettuale` a `parziale` mantenendo `[ ]` e registrando evidenza PR #19, commit core/checker e workflow. Non viene dichiarato routing/provider/runtime reale implementato.

## Comandi realmente eseguiti nel VERIFY finale
Il VERIFY conclusivo è GitHub Actions `Navigation Domain` run #7, ID `32539167286`, job `verify-navigation-domain` ID `96945567260`, sullo SHA `30200968757d9c1e28e9040317f32d3157a9757d`.

Comandi realmente eseguiti nel runner, in ordine:
1. `npm ci`
2. `npx expo-doctor`
3. `npm run lint`
4. `node scripts/check-navigation-domain.mjs`

## Test e controlli realmente eseguiti
### Installazione dipendenze
- Comando: `npm ci`.
- Esito: PASS / step `success`.
- Exit code: 0 nel job `bash -e`.
- Evidenza: 938 package installati; audit eseguito automaticamente da npm.

### Expo Doctor
- Comando: `npx expo-doctor`.
- Esito: PASS.
- Exit code: 0.
- Output osservato: `18/18 checks passed. No issues detected!`.

### Lint
- Comando: `npm run lint`.
- Esito: PASS con warning.
- Exit code: 0.
- Output osservato: `1 problem (0 errors, 1 warning)`.
- Warning: `frontend/app/index.tsx` — `'Text' is defined but never used` (`@typescript-eslint/no-unused-vars`).

### Navigation domain checker
- Comando: `node scripts/check-navigation-domain.mjs`.
- Esito: PASS.
- Exit code: 0.
- Output osservato: `navigation-domain checks: PASS`.

### Workflow complessivo
- Run: #7, `32539167286`.
- Job: `96945567260`.
- SHA verificato: `30200968757d9c1e28e9040317f32d3157a9757d`.
- Stato: `completed`.
- Conclusione: `success`.
- Step Checkout, Setup Node.js, Install dependencies, Expo Doctor, Lint, Navigation domain checker e cleanup: tutti `success`.

## Errori e warning rilevati
Nessun errore bloccante nel VERIFY finale.
Warning osservati realmente nei log:
- `npm ci`: 15 vulnerabilità totali, di cui 1 moderate e 14 high; non introdotte né corrette da questa attività perché package/lock non sono stati modificati.
- package deprecati segnalati da npm: `inflight@1.0.6`, `rimraf@3.0.2`, `glob@7.2.3`, `eslint@9.25.0`.
- lint: import `Text` inutilizzato in `frontend/app/index.tsx`.
- GitHub Actions: Node.js 20 deprecato per alcune actions; `actions/checkout@v4` e `actions/setup-node@v4` vengono forzate a Node 24 dal runner, mentre `setup-node` installa Node `v20.20.2` per i comandi di progetto.
- warning runtime Node su moduli/API deprecate (`punycode`, `url.parse()`) durante setup/cache; non bloccanti.

## Problemi non risolti / limiti
- Nessun provider routing/mappe reale integrato.
- Nessuna chiamata rete o calcolo percorso reale.
- Nessuna posizione GPS reale acquisita.
- Nessuna UI mappa/navigazione collegata al core.
- Nessuna Alternative Live reale, Route Explanation reale o ricalcolo continuo runtime.
- Nessuna voce V06/V21/V26/V27/V28 viene marcata `[x]`.
- PR #19 resta DRAFT fino a verdetto CLEAN di NEXO REVIEW e decisione del Coordinatore.
- Le PR #12/#17/#18 restano lavori distinti; l'eventuale serializzazione dei file di reporting va gestita prima di merge concorrenti.

## Dipendenze o credenziali ancora necessarie
Per questo domain core: nessuna credenziale e nessun provider esterno necessari.
Per una futura navigazione reale serviranno un provider routing/mappe scelto e i relativi requisiti/credenziali secondo futura decisione architetturale; tali elementi sono intenzionalmente fuori perimetro.

## Rischi tecnici
- Il contratto provider-neutral dovrà essere mantenuto stabile quando verrà introdotto un adapter reale.
- Le semantiche di alternative, ricalcolo e spiegazioni sono volutamente conservative e potranno richiedere estensioni senza rompere il dominio.
- Le vulnerabilità npm/deprecazioni preesistenti richiedono una futura attività dedicata, non un fix opportunistico in questa PR.
- I branch paralleli #12/#17/#18 possono generare conflitti documentali su `LATEST.md`/`FABIO_CONTROLLO.md`; evitare merge non serializzati.

## Verificato realmente
- PR #19 DRAFT e provider-neutral core presenti nel repository.
- Run #7 `32539167286` completata con `success` sullo SHA `30200968757d9c1e28e9040317f32d3157a9757d`.
- Expo Doctor 18/18 PASS.
- Lint 0 errori / 1 warning.
- Navigation checker PASS.
- `NEXO_CONCEPTUAL_MASTER.md` aggiornato conservativamente per V06/V21/V26/V27/V28, senza `[x]`.
- Nessun file iOS/EAS/TestFlight, Android readiness, package/lock o credenziale modificato.

## Soltanto dedotto
- Il core potrà essere riutilizzato in futuro da mappe, voice core e superfici perché espone contratti provider-neutral; tale integrazione futura non è stata eseguita.
- Un adapter reale potrà implementare `RoutingAdapter`; nessun adapter reale è stato testato.

## Non verificato / non eseguito
- Routing reale end-to-end.
- GPS/device reale.
- Map rendering.
- Provider mappe/routing esterno.
- CarPlay/Android Auto runtime.
- TestFlight/EAS Build.
- Integrazione con PR #12 Saved Places o PR #17 Voice Core.

## Prossimo passo consigliato
Riconsegnare PR #19 DRAFT a NEXO REVIEW sul nuovo SHA finale di reporting. Se il verdetto è CLEAN, lasciare al Coordinatore la decisione Ready/merge. Dopo la consegna, ricontrollare immediatamente Coordination Board #11 per un nuovo incarico o `NEXT TASK QUEUED` con condizione soddisfatta.

## Decisioni richieste a Fabio
Nessuna decisione tecnica necessaria durante la review. Non scegliere ancora un provider mappe/routing sulla base di questa PR: il suo scopo è mantenere il dominio indipendente dal provider.
