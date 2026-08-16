# NEXO VEO — Documento di Fondamento (Vision)

> STATO: SOLO VISIONE — NESSUNA IMPLEMENTAZIONE.
> Questo documento registra l'identità, la filosofia e i requisiti architetturali fondamentali di NEXO VEO.
> Lo sviluppo NON è iniziato e verrà richiesto in modo esplicito e progressivo dall'utente.

---

## 0. Regola operativa di questa fase
- NON programmare.
- NON implementare funzionalità.
- NON creare un MVP autonomamente.
- NON avviare agenti di sviluppo/testing.
- NON consumare crediti per build/verifiche.
- NON semplificare o ridurre la visione.
- NON trasformarlo in un normale navigatore.
- Attendere istruzione esplicita prima di qualsiasi implementazione.

---

## 1. Identità
- Nome progetto: **NEXO VEO**
- Non un semplice navigatore GPS, ma un **copilota stradale intelligente**.
- Principio guida: *"Un navigatore tradizionale conosce la mappa. NEXO VEO deve conoscere la strada."*
- Concetto di brand: **NEXO VEO — The road, alive.** (claim definitivo da decidere).

## 2. NEXO + VEO — un solo assistente
- Wake word intercambiabili: **"Nexo"** oppure **"Veo"** (l'utente può scegliere uno o entrambi).
- NEXO = connessione (strade, automobilisti, informazioni, eventi, percorsi).
- VEO = visione (comprende ciò che accade sulla strada, soprattutto davanti al guidatore).

## 3. Voice-First
- Tutto usabile in guida senza toccare lo schermo.
- Listener leggero per wake word quando consentito dall'OS (no bypass artificiale di iOS/Android).
- Linguaggio naturale, non comandi memorizzati.
- Principio: **VOICE-FIRST, TOUCH-COMPLETE** (tutte le funzioni anche via touchscreen).

## 4. Audio / Radio / Musica / Telefonate
- Convivenza con radio, musica, podcast, Bluetooth, CarPlay, Android Auto, telefonate, indicazioni vocali.
- Wake word non interrompe inutilmente l'ascolto.
- Comportamento OS standard: ducking, parla, ripristina.
- Priorità corretta alle telefonate; ripresa navigazione/voce a fine chiamata.

## 5. CarPlay & Android Auto (requisiti fondamentali, non opzionali)
- Architettura pensata da subito per: Apple CarPlay, Android Auto, controllo vocale, UI semplificata e sicura, test su auto reali.
- Considerare da subito l'entitlement CarPlay per app di navigazione (build/TestFlight quando consentito).

## 6. Cartografia & Motore di navigazione
- Non creare cartografia mondiale da zero.
- Valutare: Mapbox, ecosistema/dati OpenStreetMap, altri provider compatibili.
- Criteri di scelta: licenze, costi, routing, traffico realtime, offline, corsie, geocoding, POI, CarPlay, Android Auto, personalizzazione, scalabilità, uso commerciale.
- VIETATO scraping non autorizzato di altre app di navigazione.

## 7. Eventi stradali realtime
- Incidenti, veicoli fermi/in panne, code, rallentamenti, chiusure totali/parziali, cantieri (anche mobili), oggetti/detriti in carreggiata, allagamenti, ghiaccio, buche, animali, pedoni, semafori guasti, passaggi a livello, altri pericoli.

## 8. Eventi a livello di corsia
- Comprendere quale corsia è interessata quando i dati lo consentono (sinistra/centrale/destra/emergenza, restringimenti, ostacoli su corsia specifica).
- La corsia d'emergenza è una vera componente della strada.
- Esempio rappresentazione interna: A1 · Dir. Firenze · km XXX · Corsia d'emergenza · Veicolo fermo · Segnalato 4 min fa · Confermato da 6 utenti.

## 9. Live Road Layer (separato dalla Base Map)
- BASE MAP: elementi permanenti (strade, incroci, rotatorie, corsie, uscite, POI, restrizioni, accessi).
- LIVE ROAD LAYER: realtà temporanea (incidenti, traffico, chiusure, condizioni corsie, pericoli, lavori temporanei, segnalazioni community, inferenze).
- Gli eventi temporanei decadono in base a natura, tempo e conferme.

## 10. Traffic Fusion Layer
- Non dipendere solo dai propri utenti.
- Integrare fonti legittime (da valutare): TomTom, HERE, Mapbox Traffic, enti stradali, gestori autostradali, open data, comuni, autorità.
- Waze/Google Maps/proprietari: solo tramite API/partnership ufficiali, mai scraping.
- Fondamentale soprattutto con pochi utenti iniziali.

## 11. Fusione delle segnalazioni
- Fonti diverse sullo stesso evento non generano eventi separati.
- Esempio di sintesi: "Incidente — probabile chiusura corsia destra — affidabilità molto alta".

## 12. Confidence Score
- Ogni evento ha un livello di affidabilità interno.
- Aumenta con: segnalazioni indipendenti, conferme, utenti affidabili, dati ufficiali, provider, comportamento aggregato dei veicoli, coerenza tra fonti.
- Diminuisce con: smentite utenti, info contrastanti, tempo, ritorno alla normalità, fonte poco affidabile.
- Comunicazione non necessariamente in percentuale: "Possibile veicolo fermo" vs "Veicolo fermo confermato".

## 13. Segnalazioni Community
- Rapidissime: touch quando opportuno, voice in guida.
- Il sistema deduce automaticamente posizione/strada/direzione/orario/movimento senza interrogare inutilmente. Risposta minima: "Segnalato."

## 14. Reputazione & Punti
- Punti per segnalazioni utili; bonus maggiori per eventi critici (incidente grave, strada bloccata, contromano, ostacolo pericoloso, chiusura improvvisa).
- Conferme aumentano l'affidabilità; segnalazioni errate la riducono.

## 15. Anti-spam & Freeze
- Nessun accumulo punti spammando.
- Freeze temporaneo per segnalazioni ravvicinate/inutili; durata crescente col comportamento.
- Errori occasionali non puniti eccessivamente.

## 16. Road Trust contestuale
- Affidabilità contestuale per zona/percorso (es. utente storico affidabile sulla A1 Roma-Firenze).
- Non "vale più", ma ha storico affidabile in quel contesto.

## 17. Comunicazione diretta tra automobilisti
- Comunicazione contestuale tra utenti nella stessa area stradale.
- Principalmente VOCALE in guida. NON una chat che induca a leggere/scrivere guidando.
- Rete temporanea di comunicazione stradale contestuale.

## 18. Road Intelligence
- Automobilisti come sensori distribuiti (aggregati e rispettosi della privacy).
- Rilevamento rallentamenti improvvisi, cambi corsia sincronizzati, deviazioni spontanee.
- Domanda mirata a un automobilista appropriato per aumentare la confidence.

## 19. Map Evolution
- Eventi temporanei NON modificano la cartografia permanente.
- Comportamenti persistenti possono indicare cambiamenti reali (nuova strada/rotatoria/incrocio, senso unico, chiusura definitiva, nuove corsie, accessi, POI).
- Oltre soglia di affidabilità: entra nel layer aggiuntivo NEXO VEO o in processo di revisione/contribuzione verso provider compatibili.
- Mai modificare automaticamente DB cartografici esterni fuori dai processi previsti.

## 20. Correzioni mappa da parte degli utenti
- Proposte: strade/svolte/rotatorie mancanti, numero corsie, restrizioni, POI, parcheggi, ingressi, accessi, modifiche stradali.
- Integrazione automatica dopo segnalazioni indipendenti coerenti; soglie maggiori per modifiche critiche.

## 21. Tipi di percorso
- **FAST**, **SHORT**, **CHEAP**, **SCENIC**, **DISCOVER**, **TOUR**.
- Anche via linguaggio naturale ("Portami a Firenze, non ho fretta e voglio un bel viaggio").

## 22. TOUR generato dall'AI
- Trasforma A→B in esperienza con tappe basate su tempo, orari apertura, panorami, storia, cibo, belvedere, stagione, meteo, interessi, deviazione max, ora arrivo.
- Ogni tappa eliminabile/saltabile con ricalcolo immediato.

## 23. Preferenze di percorso
- Autostrade, pedaggi, traghetti, sterrate, strade strette/difficili, ZTL, zone basse emissioni, altre restrizioni.
- Permanenti o solo per viaggio corrente; anche vocali ("Oggi niente autostrada").

## 24. ZTL
- Attenzione particolare. Avviso prima dell'ingresso con opzioni **EVITA** / **ATTRAVERSA**; ricalcolo immediato se si evita.
- Considerare veicolo e permessi utente quando ci sono dati.

## 25. Profilo del veicolo
- Tipo (auto/moto/furgone/camper), alimentazione (elettrica/ibrida/benzina/diesel/GPL), dimensioni, classe emissioni, permessi, necessità ricarica, altre caratteristiche.
- Routing realmente compatibile col veicolo.

## 26. Alternative Live
- Alternative sempre disponibili in viaggio (tempo, traffico, pedaggio, panoramico).
- Cambio con singolo tap o vocale ("Nexo, prendi quello con meno traffico").

## 27. Ricalcolo continuo
- Verifica costante dell'appropriatezza del percorso; senza cambiare senza motivo. Il guidatore resta in controllo.

## 28. Route Explanation
- Spiegare il perché ("Ti faccio risparmiare ~7 min perché il traffico sulla A90 tra Appia e Tuscolana sta aumentando").

## 29. Navigazione predittiva
- Anticipare i problemi (traffico che peggiora 15 km avanti) con confronto costi/benefici della deviazione.

## 30. Dynamic Lane Intelligence
- Avvisi corsia quando affidabili (es. "Tra 2 km resteranno aperte solo le due corsie di sinistra"). La sicurezza ha priorità.

## 31. Road Ask
- "Nexo, perché siamo fermi?" → controlla eventi ufficiali/provider/community/traffico aggregato/utenti davanti.
- Se non sa: dirlo e proporre di chiedere agli automobilisti davanti.

## 32. Guarda avanti
- "Nexo/Veo, guarda avanti" → panoramica eventi nei prossimi km. Dà "occhi" molti km davanti all'auto.

## 33. Memoria stradale personale
- Con consenso: impara preferenze (es. Via Appia vs Tuscolana in certe fasce). Routing personale, non solo generico.

## 34. Navigazione conversazionale
- Comprende frasi naturali ("Trovami una strada più tranquilla", "Non voglio passare dentro Roma", "Sono stanco", "Voglio vedere il tramonto").

## 35. POI contestuali
- POI in relazione al viaggio (aperto all'arrivo, deviazione max, con parcheggio, prima dell'autostrada).

## 36. Journey Points
- Categorie: Food, Fuel, Charge, Rest, View, Visit, Emergency, Meet Point (permanenti o contestuali).

## 37. Safe Stop
- "Devo fermarmi" → luogo pratico e sicuro nella stessa direzione senza deviazioni significative.

## 38. Smart Scenic
- Panoramico ≠ solo "senza autostrada": coste, montagne, campagne, centri storici, boschi, belvedere, stagione, luce, alba/tramonto.
- Calcola dove sarà l'utente all'ora del tramonto e propone View Point compatibile.

## 39. Journey Awareness
- Comprende durata/contesto viaggio (es. "Guidi da ~3 ore, tra 11 min area di servizio senza deviazioni").
- In futuro: carburante, prezzi, autonomia, ricarica EV, telemetria.

## 40. Convoy / Together
- Viaggio condiviso volontario tra utenti stessa destinazione; ETA di gruppo, sosta comune.
- Privacy fondamentale: nessuna condivisione precisa/continua senza consenso esplicito.

## 41. Smart Emergency
- Non sostituisce i soccorsi, ma li aiuta: coordinate, strada, direzione, km, punto di riferimento, posizione.
- Rispettare leggi e regole delle piattaforme.

## 42. Road History
- Storia statistica dei tratti (es. "Traffico frequente lunedì 17-19"). Previsioni statistiche mai presentate come certezze.

## 43. Map Alive
- Ogni tratto con info interne: velocità, densità, incidenti, meteo, chiusure, pericoli, lavori, segnalazioni, affidabilità, cambiamenti, storico.
- Interfaccia comunque pulita (no mappa sommersa da icone).

## 44. Interfaccia pulita e intuitiva
- Priorità visive: strada → percorso → prossima manovra → info importanti → alternative → azioni contestuali.
- Zoom/pan/rotazione/ricentraggio/prospettiva fluidi.
- Identità propria: NON copiare Waze/Google/Apple Maps.

## 45. Priorità delle informazioni
- CRITICO (contromano, ostacolo immediato, chiusura pericolosa) / IMPORTANTE (incidente, corsia chiusa, traffico grave) / UTILE (alternativa, area servizio) / OPZIONALE (panorama, turismo).
- Più è pericoloso, più la comunicazione è immediata e inequivocabile.

## 46. Attenzione del guidatore
- "La migliore interfaccia in guida è quella che non devi guardare": voce, messaggi brevi, suoni significativi, info immediate. Mai interazioni lunghe con lo schermo in guida.

## 47. Privacy (by design)
- Distinguere: dati di navigazione necessari, telemetria temporanea, dati aggregati, personalizzazione opzionale, identità community, viaggi condivisi opzionali.
- Cronologia precisa non pubblica automaticamente; comunicazione tra automobilisti senza dati personali inutili.

## 48. Ruolo dell'AI
- Livello intelligente che coordina: linguaggio naturale, intenzione, routing, fusione fonti, confidence, POI contestuali, personalizzazione, TOUR, previsione, community, analisi comportamento, rilevamento cambiamenti mappa, spiegazioni.
- **L'AI NON INVENTA FATTI STRADALI.** Se non sa, lo dice ("Non ho ancora informazioni sufficientemente affidabili"). Mai inventare incidenti/chiusure/condizioni/restrizioni/traffico/eventi.

## 49. Dati reali, inferenze e demo
- Distinguere sempre: dato reale, ufficiale, provider, community, inferito, simulato per sviluppo.
- Dati simulati chiaramente identificabili internamente, mai confusi con dati realtime reali.

## 50. Evoluzione futura
- Da app di navigazione a **PIATTAFORMA DI ROAD INTELLIGENCE**.
- Risponde non solo "Come arrivo lì?" ma anche: cosa succede davanti, perché, cosa potrebbe succedere, quali alternative, cosa vedere, dove fermarsi, qual è il percorso migliore PER ME.

---

## 51. Principi fondamentali (da mantenere sempre)
1. VOICE-FIRST, TOUCH-COMPLETE
2. DATI REALI PRIMA DELLE SUPPOSIZIONI
3. COMMUNITY + FONTI UFFICIALI + PROVIDER + COMPORTAMENTO STRADALE
4. IL GUIDATORE RIMANE IN CONTROLLO
5. DISTRAZIONE MINIMA
6. SPIEGARE, NON SOLTANTO RICALCOLARE
7. LA MAPPA DEVE EVOLVERE CON LA REALTÀ
8. IL VIAGGIO È IMPORTANTE QUANTO LA DESTINAZIONE
9. L'AI NON INVENTA LA REALTÀ
10. *Un navigatore tradizionale conosce la mappa. NEXO VEO deve conoscere la strada.*

---

## Requisiti architetturali fondamentali (da rispettare fin dall'origine, quando inizierà lo sviluppo)
- CarPlay & Android Auto
- Voice-First
- Live Road Intelligence (Base Map + Live Road Layer + Traffic Fusion + Confidence)
- Indipendenza dai singoli provider
- Privacy by design
- Nessuna decisione irreversibile sull'architettura in questa fase.

## Prossimo passo
- ATTENDERE istruzione esplicita dell'utente prima di iniziare qualsiasi implementazione.
- Lo sviluppo sarà suddiviso in fasi, richieste progressivamente.
