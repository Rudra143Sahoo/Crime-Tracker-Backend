package com.nt.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.nt.model.UserFeedPost;

public interface UserFeedRepo extends MongoRepository<UserFeedPost, String> {
	 List<UserFeedPost> findAllByOrderBySubmittedAtDesc();
}

