package study.noticeboard.dto;


import study.noticeboard.entity.Comment;

public class SimpleCommentDto {

    private Long id;
    private Long postId;
    private String content;
    private String username;


    public SimpleCommentDto(Long id, Long postId, String content, String username) {
        this.id = id;
        this.postId = postId;
        this.content = content;
        this.username = username;
    }

    public static SimpleCommentDto fromEntity(Comment comment) {
        return new SimpleCommentDto(comment.getId(), comment.getPost().getId(), comment.getContent(), comment.getUser().getUsername());
    }
}
