### PCIe Speed Negotiation Issue with Early 3B6000/3C6000 Steppings

According to early adopters of 3B6000 and 3C6000 motherboards, some AMD graphics cards and RAID controllers, etc. only saw PCIe 1.0 link speeds, severely limiting performance on those peripherals. With help from our friends at the community and engineers at Loongson Technology, we found that early 3B6000 and 3C6000/S steppings has mistakenly defined the range of PCIe link speeds to only 2.5GT/s (whereas it should have been 2.5 - 16GT/s), causing the aforementioned issue.

There is now a workaround available for this issue, see AOSC OS kernel patches [1](https://github.com/AOSC-Tracking/linux/commit/283358e5b377517ad9f13bd1909b4b931754c196), [2](https://github.com/AOSC-Tracking/linux/commit/874bb3b961fb6bf106b48c61a1671c196976e1f1), and [3](https://github.com/AOSC-Tracking/linux/commit/8d088d7587098ef48e0594bf46c603bb4d7abd52).
