package com.dev001.itviec.enums;

public enum WorkingHours {
    MON_FRI("Monday – Friday"),
    MON_SAT_HALF("Monday – Saturday (half-day)"),
    MON_SAT("Monday – Saturday"),
    FLEXIBLE("Flexible (Flexible time)"),
    HYBRID("Hybrid (Remote + Office)"),
    FULL_REMOTE("Full Remote");

    private final String displayName;

    WorkingHours(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
