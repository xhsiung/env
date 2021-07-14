FROM ubuntu:20.04

RUN apt-get update && \       
    DEBIAN_FRONTEND="noninteractive" apt-get install -y apt-utils build-essential ccache ecj fastjar file g++ gawk \
    gettext git java-propose-classpath libelf-dev libncurses5-dev \
    libncursesw5-dev libssl-dev python python2.7-dev python3 unzip wget \
    python3-distutils python3-setuptools rsync subversion swig time \
    xsltproc zlib1g-dev sudo vim && \
    apt-get clean && \
    useradd -m alex && \
    echo 'alex ALL=NOPASSWD: ALL' > /etc/sudoers.d/alex && \
    cd /home ; chown alex.alex -R alex

USER alex
WORKDIR /home/alex
