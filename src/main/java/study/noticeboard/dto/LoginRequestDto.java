package study.noticeboard.dto;

public class LoginRequestDto {

    private Long id;
    private String loginId;
    private String password;

    public LoginRequestDto(String loginId, String password) {
        this.loginId = loginId;
        this.password = password;
    }

    // Getter, Setter
    public Long getId() { return id; }

    public String getLoginId() {
        return loginId;
    }

    public String getPassword() {
        return password;
    }
}
