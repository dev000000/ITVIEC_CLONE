package com.dev001.itviec.dto.response;

import java.util.List;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PageResponse<T> {
    List<T> data;
    int page;
    int size;
    long totalElements;
    int totalPages;
    boolean isFirst;
    boolean isLast;
}
