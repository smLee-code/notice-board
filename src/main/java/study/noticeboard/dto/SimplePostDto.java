package study.noticeboard.dto;

import study.noticeboard.entity.Post;

public class SimplePostDto {

    private Long id;
    private String title;
    private String username;

    public SimplePostDto(Long id, String title, String username) {
        this.id = id;
        this.title = title;
        this.username = username;
    }

    public static SimplePostDto fromEntity(Post post) {
        return new SimplePostDto(post.getId(), post.getTitle(), post.getUser().getUsername());
    }

    // Getter
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getUsername() {
        return username;
    }
}
