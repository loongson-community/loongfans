export const osDataList = [
  {
    name: "Alpine Linux",
    description:
      "A security-oriented, lightweight Linux distribution based on musl libc and BusyBox.",
    href: "https://www.alpinelinux.org",
    // https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/alpine-linux.svg
    image: "/images/os/alpine.svg",
    tags: ["Container"],
  },
  {
    name: "ALT Linux",
    description:
      "Commercial Linux distribution based on RPM Package Manager and APT-RPM package management frontend",
    href: "https://en.altlinux.org/Main_Page",
    // https://www.altlinux.org/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF%D1%8B#/media/%D0%A4%D0%B0%D0%B9%D0%BB:Alt_linux_logo.svg
    image: "/images/os/alt.svg",
    tags: ["Commercial"],
  },
  {
    name: "Anolis OS",
    description:
      "A Linux distribution for compatibility with the traditional CentOS operating habits.",
    href: "https://openanolis.cn/anolisos",
    // https://oss.openanolis.cn/fragment/ekbqllugcshfozktgpyf
    image: "/images/os/openanolis.webp",
    tags: ["Commercial", "Server"],
  },
  {
    name: "AOSC OS",
    description:
      "A Linux distribution focusing on simplicity and reliablity, designed for experimented Linux users.",
    href: "https://aosc.io/aosc-os",
    // https://raw.githubusercontent.com/AOSC-Dev/logo/refs/heads/master/aosc-os-kinfocenter.svg
    image: "/images/os/aosc.svg",
    tags: ["Desktop", "Rolling"],
  },
  {
    name: "Arch Linux for Loong64",
    description:
      "A lightweight and flexible Linux distribution that tries to Keep It Simple.",
    href: "https://loongarchlinux.lcpu.dev/",
    image: "/images/os/loongarchlinux.png",
    tags: ["Rolling"],
  },
  {
    name: "CLFS for LoongArch",
    description: "A cookbook for fully cross-compile a Linux distribution from source code.",
    href: "https://github.com/sunhaiyong1978/CLFS-for-LoongArch",
    image: "/images/os/lfs.svg",
    tags: ["DIY"],
  },
  {
    name: "Debian",
    description:
      "A universal Linux distribution which can be used and redistributed freely.",
    href: "https://www.debian.org",
    // https://www.debian.org/logos/openlogo-nd.svg
    image: "/images/os/debian.svg",
    tags: [],
  },
  {
    name: "deepin",
    description:
      "A desktop distribution which is friendly to new users.",
    href: "https://www.deepin.org",
    // https://upload.wikimedia.org/wikipedia/commons/f/f5/Deepin_logo.svg
    image: "/images/os/deepin.svg",
    tags: ["Desktop", "Immutable"],
  },
  {
    name: "Fedora Remix LoongArch",
    description:
      "A desktop distribution for software developers and all makers.",
    href: "https://github.com/fedora-remix-loongarch/releases-info",
    // https://docs.fedoraproject.org/en-US/project/_images/logo/fedora_remix_magenta.png
    image: "/images/os/fedora_remix.png",
    tags: ["Desktop"],
  },
  {
    name: "Gentoo",
    description:
      "A highly flexible, source-based Linux distribution.",
    href: "https://www.gentoo.org",
    // https://www.gentoo.org/assets/img/logo/gentoo-signet.svg
    image: "/images/os/gentoo.svg",
    tags: ["DIY", "Rolling"],
  },
  {
    name: "KylinOS",
    description:
      "A commercial Linux distribution for business informationization.",
    href: "https://www.kylinos.cn",
	// TODO: I didn't find a good logo
    image: "/images/os/linux.svg",
    tags: ["Commercial", "Desktop", "Server", "Immutable"],
  },
  {
    name: "LFS LoongArch Edition",
    description:
      "A project that provides you with step-by-step instructions for building your own custom Linux system, entirely from source code.",
    href: "https://www.linuxfromscratch.org/~xry111/lfs/#loongarch",
    image: "/images/os/lfs.svg",
    tags: ["DIY"],
  },
  {
    name: "Nix4Loong",
    description:
      "A Linux distribution with declarative package management.",
    href: "https://nix4loong.cn/",
    // https://nix4loong.cn/_next/static/media/icon.8a6748c7.svg
    image: "/images/os/nix4loong.svg",
    tags: ["Atomicity Upgrade"],
  },
  {
    name: "OpenCloudOS",
    description: "A distribution for servers maintained by the OpenCloudOS community.",
    href: "https://opencloudos.org",
    image: "/images/os/opencloudos.webp",
    tags: ["Server", "Commercial"],
  },
  {
    name: "openEuler",
    description:
      "An open-source operating system for digital infrastructures like server, cloud platform, edge computing, and embedded platform.",
    href: "https://openeuler.org",
    // https://upload.wikimedia.org/wikipedia/commons/8/88/OpenEuler-horizontal-left.svg
    image: "/images/os/openeuler.svg",
    tags: ["Server", "Commercial"],
  },
  {
    name: "OpenWrt",
    description: "A Linux distribution for embedded devices and routers.",
    href: "https://openwrt.org",
    // https://raw.githubusercontent.com/openwrt/branding/refs/heads/master/logo/openwrt_logo_blue_and_dark_blue.svg
    image: "/images/os/openwrt.svg",
    tags: ["Router"],
  },
  {
    name: "Proxmox VE",
    description: "A complete open-source platform for enterprise virtualization.  The LoongArch port is developed and maintained by Lierfang.",
    href: "https://www.lierfang.com//#/open/third",
    // https://www.proxmox.com/en/about/company-details/media-kit
    image: "/images/os/proxmox.svg",
    tags: ["Virtualization", "Commercial"],
  },
  {
    name: "Slackwareloong",
    description:
      "A highly customizable Linux distribution for pure UNIX experience.",
    href: "https://www.slackware.com",
    // http://www.slackware.com/~msimons/slackware/grfx/shared/bluepiSW.jpg
    image: "/images/os/slackware.webp",
    tags: ["Rolling"],
  },
  {
    name: "T2 SDE",
    description:
      "A development toolkit providing the tools and scripts to build your own custom distribution tailored to specific use cases.",
    href: "https://t2linux.com",
    // https://t2linux.com/images/t2logo.png
    image: "/images/os/t2linux.png",
    tags: ["DIY"],
  },
  {
    name: "UOS",
    description:
      "A commercial Linux distribution for business informationization.",
    href: "https://chinauos.com",
    // https://www.uniontech.com/statics/home/images/logo-1.svg
	// TODO: I didn't find a logo w/o text, maybe remove it manually?
    image: "/images/os/uos.svg",
    tags: ["Commercial", "Desktop", "Server", "Immutable"],
  },
  {
    name: "Yongbao",
    description: "A fully cross-compiled immutable Linux distribution.",
    href: "https://github.com/sunhaiyong1978/Yongbao",
    image: "/images/os/linux.svg",
    tags: ["Desktop", "Immutable"],
  },
] as OsData[];
