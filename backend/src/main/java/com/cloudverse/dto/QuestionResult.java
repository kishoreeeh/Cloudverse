package com.cloudverse.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuestionResult {
    private String questionText;
    private int selectedAnswer;
    private int correctAnswer;
    private boolean isCorrect;
    private String explanation;
}
