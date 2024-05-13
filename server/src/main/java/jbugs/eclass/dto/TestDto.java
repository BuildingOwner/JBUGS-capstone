package jbugs.eclass.dto;

import lombok.Data;

import java.util.List;

@Data
public class TestDto {
    private List<AssignmentDto> assignments;
    private List<QuizDto> quizDtoList;
    private List<LectureVideoDto> lectureVideos;
    private List<FileDto> classFiles;
}
