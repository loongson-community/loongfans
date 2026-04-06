### Die Helligkeitsregelung ist bei Distributionen mit ABI 2.0 möglicherweise nicht verfügbar

Aufgrund einer Änderung der vorgelagerten Kernel-API und einer problematischen Implementierung des Loongson-PWM-Treibers sowie des Fehlens von `gpio_base` Hinweis: Bei einigen Linux-Distributionen ist die Steuerung der Laptop-Hintergrundbeleuchtung möglicherweise nicht verfügbar.

Um dieses Problem zu beheben, ist Folgendes erforderlich:

- [Zusätzliche ACPI-Initialisierungsroutinen auf Board-Ebene](https://github.com/AOSC-Tracking/linux/commit/dbb668a14178)and entsprechende Änderungen am LoongGPU-Kernel-Treiber (wie implementiert durch [AOSC-Betriebssystem](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commit/aaee8cb5d7f879ba4cd2cb268a8591f99735b729) sind erforderlich – der korrekte Aufruf der PWM-Controller und die Funktion zum vollständigen Ausschalten der Hintergrundbeleuchtung über GPIO.
- Ein Patch zur Korrektur der Frequenzberechnung des PWM-Controllers, siehe [dieser Kernel-Patch von AOSC OS](https://github.com/AOSC-Tracking/linux/commit/30b69e76d820) (Dieser Patch ist nun Teil von Linux 6.18).
