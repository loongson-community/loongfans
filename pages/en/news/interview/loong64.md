---
layout: page
title: Interview
pageSubTitle: loong64 Community and the "Last Mile" Before Upstreaming
---

For those who have been following us should be no stranger to LoongArch's upstream work and the great results that came from our contributors' hard work.

Behind all the apparent successes, however, are several long-term blockers - from Chromium to Electron, from PyPI to PyTorch, from Flutter to RustDesk... Ports of some key dependencies and projects are often difficult to complete due to labor shortages at the upstream project, or some other non-technical reasons. Our subject today, the loong64 community, is a "last stop" before the struggles and success at the upstream projects - a "service station", if you will, for various users and developers to get application porting, building, and optimization done in advance.

> The loong64 Community GitHub Organization: https://github.com/loong64

In this interview, we talked to with loong64 community core members Xiaobai Wu and Elysia, hoping to help you understand the community's background, its current tasks, and its plans and hopes for the future.

> Editor's note: This interview was conducted asynchronously and, as the Q&A process was not recorded, this interview transcript was reorganized based on on-site notes. The interviewees and interviewers have both reviewed the transcript below to ensure its accuracy.

## How did you first come into contact with the LoongArch community and what inspired you to initiate or join loong64?

> Xiaobai Wu, community founder, is a computer software industry professional.

**Xiaobai Wu:** Initially, the loong64 community mainly consisted of my personal projects. Around 2020 to 2021, I was responsible for Chinese domestic architectures ports at [JumpServer](https://www.jumpserver.org/) - that was when I first came into contact with Loongson and LoongArch. At that time, there weren't many operating systems to choose from - there was basically only Loongnix 20. I initially did a little porting work as my job required, as some service applications could not be built.

> Editor's note: In accordance with China's government policy, all key government and state-owned enterprises/agencies must switch to Chinese produced hardware and software platforms by 2027 - this process is commonly referred to as "domestification (国产化)".

**Xiaobai Wu:** Later on, the concept of "New World" was proposed, and the porting effort for LoongArch at Debian also began to gain momentum (Editor: roughly 2023), so I started to do some work to make it easier to install and use Debian. Debian did not publish installation images at that time, so some of my earliest work involved modifying and supplementing packages to make it easier to install Debian. It was also at that time that I officially started the loong64 project.

> Elysia, one of the project's core contributors, is currently a university student.

**Elysia:** I got a Loongson 3A5000 motherboard by a community friend's recommendation in May 2025, and only then did I start participating more in the LoongArch community. The initial opportunity for me to join the loong64 community was updating the loong64-maintained cross-compilation toolchain based on [crosstool-ng](https://crosstool-ng.github.io/). After that, mainly according to my own software usage and capabilities, I rebased some patches that had corresponding pull requests in the upstream but hadn't been merged to newer versions. There, I continuously maintained the patches while using them, until they are eventually merged.

## loong64 community has a lot of projects, how did you feed the need for computational power?

**Xiaobai Wu:** I initially did some work using the company's server, and later I received sponsorship from Loongson Technology. At that time, Loongson provided us with a 3C5000 server, which we hosted at our office. but due to our environment and some reasons unbeknownst to us at that time, the server's stability was not very good. After discussion with Loongson, we switched to a remote server hosted by Loongson, but overall, due to the network or various other factors, the server was not very reliable as part of our CI infrastructure.

**Xiaobai Wu:** So later, I took inspiration from [another community member's approach](https://github.com/lcpu-club/loong64-dockerfiles/issues/3), which is to unpack Debian's QEMU packages and run CI through emulation. This is still our main approach to CI today. However, as we started dabbling with with AI- and computation-oriented applications and packages - and  since their code base are usually quite large - it is no longer practical to build them through emulation (too slow). So I bought myself two 3A6000 machines and a 3B6000 machine to build time-consuming packages like GCC, MariaDB, Node.js, PyTorch, ONNXRuntime, and TensorFlow.

## Would you consider loong64 community "the last mile"  between upstreaming and downstream maintenance?

**Xiaobai Wu:** Not entirely. For example, I intended [loong64/pypi](https://github.com/loong64/pypi) as a "testing repository" for package/component repositories maintained by Loongson, such as [lpypi](https://lpypi.loongnix.cn/). But later, when we submitted some PRs to corresponding repositories, we did not receive much responses, nor could we reach the people who were responsible for the repositories (due to the lack of communication channels). So we eventually gave up on this approach and built the entire PyPI ecosystem from scratch, thinking at the time that it would be convenient for not only ourselves, but also others.

**Editor:** What is your understanding of upstreaming work? It seems that your initial work was mainly to satisfy specific application and business needs.

**Xiaobai Wu:** Yes, but I eventually realized that it costs a lot to maintain them myself, so I wanted to push them upstream (loong64 still maintains over 200 other projects, not counting PyPI packages) - this is, I believe, a way to control maintenance burden over time.

## What are your the main projects at loong64 these days?

**Xiaobai Wu:** Mainly two parts - the container project [docker-library](https://github.com/loong64/docker-library) and Python projects. docker-library is the LoongArch port of [Docker Official Images](https://github.com/docker-library). As for Python projects, we've gotten the "wheel" package build process to work properly, so it can be said that the technical conditions for upstream/official PyPI support are already in place.

**Editor:** There's a warning `WARNING: loongarch64-unknown-linux-gnu is not supported` everytime we compile Python. Is that related to PyPI upstreaming?

**Xiaobai Wu:** The compilation warning should be about the [PEP 11](https://peps.python.org/pep-0011/) (CPython platform support) support requirement, it does not affect any functionality. I'm currently working on preparing the specifications for [PEP 600](https://peps.python.org/pep-0600/) (*Future 'manylinux' Platform Tags for Portable Linux Built Distributions*) and [PEP 656](https://peps.python.org/pep-0656/) (*Platform Tag for Linux Distributions Using Musl*), and I have discussed and come up with specifications with colleagues from multiple parties, including Loongson, for specifications such as the system baseline (AnolisOS, with glibc 2.38 and statically linking against GCC 14) and the instruction set baseline (tentatively following the convention in [Section 7.3 of the *Software Development and Build Convention for LoongArch™ Architectures*](https://github.com/loongson/la-softdev-convention/blob/master/la-softdev-convention.adoc#73-vector-instruction-support), targeting desktop and server platforms with 128-bit vector extension support). The ultimate goal is to have PyPI officially distribute LoongArch wheel packages, making them convenient for developers to use.

> Editor's note: PEP 11 is the "Python Enhancement Proposal" that defines CPython platform support, and LoongArch is not yet supported as either a Tier 1, 2, nor 3 port.
>
> See also the discussion on the Python official community forum about [adding LoongArch PyPI (manylinux) support](https://discuss.python.org/t/path-towards-manylinux-pypi-support-for-loongarch64/105548/2).

## What are some main challenges that you have encountered while working on loong64?

**Xiaobai Wu:** We didn't run into any real problems, but since we have done everything we wanted to do, our biggest trouble now is "not knowing what to do next." I think, the next step would be to focus on improving the maintenance quality of AI-related components. Overall, Loongson/LoongArch has been well supported and the upstream work is fairly well done - what we did is just filling ecological gaps as we find them.

**Elysia:** I ran into a small problem while working on LoongArch support for [OpenList](https://github.com/OpenListTeam/openlist). LoongArch users in the OpenList community group (~~wow there were people actually using LoongArch?~~) reported that their operating systems were still ABI1.0 (commonly known as "Old World") distributions. Therefore, we specifically added the ABI1.0 environment target in our CI workflows. However, because the ABI1.0 Go compiler uses the same `GOARCH` as the ABI2.0 (commonly known as "New World") compiler, the Go compiler could include "isekai" artifacts, making the program unable to run.

> Editor's note: "Isekai" is a term often used in Japanese fantasy and science fictions meaning "the other world" or "parallel universe". In this context, it is used as a joke, referring to incorrect handling and even implementations that mixed/confused ABI1.0 and ABI2.0 specifications.
>
> Similar issues exists in toolchains such as GNU/LLVM, Rust, and CPython/PyPI, where there is no difference between the triplet referring to ABI1.0 and the triplet referring to ABI2.0.

**Elysia:** Another issue was that, installing Debian on my 3A5000 with very old firmware required patched kernel and GRUB. To address this, I maintain a customized Debian LiveCD in the loong64 community, which includes the patched kernel and GRUB. During the maintenance process, as [LoongArch support](https://salsa.debian.org/live-team/live-build/-/merge_requests/336) has not yet been merged into the Debian LiveCD creation tool `live-build`, the build process required me to manually apply the patches to the latest live-build repository.

## What plans and hopes do you have for the future of the loong64 project?

**Xiaobai Wu:** My main hope is to find a core maintainer who can take over my work. Although this is not a real problem in the short term, changes in my work and life in the future may leave me with insufficient free time and energy to keep up with project maintenance. So in the long run, I still hope to find someone to take over, if anyone comes up for the task.

**Editor:** Volunteer-driven community projects seem to often face this kind of challenge as well. So, turning back to the present, what plans and needs do you have?

**Xiaobai Wu:** My technical interest mainly sits with the backend and my work is driven by personal interest. Debugging or building these pieces of software costs a lot of money. For example, AI-related components such as PyTorch, ONNX Runtime, TensorFlow take far too long to build using the QEMU emulator, so sometimes we still need to purchase Loongson devices to build them. That said, manual builds do not guarantee reproducibility, and the resulting tension between security and deliverability cannot be properly resolved. I wanted to build a reproducible project.

**Xiaobai Wu:** Also, a small rant - my own 3B6000 desktop sometimes fails to boot when there are two RAMs installed, there may be some compatibility issue.

## Epilogue: What we can do to help

As you can see, the loong64 community's contribution sits not only with clearing the path for application porting to LoongArch, but also making non-upstreamable (for now) become part of a sustainable build, test, and release workflow. More importantly, their work has provided valuable practical experience for upstream contributions and standardization efforts, and has identified problems early on to help buy (or save) contributors more time.

Like many grassroots open-source communities, the loong64 community struggles with insufficient manpower and resources. As followers and beneficiaries of the loong64 community's work, we can not only go further and become a contributor, but also actively report issues, lapse in LoongArch support, or make feature requests. Moreover, we can even lend a hand by donating hardware to help bolster their computation power. Of course, we can also offer informational or communicational support, such as assisting with upstream communication and checking their work against reference documentations.
