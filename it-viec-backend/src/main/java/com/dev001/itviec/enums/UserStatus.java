package com.dev001.itviec.enums;

public enum UserStatus {
    PENDING_ACTIVATION("Pending Activation"),
    ACTIVE("Active"),
    DISABLED("Disabled");
    private final String displayName;

    UserStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
