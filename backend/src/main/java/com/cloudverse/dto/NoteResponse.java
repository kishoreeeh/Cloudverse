package com.cloudverse.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class NoteResponse {
    private String id;
    private String topicId;
    private String content;
    private Instant createdAt;
    private Instant updatedAt;
}
