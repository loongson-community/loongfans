---
layout: page
returnLink: /en/pages/guides
pageTitle: FAQ Collection
pageSubTitle: Known issues on various desktop platforms
---

# 7A Bridge Chip Stability Issues

Some motherboards using the 7A2000 bridge chip provide PCIe interfaces, but due to known (though not officially confirmed) issues with the chip, using certain peripherals (especially AMD GCN 1.0 to 4.0 series graphics cards) can cause driver instability, screen or application crashes, and even system freezes. Some distributions provide temporary patches that can largely mitigate the issues, though some users still report problems.

If you experience similar issues, the community recommends improving the case or bridge chip cooling.

---

# USB Device Loss Issue

Users have reported that when using some motherboards based on the 7A2000 bridge chip, USB keyboards and mice randomly stop working after boot and require repeated plugging and unplugging.

Loongson Technology engineers have traced this to [a hardware defect in the Loongson 7A2000 bridge chip](https://github.com/torvalds/linux/commit/bcb60d438547355b8f9ad48645909139b64d3482). This issue has been worked around in Linux Kernel 6.15-rc1 and later. Commercial ABI2.0 distributions using the 6.6 kernel and ABI1.0 systems using the 4.19 kernel also include this workaround.
