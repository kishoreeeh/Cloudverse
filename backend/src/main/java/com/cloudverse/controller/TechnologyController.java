package com.cloudverse.controller;

import com.cloudverse.common.dto.ApiResponse;
import com.cloudverse.dto.TechnologyResponse;
import com.cloudverse.dto.TopicSummaryResponse;
import com.cloudverse.service.TechnologyService;
import com.cloudverse.service.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/technologies")
@RequiredArgsConstructor
public class TechnologyController {
    private final TechnologyService service;
    private final TopicService topicService;

    @GetMapping
    public ApiResponse<List<TechnologyResponse>> getAll() {
        return ApiResponse.success(service.getAll());
    }

    @GetMapping("/{slug}")
    public ApiResponse<TechnologyResponse> getBySlug(@PathVariable String slug) {
        return ApiResponse.success(service.getBySlug(slug));
    }

    @GetMapping("/{slug}/topics")
    public ApiResponse<List<TopicSummaryResponse>> getTopics(@PathVariable String slug) {
        TechnologyResponse tech = service.getBySlug(slug);
        return ApiResponse.success(topicService.getByTechnology(tech.getId()));
    }
}
