# ADR 0001 — Confini architetturali della fase F0

- **Stato:** proposto, da approvare
- **Data:** 2026-08-20
- **Ambito:** prima PR documentale F0

## Contesto

NEXO VEO VISION è un copilota stradale voice-first, non un semplice navigatore.
La mappa descrive la realtà relativamente stabile; gli eventi dinamici descrivono
ciò che sta accadendo sulla strada. Telefono, CarPlay e Android Auto sono superfici
diverse dello stesso prodotto, con vincoli di sicurezza diversi. La documentazione
concettuale non approva ancora alcun provider o stack definitivo.

Questa ADR fissa confini, responsabilità e criteri di uscita. Non autorizza codice,
integrazioni, account, raccolta dati o funzionalità runtime.

## Decisione architetturale

### Cosa appartiene a F0

F0 definisce e fa approvare:

1. vocabolario canonico, invarianti di provenienza, tempo, confidence e privacy;
2. confini tra dominio, adapter esterni, frontend, backend e componenti condivisi;
3. contratti concettuali versionabili per eventi, comandi, intenti, superfici e
   provider, senza scegliere formato eseguibile o tecnologia;
4. capacità richieste agli adapter di mappa, traffico, routing, POI/search, AI,
   voce e servizi futuri, inclusi errori, disponibilità e provenienza;
5. matrice delle classi dati, finalità, consenso, retention e cancellazione;
6. registro delle decisioni aperte, responsabile/momento decisionale e criteri;
7. requisiti trasversali: voice-first, global-first, offline-first, sicurezza in
   guida, degradazione controllata, osservabilità rispettosa della privacy;
8. predisposizione concettuale di `Surface` per telefono, CarPlay e Android Auto,
   senza entitlement, manifest, template o codice nativo.

### Cosa è escluso da F0

Sono esplicitamente fuori perimetro: feature utente; UI runtime; mappe, posizione,
routing o navigazione funzionanti; wake word/STT/TTS; AI; community; traffico e
telemetria; autenticazione; database e API operative; scelta o integrazione di SDK
e provider; credenziali; raccolta di dati reali; build e configurazioni
Expo/EAS/iOS/Android; entitlement automotive; workflow, dipendenze e lockfile.
Anche F1–F10 restano non avviate.

## Layer e dipendenze consentite

```text
Surface (telefono | CarPlay | Android Auto)
           ↓ presenta stato / emette input
Voice Intent ──→ Command ──→ Command Bus ──→ dominio/use case
                                              ↓ porta astratta
                                        Provider Adapter
                                              ↓
                                      servizio autorizzato
```

- **Dominio centrale:** possiede significato, invarianti, policy di fusione,
  provenienza, confidence, freshness, vincoli veicolo e route constraint. Non
  importa tipi, identificatori o semantica proprietaria di un provider.
- **Provider Adapter:** traduce un servizio esterno verso una porta NEXO, conserva
  origine/licenza/timestamp e normalizza errori e capability. Un adapter non decide
  UX, policy di dominio o verità; provider diversi devono essere sostituibili.
- **Voice Intent:** interpretazione dichiarata di un input vocale o testuale. Non
  esegue azioni e conserva ambiguità/confidence.
- **Command:** richiesta validata, indipendente dalla superficie, che esprime
  l'azione voluta. Il **Command Bus** autorizza, instrada, rende osservabile l'esito
  e impedisce che Surface o Voice Intent chiamino direttamente un provider.
- **Surface:** adatta presentazione e input al contesto; non contiene regole di
  dominio né accede direttamente ai provider.

Le dipendenze puntano verso il dominio e le sue porte. L'infrastruttura dipende dai
contratti, mai il dominio dall'infrastruttura. Futuri servizi (meteo, parcheggi,
ricarica, V2X, AI ulteriori) entrano mediante nuove capability/porte, non mediante
eccezioni nel core.

## Base Map e Live Road Layer

La **Base Map** rappresenta elementi relativamente permanenti: geometria stradale,
incroci, rotatorie, corsie, uscite, accessi, restrizioni e POI. Il **Live Road
Layer** rappresenta eventi temporanei: traffico, veicoli fermi o lenti, corsie
chiuse, lavori, incidenti e pericoli. I due layer hanno lifecycle, caching,
freshness e provenienza distinti.

Un evento live non modifica automaticamente la Base Map. Un cambiamento persistente
può soltanto generare una proposta sottoposta a verifica/processo autorizzato. Il
`Road Object Layer` citato nell'espansione concettuale è un futuro layer distinto,
previsto ma non definito né implementato in questa PR.

## Frontend, backend e shared

- **Frontend:** orchestra la Surface locale, rende stato già qualificato, raccoglie
  consenso/input, mantiene cache minima e sicura; non stabilisce la verità stradale.
- **Backend:** quando autorizzato, acquisisce e normalizza fonti legittime, fonde
  eventi, applica policy server-side e retention; non presume MongoDB né un provider.
- **Shared:** vocabolario e contratti puri/versionati, privi di SDK, UI, rete,
  persistenza e segreti. Il formato e la generazione restano decisioni aperte.

La business logic non va duplicata per superficie. CarPlay e Android Auto sono
superfici limitate e sicure: mostrano solo informazioni e azioni consentite dalle
piattaforme, con gerarchia ridotta, touch minimo e voice-first; non sono copie
complete dell'app telefono. Le capability vanno negoziate, non presunte.

## Offline-first, degradazione e fallback

1. Ogni capability dichiara stato `available`, `degraded`, `offline` o
   `unsupported`; l'assenza di rete non è mascherata.
2. Cache solo se licenza, consenso e retention lo consentono; ogni dato conserva
   timestamp e provenienza. Nessun dato stale diventa corrente per fallback.
3. Base Map offline e routing offline sono obiettivi da valutare, non capacità già
   garantite. Senza dati validi, NEXO comunica il limite e riduce la funzione.
4. Il Live Road Layer scaduto perde confidence o viene rimosso. In assenza di live
   data la Base Map può restare visibile, chiarendo che traffico/pericoli non sono
   aggiornati.
5. Un provider secondario può sostituirne uno indisponibile soltanto tramite la
   stessa porta, rispettando licenze e semantica; mai scraping o fonti non autorizzate.
6. Azioni safety-critical falliscono in modo conservativo: nessuna inferenza viene
   trasformata in fatto, nessun vincolo veicolo ignorato silenziosamente.

## Principi NEXO vincolanti

- Voice-first e touch-complete sul telefono; wake word future intercambiabili
  “Nexo” e “Veo”, subordinate ai limiti OS e ancora da progettare.
- UI pulita, leggibile e non distraente; origine/affidabilità comprensibili senza
  sovraccaricare il guidatore.
- `Vehicle Profile` e `Route Constraint` devono poter esprimere tipo/alimentazione,
  altezza, larghezza, peso, emissioni/permessi, ZTL, pedaggi e altri limiti.
- Routing futuro capace di strategie veloci, brevi, panoramiche e tour, senza
  confondere preferenze con vincoli di legalità/sicurezza.
- Soltanto fonti autorizzate e legittime per informazioni reali; nessuno scraping
  non autorizzato e nessuna dipendenza concettuale da un singolo provider.
- Global-first: lingua UI e assistente separabili, unità/locali e regole di guida
  non codificate implicitamente per l'Italia.

## Criteri di uscita obbligatori e verificabili

F0 è completata soltanto quando **tutti** i punti seguenti sono verificati in una
review esplicita; questa PR da sola non li dichiara soddisfatti:

- [ ] Fabio approva questa ADR, vocabolario, classi privacy e registro decisioni.
- [ ] ogni termine richiesto ha una sola definizione e gli invarianti simulated,
      inferred, provenance, freshness e official precedence sono accettati;
- [ ] sono approvati confini e direzione delle dipendenze fra Surface, Voice
      Intent, Command Bus, dominio e Provider Adapter;
- [ ] frontend/backend/shared e Base Map/Live Road Layer hanno ownership e
      lifecycle non ambigui;
- [ ] tutte le classi dati hanno finalità, consenso, retention, condivisione,
      cancellazione, luogo di trattamento e rischi documentati;
- [ ] ogni scelta non approvata resta registrata come aperta con criteri,
      dipendenze e deadline di fase;
- [ ] esiste una checklist di conformità per offline/degradazione, sicurezza in
      guida, licenze, privacy e global-first;
- [ ] una verifica Git conferma che questa PR non contiene runtime, SDK,
      dipendenze, lockfile, workflow o configurazioni mobile;
- [ ] le future PR di contratti eseguibili includono test di indipendenza dai
      provider e compatibilità/versionamento prima di qualunque integrazione SDK.

## Conseguenze

Le feature avanzano più lentamente all'inizio, ma provider, superfici e modalità
online/offline restano sostituibili e verificabili. Nessun provider o tecnologia è
approvato da questa ADR. L'integrazione prematura di un SDK specifico è vietata
finché la relativa decisione non è approvata e i contratti neutrali non sono stati
revisionati.

## Contraddizioni e tensioni rilevate

1. La roadmap colloca i contratti dati in F0, ma assegna la scelta mappa/routing a
   F1 e traffico a F5: F0 deve quindi definire soltanto porte/capability neutrali.
2. La Vision richiede CarPlay/Android Auto “da subito”, mentre la roadmap ne pone
   hardening e test reali in F10: si risolve distinguendo predisposizione
   architetturale F0 da implementazione/entitlement/test nelle fasi successive.
3. La Vision usa “NEXO VEO” in alcuni passaggi, ma dichiara nome ufficiale
   “NEXO VEO VISION”: quest'ultimo è il nome prodotto; Nexo/Veo restano nomi e wake
   word dell'unico assistente.
4. `Road Object Layer`, multimodalità e AI general-purpose ampliano i requisiti
   originari: sono estensioni concettuali da preservare, non deliverable runtime F0.

## Riferimenti

- `memory/NEXO_VEO_VISION.md`
- `NEXO_VEO_VISION_ROADMAP.txt`
- `NEXO_VEO_VISION_UX_UI.txt`
- `NEXO_VEO_VISION_EXPANSION_47.txt`
