# Use official OpenJDK 21 base image
FROM openjdk:21-jdk-slim

# Set working directory inside container
WORKDIR /app

# Define the JAR file (adjust if needed)
ARG JAR_FILE=target/Crime-Tracker-Backend-0.0.1-SNAPSHOT.jar

# Copy the JAR file into the image
COPY ${JAR_FILE} app.jar

# Expose port used by Spring Boot
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
