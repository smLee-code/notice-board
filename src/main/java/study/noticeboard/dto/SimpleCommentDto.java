package study.noticeboard.dto;

import study.noticeboard.entity.Comment;

import java.time.LocalDateTime;

public class SimpleCommentDto {

    private Long id;
    private String content;

    private Long userId;
    private String username;

    public SimpleCommentDto(Long id, String content, Long userId, String username) {
        this.id = id;
        this.content = content;
        this.userId = userId;
        this.username = username;
    }

    public static SimpleCommentDto fromEntity(Comment comment) {
        return new SimpleCommentDto(
                comment.getId(),
                comment.getContent(),
                comment.getUser().getId(),
                comment.getUser().getUsername()
        );
    }

    public Long getId() { return id; }

    public String getContent() { return content; }

    public Long getUserId() { return userId; }

    public String getUsername() { return username; }
}

