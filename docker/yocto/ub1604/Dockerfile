FROM ubuntu:16.04

RUN apt-get update && apt-get -y install gawk wget git-core diffstat unzip texinfo gcc-multilib \
     build-essential chrpath socat cpio python python3 python3-pip python3-pexpect \
     xz-utils debianutils iputils-ping python3-git python3-jinja2 libegl1-mesa libsdl1.2-dev xterm \
     tar locales sudo vim 

RUN rm /bin/sh && ln -s bash /bin/sh

RUN locale-gen en_US.UTF-8 && update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

ENV USER_NAME=alex
ENV PROJECT=alex

ARG host_uid=1001
ARG host_gid=1001

RUN adduser --disabled-password --gecos '' $USER_NAME ;\
     echo alex:alex | chpasswd

RUN groupadd -g $host_gid $USER_NAME && \
     useradd -g $host_gid -m -s /bin/bash -u $host_uid $USER_NAME; \
     addgroup sudo; \
     addgroup $USER_NAME sudo

USER alex
ENV BUILD_HOME=/home/$USER_NAME

WORKDIR $BUILD_HOME

CMD [ "/bin/bash" ]
