package study.noticeboard.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import study.noticeboard.dto.RegisterRequestDto;
import study.noticeboard.entity.User;
import study.noticeboard.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * 회원가입
     */
    @Transactional
    public Long join(User user) {

        CheckDuplicatedData(user);

        userRepository.save(user);
        return user.getId();
    }

    private void CheckDuplicatedData(User user) {

        if(userRepository.findByLoginId(user.getLoginId()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        if(userRepository.findByName(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }
    }

    /**
     * 로그인
     */
    public User login(String loginId, String password) {

        User user = userRepository.findByLoginId(loginId).get();

        if (user == null || !user.getPassword().equals(password)) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        return user;
    }

    public List<User> findUsers() {
        return userRepository.findAll();
    }

    public User findOne(Long userId) {
        return userRepository.findByUserId(userId).get();
    }

    public boolean authenticate(String loginId, String password) {

        User user = userRepository.findByLoginId(loginId).get();
        return user != null && user.getPassword().equals(password);
    }
}
