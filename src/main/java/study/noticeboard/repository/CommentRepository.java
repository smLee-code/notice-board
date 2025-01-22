package study.noticeboard.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import study.noticeboard.entity.Comment;
import study.noticeboard.entity.Post;

import java.util.List;

@Repository
public class CommentRepository {

    @PersistenceContext
    private EntityManager em;

    public List<Comment> findByPostAndPage(Long postId, int page, int size) {

        int offset = (page - 1) * size; // OFFSET 계산

        return em.createQuery("SELECT c FROM Comment c WHERE c.post.id = :postId ORDER BY c.id ASC ", Comment.class)
                .setFirstResult(offset) // OFFSET
                .setMaxResults(size)   // LIMIT
                .setParameter("postId", postId)
                .getResultList();
    }
}
