package jbugs.eclass.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jbugs.eclass.domain.Material;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MaterialRepository {
    @PersistenceContext
    private final EntityManager em;


    public Material save(Material material) {
        em.persist(material);
        return material;
    }

    public Material findOne(Long id){
        return em.find(Material.class, id);
    }

    public List<Material> findAll(){
        return em.createQuery("select m from Material m", Material.class)
                .getResultList();
    }

    public List<Material> findByWeekIds(List<Long> weekIds) {
        return em.createQuery("SELECT m FROM Material m WHERE m.week.id IN :weekIds", Material.class)
                .setParameter("weekIds", weekIds)
                .getResultList();
    }

    public List<Material> findByWeekId(Long weekId) {
        return em.createQuery("SELECT m FROM Material m WHERE m.week.id = :weekId", Material.class)
                .setParameter("weekId", weekId)
                .getResultList();
    }
}
