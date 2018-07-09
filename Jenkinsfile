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
      failFast true
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
    stage('SonarQube') {
      when {
        anyOf {
          branch 'master'
          branch 'staging'
        }
      }
      stages {
        stage('Analysis') {
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
    stage('SonarQube Preview') {
      when {
        changeRequest()
      }
      environment {
        GITHUB_ACCESS_TOKEN = credentials('GITHUB PERSONAL ACCESS TOKEN')
      }
      stages {
        stage('Analysis') {
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
                  '-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info ' +
                  '-Dsonar.github.repository=kirkchen/jenkins-blog-node-sample ' +
                  '-Dsonar.analysis.mode=preview ' +
                  "-Dsonar.github.pullRequest=${CHANGE_ID} " +
                  "-Dsonar.github.oauth=${GITHUB_ACCESS_TOKEN} "
              }
            }
          }
        }
      }
    }
  }
}
