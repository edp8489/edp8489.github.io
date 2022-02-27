---
layout: post
title: Cross-compilation setup
published: false
---
I split my development between two machines. At home, I primarily use my desktop -- a 2020 Mac Mini with Apple's first-gen M1 chip. When I need a change of scenery, I'm on my Windows 10 laptop running Ubuntu through WSL2. In theory, I should have ~~unlimited power~~ the ability to compile anything for any system. In practice... my armchair developer skills aren't good enough to understand the nuances of Apple's developer ecosystem -- the behemoth that is the Xcode app, xcode command line tools, path changes made in macOS 11 that vary between the Intel and ARM systems, whether I should abandon any attempts to compile natively for ARM and just use Rosetta 2 to run Terminal in x86_64 emulation mode...

I recently tried compiling the open-source finite element package MYSTRAN on my Mini, which triggered a bunch of gfortran errors related to support for REAL(16) quad-precision numbers. After a lot of googling, I found out that libquadmath is not included with the arm64-dawrin build of gcc [link to MacPorts page](TBD link). Another post implies that might not even be needed becasue ... [TBD link](TBD link). There's also the possibility that the correct headers exist, but aren't in my path.

The rest of this post documents my attempt to set up a working cross-compiler on my Linux machine using Clang/LLVM and [osxcross](https://github.com/tpoechtrager/osxcross).

## osxcross compilation gotchas
CMake unable to find python 3.8 installation
- Issue with pyenv setup. Running `pyenv doctor` fixed the issue

xar compilation issues
- `autoconf` wasn't installed

gcc build unable to find xar shared library
- moved `osxcross/target` build directory to final install directory `/opt/osxcross/` before building gcc
- running gcc build script before moving everything to `/opt/osxcross` fixed the issue
- In hindsight, I should've set the `TARGET_DIR=/opt/osxcross` environment variable before calling `./build.sh && ./build_gcc.sh`

## Simplified installation steps
After compiling 5 different times and working out the various kinks, I settled on the following (final?) process:
1. Make sure all dependencies are installed
`sudo apt-get install ...`
2. Clone the osxcross repository into a new local folder (after much grief trying to install to `/opt/`, I deided to use `~/osxcross` as my base directory):  
`git clone https://github.com/tpoechtrager/osxcross.git ~/osxcross/setup`
3. Download desired MacOSX SDK tarball into the `tarballs` folder:  
`cd ~/osxcross/setup`  
`wget -P tarballs https://github.com/phracker/MacOSX-SDKs/releases/path-to-desired-version`
4. Build clang compilers, setting target installation path  
`TARGET_DIR=~/osxcross ./build.sh`
5. Add osxcross/bin directory to your PATH  
`export PATH=$PATH:~/osxcross/bin`
5. Build latest gcc compilers, setting target installation path and specifying we want gfortran, too  
`TARGET_DIR=~/osxcross ENABLE_FORTRAN=1 ./build_gcc.sh` 
## Post-install configuration
Based on the 11.3 SDK I used, the minimum version of OSX I can compile for is 10.9. I want to be a bit more modern and (arbitrarily) chose 10.11

I added the following lines to the end of my `~/.zshrc` file:

```
export MACOSX_DEPLOYMENT_TARGET=10.11
export PATH=$PATH:/opt/osxcross/bin
```
Next, update the MacPorts cache (courtesy of [this post](https://tenbaht.github.io/sduino/developer/cross-compile-for-osx/)): 
`osxcross-macports update-cache`

## example build: Mystran
cmake flags:
- `-D[BUILD_SHARED_LIBS:BOOL=OFF]`  
https://cmake.org/cmake/help/latest/variable/BUILD_SHARED_LIBS.html#variable:BUILD_SHARED_LIBS