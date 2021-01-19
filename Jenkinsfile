node('docker') {
    checkout scm
    stage('Build') {
        docker.image('node:14-alpine').inside {
            sh 'npm --version'
        }
    }
}