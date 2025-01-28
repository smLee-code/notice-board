package study.noticeboard.dto;

import study.noticeboard.entity.Comment;

import java.time.LocalDateTime;

public class CommentDto {

    private Long id;
    private Long userId;
    private Long postId;
    private String content;
    private Long likes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CommentDto(Long id, Long userId, Long postId, String content, Long likes, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
        this.likes = likes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static CommentDto fromEntity(Comment comment) {
        return new CommentDto(
                comment.getId(),
                comment.getUser().getId(),
                comment.getPost().getId(),
                comment.getContent(),
                comment.getLikes(),
                comment.getCreatedAt(),
                comment.getUpdatedAt()
        );
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public Long getPostId() { return postId; }
    public String getContent() { return content; }
    public Long getLikes() { return likes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
