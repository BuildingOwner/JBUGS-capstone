package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.AssignmentRepository;
import jbugs.eclass.repository.EnrollmentRepository;
import jbugs.eclass.service.AssignmentService;
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
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/course")
public class AssignmentApiController {
    private final WeekService weekService;
    private final EnrollmentRepository enrollmentRepository;
    private final AssignmentRepository assignmentRepository;
    private final MaterialService materialService;
    private final AssignmentService assignmentService;

    @Value("${file.dir}")
    private String fileDir;

    @GetMapping("/{enrollmentId}/assignment")
    public ResponseEntity<?> getCourseInfo(@PathVariable Long enrollmentId, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            AssignmentContentDto assignmentContentDto = new AssignmentContentDto();
            MemberInfoDto memberInfoDto = new MemberInfoDto();
            memberInfoDto.setMemberId(loginMember.getId());
            memberInfoDto.setMemberName(loginMember.getName());
            memberInfoDto.setMemberType(loginMember.getMemberType());
            if (loginMember.getMemberType() == MemberType.STUDENT) {
                memberInfoDto.setFirstTrack(loginMember.getStudent().getFirstTrack());
                memberInfoDto.setStudentId(loginMember.getStudent().getId());
            }
            assignmentContentDto.setMemberInfoDto(memberInfoDto);

            Enrollment enrollment = enrollmentRepository.findOne(enrollmentId);

            CourseDto courseDto = new CourseDto();
            courseDto.setLectureName(enrollment.getLecture().getName());
            courseDto.setDivision(enrollment.getLecture().getDivision());
            assignmentContentDto.setCourseDto(courseDto);

            List<AssignmentDto> assignmentDtos = assignmentService.findAssignmentsByLecture(enrollment.getLecture().getId());
            assignmentContentDto.setAssignmentDtoList(assignmentDtos);

            return ResponseEntity.ok(assignmentContentDto);
        }
        else {
            // 세션이 없거나 로그인 되어있지 않은 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }

    // 교수가 과제 등록
    @PostMapping("/{enrollmentId}/assignment/profUpload")
    public ResponseEntity<?> uploadAssignment(@PathVariable Long enrollmentId,
                                              @ModelAttribute AssignmentUploadDto assignmentUploadDto,
                                              HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            if (loginMember.getMemberType() != MemberType.PROFESSOR) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("수정 권한이 없습니다.");
            }

            Lecture lecture = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);
            if (lecture == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("강의를 찾을 수 없습니다.");
            }

            Optional<Week> week = weekService.findWeekByLectureAndWeekNumber(lecture.getId(), assignmentUploadDto.getWeekNumber());
            if (!week.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 주차를 찾을 수 없습니다.");
            }
            Week weekEntity = week.get();

            Assignment assignment = assignmentUploadDto.toEntity(weekEntity, lecture);
            assignment = assignmentRepository.save(assignment); // 과제 정보 먼저 저장

            if (assignmentUploadDto.getAttachFiles() != null && assignmentUploadDto.getAttachFiles().length > 0) {
                for (MultipartFile file : assignmentUploadDto.getAttachFiles()) {
                    if (!file.isEmpty()) {
                        String fullPath = fileDir + file.getOriginalFilename();

                        log.info("{} 저장 fullPath={}", "파일", fullPath);
                        file.transferTo(new File(fullPath));

                        Material material = new Material();
                        material.setFilePath(fullPath);
                        material.setTitle(assignmentUploadDto.getFileTitle());
                        material.setFileName(file.getOriginalFilename());
                        material.setWeek(weekEntity);
                        material.setAssignment(assignment); // 과제 정보 설정
                        material.setFileSize(file.getSize());
                        materialService.join(material);
                    }
                }
            }

            return ResponseEntity.ok().body("과제가 성공적으로 등록되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }

    //교수가 과제 수정
    @PutMapping("/{enrollmentId}/assignment/{assignmentId}")
    public ResponseEntity<?> updateAssignment(
            @PathVariable Long enrollmentId,
            @PathVariable Long assignmentId,
            @ModelAttribute AssignmentUploadDto assignmentUploadDto,
            HttpServletRequest request) throws IOException {

        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            // 강의 존재 여부 체크
            Lecture lecture = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);
            if (lecture == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("강의를 찾을 수 없습니다.");
            }

            // 과제 존재 여부 체크
            Optional<Assignment> existingAssignment = assignmentRepository.findById(assignmentId);
            if (!existingAssignment.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 과제를 찾을 수 없습니다.");
            }

            Assignment assignment = existingAssignment.get();
            Optional<Week> week = weekService.findWeekByLectureAndWeekNumber(lecture.getId(), assignmentUploadDto.getWeekNumber());
            if (!week.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 주차를 찾을 수 없습니다.");
            }
            Week weekEntity = week.get();
            // 과제 정보 업데이트
            assignment.setTitle(assignmentUploadDto.getTitle());
            assignment.setContent(assignmentUploadDto.getContent());
            assignment.setWeek(weekEntity);
            assignment.setDueDate(assignmentUploadDto.getDueDate());
            assignmentRepository.save(assignment);

            materialService.deleteMaterialsByAssignment(assignment);

            // 새로운 파일 추가 로직
            if (assignmentUploadDto.getAttachFiles() != null && assignmentUploadDto.getAttachFiles().length > 0) {
                for (MultipartFile file : assignmentUploadDto.getAttachFiles()) {
                    if (!file.isEmpty()) {
                        String fullPath = fileDir + file.getOriginalFilename();

                        log.info("{} 저장 fullPath={}", "파일", fullPath);
                        file.transferTo(new File(fullPath));

                        Material material = new Material();
                        material.setFilePath(fullPath);
                        material.setTitle(assignmentUploadDto.getFileTitle());
                        material.setFileName(file.getOriginalFilename());
                        material.setWeek(assignment.getWeek());
                        material.setAssignment(assignment);
                        material.setFileSize(file.getSize());
                        materialService.join(material);
                    }
                }
            }

            return ResponseEntity.ok().body("과제가 성공적으로 수정되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }

    // 학생이 과제 제출
    @PostMapping("/{enrollmentId}/assignment/submit")
    public ResponseEntity<?> submitAssignment(@PathVariable Long enrollmentId,
                                              @ModelAttribute AssignmentSubmissionDto assignmentSubmissionDto,
                                              HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            if (loginMember.getMemberType() != MemberType.STUDENT) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("제출 권한이 없습니다.");
            }

            // enrollmentId로 Lecture 및 Assignment 찾기
            Lecture lecture = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);
            if (lecture == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("강의를 찾을 수 없습니다.");
            }

            // 현재 주차의 과제 찾기
            LocalDateTime now = LocalDateTime.now();
            Optional<Assignment> optionalAssignment = assignmentRepository.findByWeekLectureIdAndDueDateAfter(lecture.getId(), now);
            if (!optionalAssignment.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("제출 기한이 지났거나, 과제가 존재하지 않습니다.");
            }
            Assignment assignment = optionalAssignment.get();

            // 과제 제출 상태 변경 및 내용 저장
            assignment.setStatus(AssignmentStatus.SUBMITTED);
            assignment.setContent(assignmentSubmissionDto.getContent());
            assignment = assignmentRepository.save(assignment); // 과제 정보 업데이트

            // 파일 저장
            if (assignmentSubmissionDto.getAttachFiles() != null && assignmentSubmissionDto.getAttachFiles().length > 0) {
                for (MultipartFile file : assignmentSubmissionDto.getAttachFiles()) {
                    if (!file.isEmpty()) {
                        String fullPath = fileDir + file.getOriginalFilename();

                        log.info("{} 저장 fullPath={}", "파일", fullPath);
                        file.transferTo(new File(fullPath));

                        Material material = new Material();
                        material.setFilePath(fullPath);
                        material.setFileName(file.getOriginalFilename());
                        material.setAssignment(assignment); // 과제 정보 설정
                        material.setFileSize(file.getSize());
                        materialService.join(material);
                    }
                }
            }

            return ResponseEntity.ok().body("과제가 성공적으로 제출되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }

    @PutMapping("/{enrollmentId}/assignment/submit")
    public ResponseEntity<?> updateAssignment(@PathVariable Long enrollmentId,
                                              @ModelAttribute AssignmentSubmissionDto assignmentSubmissionDto,
                                              HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            if (loginMember.getMemberType() != MemberType.STUDENT) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("수정 권한이 없습니다.");
            }

            Lecture lecture = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);
            if (lecture == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("강의를 찾을 수 없습니다.");
            }

            LocalDateTime now = LocalDateTime.now();
            Optional<Assignment> optionalAssignment = assignmentRepository.findByWeekLectureIdAndDueDateAfter(lecture.getId(), now);
            if (!optionalAssignment.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("제출 기한이 지났거나, 과제가 존재하지 않습니다.");
            }
            Assignment assignment = optionalAssignment.get();

            if (assignment.getStatus() == AssignmentStatus.SUBMITTED) {
                // 과제 내용 업데이트
                assignment.setContent(assignmentSubmissionDto.getContent());

                // 기존 파일 삭제
                materialService.deleteMaterialsByAssignment(assignment);

                // 새로운 파일 저장
                if (assignmentSubmissionDto.getAttachFiles() != null && assignmentSubmissionDto.getAttachFiles().length > 0) {
                    for (MultipartFile file : assignmentSubmissionDto.getAttachFiles()) {
                        if (!file.isEmpty()) {
                            String fullPath = fileDir + file.getOriginalFilename();

                            log.info("{} 저장 fullPath={}", "파일", fullPath);
                            file.transferTo(new File(fullPath));

                            Material material = new Material();
                            material.setFilePath(fullPath);
                            material.setFileName(file.getOriginalFilename());
                            material.setAssignment(assignment);
                            material.setFileSize(file.getSize());
                            materialService.join(material);
                        }
                    }
                }

                assignmentRepository.save(assignment); // 과제 정보 업데이트
                return ResponseEntity.ok().body("과제가 성공적으로 수정되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("아직 제출되지 않은 과제입니다.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }

}
