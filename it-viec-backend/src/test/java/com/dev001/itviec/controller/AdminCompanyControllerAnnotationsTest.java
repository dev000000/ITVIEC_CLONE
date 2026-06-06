package com.dev001.itviec.controller;

import static org.assertj.core.api.Assertions.assertThat;

import java.lang.reflect.Method;

import org.junit.jupiter.api.Test;
import org.springframework.security.access.prepost.PreAuthorize;

import com.dev001.itviec.dto.response.CompanyOptionResponse;
import com.dev001.itviec.enums.CompanyModel;
import com.dev001.itviec.enums.CompanySize;

class AdminCompanyControllerAnnotationsTest {

    @Test
    void adminCompanyEndpointShouldRequireAdminRole() throws NoSuchMethodException {
        Method method = AdminCompanyController.class.getMethod(
                "getAdminCompanies",
                int.class,
                int.class,
                String.class,
                CompanyModel.class,
                Long.class,
                CompanySize.class);

        PreAuthorize annotation = method.getAnnotation(PreAuthorize.class);
        assertThat(annotation).isNotNull();
        assertThat(annotation.value()).isEqualTo("hasRole('ADMIN')");
    }

    @Test
    void adminCompanyOptionsEndpointShouldRequireAdminRole() throws NoSuchMethodException {
        Method method = AdminCompanyController.class.getMethod("getAdminCompanyOptions");

        PreAuthorize annotation = method.getAnnotation(PreAuthorize.class);
        assertThat(annotation).isNotNull();
        assertThat(annotation.value()).isEqualTo("hasRole('ADMIN')");
    }
}
