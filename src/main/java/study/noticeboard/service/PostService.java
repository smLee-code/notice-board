package study.noticeboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import study.noticeboard.dto.PostDto;
import study.noticeboard.dto.SavePostRequestDto;
import study.noticeboard.dto.SimplePostDto;
import study.noticeboard.entity.Post;
import study.noticeboard.entity.User;
import study.noticeboard.repository.PostRepository;
import study.noticeboard.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;


    @Transactional
    public Long savePost(SavePostRequestDto savePostRequestDto) {

        User user = userRepository.findByLoginId(savePostRequestDto.getLoginId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        Post post = new Post(
                user,
                savePostRequestDto.getTitle(),
                savePostRequestDto.getContent(),
                0L,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        postRepository.save(post);
        return post.getId();
    }

    public PostDto getPostById(Long postId) {
        try {
            return postRepository.findById(postId);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("해당 게시글을 찾을 수 없습니다.");
        }
    }

    public List<SimplePostDto> getPostsByPage(int page, int size) {

        if (size <= 0) {
            size = 10;
        }

        List<Post> postList = postRepository.findByPage(page, size);

        return postList.stream()
                .map(SimplePostDto::fromEntity)
                .toList();
    }

    public Long getPostNum() {
        return postRepository.countAll();
    }
}
