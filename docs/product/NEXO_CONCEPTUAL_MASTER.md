# NEXO VEO VISION — Quadro concettuale maestro e registro permanente

> Documento canonico di orientamento e avanzamento. Le fonti storiche restano
> autorevoli per i dettagli; questo file le indicizza senza cancellarle.
>
> **Stato al 21 agosto 2026:** quasi tutto è concettuale. Una casella resta vuota
> finché la funzione non è implementata e verificata con evidenza nel repository.

## Come leggere e aggiornare questo documento

- Ogni requisito possiede un ID stabile: `Vxx` per la Vision originaria, `Exx`
  per l'espansione, `Uxx` per UX/UI e `Cxxx` per nuove capacità trasversali.
- `[ ]` significa non ancora implementato e verificato. Non significa scartato.
- `[x]` è consentito soltanto quando esistono codice funzionante, test applicabili
  superati e riferimenti a PR/commit nel campo **Evidenza**.
- Una voce implementata non viene eliminata né riscritta per farla sparire.
- Se una capacità viene sostituita, rinviata o abbandonata, la riga resta e lo stato
  diventa `sostituita`, `rinviata` o `scartata`, con motivazione ed evidenza.
- Una demo statica, uno splash screen, uno schema o una documentazione non rendono
  completata una funzione utente.
- Le nuove funzioni ricevono un nuovo ID e vengono collegate alla fase prevista.

## Quadro completo in parole semplici

NEXO VEO VISION vuole diventare un **copilota stradale intelligente**, non un
semplice navigatore. Un unico assistente, richiamabile come Nexo o Veo, combina
navigazione, voce, comprensione del viaggio e conoscenza qualificata della strada.

1. **Navigazione di base:** mappa, GPS, ricerca, routing, indicazioni, ricalcolo,
   alternative, preferenze, ZTL, veicolo e funzionamento offline/degradato.
2. **Voice-first:** ogni azione importante deve essere utilizzabile a voce, con
   parità touch e gestione corretta di musica, radio, telefonate e limiti OS.
3. **Strada viva:** Base Map separata da traffico, pericoli, cantieri, corsie,
   oggetti stradali ed eventi mobili con fonte, tempo, confidence e verifica.
4. **Community affidabile:** segnalazioni rapide, conferme, reputazione, anti-spam,
   fusione delle fonti e nessuna trasformazione automatica di una voce in verità.
5. **AI contestuale:** conversazione generale e stradale nello stesso assistente,
   VEO Context, spiegazioni, Road Ask, Guarda avanti e divieto assoluto d'inventare.
6. **Percorsi personali:** tipi di percorso, memoria delle preferenze, Casa,
   Lavoro, luoghi salvati e suggerimenti contestuali sempre confermati dall'utente.
7. **Viaggio esteso:** multimodalità, parcheggio, TOUR, Scenic, soste, rifornimento,
   ricarica, meteo lungo il percorso, briefing e replay.
8. **Sicurezza:** minima distrazione, informazioni progressive, lane guidance,
   profilo del veicolo, condizioni fisiche, emergenze e fallback conservativi.
9. **Superfici:** smartphone, CarPlay e Android Auto condividono core e identità,
   ma adattano controlli e contenuti ai limiti della superficie e al ruolo.
10. **Globale e privato:** italiano e inglese nativi iniziali, localizzazione,
    unità e regole locali; consenso, minimizzazione, retention e cancellazione.
11. **Evoluzione:** Road Intelligence predittiva, Map Evolution, Road History e
    piattaforma futura di intelligence stradale, soltanto quando dati e provider
    legittimi lo rendono realmente possibile.

## Architettura che non deve essere violata

- Dominio e contratti sono indipendenti dai provider.
- Surface → Voice Intent → Command → Command Bus → dominio → Provider Adapter.
- Base Map, Live Road Layer e Road Object Layer hanno ownership e lifecycle separati.
- Availability, provenienza/inferenza e Verification Status sono dimensioni separate.
- VEO Context mantiene il viaggio e la conversazione senza diventare fonte di verità.
- Ogni dato reale conserva fonte, timestamp, confidence, freshness e stato di verifica.
- I dati simulati restano identificati e isolati end-to-end.
- Nessun segreto, provider o database specifico è imposto dal concetto.

## Fasi del progetto

| Fase | Obiettivo | Stato |
| --- | --- | --- |
| `F0` | FONDAMENTA ARCHITETTURALI & CONTRATTI DATI | non completata |
| `F1` | GUSCIO VOICE-FIRST + MAPPA BASE + POSIZIONE | non completata |
| `F2` | ROUTING AVANZATO, RICALCOLO, ALTERNATIVE, PREFERENZE, ZTL, VEICOLO | non completata |
| `F3` | AI CONVERSAZIONALE (STRUTTURALE) + ROAD ASK / GUARDA AVANTI (dati parziali) | non completata |
| `F4` | LIVE ROAD LAYER + COMMUNITY + CONFIDENCE + REPUTAZIONE/ANTI-SPAM | non completata |
| `F5` | TRAFFIC FUSION LAYER + FUSIONE SEGNALAZIONI | non completata |
| `F6` | ROAD INTELLIGENCE (TELEMETRIA AGGREGATA) + PREDITTIVA + DYNAMIC LANE | non completata |
| `F7` | ESPERIENZA DI VIAGGIO: TOUR AI, SMART SCENIC, JOURNEY POINTS, SAFE STOP, AWARENESS | non completata |
| `F8` | COMUNICAZIONE TRA AUTOMOBILISTI + CONVOY/TOGETHER + SMART EMERGENCY | non completata |
| `F9` | MAP EVOLUTION + CORREZIONI MAPPA UTENTI + ROAD HISTORY | non completata |
| `F10` | CARPLAY & ANDROID AUTO: HARDENING E TEST SU AUTO REALI | non completata |

La build TestFlight iniziale è infrastruttura di osservazione: rende possibile
vedere l'app su iPhone, ma non completa automaticamente le funzioni F1.

## Nuove capacità trasversali

| Fatto | ID | Capacità | Fase | Stato | Evidenza |
| --- | --- | --- | --- | --- | --- |
| [ ] | `C001` | Casa e Lavoro opzionali, rinominabili e con icone rapide | F1 | parziale | Vision §35A; PR #10; PR #12 core local-first, UI non integrata |
| [ ] | `C002` | Altri luoghi salvati nominabili, riordinabili, modificabili ed eliminabili | F1 | parziale | Vision §35A; PR #10; PR #12 core local-first, UI non integrata |
| [ ] | `C003` | Accesso ai luoghi da mappa, ricerca, menu rapido e voce | F1 | concettuale | UX/UI §24; PR #10 |
| [ ] | `C004` | Suggerimenti Casa/Lavoro/preferiti basati sul contesto, con consenso e motivazione | F3 | concettuale | Vision §35A; PR #10 |
| [ ] | `C005` | Conferma obbligatoria prima di avviare una destinazione suggerita | F1 | parziale | Vision §35A; PR #10; PR #12 guardia core, integrazione suggerimenti/UI assente |
| [ ] | `C006` | Privacy, cancellazione ed elaborazione locale delle abitudini quando possibile | F0/F3 | concettuale | Vision §35A; PR #10 |

## Registro permanente della Vision originaria

| Fatto | ID | Requisito | Stato | Evidenza | Fonte dettagliata |
| --- | --- | --- | --- | --- | --- |
| [ ] | `V01` | Identità | concettuale | — | memory/NEXO_VEO_VISION.md §1 |
| [ ] | `V02` | NEXO + VEO — un solo assistente | concettuale | — | memory/NEXO_VEO_VISION.md §2 |
| [ ] | `V03` | Voice-First | concettuale | — | memory/NEXO_VEO_VISION.md §3 |
| [ ] | `V04` | Audio / Radio / Musica / Telefonate | concettuale | — | memory/NEXO_VEO_VISION.md §4 |
| [ ] | `V05` | CarPlay & Android Auto (requisiti fondamentali, non opzionali) | concettuale | — | memory/NEXO_VEO_VISION.md §5 |
| [ ] | `V06` | Cartografia & Motore di navigazione | concettuale | — | memory/NEXO_VEO_VISION.md §6 |
| [ ] | `V07` | Eventi stradali realtime | concettuale | — | memory/NEXO_VEO_VISION.md §7 |
| [ ] | `V08` | Eventi a livello di corsia | concettuale | — | memory/NEXO_VEO_VISION.md §8 |
| [ ] | `V09` | Live Road Layer (separato dalla Base Map) | concettuale | — | memory/NEXO_VEO_VISION.md §9 |
| [ ] | `V10` | Traffic Fusion Layer | concettuale | — | memory/NEXO_VEO_VISION.md §10 |
| [ ] | `V11` | Fusione delle segnalazioni | concettuale | — | memory/NEXO_VEO_VISION.md §11 |
| [ ] | `V12` | Confidence Score | concettuale | — | memory/NEXO_VEO_VISION.md §12 |
| [ ] | `V13` | Segnalazioni Community | concettuale | — | memory/NEXO_VEO_VISION.md §13 |
| [ ] | `V14` | Reputazione & Punti | concettuale | — | memory/NEXO_VEO_VISION.md §14 |
| [ ] | `V15` | Anti-spam & Freeze | concettuale | — | memory/NEXO_VEO_VISION.md §15 |
| [ ] | `V16` | Road Trust contestuale | concettuale | — | memory/NEXO_VEO_VISION.md §16 |
| [ ] | `V17` | Comunicazione diretta tra automobilisti | concettuale | — | memory/NEXO_VEO_VISION.md §17 |
| [ ] | `V18` | Road Intelligence | concettuale | — | memory/NEXO_VEO_VISION.md §18 |
| [ ] | `V19` | Map Evolution | concettuale | — | memory/NEXO_VEO_VISION.md §19 |
| [ ] | `V20` | Correzioni mappa da parte degli utenti | concettuale | — | memory/NEXO_VEO_VISION.md §20 |
| [ ] | `V21` | Tipi di percorso | concettuale | — | memory/NEXO_VEO_VISION.md §21 |
| [ ] | `V22` | TOUR generato dall'AI | concettuale | — | memory/NEXO_VEO_VISION.md §22 |
| [ ] | `V23` | Preferenze di percorso | concettuale | — | memory/NEXO_VEO_VISION.md §23 |
| [ ] | `V24` | ZTL | concettuale | — | memory/NEXO_VEO_VISION.md §24 |
| [ ] | `V25` | Profilo del veicolo | concettuale | — | memory/NEXO_VEO_VISION.md §25 |
| [ ] | `V26` | Alternative Live | concettuale | — | memory/NEXO_VEO_VISION.md §26 |
| [ ] | `V27` | Ricalcolo continuo | concettuale | — | memory/NEXO_VEO_VISION.md §27 |
| [ ] | `V28` | Route Explanation | concettuale | — | memory/NEXO_VEO_VISION.md §28 |
| [ ] | `V29` | Navigazione predittiva | concettuale | — | memory/NEXO_VEO_VISION.md §29 |
| [ ] | `V30` | Dynamic Lane Intelligence | concettuale | — | memory/NEXO_VEO_VISION.md §30 |
| [ ] | `V31` | Road Ask | concettuale | — | memory/NEXO_VEO_VISION.md §31 |
| [ ] | `V32` | Guarda avanti | concettuale | — | memory/NEXO_VEO_VISION.md §32 |
| [ ] | `V33` | Memoria stradale personale | concettuale | — | memory/NEXO_VEO_VISION.md §33 |
| [ ] | `V34` | Navigazione conversazionale | concettuale | — | memory/NEXO_VEO_VISION.md §34 |
| [ ] | `V35` | POI contestuali | concettuale | — | memory/NEXO_VEO_VISION.md §35 |
| [ ] | `V36` | Journey Points | concettuale | — | memory/NEXO_VEO_VISION.md §36 |
| [ ] | `V37` | Safe Stop | concettuale | — | memory/NEXO_VEO_VISION.md §37 |
| [ ] | `V38` | Smart Scenic | concettuale | — | memory/NEXO_VEO_VISION.md §38 |
| [ ] | `V39` | Journey Awareness | concettuale | — | memory/NEXO_VEO_VISION.md §39 |
| [ ] | `V40` | Convoy / Together | concettuale | — | memory/NEXO_VEO_VISION.md §40 |
| [ ] | `V41` | Smart Emergency | concettuale | — | memory/NEXO_VEO_VISION.md §41 |
| [ ] | `V42` | Road History | concettuale | — | memory/NEXO_VEO_VISION.md §42 |
| [ ] | `V43` | Map Alive | concettuale | — | memory/NEXO_VEO_VISION.md §43 |
| [ ] | `V44` | Interfaccia pulita e intuitiva | concettuale | — | memory/NEXO_VEO_VISION.md §44 |
| [ ] | `V45` | Priorità delle informazioni | concettuale | — | memory/NEXO_VEO_VISION.md §45 |
| [ ] | `V46` | Attenzione del guidatore | concettuale | — | memory/NEXO_VEO_VISION.md §46 |
| [ ] | `V47` | Privacy (by design) | concettuale | — | memory/NEXO_VEO_VISION.md §47 |
| [ ] | `V48` | Ruolo dell'AI | concettuale | — | memory/NEXO_VEO_VISION.md §48 |
| [ ] | `V49` | Dati reali, inferenze e demo | concettuale | — | memory/NEXO_VEO_VISION.md §49 |
| [ ] | `V50` | Evoluzione futura | concettuale | — | memory/NEXO_VEO_VISION.md §50 |
| [ ] | `V51` | Principi fondamentali (da mantenere sempre) | concettuale | — | memory/NEXO_VEO_VISION.md §51 |

## Registro permanente dell'espansione concettuale

| Fatto | ID | Requisito | Stato | Evidenza | Fonte dettagliata |
| --- | --- | --- | --- | --- | --- |
| [ ] | `E01` | SNV come SISTEMA EVOLUTIVO: decide quale porzione di strada mostrare (dist. manovra, | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.1 |
| [ ] | `E02` | Auto-zoom prima delle manovre (svincoli/rotatorie/incroci/uscite/cambi corsia/manovre | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.2 |
| [ ] | `E03` | Visuale ampia nei tratti lunghi = gia' sez.31.1/31.3. -> F1. | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.3 |
| [ ] | `E04` | Zoom contestuale (non solo distanza) = gia' sez.31.4. -> F1 base, F6 pieno. | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.4 |
| [ ] | `E05` | Controllo manuale totale (sposta/zoom/ruota/inclina/esplora); l'automazione non | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.5 |
| [ ] | `E06` | Ricentra manuale (pulsante + voce "Nexo ricentra"/"Veo torna alla navigazione") | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.6 |
| [ ] | `E07` | Ricentraggio automatico configurabile (10/20/30/60 s / MAI; default 30) = gia' sez.31.7. -> F1. | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.7 |
| [ ] | `E08` | Priorita' alle manovre imminenti (avviso discreto + ripristino per sicurezza) | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.8 |
| [ ] | `E09` | Transizioni visive fluide (zoom/rotazione/inclinazione/ricentro progressivi) | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.9 |
| [ ] | `E10` | VEO/NEXO = AI GENERALE, non solo "AI del navigatore". Risponde a domande general | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.10 |
| [ ] | `E11` | Conversazione libera (linguaggio naturale, no elenco chiuso di comandi). -> F3. | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.11 |
| [ ] | `E12` | Risposta vocale naturale (voce = interfaccia primaria in guida). -> F3 (dipende da TTS/STT). | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.12 |
| [ ] | `E13` | Continuita' AI generale <-> navigazione: UN SOLO assistente che mantiene il contesto | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.13 |
| [ ] | `E14` | Segnalazione veicolo lento (qualsiasi corsia/strada/causa; es. "camion lento a destra"). -> F4. | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.14 |
| [ ] | `E15` | MOBILE ROAD EVENT: evento non statico, concettualmente mobile. ARCHITETTURA: il modello | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.15 |
| [ ] | `E16` | Marker mobile PULSANTE che si sposta, distinguibile dagli eventi statici. -> UI F4. | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.16 |
| [ ] | `E17` | POSIZIONE STIMATA DICHIARATA: mai fingere tracking reale; stima da ultima segnalazione/ | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.17 |
| [ ] | `E18` | Altre categorie mobili (trattori, mezzi agricoli, trasporti eccezionali, spazzaneve, | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.18 |
| [ ] | `E19` | ROAD OBJECT LAYER: livello dedicato agli oggetti reali della strada. NON implementare ora. | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.19 |
| [ ] | `E20` | Segnaletica (STOP, precedenze, divieti, sensi unici, attraversamenti, passaggi a livello, | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.20 |
| [ ] | `E21` | Limiti di velocita': visualizzazione chiara; relazione con velocita' GPS; avvisi | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.21 |
| [ ] | `E22` | Semafori sulla mappa dove conosciuti; predisporre eventuale futuro dato dinamico | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.22 |
| [ ] | `E23` | Road Object PERMANENT / TEMPORARY / DYNAMIC (classificazione). -> schema F0, uso F5/F9. | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.23 |
| [ ] | `E24` | Correzione community dei Road Objects (limite errato, semaforo inesistente, nuova | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.24 |
| [ ] | `E25` | Modalita' selezionabili: AUTO, A PIEDI, TRASPORTO PUBBLICO; predisporre BICI, MOTO, future. | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.25 |
| [ ] | `E26` | Cambio modalita' in viaggio senza terminare la navigazione ("Veo, da qui a piedi"); ricalcolo immediato. -> F2/F3. | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.26 |
| [ ] | `E27` | Viaggio MULTIMODALE (auto->parcheggio->piedi->metro->piedi->destinazione) come UN SOLO viaggio. | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.27 |
| [ ] | `E28` | Parcheggio intelligente + passaggio pedonale (distanza finale a piedi, ZTL, accessibilita', | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.28 |
| [ ] | `E29` | Destinazioni concettuali ("il mare piu' vicino", "posto tranquillo con vista", | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.29 |
| [ ] | `E30` | "PORTAMI LI'" VISIVO (inquadra/indica edificio/monumento e "Veo portami li'"): usa | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.30 |
| [ ] | `E31` | ROUTE MEMORY personale (strade evitate, percorsi preferiti, tolleranza deviazioni, | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.31 |
| [ ] | `E32` | "PERCHE'?" UNIVERSALE: ogni decisione/elemento UI spiegabile con dati realmente | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.32 |
| [ ] | `E33` | ROAD REPLAY: riepilogo post-viaggio (percorso, deviazioni, eventi, soste, traffico, | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.33 |
| [ ] | `E34` | BRIEFING PRE-VIAGGIO: sintesi intelligente (traffico, lavori, eventi, meteo, pedaggi, | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.34 |
| [ ] | `E35` | Meteo LUNGO IL PERCORSO legato ai tratti ("tra 32 km pioggia intensa", nebbia, vento, | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.35 |
| [ ] | `E36` | ROAD HORIZON TEMPORALE: non solo "cosa c'e' davanti" ma "cosa trovero' QUANDO arrivero' li'" | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.36 |
| [ ] | `E37` | EMERGENCY CORRIDOR INTELLIGENCE: avviso arrivo/presenza mezzi di soccorso e indicazioni | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.37 |
| [ ] | `E38` | Segnalazioni in LINGUAGGIO NATURALE (l'utente non conosce le categorie interne: VEO | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.38 |
| [ ] | `E39` | PROPOSTA INTELLIGENTE di segnalazione da telemetria aggregata (frenate/rallentamenti/ | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.39 |
| [ ] | `E40` | MODALITA' PASSEGGERO: UI adattata al ruolo. DRIVER = essenziale, Voice-First, minima | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.40 |
| [ ] | `E41` | VEO CONTEXT: VEO conosce il contesto del viaggio corrente (destinazione, posizione, | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.41 |
| [ ] | `E42` | Domande contestuali implicite/frasi incomplete ("piu' avanti c'e' di meglio?" riferito | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.42 |
| [ ] | `E43` | Profilo stradale legato al veicolo (altezza, larghezza, lunghezza, peso, alimentazione, | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.43 |
| [ ] | `E44` | Condizioni fisiche della strada (buche/dissesti, allagamenti, ghiaccio, neve, vento, | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.44 |
| [ ] | `E45` | Rifornimento/ricarica CONTESTUALE al viaggio (sul percorso vs deviazione X min; tipo | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.45 |
| [ ] | `E46` | LANE GUIDANCE evoluta: indicazione anticipata della corsia migliore ("mantieniti sulle | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.46 |
| [ ] | `E47` | GLOBAL-FIRST — NEXO VEO VISION NASCE MONDIALE (non "app italiana da tradurre"). | concettuale | — | NEXO_VEO_VISION_EXPANSION_47.txt pt.47 |

## Registro permanente UX/UI

| Fatto | ID | Requisito | Stato | Evidenza | Fonte dettagliata |
| --- | --- | --- | --- | --- | --- |
| [ ] | `U01` | IMMAGINI DI RIFERIMENTO (acquisite) | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §1 |
| [ ] | `U02` | PRINCIPIO GENERALE — GERARCHIA SCHERMATA NAVIGAZIONE | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §2 |
| [ ] | `U03` | IDENTITA' CROMATICA | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §3 |
| [ ] | `U04` | DOPPIO TEMA COMPLETO — CHIARO / SCURO | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §4 |
| [ ] | `U05` | MODALITA' AUTO — ADATTIVA ALL'AMBIENTE (non solo giorno/notte) | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §5 |
| [ ] | `U06` | TRANSIZIONI AMBIENTALI | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §6 |
| [ ] | `U07` | RILEVAMENTO AMBIENTE | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §7 |
| [ ] | `U08` | CONTROLLO UTENTE | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §8 |
| [ ] | `U09` | SINCRONIZZAZIONE AUTOMOTIVE | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §9 |
| [ ] | `U10` | POSIZIONE DEL VEICOLO | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §10 |
| [ ] | `U11` | ORIENTAMENTO MAPPA (almeno) | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §11 |
| [ ] | `U12` | BUSSOLA | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §12 |
| [ ] | `U13` | MODALITA' MAPPA | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §13 |
| [ ] | `U14` | ZOOM E CONTROLLO MAPPA | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §14 |
| [ ] | `U15` | CARD MANOVRA (in alto) | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §15 |
| [ ] | `U16` | AVVISI CONTESTUALI (sotto la manovra, quando serve) | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §16 |
| [ ] | `U17` | ROAD HORIZON (nuovo concetto visuale) | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §17 |
| [ ] | `U18` | VEO / GUARDA AVANTI | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §18 |
| [ ] | `U19` | INFORMAZIONI DI VIAGGIO (in basso, compatta) | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §19 |
| [ ] | `U20` | ALTERNATIVE LIVE (senza menu complessi) | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §20 |
| [ ] | `U21` | STATO VOCALE (Voice-First, ma discreto) | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §21 |
| [ ] | `U22` | SEGNALAZIONE RAPIDA | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §22 |
| [ ] | `U23` | MENU DURANTE LA NAVIGAZIONE (ridotto al minimo) | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §23 |
| [ ] | `U24` | MENU FUORI DALLA NAVIGAZIONE (indicativo, non definitivo) | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §24 |
| [ ] | `U25` | SMARTPHONE | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §25 |
| [ ] | `U26` | CARPLAY | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §26 |
| [ ] | `U27` | COERENZA TRA LE SUPERFICI | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §27 |
| [ ] | `U28` | INFORMAZIONE PROGRESSIVA | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §28 |
| [ ] | `U29` | SICUREZZA VISIVA | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §29 |
| [ ] | `U30` | PRINCIPI UX AGGIUNTI AI FONDAMENTI | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §30 |
| [ ] | `U31` | SMART NAVIGATION VIEW (visuale dinamica della mappa in navigazione) | concettuale | — | NEXO_VEO_VISION_UX_UI.txt §31 |

## Stato reale iniziale

- **Implementato e verificato come funzione utente:** nessuna voce del registro è
  attualmente marcata `[x]`.
- **Infrastruttura iOS/TestFlight:** PR #9 unita in `main` (`1c66a29b24df20ce7bded3b514ce88e534077281`); la pipeline è infrastruttura e non completa F1.
- **Runtime F1 in corso:** PR #12 implementa e verifica il core local-first dei luoghi salvati; manca ancora integrazione UI, mappa, ricerca e voce, quindi C001/C002/C005 restano `[ ]` e `parziale`.
- **Documentazione/architettura:** presenti Vision, Roadmap, UX/UI, espansione,
  vocabolario canonico e ADR F0; documentare non equivale a implementare.

## Fonti canoniche dettagliate

- `memory/NEXO_VEO_VISION.md`
- `NEXO_VEO_VISION_ROADMAP.txt`
- `NEXO_VEO_VISION_UX_UI.txt`
- `NEXO_VEO_VISION_EXPANSION_47.txt`
- `docs/architecture/adr/0001-f0-boundaries.md`
- `docs/architecture/canonical-vocabulary.md`
- `docs/architecture/privacy-data-classification.md`
- `docs/architecture/open-decisions.md`

## Protocollo per spuntare una funzione

Prima di cambiare `[ ]` in `[x]`, la stessa PR deve:

1. indicare l'ID del requisito nel titolo o nella descrizione;
2. implementare il comportamento senza eliminare la riga;
3. aggiungere o aggiornare test pertinenti;
4. registrare piattaforme e scenari realmente verificati;
5. aggiornare **Stato** ed **Evidenza** con PR, commit e test;
6. aggiornare il rapporto tecnico e `Fabio/FABIO_CONTROLLO.md`;
7. ottenere una Codex Review pulita sullo SHA corrente.

Se l'implementazione è parziale, la casella rimane vuota e lo stato diventa
`in corso` o `parziale`, con ciò che manca esplicitamente indicato.
