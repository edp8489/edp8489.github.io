---
layout: post
title: "Containerized OpenRadioss on macOS, pt 2: Sharing Directories"
date: 2023-11-28
---
In [Part 1](/_posts/2023-10-08-containerized-openradioss_macos.md) I described how to run [OpenRadioss](https://github.com/OpenRadioss/OpenRadioss) on macOS by setting up a Linux virtual machine that can build and run the arm64 Apptainer image. Now the real fun begins.

Before we can start solving models, though, we need a reliable method of seamlessly sharing files between host system <--> virtual machine <--> container. The remainder of this post assumes you (mostly) followed my instructions in Part 1.

Again, I will use the following nomenclature to represent the three shells we'll be interacting with:  
&nbsp;&nbsp;&nbsp;&nbsp; `$` host system shell (macOS)  
&nbsp;&nbsp;&nbsp;&nbsp; `>` VM shell (Linux)  
&nbsp;&nbsp;&nbsp;&nbsp; `Apptainer>` container shell (Apptainer image)

## Summary
Create a directory on your host filesystem that will contain all of your models. Following the same structure used in Part 1:

```zsh
$ cd ~/Applications/OpenRadioss
$ mkdir models
```

Launch your Linux virtual machine and enter its shell.  
```
$ limactl start apptainerVM && limactl shell apptainerVM
```

Your host machine's home directory is accessible within the VM via the same absolute path. We gave the VM write access during initial setup. Create a symlink inside the VM home directory that points to the models directory you just created.

```zsh
> pwd
/Users/eric/Applications/OpenRadioss

> ln -s $(readlink -f models/) $HOME
```

Finally, we need to bind the absolute path to the host directory we want to share with the container at runtime. **This must be done every time you launch the container**. (Seems like a great candidate for a run script &#128579;)

```zsh
> apptainer shell --bind $(readlink -f ~/models/../) --writable ~/openradioss_arm.sif
```

## Troubleshooting
By [default](https://apptainer.org/docs/user/latest/quick_start.html#working-with-files){:target="_blank" rel="noopener"}, Apptainer mounts `/home/$USER`, `/tmp`, and `$PWD` into your container at runtime. Note that `/home/$USER` refers to the home directory of the local user inside the <b>virtual machine</b>, not your host system.

You can [bind](https://apptainer.org/docs/user/main/bind_paths_and_mounts.html#user-defined-bind-paths) additional directories from the VM to the container using:  
`--bind /host/dir:/container/dir --writable`


```zsh
-- HOST SYSTEM --
$ cd ~ && pwd
/Users/eric

-- LIMA VM --
> cd ~ && pwd
/home/eric.linux

-- CONTAINER --
Apptainer> cd ~ && pwd
/home/eric.linux
```

We can test write access between the container and the VM home directory by creating a dummy file.

```zsh
Apptainer> touch ~/hi_from_apptainer

-- CTRL + D --

> ls ~
hi_from_apptainer    openradioss_arm.sif
```

**Symlink Troubleshooting**

We just created a symlink within the VM home directory that points to a directory on the host filesystem. Since it's in the VM home and that gets mounted by default in the container, everything should be resolved, right? Nope.

```zsh
> ln -s $(readlink -f models/) $HOME

> cd ~ && tree .
.
├── models -> /Users/eric/Applications/OpenRadioss/models
└── openradioss_arm.sif

> apptainer shell ~/openradioss_arm.sif

Apptainer> cd ~ && ls
models/  openradioss_arm.sif

Apptainer> cd models 
bash: cd: models: No such file or directory

Apptainer> ls /
afs  dev	  etc	lib    lost+found  mnt	proc  run   singularity  sys  usr
bin  environment  home	lib64  media	   opt	root  sbin  srv		 tmp  var
```

As we can see, even though the `models/` directory links to the proper path on the host, the `/Users/` directory doesn't get mounted within the container.