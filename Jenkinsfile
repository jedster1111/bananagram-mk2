pipeline {
  agent {
    docker {
      image 'node:12.6.0-alpine'
    }

  }
  stages {
    stage('Install dependencies') {
      steps {
        sh '''yarn;
cd bananagram-frontend;
yarn test:ci;'''
      }
    }
  }
}