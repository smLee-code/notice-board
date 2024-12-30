package study.noticeboard.entity;


import jakarta.persistence.*;
import lombok.Getter;

import java.security.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
public class Comment {


    @Id @GeneratedValue
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Post post;

    private String content;

    private Long likes;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    // Setter
    public void setContent(String content) {
        this.content = content;
    }

    public void setLikes(Long likes) {
        this.likes = likes;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    //==연관관계 메서드==//


}
