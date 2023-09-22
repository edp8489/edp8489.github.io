---
layout: post
title: Compiling OpenRadioss on macOS via Virtualized Docker Containers
date: 2023-09-17
---

I recently discovered that Altair has made their explicit dynamics solver, Radioss, [open source](https://www.openradioss.org). I've wanted to learn this type of simulation for a few years, but haven't had many opportunities to gain exposure through the course of my day job. 

If you're a macOS user who needs to use the OpenRadioss program, but are frustrated by the fact that it can only be compiled on Windows and Linux, you're not alone. Many macOS users have found themselves in this situation, especially in fields like scientific research and engineering, where specialized software is often only available on one operating system. But what if you could run OpenRadioss on your macOS machine, without having to switch to a different operating system? This article will show you how to create a virtual environment on your Mac that allows you to compile and run the Linux source code for OpenRadioss, so you can have access to the software you need, without being limited by the operating system you use.

[OpenRadioss](https://github.com/OpenRadioss/OpenRadioss)

I initially tried to cross-compile for macOS using `osxcross` (see [post](_posts/2022-02-23-osxcross-setup)), however the build relies on three pre-compiled external libraries that are only provided for Windows and Linux.

In this post I will walk you through setting up a virtual environment and compiling the OpenRadioss through an x86_64 Docker container.

[Lima](https://lima-vm-io) allows you to create Linux virtual machines with automatic file sharing and port forwarding (similar to WSL2) on macOS host systems. [Colima](https://github.com/abiosoft/colima) simplifies creating container runtimes (Docker, Containerd, Kubernetes).


## Virtual Machine Setup
```zsh
$ brew install lima colima docker docker-compose
```

First, create a Linux virtual machine (VM) that will run the Docker daemon. There are three ways this could be configured, according to the [Lima documentation](https://lima-vm.io/docs/config/multi-arch/). From slowest to fastest, they are:    
- VM with x86_64 processor emulation via Qemu (system mode emulation)
- VM with host (arm64) processor architecture running an x64_64 container image via Qemu (user mode emulation)
- VM with host processor architecture running an x64_64 container image via Rosetta

The basic command to create a VM is `colima start`. You can customize the configuration with the following flags:  
- `--profile`: The name of the VM. It appears that (co)lima doesn't like underscores in profile names, especially when using the Ubuntu abstraction layer, so stick to hyphens or camelCase.
- `--arch`: Processor architecture (`host`, `x86_64`, or `aarch64`)
- `--cpu`: Number of CPU cores
- `--memory`: Amount of RAM (in GB)
- `--disk`: Virtual hard drive size (in GB)
- `--layer`: Creates an additional Ubuntu layer that runs in the base VM and can be used for general purpose tasks. Connect to it using `colima ssh --profile PROFILE-NAME`.

Create a VM with 2 CPUs, 6 GB of memory, 10 GB of disk space, and the same CPU architecture as the host system. Enable the Ubuntu layer for general purpose use.

```zsh
$ colima start --profile ubuntu-arm64 --cpu 2 --memory 6 --disk 10 --arch host --layer
```

Create a virtual machine with x86_64 processor architecture using Qemu system emulation. Enable the Ubuntu layer for general purpose use.

```zsh
$ colima start --profile ubuntu-x86 --cpu 2 --memory 6 --disk 10 --arch x86_64 --layer
```

Create a virtual machine with arm64 host processor and x86_64 process emulation using Rosetta virtualization. In this case, we don't want to create the Ubuntu layer, since it'll have the same arm64 architecture as the host system. Instead, we'll use Rosetta to run an x86_64 docker container. According to the `lima` [documentation](https://github.com/lima-vm/lima/blob/master//docs/multi-arch.md#fast-mode-2-rosetta-intel-containers-on-arm-vm-on-arm-host), this is faster than both emulation modes that Qemu supports.

```zsh
$ colima start --profile docker-rosetta --cpu 2 --memory 6 --disk 10 --vm-type vz --vz-rosetta --mount-type virtiofs
```

Verify it is running
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

## Docker Setup
Lucky for us, the OpenRadioss project already includes a container definition file. Unfortunately, it uses Apptainer rather than Docker (more on that later). Through the power of AI chatbots, here's that converted to a Dockerfile (available on my [GitHub](https://gist.github.com/edp8489/11d9e93fbea5952caac526b89dd92b53).)

Save that in an empty directory with the name `Dockerfile` and run the following command

```zsh
$ docker build -t openradioss_x86 /path/to/Dockerfile

$ docker image ls                                                                           
> REPOSITORY        TAG       IMAGE ID       CREATED         SIZE
> openradioss_x86   latest    d2e2fb88d1cc   3 minutes ago   2.2GB
```

Once the image is created, you can run the container in interactive mode (`-i`) with a pseudo-TTY input (`-t`) via

```zsh
$ docker run --name openradioss --platform linux/amd64 -v /your/shared/directory:/mnt/host_shared -it openradioss_x86
```


The `-v` flag shares a directory, `/host/directory`, from our host system (in this case the Colima VM running Docker) with the container, mounted at `/container/directory`. Docker uses a : to split the host’s path from the container path, and the host path always comes first. By default, Colima shares the absolute path to your home directory with the VM running the Docker daemon. I want to remap this to look like a mounted volume within the Docker container.

*Note:  
`$` implies the input prompt for my Mac terminal session.  
`>` implies the prompt from inside the Docker container.*

```zsh
$ docker run --name ubuntu_radioss --platform linux/amd64 -v /Users/eric:/mnt/host_home -it ubuntu

> root@a543782cc0ef:/#
```

Now we can set up the build environment for OpenRADIOSS per the [instructions](https://github.com/OpenRadioss/OpenRadioss/blob/main/HOWTO.md). If you want to build OpenMPI, `wget` must be added to the list of `apt-get` packages as it's not included in the Ubuntu Docker image.

## Stopping and Restarting
Once you're done with Docker, type `exit` to end the pseudo-TTY session and shut down the container. The Colima virtual machine is still running, though.

```zsh
$ colima stop --profile docker-rosetta
```

To restart the VM and an already-created Docker container:
```zsh
$ colima start --profile docker-rosetta
$ docker start -ai ubuntu_radioss 
```

## Apptainer
Alternatively, you can change the container engine an build the [Apptainer](https://github.com/OpenRadioss/OpenRadioss/blob/main/HOWTO.md#how-to-build-openradioss-on-linux-with-container-using-apptainer) image that's included with the official source.

Colima only supports docker and containerd runtimes, but Lima has [templates](https://github.com/lima-vm/lima/blob/master/examples/README.md) for a wide range of other systems and runtimes.

```zsh
$ limactl create --name=apptainer template://apptainer --cpus 2 --memory 6 --disk 10 --arch aarch64
$ limactl start apptainer
$ limactl shell apptainer

> cd /path/to/OpenRadioss/Apptainer
> apptainer build openradioss.sif openradioss_arm.def
> ln -s openradioss.sif /usr/local/bin/
```


```zsh
limactl create --name=apptainer template://apptainer --cpus 2 --memory 6 --disk 10 --vm-type vz --rosetta
limactl start apptainer
limactl shell apptainer

```

The Apptainer template uses the full Ubuntu cloud server image, which is a 650 MB download and 1.8GB once built. 

```zsh
eric@lima-apptainer-rosetta:/$ df -h /
> Filesystem      Size  Used Avail Use% Mounted on
> /dev/vda1       9.6G  1.8G  7.8G  19% /
```

The Apptainer image `openradioss.sif` is 535 MB once built

```zsh
eric@lima-apptainer-rosetta:~/OpenRadioss/Apptainer$ du -h ../Apptainer/
> 535M	../Apptainer/
eric@lima-apptainer-rosetta:~/OpenRadioss/Apptainer$ df -h /
> Filesystem      Size  Used Avail Use% Mounted on
> /dev/vda1       9.6G  3.2G  6.4G  34% /

```

We can launch the image and check whether the build was successful as follows.

```zsh
eric@lima-apptainer-rosetta:~/OpenRadioss/Apptainer$ apptainer shell openradioss.sif
Apptainer> echo $PATH
> /opt/openmpi/bin:/opt/OpenRadioss/exec:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

Apptainer> ls /opt/OpenRadioss/exec
> anim_to_vtk_linux64_gf	engine_linux64_gf  engine_linux64_gf_ompi  th_to_csv_linux64_gf
```

By comparison, the Colima docker template uses a barebones Arch linux image that is only ## MB once built.

```zsh
colima-docker-rosetta:/$ df -h /
> Filesystem                Size      Used Available Use% Mounted on
> tmpfs                     2.9G    555.6M      2.4G  19% /

```
