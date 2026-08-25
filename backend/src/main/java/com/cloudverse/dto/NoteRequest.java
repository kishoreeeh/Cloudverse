package com.cloudverse.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NoteRequest {
    @NotBlank
    private String topicId;
    @NotBlank
    private String content;
}
