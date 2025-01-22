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

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;

    private String content;

    private Long likes;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Comment(User user, Post post, String content, Long likes, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.user = user;
        this.post = post;
        this.content = content;
        this.likes = likes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    protected Comment() { }



    //==연관관계 메서드==//


}
