---
layout: page
returnLink: /en/pages/guides
pageTitle: FAQ Collection
pageSubTitle: Known issues on various desktop platforms
---

# 7A Bridge Chip Stability Issues

This motherboard uses the 7A2000 bridge chip to provide PCIe interfaces, but due to known (but not officially confirmed) reasons with this bridge chip, when using certain peripherals (especially AMD GCN 1.0 - 4.0 series graphics cards), there may be driver instability, screen/application crashes, or even system freezes. Currently, some distributions provide temporary patches for workarounds, which can greatly alleviate the problem, but some users still report encountering similar issues.

If you encounter similar situations, according to community recommendations, we suggest you avoid this problem by enhancing case or bridge chip cooling.

---

# USB Device Loss Issue

According to user feedback, during the use of this motherboard, after starting the system, USB keyboard and mouse randomly fail, and need to be repeatedly plugged and unplugged to work.

According to investigations by Loongson Technology engineers, this is caused by [a hardware defect in the Loongson 7A2000 bridge chip](https://github.com/torvalds/linux/commit/bcb60d438547355b8f9ad48645909139b64d3482). This issue has been worked around in Linux kernel 6.15-rc1 or higher versions. Commercial ABI 2.0 distributions using the 6.6 kernel and ABI 1.0 systems using the 4.19 kernel both include workarounds for this issue.
