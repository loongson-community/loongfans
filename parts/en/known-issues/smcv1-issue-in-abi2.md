### CPU Frequency Scaling May Not Work with Some ABI2.0 Distros

ABI2.0 ("New World") distros using upstream Linux kernels do not have functional CPU frequency scaling. This is due a lack of SMCv1 interface implementation in the upstream Linux kernel. [ziyao233](https://github.com/ziyao233) has submitted a [preliminary patch](https://lore.kernel.org/loongarch/20250623123321.5622-1-ziyao@disroot.org/), but instability was observed during testing.
