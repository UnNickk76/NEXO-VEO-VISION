Rapporto storico: `docs/codex-reports/2026-08-22_081600_n1-5-quality-policy-continuation.md`

# NEXO 1 — N1.5 Location Freshness / Quality Policy — continuazione

## Dati attività
- Data e ora UTC: 2026-08-22 08:16 UTC.
- Task ID: N1.5.
- Obiettivo: chiudere i gate residui della policy provider-neutral di freshness/quality senza introdurre provider OS/GPS.
- Stato finale di questa esecuzione: parziale / bloccato sul completamento documentale-concettuale.
- Ramo: `nexo1/f1-location-quality-policy`.
- Pull request: #24 OPEN / DRAFT / mergeable=true al fresh fetch.
- Base: `main` `b011808ec1a46827d27ccb258ef68ea01dee8b41`.
- HEAD pre-reporting verificato: `f89de36ae055de60ae0079b426d2496736dd1e6e`.

## READ / PLAN realmente eseguito
Sono stati letti `AGENTS.md` su main, Coordination Board #11, `coordination/agents/README.md`, task file NEXO 1 e report NEXO 1 sul Control Plane. Il piano di continuazione è stato registrato sulla Board nel commento `5379237207` prima della scrittura.

## Stato funzionale già presente e verificato
PR #24 contiene `frontend/src/location/quality-policy.ts`, export in `frontend/src/location/index.ts`, checker deterministico `frontend/scripts/check-location-quality-policy.mjs` e workflow `.github/workflows/location-quality-policy.yml`.
La policy usa default `maxAgeMs=30000` e `maxHorizontalAccuracyM=100`, rifiuta coordinate/fix invalidi, timestamp futuri, stale e poor-accuracy; il fallback è ammesso solo verso un precedente fix reale ancora utilizzabile.

## Test/check reali disponibili sullo SHA pre-reporting
- Location Quality Policy run `32559482473`: SUCCESS.
- Location Contract run `32559482539`: SUCCESS.
- Location State Machine run `32559482424`: SUCCESS.
Queste evidenze sono riferite allo SHA funzionale pre-reporting `f89de36...`; non vengono estese per deduzione a file che non erano presenti in quel momento.

## File creati/modificati in questa esecuzione
- Creato `docs/codex-reports/2026-08-22_081600_n1-5-quality-policy-continuation.md`.
- `docs/codex-reports/LATEST.md` e `Fabio/FABIO_CONTROLLO.md` vengono riallineati a questo stato nella stessa PR.

## Blocco / ciò che non è stato verificato
Il gate N1.5 richiede anche aggiornamento conservativo di C007 in `docs/product/NEXO_CONCEPTUAL_MASTER.md`, mantenendo `[ ] / parziale`, seguito da VERIFY post-edit. In questa esecuzione il documento canonico è stato riletto e il blob corrente identificato (`9ee6c525...`), ma non viene eseguita una sostituzione integrale rischiosa senza una patch atomica affidabile: il precedente tentativo N1.5 aveva già ricevuto HTTP 409 per blob non corrente. Nessun contenuto canonico viene quindi sovrascritto o troncato.

Non vengono dichiarati PASS nuovi sul contenuto finale di reporting. Nessun provider OS/GPS, permission runtime, EAS/TestFlight o credenziale è stato toccato.

## Problemi residui e rischio tecnico
- C007 deve ancora citare PR #24/policy/checker mantenendo stato parziale e dichiarando assenza di runtime OS/GPS.
- Dopo quell'edit devono essere rieseguiti i check influenzati, incluso validator concettuale.
- Solo dopo report finale integrale, cruscotto, exact SHA e fresh mergeability può avvenire handoff a NEXO REVIEW.
- N1.6 non è eleggibile.

## Prossimo passo
Continuare esclusivamente N1.5 con aggiornamento C007 sicuro e VERIFY post-edit; mantenere PR #24 DRAFT. Non marcare N1.5 `[x]` finché il gate non è completo.

## Decisioni richieste a Fabio
Nessuna.
