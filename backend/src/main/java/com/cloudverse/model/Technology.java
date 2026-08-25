package com.cloudverse.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "technologies")
public class Technology {
    @Id
    private String id;
    @Indexed(unique = true)
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
