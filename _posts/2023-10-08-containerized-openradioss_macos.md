---
layout: post
title: Compiling OpenRadioss on macOS via Virtualized Containers
date: 2023-10-08
---

I recently discovered that Altair has released an [open source](https://www.openradioss.org){:target="_blank" rel="noopener"} version of their explicit dynamics solver, Radioss. I've wanted to learn this type of simulation for a few years, but haven't had many opportunities to gain exposure through work. This seems like the perfect opportunity to start (*yet another* &#128516;) series of side projects and teach myself the basics.

...almost. Unfortunately, the build relies on three pre-compiled external libraries that are only provided for Windows and Linux systems. Not exactly compatible with my desktop machine, an M1 Mac.

Containers and virtualization to the rescue! In this post I'll walk you through setting up a virtual environment that will allow you to compile and run the Linux source code for OpenRadioss through a container, so you can have access to the software you need without being limited by the operating system you use.

The remainder of this post assumes you use [Homebrew](https://brew.sh){:target="_blank" rel="noopener"} as your package manager and are comfortable with command line interactions.

# Virtual Machine Setup
[Lima](https://lima-vm.io){:target="_blank" rel="noopener"} allows you to create Linux virtual machines with automatic file sharing and port forwarding (similar to WSL2) on macOS host systems. [Colima](https://github.com/abiosoft/colima){:target="_blank" rel="noopener"} is a separate project that leverages Lima and aims to simplify creating container runtimes (specifically, Docker, Containerd, and/or Kubernetes).

The OpenRadioss source code includes a definition file and instructions to build an [Apptainer](https://github.com/OpenRadioss/OpenRadioss/blob/main/HOWTO.md#how-to-build-openradioss-on-linux-with-container-using-apptainer){:target="_blank" rel="noopener"} image in which the software can be compiled and run. Colima only supports Docker and Containerd runtimes, but Lima has [templates](https://github.com/lima-vm/lima/blob/master/examples/README.md){:target="_blank" rel="noopener"} for a wide range of other systems and runtimes.

Continue reading for instructions to create a virtual machine (VM) that will run the Apptainer image. If you'd prefer to use Docker, [click here](#docker-engine-vm) to jump to that section.

## Apptainer Engine VM
First, install `lima` through Homebrew with `brew install lima`.

Next, create a Linux VM that will run the Apptainer daemon. There are three ways this could be configured, according to the [Lima documentation](https://lima-vm.io/docs/config/multi-arch/){:target="_blank" rel="noopener"}. From slowest to fastest, they are:    
- VM with x86_64 processor emulation via Qemu (system mode emulation)
- VM with host (arm64) processor architecture running an x64_64 container image via Qemu (user mode emulation)
- VM with host processor architecture running an x86_64 container image via Rosetta virtualization

The basic command to create a VM is `lima create`. You can customize the configuration with the following flags:  
- `--name`: The name of the VM.
- `--arch`: Processor architecture (`host`, `x86_64`, or `aarch64`)
- `--cpu`: Number of CPU cores
- `--memory`: Amount of RAM (in GB)
- `--disk`: Virtual hard drive size (in GB)


Create a VM with 2 CPUs, 6 GB of memory, 10 GB of disk space, and the same CPU architecture as the host system. Use the Apptainer template and enable Rosetta virtualization. This template uses the full Ubuntu cloud server image, which is a 650 MB download and 1.8GB once built.

```zsh
$ limactl create --name=apptainerVM template://apptainer --cpus 2 --memory 6 --disk 10 --vm-type vz --rosetta
```

By default, Lima shares your entire Home directory (`/Users/yourusername/`) with the VM, accessible via the same absolute path. You can specify additional directories with the `--mount` flag. Append `:w` after the path to make it writable by the VM.  (E.g. `limactl create ... --mount /path/to/other/directory:w`)

In this case, I'm going to clone the OpenRadioss project to a folder inside my Home directory and not have to mess with additional shares inside the VM.

You don't actually need to clone the entire repository at this point; it gets cloned inside the container during the build process. All you really need is the Apptainer [definition file](https://github.com/OpenRadioss/OpenRadioss/blob/117d3d4c2910224fde0894a87b9e5e6bf4966f00/Apptainer/openradioss.def){:target="_blank" rel="noopener"}. 

```zsh
$ mkdir ~/Applications
$ cd ~/Applications
$ git lfs install
$ git clone git@github.com:OpenRadioss/OpenRadioss.git
```

Once that's complete, run the VM using `limactl start` and SSH into it with `limactl shell`. 

The following nomenclature is used in all subsequent code blocks:   
`$` implies the input prompt for my Mac terminal session.  
`>` implies the prompt from inside the VM or container.


```zsh
$ limactl start apptainerVM
$ limactl shell apptainerVM

> cd /path/to/OpenRadioss/Apptainer
> apptainer build openradioss.sif openradioss.def
> ln -s openradioss.sif /usr/local/bin/
```
The last command create a symbolic link to the container image in a directory that's part of the VM's `$PATH`. The image `openradioss.sif` is 535 MB once built.

```zsh
> du -h ./Apptainer
535M	./Apptainer/

> df -h /
Filesystem      Size  Used Avail Use% Mounted on
/dev/vda1       9.6G  3.2G  6.4G  34% /

```

We can run the container and check whether the build was successful as follows. By [default](https://apptainer.org/docs/user/latest/quick_start.html#working-with-files){:target="_blank" rel="noopener"}, Apptainer bind mounts `/home/$USER`, `/tmp`, and `$PWD` into your container at runtime. 

Additional directories can be specified with the `--bind /path/in/VM:/path/in/container` flag.

```zsh
> apptainer shell openradioss.sif
Apptainer> echo $PATH

/opt/openmpi/bin:/opt/OpenRadioss/exec:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

Apptainer> ls /opt/OpenRadioss/exec

anim_to_vtk_linux64_gf	engine_linux64_gf  engine_linux64_gf_ompi  th_to_csv_linux64_gf
```

To shut down the VM once you're finished, use `limactl stop`.

```zsh
$ limactl stop apptainerVM
```

## Docker Engine VM
If you'd prefer to use Docker as the container engine, keep reading. First, you'll need to install a few additional prerequisites.

```zsh
$ brew install colima docker docker-compose docker-buildx
```

Follow the instructions from Brew's output to symlink the Docker compose and buildx plugins into the plugin directory.

```zsh
ln -sfn /opt/homebrew/opt/docker-buildx/bin/docker-buildx ~/.docker/cli-plugins/docker-buildx

ln -sfn /opt/homebrew/opt/docker-compose/bin/docker-compose ~/.docker/cli-plugins/docker-compose
```

Next, create a Linux virtual machine (VM) that will run the Docker daemon. Colima largely uses the same syntax as Lima, which I already described above, but there are a few differences.

The basic command to create a VM is `colima start`. You can customize the configuration with the following flags:  
- `--profile`: The name of the VM. I've had bad luck with underscores in profile names, especially when using the Ubuntu abstraction layer, so stick to hyphens or camelCase.
- `--layer`: Creates an additional Ubuntu layer that runs in the base VM and can be used for general purpose tasks. Connect to it using `colima ssh --profile PROFILE-NAME`.

**Example:** Create a VM with 2 CPUs, 6 GB of memory, 10 GB of disk space, and the same CPU architecture as the host system. Enable the Ubuntu layer for general purpose use.

```zsh
$ colima start --profile ubuntu-arm64 --cpu 2 --memory 6 --disk 10 --arch host --layer
```

**Example:** Create a virtual machine with x86_64 processor architecture using Qemu system emulation. Enable the Ubuntu layer for general purpose use.

```zsh
$ colima start --profile ubuntu-x86 --cpu 2 --memory 6 --disk 10 --arch x86_64 --layer
```

Create a virtual machine with arm64 host processor and x86_64 process emulation using Rosetta virtualization. In this case, we don't want to create the Ubuntu layer, since it'll have the same arm64 architecture as the host system. Instead, we'll use Rosetta to run an x86_64 docker container. 

```zsh
$ colima start --profile docker-rosetta --cpu 2 --memory 6 --disk 10 --vm-type vz --vz-rosetta --mount-type virtiofs
```

Verify it's running:
```zsh
$ colima list
PROFILE           STATUS     ARCH       CPUS    MEMORY    DISK     RUNTIME    ADDRESS
docker-rosetta    Running    aarch64    2       6GiB      10GiB    docker 
```

Once the virtual machine is created, you can SSH into it with the `colima ssh` command. This was incredibly useful for troubleshooting shared folder mount locations within the VM.

```zsh
$ colima ssh --profile docker-rosetta
colima-docker-rosetta:/Users/eric$ uname -a
> Linux colima-docker-rosetta 6.1.29-0-virt #1-Alpine SMP aarch64 Linux
```

The Colima docker template uses a barebones Arch linux image that is only 556 MB once built.

```zsh
colima-docker-rosetta:/$ df -h /
> Filesystem                Size      Used Available Use% Mounted on
> tmpfs                     2.9G    555.6M      2.4G  19% /
```

###  Build the Docker Image & Container
Through the power of AI chatbots, I converted the official Apptainer definition to a Dockerfile (available on my [GitHub](https://gist.github.com/edp8489/11d9e93fbea5952caac526b89dd92b53){:target="_blank" rel="noopener"}).

Save that in an empty directory and run the following command. You can omit the `-f openradioss.dockerfile` if you save it with the name `Dockerfile`.

The `-t imagename:<tag>` flag names the image and tags it with a version identifier. Replace `<tag>` with, e.g., the build date so you can track future repository updates.

```zsh
$ docker buildx build -t openradioss_x86:04OCT2023 -f openradioss.dockerfile .

$ docker image ls                                                                           
> REPOSITORY        TAG       IMAGE ID       CREATED         SIZE
> openradioss_x86   04OCT2023    d2e2fb88d1cc   3 minutes ago   2.2GB
```

Once the image is created, you can create a new container and run it in interactive mode (`-i`) with a pseudo-TTY input (`-t`) via

```zsh
$ docker run --name openradioss --pull never -v /your/shared/directory:/container/directory -it openradioss_x86
```

The `-v` flag shares a directory, `/host/directory`, from our host system (in this case the Colima VM running Docker) with the container, mounted at `/container/directory`. Docker uses a : to split the host’s path from the container path, and the host path always comes first. By default, Colima shares the absolute path to your home directory with the VM running the Docker daemon. 

E.g., I want to remap my home directory to look like a mounted volume within the Docker container:  
`-v /Users/eric:/mnt/host_home`


### Stopping and Restarting
Once you're done with Docker, type `exit` to end the pseudo-TTY session and shut down the container. The Colima virtual machine is still running, though.

```zsh
$ colima stop --profile docker-rosetta
```

To restart the VM and an existing Docker container:
```zsh
$ colima start --profile docker-rosetta
$ docker start -ai openradioss 
```