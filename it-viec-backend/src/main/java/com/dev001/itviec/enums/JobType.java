package com.dev001.itviec.enums;

public enum JobType {
    ONSITE("Onsite"),
    HYBRID("Hybrid"),
    REMOTE("Remote"),
    FLEXIBLE("Flexible");
    private final String displayName;

    JobType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
