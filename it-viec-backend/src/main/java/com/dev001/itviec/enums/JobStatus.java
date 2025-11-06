package com.dev001.itviec.enums;

public enum JobStatus {
    ACTIVE("Active"),
    CLOSED("Closed"),
    DRAFT("Draft"),
    EXPIRED("Expired");

    private final String displayName;

    JobStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
