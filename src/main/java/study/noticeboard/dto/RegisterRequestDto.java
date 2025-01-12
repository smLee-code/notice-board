package study.noticeboard.dto;

public class RegisterRequestDto {

    private String loginId;
    private String password;
    private String username;
    private String email;

    public RegisterRequestDto(String loginId, String password, String username, String email) {
        this.loginId = loginId;
        this.password = password;
        this.username = username;
        this.email = email;
    }

    // Getter, Setter
    public String getLoginId() {
        return loginId;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }
}
