package com.cloudverse.repository;

import com.cloudverse.model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface NoteRepository extends MongoRepository<Note, String> {
    Optional<Note> findByTopicId(String topicId);
}
