package com.cloudverse.controller;

import com.cloudverse.common.dto.ApiResponse;
import com.cloudverse.dto.TopicResponse;
import com.cloudverse.service.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/topics")
@RequiredArgsConstructor
public class TopicController {
    private final TopicService service;

    @GetMapping("/{id}")
    public ApiResponse<TopicResponse> getById(@PathVariable String id) {
        return ApiResponse.success(service.getById(id));
    }
}
