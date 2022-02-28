---
layout: post
title: Cross-compiling for macOS using WSL2 and OSXCross
---
I split my development between two machines. At home, I primarily use my desktop -- a 2020 Mac Mini with Apple's first-gen M1 chip. When I need a change of scenery, I'm on my Windows 10 laptop running Ubuntu through WSL2. In theory, I should have ~~unlimited power~~ the ability to compile anything for any system. In practice... my armchair developer skills aren't good enough to understand the nuances of Apple's developer ecosystem -- the behemoth that is the Xcode app, xcode command line tools, path changes made in macOS 11 that vary between the Intel and ARM systems, whether I should abandon any attempts to compile natively for ARM and just use Rosetta 2 to run Terminal in x86_64 emulation mode...

I recently tried compiling the open-source finite element package [Mystran](https://github.com/dr-bill-c/MYSTRAN){:target="_blank"} on my Mini, which triggered a bunch of gfortran errors related to support for REAL(16) quad-precision numbers. After a lot of googling, I found out that libquadmath is not included with the arm64-darwin build of gcc ([see discussion thread here](https://github.com/iains/gcc-darwin-arm64/issues/5){:target="_blank"}).

The rest of this post documents my attempt to set up a working cross-compiler on my Linux machine using LLVM/clang and [osxcross](https://github.com/tpoechtrager/osxcross){:target="_blank"}.

## Setup osxcross
I lost track of the number of times I tried compiling this before I figured it all out. Here's a roughly chronological list of snags I encountered and their resolutions.
- CMake unable to find Python installation
  - Issue with my pyenv configuration. Running `pyenv doctor` fixed the issue
- xar compilation issues
  - This gets built during one of the early steps of the `build.sh` script.
  - `autoconf` is called to generate the makefile, but my system didn't have it installed
- Lots of issues related to using `/opt/osxcross` as the install directory
  - Building everything in a temp folder and then moving to `/opt/osxcross` messed with path links
  - Setting `TARGET_DIR=/opt/osxcross` required the build script to be run with sudo and messed with the build_gcc script
  - Eventually I decided to use a folder in my home directory (`~/osxcross/`) as the installation path and everything worked

### Simplified installation steps
Here's the final process I settled on:
1. Make sure all dependencies are installed
  - for osxcross and clang/clang++:  
  `sudo apt-get install autoconf cmake clang llvm-dev uuid-dev libssl-dev libbz2-dev`
  - for gcc:  
  `sudo apt-get install gcc g++ zlib1g-dev libmpc-dev libmpfr-dev libgmp-dev`
2. Clone the osxcross repository into a new local folder (after much grief trying to install to `/opt/`, I deided to use `~/osxcross` as my base directory):  
`git clone https://github.com/tpoechtrager/osxcross.git ~/osxcross/setup_files`
3. Download desired [MacOSX SDK](https://github.com/phracker/MacOSX-SDKs/releases){:target="_blank"} tarball into the `tarballs` folder:  
`cd ~/osxcross/setup_files`  
`wget -P tarballs {url-to-desired-version}`
4. Build osxcross and clang compilers, setting target installation path  
`TARGET_DIR=~/osxcross ./build.sh`
5. Add osxcross/bin directory to your PATH  
`export PATH=$PATH:~/osxcross/bin`
5. Build latest gcc compilers (including gfortran), setting target installation path  
`TARGET_DIR=~/osxcross ENABLE_FORTRAN=1 ./build_gcc.sh` 
6. Delete libquadmath shared library to force compiled programs to link it statically ([source](https://github.com/tpoechtrager/osxcross/issues/28#issuecomment-67047134){:target="_blank"})
  - Make a backup of all files
  `cd ~/osxcross && cp -r x86_64-apple-darwin20.4 x86_64-darwin20.4-backup`
  - Delete libquadmath dynamic shared library
  `find x86_64-apple-darwin20.4 -name "libquadmath*dylib" -exec rm {} \;`
- Update the MacPorts cache (courtesy of [this post](https://tenbaht.github.io/sduino/developer/cross-compile-for-osx/){:target="_blank"}):  
`osxcross-macports update-cache`

### Post-install configuration
Based on the 11.3 SDK I used, the minimum version of OSX I can compile for is 10.9. I want to be a bit more modern and (arbitrarily) chose 10.11

I added the following lines to the end of my `~/.zshrc` file:  
```
export MACOSX_DEPLOYMENT_TARGET=10.11
export PATH=$PATH:~/osxcross/bin
export OSXCROSS_MP_INC=1
```

## Example build: Mystran
1. Clone the repository into a new folder  
`git clone https://github.com/dr-bill-c/MYSTRAN.git ~/code/mystran_mac`
1. Create a cmake toolchain file to specify host and target systems, compilers, and compiler flags.  
Download mine [here](https://gist.github.com/edp8489/e054f79d5b7b390737a4d9d3c98ba231){:target="_blank"}
1. For some reason, even though libf2c is available in the MacPorts catalog, `osxcross-macports` can't find it. So we have to go through a somewhat annoying process to compile it during MYSTRAN compilation. Per the comments in `CMakeLists.txt`, f2c generates the `arith.h` header on the fly. This throws an error during cross-compilation since it compiled `arithchk` for the target system, but then tried to run it on the host to generate the header file. I already compiled this for my host system (x86_64 Linux) and manually copied the header file to the includes directory.
  - Comment out lines 74 through 91 of `CMakeLists.txt`  
  ```
  # get a load of this: f2c generates its own "arith.h" on the fly
  # so we gotta compile arithchk and run it
  #set(F2C_ARITHCHK_SRC "${F2C_DIR}/arithchk.c")
  #set(F2C_ARITHCHK_BIN "${F2C_DIR}/arithchk")
  #set(F2C_ARITH_H "${F2C_INCLUDE_DIR}/arith.h")
  #set_source_files_properties(
  #  ${F2C_ARITHCHK_SRC} PROPERTIES COMPILE_FLAGS "-DNO_LONG_LONG -DNO_FPINIT"
  #)
  #add_executable(arithchk ${F2C_ARITHCHK_SRC})
  #target_link_libraries(arithchk m)
  #set_target_properties(
  #  arithchk PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${F2C_DIR}
  #)
  #add_custom_command(
  #  OUTPUT ${F2C_ARITH_H}
  #  COMMAND ${F2C_ARITHCHK_BIN} > ${F2C_ARITH_H}
  #  DEPENDS ${F2C_ARITHCHK_BIN}
  #)
  ```
1. Run cmake to generate the makefile. Use the platform-specific version built with osxcross to avoid linking errors in the next step. This will also download the source files for f2c and SuperLU into their own folders in the mystran base directory.  
`x86_64-apple-darwin20.4-cmake -DCMAKE_TOOLCHAIN_FILE=toolchain_osxcross.cmake . `  
(NOTE: In cmake &ge;3.21 you can replace `-DCMAKE_TOOLCHAIN_FILE=<file>` with `--toolchain <file>`)
1. Create file `f2c/include/arith.h` and paste in the following:  
```  
/* arith.h */
#define IEEE_8087
#define Arith_Kind_ASL 1
#define Long int
#define Intcast (int)(long)
#define Double_Align
#define X64_bit_pointers
#define NO_LONG_LONG
#define QNaN0 0x0
#define QNaN1 0xfff80000
```  
1. Build it with `make` or `x86_64-apple-darwin20.4-cmake --build`
  - Sanity check. Try running on the host system. It should fail.  
![Linux execution error](assets/osxcross-post/mystran-cross-compile_exec_err.png)
  - Running on the target system  
![macOS success!](assets/osxcross-post/mystran_success.png)