package jbugs.eclass.api;

import jbugs.eclass.repository.MaterialRepository;
import jbugs.eclass.repository.QuizRepository;
import jbugs.eclass.repository.VideoMaterialRepository;
import jbugs.eclass.service.QuizService;
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

    @DeleteMapping("/material")
    public ResponseEntity<?> deleteMaterial(@RequestBody Long materialId) {
        materialRepository.deleteById(materialId);
        return ResponseEntity.ok().body("Material with id: " + materialId + " were deleted successfully.");
    }

    @DeleteMapping("/videoMaterial")
    public ResponseEntity<?> deleteVideoMaterial(@RequestBody Long videoMaterialId) {
        videoMaterialRepository.deleteById(videoMaterialId);
        // 성공 응답 반환
        return ResponseEntity.ok().body("VideoMaterial with id: " + videoMaterialId + " were deleted successfully.");
    }

    @DeleteMapping("/quiz")
    public ResponseEntity<?> deleteQuiz(@RequestBody Long quizId) {
        quizRepository.deleteById(quizId);
        return ResponseEntity.ok().body("Quiz with id: " + quizId + " was deleted successfully.");
    }

}
