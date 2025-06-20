package com.nt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.nt.model.UserFeedPost;
import com.nt.repo.UserFeedRepo;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;

@RestController
@RequestMapping("/api/userfeed")
//@CrossOrigin(origins = {"http://127.0.0.1:5500"}, allowCredentials = "true")
public class UserFeedController {

    @Autowired
    private UserFeedRepo userFeedRepo;

    private static final String UPLOAD_DIR = "uploads/";

    @GetMapping("/all")
    public ResponseEntity<?> getAllPosts() {
    	System.out.println("get all post submitted by user method is called");
        return ResponseEntity.ok(userFeedRepo.findAllByOrderBySubmittedAtDesc());
    }

    
    @PostMapping("/submit")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> submitCase(
            @RequestParam("caseTitle") String title,
            @RequestParam("caseDescription") String description,
            @RequestParam("caseLocation") String location,
            @RequestParam(value = "caseImage", required = false) MultipartFile image,
            Principal principal
    ) {
    	

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
        System.out.println("Logged-in user: " + principal.getName());


        String email = principal.getName(); // Get logged-in user's email/username

        UserFeedPost userFeed = new UserFeedPost();
        userFeed.setCaseTitle(title);
        userFeed.setCaseDescription(description);
        userFeed.setCaseLocation(location);
        userFeed.setSubmittedBy(email); // Corrected here

        if (image != null && !image.isEmpty()) {
            try {
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                userFeed.setImageUrl(filePath.toString());
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed.");
            }
        }

        userFeedRepo.save(userFeed);
        return ResponseEntity.ok("Crime case submitted successfully.");
    }
}







//package com.nt.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity; // For structured API responses
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.nt.model.UserFeedPost;
//import com.nt.repo.UserFeedRepo;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.nio.file.StandardCopyOption;
//import java.security.Principal;
//
//@RestController
//@RequestMapping("/api/userfeed")
//@CrossOrigin(origins = {"http://127.0.0.1:5500"}, allowCredentials = "true") // Ensure your frontend URL is correct
//public class UserFeedController {
//	@Autowired
//    private UserFeedRepo userFeedRepo;
//
//	 private static final String UPLOAD_DIR = "uploads/";
//
//	    @PostMapping("/submit")
//	    @PreAuthorize("isAuthenticated()")
//	    public ResponseEntity<String> submitCase(
//	        @RequestParam("caseTitle") String title,
//	        @RequestParam("caseDescription") String description,
//	        @RequestParam("caseLocation") String location,
//	        @RequestParam(value = "caseImage", required = false) MultipartFile image,
//	        Principal principal // ✅ Spring injects logged-in user here
//	    		) {
//	    		    if (principal == null) {
//	    		        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
//	    		    }
//
//	    		    String email = principal.getName(); // gets username (usually email)
//
//	        UserFeedPost userFeed = new UserFeedPost();
//	       userFeed.setCaseTitle(title);
//	        userFeed.setCaseDescription(description);
//	       userFeed.setCaseLocation(location);
//	        userFeed.setSubmittedBy(email);
//
//	        if (image != null && !image.isEmpty()) {
//	            try {
//	                Path uploadPath = Paths.get(UPLOAD_DIR);
//	                if (!Files.exists(uploadPath)) {
//	                    Files.createDirectories(uploadPath);
//	                }
//
//	                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
//	                Path filePath = uploadPath.resolve(fileName);
//	                Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//	               userFeed.setImageUrl(filePath.toString());
//	            } catch (IOException e) {
//	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed.");
//	            }
//	        }
//
//	        userFeedRepo.save(userFeed);
//	        return ResponseEntity.ok("Crime case submitted successfully.");
//	    }
//	}