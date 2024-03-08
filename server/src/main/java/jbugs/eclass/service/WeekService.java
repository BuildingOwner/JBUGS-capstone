package jbugs.eclass.service;

import jbugs.eclass.domain.Week;
import jbugs.eclass.repository.WeekRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WeekService {
    private final WeekRepository weekRepository;

    @Transactional
    public Optional<Week> findWeekByLectureAndWeekNumber(Long lectureId, int weekNumber) {
        return weekRepository.findByLectureIdAndWeekNumber(lectureId, weekNumber);
    }

    @Transactional
    public void save(Week week){
        weekRepository.save(week);
    }

    public List<Week> findWeeks(){
        return weekRepository.findAll();
    }

    public Week findOne(Long weekId){
        return weekRepository.findOne(weekId);
    }

    public List<Long> findWeekIdsByLectureId(Long lectureId) {
        return weekRepository.findByLectureId(lectureId)
                .stream()
                .map(Week::getId)
                .collect(Collectors.toList());
    }


}
