---
layout: page
returnLink: /de/guides
pageTitle: Firmware retten
pageSubTitle: Wiederherstellung von Hardware, die nach einem Firmware-Update nicht mehr bootet
---

# Wiederherstellung beschädigter Firmware mit einem Programmiergerät

## Bevor Sie beginnen

Wenn Sie diese Seite lesen, ist Ihre Hardware wahrscheinlich aufgrund eines fehlerhaften Firmware-Flashes oder -Updates nicht mehr bootfähig. Diese Anleitung hilft Ihnen dabei, die Firmware mithilfe eines Programmiergeräts neu zu flashen.

Bevor Sie beginnen, vergewissern Sie sich, dass Sie über folgende Werkzeuge verfügen:

1. Ein weiterer funktionierender Computer
2. CH341A USB-Treiber
3. SOIC-8-Klemme oder -Sonde (die meisten SPI-Flash-Chips sind vom Typ SOP8-208mil). Verwenden Sie für ASUS-Motherboards das spezielle ASUS-Flashing-Kabel.
4. 1,8-V-Abwärtswandlermodul (die meisten Loongson-Motherboards verwenden 1,8-V-Flash-Speicher). Nicht erforderlich, wenn bestätigt ist, dass Ihr Flash-Speicher 3,3 V oder 5 V verwendet
5. Bei Flash-Chips, die sich unter dem CPU-Kühler befinden, benötigen Sie außerdem Wärmeleitpaste, um den Kühler nach der Reparatur wieder anzubringen

Stellen Sie außerdem sicher, dass Sie die erforderliche Software installiert haben:

1. **Windows**: Installieren Sie den CH341A-Treiber. Wir empfehlen [NeoProgrammer mit aktualisierter Chip-Datenbank (Quelle: Enshan Wireless Forum)](https://www.right.com.cn/FORUM/thread-8289988-1-1.html)
2. **macOS / Linux**: Verwenden Sie [IMSProg](https://github.com/bigbigmdm/IMSProg)

Bauen Sie das Programmiergerät vor dem Flashen wie unten beschrieben zusammen. Als Beispiele dienen hier der Loongson XA61200 und das ASUS XC‑LS3A6M-Motherboard.

## Laden Sie die Firmware herunter und überprüfen Sie ihren Hashwert

Die meisten gängigen Produkte findet man im [Produktdatenbank](https://loongfans.cn/devices). Wenn Sie die Firmware für Ihr Modell nicht finden können, wenden Sie sich bitte an Ihren Händler.

**Überprüfen Sie nach dem Herunterladen immer den Hash**; andernfalls startet das Board möglicherweise nicht.

> Hinweis: Wenn Sie die Datei von der ASUS-Website herunterladen, überprüfen Sie die ZIP-Datei, da ASUS SHA-256-Hashwerte für die ZIP-Archive bereitstellt. Dies hat keinen Einfluss auf den Flash-Vorgang. Entpacken Sie das Archiv nach der Überprüfung, da die Flash-Software komprimierte Dateien nicht automatisch verarbeitet.

Unter Windows empfehlen wir OpenHashTab zur Überprüfung:

![](/images/guides/rescue-firmware/verify-with-openhashtab.webp)

Unter macOS oder Linux-Distributionen verwenden Sie den `sha256sum` Befehl:

```bash
# Example with ASUS XC‑LS3A6M version 1402
sha256sum XC-LS3A6M-1402.7z
echo "7B435CA09F34088D6922BD82C9A46945E57A93BC4E3C24016BCE8FC19826E0AF XC-LS3A6M-1402.7z" | sha256sum -c
# Output: XC-LS3A6M-1402.7z: OK
```

## Programmiergerät zusammenbauen und anschließen

Überprüfen Sie die Kennzeichnung des SPI-Flash-Speichers auf Ihrem Motherboard, um dessen Spezifikationen zu bestätigen. In der folgenden Tabelle sind gängige Motherboards und deren Flash-Chips aufgeführt (Änderungen je nach Produktionscharge vorbehalten):

| Hauptplatine | Flash-Modell | Hersteller | Spannung | Alternatives Modell (zum Flashen) |
| ----------- | ----------- | ------------ | ------- | -------------------------------- |
| XA61200 / XA61201 | GD25LQ64E | GigaDevice | 1,8 V | |
| XB612B0_V1.1 / XB612B0_V1.2 | GD25LQ64E | GigaDevice | 1,8 V | |
| XC‑LS3A6M | W25Q128JW | Winbond | 1,8 V | W25Q128FW |

Bauen Sie den Programmierer dann gemäß der Abbildung zusammen. Die Pin-Positionen müssen genau übereinstimmen, beginnend mit Pin 1. In der Regel kennzeichnet ein Punkt oder eine Kerbe auf dem SPI-Flash-Chip Pin 1.

:::warning
**Wichtig**: Überprüfen Sie vorab das Flash-Modell. 1,8-V-Chips können nicht mit 3,3 V oder 5 V betrieben werden. Manche Flash-Tools erkennen sie zwar ohne Warnung, aber **ein erzwungenes Beschreiben mit der falschen Spannung kann den Flash-Chip zerstören!**

Wenn Sie einen 1,8-V-Chip haben, installieren Sie das Abwärtswandlermodul (das grüne Modul auf dem Bild).
:::

![](/images/guides/rescue-firmware/setup-programmer.webp)

## Anschluss an den Flash-Chip

### Verwendung eines SOP-8-Clips oder einer Sonde

Richten Sie die Stifte des Steckers oder der Sonde gemäß der Abbildung aus. Diese Stecker sind mit Markierungen versehen, die die Ausgangsposition angeben (Stift 1 des Steckers ist in der Regel rot; Stift 1 der Sonde ist die schwarze Seite – Einzelheiten erfahren Sie bei Ihrem Lieferanten).

![](/images/guides/rescue-firmware/connect-flash-with-probe-i.webp)

![](/images/guides/rescue-firmware/connect-flash-with-probe-ii.webp)

Sobald die Verbindung stabil ist, stecken Sie das andere Ende des Kabels in der richtigen Reihenfolge in das Programmiergerät. **Wenn Sie eine Sonde verwenden, achten Sie auf einen festen Sitz, um Fehler beim Flashen aufgrund von Kontaktproblemen zu vermeiden.**

### Verwendung einer Testbuchse

Wenn Ihr Motherboard über ein Dual-BIOS-Design verfügt (z. B. XA61200 und XB612B0) und der sekundäre SPI-Flash-Chip wie unten gezeigt herausnehmbar ist, können Sie zum Flashen einen SOP8-Testsockel verwenden.

Nachdem Sie den Flash-Chip aus seinem Sockel entfernt haben, überprüfen Sie die Position von Pin 1 (in der Abbildung mit ① gekennzeichnet), um einen falschen Einbau zu vermeiden, der das Hochfahren verhindern würde.

![](/images/guides/rescue-firmware/flash-in-socket.webp)

:::warning
**Hinweis**: Bei Motherboards mit Dual-BIOS-Design sollten Sie überprüfen, ob der in der Abbildung oben mit ② gekennzeichnete Jumper richtig eingestellt ist. **Dies hat Einfluss darauf, welche Firmware und welche Einstellungen beim Systemstart verwendet werden.**

Bei den Motherboards XA61200 und XB612B0 funktioniert der Jumper in der Regel wie folgt:
![](/images/guides/rescue-firmware/bios-switch.png)

Wird der Jumper auf die Pins 1–2 gesteckt, erfolgt der Startvorgang über den integrierten SPI-Flash-Chip; wird er auf die Pins 2–3 gesteckt, erfolgt der Startvorgang über den steckbaren SPI-Flash-Chip.
:::

Setzen Sie den Chip nach dem Ausbau wie abgebildet in den Testsockel ein:

![](/images/guides/rescue-firmware/connect-flash-with-test-stand.webp)

Schließen Sie die Testbuchse nach der Installation in der richtigen Reihenfolge an das Programmiergerät an.

### (Nur ASUS-Motherboards) Verwendung des speziellen Flash-Kabels

Bei ASUS-Motherboards befindet sich der SPI-Flash-Chip, auf dem die BIOS-Firmware gespeichert ist, in der Nähe der CPU unter dem Kühlkörper. Sie müssen den Kühlkörper entfernen; die Position des Chips ist unten dargestellt:

![](/images/guides/rescue-firmware/asus-spi-flash.webp)

Stecken Sie das spezielle Flash-Kabel in den Anschluss oberhalb des SPI-Flash-Speichers. **Achten Sie darauf, dass die weiß markierte Seite des Steckers mit der weißen Markierung in der unteren linken Ecke der Hauptplatine übereinstimmt (dies kennzeichnet die Startposition):**

![](/images/guides/rescue-firmware/asus-connect-flash.webp)

Schließen Sie das andere Ende des Kabels wie gewohnt an das Programmiergerät an.

## Firmware flashen

Nachdem Sie den Programmierer zusammengebaut und an den Flash-Chip angeschlossen haben, schließen Sie den Programmierer an Ihren Computer an und wählen Sie die für Ihr Betriebssystem geeignete Flash-Software aus.

### Verwendung von NeoProgrammer (Windows)

Installieren Sie vor der Verwendung von NeoProgrammer den mit der Software mitgelieferten Treiber (zu finden unter `(software root)\Drivers\CH341A`). Ausführen `DRVSETUP64.exe` und klicken Sie auf `安装`.

![](/images/guides/rescue-firmware/install-driver-windows.png)

Überprüfen Sie anschließend im Geräte-Manager, ob das folgende Gerät angezeigt wird, was auf eine erfolgreiche Installation hinweist:

![](/images/guides/rescue-firmware/check-ch341a-windows.png)

Bestimmen Sie als Nächstes das Modell Ihres CH341A-Programmiergeräts und wählen Sie es aus der `Hardware` Menü. Die am häufigsten verkauften Geräte sind `CH341 Black`:

![](/en/images/guides/rescue-firmware/select-programmer.png)

::: tip
Da die Standardeinstellungen für NeoProgrammer, die vom Enshan Wireless Forum bereitgestellt werden, auf Chinesisch voreingestellt sind und NeoProgrammer mehrere Sprachen unterstützt, finden Sie diese Option im `语言设置`.

![](/en/images/guides/rescue-firmware/change-language.webp)
:::

Befolgen Sie die nummerierten Schritte in der Abbildung:

![](/en/images/guides/rescue-firmware/neoprogrammer.webp)

1. Klicken Sie auf `Open File` und wählen Sie die Firmware-Datei für Ihr Motherboard aus (**Hinweis: Ändern Sie die Dateiendung in `.bin`**)
   ![](/images/guides/rescue-firmware/select-firmware-windows.png)

2. Klicken Sie auf `Detect` um das Modell des angeschlossenen Flash-Chips zu ermitteln. Falls das genaue Modell nicht in der Datenbank enthalten ist, können Sie ein ähnliches Modell verwenden (z. B. `W25Q128JW` kann ersetzt werden durch `W25Q128FW`). Dabei handelt es sich in der Regel lediglich um verschiedene Versionen mit identischen Parametern.
   ![](/en/images/guides/rescue-firmware/detect-flashid-neoprogrammer.png)

3. Klicken Sie auf `Erase` um die beschädigte Firmware vollständig zu löschen. Nach dem Löschen können Sie optional auf `BlankCheck` um zu überprüfen, ob der Flash-Chip leer ist. Wenn beide `Success`, können Sie mit dem nächsten Schritt fortfahren.

4. Klicken Sie auf `Write` um die geöffnete Firmware-Datei auf den Flash-Chip zu schreiben. Standardmäßig führt die Software das Schreiben und die Überprüfung nacheinander durch, bis `Success` wird zurückgegeben. **Halten Sie die Verbindung während des gesamten Vorgangs stabil; andernfalls kann es zu unerwarteten Ergebnissen kommen.**

5. (Optional) Klicken Sie auf `Verify` um zu überprüfen, ob der geschriebene Inhalt mit der Firmware-Datei übereinstimmt.

### Verwendung von IMSProg (macOS, Linux)

Linux-Kernel verfügen bereits über Mainline-Treiber für den CH341, sodass in der Regel kein zusätzlicher Treiber erforderlich ist.

Für macOS, [Laden Sie den Treiber von der offiziellen Website herunter](https://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html).

IMSProg ist in den meisten Distributionen nicht enthalten. Falls verfügbar, versuchen Sie zunächst, es über das Repository Ihrer Distribution zu installieren:

```bash
# Debian (13/14/sid)
sudo apt install imsprog

# Ubuntu
sudo add-apt-repository ppa:bigmdm/imsprog
sudo apt update
sudo apt install imsprog

# Fedora
sudo dnf install imsprog

# ArchLinux AUR
yay -S imsprog
```

Falls Ihre Distribution dies nicht bereitstellt, kompilieren Sie es aus dem Quellcode:

```bash
# AOSC OS
sudo oma install cmake gcc libusb qt-5 pkgconf wget zenity

# macOS (Homebrew)
brew install qt@5 libusb cmake pkgconf wget zenity

# Compiling all
git clone https://github.com/bigbigmdm/IMSProg.git && cd IMSProg
chmod +x build_all.sh
sudo ./build_all.sh # omit sudo on macOS
```

Nach der Installation können Sie IMSProg über Ihr Anwendungsmenü starten.

Befolgen Sie nach dem Start die nummerierten Schritte in der Abbildung:

![](/en/images/guides/rescue-firmware/imsprog.webp)

1. Klicken Sie auf `Open` und wählen Sie die Firmware-Datei für Ihr Motherboard aus (**Hinweis: Wie bei NeoProgrammer benennen Sie die Dateiendung um in `.bin`**)

2. Klicken Sie auf `Detect` um das Modell des angeschlossenen Flash-Chips zu ermitteln. Sollte das genaue Modell nicht in der Datenbank enthalten sein, verwenden Sie ein ähnliches Modell, wie oben beschrieben.

3. Aktivieren Sie alle drei Kontrollkästchen auf der linken Seite und klicken Sie dann auf `Go!` um mit dem Flashen der Firmware auf den Flash-Chip zu beginnen. **Achten Sie darauf, dass die Verbindung während des gesamten Vorgangs stabil bleibt; andernfalls kann es zu unerwarteten Ergebnissen kommen.**

## Überprüfung der Wiederherstellung

Trennen Sie alle Werkzeuge und Kabel vom Flash-Chip. Falls Sie den Kühler entfernt haben, entfernen Sie die Reste der Wärmeleitpaste von der CPU, tragen Sie neue Paste auf und montieren Sie den Kühler wieder.

Schließen Sie das Netzkabel wie gewohnt an, setzen Sie die RAM-Module und den Speicher ein, schließen Sie Tastatur, Maus und Monitor an und schalten Sie das Gerät ein. Wenn das `LOONGSON 龙芯` Wenn das Logo erscheint, war die Wiederherstellung erfolgreich.
