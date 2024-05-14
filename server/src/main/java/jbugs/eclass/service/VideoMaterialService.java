package jbugs.eclass.service;

import jbugs.eclass.domain.Assignment;
import jbugs.eclass.domain.Material;
import jbugs.eclass.domain.VideoMaterial;
import jbugs.eclass.dto.AssignmentDto;
import jbugs.eclass.dto.FileDto;
import jbugs.eclass.dto.LectureVideoDto;
import jbugs.eclass.repository.VideoMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class VideoMaterialService {
    private final VideoMaterialRepository videoMaterialRepository;

    public List<LectureVideoDto> findVideoMaterialsByWeekIdAndLectureId(Long weekId, Long lectureId) {
        List<VideoMaterial> videoMaterials = videoMaterialRepository.findVideoMaterialsByWeekIdAndLectureId(weekId, lectureId);

        // Assignment 엔티티 목록을 AssignmentDto 목록으로 변환
        List<LectureVideoDto> videoDtos = videoMaterials.stream().map(videoMaterial -> {
            LectureVideoDto dto = new LectureVideoDto();
            dto.setVideoId(videoMaterial.getId());
            dto.setTitle(videoMaterial.getTitle());
            dto.setVideoName(videoMaterial.getVideoName());
            dto.setVideoPath(videoMaterial.getVideoPath());
            dto.setFileSize(videoMaterial.getFileSize());
            return dto;
        }).collect(Collectors.toList());

        return videoDtos;
    }

    public List<LectureVideoDto> findVideoMaterialsByLecture(Long lectureId) {

        List<VideoMaterial> videoMaterials = videoMaterialRepository.findByLectureId(lectureId);

        List<LectureVideoDto> lectureVideoDtoList = videoMaterials.stream()
                .map(videoMaterial -> {
                    LectureVideoDto dto = new LectureVideoDto();
                    dto.setVideoId(videoMaterial.getId());
                    dto.setTitle(videoMaterial.getTitle());
                    dto.setVideoName(videoMaterial.getVideoName());
                    dto.setVideoPath(videoMaterial.getVideoPath());
                    dto.setFileSize(videoMaterial.getFileSize());
//                    dto.setWeekNumber(videoMaterial.getWeek().getWeekNumber());

                    return dto;
                }).collect(Collectors.toList());
        return lectureVideoDtoList;
    }
}
