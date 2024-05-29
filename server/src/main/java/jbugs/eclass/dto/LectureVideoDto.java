package jbugs.eclass.dto;

import jbugs.eclass.domain.VideoMaterial;
import lombok.Data;

@Data
public class LectureVideoDto {
    private Long videoId;

    private String title;
    private String videoName;
    private String videoPath;
    private Long fileSize;
    private Long playbackTime = 0L;
    private int percent;
    private String videoLength;

//    private int weekNumber;

    public static LectureVideoDto from(VideoMaterial videoMaterial, Long playbackTime, int percent){
        LectureVideoDto dto = new LectureVideoDto();
        dto.setVideoId(videoMaterial.getId());
        dto.setTitle(videoMaterial.getTitle());
        dto.setVideoName(videoMaterial.getVideoName());
        dto.setVideoPath(videoMaterial.getVideoPath());
        dto.setFileSize(videoMaterial.getFileSize());
        dto.setPlaybackTime(playbackTime);
        dto.setPercent(percent);
        dto.setVideoLength(videoMaterial.getVideoLength());
        return dto;
    }
}
