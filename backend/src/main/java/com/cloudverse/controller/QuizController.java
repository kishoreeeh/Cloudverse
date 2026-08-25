package com.cloudverse.controller;

import com.cloudverse.common.dto.ApiResponse;
import com.cloudverse.dto.QuizResponse;
import com.cloudverse.dto.QuizResultResponse;
import com.cloudverse.dto.QuizSubmitRequest;
import com.cloudverse.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class QuizController {
    private final QuizService service;

    @GetMapping("/topics/{topicId}/quiz")
    public ApiResponse<QuizResponse> getQuizForTopic(@PathVariable String topicId) {
        return ApiResponse.success(service.getByTopic(topicId));
    }

    @PostMapping("/quizzes/submit")
    public ApiResponse<QuizResultResponse> submitQuiz(@RequestBody QuizSubmitRequest request) {
        return ApiResponse.success(service.submitQuiz(request));
    }
}
