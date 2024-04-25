package jbugs.eclass.service;

import jbugs.eclass.domain.Lecture;
import jbugs.eclass.domain.Week;
import jbugs.eclass.repository.LectureRepository;
import jbugs.eclass.repository.WeekRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LectureService {
    private final LectureRepository lectureRepository;
    private final WeekRepository weekRepository;
    @Transactional
    public void saveLecture(Lecture lecture){
        for (int weekNumber = 1; weekNumber <= 16; weekNumber++) {
            Week week = new Week();
            week.setWeekNumber(weekNumber);
            week.setLecture(lecture);
            weekRepository.save(week);
        }
        lectureRepository.save(lecture);
    }

    public List<Lecture> findLectures(){
        return lectureRepository.findAll();
    }

    public Lecture findOne(Long lectureId){
        return lectureRepository.findOne(lectureId);
    }
}
