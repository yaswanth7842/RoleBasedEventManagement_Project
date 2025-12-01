# Use Java 21 as base image
FROM eclipse-temurin:21-jre

# Set working directory
WORKDIR /app

# Copy the jar file from target directory
COPY target/*.jar app.jar

# Expose port
EXPOSE 8085

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
