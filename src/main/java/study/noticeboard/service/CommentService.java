package study.noticeboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import study.noticeboard.dto.SimpleCommentDto;
import study.noticeboard.entity.Comment;
import study.noticeboard.repository.CommentRepository;
import study.noticeboard.repository.PostRepository;
import study.noticeboard.repository.UserRepository;

import java.util.ArrayList;
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
    public List<SimpleCommentDto> getCommentsByPostAndPage(Long postId, int page, int size) {

        if (size <= 0) {
            size = 10;
        }

        List<Comment> commentList = commentRepository.findByPostAndPage(postId, page, size);

        return commentList.stream()
                .map(SimpleCommentDto::fromEntity)
                .toList();
    }
}
