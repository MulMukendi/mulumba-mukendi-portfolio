FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .
RUN chmod +x mvnw

RUN ./mvnw dependency:go-offline

COPY src src

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

ENTRYPOINT ["java","-jar","target/usersystem-0.0.1-SNAPSHOT.jar"]