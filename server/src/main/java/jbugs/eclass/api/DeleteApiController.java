package jbugs.eclass.api;

import jbugs.eclass.repository.MaterialRepository;
import jbugs.eclass.repository.QuizRepository;
import jbugs.eclass.repository.VideoMaterialRepository;
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
}
