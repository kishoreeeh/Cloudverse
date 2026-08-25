package com.cloudverse.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuizResultResponse {
    private int score;
    private int totalQuestions;
    private double percentage;
    private List<QuestionResult> questionResults;
}
