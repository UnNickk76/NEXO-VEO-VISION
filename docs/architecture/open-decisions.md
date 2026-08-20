# Registro delle decisioni architetturali aperte

Nessuna voce seguente è approvata. Le deadline indicano l'ultima fase utile per
decidere prima di implementare la capacità, non una scelta implicita. Ogni scelta
richiede ADR separata, evidenze riproducibili e approvazione di Fabio quando
coinvolge prodotto, costi, privacy o rischio.

| ID | Decisione aperta | Criteri di valutazione | Dipendenze | Da risolvere entro |
| --- | --- | --- | --- | --- |
| OD-01 | **Mapbox oppure combinazione OSM/altri provider per Base Map** | licenze/attribuzione e uso commerciale; copertura globale; stile, corsie, offline; aggiornamenti; automotive; privacy; lock-in; costi/SLA | requisiti Surface, territori/lanci, legal, modello offline | prima dell'integrazione mappa in F1 |
| OD-02 | **Traffico: TomTom, HERE, Mapbox o altre fonti ufficiali** | copertura/freshness/granularità corsia; provenance; redistribuzione/cache; SLA; deduplicazione; costi | OD-01, modello eventi, territori, accordi/licenze | prima di Traffic Fusion F5; discovery prima di contratto commerciale |
| OD-03 | **Motore di routing** | profili veloce/breve/panoramico/tour; multimodale; ZTL/pedaggi; altezza/peso/alimentazione; realtime/offline; spiegabilità; copertura/costi | OD-01, Vehicle Profile, Route Constraint, legal | prima del routing F2 (compatibilità minima valutata in F1) |
| OD-04 | **Ricerca/geocoding/POI** | qualità globale/localizzata, categorie/orari, offline, licenza/cache, privacy query, costi | mappa, territori, UX voice, legal | prima della ricerca destinazione F1/F3 |
| OD-05 | **AI provider/modello e confine AI** | accuratezza multilingue, latenza/costi, privacy/retention, data residency, tool safety, portabilità, dichiarazione inferenze | VEO Context, voice, contratti Command, legal | prima di AI conversazionale F3 |
| OD-06 | **Strategia MongoDB e backend** | necessità reale del DB, modelli/accessi, geospaziale, consistency, retention, backup, regioni, testabilità, costo/scala; alternative incluse | contratti dati, privacy, volumi/SLA, auth | prima di persistere dati F0 successiva/F1; nessun vincolo a MongoDB attuale |
| OD-07 | **Autenticazione e autorizzazione** | anonymous-first vs account, passkey/OIDC, recovery, automotive handoff, anti-abuso, privacy, threat model, costi | Surface, community, sync, backend, legal | prima di endpoint o sync personali; obbligatoria prima di F4 community |
| OD-08 | **Conservazione della posizione** | default effimero, granularità, controlli/export/delete, cifratura, retention numerica, base giuridica, replay/memoria | privacy/DPIA, routing, Road Replay, telemetria | prima di qualsiasi persistenza; revalidare prima di F7 |
| OD-09 | **Riconoscimento vocale locale, remoto o ibrido** | accuratezza IT/EN, offline, latenza, batteria, rumore auto, privacy, costo, accessibilità e limiti OS | modelli device, Surface, AI, consenso, legal | prima del guscio voice F1/F3 |
| OD-10 | **Gestione wake word “Nexo”/“Veo”** | supporto OS, falso positivo/negativo, batteria, locale vs server, lingue, scelta uno/entrambi, indicatori privacy, telefonate/audio | OD-09, policy Apple/Google, permessi | prima di implementarla; non promessa come always-on in F1 |
| OD-11 | **Limiti CarPlay e Android Auto** | template/categorie consentiti, entitlement/review, input e contenuto ammessi, voice/audio, parità capability, simulatori e auto reali | documentazione piattaforme vigente, Surface contract, account developer | censimento prima di F1; capability approvate prima del codice; hardening F10 |
| OD-12 | **Strategia offline** | aree/download/aggiornamenti, dimensioni, routing/POI disponibili, cache live, licenze, conflitti, battery/storage e UX degradazione | mappa/routing/provider, privacy, device target | baseline prima di F1; completa prima di promettere offline |
| OD-13 | **Formato e versionamento dei contratti shared** | type safety, compatibilità mobile/backend, codegen, evoluzione/schema, validazione, unità/coordinate/tempo, test consumer/provider | ownership repository, toolchain e linguaggi | F0 successiva, prima di contratti eseguibili |
| OD-14 | **Requisiti legali e licenze dati** | GDPR/ePrivacy e territori; termini provider; attribuzione; caching/derivati; community/UGC; responsabilità routing; minori; trasferimenti | tutti i provider, privacy, mercati, counsel | assessment F0/F1; approvazione prima di dati/utenti reali |
| OD-15 | **Costi e scalabilità provider** | unit economics per MAU/route/tile/query/token; quote; picchi; SLA; egress; multi-provider/fallback; exit plan | stime prodotto, mercati, OD-01–05, budget | prima di contratto/provider e a ogni gate di scala |
| OD-16 | **Fonti ufficiali e community fusion** | autorità per territorio, precedenza temporale, indipendenza fonti, soglie Confidence, dispute, audit, abuso | vocabolario, legal/licenze, backend, moderazione | prima del Live Road Layer reale F4/F5 |
| OD-17 | **Telemetria, diagnostica e analytics** | metriche indispensabili, allowlist, consenso, redazione, retention/regione, vendor/no vendor, delete | privacy, threat model, osservabilità | prima di aggiungere qualunque SDK o evento runtime |

## Gate comune di decisione

Una decisione può passare da aperta ad approvata solo con:

1. requisiti e casi di fallimento misurabili, inclusi offline e Surface automotive;
2. confronto di almeno alternative reali, compresa ove sensato l'opzione “non
   integrare”; prove/spike isolati non importati nel core;
3. verifica di licenze, privacy, sicurezza, accessibilità, copertura e costi;
4. strategia di fallback, migrazione/exit e trattamento della provenance;
5. ADR con conseguenze e approvazione esplicita, senza attribuirla retroattivamente.

## Questioni da sottoporre a Fabio

- priorità dei mercati/territori e budget che rendono confrontabili i provider;
- quali capacità offline costituiscono promessa di prodotto;
- se cronologia, sync e personalizzazione siano opt-in e con quali controlli;
- livello di parità desiderato fra telefono e Surface automotive, entro i limiti OS;
- chi approva aspetti legali/licenze e quali metriche di costo/scala usare.
