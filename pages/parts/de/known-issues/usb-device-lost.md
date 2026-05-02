### USB-Geräte gehen beim Systemstart verloren

Einige Nutzer haben berichtet, dass ihre USB-Tastaturen und -Mäuse nach dem Systemstart möglicherweise nicht mehr funktionieren und dass sie möglicherweise mehrmals ein- und ausgesteckt werden müssen, bevor sie wieder funktionieren.

Nach Untersuchungen eines Ingenieurs bei Loongson Technology wurde dies durch einen [Hardwarefehler im Loongson 7A2000-Brückenchip](https://github.com/torvalds/linux/commit/bcb60d438547355b8f9ad48645909139b64d3482). Eine Abhilfe für dieses Problem ist seit Linux 6.15-rc1 enthalten; kommerzielle Distributionen, die auf den Kerneln Linux 6.6 (ABI20.) oder 4.19 (ABI1.0) basieren, enthalten diese Abhilfe ebenfalls.
