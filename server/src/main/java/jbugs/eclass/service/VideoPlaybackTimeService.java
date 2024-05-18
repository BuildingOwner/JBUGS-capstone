package jbugs.eclass.service;

import jbugs.eclass.domain.Member;
import jbugs.eclass.domain.VideoMaterial;
import jbugs.eclass.domain.VideoPlaybackTime;
import jbugs.eclass.repository.MemberRepository;
import jbugs.eclass.repository.VideoMaterialRepository;
import jbugs.eclass.repository.VideoPlaybackTimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
@Service
@RequiredArgsConstructor
public class VideoPlaybackTimeService {

    private final VideoPlaybackTimeRepository videoPlaybackTimeRepository;
    private final MemberRepository memberRepository;
    private final VideoMaterialRepository videoMaterialRepository;

    @Transactional
    public VideoPlaybackTime saveOrUpdatePlaybackTime(Long memberId, Long videoMaterialId, Long playbackTime) {
        Optional<VideoPlaybackTime> existingPlaybackTime = videoPlaybackTimeRepository.findByMemberIdAndVideoMaterialId(memberId, videoMaterialId);

        if (existingPlaybackTime.isPresent()) {
            VideoPlaybackTime videoPlaybackTime = existingPlaybackTime.get();
            videoPlaybackTime.setPlaybackTime(playbackTime); // 기존 시청 시간을 업데이트
            return videoPlaybackTimeRepository.save(videoPlaybackTime); // 업데이트된 레코드 저장
        } else {
            // 새로운 VideoPlaybackTime 생성 로직
            Member member = memberRepository.findById(memberId)
                    .orElseThrow(() -> new IllegalArgumentException("해당 Member가 없습니다. id=" + memberId));

            VideoMaterial videoMaterial = videoMaterialRepository.findById(videoMaterialId)
                    .orElseThrow(() -> new IllegalArgumentException("해당 VideoMaterial이 없습니다. id=" + videoMaterialId));

            VideoPlaybackTime videoPlaybackTime = new VideoPlaybackTime();
            videoPlaybackTime.setMember(member);
            videoPlaybackTime.setVideoMaterial(videoMaterial);
            videoPlaybackTime.setPlaybackTime(playbackTime);

            return videoPlaybackTimeRepository.save(videoPlaybackTime); // 새 레코드 저장
        }
    }

    public Optional<VideoPlaybackTime> findByMemberIdAndVideoMaterialId(Long memberId, Long videoMaterialId) {
        return videoPlaybackTimeRepository.findByMemberIdAndVideoMaterialId(memberId, videoMaterialId);
    }

}