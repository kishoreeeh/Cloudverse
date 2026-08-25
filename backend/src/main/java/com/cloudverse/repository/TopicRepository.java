package com.cloudverse.repository;

import com.cloudverse.model.Topic;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface TopicRepository extends MongoRepository<Topic, String> {
    List<Topic> findByTechnologyIdOrderByDisplayOrder(String technologyId);
    Optional<Topic> findByTechnologyIdAndSlug(String technologyId, String slug);
    List<Topic> findByTitleContainingIgnoreCase(String title);
}
