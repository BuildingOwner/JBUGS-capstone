package jbugs.eclass.service;

import jbugs.eclass.domain.Material;
import jbugs.eclass.repository.MaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MaterialService {
    private final MaterialRepository materialRepository;

    //회원가입
    @Transactional
    public Long join(Material material) {

        materialRepository.save(material);
        return material.getId();
    }

    public List<Material> findMaterials(){
        return materialRepository.findAll();
    }

    public Material findOne(Long materialId){
        return materialRepository.findOne(materialId);
    }

    public List<Material> findMaterialsByWeekIds(List<Long> weekIds) {
        return materialRepository.findByWeekIds(weekIds);
    }

    public List<Material> findByWeekId(Long weekId) {
        return materialRepository.findByWeekId(weekId);
    }

    public Resource loadMaterialResource(Material material) {
        Resource resource = new ClassPathResource(material.getFilePath());
        if (resource.exists() && resource.isReadable()) {
            return resource;
        } else {
            // 파일이 존재하지 않거나 읽을 수 없는 경우, 적절한 예외 처리를 수행하거나 오류 페이지로 리다이렉트할 수 있습니다.
            throw new RuntimeException("Material 파일을 로드할 수 없습니다.");
        }
    }
}
