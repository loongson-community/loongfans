export interface OsData {
  name: string,
  description: string,
  href: string,
  image: string,
  tags: string[]
}

export const osDataList = [
  {
    name: "Alpine Linux",
    description:
      "基于 musl libc 和 BusyBox 的，注重安全性的轻量级 Linux 发行版",
    href: "https://www.alpinelinux.org",
    // https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/alpine-linux.svg
    image: "/images/os/alpine.svg",
    tags: ["社区", "容器"],
  },
  {
    name: "ALT Linux",
    description:
      "基于 RPM 软件包及 APT-RPM 软件包管理前端的商业 Linux 发行版",
    href: "https://en.altlinux.org/Main_Page",
    // https://www.altlinux.org/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF%D1%8B#/media/%D0%A4%D0%B0%D0%B9%D0%BB:Alt_linux_logo.svg
    image: "/images/os/alt.svg",
    tags: ["可获取商业支持"],
  },
  {
    name: "安同 OS",
    description:
      "以“简明可靠”为设计及维护目标的，面向有一定 Linux 使用经验用户的发行版",
    href: "https://aosc.io/aosc-os",
    // https://raw.githubusercontent.com/AOSC-Dev/logo/refs/heads/master/aosc-os-kinfocenter.svg
    image: "/images/os/aosc.svg",
    tags: ["社区", "桌面", "滚动更新"],
  },
  {
    name: "Arch Linux for Loong64",
    description:
      "试图保持易用性的，可定制的轻量级 Linux 发行版",
    href: "https://loongarchlinux.lcpu.dev/",
    image: "/images/os/loongarchlinux.png",
    tags: ["社区", "滚动更新"],
  },
  {
    name: "CLFS for LoongArch",
    description: "介绍如何从源代码完全交叉编译一个 Linux 发行版",
    href: "https://github.com/sunhaiyong1978/CLFS-for-LoongArch",
    image: "/images/os/lfs.svg",
    tags: ["社区", "DIY"],
  },
  {
    name: "Debian",
    description:
      "全功能的，可自由使用和分发的 Linux 发行版",
    href: "https://www.debian.org",
    // https://www.debian.org/logos/openlogo-nd.svg
    image: "/images/os/debian.svg",
    tags: ["社区", "桌面", "服务器"],
  },
  {
    name: "deepin",
    description:
      "新手友好的桌面 Linux 发行版",
    href: "https://www.deepin.org",
    // https://upload.wikimedia.org/wikipedia/commons/f/f5/Deepin_logo.svg
    image: "/images/os/deepin.svg",
    tags: ["社区", "桌面", "不可变"],
  },
  {
    name: "eweOS",
    description:
      "基于 musl libc 及其他技术的前沿 Linux 发行版",
    href: "https://os.ewe.moe/",
    // https://os.ewe.moe/
    image: "/images/os/eweos.svg",
    tags: ["社区", "滚动更新"],
  },
  {
    name: "Fedora Remix LoongArch",
    description:
      "面向开发者和内容创作者的桌面发行版",
    href: "https://github.com/fedora-remix-loongarch/releases-info",
    // https://docs.fedoraproject.org/en-US/project/_images/logo/fedora_remix_magenta.png
    image: "/images/os/fedora_remix.png",
    tags: ["社区", "桌面"],
  },
  {
    name: "Gentoo",
    description:
      "高度可定制的，基于源代码的 Linux 发行版",
    href: "https://www.gentoo.org",
    // https://www.gentoo.org/assets/img/logo/gentoo-signet.svg
    image: "/images/os/gentoo.svg",
    tags: ["社区", "DIY", "滚动更新"],
  },
  {
    name: "GXDE OS",
    description:
      "围绕 DDE 15 继续维护的 Linux 发行版",
    href: "https://www.gxde.top/",
    // https://www.gxde.top/logo.png
    image: "/images/os/gxde.png",
    tags: ["社区", "桌面"],
  },
  {
    name: "红旗 Linux",
    description:
      "面向行业信息化应用的商用桌面和服务器 Linux 发行版",
    href: "https://www.chinaredflag.cn/",
    // https://commons.wikimedia.org/wiki/File:RedFlag_Linux-Logo.svg
    image: "/images/os/redflag.svg",
    tags: ["可获取商业支持", "桌面", "服务器"],
  },
  {
    name: "开放麒麟",
    description:
      "新手友好的桌面 Linux 发行版",
    href: "https://www.openkylin.top/",
    // https://www.openkylin.top/upload/202209/1664440595.png
    image: "/images/os/openkylin.png",
    tags: ["社区", "桌面"],
  },
  {
    name: "LFS 龙架构版",
    description:
      "详细介绍如何完全从源代码构建自定义的 Linux 系统",
    href: "https://www.linuxfromscratch.org/~xry111/lfs/#loongarch",
    image: "/images/os/lfs.svg",
    tags: ["社区", "DIY"],
  },
  {
    name: "龙蜥操作系统",
    description:
      "兼容 CentOS 传统操作习惯的 Linux 发行版",
    href: "https://openanolis.cn/anolisos",
    // https://oss.openanolis.cn/fragment/ekbqllugcshfozktgpyf
    image: "/images/os/openanolis.webp",
    tags: ["可获取商业支持", "服务器"],
  },
  {
    name: "Nix4Loong",
    description:
      "采用声明式包管理的 Linux 发行版",
    href: "https://nix4loong.cn/",
    // https://nix4loong.cn/_next/static/media/icon.8a6748c7.svg
    image: "/images/os/nix4loong.svg",
    tags: ["社区", "原子升级"],
  },
  {
    name: "OpenCloudOS",
    description: "鸥栖社区维护的服务器操作系统",
    href: "https://opencloudos.org",
    image: "/images/os/opencloudos.webp",
    tags: ["服务器", "可获取商业支持"],
  },
  {
    name: "openEuler",
    description:
      "面向服务器、云计算、边缘计算、嵌入式等数字基础设施的开源操作系统",
    href: "https://openeuler.org",
    // https://upload.wikimedia.org/wikipedia/commons/8/88/OpenEuler-horizontal-left.svg
    image: "/images/os/openeuler.svg",
    tags: ["服务器", "可获取商业支持"],
  },
  {
    name: "OpenWrt",
    description: "面向嵌入式设备和路由器的 Linux 发行版",
    href: "https://openwrt.org",
    // https://raw.githubusercontent.com/openwrt/branding/refs/heads/master/logo/openwrt_logo_blue_and_dark_blue.svg
    image: "/images/os/openwrt.svg",
    tags: ["社区", "路由器"],
  },
  {
    name: "Proxmox VE",
    description: "面向企业虚拟化平台的全功能开源服务器管理平台，其龙架构移植由梨儿方科技完成并持续维护",
    href: "https://www.lierfang.com//#/open/third",
    // https://www.proxmox.com/en/about/company-details/media-kit
    image: "/images/os/proxmox.svg",
    tags: ["可获取商业支持", "虚拟化"],
  },
  {
    name: "Slackwareloong",
    description:
      "高度可定制的，追求纯粹 UNIX 体验的 Linux 发行版",
    href: "https://www.slackware.com",
    // http://www.slackware.com/~msimons/slackware/grfx/shared/bluepiSW.jpg
    image: "/images/os/slackware.webp",
    tags: ["社区", "滚动更新"],
  },
  {
    name: "T2 SDE",
    description:
      "基于源代码的发行版开发套件，提供为特定场景定制 Linux 发行版的工具和脚本",
    href: "https://t2linux.com",
    // https://t2linux.com/images/t2logo.png
    image: "/images/os/t2linux.png",
    tags: ["社区", "DIY"],
  },
  {
    name: "UOS",
    description:
      "面向行业信息化应用的商用桌面和服务器 Linux 发行版",
    href: "https://chinauos.com",
    // https://www.uniontech.com/statics/home/images/logo-1.svg
    image: "/images/os/uos.svg",
    tags: ["可获取商业支持", "桌面", "服务器", "不可变"],
  },
  {
    name: "新支点操作系统",
    description:
      "面向行业信息化应用的商用桌面和服务器 Linux 发行版",
    href: "https://www.gd-linux.com/",
    // https://www.gd-linux.com/
    image: "/images/os/newstart.png",
    tags: ["可获取商业支持", "桌面", "服务器"],
  },
  {
    name: "银河麒麟操作系统",
    description:
      "面向行业信息化应用的商用桌面和服务器 Linux 发行版",
    href: "https://www.kylinos.cn",
    image: "/images/os/kylinos.svg",
    tags: ["可获取商业支持", "桌面", "服务器", "不可变"],
  },
  {
    name: "勇豹",
    description: "完全交叉编译的不可变 Linux 发行版",
    href: "https://github.com/sunhaiyong1978/Yongbao",
    image: "/images/os/linux.svg",
    tags: ["社区", "桌面", "不可变"],
  },
  {
    name: "中科方德操作系统",
    description:
      "面向行业信息化应用的商用桌面和服务器 Linux 发行版",
    href: "https://www.nfschina.com/",
    // https://www.nfschina.com/template/default/images/logo.svg
    image: "/images/os/nfs.svg",
    tags: ["可获取商业支持", "桌面", "服务器"],
  },
] as OsData[];
