package com.cloudverse.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuizSubmitRequest {
    private String quizId;
    private List<Integer> answers;
}
