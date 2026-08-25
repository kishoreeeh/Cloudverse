package com.cloudverse.service;

import com.cloudverse.common.exception.ResourceNotFoundException;
import com.cloudverse.dto.TopicResponse;
import com.cloudverse.dto.TopicSummaryResponse;
import com.cloudverse.model.Topic;
import com.cloudverse.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TopicService {
    private final TopicRepository repository;

    public List<TopicSummaryResponse> getByTechnology(String technologyId) {
        return repository.findByTechnologyIdOrderByDisplayOrder(technologyId).stream()
                .map(this::mapToSummary)
                .collect(Collectors.toList());
    }

    public TopicResponse getById(String id) {
        return repository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found: " + id));
    }

    public TopicResponse getByTechnologyAndSlug(String technologyId, String slug) {
        return repository.findByTechnologyIdAndSlug(technologyId, slug)
                .map(this::mapToResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found"));
    }

    private TopicSummaryResponse mapToSummary(Topic t) {
        TopicSummaryResponse r = new TopicSummaryResponse();
        r.setId(t.getId());
        r.setSlug(t.getSlug());
        r.setTitle(t.getTitle());
        r.setDisplayOrder(t.getDisplayOrder());
        return r;
    }

    public TopicResponse mapToResponse(Topic t) {
        TopicResponse r = new TopicResponse();
        r.setId(t.getId());
        r.setTechnologyId(t.getTechnologyId());
        r.setSlug(t.getSlug());
        r.setTitle(t.getTitle());
        r.setOverview(t.getOverview());
        r.setOfficialDocUrl(t.getOfficialDocUrl());
        r.setVideoLinks(t.getVideoLinks());
        r.setInterviewQuestions(t.getInterviewQuestions());
        r.setFlashCards(t.getFlashCards());
        r.setDisplayOrder(t.getDisplayOrder());
        r.setCreatedAt(t.getCreatedAt());
        return r;
    }
}
