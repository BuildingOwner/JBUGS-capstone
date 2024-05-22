package jbugs.eclass.dto;

import lombok.Data;

import java.util.List;

@Data
public class WeeklyContentDto {
    private int week;
    private List<LectureVideoDto> lectureVideos;
    private List<FileDto> classFiles;
    private List<QuizDto> quizzes;
    private List<AssignmentDto> assignments;
}
