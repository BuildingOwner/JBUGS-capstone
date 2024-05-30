package jbugs.eclass.api;

import jbugs.eclass.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api")
public class DeleteApiController {

    private final MaterialRepository materialRepository;
    private final VideoMaterialRepository videoMaterialRepository;
    private final QuizRepository quizRepository;
    private final QnARepository qnARepository;
    private final AssignmentRepository assignmentRepository;
    private final NoticeRepository noticeRepository;

    @DeleteMapping("/material/{materialId}")
    public ResponseEntity<?> deleteMaterial(@PathVariable Long materialId) {
        materialRepository.deleteById(materialId);
        return ResponseEntity.ok().body("Material with id: " + materialId + " was deleted successfully.");
    }

    @DeleteMapping("/videoMaterial/{videoMaterialId}")
    public ResponseEntity<?> deleteVideoMaterial(@PathVariable Long videoMaterialId) {
        videoMaterialRepository.deleteById(videoMaterialId);
        return ResponseEntity.ok().body("VideoMaterial with id: " + videoMaterialId + " was deleted successfully.");
    }

    @DeleteMapping("/quiz/{quizId}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long quizId) {
        quizRepository.deleteById(quizId);
        return ResponseEntity.ok().body("Quiz with id: " + quizId + " was deleted successfully.");
    }

    @DeleteMapping("/notice/{noticeId}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long noticeId) {
        noticeRepository.deleteById(noticeId);
        return ResponseEntity.ok().body("Notice with id: " + noticeId + " was deleted successfully.");
    }

    @DeleteMapping("/qna/{qnaId}")
    public ResponseEntity<?> deleteQna(@PathVariable Long qnaId){
        qnARepository.deleteById(qnaId);
        return ResponseEntity.ok().body("Qna with id: " + qnaId + " was deleted successfully.");
    }

    @DeleteMapping("/assignment/{assignmentId}")
    public ResponseEntity<?> deleteAssignment(@PathVariable Long assignmentId){
        assignmentRepository.deleteById(assignmentId);
        return ResponseEntity.ok().body("Assignment with id: " + assignmentId + " was deleted successfully.");
    }
}
