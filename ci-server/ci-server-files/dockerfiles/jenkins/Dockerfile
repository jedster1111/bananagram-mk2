FROM jenkins/jenkins:latest
  
ARG dockergid

# volume for Jenkins settings
VOLUME /var/jenkins_home

# ENV JAVA_OPTS -Djenkins.install.runSetupWizard=false

# Install docker and set up jenkins group permissions
USER root

RUN groupadd -g ${dockergid} docker

RUN usermod -a -G docker jenkins

USER jenkins

# install jenkins plugins
COPY ./jenkins-plugins /usr/share/jenkins/plugins
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/plugins