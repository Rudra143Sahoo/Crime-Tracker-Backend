package com.nt.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.nt.model.CrimeCase;

@Repository
public interface CrimeCaseRepo extends MongoRepository<CrimeCase, String> {
}
