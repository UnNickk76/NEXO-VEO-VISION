# Vocabolario canonico NEXO VEO VISION

Questi termini sono normativi per documentazione e futuri contratti. Un provider
può usare nomi diversi solo dentro il proprio adapter.

| Termine | Significato tecnico canonico |
| --- | --- |
| **Base Map** | Rappresentazione versionata della realtà stradale relativamente permanente: geometria, intersezioni, corsie, uscite, accessi, restrizioni e POI. Non contiene lo stato temporaneo della strada. |
| **Live Road Layer** | Livello separato di informazioni temporanee georiferite (eventi, traffico, chiusure, lavori e pericoli), soggetto a freshness, time decay e rimozione. Non riscrive automaticamente la Base Map. |
| **Road Object** | Entità stradale classificata del Road Object Layer, statica o dinamica, descritta almeno da categoria, fonte, posizione, direzione, timestamp, Confidence e Verification Status. La corsia è obbligatoria solo quando determinabile; è facoltativa o non applicabile per intera carreggiata, incrocio, attraversamento, geometria o evento senza corsia determinabile e non va mai inventata. La relazione con Base Map e Live Road Layer dipende da permanenza e stato. |
| **VEO Context** | Contratto versionato del contesto utile all'unico assistente generale e di navigazione: raccoglie stato qualificato del Journey, guida e conversazione. Qualifica separatamente Availability, Provenance/Derivation e Verification Status, così un dato può essere insieme disponibile, dedotto e corroborato/verificato; l'assenza non è uno stato di verifica. Non esegue comandi e non stabilisce la verità stradale. |
| **Multimodal Journey Model** | Modello di un unico viaggio continuo composto da segmenti modali e transizioni, inclusi auto, piedi, soste e parcheggio; è estendibile a trasporto pubblico e modalità future senza implicarne l'integrazione runtime. |
| **Driver/Passenger Role** | Ruolo d'interazione dichiarato o rilevato con incertezza: `driver` impone voice-first e minima distrazione, `passenger` può abilitare interazioni più ricche nei limiti della Surface. Il ruolo non è un'identità e non può essere presunto con falsa certezza. |
| **SNV (Smart Navigation View)** | Sistema evolutivo e versionato che decide la porzione e la rappresentazione della strada in base al contesto disponibile, rispettando controllo manuale, sicurezza e capability della Surface. Non è sinonimo di semplice auto-zoom e non è un provider cartografico. |
| **Road Event** | Fatto o osservazione temporanea che interessa una strada, direzione o corsia; può essere statico o mobile e deve dichiarare se una posizione mobile è osservata o stimata. È il concetto generale. |
| **Traffic Event** | Road Event relativo a flusso, velocità, coda, congestione o interruzione della circolazione. Non implica una causa nota. |
| **Hazard** | Road Event che può aumentare il rischio per utenti o veicoli: ostacolo, veicolo fermo, ghiaccio, allagamento, contromano o altra condizione pericolosa. |
| **Community Report** | Osservazione inviata da un utente. È evidenza, non automaticamente verità; conserva contesto minimo, tempo, fonte pseudonima e Verification Status. |
| **Official Source** | Autorità pubblica, ente stradale, gestore o feed formalmente competente e autorizzato per quel dato. |
| **Provider Source** | Servizio esterno autorizzato/contrattualizzato che fornisce dati o capacità; non è “official” salvo che il singolo dato ne conservi la provenienza ufficiale dimostrabile. |
| **Community Source** | Uno o più utenti che producono o confermano una segnalazione; identità e reputazione non devono essere esposte nella UI. |
| **Inferred Source** | Risultato calcolato da osservazioni o modelli, non osservazione diretta. Input, metodo/versione e incertezza devono essere tracciabili. |
| **Simulated Source** | Dato sintetico usato esclusivamente per demo o test, isolato dai dati reali e marcato in modo inequivocabile end-to-end. |
| **Availability** | Presenza conoscibile dell'elemento nel contesto: `available`, `unavailable` o `unknown`. È indipendente da origine e verifica; `unavailable` e `unknown` non sono Verification Status. |
| **Provenance/Derivation** | Origine e derivazione tramite le categorie canoniche applicabili, incluse `official`, `provider`, `community`, `observed`, `reported`, `inferred` e `simulated`. Non determina da sola disponibilità o verifica. |
| **Confidence** | Stima contestuale e motivabile dell'affidabilità corrente di un'informazione, derivata da qualità/indipendenza/coerenza delle fonti, Verification Status e tempo. Non equivale a probabilità assoluta né a verità. |
| **Freshness** | Età e validità temporale del dato rispetto al suo timestamp, alla natura dell'evento e alla frequenza attesa di aggiornamento. |
| **Time Decay** | Regola esplicita che riduce Confidence col trascorrere del tempo e porta a declassamento, scadenza o rimozione. Dipende dal tipo di evento. |
| **Provenance** | Catena verificabile di origine e trasformazioni: classe fonte, identificatore non ambiguo, timestamp di osservazione/ricezione, licenza/diritti applicabili, adapter e inferenze/fusioni. |
| **Verification Status** | Stato distinto dalla Confidence, almeno: `unverified`, `corroborated`, `verified`, `disputed`, `expired`, `retracted`; `simulated` è una marcatura di origine, mai uno stato reale. |
| **Vehicle Profile** | Dati e preferenze del mezzo rilevanti al viaggio: modalità/tipo, alimentazione, dimensioni, peso, emissioni, permessi e necessità energetiche. Contiene dati potenzialmente personali. |
| **Route Constraint** | Condizione obbligatoria o preferenza dichiarata applicabile al calcolo percorso (ZTL, pedaggi, altezza, peso, alimentazione, emissioni, traghetti, fondo). Deve distinguere divieto/sicurezza da preferenza. |
| **Voice Intent** | Interpretazione strutturata, ancora non esecutiva, di ciò che l'utente vuole ottenere; include input/lingua, entità, ambiguità e confidence dell'interpretazione. |
| **Command** | Richiesta validata e indipendente dalla Surface per eseguire un use case, con autorizzazione, contesto minimo, idempotenza/correlazione ed esito osservabile. |
| **Surface** | Canale di interazione con capacità e limiti propri: telefono, CarPlay o Android Auto. Presenta stato ed emette input, senza possedere regole di dominio. |
| **Provider Adapter** | Componente infrastrutturale sostituibile che implementa una porta NEXO, traduce capability/dati/errori di un provider e preserva provenienza e limiti di licenza. |

## Invarianti obbligatori

1. Un dato **Simulated Source non può mai essere presentato come reale**, alimentare
   decisioni reali o mescolarsi senza marcatura a dataset reali.
2. Un dato dedotto deve essere dichiarato **Inferred Source** nella UI quando
   rilevante e sempre nei metadati; l'AI non inventa la realtà stradale.
3. Ogni evento conserva almeno fonte/provenance, timestamp dell'osservazione,
   Confidence e Verification Status. Ricezione e aggiornamento vanno distinti
   dall'istante osservato.
4. Le informazioni scadute perdono Confidence secondo Time Decay o sono rimosse;
   non vengono mantenute “vere” per assenza di aggiornamenti.
5. I dati di una Official Source prevalgono a parità di pertinenza, specificità e
   tempo. Possono essere superati solo da evidenza più recente, documentata,
   corroborata e tracciabile; il conflitto resta visibile e non cancella la fonte.
6. La UI comunica origine, età, affidabilità e carattere stimato/simulato con
   linguaggio e segnali coerenti, senza percentuali ingannevoli né distrazione in
   guida. Le Surface automotive mostrano una sintesi ancora più prudente.
7. “Realtime” significa aggiornato entro una soglia dichiarata per la capability,
   non istantaneo. “Offline” non implica che il Live Road Layer sia aggiornato.
8. Fusione e deduplicazione preservano tutte le provenance; non trasformano molte
   copie della stessa fonte in conferme indipendenti.

## Esempi di comunicazione

- Official e corrente: “Corsia destra chiusa · fonte ufficiale · aggiornato 2 min fa”.
- Community corroborata: “Possibile veicolo fermo · più segnalazioni · 4 min fa”.
- Inferenza: “Rallentamento stimato più avanti”, mai “Coda confermata”.
- Scaduto: rimosso dalla guida attiva o mostrato fuori guida come “informazione
  scaduta”, non come evento corrente.
- Simulato: banner persistente “SIMULAZIONE — dati non reali”.
