package com.dev001.itviec.controller;

import static org.assertj.core.api.Assertions.assertThat;

import java.lang.reflect.Method;

import org.junit.jupiter.api.Test;
import org.springframework.security.access.prepost.PreAuthorize;

import com.dev001.itviec.dto.request.PopularTagCreateRequest;

class PopularTagControllerAnnotationsTest {

    @Test
    void adminPopularTagEndpointsShouldRequireAdminRole() throws NoSuchMethodException {
        Method createMethod =
                PopularTagController.class.getMethod("createPopularTag", PopularTagCreateRequest.class);
        Method deleteMethod = PopularTagController.class.getMethod("deletePopularTag", Long.class);

        for (Method method : new Method[] {createMethod, deleteMethod}) {
            PreAuthorize annotation = method.getAnnotation(PreAuthorize.class);
            assertThat(annotation).isNotNull();
            assertThat(annotation.value()).isEqualTo("hasRole('ADMIN')");
        }
    }
}
