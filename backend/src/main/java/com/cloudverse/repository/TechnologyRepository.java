package com.cloudverse.repository;

import com.cloudverse.model.Technology;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface TechnologyRepository extends MongoRepository<Technology, String> {
    Optional<Technology> findBySlug(String slug);
    List<Technology> findAllByOrderByDisplayOrder();
}
