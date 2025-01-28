package study.noticeboard.dto;

public class SavePostRequestDto {

    private Long userId;

    private String title;
    private String content;


    public SavePostRequestDto(Long userId, String title, String content) {
        this.userId = userId;
        this.title = title;
        this.content = content;
    }

    public Long getUserId() { return userId; }

    public String getTitle() { return title; }

    public String getContent() { return content; }

}
