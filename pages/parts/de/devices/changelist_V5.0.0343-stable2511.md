## Firmware-/System-Schnittstellen-Updates

- Der Code für die Abwärtskompatibilität mit älteren Umgebungen (ABI 1.0; genauer gesagt: die „v3.1 *Loongson CPU Unified System Architecture Specification*“) wurde entfernt, wobei alle Plattformen auf die v4.0-Spezifikation umgestellt wurden ([Referenzlink](https://github.com/tianocore/edk2/)).
- Die Compiler-Toolchain wurde von GCC 8.3 auf GCC 12/13/14 umgestellt, wobei die EDK2-Community-Toolchain vollständig übernommen wurde.
- Die Optionen für den alten Startmodus wurden aus der Setup-Oberfläche entfernt; es wird nun vollständig die 1:1-Adresszuordnung von VA zu PA verwendet.
- Migration vom veralteten UDK2018 auf EDK2025, wobei die meisten LoongArch-Infrastruktur-APIs nun mit den Upstream-Implementierungen von EDK2 übereinstimmen.

## Modul-Updates

- Unterstützung für Plattformen auf Basis von Single- oder Multi-Socket-3B6000-, 3C6000/{S,D,Q}- und 2K3000/3B6000M-Plattformen wurde hinzugefügt.
- Aktualisierter Code für verschiedene Software-/Hardwaremodule, wie z. B. PHY, MRC, SMC, IPMI, MultiArch, eMMC usw.

## Neue Funktionen

Allgemeine Funktionsaktualisierungen:

- Einführung von MultiArchUefiPkgs zur Unterstützung der x86-Option-ROM-/EFI-Emulation und der Filterung für Peripheriegeräte von Drittanbietern (kann im Firmware-Setup aktiviert/deaktiviert werden).
- Es wurde eine Option zur Konfiguration der Speicherfrequenzen eingeführt – bei Bedarf kann die Speichertaktfrequenz zur Verbesserung der Kompatibilität herabgesetzt werden (die konfigurierbaren Frequenzen können je nach Modell variieren; die Benutzeroberfläche für die Firmware-Einstellungen bietet Optionen zur Wiederherstellung der Einstellungen; alternativ kann man auch die CMOS-Batterie entfernen, um die Einstellungen zurückzusetzen).
- Es wurden Einstellungsoptionen zum Anpassen der Auflösungen für die Benutzeroberfläche und die Konsole hinzugefügt.
- Die Option „DSM#5“ wurde hinzugefügt, um die Strategie zur Zuweisung von PCIe-Ressourcen im Linux-Kernel zu steuern.
- Unterstützung für Peripheriegeräte chinesischer Herkunft hinzugefügt, darunter RAID-Controller von HRDT und 25/40-GbE-Netzwerkkarten von BZWX.
- Es wurden Multi-GPU-Optionen hinzugefügt, sodass nun unter UEFI die gleichzeitige Anzeige über verschiedene GPUs möglich ist.
- TPM- und Secure-Boot-Funktionalität hinzugefügt, mit Unterstützung für Algorithmen wie SHA-384, SHA-512 und SM3 (Hardware-TPM-Unterstützung erforderlich).
- Die Ansichten für PCIe-, Festplatten- und USB-Informationen wurden getrennt, und es wurde eine Anzeige mit detaillierten Festplatteninformationen hinzugefügt.
- SRAT wurde auf Version 6.5 aktualisiert und unterstützt nun die x2APIC-Erweiterung.
- Die Codelogik in Bezug auf das Aufwachen von LoongArch-Multicore-Kernen, die Ausnahmebehandlung, die MMU usw. wurde aus dem EDK2-Upstream synchronisiert.

Plattformspezifische Funktionen:

- Unterstützung für das Einrichten von PCIe 4.0-Geräten für Loongson Coherent Link (LCL)-Plattformen – Serien 3B6000 und 3C6000/{S,D,Q} – hinzugefügt.
- Unterstützung für 2K3000 eMMC hinzugefügt.
- Unterstützung für die Überwachung von ACPI-Temperaturzonen und HWMon für den 3C6000 hinzugefügt.
- ACPI-EDAC-Unterstützung für Serverplattformen hinzugefügt, wodurch die Abfrage des ECC-Status unter Linux ermöglicht wird.
- Verbesserte SMC-basierte Leistungsbegrenzung, „Turbo-Boost“ sowie Lüfterüberwachung/-steuerung bei ausgewählten Modellen.
- Unterstützung für die Berichterstellung zur Ressourcenbeschreibung der Security Engine (SE) über DSDT-Tabellen bei ausgewählten Modellen.

## Fehlerbehebungen und Optimierungen

Allgemeine Korrekturen:

- Es wurden potenzielle Systemabstürze behoben, die auf Serverplattformen mit einem Sockel auftraten, wenn „All Video“ als primäre Anzeige ausgewählt wurde und sowohl eine diskrete Grafikkarte als auch eine BMC-Grafikkarte installiert waren.
- Das Problem mit der fehlerhaften Anzeige der Firmware-Version und der Erstellungszeit auf dem Startbildschirm wurde behoben.
- Optimierte Unterstützung für SMBIOS-Tabellen, wobei vor allem logische Fehler bei DMI Typ 7 behoben wurden.
- Unerwartete Systemabstürze bei RTC-LP-Schreibvorgängen wurden behoben.
- Bekannte Probleme mit der ACPI-Tabelle wurden behoben.
- Die falsche Reihenfolge beim Umschalten der SATA-Port-Controller wurde behoben.
- Es wurden mehrere Probleme bei der chinesischen Übersetzung behoben.
- Das sporadische Verschwinden des Logos beim Hochfahren wurde behoben.

Plattformspezifische Korrekturen und Anpassungen:

- Es wurde ein Problem behoben, bei dem Informationen zu GMAC-Netzwerkkarten bei bestimmten Modellen möglicherweise nicht angezeigt wurden.
- Die Taktfrequenz des 7A2000-Bridge-Chips wurde auf Serverplattformen auf 750 MHz reduziert.
- Die Kompatibilität mit dem BMC-Befehlsprotokoll der Modelle AST2500 und LS2K0500 wurde optimiert, wodurch Probleme bei der IPMI-Anzeige und Fehler bei bestimmten Befehlen behoben wurden.
- Die Desynchronisation der SMBIOS-Informationen in der Weboberfläche des BMC wurde behoben, wenn ein LS2K0500-BMC mit Firmware-Versionen höher als v2.2.2 verwendet wird.
- Probleme mit der verkehrten P-N-Verdrahtung bei SATA und falschen LnkCap2-Einstellungen für PCIe auf bestimmten Plattformen wurden behoben.
- Fehlerbehebung bei der 2K0500 BMC Serial-over-LAN (SOL)-Ausgabe.
- PPTT-Tabellen für mehrere Chips wurden korrigiert.
- Die PTW-Funktion wurde deaktiviert, um Datenbeschädigungen aufgrund von Problemen mit der Seitentabelle des Linux-Kernels zu verhindern (wird wieder aktiviert, sobald entsprechende Kernel-Korrekturen allgemein verfügbar sind).
- Die Beschreibungen der ACPI-GPIO-Ressourcen wurden für einige Plattformen entfernt, um Kompatibilitätsprobleme zu vermeiden (sie werden wieder hinzugefügt, sobald eine breite Unterstützung durch Betriebssysteme verfügbar ist).

Funktionale Optimierungen:

- Verschiedene Schnittstellen zur Firmware-Konfiguration wurden verbessert.
- Verbesserte BMC-Präsenzerkennung und Konfigurationsoberfläche, ergänzt um FRU-Datenerweiterungen, Steuerelemente für die USB-Anschlüsse und vieles mehr.

Die oben genannten Informationen stammen ursprünglich von Loongson Technology [Hinweise zur Firmware-Version](https://github.com/loongson/Firmware/blob/main/docs/changelist_V5.0.0343-stable2511.md); an mehreren Stellen neu gegliedert und umformuliert, um die Lesbarkeit zu verbessern.
