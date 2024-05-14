package jbugs.eclass.dto;

import lombok.Data;

@Data
public class MaterialDto {
    private Long materialId;
    private String title;
    private String fileName;
    private String filePath;
    private Long fileSize;
}
