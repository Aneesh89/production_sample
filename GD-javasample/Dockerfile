FROM 10.5.35.127:30114/openjdk:11.0.7 AS builder
WORKDIR target/dependency
ARG APPJAR=target/*.jar
COPY ${APPJAR} testSupport.jar
RUN jar -xf ./testSupport.jar

FROM 10.5.35.127:30114/openjdk:11.0.7
VOLUME /tmp
ARG DEPENDENCY=target/dependency
COPY --from=builder ${DEPENDENCY}/BOOT-INF/lib /testSupport/lib
COPY --from=builder ${DEPENDENCY}/META-INF /testSupport/META-INF
COPY --from=builder ${DEPENDENCY}/BOOT-INF/classes /testSupport
ENTRYPOINT ["java","-cp","testSupport:testSupport/lib/*","com.kerala.TestSupportApplication"]

