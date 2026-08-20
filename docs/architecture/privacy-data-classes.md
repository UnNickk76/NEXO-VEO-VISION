# Privacy by design e classi dati

## Principi vincolanti

- **Finalità e minimizzazione:** raccogliere solo il minimo necessario per una
  finalità dichiarata, specifica e comprensibile; nessun riuso incompatibile.
- **Consenso e controllo:** posizione precisa, cronologia, voce, personalizzazione
  e contributi community richiedono scelte granulari e revocabili. Il rifiuto non
  deve attivare raccolte alternative occulte.
- **Local-first:** elaborare sul dispositivo quando ragionevolmente possibile;
  inviare al server solo ciò che serve, per il tempo minimo e protetto in transito
  e a riposo. “Locale” non significa automaticamente privo di rischio.
- **Trasparenza:** spiegare dati, scopo, destinatari, retention e conseguenze prima
  della raccolta. È vietato usare posizione o voce per finalità non dichiarate.
- **Separazione:** dati simulati separati dai reali; identità separata da
  telemetria/report ove possibile; ambienti e accessi secondo least privilege.
- **Diritti:** accesso/esportazione quando applicabile, rettifica, revoca e
  cancellazione effettiva incluse copie derivate nei tempi definiti dalla policy.
- **Sicurezza:** cifratura, audit accessi, rate limit, protezione abusi e valutazione
  d'impatto prima di trattamenti ad alto rischio. Nessun segreto nei contratti.

Le durate numeriche, basi giuridiche e ruoli controller/processor sono decisioni
legali aperte. “Durata minima” sotto significa una policy esplicita e approvata
prima del runtime, non conservazione indefinita.

## Matrice di classificazione

| Categoria | Finalità consentita e raccolta minima | Consenso | Conservazione e cancellazione | Condivisione e protezione | Trattamento | Rischi principali |
| --- | --- | --- | --- | --- | --- | --- |
| **Dati pubblici** | Mostrare cartografia, regole e informazioni pubblicate legittimamente; solo campi/area necessari. | In genere no per la lettura, salvo combinazioni/profilazione; rispettare licenza. | Cache entro licenza e freshness; scadenza/rimozione alla revoca o obsolescenza. | Solo secondo licenza, attribuzione e condizioni; aggregare dove utile. | Locale e/o server. | Licenza, dato obsoleto, falsa autorità, re-identificazione per combinazione. |
| **Dati tecnici** | Operare app/API: versione, capability, errori, stato rete; escludere contenuti utente non necessari. | Informativa; consenso se diventa analytics non essenziale. | Log brevi e rotazione; cancellazione automatica e su richiesta se associati. | Fornitori operativi minimi, contratti e accessi limitati; pseudonimi. | Locale e server. | Fingerprinting, esposizione stack, correlazione account. |
| **Dati personali** | Account, preferenze e servizio richiesto; soli attributi indispensabili. | Base/consenso da definire per finalità; opt-in separato per extra. | Finché account/finalità lo richiede; cancellazione account e backup secondo policy. | Solo processor dichiarati o obbligo legale; pseudonimizzare. | Preferire locale; server se necessario. | Furto identità, profilazione, accesso non autorizzato. |
| **Dati sensibili** | Solo funzione esplicita e valutata; evitare inferenze su salute, religione, politica o altre categorie protette. | Esplicito e granulare; DPIA/parere legale prima della raccolta. | Default: non raccogliere; se indispensabile durata minima e cancellazione verificabile. | Nessuna condivisione non indispensabile; cifratura forte e accessi auditati. | Locale per default; server solo approvato. | Danno grave, discriminazione, obblighi normativi elevati. |
| **Posizione precisa** | Navigazione, routing, evento corrente e soccorso richiesto; precisione/frequenza minime al caso. | Permesso OS più consenso contestuale; background separato e revocabile. | Effimera per sessione per default; niente storico implicito; cancellazione/revoca immediatamente efficace. | Provider solo per richiesta necessaria e dichiarata; ridurre precisione/pseudonimizzare. | Locale preferito; server solo per capability esplicita. | Sorveglianza, stalking, inferenza casa/lavoro/luoghi sensibili. |
| **Cronologia spostamenti** | Replay/memoria percorso/personalizzazione solo opt-in; registrare segmenti minimi. | Esplicito, separato e revocabile. | Default disattivata; durata scelta dall'utente/policy; delete singolo/totale e derivati. | Non condividere salvo export scelto o processor dichiarato; pseudonimizzare/cifrare. | Locale preferito; sync server opzionale. | Profilazione profonda, routine e luoghi sensibili, coercizione. |
| **Voce e trascrizioni** | Wake/intent e risposta richiesta; buffer/audio minimo, distinguere audio da testo. | Microfono OS e consenso esplicito per invio/retention; wake word separata. | Elaborazione effimera per default; niente registrazione permanente; cancellazione audio/testo/derivati. | STT/AI solo se dichiarati e necessari, senza addestramento secondario non acconsentito. | Locale preferito; remoto/ibrido solo trasparente. | Conversazioni di terzi, biometria vocale, intercettazione, uso secondario. |
| **Profilo veicolo** | Routing legale/sicuro e rifornimento: tipo, alimentazione, dimensioni, peso, emissioni/permessi minimi. | Esplicito per salvataggio/sync; input sessione senza persistenza possibile. | Finché scelto dall'utente; modifica e cancellazione immediate, backup a scadenza. | Routing provider solo campi necessari; pseudonimizzare e non esporre permessi. | Locale preferito; server opzionale. | Identificazione, patrimonio/abitudini, routing pericoloso se errato. |
| **Segnalazioni community** | Informare su Road Event e conferme; posizione/tempo/categoria minimi, nessun testo/audio superfluo. | Conferma esplicita dell'invio; informativa su visibilità/moderazione. | Fino a scadenza evento più finestra anti-abuso minima; cancellare/anonimizzare contributo e allegati. | Pubblicare solo evento aggregato/pseudonimo; moderatori con accesso limitato. | Raccolta locale, normalizzazione server probabile. | Re-identificazione, falsi report, diffamazione, abuso, localizzazione reporter. |
| **Identificatori dispositivo/account** | Sessione, sicurezza, preferenze e anti-abuso; usare ID rotabili, non advertising ID. | Informativa/base da definire; consenso per tracking non essenziale. | Finché sessione/account o finestra sicurezza; revoca token e cancellazione associazioni. | Auth/security processor soltanto; hash/pseudonimi e separazione dai contenuti. | Locale sicuro e server. | Tracking cross-context, account takeover, linkage. |
| **Telemetria e diagnostica** | Stabilità, performance, sicurezza e qualità aggregata; eventi allowlist, niente posizione/voce payload per default. | Opt-in per analytics non essenziale; crash essenziali con informativa e scelta ove richiesta. | Finestre brevi aggregate; cancellazione automatica e dell'associazione utente. | Processor dichiarati, regione/trasferimenti valutati; aggregare e pseudonimizzare. | Locale per filtrare, server per aggregare. | Leakage nei log, fingerprinting, ricostruzione tragitti. |

## Regole operative future

Prima di implementare una raccolta, il relativo contratto deve indicare: classe,
controller/processor, base giuridica, campi, finalità, consenso, origine, destinatari,
regione, retention numerica, cancellazione, sicurezza e owner. Campi non censiti
sono vietati. Revoca e modalità offline devono essere testabili.

Per safety e community, anonimizzazione significa irreversibilità ragionevolmente
dimostrata; se esiste una chiave di ricongiungimento si parla di pseudonimizzazione,
con chiave separata e accesso limitato. Aggregazione insufficiente non va descritta
come anonima.

## Non decisioni

Questo documento non approva analytics, cloud, MongoDB, autenticazione, STT/AI,
durate specifiche, trasferimenti internazionali o basi giuridiche. Tali scelte
richiedono valutazione legale, sicurezza, provider e consenso di prodotto.
