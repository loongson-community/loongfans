export default {
  basic: {
    series:
      "Die Produktreihe bezeichnet die Produktfamilie, zu der dieses Produkt gehört.",
    market:
      "Der Begriff „Marktsegment“ bezieht sich auf die von Loongson Technology empfohlenen Kosten und Anwendungsbereiche. Bitte beachten Sie, dass dies nicht die tatsächlichen Anwendungsbereiche und Szenarien widerspiegelt, in denen Produkte auf Basis dieses Chips eingesetzt werden.",
  },
  cpu: {
    voltage:
      "Die typische Spannung bezieht sich auf die typische Kernspannung, die für einen stabilen Betrieb bei der Nennfrequenz erforderlich ist.",
    tpc: `Der typische Stromverbrauch bezieht sich auf den normativen Stromverbrauch bei normaler Auslastung.

        Hinweis: Der typische Stromverbrauch gibt nicht den Stromverbrauch für jeden einzelnen Anwendungsfall wieder.`,
    tdp: `Die thermische Auslegungsleistung bezeichnet die maximale Wärmeabgabe unter extremer Belastung.

        Hinweis: Die thermische Auslegungsleistung gibt nicht den tatsächlichen Stromverbrauch dieses Chips wieder.`,
  },
  memory: {
    ecc: `ECC-Speichermodule sind in der Lage, interne Datenfehler zu erkennen und zu korrigieren, und tragen nachweislich zur Verbesserung der Systemstabilität und -zuverlässigkeit bei. ECC benötigt zusätzliche 8 Bit, um Prüfsummen für jeweils 64 gespeicherte Datenbits zu speichern. Beim Auslesen der Daten werden diese anhand der genannten Prüfsumme überprüft, um fehlerhafte Daten zu erkennen und zu reparieren, wodurch verhindert wird, dass fehlerhafte Daten den Prozessor erreichen.
        
        Hinweis: Die ECC-Speicherunterstützung wird auf Motherboard- und Firmware-Ebene implementiert. Bitte wenden Sie sich für weitere Informationen an den Hersteller Ihres Geräts.`,
  },
  exp: {
    io_name:
      "Unter I/O-Schnittstelle versteht man den Kanal, über den der Prozessor Daten mit Peripheriegeräten austauscht.",
    io_rev: `Die I/O-Schnittstellenversion gibt an, mit welcher Version die primäre I/O-Schnittstelle arbeitet.
                
        Hinweis: Die Unterstützung für PCI Express 4.0 ist auf Motherboard- und Firmware-Ebene implementiert. Weitere Informationen erhalten Sie vom Hersteller Ihres Geräts.`,
    d2d_name: `Unter „Die-to-Die-Verbindung“ versteht man die Technologie, mit der mehrere Prozessorchips miteinander verbunden werden.

        Loongson Coherent Link ist eine firmeneigene Die-to-Die-Verbindung, die eine geringere Latenz und eine höhere Bandbreite als HyperTransport 3.0 bietet.
HyperTransport ist ein serieller/paralleler Punkt-zu-Punkt-Bus mit hoher Geschwindigkeit und geringer Latenz, der üblicherweise zur Herstellung von Verbindungen zwischen Prozessoren, Chipsätzen, Speichercontrollern und E/A-Peripheriegeräten verwendet wird.`,
  },
  package: {
    temperature:
      "Der Temperaturbereich bezeichnet den Bereich, den die Oberfläche des Chipgehäuses erreichen darf.",
    t_case:
      " (Gehäusetemperatur) bezeichnet die maximale Temperatur, die die Oberfläche des Chips erreichen darf.\n\nHinweis: ",
    t_junction:
      "(Sperrschichttemperatur) bezeichnet die maximale Temperatur, bei der die inneren Bauteile des Chips (und die Transistoren) betrieben werden dürfen.\n\nHinweis: ",
    t_notice:
      "legt die Leistungsanforderungen an die Kühlvorrichtungen sowie die Umgebungsbedingungen fest, die für diesen Chip erforderlich sind.",
  },
  power: {
    clock_gating:
      "Clock Gating ist eine Technologie zur Energieeinsparung, bei der die Taktsignale für nicht aktive Schaltkreise deaktiviert werden, um unnötigen dynamischen Stromverbrauch zu minimieren.",
    frequency_scaling:
      "Dynamische Frequenzskalierung bezeichnet die Fähigkeit des Prozessors, seine Taktfrequenz entsprechend der aktuellen Auslastung und dem Strombedarf anzupassen.",
    voltage_scaling:
      "Adaptive Spannungsskalierung bezeichnet die Fähigkeit des Prozessors, seine Kernspannung (innerhalb des Nennbereichs) entsprechend der aktuellen Taktfrequenz und Auslastung anzupassen.",
  },
  tech: {
    isa: {
      info: "Der Begriff „Befehlssatz“ bezeichnet die Grundausstattung an Befehlen und Anweisungen, die der Prozessor verstehen und ausführen kann.",
      extensions:
        "ISA-Erweiterungen bezeichnen die zusätzlichen Befehle, die zusätzlich zum Basisbefehlssatz implementiert wurden.",
      LBT: "Loongson Binary Translation\n\nEin Satz erweiterter Befehle zur Verbesserung der Ausführungsleistung von Code, der auf einer fremden Architektur basiert. Die LBT-Erweiterung implementiert sowohl nicht privilegierte als auch privilegierte Befehle.",
      LVZ: "Loongson-Virtualisierung\n\nEin Satz erweiterter Befehle zur Implementierung von Hardwarebeschleunigung für die Virtualisierung auf Systemebene. Die LVZ-Erweiterung umfasst vor allem privilegierte Befehle, die zur Steuerung von Statusregistern sowie zur Implementierung zusätzlicher Funktionen für Ausnahmen, Interrupts und Speicherverwaltung dienen.",
      LSX: "Loongson SIMD-Erweiterung\n\nEin Satz erweiterter Befehle zur Umsetzung von „Single-Instruction, Multiple-Data“ (SIMD). Die LSX-Erweiterung wird auf speziellen Registern implementiert, um rechenintensive Aufgaben zu beschleunigen. Die LSX-Erweiterung arbeitet mit einer Vektorbreite von 128 Bit.",
      LASX: "Loongson Advanced SIMD eXtension\n\nÄhnlich wie LSX, arbeitet jedoch mit einer Vektorbreite von 256 Bit.",
    },
  },
}
