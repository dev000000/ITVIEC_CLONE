package com.dev001.itviec.enums;

public enum CompanyModel {
    PRODUCT("Product"),
    OUTSOURCING("Outsourcing"),
    CONSULTING_SOLUTION("Consulting / Solution"),
    STARTUP("Startup"),
    CLOUD_PLATFORM("Cloud / Platform"),
    RESEARCH_LAB("Research Lab");
    private final String displayName;

    CompanyModel(String displayName) {
        this.displayName = displayName;
    }
    public String getDisplayName() {
        return displayName;
    }
}
