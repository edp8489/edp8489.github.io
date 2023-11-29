---
layout: post
title: Compiling OpenRadioss on macOS via Virtualized Containers
date: 2023-10-08
---

<p align="center"><i>UPDATED 2023-11-28 &mdash; Major rewrite of original post</i></p>

I recently discovered that Altair has released an [open source](https://www.openradioss.org){:target="_blank" rel="noopener"} version of their explicit dynamics solver, Radioss. Learning this type of simulation has been on my career development roadmap for a few years now, but I haven't had many opportunities to gain exposure through work. This seems like the perfect opportunity to start (*yet another* &#128516;) series of side projects and teach myself the basics.

...almost. Unfortunately, the build relies on three pre-compiled external libraries that are only provided for Windows and Linux systems. Not exactly compatible with my desktop machine, a Mac with Apple silicon.

Containers and virtualization to the rescue! In this post I'll walk you through setting up a virtual environment that will allow you to compile and run the Linux source code for OpenRadioss through a container, so you can have access to the software you need without being limited by the operating system you use.

The remainder of this post assumes you use [Homebrew](https://brew.sh){:target="_blank" rel="noopener"} as your package manager and are comfortable with command line interactions.

# Virtual Machine Setup
The OpenRadioss source code includes a definition file and instructions to build and run the code inside a Linux container using the [Apptainer](https://github.com/OpenRadioss/OpenRadioss/blob/main/HOWTO.md#how-to-build-openradioss-on-linux-with-container-using-apptainer){:target="_blank" rel="noopener"} engine.

[Lima](https://lima-vm.io){:target="_blank" rel="noopener"} allows you to create Linux virtual machines with automatic file sharing and port forwarding (similar to WSL2) on macOS host systems. It has [templates](https://github.com/lima-vm/lima/blob/master/examples/README.md){:target="_blank" rel="noopener"} for a wide range of systems and runtimes, including one specifically for Apptainer.

Continue reading for instructions to create a virtual machine (VM) that will run the Apptainer image.

## Apptainer Engine VM
First, install the following prerequisites via Homebrew.

```zsh
brew install lima git git-lfs
```

Ensure Rosetta is installed. (This isn't strictly necessary, but since we're making a VM we may as well give it the ability to run x86 applications, too.)

```zsh
softwareupdate --install-rosetta --agree-to-license
```

Now we'll create a Linux VM that will run the Apptainer daemon. There are three ways this could be configured, according to the [Lima documentation](https://lima-vm.io/docs/config/multi-arch/){:target="_blank" rel="noopener"}. From slowest to fastest, they are:    
- VM with x86_64 processor emulation via Qemu (system mode emulation)
- VM with host (arm64) processor architecture running an x64_64 application via Qemu (user mode emulation)
- VM with host processor architecture running an x86_64 application via Rosetta virtualization

The basic command to create a VM is `lima create`. You can customize the configuration with the following flags:  
- `--name`: The name of the VM.
- `--arch`: Processor architecture (`host`, `x86_64`, or `aarch64`)
- `--cpu`: Number of CPU cores
- `--memory`: Amount of RAM (in GB)
- `--disk`: Virtual hard drive size (in GB)

We're going to create a VM with 4 CPUs, 16 GB of memory, 20 GB of disk space, and the same CPU architecture as the host system. The VM will use the Apptainer template and we'll enable Rosetta virtualization. This template uses the full Ubuntu cloud server image, which is a 650 MB download and 1.8GB once built.

By default, Lima shares your entire Home directory (`/Users/yourusername/`), accessible via the same absolute path, with the VM in <i>read-only</i> mode. To make it easier to transfer files between your host system, the VM, and the container, we're going use the `--mount-writable` flag to give the VM write permissions.

```zsh
limactl create --name=apptainerVM template://apptainer --cpus 4 --memory 16 --disk 20 --vm-type vz --rosetta --mount-writable
```

You can specify additional directories with the `--mount` flag. Append `:w` after the path to make it writable by the VM.  (E.g. `limactl create ... --mount /path/to/other/directory:w`)

I prefer to clone the OpenRadioss project into a folder inside my Home directory and not have to mess with mounting additional shares inside the VM.

```zsh
mkdir ~/Applications
cd ~/Applications
git lfs install
git clone git@github.com:OpenRadioss/OpenRadioss.git
cd OpenRadioss
```

You don't actually need the entire repository at this point; it gets cloned inside the container during the build process. All you really need are the files inside the `Apptainer/arm/` directory. If you want to remove everything else you can use the following commands:

```zsh
rm -rv $(find . -maxdepth 1 -name "*" ! -name "Apptainer")
```

Once that's complete, run the VM using `limactl start` and SSH into it with `limactl shell`. Connecting to the lima shell will enter the same directory you're currently working from in your host session.

Once inside the VM, we can begin the build process by running the build script `build_arm.sh`. 

Two Apptainer images will be built. The first, `arm_buildEnv.sif`, installs the official Arm platform compiler suite and optimized performance libraries into a base Linux image. These are a ~2.5 GB download but will only occur once. The second image, `openradioss_arm.sif`, is the actual OpenRadioss container that gets bootstrapped from the build environment image.

Fun fact: my first contribution to the OpenRadioss project (and actually my first ever contribution to <i>any</i> open source project) was fixing these definition files!

The following nomenclature is used in all subsequent code blocks:   
&nbsp;&nbsp;&nbsp;&nbsp; `$` implies the input prompt for my Mac terminal session.  
&nbsp;&nbsp;&nbsp;&nbsp; `>` implies the prompt from inside the VM or container.

```zsh
$ limactl start apptainerVM
$ limactl shell apptainerVM

> pwd
/Users/eric/Applications/OpenRadioss

> cd /Apptainer/arm

> ls
arm_buildEnv.def    build_arm.sh    openradioss_arm.def

> ./build_arm.sh
```

Once the build is complete, I suggest moving the `openradioss_arm.sif` image into the VM's home directory that way you can call it from any working directory in future sessions.

```zsh
> mv openradioss_arm.sif ~/
```

We can now run the container and check whether the build was successful as follows.

```zsh
> apptainer shell ~/openradioss_arm.sif
Apptainer> echo $PATH

/opt/openmpi/bin:/opt/OpenRadioss/exec:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

Apptainer> ls /opt/OpenRadioss/exec

anim_to_vtk_linux64_gf  engine_linuxa64  engine_linuxa64_ompi  starter_linuxa64  th_to_csv_linux64_gf
```

Use `CTRL + D` to exit the Apptainer shell and return to the VM shell. 

You can actually run commands inside the container without the need to connect to the shell first. From the VM shell use `apptainer exec [imagename] [command] [additional arguments...]`

```zsh
> apptainer exec ~/openradioss_arm.sif starter_linuxa64
 
*** ERROR : No input deck set. Use -input [Starter input file] 
 
RADIOSS Starter version OpenRadioss

```

To shut down the VM once you're finished, use `CTRL + D` to exit the VM shell session followed by `limactl stop` from your host shell.

```zsh
$ limactl stop apptainerVM
```

Keep an eye out for [Part 2](/_posts/2023-11-28-openradioss-container-directory-sharing.md) where I'll walk you through running an example problem (and the tangled path of shared directory mounts needed to share files between Host <--> VM <--> Apptainer file systems).
