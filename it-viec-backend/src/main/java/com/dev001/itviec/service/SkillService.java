package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.response.SkillResponse;

/**
 * Service interface quản lý các skill trong hệ thống.
 * Cung cấp chức năng lấy danh sách và tạo mới skill.
 */
public interface SkillService {

    /**
     * Lấy danh sách toàn bộ skill.
     *
     * @return danh sách SkillResponse
     */
    List<SkillResponse> getAllSkills();

    /**
     * Tạo mới một skill trong hệ thống.
     *
     * @param skillName tên skill cần tạo (đã được validate không rỗng ở tầng controller)
     * @return thông tin skill vừa được tạo
     */
    SkillResponse createSkill(String skillName);
}
