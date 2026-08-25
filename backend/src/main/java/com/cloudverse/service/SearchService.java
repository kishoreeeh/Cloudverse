package com.cloudverse.service;

import com.cloudverse.dto.SearchResponse;
import com.cloudverse.dto.TopicSummaryResponse;
import com.cloudverse.repository.TechnologyRepository;
import com.cloudverse.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final TechnologyRepository technologyRepository;
    private final TopicRepository topicRepository;
    private final TechnologyService technologyService;

    public SearchResponse search(String query) {
        SearchResponse response = new SearchResponse();
        response.setTechnologies(technologyRepository.findAll().stream()
                .filter(t -> t.getTitle().toLowerCase().contains(query.toLowerCase()))
                .map(technologyService::mapToResponse)
                .collect(Collectors.toList()));

        response.setTopics(topicRepository.findByTitleContainingIgnoreCase(query).stream()
                .map(t -> {
                    TopicSummaryResponse r = new TopicSummaryResponse();
                    r.setId(t.getId());
                    r.setSlug(t.getSlug());
                    r.setTitle(t.getTitle());
                    r.setDisplayOrder(t.getDisplayOrder());
                    return r;
                })
                .collect(Collectors.toList()));

        return response;
    }
}
