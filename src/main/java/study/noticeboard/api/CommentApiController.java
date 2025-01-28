package study.noticeboard.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import study.noticeboard.dto.SaveCommentRequestDto;
import study.noticeboard.dto.SimpleCommentDto;
import study.noticeboard.dto.UpdateCommentRequestDto;
import study.noticeboard.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentApiController {

    private final CommentService commentService;

    public CommentApiController(CommentService commentService) { this.commentService = commentService; }

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody SaveCommentRequestDto saveCommentRequestDto) {

        try {
            commentService.saveComment(saveCommentRequestDto);
            return ResponseEntity.ok("댓글이 성공적으로 저장되었습니다.");
        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body("Illegal argument Exception 발생!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 저장 중 문제가 발생했습니다.");
        }
    }

    @GetMapping("/maxpage")
    public Long getMaxPageByPostId(@RequestParam Long postId) {
        Long commentNum = commentService.getCommentNumByPostId(postId);

        Long maxPage = commentNum / 10;

        if (commentNum % 10 > 0) {
            maxPage++;
        }

        return maxPage;
    }

    @GetMapping("/retrieve")
    public List<SimpleCommentDto> retrieveCommentsByPostIdAndPage(
            @RequestParam Long postId,
            @RequestParam int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        return commentService.getCommentsByPostIdAndPage(postId, page, size);
    }

    @DeleteMapping("/delete/{comment_id}")
    public ResponseEntity<String> delete(@PathVariable Long comment_id) {
        try {
            commentService.deleteCommentById(comment_id);
            return ResponseEntity.ok("삭제 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/update")
    public ResponseEntity<String> update(@RequestBody UpdateCommentRequestDto updateCommentRequestDto) {
        try {
            commentService.updateComment(updateCommentRequestDto);
            return ResponseEntity.ok("댓글 수정 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
