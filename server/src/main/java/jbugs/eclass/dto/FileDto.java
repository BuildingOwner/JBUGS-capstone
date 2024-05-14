package jbugs.eclass.dto;

import jbugs.eclass.domain.Material;
import lombok.Data;

@Data
public class FileDto {
    private Long fileId;

    private String title;
    private String fileName;
    private String filePath;

//    private int weekNumber;

    public static FileDto from(Material material){
        FileDto dto = new FileDto();
        dto.setFileId(material.getId());
        dto.setTitle(material.getTitle());
        dto.setFileName(material.getFileName());
        dto.setFilePath(material.getFilePath());
        return dto;
    }
}
