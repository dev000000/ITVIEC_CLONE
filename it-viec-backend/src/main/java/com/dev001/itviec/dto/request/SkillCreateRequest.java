package com.dev001.itviec.dto.request;

import jakarta.validation.constraints.NotBlank;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

/**
 * Request DTO dùng để tạo mới một Skill trong hệ thống.
 * - Bao gồm tên skill, bắt buộc không được để trống.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SkillCreateRequest {

    /**
     * Tên của skill.
     * Ràng buộc: không để trống.
     * Message sử dụng key để hỗ trợ i18n: "SKILL_NAME_REQUIRED".
     */
    @NotBlank(message = "SKILL_NAME_REQUIRED")
    String skillName;
}
