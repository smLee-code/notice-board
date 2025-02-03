package study.noticeboard.dto;

public class SaveCommentRequestDto {

    private Long postId;
    private Long userId;
    private String content;

    public SaveCommentRequestDto(Long postId, Long userId, String content) {
        this.postId = postId;
        this.userId = userId;
        this.content = content;
    }

    public Long getPostId() { return postId; }

    public Long getUserId() { return userId; }

    public String getContent() { return content; }
}
