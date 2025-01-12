package study.noticeboard.dto;

import study.noticeboard.entity.Post;

import java.time.LocalDateTime;

public class PostDto {

    private Long id;
    private Long user_id;
    private String title;
    private String content;
    private Long views;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PostDto(Long id, Long user_id, String title, String content, Long views, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.content = content;
        this.views = views;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    protected PostDto() {}

    public static PostDto fromEntity(Post post) {
        return new PostDto(
                post.getId(),
                post.getUser().getId(),
                post.getTitle(),
                post.getContent(),
                post.getViews(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
    }

    // Getter
    public Long getId() { return id; }

    public Long getUser_id() { return user_id; }

    public String getTitle() { return title; }

    public String getContent() { return content; }

    public Long getViews() { return views; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
