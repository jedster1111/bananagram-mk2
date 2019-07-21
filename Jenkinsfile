pipeline {
  agent {
    docker {
      image 'node:12.6.0-alpine'
    }
  }
  stages {
    lock("no-concurrent-lock"){
      stage('Install dependencies') {
        steps {
          sh "yarn"
        }
      }
      stage('Front-End Unit Tests') {
        steps {
          sh '''
            cd bananagram-frontend
            yarn test:ci
          '''
        }
      }
    }
  }
}
