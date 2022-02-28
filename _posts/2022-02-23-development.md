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
`wget -P tarballs https://github.com/phracker/MacOSX-SDKs/releases/{path-to-desired-version}`
4. Build clang compilers, setting target installation path  
`TARGET_DIR=~/osxcross ./build.sh`
5. Add osxcross/bin directory to your PATH  
`export PATH=$PATH:~/osxcross/bin`
5. Build latest gcc compilers, setting target installation path and specifying we want to build gfortran, too  
`TARGET_DIR=~/osxcross ENABLE_FORTRAN=1 ./build_gcc.sh` 
6. Delete gfortran shared libraries to force compiled programs to link to static library
  - Make a backup
  `cd ~/osxcross && cp -r x86_64-apple-darwin20.4 x86_64-darwin20.4-backup`
  - Delete libquadmath dynamic shared library
  `find x86_64-apple-darwin14 -name "libquadmath*dylib" -exec rm {} \;`
## Post-install configuration
Based on the 11.3 SDK I used, the minimum version of OSX I can compile for is 10.9. I want to be a bit more modern and (arbitrarily) chose 10.11

I added the following lines to the end of my `~/.zshrc` file:

```
export MACOSX_DEPLOYMENT_TARGET=10.11
export PATH=$PATH:~/osxcross/bin
```
Next, update the MacPorts cache (courtesy of [this post](https://tenbaht.github.io/sduino/developer/cross-compile-for-osx/)): 
`osxcross-macports update-cache`

## example build: Mystran
https://cmake.org/cmake/help/latest/variable/BUILD_SHARED_LIBS.html#variable:BUILD_SHARED_LIBS
1. Create toolchain file to specify host and target systems and compilers.  
```
# specify properties of the host system
# i.e. system you're compiling ON
set(CMAKE_HOST_SYSTEM Linux)
set(CMAKE_HOST_SYSTEM_PROCESSOR x86_64)

# specify properties of the target system
# i.e. system you're compiling FOR
set(CMAKE_SYSTEM_APPLE)
set(CMAKE_SYSTEM_VERSION 20.4)
set(CMAKE_SYSTEM_PROCESSOR x86_64)

# set osxcross directory as the root path for find(*)
# EDIT THIS IF YOU INSTALLED OSXCROSS ELSEWHERE (e.g. /opt/osxcross)
set(CMAKE_FIND_ROOT_PATH ~/osxcross)

# specify compilers to use
# C Compiler - clang or gcc
set(CMAKE_C_COMPILER x86_64-apple-darwin20.4-clang)
# set(CMAKE_C_COMPILER x86_64-apple-darwin20.4-gcc)
# C++ compilers - clang++ or g++
set(CMAKE_CXX_COMPILER x86_64-apple-darwin20.4-clang++)
# set(CMAKE_CXX_COMPILER x86_64-apple-darwin20.4-g++)
set(CMAKE_Fortran_COMPILER x86_64-apple-darwin20.4-gfortran)
# specify pkg-cofig executable
set(PKG_CONFIG_EXECUTABLE x86_64-apple-darwin20.4-pkg-config)

# set compiler flags
# set(CMAKE_C_FLAGS <flags>)
# set(CMAKE_CXX_FLAGS <flags>)
set(CMAKE_Fortran_FLAGS -static-libgfortran)

# set search path options for compilers, libraries, and packages
# Search for programs in the build host directories
#SET(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)

# For libraries and headers in the target directories
SET(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
SET(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)

# set to build static libraries
set(BUILD_SHARED_LIBS OFF)
```  
or download mine [here](https://edp8489.github.io/assets/osxcross-post/toolchain_osxcross.cmake)
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
1. Run cmake to configure makefile. Use the platform-specific version built with osxcross to avoid linking errors in the next step. This will also download the source files for f2c and SuperLU into their own folders in the mystran base directory.
`x86_64-apple-darwin20.4-cmake -DCMAKE_TOOLCHAIN_FILE=toolchain_osxcross.cmake . `  
(NOTE: In cmake 3.21 and newer you can replace `-DCMAKE_TOOLCHAIN_FILE=` with `--toolchain `)
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
1. Build it!
`make` or `x86_64-apple-darwin20.4-cmake --build`
1. Sanity check. Try running on the host system. It should fail.
![assets/osxcross-post/mystran-cross-compile_exec_err.png]