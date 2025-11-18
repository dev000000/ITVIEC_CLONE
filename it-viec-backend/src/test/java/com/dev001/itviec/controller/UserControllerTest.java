// package com.dev001.identify.controller;
//
// import static org.junit.jupiter.api.Assertions.*;
// import static org.mockito.Mockito.*;
//
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
// import com.dev001.identify.dto.request.UserCreationRequest;
// import com.dev001.identify.dto.response.UserResponse;
// import com.dev001.identify.service.UserService;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
//
//// @SpringBootTest
// @WebMvcTest(UserController.class)
// @AutoConfigureMockMvc(addFilters = false)
// class UserControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private UserService userService;
//
//    private UserCreationRequest request;
//    private UserResponse response;
//
//    @BeforeEach
//    //    void setUp() {
//    //        request = UserCreationRequest.builder()
//    //                .userName("testtesttest")
//    //                .passWord("passwordtest")
//    //                .firstName("test")
//    //                .lastName("test")
//    //                .dob(LocalDate.parse("2007-08-28"))
//    //                .build();
//    //        response = UserResponse.builder()
//    //                .id("adkjflsd")
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
//        // convert object to json string
//        /*
//        {
//        "userName": "testtesttest",
//        "passWord": "passwordtest",
//        "firstName": "test",
//        "lastName": "test",
//        "dob": "2007-08-28"
//        }
//        */
//        //        when(userService.createUser(any())).thenReturn(response);
//        // when
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users")
//                        .contentType(MediaType.APPLICATION_JSON_VALUE)
//                        .content(content))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("code").value(1000));
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
//        // convert object to json string
//        /*
//        {
//        "userName": "testtesttest",
//        "passWord": "passwordtest",
//        "firstName": "test",
//        "lastName": "test",
//        "dob": "2007-08-28"
//        }
//        */
//        //        when(userService.createUser(any())).thenReturn(response);
//        // when
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users")
//                        .contentType(MediaType.APPLICATION_JSON_VALUE)
//                        .content(content))
//                .andExpect(MockMvcResultMatchers.status().isBadRequest())
//                .andExpect(MockMvcResultMatchers.jsonPath("code").value(1004))
//                .andExpect(MockMvcResultMatchers.jsonPath("message")
//                        .value("Password must be between 10 and 20 characters"));
//
//        //        verify(userService, never()).createUser(any());
//        // then
//
//    }
// }
