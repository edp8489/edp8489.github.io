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
set(CMAKE_FIND_ROOT_PATH ~/osxcross)

# specify compilers to use
# C Compiler - clang or gcc
# if using clang
set(CMAKE_C_COMPILER o64-apple-darwin20.4-clang)
# set(CMAKE_C_COMPILER o64-apple-darwin20.4-gcc)
# C++ compilers - clang++ or g++
set(CMAKE_CXX_COMPILER o64-apple-darwin20.4-clang++)
# set(CMAKE_CXX_COMPILER o64-apple-darwin20.4-g++)
set(CMAKE_Fortran_COMPILER o64-apple-darwin20.4-gfortran)

# set search path options for compilers, libraries, and packages
# Search for programs in the build host directories
#SET(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)

# For libraries and headers in the target directories
SET(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
SET(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)