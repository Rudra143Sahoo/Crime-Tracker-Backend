package com.nt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nt.model.CrimeCase;
import com.nt.repo.CrimeCaseRepo;

@RestController
@RequestMapping("/api/cases")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class CrimeCaseController {
	
	@Autowired
    private CrimeCaseRepo crimeCaseRepo;

//	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping
    public List<CrimeCase> getAllCases() {
        return crimeCaseRepo.findAll();
    }

//	@PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public CrimeCase addCrimeCase(@RequestBody CrimeCase crimeCase) {
        return crimeCaseRepo.save(crimeCase);
    }

//	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<CrimeCase> getCaseById(@PathVariable String id) {
        return crimeCaseRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
