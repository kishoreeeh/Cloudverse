package com.cloudverse.repository;

import com.cloudverse.model.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface QuizRepository extends MongoRepository<Quiz, String> {
    Optional<Quiz> findByTopicId(String topicId);
    List<Quiz> findByTechnologyId(String technologyId);
}
