FROM jenkins/jenkins:latest

# volume for Jenkins settings
VOLUME /var/jenkins_home

# ENV JAVA_OPTS -Djenkins.install.runSetupWizard=false

EXPOSE 8080 50000

# install jenkins plugins
COPY ./jenkins-plugins /usr/share/jenkins/plugins
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/plugins

COPY ./jenkins.yaml /usr/share/jenkins
