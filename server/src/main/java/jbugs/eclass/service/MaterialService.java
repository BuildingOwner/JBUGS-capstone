package jbugs.eclass.service;

import jbugs.eclass.domain.Assignment;
import jbugs.eclass.domain.Material;
import jbugs.eclass.dto.FileDto;
import jbugs.eclass.repository.MaterialRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class MaterialService {
    private final MaterialRepository materialRepository;

    @Transactional
    public Long join(Material material) {

        materialRepository.save(material);
        return material.getId();
    }

    public List<Material> findMaterials(){
        return materialRepository.findAll();
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

    public void deleteMaterialsByAssignment(Assignment assignment) {
        List<Material> materials = materialRepository.findByAssignment(assignment);

        for (Material material : materials) {
            File file = new File(material.getFilePath());
            if (file.exists()) {
                if (!file.delete()) {
                    log.error("파일 삭제 실패: {}", material.getFilePath());
                }
            }
        }
        materialRepository.deleteAll(materials);
    }

    public List<FileDto> findMaterialsByWeekIdAndLectureId(Long weekId, Long lectureId) {
        List<Material> materials = materialRepository.findMaterialsByWeekIdAndLectureId(weekId, lectureId);

        List<FileDto> fileDtos = materials.stream().map(material -> {
            FileDto dto = new FileDto();
            dto.setFileId(material.getId());
            dto.setTitle(material.getTitle());
            dto.setFileName(material.getFileName());
            dto.setFilePath(material.getFilePath());

            return dto;
        }).collect(Collectors.toList());

        return fileDtos;
    }

}
