package com.cloudverse.controller;

import com.cloudverse.common.dto.ApiResponse;
import com.cloudverse.dto.NoteRequest;
import com.cloudverse.dto.NoteResponse;
import com.cloudverse.service.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notes")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService service;

    @GetMapping("/topic/{topicId}")
    public ApiResponse<NoteResponse> getByTopic(@PathVariable String topicId) {
        return ApiResponse.success(service.getByTopic(topicId));
    }

    @PostMapping
    public ApiResponse<NoteResponse> saveNote(@Valid @RequestBody NoteRequest request) {
        return ApiResponse.success(service.saveNote(request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteNote(@PathVariable String id) {
        service.deleteNote(id);
        return ApiResponse.success(null, "Note deleted");
    }
}
