Setting up a new python virtual environment always feels more complicated than it should be. It doesn't help that between my personal and work computers I switch between Mac, linux (via WSL2), and Windows. Here's a quick cheatsheet to get started on any system using `pyenv` or `anaconda` as the virtual environment manager.

## using pyenv and virtualenv

```bash
brew install pyenv pyenv-virtualenv

pyenv install 3.11

pyenv virtualenv 3.11 VENV_NAME

pyenv local VENV_NAME

pip install torch torchvision diffusers transformers 
```

## using Anaconda
Create a new virtual environment and install required packages at the same time. 

Note: Example below is for mac. Replace `brew install --cask` with `sudo apt-get install` if on Linux/WSL or omit entirely and run the standalone installer for [Anaconda](https://www.anaconda.com/products/distribution) or [miniconda](https://docs.conda.io/en/latest/miniconda.html) if on Windows.

```bash
brew install --cask miniconda

conda create --name VENV_NAME python=3.11 package1 package2 ... packageN

conda activate VENV_NAME
```

Once a virtual environment is activated within a directory, it becomes the default (similar to `pyenv local`)