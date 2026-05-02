### Touchpads funktionieren unter Umständen nicht mit ABI2.0-Distributionen

Manche Laptops verfügen über Touchpads, die über einen HID-over-I2C-Bus angeschlossen sind, wofür ein GPIO-Pin zur Bereitstellung von Interrupts erforderlich ist.

Um dieses Problem zu beheben, wurde ein Patch für [Unterstützung für Interrupts für den 7A2000-GPIO hinzufügen](https://git.kernel.org/torvalds/c/44fe79020b91) ist erforderlich (jetzt Teil von Linux 6.15 und höher; die meisten kommerziellen Distributionen, die Linux 6.6 verwenden, enthalten ebenfalls einen Fix). Da der Upstream-Kernel die veraltete `gsi_idx_map` Eigenschaft, es ist eine Umgehungslösung erforderlich – siehe hier [Kernel-Patch](https://github.com/AOSC-Tracking/linux/commit/e29193f3f1a3) aus AOSC OS.
