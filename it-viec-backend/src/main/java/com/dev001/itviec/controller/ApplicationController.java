package com.dev001.itviec.controller;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    // API cho nhà tuyển dụng lấy toàn bộ đơn ứng tuyển của công ty đó => get

    // API cho phép nhà tuyển dụng cập nhật trạng thái đơn ứng tuyển, thông báo phỏng vấn ( nếu có ) => put

    // API cho phép người xin việc (seeker) lấy toàn bộ đơn ứng tuyển của họ => get

    // API cho phép người xin việc ứng tuyển vào 1 công việc  => post

    // API cho phép quản trị viên lấy toàn bộ đơn ứng tuyển trong hệ thống => get

}
