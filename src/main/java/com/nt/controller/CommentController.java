package com.nt.controller;

import com.nt.model.Comment;
import com.nt.repo.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = {"http://127.0.0.1:5500"})
public class CommentController {

    @Autowired
    private CommentRepository commentRepo;

    // ✅ Add comment to post
    @PostMapping("/{postId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Comment> addComment(
            @PathVariable String postId,
            @RequestBody Comment comment
    ) {
        comment.setPostId(postId);
        comment.setCommentedAt(LocalDateTime.now());
        return ResponseEntity.ok(commentRepo.save(comment));
    }

    // ✅ Get comments by post
    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable String postId) {
        return ResponseEntity.ok(commentRepo.findByPostIdOrderByCommentedAtDesc(postId));
    }
}

