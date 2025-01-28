package study.noticeboard.dto;

import java.time.LocalDateTime;

public class UpdatePostRequestDto {

    private Long postId;

    private String title;
    private String content;

    private Long userId;

    private LocalDateTime updatedAt;

    public UpdatePostRequestDto(Long postId, String title, String content, Long userId) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }

    public Long getPostId() {
        return postId;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public Long getUserId() {
        return userId;
    }

    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
