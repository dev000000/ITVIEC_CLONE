package com.dev001.itviec.enums;

public enum OvertimePolicy {
    NO_OVERTIME("No overtime (No OT)"),
    OPTIONAL("Optional (voluntary)"),
    OCCASIONAL("Occasional OT when necessary"),
    PAID_OT("Paid OT / Compensatory leave"),
    FREQUENT("Frequent OT");

    private final String displayName;

    OvertimePolicy(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
