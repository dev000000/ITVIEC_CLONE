package com.dev001.itviec.enums;

public enum ExperienceLevel {
    INTERN("Intern"),
    FRESHER("Fresher"),
    JUNIOR("Junior"),
    MID("Mid"),
    SENIOR("Senior"),
    LEAD("Lead"),
    MANAGER("Manager");

    private final String displayName;

    ExperienceLevel(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
