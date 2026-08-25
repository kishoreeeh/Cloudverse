package com.cloudverse.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    private String text;
    private List<String> options;
    private int correctAnswerIndex;
    private String explanation;
}
