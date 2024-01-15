---
layout: post
date: 2024-01-15
title: "OpenRadioss on macOS, Part 2.5: Installing LS-PrePost"
---

Welcome back to the next installment of my series on [OpenRadioss](https://github.com/OpenRadioss/OpenRadioss){:target="_blank" rel="noopener"}! In [Part 1]({% link _posts/2023-10-08-containerized-openradioss_macos.md %}) we set up a virtual machine that could build and run the arm64 Linux Apptainer image. [Part 2]({% link _posts/2023-11-28-openradioss-container-directory-sharing.md %}) covered directory sharing settings to seamlessly transfer model files between your host <--> virtual machine <--> container file systems.

In this post, which I'm calling Part 2.5, I'll show you how to add remote desktop capability to the the virtual machine we created in Part 1 and install the free LS-Dyna pre/post-processor [LS-PrePost](https://lsdyna.ansys.com/knowledge-base/ls-prepost/){:target="_blank" rel="noopener"}. Since OpenRadioss has the ability to translate LS-Dyna keyword input files, this is a convenient way to get started with model creation.

## Adding Remote Desktop Capability to Virtual Machine
The virtual machine we created is based on the Ubuntu Cloud Server image, which doesn't include a desktop environment. We're going to install `xfce`, a lighter-weight interface than the default Ubuntu desktop environment.

First, start the virtual machine and connect to its shell.

```zsh
limactl start apptainerVM && limactl shell apptainerVM
```

Install the lightweight `xfce` desktop environment and a few other utilities. This will take up an additional 630 MB of disk space once installed.

```zsh
sudo apt install xfce4 xfce4-goodies firefox unzip
```

Next, install and configure the `xrdp` remote desktop server by using the following [install script](https://c-nergy.be/blog/?p=19228){:target="_blank" rel="noopener"}.

```zsh
cd ~ && mkdir Downloads && cd Downloads
wget https://www.c-nergy.be/downloads/xRDP/xrdp-installer-1.4.8.zip
unzip xrdp-installer-1.4.8.zip
chmod +x ./xrdp-installer-1.4.8.sh
./xrdp-installer-1.4.8.sh -l
```

Now we'll create a new user account specifically to be used for the remote desktop environment. This bypasses issues associated with trying to connect via RDP while already connected to an active shell session. Follow the prompts and create a password. The following command will append `_rdp`to your current username.

```zsh
sudo adduser ${USER}_rdp
```

Also add the new account to the `sudo` group so you can install software from your remote desktop session.

```zsh
sudo usermod -aG sudo ${USER}_rdp
```

## Adding x86_64 apt repositories
LS-PrePost is an x86_64 application which we'll run through Rosetta virtualization. Rosetta can run statically-linked applications without any additional work. However, shared libraries must be installed manually.

First, enable multi-architecture support so you can install `amd64` packages.

```zsh
sudo dpkg --add-architecture amd64
```

Next, you'll need to add the amd64 apt repository sources.

At the time of writing, the virtual machine I created used the Ubuntu 22.04 LTS release ("jammy jellyfish"). Before continuing, check the release version and codename of your installation:

```zsh
$ lsb_release -dc
Description:  Ubuntu 22.04.3 LTS
Codename:     jammy
```

Create a new text file to contain the amd64 sources:

```zsh
sudo nano /etc/apt/sources.list.d/amd64-sources.list
```

Copy-paste the following. If needed, replace `jammy` with the codename of your installation.

```
deb [arch=amd64] http://archive.ubuntu.com/ubuntu jammy main restricted
deb [arch=amd64] http://archive.ubuntu.com/ubuntu jammy-updates main restricted
deb [arch=amd64] http://archive.ubuntu.com/ubuntu jammy universe
deb [arch=amd64] http://archive.ubuntu.com/ubuntu jammy-updates universe
deb [arch=amd64] http://archive.ubuntu.com/ubuntu jammy multiverse
deb [arch=amd64] http://archive.ubuntu.com/ubuntu jammy-updates multiverse
deb [arch=amd64] http://archive.ubuntu.com/ubuntu jammy-backports main restricted universe multiverse
deb [arch=amd64] http://security.ubuntu.com/ubuntu jammy-security main restricted
deb [arch=amd64] http://security.ubuntu.com/ubuntu jammy-security universe
deb [arch=amd64] http://security.ubuntu.com/ubuntu jammy-security multiverse
```

Update sources with `sudo apt update` and then you'll be able to install packages by appending `:amd64` or `:arm64` after the package name.

## Installing Shared Libraries
I recommend installing these through the terminal SSH session, <i>not</i> while connected via remote desktop, as a number of services will have to be restarted and you'll get kicked off.

```zsh
sudo apt install libstdc++6:amd64 libgtk-3-0:amd64 \
    libsecret-1-0:amd64 libcurl4:amd64 libgl1:amd64 \
    libglu1-mesa:amd64 libsm6:amd64 libxtst6:amd64 \
    libbz2-1.0:amd64 libxmu6:amd64 libopenjp2-7:amd64 \
    libtheora0:amd64 libvorbis0a:amd64 libvorbisenc2:amd64
```

Now you're ready to download and run LS-PrePost!

## Configuring Remote Desktop Connection
Download and install the Microsoft Remote Desktop client from the [App Store](https://apps.apple.com/us/app/microsoft-remote-desktop/id1295203466?mt=12){:target="_blank" rel="noopener"} and add you VM as a new machine using `127.0.0.1` or `localhost` as the hostname.

<img src="{% link assets/lsprepost/rd_config.png %}" style="width:75%;" />

## LS-PrePost
Once connected via remote desktop, download the GTK3 version of LS-PrePost (`lsprepost-4.10.9-common_gtk3-08Dec2023.tgz`) from the [LSTC server](https://ftp.lstc.com/anonymous/outgoing/lsprepost/4.10/linux64/){:target="_blank" rel="noopener"}.

Unzip the archive into your directory of choice and launch it using the `lspp410` script.

<img src="{% link assets/lsprepost/xrdp_lspp_success.png %}" />

Stay tuned for part 3 where I'll walk through setting up and running an example problem!