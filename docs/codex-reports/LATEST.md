Rapporto storico: `docs/codex-reports/2026-08-22_021000_n2-3-surface-matrix.md`

# NEXO 2 — N2.3 post-PR12 reconciliation + Surface Capability Matrix hardening

- **Data/ora UTC:** 2026-08-22 02:10 UTC
- **Obiettivo richiesto:** riconciliare PR #20 con la main avanzata dopo merge PR #12, preservare integralmente lo stato Saved Places, introdurre una matrice Surface canonica per iOS phone / Android phone / CarPlay / Android Auto, fallback runtime fail-closed e test deterministici.
- **Stato finale:** `completato` per implementazione/VERIFY locale mirato e preparazione handoff; il merge resta vietato fino a nuova review CLEAN sul nuovo exact SHA.
- **Ramo utilizzato per la ricostruzione:** `nexo2/n2-3-reconcile-surface-matrix`, creato da `main` `47b9d0a5c20490f0b73e95e52fadca151e89e136`; a fine attività il relativo HEAD viene trasferito sul branch PR canonico `nexo2/f0-surface-capabilities`.
- **Pull request:** #20 — deve restare DRAFT.
- **Requisiti/ID:** V05, V44, V45, V46.

## READ / stato verificato realmente

- `AGENTS.md` letto su `main`.
- Issue #11 letta per governance globale, ownership e conflitti.
- `coordination/agents/README.md`, `coordination/agents/NEXO_2.md` e `coordination/reports/NEXO_2_REPORT.md` letti sul branch `coordination/agent-control`.
- REVIEW NOTE NEXO REVIEW su SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`: CLEAN, review ID `4998458851`, P0/P1/P2 = 0/0/0.
- PR #12 verificata mergeata in `main` come `47b9d0a5c20490f0b73e95e52fadca151e89e136`.
- PR #20 prima della riconciliazione: OPEN / DRAFT / `mergeable=false`, HEAD `6e13d42379a5cff26cb37a67944f89302b925ac4`.
- Compare `main` → vecchio branch PR #20: `status=diverged`, `ahead_by=18`, `behind_by=16`, merge-base `213fb129...`.
- Il conceptual su current main contiene lo stato PR #12 Saved Places: C001/C002/C005 `[ ]` / `parziale`; questo stato è stato preservato.

## PLAN applicato

1. Non tentare merge cieco sul branch divergente.
2. Creare un branch temporaneo dal current main `47b9d0a5...`.
3. Ricostruire solo il perimetro Surface già accettato, aggiungendo il nuovo hardening matrice/fail-closed.
4. Partire dal conceptual corrente di main e modificare esclusivamente V05/V44/V45/V46, lasciando intatte le evidenze Saved Places.
5. Eseguire TypeScript strict + checker deterministico su una ricostruzione locale dei file Surface appena pubblicati.
6. Aggiornare report, LATEST e Fabio Controllo.
7. Verificare diff `main` → branch ricostruito; quindi trasferire l'HEAD sul branch PR #20 e richiedere nuova review sul nuovo exact SHA.

## Modifiche concrete

### Contratto / dimensioni canoniche

`frontend/src/core/surface/types.ts`:
- aggiunge `SURFACE_KINDS` ordinato e tipizzato;
- aggiunge `SURFACE_CAPABILITIES` ordinato e tipizzato;
- mantiene availability, policy, contesto e contratti provider-neutral.

### Matrice canonica + fail-closed

Nuovo `frontend/src/core/surface/matrix.ts`:
- `SURFACE_CAPABILITY_MATRIX` è la fonte canonica delle policy prodotto per tutte e quattro le Surface;
- phone: policy permissive di base, successivamente ristrette dai vincoli contestuali;
- automotive: touch/rich details/secondary actions constrained, free text prohibited;
- `FAIL_CLOSED_AVAILABILITY` marca ogni capability `unsupported` in assenza di dato runtime;
- `createCapabilityAvailabilitySnapshot()` completa un report parziale senza promuovere capability mancanti e preserva i valori runtime realmente forniti.

### Profili / policy

`profiles.ts` consuma direttamente la matrice canonica invece di duplicare policy. `policy.ts` conserva la separazione già approvata tra availability runtime e policy prodotto: `prohibited` forza solo `usable=false`, senza riscrivere availability.

### Checker deterministico

`frontend/scripts/check-surface-capabilities.ts` verifica tra l'altro:
- ordine/contenuto esatto delle 4 Surface;
- ordine/contenuto esatto delle capability canoniche;
- completezza della matrice per ogni Surface;
- identità tra policy del contratto e entry della matrice;
- policy automotive conservative;
- fallback di ogni capability mancante a `unsupported`;
- preservazione dei valori runtime espliciti;
- ortogonalità `available/degraded + prohibited`;
- vincoli moving/stopped e Passenger.

### Conceptual

`docs/product/NEXO_CONCEPTUAL_MASTER.md` è stato ricostruito partendo dal current main, preservando C001/C002/C005 PR #12. Solo V05/V44/V45/V46 sono riportate a `[ ]` / `parziale` con evidenze PR #20, commit matrice/checker e limiti runtime espliciti.

## Commit creati sul branch di ricostruzione

- `0ed890bd6e8b353828e67da09fe63966de15ddf5` — dimensioni canoniche Surface.
- `c7dd1353f44d81472431053e85a1945d9f4dc596` — matrice canonica + fail-closed runtime snapshot.
- `976d9216abdd4beacf886d390b48b3fa5854f7ab` — profili che consumano la matrice.
- `60e26401cd58285e47127f87af1ca336952f4f88` — policy effective Surface preservata.
- `2a5695ea291546180b28ffd9439ca573b1ab1c8e` — export API matrice.
- `bb6ef818ff2fd4ebb1ba90c2094e4842e13eefce` — checker deterministico hardening.
- `4dee6403a6af8062ca968aaa06a9787e067c3bac` — conceptual riconciliato con current main / PR #12.

I successivi commit di reporting sono registrati nel Control Plane con l'exact SHA finale, evitando auto-riferimenti circolari nel rapporto stesso.

## Elenco completo file creati/modificati

Creati:
- `frontend/src/core/surface/types.ts`
- `frontend/src/core/surface/matrix.ts`
- `frontend/src/core/surface/profiles.ts`
- `frontend/src/core/surface/policy.ts`
- `frontend/src/core/surface/index.ts`
- `frontend/scripts/check-surface-capabilities.ts`
- `docs/codex-reports/2026-08-22_021000_n2-3-surface-matrix.md`

Modificati:
- `docs/product/NEXO_CONCEPTUAL_MASTER.md`
- `docs/codex-reports/LATEST.md`
- `Fabio/FABIO_CONTROLLO.md`

Eliminati: nessuno.

## Comandi/test realmente eseguiti

I file Surface appena pubblicati sul branch temporaneo sono stati ricostruiti in `/tmp/n2verify` per un VERIFY mirato. Sul contenuto ricostruito è stato eseguito realmente:

```sh
cd /tmp/n2verify && rm -rf out && tsc --strict --target ES2022 --module node16 --moduleResolution node16 --skipLibCheck --outDir out src/core/surface/*.ts scripts/check-surface-capabilities.ts && node out/scripts/check-surface-capabilities.js
```

- **Exit code:** 0
- **Output:** `surface-capabilities checks: PASS`
- **Esito:** PASS del TypeScript strict + checker Surface mirato.
- **Limite:** non è un checkout Git completo del repository e non equivale a lint globale.

Compare remoto eseguito dopo codice + conceptual, prima del reporting:
- base `main` `47b9d0a5...`;
- head `nexo2/n2-3-reconcile-surface-matrix`;
- `status=ahead`, `ahead_by=7`, `behind_by=0`;
- esattamente 7 file a quel punto: 6 Surface/check + conceptual;
- nessuna modifica Saved Places/location/voice/navigation/EAS/TestFlight.

## Verificato realmente

- vecchia PR #20 divergente/non mergeable dopo merge PR #12;
- current main e merge-base;
- stato Saved Places nel conceptual corrente;
- nuovo codice Surface e checker pubblicati sul branch nato da current main;
- TypeScript strict + checker mirato PASS;
- diff del branch ricostruito non è dietro main prima del reporting.

## Deducibile ma non dimostrato runtime

- La matrice fornisce una fonte unica e deterministica per adapter futuri.
- Il fail-closed evita che una capability non riportata venga considerata disponibile.
- Questo non dimostra supporto reale CarPlay/Android Auto, entitlement o template nativi.

## Non verificato / limiti

- Nessun runtime CarPlay/Android Auto reale.
- Nessun test in automobile o host automotive.
- Nessun entitlement/template nativo.
- Nessun checkout/lint globale del repository.
- Nessuna EAS Build/TestFlight.
- Nessuna credenziale Apple/EAS letta o modificata.

## Errori e warning rilevati

- Il vecchio branch PR #20 era divergente (`behind_by=16`) e `mergeable=false`; per questo è stata scelta una ricostruzione controllata da current main invece di sovrascrivere manualmente i cambi di PR #12.
- Nessun errore del checker mirato.
- Qualsiasi force-update del branch PR invalida il CLEAN precedente e richiede nuova review sul nuovo exact SHA.

## Problemi non risolti

- Dopo il trasferimento del nuovo HEAD sul branch PR #20 devono essere riverificati `mergeable`, diff, commit status/workflow e exact SHA.
- NEXO REVIEW deve emettere un nuovo verdetto sul nuovo SHA prima di qualunque merge.

## Dipendenze o credenziali ancora necessarie

Nessuna per questo task. Nessuna credenziale Apple/EAS è necessaria o autorizzata.

## Rischi tecnici

1. Il test è mirato e non copre il repository completo.
2. I profili rappresentano policy NEXO conservative, non requisiti legali o capacità native garantite.
3. I file reporting condivisi possono richiedere futura serializzazione se main avanza di nuovo prima del merge.

## Prossimo passo consigliato

Completare i tre file reporting sul branch ricostruito, trasferire il relativo HEAD sul branch PR #20, verificare che la PR sia nuovamente basata su current main/mergeable e consegnare il nuovo exact SHA a NEXO REVIEW. Nessun merge autonomo.

## Decisioni richieste a Fabio

Nessuna.
