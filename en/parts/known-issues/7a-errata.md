### 7A Bridge Instability

Motherboards that uses the 7A2000 bridge chip to provide PCIe interface are known to be unstable with certain peripherals (especially AMD graphics cards based on the GCN 1.0 - 4.0 architectures). Users of these graphics cards may see driver instabilities, graphical glitches, application crashes, or even lock ups. The cause behind this issue is yet to be confirmed.

At present, some Linux distros includes workarounds for this issue, which improves the situation significantly, but we still see occasional user complaints.

If you have ran into situations like this, improving cooling on the bridge chip is also known to lessen the symptom.