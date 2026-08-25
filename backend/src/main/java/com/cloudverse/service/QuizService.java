package com.cloudverse.service;

import com.cloudverse.common.exception.ResourceNotFoundException;
import com.cloudverse.dto.QuestionResult;
import com.cloudverse.dto.QuizResponse;
import com.cloudverse.dto.QuizResultResponse;
import com.cloudverse.dto.QuizSubmitRequest;
import com.cloudverse.model.Question;
import com.cloudverse.model.Quiz;
import com.cloudverse.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {
    private final QuizRepository repository;

    public QuizResponse getByTopic(String topicId) {
        Quiz quiz = repository.findByTopicId(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found for topic: " + topicId));
        return mapToResponse(quiz);
    }

    public QuizResultResponse submitQuiz(QuizSubmitRequest request) {
        Quiz quiz = repository.findById(request.getQuizId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found"));

        List<QuestionResult> results = new ArrayList<>();
        int score = 0;

        for (int i = 0; i < quiz.getQuestions().size(); i++) {
            Question q = quiz.getQuestions().get(i);
            int selected = (request.getAnswers() != null && request.getAnswers().size() > i) ? request.getAnswers().get(i) : -1;
            boolean isCorrect = (selected == q.getCorrectAnswerIndex());
            if (isCorrect) score++;

            results.add(QuestionResult.builder()
                    .questionText(q.getText())
                    .selectedAnswer(selected)
                    .correctAnswer(q.getCorrectAnswerIndex())
                    .isCorrect(isCorrect)
                    .explanation(q.getExplanation())
                    .build());
        }

        return QuizResultResponse.builder()
                .score(score)
                .totalQuestions(quiz.getQuestions().size())
                .percentage(quiz.getQuestions().isEmpty() ? 0 : (double) score / quiz.getQuestions().size() * 100)
                .questionResults(results)
                .build();
    }

    private QuizResponse mapToResponse(Quiz q) {
        QuizResponse r = new QuizResponse();
        r.setId(q.getId());
        r.setTopicId(q.getTopicId());
        r.setTechnologyId(q.getTechnologyId());
        r.setTitle(q.getTitle());
        r.setCreatedAt(q.getCreatedAt());
        r.setQuestions(q.getQuestions().stream().map(question -> {
            QuizResponse.QuestionResponse qr = new QuizResponse.QuestionResponse();
            qr.setText(question.getText());
            qr.setOptions(question.getOptions());
            return qr;
        }).collect(Collectors.toList()));
        return r;
    }
}
