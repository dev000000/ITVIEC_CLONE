package com.dev001.itviec.enums;

public enum Gender {
    MALE("Nam"),
    FEMALE("Nữ"),
    OTHERS("Khác");
    private final String displayName;

    Gender(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

