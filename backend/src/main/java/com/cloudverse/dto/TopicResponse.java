package com.cloudverse.dto;

import com.cloudverse.model.FlashCard;
import com.cloudverse.model.InterviewQuestion;
import com.cloudverse.model.VideoLink;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class TopicResponse {
    private String id;
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
