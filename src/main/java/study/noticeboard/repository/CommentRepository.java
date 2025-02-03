package study.noticeboard.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import study.noticeboard.dto.CommentDto;
import study.noticeboard.dto.PostDto;
import study.noticeboard.dto.UpdateCommentRequestDto;
import study.noticeboard.entity.Comment;
import study.noticeboard.entity.Post;

import java.util.List;
import java.util.Optional;

@Repository
public class CommentRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(Comment comment) {
        em.persist(comment);
    }

    public Long countCommentsByPostId(Long postId) {
        return em.createQuery("SELECT count(c) FROM Comment c WHERE c.post.id = :postId", Long.class)
                .setParameter("postId", postId)
                .getSingleResult();
    }

    public List<Comment> findCommentsByPostIdAndPage(Long postId, int page, int size) {
        int offset = (page - 1) * size; // OFFSET 계산

        return em.createQuery("SELECT c FROM Comment c WHERE c.post.id = :postId ORDER BY c.id ASC", Comment.class)
                .setFirstResult(offset)
                .setMaxResults(size)
                .setParameter("postId", postId)
                .getResultList();
    }


    public boolean existsById(Long commentId) {
        Long count = em.createQuery(
                        "SELECT COUNT(c) FROM Comment c WHERE c.id = :id"
                        ,Long.class)
                .setParameter("id", commentId)
                .getSingleResult();

        return count > 0;
    }

    public void deleteById(Long commentId) {
        em.createQuery("DELETE FROM Comment c WHERE c.id = :id")
                .setParameter("id", commentId)
                .executeUpdate();
    }

    public Optional<CommentDto> findDtoById(Long id) {
        try {
            CommentDto findCommentDto = em.createQuery(
                            "SELECT new study.noticeboard.dto.CommentDto(c.id, u.id, p.id, c.content, c.likes, c.createdAt, c.updatedAt) " +
                            "FROM Comment c " +
                            "JOIN c.user u " +
                            "JOIN c.post p " +
                            "WHERE c.id = :id"
                            , CommentDto.class)
                    .setParameter("id", id)
                    .getSingleResult();
            return Optional.of(findCommentDto);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    public void update(UpdateCommentRequestDto updateCommentRequestDto) {
        em.createQuery("UPDATE Comment c " +
                        "SET c.content = :content, " +
                        "c.updatedAt = :updatedAt " +
                        "WHERE c.id = :commentId")
                .setParameter("content", updateCommentRequestDto.getContent())
                .setParameter("commentId", updateCommentRequestDto.getCommentId())
                .setParameter("updatedAt", updateCommentRequestDto.getUpdatedAt())
                .executeUpdate();
    }
}
