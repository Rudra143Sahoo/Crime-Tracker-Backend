pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo "📥 Cloning repository..."
                git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/Rudra143Sahoo/Crime-Tracker-Backend.git'
            }
        }

        stage('Build with Docker Compose') {
            steps {
                echo "🔧 Stopping existing containers if any..."
                sh 'docker-compose down || true'

                echo "🐳 Building Docker images..."
                sh 'docker-compose build'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo "🚀 Starting containers..."
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        success {
            echo '✅ Application and MongoDB deployed successfully.'
        }
        failure {
            echo '❌ Build or deployment failed.'
        }
    }
}
