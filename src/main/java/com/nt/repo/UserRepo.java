package com.nt.repo;

import com.nt.model.User;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, String> {
    User findByUsernameAndPassword(String username, String password);

    Optional<User> findByUsername(String username); // optional: for older compatibility
    Optional<User> findByEmail(String email); 
}

