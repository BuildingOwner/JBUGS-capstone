package jbugs.eclass.api;

import jbugs.eclass.dto.AnswerRequestDto;
import jbugs.eclass.service.AnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/answers")
public class AnswerApiController {
    private final AnswerService answerService;

    @PostMapping
    public ResponseEntity<?> submitAnswers(@RequestBody AnswerRequestDto answerRequestDTO) {
        try {
            answerService.saveAnswers(answerRequestDTO);
            return ResponseEntity.ok().body("정답이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
