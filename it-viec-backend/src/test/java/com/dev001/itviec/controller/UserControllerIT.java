// package com.dev001.identify.controller;
//
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.http.MediaType;
// import org.springframework.test.context.DynamicPropertyRegistry;
// import org.springframework.test.context.DynamicPropertySource;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
// import org.testcontainers.containers.MySQLContainer;
// import org.testcontainers.junit.jupiter.Container;
// import org.testcontainers.junit.jupiter.Testcontainers;
//
// import com.dev001.identify.dto.request.UserCreationRequest;
// import com.dev001.identify.dto.response.UserResponse;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
//
// @SpringBootTest
// @AutoConfigureMockMvc
//// Manages Testcontainers lifecycle for this test class.
//// If a @Container field is static, the container is started once per class and stopped after all tests.
// @Testcontainers
// class UserControllerIT {
//
//    //     Registers a Testcontainers-managed MySQL instance.
//    //     Because this field is static, the container is started once for the entire test class.
//    @Container
//    static final MySQLContainer<?> MY_SQL_CONTAINER = new MySQLContainer<>("mysql:8.0.28");
//
//    //     Contributes container-derived properties to Spring's Environment
//    //     BEFORE the ApplicationContext is refreshed (so DataSource picks them up).
//    @DynamicPropertySource
//    static void properties(DynamicPropertyRegistry r) {
//        r.add("spring.datasource.url", MY_SQL_CONTAINER::getJdbcUrl);
//        r.add("spring.datasource.username", MY_SQL_CONTAINER::getUsername);
//        r.add("spring.datasource.password", MY_SQL_CONTAINER::getPassword);
//        r.add("spring.datasource.driver-class-name", () -> "com.mysql.cj.jdbc.Driver");
//        r.add("spring.jpa.hibernate.ddl-auto", () -> "update");
//    }
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    private UserCreationRequest request;
//    private UserResponse response;
//
//    @BeforeEach
//    //    void setUp() {
//    //
//    //        request = UserCreationRequest.builder()
//    //                .userName("testtesttest")
//    //                .passWord("passwordtest")
//    //                .firstName("test")
//    //                .lastName("test")
//    //                .dob(LocalDate.parse("2007-08-28"))
//    //                .build();
//    //        response = UserResponse.builder()
//    //                .userName("testtesttest")
//    //                .firstName("test")
//    //                .lastName("test")
//    //                .dob(LocalDate.parse("2007-08-28"))
//    //                .build();
//    //    }
//
//    @Test
//    void createUser_validInput_shouldReturnUserDetails() throws Exception {
//        // given
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//        String content = objectMapper.writeValueAsString(request);
//        // convert the object to JSON string
//        /*
//        {
//        "userName": "testtesttest",
//        "passWord": "passwordtest",
//        "firstName": "test",
//        "lastName": "test",
//        "dob": "2007-08-28"
//        }
//        */
//        // when
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users")
//                        .contentType(MediaType.APPLICATION_JSON_VALUE)
//                        .content(content))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("code").value(1000))
//                .andExpect(MockMvcResultMatchers.jsonPath("data.userName").value("testtesttest"))
//                .andExpect(MockMvcResultMatchers.jsonPath("data.firstName").value("test"))
//                .andExpect(MockMvcResultMatchers.jsonPath("data.lastName").value("test"))
//                .andExpect(MockMvcResultMatchers.jsonPath("data.dob").value("2007-08-28"));
//        // then
//
//    }
//
//    @Test
//    void createUser_inValidPassword_shouldReturnUserDetails() throws Exception {
//        // given
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//        //        request.setPassWord("dhsja"); // 5 characters
//        String content = objectMapper.writeValueAsString(request);
//        // convert object to JSON string
//
//        // when and then
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users")
//                        .contentType(MediaType.APPLICATION_JSON_VALUE)
//                        .content(content))
//                .andExpect(MockMvcResultMatchers.status().isBadRequest())
//                .andExpect(MockMvcResultMatchers.jsonPath("code").value(1004))
//                .andExpect(MockMvcResultMatchers.jsonPath("message")
//                        .value("Password must be between 10 and 20 characters"));
//    }
// }
