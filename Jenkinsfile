pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'yarn install'
        sh 'yarn build'
      }
    }
    stage('Test') {
      parallel {
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
    }
    stage('SonarQube analysis') {
      steps {
        script {
          def scannerHome = tool 'SonarQube Scanner 3.2';
          withSonarQubeEnv('SonarQube') {
            sh "${scannerHome}/bin/sonar-scanner " +
              '-Dsonar.projectKey=jenkins-blog-node-sample ' +
              '-Dsonar.projectName=jenkins-blog-node-sample ' +
              '-Dsonar.projectVersion=1.0 ' +
              '-Dsonar.sources=.  ' +
              '-Dsonar.exclusions=node_modules/**/*,coverage/**/* ' +
              '-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info '
          }
        }
      }
    }
    stage("Quality Gate") {
      steps {
        timeout(time: 1, unit: 'HOURS') {
          script {
            waitForQualityGate abortPipeline: true
          }
        }
      }
    }
  }
}
