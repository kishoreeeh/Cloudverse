package com.cloudverse.controller;

import com.cloudverse.common.dto.ApiResponse;
import com.cloudverse.dto.SearchResponse;
import com.cloudverse.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService service;

    @GetMapping
    public ApiResponse<SearchResponse> search(@RequestParam String q) {
        return ApiResponse.success(service.search(q));
    }
}
