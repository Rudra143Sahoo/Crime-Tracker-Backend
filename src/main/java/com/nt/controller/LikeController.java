package com.nt.controller;

import com.nt.model.Like;
import com.nt.repo.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/likes")
@CrossOrigin(origins = {"http://127.0.0.1:5500"})
public class LikeController {

    @Autowired
    private LikeRepository likeRepo;

    // ✅ Like or Unlike a Post
    @PostMapping("/{postId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<String> likeOrUnlikePost(
            @PathVariable String postId,
            @RequestParam String userId
    ) {
        Optional<Like> existing = likeRepo.findByPostIdAndUserId(postId, userId);
        if (existing.isPresent()) {
            likeRepo.delete(existing.get());
            return ResponseEntity.ok("Post unliked");
        } else {
            Like like = new Like(null, postId, userId, LocalDateTime.now());
            likeRepo.save(like);
            return ResponseEntity.ok("Post liked");
        }
    }

    // ✅ Like Count
    @GetMapping("/{postId}/count")
    public ResponseEntity<Long> getLikeCount(@PathVariable String postId) {
        return ResponseEntity.ok(likeRepo.countByPostId(postId));
    }
}

