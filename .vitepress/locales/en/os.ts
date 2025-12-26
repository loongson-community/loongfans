import { OsData } from "../zh/os";

export const osDataList = [
  {
    name: "Alpine Linux",
    description:
      "Security-oriented, lightweight Linux distribution based on musl libc and BusyBox.",
    href: "https://www.alpinelinux.org",
    // https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/alpine-linux.svg
    image: "/images/os/alpine.svg",
    tags: ["Community", "Container"],
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
      "Linux distribution for compatibility with the traditional CentOS operating habits.",
    href: "https://openanolis.cn/anolisos",
    // https://oss.openanolis.cn/fragment/ekbqllugcshfozktgpyf
    image: "/images/os/openanolis.webp",
    tags: ["Commercial", "Server"],
  },
  {
    name: "AOSC OS",
    description:
      "Linux distribution focusing on simplicity and reliablity, designed for experimented Linux users.",
    href: "https://aosc.io/aosc-os",
    // https://raw.githubusercontent.com/AOSC-Dev/logo/refs/heads/master/aosc-os-kinfocenter.svg
    image: "/images/os/aosc.svg",
    tags: ["Community", "Desktop", "Rolling"],
  },
  {
    name: "Arch Linux for Loong64",
    description:
      "Lightweight and flexible Linux distribution that tries to Keep It Simple.",
    href: "https://loongarchlinux.lcpu.dev/",
    image: "/images/os/loongarchlinux.png",
    tags: ["Community", "Rolling"],
  },
  {
    name: "CLFS for LoongArch",
    description: "Cookbook for fully cross-compile a Linux distribution from source code.",
    href: "https://github.com/sunhaiyong1978/CLFS-for-LoongArch",
    image: "/images/os/lfs.svg",
    tags: ["Community", "DIY"],
  },
  {
    name: "Debian",
    description:
      "Universal Linux distribution which can be used and redistributed freely.",
    href: "https://www.debian.org",
    // https://www.debian.org/logos/openlogo-nd.svg
    image: "/images/os/debian.svg",
    tags: ["Community"],
  },
  {
    name: "deepin",
    description:
      "User-friendly desktop-oriented distribution.",
    href: "https://www.deepin.org",
    // https://upload.wikimedia.org/wikipedia/commons/f/f5/Deepin_logo.svg
    image: "/images/os/deepin.svg",
    tags: ["Community", "Desktop", "Immutable"],
  },
  {
    name: "Fedora Remix LoongArch",
    description:
      "Desktop-oriented distro for software developers and all makers.",
    href: "https://github.com/fedora-remix-loongarch/releases-info",
    // https://docs.fedoraproject.org/en-US/project/_images/logo/fedora_remix_magenta.png
    image: "/images/os/fedora_remix.png",
    tags: ["Community", "Desktop"],
  },
  {
    name: "Gentoo",
    description:
      "Highly flexible, source-based Linux distribution.",
    href: "https://www.gentoo.org",
    // https://www.gentoo.org/assets/img/logo/gentoo-signet.svg
    image: "/images/os/gentoo.svg",
    tags: ["Community", "DIY", "Rolling"],
  },
  {
    name: "KylinOS",
    description:
      "Commercial Linux distribution for business informationization.",
    href: "https://www.kylinos.cn",
    image: "/images/os/kylinos.svg",
    tags: ["Commercial", "Desktop", "Server", "Immutable"],
  },
  {
    name: "LFS LoongArch Edition",
    description:
      "Project that provides you with step-by-step instructions for building your own custom Linux system, entirely from source code.",
    href: "https://www.linuxfromscratch.org/~xry111/lfs/#loongarch",
    image: "/images/os/lfs.svg",
    tags: ["Community", "DIY"],
  },
  {
    name: "New Start",
    description:
      "Commercial Linux distribution for business informationization.",
    href: "https://www.gd-linux.com/",
    // https://www.gd-linux.com/
    image: "/images/os/newstart.png",
    tags: ["Commercial", "Desktop", "Server"],
  },
  {
    name: "NFS-CHINA",
    description:
      "Commercial Linux distribution for business informationization.",
    href: "https://www.nfschina.com/",
    // https://www.nfschina.com/template/default/images/logo.svg
    image: "/images/os/nfs.svg",
    tags: ["Commercial", "Desktop", "Server"],
  },
  {
    name: "Nix4Loong",
    description:
      "Linux distribution with declarative package management.",
    href: "https://nix4loong.cn/",
    // https://nix4loong.cn/_next/static/media/icon.8a6748c7.svg
    image: "/images/os/nix4loong.svg",
    tags: ["Atomic Updates", "Community"],
  },
  {
    name: "OpenCloudOS",
    description: "Distribution for servers maintained by the OpenCloudOS community.",
    href: "https://opencloudos.org",
    image: "/images/os/opencloudos.webp",
    tags: ["Commercial", "Server"],
  },
  {
    name: "openEuler",
    description:
      "Open-source operating system for digital infrastructures like server, cloud platform, edge computing, and embedded platform.",
    href: "https://openeuler.org",
    // https://upload.wikimedia.org/wikipedia/commons/8/88/OpenEuler-horizontal-left.svg
    image: "/images/os/openeuler.svg",
    tags: ["Commercial", "Server"],
  },
  {
    name: "openKylin",
    description:
      "User-friendly desktop-oriented distribution.",
    href: "https://www.openkylin.top/",
    // https://www.openkylin.top/upload/202209/1664440595.png
    image: "/images/os/openkylin.png",
    tags: ["Community", "Desktop"],
  },
  {
    name: "OpenWrt",
    description: "Linux distribution for embedded devices and routers.",
    href: "https://openwrt.org",
    // https://raw.githubusercontent.com/openwrt/branding/refs/heads/master/logo/openwrt_logo_blue_and_dark_blue.svg
    image: "/images/os/openwrt.svg",
    tags: ["Community", "Router"],
  },
  {
    name: "Proxmox VE",
    description: "Complete open-source platform for enterprise virtualization.  The LoongArch port is developed and maintained by Lierfang.",
    href: "https://www.lierfang.com//#/open/third",
    // https://www.proxmox.com/en/about/company-details/media-kit
    image: "/images/os/proxmox.svg",
    tags: ["Virtualization", "Commercial"],
  },
  {
    name: "Slackwareloong",
    description:
      "Highly customizable Linux distribution for pure UNIX experience.",
    href: "https://www.slackware.com",
    // http://www.slackware.com/~msimons/slackware/grfx/shared/bluepiSW.jpg
    image: "/images/os/slackware.webp",
    tags: ["Community", "Rolling"],
  },
  {
    name: "T2 SDE",
    description:
      "Distribution development toolkit providing the tools and scripts to build your own custom distribution tailored to specific use cases.",
    href: "https://t2linux.com",
    // https://t2linux.com/images/t2logo.png
    image: "/images/os/t2linux.png",
    tags: ["Community", "DIY"],
  },
  {
    name: "UOS",
    description:
      "Commercial Linux distribution for business informationization.",
    href: "https://chinauos.com",
    // https://www.uniontech.com/statics/home/images/logo-1.svg
	// TODO: I didn't find a logo w/o text, maybe remove it manually?
    image: "/images/os/uos.svg",
    tags: ["Commercial", "Desktop", "Server", "Immutable"],
  },
  {
    name: "Yongbao",
    description: "Fully cross-compiled immutable Linux distribution.",
    href: "https://github.com/sunhaiyong1978/Yongbao",
    image: "/images/os/linux.svg",
    tags: ["Community", "Desktop", "Immutable"],
  },
] as OsData[];
