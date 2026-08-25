package com.cloudverse.service;

import com.cloudverse.common.exception.ResourceNotFoundException;
import com.cloudverse.dto.TechnologyResponse;
import com.cloudverse.model.Technology;
import com.cloudverse.repository.TechnologyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TechnologyService {
    private final TechnologyRepository repository;

    public List<TechnologyResponse> getAll() {
        return repository.findAllByOrderByDisplayOrder().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TechnologyResponse getBySlug(String slug) {
        return repository.findBySlug(slug)
                .map(this::mapToResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Technology not found with slug: " + slug));
    }

    public TechnologyResponse mapToResponse(Technology t) {
        TechnologyResponse r = new TechnologyResponse();
        r.setId(t.getId());
        r.setSlug(t.getSlug());
        r.setTitle(t.getTitle());
        r.setDescription(t.getDescription());
        r.setIcon(t.getIcon());
        r.setColor(t.getColor());
        r.setOfficialDocUrl(t.getOfficialDocUrl());
        r.setTopicCount(t.getTopicCount());
        r.setDisplayOrder(t.getDisplayOrder());
        r.setCreatedAt(t.getCreatedAt());
        return r;
    }
}
