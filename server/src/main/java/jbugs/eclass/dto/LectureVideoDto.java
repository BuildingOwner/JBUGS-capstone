package jbugs.eclass.dto;

import jbugs.eclass.domain.VideoMaterial;
import lombok.Data;

@Data
public class LectureVideoDto {
    private Long videoId;

    private String title;
    private String videoName;
    private String videoPath;

    public static LectureVideoDto from(VideoMaterial videoMaterial){
        LectureVideoDto dto = new LectureVideoDto();
        dto.setVideoId(videoMaterial.getId());
        dto.setTitle(videoMaterial.getTitle());
        dto.setVideoName(videoMaterial.getVideoName());
        dto.setVideoPath(videoMaterial.getVideoPath());
        return dto;
    }
}
