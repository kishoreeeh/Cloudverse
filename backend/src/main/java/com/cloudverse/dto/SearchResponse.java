package com.cloudverse.dto;

import lombok.Data;

import java.util.List;

@Data
public class SearchResponse {
    private List<TechnologyResponse> technologies;
    private List<TopicSummaryResponse> topics;
}
