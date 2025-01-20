package study.noticeboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import study.noticeboard.dto.PostDto;
import study.noticeboard.dto.SavePostRequestDto;
import study.noticeboard.dto.SimplePostDto;
import study.noticeboard.dto.UpdatePostRequestDto;
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
    public void savePost(SavePostRequestDto savePostRequestDto) {

        User user = userRepository.findByUserId(savePostRequestDto.getId())
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
    }

    @Transactional
    public void updatePost(UpdatePostRequestDto updatePostRequestDto) {

        PostDto findPostDto = postRepository.findById(updatePostRequestDto.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 포스트입니다."));

        // 게시글 작성자와 현재 로그인된 사용자가 같은지 확인
        if (!findPostDto.getUserId().equals(updatePostRequestDto.getUserId())) {
            throw new IllegalStateException("게시글 수정 권한은 작성자에게만 있습니다. (작성자와 현재 사용자가 일치하지 않습니다.)");
        }

        postRepository.update(updatePostRequestDto);
    }

    public PostDto getPostById(Long postId) {
        try {
            return postRepository.findById(postId).get();
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

    @Transactional
    public void deletePostById(Long postId) {

        if (postRepository.existsById(postId)) {
            postRepository.deleteById(postId);
        } else {
            throw new IllegalArgumentException("해당 id의 포스트가 존재하지 않습니다.");
        }
    }


}
