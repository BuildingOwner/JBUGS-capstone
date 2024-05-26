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
    public VideoPlaybackTime saveOrUpdatePlaybackTime(Long memberId, Long videoMaterialId, Long playbackTime, int percent) {
        Optional<VideoPlaybackTime> existingPlaybackTime = videoPlaybackTimeRepository.findByMemberIdAndVideoMaterialId(memberId, videoMaterialId);

        if (existingPlaybackTime.isPresent()) {
            VideoPlaybackTime videoPlaybackTime = existingPlaybackTime.get();
            boolean isUpdated = false;

            if (videoPlaybackTime.getPlaybackTime() < playbackTime) {
                videoPlaybackTime.setPlaybackTime(playbackTime);
                isUpdated = true;
            }

            if (videoPlaybackTime.getPercent() < percent) {
                videoPlaybackTime.setPercent(percent);
                isUpdated = true;
            }

            if (isUpdated) {
                return videoPlaybackTimeRepository.save(videoPlaybackTime); // 업데이트된 레코드 저장
            } else {
                return videoPlaybackTime;
            }
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
            videoPlaybackTime.setPercent(percent);

            return videoPlaybackTimeRepository.save(videoPlaybackTime); // 새 레코드 저장
        }
    }

    public Optional<VideoPlaybackTime> findByMemberIdAndVideoMaterialId(Long memberId, Long videoMaterialId) {
        return videoPlaybackTimeRepository.findByMemberIdAndVideoMaterialId(memberId, videoMaterialId);
    }

    public Long getOrCreatePlaybackTime(Long memberId, Long videoMaterialId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 Member가 없습니다. id=" + memberId));

        VideoMaterial videoMaterial = videoMaterialRepository.findById(videoMaterialId)
                .orElseThrow(() -> new IllegalArgumentException("해당 VideoMaterial이 없습니다. id=" + videoMaterialId));

        return videoPlaybackTimeRepository.findByMemberIdAndVideoMaterialId(memberId, videoMaterialId)
                .map(VideoPlaybackTime::getPlaybackTime)
                .orElseGet(() -> {
                    VideoPlaybackTime newPlaybackTime = new VideoPlaybackTime();
                    newPlaybackTime.setMember(member);
                    newPlaybackTime.setVideoMaterial(videoMaterial);
                    newPlaybackTime.setPlaybackTime(0L);
                    newPlaybackTime.setPercent(0);
                    videoPlaybackTimeRepository.save(newPlaybackTime);
                    return 0L;
                });
    }

    public VideoPlaybackTime getOrCreatePlaybackTimeAndPercent(Long memberId, Long videoMaterialId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 Member가 없습니다. id=" + memberId));

        VideoMaterial videoMaterial = videoMaterialRepository.findById(videoMaterialId)
                .orElseThrow(() -> new IllegalArgumentException("해당 VideoMaterial이 없습니다. id=" + videoMaterialId));

        return videoPlaybackTimeRepository.findByMemberIdAndVideoMaterialId(memberId, videoMaterialId)
                .orElseGet(() -> {
                    VideoPlaybackTime newPlaybackTime = new VideoPlaybackTime();
                    newPlaybackTime.setMember(member);
                    newPlaybackTime.setVideoMaterial(videoMaterial);
                    newPlaybackTime.setPlaybackTime(0L);
                    newPlaybackTime.setPercent(0);
                    return videoPlaybackTimeRepository.save(newPlaybackTime);
                });
    }
}