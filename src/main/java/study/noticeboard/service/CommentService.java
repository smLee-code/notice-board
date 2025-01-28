package study.noticeboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import study.noticeboard.dto.*;
import study.noticeboard.entity.Comment;
import study.noticeboard.entity.Post;
import study.noticeboard.entity.User;
import study.noticeboard.repository.CommentRepository;
import study.noticeboard.repository.PostRepository;
import study.noticeboard.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Transactional
    public void saveComment(SaveCommentRequestDto saveCommentRequestDto) {

        User user = userRepository.findByUserId(saveCommentRequestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        Post post = postRepository.findByPostId(saveCommentRequestDto.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 포스트입니다."));

        Comment comment = new Comment(
                user,
                post,
                saveCommentRequestDto.getContent(),
                0L,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        commentRepository.save(comment);
    }

    @Transactional
    public Long getCommentNumByPostId(Long postId) {
        return commentRepository.countCommentsByPostId(postId);
    }

    @Transactional
    public List<SimpleCommentDto> getCommentsByPostIdAndPage(Long postId, int page, int size) {
        if (size <= 0) {
            size = 10;
        }

        List<Comment> commentList = commentRepository.findCommentsByPostIdAndPage(postId, page, size);

        return commentList.stream()
                .map(SimpleCommentDto::fromEntity)
                .toList();
    }

    @Transactional
    public void deleteCommentById(Long commentId) {

        if (commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId);
        } else {
            throw new IllegalArgumentException("해당 id의 댓글이 존재하지 않습니다.");
        }
    }

    @Transactional
    public void updateComment(UpdateCommentRequestDto updateCommentRequestDto) {
        CommentDto commentDto = commentRepository.findDtoById(updateCommentRequestDto.getCommentId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 포스트입니다."));

        // 댓글 작성자 및 로그인 된 사용자 일치 여부 확인 절차 생략

        updateCommentRequestDto.setUpdatedAt(LocalDateTime.now());

        commentRepository.update(updateCommentRequestDto);
    }
}
