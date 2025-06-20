package com.nt.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.nt.model.Like;

public interface LikeRepository extends MongoRepository<Like, String> {
    Optional<Like> findByPostIdAndUserId(String postId, String userId);
    long countByPostId(String postId);
}
