# Stage 1: build
# Start with a Maven image that includes JDK 17 (OS + MAVEN + JDK)
FROM maven:3.9-amazoncorretto-17-debian AS build

# Copy source code and pom.xml file to /app folder
WORKDIR /app

#COPY <source> <destination>
#COPY pom.xml to /app  => /app/pom.xml
COPY pom.xml .
#COPY folder src to   => /app/src
COPY src ./src

# Build source code with maven
RUN mvn package -DskipTests -Dspotless.check.skip=true

#Stage 2: create image
# Start with Amazon Correto JDK 17 (OS + JDK)
FROM amazoncorretto:17

# Set working folder to App and copy complied file from above step
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]