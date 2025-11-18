package com.dev001.itviec.enums;

public enum CompanySize {
    SIZE_1_10("1-10 employees"),
    SIZE_11_50("11-50 employees"),
    SIZE_51_150("51-150 employees"),
    SIZE_151_300("151-300 employees"),
    SIZE_301_500("301-500 employees"),
    SIZE_501_1000("501-1000 employees"),
    SIZE_1000_PLUS("1000+ employees");

    private final String displayName;

    CompanySize(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
