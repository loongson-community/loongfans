### Die CPU-Frequenzanpassung funktioniert bei einigen ABI2.0-Distributionen möglicherweise nicht

ABI2.0-Distributionen („New World“), die Upstream-Linux-Kernel verwenden, verfügen über keine funktionierende CPU-Frequenzskalierung. Dies liegt daran, dass die SMCv1-Schnittstelle im Upstream-Linux-Kernel nicht implementiert ist. [Sie werden](https://github.com/ziyao233) hat einen [vorläufiger Patch](https://lore.kernel.org/loongarch/20250623123321.5622-1-ziyao@disroot.org/), Bei den Tests wurde jedoch eine Instabilität festgestellt.
