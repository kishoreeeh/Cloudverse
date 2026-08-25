package com.cloudverse.dto;

import lombok.Data;

@Data
public class TopicSummaryResponse {
    private String id;
    private String slug;
    private String title;
    private int displayOrder;
}
