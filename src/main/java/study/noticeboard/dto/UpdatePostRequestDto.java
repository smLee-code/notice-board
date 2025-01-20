package study.noticeboard.dto;

public class UpdatePostRequestDto {

    private Long postId;

    private String title;
    private String content;

    private Long userId;

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
}
