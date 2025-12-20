---
layout: page
# 返回首页
returnLink: /
pageTitle: Distros
pageSubTitle: Linux distributions supporting LoongArch
---

<script setup>
import DistroCard from "../components/os/DistroCard.vue"
</script>

<div class="distro-list">

<DistroCard
  name="Alpine"
  description="A security-oriented, lightweight Linux distribution based on musl libc and busybox."
  href="https://www.alpinelinux.org"
  image="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/alpine-linux.svg"
  tags="musl, container"
/>

<DistroCard
  name="Anolis OS"
  description="Anolis OS is equipped with two different versions of RHCK and ANCK kernels."
  href="https://openanolis.cn/download"
  image="https://oss.openanolis.cn/fragment/ekbqllugcshfozktgpyf"
  tags="GNU, enterprise"
/>

<DistroCard
  name="CLFS for LoongArch"
  description="How to cross compile a LFS for LoongArch"
  href="https://github.com/sunhaiyong1978/CLFS-for-LoongArch"
  image="https://upload.wikimedia.org/wikipedia/commons/f/f1/Icons8_flat_linux.svg"
  tags="GNU, DIY"
/>

<DistroCard
  name="deepin"
  description="Beautiful UI design, intimate human-computer interaction, and friendly community environment make you feel at home."
  href="https://www.deepin.org"
  image="https://upload.wikimedia.org/wikipedia/commons/f/f5/Deepin_logo.svg"
  tags="GNU, desktop"
/>

<DistroCard
  name="Gentoo"
  description="A free operating system based on Linux that can be automatically optimized and customized for just about any application or need."
  href="https://www.gentoo.org"
  image="https://www.gentoo.org/assets/img/logo/gentoo-signet.svg"
  tags="GNU, source-based"
/>

<DistroCard
  name="LFS LoongArch Edition"
  description="A project that provides you with step-by-step instructions for building your own custom Linux system, entirely from source code."
  href="https://www.linuxfromscratch.org/~xry111/lfs/"
  image="https://upload.wikimedia.org/wikipedia/commons/f/f1/Icons8_flat_linux.svg"
  tags="GNU, DIY"
/>

<DistroCard
  name="Loong Arch Linux"
  description="Loong Arch Linux 是为 LoongArch 架构移植的 ArchLinux 发行版。"
  href="https://loongarchlinux.org/"
  image="https://loongarchlinux.org/images/favicons/apple-touch-icon.png"
  tags="GNU, rolling"
/>

<DistroCard
  name="NixOS / Nixpkgs"
  description="Nix is a tool that takes a unique approach to package management and system configuration."
  href="https://nixos.org/"
  image="https://github.com/NixOS/nixos-artwork/raw/refs/heads/master/logo/nix-snowflake-colours.svg"
  tags="GNU, reproducible"
/>

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
