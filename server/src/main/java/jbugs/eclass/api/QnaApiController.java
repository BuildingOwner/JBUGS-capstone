package jbugs.eclass.api;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.EnrollmentRepository;
import jbugs.eclass.repository.MaterialRepository;
import jbugs.eclass.repository.QnARepository;
import jbugs.eclass.service.MaterialService;
import jbugs.eclass.service.WeekService;
import jbugs.eclass.session.SessionConst;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/course")
public class QnaApiController {
    private final WeekService weekService;
    private final EnrollmentRepository enrollmentRepository;
    private final QnARepository qnARepository;
    private final MaterialService materialService;
    private final MaterialRepository materialRepository;

    @Value("${file.dir}")
    private String fileDir;

    @GetMapping("/{enrollmentId}/qna")
    public ResponseEntity<?> getCourseInfo(@PathVariable Long enrollmentId, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            QnAContentDto qnAContentDto = new QnAContentDto();
            MemberInfoDto memberInfoDto = new MemberInfoDto();
            memberInfoDto.setMemberId(loginMember.getId());
            memberInfoDto.setMemberName(loginMember.getName());
            memberInfoDto.setMemberType(loginMember.getMemberType());
            if (loginMember.getMemberType() == MemberType.STUDENT) {
                memberInfoDto.setFirstTrack(loginMember.getStudent().getFirstTrack());
                memberInfoDto.setStudentId(loginMember.getStudent().getId());
            }
            qnAContentDto.setMemberInfoDto(memberInfoDto);

            Enrollment enrollment = enrollmentRepository.findOne(enrollmentId);

            CourseDto courseDto = new CourseDto();
            courseDto.setLectureName(enrollment.getLecture().getName());
            courseDto.setDivision(enrollment.getLecture().getDivision());
            courseDto.setProfessorName(enrollment.getLecture().getProfessor().getMember().getName());
            qnAContentDto.setCourseDto(courseDto);

            //enrollmentId에 해당하는 각 주차id가져오기
            Lecture lectureId = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);

            List<QnA> qnAList = qnARepository.findQnAsByLecture(lectureId);

            List<QnADto> qnADtoList = qnAList.stream().map(qna -> {
                List<Material> materials = materialRepository.findByQnaId(qna.getId()); // QnA ID에 해당하는 Material 조회
                return QnADto.from(qna, materials); // Material 정보를 포함하여 QnADto 생성
            }).collect(Collectors.toList());
            qnAContentDto.setQnADtoList(qnADtoList);

            return ResponseEntity.ok(qnAContentDto);
        }
        else {
            // 세션이 없거나 로그인 되어있지 않은 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }

    // 학생 Q&A 질문하기
    @PostMapping("/{enrollmentId}/qna/create")
    public ResponseEntity<?> createQnA(@PathVariable Long enrollmentId,
                                       @RequestParam("title") String title,
                                       @RequestParam("description") String description,
                                       @RequestParam("secret") boolean secret,
                                       @RequestParam(value = "attachFiles", required = false) MultipartFile[] attachFiles,
                                       HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            QnA qna = new QnA();
            qna.setTitle(title);
            qna.setContent(description);
            qna.setCreatedAt(LocalDateTime.now());
            qna.setWriter(loginMember.getName());
            qna.setQnaStatus(QnAStatus.RESPONSE_EXPECTED);
            qna.setLecture(enrollmentRepository.findLectureByEnrollmentId(enrollmentId));
            qna.setSecret(secret);
            qnARepository.save(qna); // QnA 정보 저장

            log.info(Arrays.toString(attachFiles));
            // 파일 저장
            if (attachFiles != null && attachFiles.length > 0) {
                for (MultipartFile file : attachFiles) {
                    if (!file.isEmpty()) {
                        String originalFileName = file.getOriginalFilename();
                        String safeFileName = UUID.randomUUID().toString() + "_" + originalFileName; // 예시로 UUID 추가

                        String currentDirectory = System.getProperty("user.dir");
                        if(currentDirectory.indexOf("JBUGS-capstone") == -1){
                            currentDirectory += "/JBUGS-capstone/server/";
                        }
                        String fullPath = currentDirectory + fileDir + originalFileName;
                        long fileSize = file.getSize();

                        log.info("{} 저장 fullPath={}", "파일", fullPath);
                        file.transferTo(new File(fullPath));

                        Material material = new Material();
                        material.setFilePath(fullPath);
                        material.setFileName(file.getOriginalFilename());
                        material.setFileSize(fileSize);
                        material.setQna(qna); // QnA 정보 설정
                        materialService.join(material); // 파일 정보 저장
                    }
                }
            }

            return ResponseEntity.ok().body("QnA가 성공적으로 작성되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }

    @PostMapping("/qna/{qnaId}/comment")
    public ResponseEntity<?> answerQnA(@PathVariable Long qnaId,
                                       @RequestParam("comment") String comment,
                                       HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            // QnA 찾기
            Optional<QnA> qnaOptional = qnARepository.findById(qnaId);
            if (!qnaOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("QnA를 찾을 수 없습니다.");
            }

            QnA qna = qnaOptional.get();
            // 답변 설정
            qna.setComment(comment);

            // 로그인한 멤버가 교수일 경우
            if (loginMember.getMemberType() == MemberType.PROFESSOR) {
                // 상태를 COMPLETE로 변경
                qna.setQnaStatus(QnAStatus.COMPLETE);
            }
            // 변경 사항 저장
            qnARepository.save(qna);

            return ResponseEntity.ok().body("답변이 성공적으로 등록되었습니다.");
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }
}