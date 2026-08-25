package com.cloudverse.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "topics")
public class Topic {
    @Id
    private String id;
    @Indexed
    private String technologyId;
    private String slug;
    private String title;
    private String overview;
    private String officialDocUrl;
    private List<VideoLink> videoLinks;
    private List<InterviewQuestion> interviewQuestions;
    private List<FlashCard> flashCards;
    private int displayOrder;
    private Instant createdAt;
}
