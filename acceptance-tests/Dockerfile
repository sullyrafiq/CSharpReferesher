#  Docker that hosts the Motor Insurance Web Application Acceptance Tests
#-------------------------------------------------------------------------------
FROM node:carbon-alpine
LABEL maintainer=motor-insurance
LABEL name=motor-insurance-acceptance-tests
#-------------------------------------------------------------------------------

#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Dependency installs
RUN apk add --no-cache \
      bash \
      bzip2 \
      curl \
      git \
      gnupg \
      python \
      unzip \
      yarn \
      zip

#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# set default sh to bash
RUN unlink /bin/sh && ln -s /bin/bash /bin/sh

#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# glibc required for browserstack
ENV GLIBC_VERSION=2.28-r0

RUN apk --no-cache add ca-certificates wget && \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/$GLIBC_VERSION/glibc-$GLIBC_VERSION.apk" && \
    wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/$GLIBC_VERSION/glibc-bin-$GLIBC_VERSION.apk" && \
    wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/$GLIBC_VERSION/glibc-i18n-$GLIBC_VERSION.apk" && \
    apk add "glibc-bin-$GLIBC_VERSION.apk" "glibc-i18n-$GLIBC_VERSION.apk" "glibc-$GLIBC_VERSION.apk" && \
    rm "glibc-bin-$GLIBC_VERSION.apk" "glibc-i18n-$GLIBC_VERSION.apk" "glibc-$GLIBC_VERSION.apk"

#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# installing openjdk-8-jre
# Default to UTF-8 file.encoding
ENV LANG C.UTF-8

# add a simple script that can auto-detect the appropriate JAVA_HOME value
# based on whether the JDK or only the JRE is installed
RUN { \
    echo '#!/bin/sh'; \
    echo 'set -e'; \
    echo; \
    echo 'dirname "$(dirname "$(readlink -f "$(which javac || which java)")")"'; \
  } > /usr/local/bin/docker-java-home \
  && chmod +x /usr/local/bin/docker-java-home
ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk/jre
ENV PATH $PATH:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin


RUN set -x \
  && apk add --no-cache \
    openjdk8-jre \
  && [ "$JAVA_HOME" = "$(docker-java-home)" ]


#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# install aws-cli for uploading test reports to s3

ADD https://s3.amazonaws.com/aws-cli/awscli-bundle.zip /tmp

RUN cd /tmp && \
  unzip awscli-bundle.zip && \
  awscli-bundle/install -b /usr/bin/aws && \
  rm -rf /var/cache/apk/* /tmp/awscli-bundle*

#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# install acceptance tests and dependencies
COPY . /acceptance-tests

RUN mkdir -p /acceptance-tests/logs

WORKDIR /acceptance-tests

RUN yarn install && \
  yarn global add nightwatch-html-reporter && \
  yarn cache clean && \
  yarn lint

#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

ENV MSMID_ENV=ci1-cms
CMD ["/bin/bash", "run-tests.sh"]

# When building run this to copy the updated yarn.lock back out of container
# docker run -it {container_name} bash
# docker cp {container_name}:/acceptance-tests/yarn.lock .
