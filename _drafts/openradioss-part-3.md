---
layout: post
title:
date: 2023-12-03
---

Welcome back to Part 3 of my series on [OpenRadioss](https://github.com/OpenRadioss/OpenRadioss){:target="_blank" rel="noopener"}! In [Part 1]({% link _posts/2023-10-08-containerized-openradioss_macos.md %}) we set up a virtual machine that could build and run the arm64 Linux Apptainer image. [Part 2]({% link _posts/2023-11-28-openradioss-container-directory-sharing.md %}) covered settings to seamlessly share model files between your host <--> virtual machine <--> container file systems.

We'll start off easy with a [test script](https://openradioss.atlassian.net/wiki/spaces/OPENRADIOSS/pages/19628079/Running+OpenRadioss#Running-OpenRadioss-test-suite-from-the-source-code){:target="_blank" rel="noopener"} to ensure single-threaded and multi-threaded versions work as intended.

Single process

```zsh
limactl start apptainerVM && limactl shell apptainerVM
apptainer shell ~/openradioss_arm.sif
cd /opt/OpenRadioss/qa-tests/scripts
perl ./or_qa_script ../../exec/engine_linux64_gf 1.0
```

Multi-process with P = 4 processes and N = 4 threads per process

```zsh
export OMP_NUM_PROC=4
export OMP_NUM_THREADS=4
perl ./or_qa_script ../../exec/engine_linux64_gf_ompi --exec_script_args="mpiexec -np $OMP_NUM_PROC"  1.0
```

Finally, we're ready to run an example model. Per the [official documentation](https://openradioss.atlassian.net/wiki/spaces/OPENRADIOSS/pages/39157761/Simplified+Downloading+and+Running+OpenRadioss+SMP+under+Linux#Running-OpenRadioss){:target="_blank" rel="noopener"}, the process of solving a mdoel requires the following steps:

1. <del>Set up environment variables</del> (done during Apptainer image creation)
1. Run input file through `exec/starter_linuxa64`
1. Run input file through `exec/engine_linuxa64`

```bash
#!/bin/bash
# launch_openradioss.sh

# Lima virtual machine name
VMNAME=apptainerVM

# absolute path to parent of models directory
APPTAINER_BIND_PATH="/Users/$USER/Application/OpenRadioss"

# launch VM
limactl start $VMNAME && limactl shell $VMNAME

# launch OpenRadioss container
apptainer shell --bind $APPTAINER_BIND_PATH ~/openradioss_arm.sif

# move into models directory
cd ~/models
```

Running the input file through `starter_linuxa64` will ... TBD - WHAT DOES THIS ACTUALLY DO. On successful completion, a new file will be generated named `file_001.rad`.

```zsh
*tree of example directory structure for sample model*
```

Run this through `engine_linuxa64`. Results will be split into a series of files with `A###` and `T##` suffixes.  
- `A###` files represent the animation. Run the first of the sequence through `anim_to_vtk` to convert to a `.vtk` file that can be viewed with `Paraview`
    - By default, the script prints the contents to the console. Pipe the results to the filename of your choice to save.
    - e.g. `anim_to_vtk_linux64_gf filenameA001 >> filename.vtk`
- `T##` files represent the time history numerical results. Run the first of the sequence through `th_to_csv` to convert to a `.csv` file.
    - e.g. `th_to_csv_linux64_gf filenameT01`
    - Default output is saved to `filenameT01.csv`

```zsh
*tree of example directory structure for sample model*
```