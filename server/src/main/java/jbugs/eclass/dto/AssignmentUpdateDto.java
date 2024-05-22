package jbugs.eclass.dto;

import jbugs.eclass.domain.Assignment;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class AssignmentUpdateDto {
    private String title;  // 과제 제목
    private String content; // 과제 내용
    private LocalDateTime dueDate; //제출 일자
    private String fileTitle;
    private int weekNumber;
    private List<Long> existingFileIds; // 클라이언트가 유지하려는 기존 파일 ID 목록
    private MultipartFile[] newFiles; // 새로운 파일들
//
//    // 과제 수정 로직을 담당하는 서비스 메서드
//    public void updateAssignment(Long assignmentId, AssignmentUpdateDto assignmentUpdateDto) {
//        Assignment assignment = assignmentRepository.findById(assignmentId)
//                .orElseThrow(() -> new IllegalArgumentException("Not found assignment"));
//
//        // 1. 클라이언트에서 온 existingFileIds와 데이터베이스에 저장된 파일의 ID를 비교
//        List<Long> fileIdsToDelete = getIdsOfFilesToDelete(assignment, assignmentUpdateDto.getExistingFileIds());
//
//        // 2. 삭제할 파일 삭제
//        fileIdsToDelete.forEach(this::deleteFile);
//
//        // 3. 새로운 파일 처리
//        // 새로운 파일 저장 로직 구현…
//
//        // 4. 과제 정보 업데이트
//        // 과제 업데이트 로직 구현…
//    }
//
//    private List<Long> getIdsOfFilesToDelete(Assignment assignment, List<Long> existingFileIds) {
//        // 데이터베이스 또는 파일 시스템에서 assignment와 연결된 모든 파일의 ID를 가져옴
//        List<Long> currentFileIds = assignment.getMaterials().stream()
//                .map(Material::getId)
//                .collect(Collectors.toList());
//
//        // currentFileIds 중에서 existingFileIds에 없는 것을 찾아서 삭제 대상으로 함
//        return currentFileIds.stream()
//                .filter(id -> !existingFileIds.contains(id))
//                .collect(Collectors.toList());
//    }
//
//    private void deleteFile(Long fileId) {
//        // 파일 삭제 로직 구현: 파일 시스템 및 데이터베이스에서 파일 삭제
//    }
}
