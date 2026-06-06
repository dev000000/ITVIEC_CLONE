package com.dev001.itviec.controller;

import static org.assertj.core.api.Assertions.assertThat;

import java.lang.reflect.Method;
import java.time.LocalDate;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.security.access.prepost.PreAuthorize;

import com.dev001.itviec.dto.request.AdminJobStatusUpdateRequest;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.enums.JobType;

class JobControllerAdminAnnotationsTest {

    @Test
    void adminEndpointsShouldRequireAdminRole() throws NoSuchMethodException {
        Map<String, Method> adminMethods = Map.of(
                "getAdminJobs",
                JobController.class.getMethod(
                        "getAdminJobs",
                        int.class,
                        int.class,
                        String.class,
                        String.class,
                        JobStatus.class,
                        JobType.class,
                        Long.class,
                        LocalDate.class,
                        LocalDate.class),
                "getAdminJobById",
                JobController.class.getMethod("getAdminJobById", Long.class),
                "updateAdminJobStatus",
                JobController.class.getMethod("updateAdminJobStatus", Long.class, AdminJobStatusUpdateRequest.class),
                "deleteAdminJob",
                JobController.class.getMethod("deleteAdminJob", Long.class));

        for (Method method : adminMethods.values()) {
            PreAuthorize annotation = method.getAnnotation(PreAuthorize.class);
            assertThat(annotation).isNotNull();
            assertThat(annotation.value()).isEqualTo("hasRole('ADMIN')");
        }
    }
}
