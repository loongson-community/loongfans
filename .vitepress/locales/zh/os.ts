export interface OsData {
  name: string,
  description: string,
  href: string,
  image: string,
  tags: string[]
}

export const osDataList = [
  {
    name: "安同 OS (AOSC OS)",
    description:
      "User-oriented community distribution by Anthon Open Source Community.",
    href: "https://aosc.io/aosc-os",
    // https://raw.githubusercontent.com/AOSC-Dev/logo/refs/heads/master/aosc.svg
    image: "/images/os/aosc.svg",
    tags: ["GNU", "desktop"],
  },
  {
    name: "勇豹 (Yongbao)",
    description: "Community-driven distribution for LoongArch platforms.",
    href: "https://github.com/sunhaiyong1978/Yongbao",
    image: "/images/os/linux.svg",
    tags: ["GNU", "desktop"],
  },
  {
    name: "Alpine",
    description:
      "A security-oriented, lightweight Linux distribution based on musl libc and busybox.",
    href: "https://www.alpinelinux.org",
    // https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/alpine-linux.svg
    image: "/images/os/alpine.svg",
    tags: ["musl", "container"],
  },
  {
    name: "Anolis OS",
    description:
      "Anolis OS is equipped with two different versions of RHCK and ANCK kernels.",
    href: "https://openanolis.cn/anolisos",
    // https://oss.openanolis.cn/fragment/ekbqllugcshfozktgpyf
    image: "/images/os/openanolis.webp",
    tags: ["GNU", "enterprise"],
  },
  {
    name: "CLFS for LoongArch",
    description: "How to cross compile a LFS for LoongArch",
    href: "https://github.com/sunhaiyong1978/CLFS-for-LoongArch",
    image: "/images/os/lfs.svg",
    tags: ["GNU", "DIY"],
  },
  {
    name: "deepin",
    description:
      "Beautiful UI design, intimate human-computer interaction, and friendly community environment make you feel at home.",
    href: "https://www.deepin.org",
    // https://upload.wikimedia.org/wikipedia/commons/f/f5/Deepin_logo.svg
    image: "/images/os/deepin.svg",
    tags: ["GNU", "desktop"],
  },
  {
    name: "Gentoo",
    description:
      "A free operating system based on Linux that can be automatically optimized and customized for just about any application or need.",
    href: "https://www.gentoo.org",
    // https://www.gentoo.org/assets/img/logo/gentoo-signet.svg
    image: "/images/os/gentoo.svg",
    tags: ["GNU", "source-based"],
  },
  {
    name: "LFS LoongArch Edition",
    description:
      "A project that provides you with step-by-step instructions for building your own custom Linux system, entirely from source code.",
    href: "https://www.linuxfromscratch.org/~xry111/lfs/",
    image: "/images/os/lfs.svg",
    tags: ["GNU", "DIY"],
  },
  {
    name: "Loong Arch Linux",
    description:
      "Loong Arch Linux 是为 LoongArch 架构移植的 ArchLinux 发行版。",
    href: "https://loongarchlinux.org/",
    image: "/images/os/loongarchlinux.png",
    tags: ["GNU", "rolling"],
  },
  {
    name: "Nix4Loong",
    description:
      "Nix4Loong is a community-driven project initiated by loongson-community.",
    href: "https://nix4loong.cn/",
    // https://nix4loong.cn/_next/static/media/icon.8a6748c7.svg
    image: "/images/os/nix4loong.svg",
    tags: ["GNU", "reproducible"],
  },
  {
    name: "OpenCloudOS",
    description: "Long-term supported enterprise edition of OpenCloudOS.",
    href: "https://opencloudos.org",
    image: "/images/os/opencloudos.webp",
    tags: ["GNU", "enterprise"],
  },
  {
    name: "openEuler",
    description:
      "Open-source Linux for enterprise, cloud, edge, and embedded scenarios.",
    href: "https://openeuler.org",
    // https://upload.wikimedia.org/wikipedia/commons/8/88/OpenEuler-horizontal-left.svg
    image: "/images/os/openeuler.svg",
    tags: ["GNU", "enterprise"],
  },
  {
    name: "OpenWrt",
    description: "Linux distribution targeting embedded devices and routers.",
    href: "https://openwrt.org",
    // https://raw.githubusercontent.com/openwrt/branding/refs/heads/master/logo/openwrt_logo_blue_and_dark_blue.svg
    image: "/images/os/openwrt.svg",
    tags: ["embedded", "router"],
  },
  {
    name: "Proxmox VE",
    description: "Open-source virtualization platform combining KVM and LXC.",
    href: "https://www.proxmox.com/en/products/proxmox-virtual-environment/overview",
    // https://www.proxmox.com/en/about/company-details/media-kit
    image: "/images/os/proxmox.svg",
    tags: ["virtualization", "server"],
  },
  {
    name: "Slackware",
    description:
      "The oldest actively maintained Linux distribution with a classic approach.",
    href: "https://www.slackware.com",
    // http://www.slackware.com/~msimons/slackware/grfx/shared/bluepiSW.jpg
    image: "/images/os/slackware.webp",
    tags: ["GNU", "classic"],
  },
  {
    name: "T2 SDE",
    description:
      "System Development Environment and source-based distribution builder.",
    href: "https://t2linux.com",
    // https://t2linux.com/images/t2logo.png
    image: "/images/os/t2linux.png",
    tags: ["GNU", "source-based"],
  },
] as OsData[];
