import { OsData } from "../zh/os";

export const osDataList = [
  {
    name: "Alpine Linux",
    description:
      "Security-oriented, lightweight Linux distribution based on musl libc and BusyBox.",
    href: "https://www.alpinelinux.org",
    // https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/alpine-linux.svg
    image: "/images/os/alpine.svg",
    tags: ["Community", "Container", "Embedded", "Linux", "ABI2.0"],
  },
  {
    name: "ALT Linux",
    description:
      "Commercial Linux distribution based on RPM Package Manager and APT-RPM package management frontend",
    href: "https://en.altlinux.org/Main_Page",
    // https://www.altlinux.org/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF%D1%8B#/media/%D0%A4%D0%B0%D0%B9%D0%BB:Alt_linux_logo.svg
    image: "/images/os/alt.svg",
    tags: ["Commercial Support Available", "Linux", "ABI2.0"],
  },
  {
    name: "Anolis OS",
    description:
      "Linux distribution for compatibility with the traditional CentOS operating habits.",
    href: "https://openanolis.cn/anolisos",
    // https://oss.openanolis.cn/fragment/ekbqllugcshfozktgpyf
    image: "/images/os/openanolis.webp",
    tags: ["Commercial Support Available", "Server", "Linux", "ABI2.0", "ABI1.0"],
  },
  {
    name: "AOSC OS",
    description:
      "Linux distribution focusing on simplicity and reliablity, designed for experimented Linux users.",
    href: "https://aosc.io/aosc-os",
    // https://raw.githubusercontent.com/AOSC-Dev/logo/refs/heads/master/aosc-os-kinfocenter.svg
    image: "/images/os/aosc.svg",
    tags: ["Community", "Desktop", "Rolling", "Linux", "ABI2.0"],
  },
  {
    name: "Arch Linux for Loong64",
    description:
      "Lightweight and flexible Linux distribution that tries to Keep It Simple.",
    href: "https://loongarchlinux.lcpu.dev/",
    image: "/images/os/loongarchlinux.webp",
    tags: ["Community", "Rolling", "Linux", "ABI2.0"],
  },
  {
    name: "CLFS for LoongArch",
    description: "Cookbook for fully cross-compile a Linux distribution from source code.",
    href: "https://github.com/sunhaiyong1978/CLFS-for-LoongArch",
    image: "/images/os/lfs.svg",
    tags: ["Community", "DIY", "Linux", "ABI2.0"],
  },
  {
    name: "Debian",
    description:
      "Universal Linux distribution which can be used and redistributed freely.",
    href: "https://www.debian.org",
    // https://www.debian.org/logos/openlogo-nd.svg
    image: "/images/os/debian.svg",
    tags: ["Community", "Desktop", "Server", "Linux", "ABI2.0"],
  },
  {
    name: "deepin",
    description:
      "User-friendly desktop-oriented distribution.",
    href: "https://www.deepin.org",
    // https://upload.wikimedia.org/wikipedia/commons/f/f5/Deepin_logo.svg
    image: "/images/os/deepin.svg",
    tags: ["Community", "Desktop", "Immutable", "Linux", "ABI2.0"],
  },
  {
    name: "eweOS",
    description:
      "Bleeding-edge Linux distribution built on musl libc and many other new technologies.",
    href: "https://os.ewe.moe/",
    // https://os.ewe.moe/
    image: "/images/os/eweos.svg",
    tags: ["Community", "Rolling", "Linux", "ABI2.0"],
  },
  {
    name: "Fedora Remix LoongArch",
    description:
      "Desktop-oriented distro for software developers and all makers.",
    href: "https://github.com/fedora-remix-loongarch/releases-info",
    // https://docs.fedoraproject.org/en-US/project/_images/logo/fedora_remix_magenta.png
    image: "/images/os/fedora_remix.webp",
    tags: ["Community", "Desktop", "Linux", "ABI2.0"],
  },
  {
    name: "Gentoo",
    description:
      "Highly flexible, source-based Linux distribution.",
    href: "https://www.gentoo.org",
    // https://www.gentoo.org/assets/img/logo/gentoo-signet.svg
    image: "/images/os/gentoo.svg",
    tags: ["Community", "DIY", "Rolling", "Linux", "ABI2.0"],
  },
  {
    name: "GXDE OS",
    description:
      "Linux distribution built atop a continually updated DDE 15 fork.",
    href: "https://www.gxde.top/en/",
    // https://www.gxde.top/logo.png
    image: "/images/os/gxde.webp",
    tags: ["Community", "Desktop", "Linux", "ABI2.0"],
  },
  {
    name: "KylinOS",
    description:
      "Commercial Linux distribution for business informationization.",
    href: "https://www.kylinos.cn",
    image: "/images/os/kylinos.svg",
    tags: ["Commercial Support Available", "Desktop", "Server", "Immutable", "Linux", "ABI2.0", "ABI1.0"],
  },
  {
    name: "LFS LoongArch Edition",
    description:
      "Project that provides you with step-by-step instructions for building your own custom Linux system, entirely from source code.",
    href: "https://www.linuxfromscratch.org/~xry111/lfs/#loongarch",
    image: "/images/os/lfs.svg",
    tags: ["Community", "DIY", "Linux", "ABI2.0"],
  },
  {
    name: "loongFire",
    description:
      "LoongArch port of IPFire, an operating system for firewalls",
    href: "https://www.bpfire.net/",
    // From private exchange.
    image: "/images/os/loongfire.webp",
    tags: ["Community", "Server", "Firewall", "Linux", "ABI2.0"]
  },
  {
    name: "Loongnix",
    description:
      "Reference Linux distribution from Loongson Technology.",
    href: "https://www.loongnix.cn/zh/loongnix/",
    // Found in Plymouth theme.
    image: "/images/os/loongnix.webp",
    tags: ["Commercial Support Available", "Desktop", "Server", "Linux", "ABI2.0", "ABI1.0"],
  },
  {
    name: "New Start",
    description:
      "Commercial Linux distribution for business informationization.",
    href: "https://www.gd-linux.com/",
    // https://www.gd-linux.com/
    image: "/images/os/newstart.webp",
    tags: ["Commercial Support Available", "Desktop", "Server", "Linux", "ABI1.0"],
  },
  {
    name: "NFS-CHINA",
    description:
      "Commercial Linux distribution for business informationization.",
    href: "https://www.nfschina.com/",
    // https://www.nfschina.com/template/default/images/logo.svg
    image: "/images/os/nfs.svg",
    tags: ["Commercial Support Available", "Desktop", "Server", "Linux", "ABI1.0"],
  },
  {
    name: "Nix4Loong",
    description:
      "Linux distribution with declarative package management.",
    href: "https://nix4loong.cn/",
    // https://nix4loong.cn/_next/static/media/icon.8a6748c7.svg
    image: "/images/os/nix4loong.svg",
    tags: ["Community", "Atomic Updates", "Linux", "ABI2.0"],
  },
  {
    name: "OpenCloudOS",
    description: "Distribution for servers maintained by the OpenCloudOS community.",
    href: "https://opencloudos.org",
    image: "/images/os/opencloudos.webp",
    tags: ["Commercial Support Available", "Server", "Linux", "ABI2.0", "ABI1.0"],
  },
  {
    name: "openEuler",
    description:
      "Open-source operating system for digital infrastructures like server, cloud platform, edge computing, and embedded platform.",
    href: "https://openeuler.org",
    // https://upload.wikimedia.org/wikipedia/commons/8/88/OpenEuler-horizontal-left.svg
    image: "/images/os/openeuler.svg",
    tags: ["Commercial Support Available", "Server", "Linux", "ABI2.0", "ABI1.0"],
  },
  {
    name: "OpenHarmony",
    description:
      "Operating system for embedded and smart terminal devices.",
    href: "https://openharmony.cn",
    // FIXME: The SVG somehow does not render on Firefox.
    // https://commons.wikimedia.org/wiki/File:OpenHarmony_Logo_by_OpenAtom.svg
    image: "/images/os/openharmony.webp",
    tags: ["Commercial Support Available", "Desktop", "Embedded", "HarmonyOS", "ABI2.0"],
  },
  {
    name: "openKylin",
    description:
      "User-friendly desktop-oriented distribution.",
    href: "https://www.openkylin.top/",
    // https://www.openkylin.top/upload/202209/1664440595.png
    image: "/images/os/openkylin.webp",
    tags: ["Community", "Desktop", "Linux", "ABI2.0"],
  },
  {
    name: "OpenWrt",
    description: "Linux distribution for embedded devices and routers.",
    href: "https://openwrt.org",
    // https://raw.githubusercontent.com/openwrt/branding/refs/heads/master/logo/openwrt_logo_blue_and_dark_blue.svg
    image: "/images/os/openwrt.svg",
    tags: ["Community", "Router", "Embedded", "Linux", "ABI2.0"],
  },
  {
    name: "Proxmox VE",
    description: "Complete open-source platform for enterprise virtualization.  The LoongArch port is developed and maintained by Lierfang.",
    href: "https://www.lierfang.com//#/open/third",
    // https://www.proxmox.com/en/about/company-details/media-kit
    image: "/images/os/proxmox.svg",
    tags: ["Commercial Support Available", "Virtualization", "Linux", "ABI2.0"],
  },
  {
    name: "RedFlag Linux",
    description:
      "Commercial Linux distribution for business informationization.",
    href: "https://www.chinaredflag.cn/",
    // https://commons.wikimedia.org/wiki/File:RedFlag_Linux-Logo.svg
    image: "/images/os/redflag.svg",
    tags: ["Commercial Support Available", "Desktop", "Server", "Linux", "ABI1.0"],
  },
  {
    name: "Slackwareloong",
    description:
      "Highly customizable Linux distribution for pure UNIX experience.",
    href: "https://www.slackware.com",
    // http://www.slackware.com/~msimons/slackware/grfx/shared/bluepiSW.jpg
    image: "/images/os/slackware.webp",
    tags: ["Community", "Rolling", "Linux", "ABI2.0"],
  },
  {
    name: "T2 SDE",
    description:
      "Distribution development toolkit providing the tools and scripts to build your own custom distribution tailored to specific use cases.",
    href: "https://t2linux.com",
    // https://t2linux.com/images/t2logo.png
    image: "/images/os/t2linux.webp",
    tags: ["Community", "DIY", "Linux", "ABI2.0"],
  },
  {
    name: "UOS",
    description:
      "Commercial Linux distribution for business informationization.",
    href: "https://chinauos.com",
    // https://www.uniontech.com/statics/home/images/logo-1.svg
    image: "/images/os/uos.svg",
    tags: ["Commercial Support Available", "Desktop", "Server", "Immutable", "Linux", "ABI1.0"],
  },
  {
    name: "Yongbao",
    description: "Fully cross-compiled immutable Linux distribution.",
    href: "https://github.com/sunhaiyong1978/Yongbao",
    image: "/images/os/linux.svg",
    tags: ["Community", "Desktop", "Immutable", "Linux", "ABI2.0"],
  },
] as OsData[];
