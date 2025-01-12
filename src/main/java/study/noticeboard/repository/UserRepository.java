package study.noticeboard.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import study.noticeboard.entity.User;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(User user) {

        em.persist(user);
    }

    public void delete(User user) {

        em.remove(user);
    }

    public Optional<User> findByUserId(Long userId) {

        try {
            User findUser = em.createQuery("select u from User u where u.id = :id", User.class)
                    .setParameter("id", userId)
                    .getSingleResult();
            return Optional.of(findUser);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    public List<User> findAll() {

        return em.createQuery("select u from User u", User.class)
                .getResultList();
    }

    public Optional<User> findByLoginId(String loginId) {

        try {
            User findUser = em.createQuery("select u from User u where u.loginId = :loginId", User.class)
                    .setParameter("loginId", loginId)
                    .getSingleResult();

            return Optional.of(findUser);
        } catch (NoResultException e) {
            return Optional.empty();
        }

    }

    public Optional<User> findByName(String name) {

        try {
            User findUser = em.createQuery("select u from User u where u.username = :username", User.class)
                    .setParameter("username", name)
                    .getSingleResult();

            return Optional.of(findUser);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    public Optional<User> findByEmail(String email) {

        try {
            User findUser = em.createQuery("select u from User u where u.email = :email", User.class)
                    .setParameter("email", email)
                    .getSingleResult();

            return Optional.of(findUser);
        } catch (NoResultException e) {
            return Optional.empty();
        }


    }

}
