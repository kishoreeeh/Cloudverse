package com.cloudverse.dto;

import lombok.Data;
import java.time.Instant;

@Data
public class TechnologyResponse {
    private String id;
    private String slug;
    private String title;
    private String description;
    private String icon;
    private String color;
    private String officialDocUrl;
    private int topicCount;
    private int displayOrder;
    private Instant createdAt;
}
