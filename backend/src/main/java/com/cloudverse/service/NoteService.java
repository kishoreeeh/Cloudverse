package com.cloudverse.service;

import com.cloudverse.dto.NoteRequest;
import com.cloudverse.dto.NoteResponse;
import com.cloudverse.model.Note;
import com.cloudverse.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository repository;

    public NoteResponse getByTopic(String topicId) {
        return repository.findByTopicId(topicId)
                .map(this::mapToResponse)
                .orElse(null);
    }

    public NoteResponse saveNote(NoteRequest request) {
        Note note = repository.findByTopicId(request.getTopicId())
                .orElse(Note.builder().topicId(request.getTopicId()).createdAt(Instant.now()).build());
        note.setContent(request.getContent());
        note.setUpdatedAt(Instant.now());
        return mapToResponse(repository.save(note));
    }

    public void deleteNote(String id) {
        repository.deleteById(id);
    }

    private NoteResponse mapToResponse(Note n) {
        NoteResponse r = new NoteResponse();
        r.setId(n.getId());
        r.setTopicId(n.getTopicId());
        r.setContent(n.getContent());
        r.setCreatedAt(n.getCreatedAt());
        r.setUpdatedAt(n.getUpdatedAt());
        return r;
    }
}
