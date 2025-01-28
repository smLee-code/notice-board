package study.noticeboard.dto;

import java.time.LocalDateTime;

public class UpdateCommentRequestDto {

    private Long commentId;
    private String content;
    private LocalDateTime updatedAt;

    public UpdateCommentRequestDto(Long commentId, String content) {
        this.commentId = commentId;
        this.content = content;
    }

    public Long getCommentId() { return commentId; }

    public String getContent() { return content; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
