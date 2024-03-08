package jbugs.eclass.api;//package jbugs.eclass.api;
//
//import jbugs.eclass.domain.Quiz;
//import jbugs.eclass.service.QuizService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/quizzes")
//@RequiredArgsConstructor
//public class QuizController {
//    private final QuizService quizService;
//
//    @PostMapping
//    public ResponseEntity<?> createQuiz(@RequestBody List<QuestionRequest> questionRequests,
//                                        @RequestParam String quizName,
//                                        @RequestParam LocalDateTime deadline) {
//        try {
//            // 퀴즈 정보를 받아와서 저장
//            Quiz quiz = new Quiz();
//            quiz.setQuizName(quizName);
//            quiz.setDeadline(deadline);
//            quiz.setCreatedAt(LocalDateTime.now());
//            quiz.setSubmissionStatus(false);
//
//            // 퀴즈 저장 로직 추가
//            quizService.saveQuiz(quiz);
//
//            // 객관식 문제와 주관식 문제를 생성
//            List<MultipleChoiceQuestion> multipleChoiceQuestions = new ArrayList<>();
//            List<ShortAnswerQuestion> shortAnswerQuestions = new ArrayList<>();
//            for (QuestionRequest questionRequest : questionRequests) {
//                String type = questionRequest.getType();
//                if ("multiple_choice".equals(type)) {
//                    MultipleChoiceQuestion multipleChoiceQuestion = new MultipleChoiceQuestion();
//                    multipleChoiceQuestion.setQuestion(questionRequest.getQuestion());
//                    multipleChoiceQuestion.setAnswer(questionRequest.getAnswer());
//
//                    List<Choice> choices = new ArrayList<>();
//                    for (String option : questionRequest.getOptions()) {
//                        Choice choice = new Choice();
//                        choice.setChoice(option);
//                        choice.setMultipleChoiceQuestion(multipleChoiceQuestion);
//                        choices.add(choice);
//                    }
//                    multipleChoiceQuestion.setChoices(choices);
//
//                    multipleChoiceQuestion.setQuiz(quiz);
//                    multipleChoiceQuestions.add(multipleChoiceQuestion);
//                } else if ("short_answer".equals(type)) {
//                    ShortAnswerQuestion shortAnswerQuestion = new ShortAnswerQuestion();
//                    shortAnswerQuestion.setQuestion(questionRequest.getQuestion());
//                    shortAnswerQuestion.setAnswer(questionRequest.getAnswer());
//
//                    shortAnswerQuestion.setQuiz(quiz);
//                    shortAnswerQuestions.add(shortAnswerQuestion);
//                }
//            }
//            quiz.setMultipleChoiceQuestions(multipleChoiceQuestions);
//            quiz.setShortAnswerQuestions(shortAnswerQuestions);
//
//            // 퀴즈 저장 로직 추가
//            quizService.saveQuiz(quiz);
//
//            return ResponseEntity.ok(quiz);
//        } catch (Exception ex) {
//            // 예외 처리
//            ex.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("퀴즈 생성 중에 오류가 발생했습니다.");
//        }
//    }
//
//
//
//
//
//
//}
