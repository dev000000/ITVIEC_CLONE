package com.dev001.itviec.enums;

import java.util.Arrays;

public enum PopularTagCategory {
    SKILL_AND_EXPERTISE("Skill and Expertise"),
    COMPANY("Company");

    private final String displayName;

    PopularTagCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static PopularTagCategory fromValue(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }

        String normalized = value.trim();

        return Arrays.stream(values())
                .filter(category -> category.name().equalsIgnoreCase(normalized)
                        || category.displayName.equalsIgnoreCase(normalized))
                .findFirst()
                .orElse(null);
    }
}
