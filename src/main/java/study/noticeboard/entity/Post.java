package study.noticeboard.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.security.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
public class Post {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String title;

    private String content;

    private Long views;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Post(User user, String title, String content, Long views, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.user = user;
        this.title = title;
        this.content = content;
        this.views = views;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    protected Post() { }


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
