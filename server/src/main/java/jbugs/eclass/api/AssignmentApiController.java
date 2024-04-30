package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.AssignmentRepository;
import jbugs.eclass.repository.EnrollmentRepository;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
            }
            assignmentContentDto.setMemberInfoDto(memberInfoDto);

            Enrollment enrollment = enrollmentRepository.findOne(enrollmentId);

            CourseDto courseDto = new CourseDto();
            courseDto.setLectureName(enrollment.getLecture().getName());
            courseDto.setDivision(enrollment.getLecture().getDivision());
            assignmentContentDto.setCourseDto(courseDto);

            //enrollmentId에 해당하는 각 주차id가져오기
            Lecture lectureId = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);

            List<Assignment> assignments = weekService.findAssignmentsByLectureId(enrollment.getLecture().getId());

            List<AssignmentDto> assignmentDtos = assignments.stream()
                    .map(AssignmentDto::from)
                    .collect(Collectors.toList());
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

            if (loginMember.getMemberType() != MemberType.STUDENT) {
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

            Assignment assignment = assignmentUploadDto.toEntity(weekEntity);
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
    public ResponseEntity<?> updateAssignment(@PathVariable Long enrollmentId,
                                              @PathVariable Long assignmentId,
                                              @ModelAttribute AssignmentUpdateDto assignmentUpdateDto,
                                              HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            if (loginMember.getMemberType() == MemberType.PROFESSOR) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("수정 권한이 없습니다.");
            }

            Lecture lecture = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);
            if (lecture == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("강의를 찾을 수 없습니다.");
            }

            // 과제 조회
            Optional<Assignment> optionalAssignment = assignmentRepository.findById(assignmentId);
            if (!optionalAssignment.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("과제를 찾을 수 없습니다.");
            }
            Assignment existingAssignment = optionalAssignment.get();
            Optional<Week> week = weekService.findWeekByLectureAndWeekNumber(lecture.getId(), assignmentUpdateDto.getWeekNumber());
            if (!week.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 주차를 찾을 수 없습니다.");
            }
            Week weekEntity = week.get();

            // 과제 정보 수정
            existingAssignment.setTitle(assignmentUpdateDto.getTitle());
            existingAssignment.setContent(assignmentUpdateDto.getContent());
            existingAssignment.setWeek(weekEntity);
            existingAssignment.setDueDate(assignmentUpdateDto.getDueDate());

            // 기존 파일 처리: 클라이언트에서 요청된 기존 파일 외의 모든 파일 삭제
            List<Long> fileIdsToDelete = existingAssignment.getMaterials().stream()
                    .map(Material::getId)
                    .filter(id -> !assignmentUpdateDto.getExistingFileIds().contains(id))
                    .collect(Collectors.toList());
            fileIdsToDelete.forEach(materialService::deleteMaterial);

            // 첨부 파일 추가
            if (assignmentUpdateDto.getNewFiles() != null && assignmentUpdateDto.getNewFiles().length > 0) {
                for (MultipartFile file : assignmentUpdateDto.getNewFiles()) {
                    if (!file.isEmpty()) {
                        String fullPath = fileDir + file.getOriginalFilename();
                        log.info("{} 저장 fullPath={}", "파일", fullPath);
                        file.transferTo(new File(fullPath));

                        Material material = new Material();
                        material.setFilePath(fullPath);
                        material.setTitle(assignmentUpdateDto.getFileTitle());
                        material.setFileName(file.getOriginalFilename());
                        material.setWeek(weekEntity);
                        material.setAssignment(existingAssignment); // 과제 정보 설정
                        materialService.join(material);
                    }
                }
            }

            assignmentRepository.save(existingAssignment);

//            // 첨부 파일 삭제
//            if (assignmentUpdateDto.getDeletedMaterialIds() != null) {
//                for (Long materialId : assignmentUpdateDto.getDeletedMaterialIds()) {
//                    materialService.deleteMaterial(materialId);
//                }
//            }

            return ResponseEntity.ok().body("과제가 성공적으로 수정되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }
}
