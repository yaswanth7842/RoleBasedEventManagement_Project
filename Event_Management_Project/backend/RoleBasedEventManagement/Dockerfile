# Build stage - Build the Maven project
FROM maven:3.8-openjdk-21 AS builder

WORKDIR /build

# Copy pom.xml and source
COPY pom.xml .
COPY src/ ./src/

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage - Use Java 21
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the built jar from builder stage
COPY --from=builder /build/target/*.jar app.jar

# Expose port
EXPOSE 8085

# Set environment variables for Spring Boot
ENV SPRING_PROFILES_ACTIVE=prod

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
