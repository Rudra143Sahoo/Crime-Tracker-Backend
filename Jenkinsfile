pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo "📥 Cloning repository..."
                echo "✅ Repository already checked out by Jenkins."
            }
        }

        stage('Build Java Project') {
            steps {
                echo "⚙️ Building Java project using Maven..."
                bat '.\\mvnw.cmd clean package -DskipTests'
            }
        }

        stage('Build with Docker Compose') {
            steps {
                echo "🔧 Stopping existing containers if any..."
                bat 'docker-compose down || exit 0'

                echo "🐳 Building Docker images..."
                bat 'docker-compose build'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo "🧹 Forcibly removing existing MongoDB container if it exists..."
                bat 'docker rm -f crimecase-mongodb || exit 0'

                echo "🔻 Stopping and cleaning up previous containers..."
                bat 'docker-compose down || exit 0'

                echo "🚀 Starting fresh containers..."
                bat 'docker-compose up -d --remove-orphans'
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
