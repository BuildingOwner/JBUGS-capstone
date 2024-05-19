package jbugs.eclass.dto;

import lombok.Data;

@Data
public class VideoPlaybackTimeRequestDto {
    private Long memberId;
    private Long videoMaterialId;
    private Long playbackTime;
}
