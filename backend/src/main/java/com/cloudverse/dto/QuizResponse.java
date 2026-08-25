package com.cloudverse.dto;

import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class QuizResponse {
    private String id;
    private String topicId;
    private String technologyId;
    private String title;
    private List<QuestionResponse> questions;
    private Instant createdAt;
    
    @Data
    public static class QuestionResponse {
        private String text;
        private List<String> options;
    }
}
