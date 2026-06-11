package com.dev001.itviec.util;

import java.text.Normalizer;
import java.util.Locale;

public final class CitySlugUtils {

    private CitySlugUtils() {}

    public static String toSlug(String value) {
        if (value == null) {
            return "";
        }

        String normalized = value.trim().replaceAll("\\s+", " ");
        if (normalized.isEmpty()) {
            return "";
        }

        return Normalizer.normalize(normalized, Normalizer.Form.NFD)
                .replaceAll("\\p{M}+", "")
                .replace('đ', 'd')
                .replace('Đ', 'd')
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-+|-+$", "");
    }
}
