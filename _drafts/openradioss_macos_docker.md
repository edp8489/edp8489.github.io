Excited that Altair has made their explicit dynamics solver open source

[OpenRadioss](https://github.com/OpenRadioss/OpenRadioss)

Initially tried to cross-compile for macOS using `osxcross` (see [post](_posts/2022-02-23-osxcross-setup)), however the build relies on three external libraries that are only compiled for Windows and Linux.

Remainder of this post walks through setting up a virtual environment and running Ubuntu through a Docker container.

Docker Desktop no longer free for enterprise users [link](). Doesn't affect my current usage, but interested in a completely open-source solution.

Few options:
- `colima` ([GitHub](https://github.com/abiosoft/colima))
- `minikube`
- `virtualbox` + `vagrant`

Decided to go with `colima` because it's newer.

## Setup
```zsh
$ brew install colima docker docker-compose
```

I'm running a Mac Mini with Apple's M1 chip (arm64 processor architecture). Luckily, the external libraries are compiled for both x86_64 and arm64 Linux, so I don't need to deal with virtualization. But show both commands here for the sake of completeness.

Create a virtual machine named `linux_aa64` with 2 CPUs, 4 GB of memory, and 10 GB of disk space with the same CPU architecture as the host system.

```zsh
$ colima start --profile linux_aa64 --arch host --cpu 2 --memory 4 --disk 10
```

Create a virtual machine with 2 CPUs, 4 GB of memory, 10 GB of disk space, and x86_64 processor emulation using Rosetta2. 
```zsh
$ colima start --profile linux_x86_rosetta --cpu 2 --memory 4 --disk 10 --arch x86_64 --vm-type vz --vz-rosetta
```

Verify it is running
```zsh
$ limactl  list
NAME      STATUS     SSH                VMTYPE    ARCH      CPUS    MEMORY    DISK     DIR
colima    Running    127.0.0.1:49333    qemu      x86_64    2       4GiB      10GiB    ~/.lima/colima
```

## Docker Stuff
Download latest Ubuntu image from Docker Hub, create a new container called `ubuntu_radioss`, and run it in interactive mode (`-i`) with a pseudo-TTY input (`-t`):

*Note:  
`$` implies the input prompt for my Mac terminal session.  
`>` implies the prompt for Ubuntu running inside the Docker container.*

```zsh
$ docker pull ubuntu:latest
$ docker run --name ubuntu_radioss -it ubuntu

> root@a543782cc0ef:/#
```

Now we can set up the build environment for OpenRADIOSS per the [instructions](https://github.com/OpenRadioss/OpenRadioss/blob/main/HOWTO.md). If you want to build OpenMPI, `wget` must be added to the list of `apt-get` packages as it's not included in the Ubuntu Docker image.

## Stopping and Restarting
Once you're done with Docker, type `exit` to end the pseudo-TTY session and shut down the container. The Colima virtual machine is still running, though.

```zsh
$ colima stop --profile linux_aarch64
```

To restart the VM and an already-created Docker container:
```zsh
$ colima start --profile linux_aarch64
$ docker start -ai container_name 
```