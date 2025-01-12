package study.noticeboard.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import study.noticeboard.dto.PostDto;
import study.noticeboard.entity.Post;

import java.util.List;

@Repository
public class PostRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(Post post) {
        em.persist(post);
    }

    public void delete(Post post) {
        em.remove(post);
    }

    public List<Post> findAll() {
        return em.createQuery("select p from Post p", Post.class).getResultList();
    }

    public List<Post> findByPage(int page, int size) {

        int offset = (page - 1) * size; // OFFSET 계산

        return em.createQuery("SELECT p FROM Post p ORDER BY p.id ASC", Post.class)
                .setFirstResult(offset) // OFFSET
                .setMaxResults(size)   // LIMIT
                .getResultList();
    }

    public PostDto findById(Long id) {
        return em.createQuery(
                "SELECT new study.noticeboard.dto.PostDto(p.id, u.username, p.title, p.content, p.views, p.createdAt, p.updatedAt) " +
                "FROM Post p " +
                "JOIN p.user u " +
                "WHERE p.id = :id"
                ,PostDto.class)
                .setParameter("id", id)
                .getSingleResult();
    }

    public Long countAll() {
        return em.createQuery("select count(p) from Post p", Long.class)
                .getSingleResult();
    }
}
