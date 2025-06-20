package com.nt.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("user_feed")
public class UserFeedPost {
    @Id

    private String id;
    private String caseTitle;
    private String caseDescription;
    private String caseLocation;
    private String imageUrl; // optional, stores file path or URL
    private String submittedBy; // email or userId
    private LocalDateTime submittedAt = LocalDateTime.now();
}

