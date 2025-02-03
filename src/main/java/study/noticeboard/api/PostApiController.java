package study.noticeboard.api;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import study.noticeboard.dto.PostDto;
import study.noticeboard.dto.SavePostRequestDto;
import study.noticeboard.dto.SimplePostDto;
import study.noticeboard.dto.UpdatePostRequestDto;
import study.noticeboard.entity.Post;
import study.noticeboard.service.PostService;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@CrossOrigin(origins = "http://localhost:3000")
public class PostApiController {

    private final PostService postService;

    public PostApiController(PostService postService) { this.postService = postService; }

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody SavePostRequestDto savePostRequestDto) {

        try {
            postService.savePost(savePostRequestDto);
            return ResponseEntity.ok("게시글이 성공적으로 저장되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/update")
    public ResponseEntity<String> update(@RequestBody UpdatePostRequestDto updatePostRequestDto) {

        try {
            postService.updatePost(updatePostRequestDto);
            return ResponseEntity.ok("게시글이 성공적으로 수정되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/retrieve")
    public List<SimplePostDto> retrievePostsByPage (
            @RequestParam int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        return postService.getPostsByPage(page, size);
    }

    @GetMapping("/{post_id}")
    public ResponseEntity<PostDto> retrievePostById(@PathVariable Long post_id) {
        try {
            PostDto postDto = postService.getPostById(post_id);
            return ResponseEntity.ok(postDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }


    @GetMapping("/maxpage")
    public Long getMaxPage() {
        Long postNum = postService.getPostNum();

        Long maxPage = postNum / 10;

        if (postNum % 10 > 0) {
            maxPage++;
        }

        return maxPage;
    }

    @DeleteMapping("/delete/{post_id}")
    public ResponseEntity<String> deletePostById(@PathVariable Long post_id) {

        try {
            postService.deletePostById(post_id);
            return ResponseEntity.ok("삭제 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
