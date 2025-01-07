package study.noticeboard.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.security.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
public class Post {

    @Id @GeneratedValue
    @Column(name = "post_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String title;

    private String content;

    private Long views;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    // Setter
    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setViews(Long views) {
        this.views = views;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    //==연관관계 메서드==//


}
