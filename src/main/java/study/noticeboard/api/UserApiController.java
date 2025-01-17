package study.noticeboard.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import study.noticeboard.dto.LoginRequestDto;
import study.noticeboard.dto.RegisterRequestDto;
import study.noticeboard.entity.User;
import study.noticeboard.service.UserService;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserApiController {

    private final UserService userService;

    public UserApiController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDto registerRequestDto) {

        // System.out.println("Register Data: " + registerRequestDto);

        if (registerRequestDto.getLoginId() == null
                || registerRequestDto.getPassword() == null
                || registerRequestDto.getUsername() == null
                || registerRequestDto.getEmail() == null) {
            throw new IllegalArgumentException("필수 필드가 누락되었습니다.");
        }

        User user = new User();
        user.setLoginId(registerRequestDto.getLoginId());
        user.setPassword(registerRequestDto.getPassword());
        user.setUsername(registerRequestDto.getUsername());
        user.setEmail(registerRequestDto.getEmail());

        Long userId = userService.join(user);
        return ResponseEntity.ok("회원가입 성공!");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequestDto loginRequestDto) {

        try {

            User user = userService.login(
                    loginRequestDto.getLoginId(),
                    loginRequestDto.getPassword()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("loginId", user.getLoginId());
            response.put("username", user.getUsername());

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {

            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    /*
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {

        User user = userService.findOne(id);

        if (user != null) {
            return ResponseEntity.ok(user); // 200 Ok
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
        }
    }
    */
}
