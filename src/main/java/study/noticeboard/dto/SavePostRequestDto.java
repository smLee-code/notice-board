package study.noticeboard.dto;

public class SavePostRequestDto {

    private String title;
    private String content;

    private String loginId;

    public SavePostRequestDto(String title, String content, String loginId) {
        this.title = title;
        this.content = content;
        this.loginId = loginId;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getLoginId() {
        return loginId;
    }
}
