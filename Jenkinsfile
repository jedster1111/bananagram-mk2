pipeline {
  agent {
    docker {
      image 'node:12.6.0-alpine'
    }
  }

  options {
        lock resource: 'bananagram_lock'
  }

  stages {
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
