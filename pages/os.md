---
layout: page
# 返回首页
returnLink: /
pageTitle: 操作系统
pageSubTitle: 支持龙架构的操作系统
---

<script setup>
import OsCard from "../components/os/OsCard.vue"
</script>

<div class="distro-list">

<OsCard
  name="安同 OS (AOSC OS)"
  description="User-oriented community distribution by Anthon Open Source Community."
  href="https://aosc.io"
  image="/images/os/aosc.svg"
  tags="GNU, desktop"
/>
<!-- https://raw.githubusercontent.com/AOSC-Dev/logo/refs/heads/master/aosc.svg -->

<OsCard
  name="勇豹 (Yongbao)"
  description="Community-driven distribution for LoongArch platforms."
  href="https://github.com/sunhaiyong1978/Yongbao"
  image="/images/os/linux.svg"
  tags="GNU, desktop"
/>

<OsCard
  name="Alpine"
  description="A security-oriented, lightweight Linux distribution based on musl libc and busybox."
  href="https://www.alpinelinux.org"
  image="/images/os/alpine.svg"
  tags="musl, container"
/>
<!-- https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/alpine-linux.svg -->

<OsCard
  name="Anolis OS"
  description="Anolis OS is equipped with two different versions of RHCK and ANCK kernels."
  href="https://openanolis.cn/download"
  image="/images/os/openanolis.webp"
  tags="GNU, enterprise"
/>
<!-- https://oss.openanolis.cn/fragment/ekbqllugcshfozktgpyf -->

<OsCard
  name="CLFS for LoongArch"
  description="How to cross compile a LFS for LoongArch"
  href="https://github.com/sunhaiyong1978/CLFS-for-LoongArch"
  image="/images/os/lfs.svg"
  tags="GNU, DIY"
/>
<!-- https://upload.wikimedia.org/wikipedia/commons/f/f1/Icons8_flat_linux.svg -->

<OsCard
  name="deepin"
  description="Beautiful UI design, intimate human-computer interaction, and friendly community environment make you feel at home."
  href="https://www.deepin.org"
  image="/images/os/deepin.svg"
  tags="GNU, desktop"
/>
<!-- https://upload.wikimedia.org/wikipedia/commons/f/f5/Deepin_logo.svg -->

<OsCard
  name="Gentoo"
  description="A free operating system based on Linux that can be automatically optimized and customized for just about any application or need."
  href="https://www.gentoo.org"
  image="/images/os/gentoo.svg"
  tags="GNU, source-based"
/>
<!-- https://www.gentoo.org/assets/img/logo/gentoo-signet.svg -->

<OsCard
  name="LFS LoongArch Edition"
  description="A project that provides you with step-by-step instructions for building your own custom Linux system, entirely from source code."
  href="https://www.linuxfromscratch.org/~xry111/lfs/"
  image="/images/os/lfs.svg"
  tags="GNU, DIY"
/>
<!-- https://linuxfromscratch.org/images/lfs-logo.png -->

<OsCard
  name="Loong Arch Linux"
  description="Loong Arch Linux 是为 LoongArch 架构移植的 ArchLinux 发行版。"
  href="https://loongarchlinux.org/"
  image="/images/os/loongarchlinux.webp"
  tags="GNU, rolling"
/>
<!-- https://loongarchlinux.org/images/favicons/apple-touch-icon.png -->

<OsCard
  name="NixOS / Nixpkgs"
  description="Nix is a tool that takes a unique approach to package management and system configuration."
  href="https://nixos.org/"
  image="/images/os/nix.svg"
  tags="GNU, reproducible"
/>
<!-- https://github.com/NixOS/nixos-artwork/raw/refs/heads/master/logo/nix-snowflake-colours.svg -->

<OsCard
  name="OpenCloudOS"
  description="Long-term supported enterprise edition of OpenCloudOS."
  href="https://opencloudos.org"
  image="/images/os/opencloudos.webp"
  tags="GNU, enterprise"
/>

<OsCard
  name="openEuler"
  description="Open-source Linux for enterprise, cloud, edge, and embedded scenarios."
  href="https://openeuler.org"
  image="/images/os/openeuler.svg"
  tags="GNU, enterprise"
/>
<!-- https://upload.wikimedia.org/wikipedia/commons/8/88/OpenEuler-horizontal-left.svg -->

<OsCard
  name="OpenWrt"
  description="Linux distribution targeting embedded devices and routers."
  href="https://openwrt.org"
  image="/images/os/openwrt.svg"
  tags="embedded, router"
/>
<!-- https://raw.githubusercontent.com/openwrt/branding/refs/heads/master/logo/openwrt_logo_blue_and_dark_blue.svg -->

<OsCard
  name="Proxmox VE"
  description="Open-source virtualization platform combining KVM and LXC."
  href="https://www.proxmox.com/en/products/proxmox-virtual-environment/overview"
  image="/images/os/proxmox.svg"
  tags="virtualization, server"
/>
<!-- https://www.proxmox.com/en/about/company-details/media-kit -->

<OsCard
  name="Slackware"
  description="The oldest actively maintained Linux distribution with a classic approach."
  href="https://www.slackware.com"
  image="/images/os/slackware.webp"
  tags="GNU, classic"
/>
<!-- http://www.slackware.com/grfx/shared/slackware_traditional_website_logo.png -->

<OsCard
  name="T2 SDE"
  description="System Development Environment and source-based distribution builder."
  href="https://t2linux.com"
  image="/images/os/t2linux.png"
  tags="GNU, source-based"
/>
<!-- https://t2linux.com/images/t2logo.png -->

</div>

<style scoped>
.distro-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-block: 16px;
}

@media (width >= 48rem) {
  .distro-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
