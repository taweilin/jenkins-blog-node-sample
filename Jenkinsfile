pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'yarn install'
        sh 'yarn build'
      }
    }
    stage('test') {
      parallel(
        "unit test": {
          stage('unit test') {
            steps {
              sh 'yarn coverage'
            }
            post {
              always {
                junit "reports/unittest.xml"
              }
            }
          }
        },
        "e2e test": {
          stage('e2e test') {
            steps {
              sh 'yarn e2e'
            }
            post {
              always {
                junit "reports/CHROME*.xml"
              }
            }
          }
        }
      )
    }
  }
}
