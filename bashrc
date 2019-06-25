# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
#[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
#force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    #alias grep='grep --color=auto'
    #alias fgrep='fgrep --color=auto'
    #alias egrep='egrep --color=auto'
fi

# colored GCC warnings and errors
#export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

# some more ls aliases
#alias ll='ls -l'
#alias la='ls -A'
#alias l='ls -CF'

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi

#alex env ####################################################################################################
if [ -f /etc/profile.d/node_env.sh ]; then
	. /etc/profile.d/node_env.sh
fi

if [ -f /home/alex/Qt/5.12.1/gcc_64 ]; then
	export QTDIR=/home/alex/Qt/5.12.1/gcc_64
	export QTEDIR=$QTDIR
	export PATH=$QTDIR/bin:$PATH
	
	export LD_LIBRARY_PATH=$QTDIR/lib:$LD_LIBRARY_PATH
	export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:$QTDIR/lib/pkgconfig
	export PATH=$QTDIR/bin:$PATH
fi


if [ -f /home/alex/Android/Sdk ]; then
	#android SDK
	export ANDROID_HOME=/home/alex/Android/Sdk
	#anadroid NDK
	export ANDROID_NDK_ROOT=$ANDROID_HOME/ndk-bundle
	export ANDROID_NDK=$ANDROID_HOME/ndk-bundle
	export PATH=$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_NDK:$PATH
fi

git config --global user.email "alex@bais.com.tw"
git config --global user.name "alex"

storecmd(){
	#history -c
	echo $1 >> ~/.bash_history
	echo "##########################################################################################"
	echo "cmd: $1"
	echo "##########################################################################################"
	history -r
	#Ctrl + p --> paste
}

#docker #################################################################################################
alias xdockImage="storecmd 'docker images'"
alias xdockContainer="storecmd 'docker ps -a'"
alias xdockPs="storecmd 'docker ps -a'"
alias xdockRun="storecmd  'docker run -it --name amuck_factor ubuntu:16.04'"


###alex ssh #############################################################################################
alias xsshmail="ssh -p 50022 alex@mail.bais.com.tw"
alias xsshhome="ssh alex@axsoho.asuscomm.com -p 59022"
alias xsshBeijingMedia="ssh alex@210.5.17.51"
alias xsshChinaMedia="ssh alex@video.ebais.com.cn"
alias xssh137="ssh alex@60.249.164.137"
alias xsshwebbais="ssh root@www.bais.com.tw"

alias xsshwechat1="ssh alex@192.168.35.61"
alias xsshwechat2="ssh alex@192.168.35.62"
alias xsshmedia2="ssh alex@192.168.35.65 -p 50023"
alias xsshline="ssh alex@192.168.35.61"
alias xsshNfRVNC="ssh -NfR 55900:localhost:5900 alex@axsoho.asuscomm.com -p 59022"

#app ####################################################################################################
alias xjupyter="cd ~/vcode/jupy/ ;/home/alex/anaconda3/bin/jupyter notebook --ip=172.16.39.139"
alias xandroid-studio="/home/alex/android-studio/bin/studio.sh &"

alias xscprsa="storecmd 'cat ~/.ssh/id_rsa.pub |ssh \$1 -p \$2 \"cat >> ~/.ssh/authorized_keys\" '"
alias xopen="nautilus $1"

#emulator
tmux
