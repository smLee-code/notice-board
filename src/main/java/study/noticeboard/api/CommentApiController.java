package study.noticeboard.api;

import org.springframework.web.bind.annotation.*;
import study.noticeboard.dto.SimpleCommentDto;
import study.noticeboard.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentApiController {

    private final CommentService commentService;

    public CommentApiController(CommentService commentService) { this.commentService = commentService; }

    @GetMapping("/retrieve")
    public List<SimpleCommentDto> retrieveCommentsByPage(
            @RequestParam Long postId,
            @RequestParam int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        return commentService.getCommentsByPostAndPage(postId, page, size);
    }

}
