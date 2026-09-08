---
layout: page
pageTitle: LoongArch Upstream Activities
pageSubTitle: LXC Image Server Now Shipping LoongArch Templates
---

![LoongArch Templates for Linux Containers](/en/images/news/upstream/lxc-loong64.en.png)

This week, Linux Containers (LXC) started shipping official LoongArch container templates on their [Image Server](https://images.linuxcontainers.org/), making LoongArch the 5th officially supported architecture following x86-64, AArch64, AArch32 (ARMv7), and RISC-V.

LXC is a popular Linux container solution. Its operating system level containerization environment makes it easy to develop and deploy applications in different environments. LXC is also used in Proxmox VE to provide container support, allowing platforms without virtualization support, such as 2K3000/3B6000M, to deploy and manage containers.

LXC's Image Server hosts LoongArch container templates for the following distributions:

- Alpine Linux
- ALT Linux
- Arch Linux (based on [Arch Linux for Loong64](https://loongarchlinux.lcpu.dev/))
- Debian (Debian 13 based on [Loong13](https://loong13.debian.net/))
- Gentoo Linux
- openEuler

To create a new container with LXC CLI:

```bash
lxc-create -n <container> -t download
```

To list available LXC container templates with Incus:

```bash
incus image list images:
```

To create a new container based on a template (e.g. Debian 14):

```bash
incus launch images:debian/forky/loong64 <container>
```

Roaming Loongson
---

To help community developers obtain LoongArch development environments, Loongson Hobbyists' Community operates the ["Roaming Loongson"](https://github.com/loongson-community/1024) project, with devices available on loan or for sponsorship. We have a wide variety of available hardware from embedded boards based on 2K0300/2K1000LA/2K3000, to 3A5000/3A6000 "NUC"s, to desktop- and server-class hardware based on 3A6000/3B6000/3C6000. We also have dev boxes available for access remotely.

Roaming Loongson is made possible by community funding as well as generous donations from our friends at the community. The LXC project's support for LoongArch is made possible by the community's donation of a Loongson 3B6000 motherboard.
