package jbugs.eclass.dto;

import lombok.Data;

@Data
public class MaterialDto {
    private Long materialId;
    private String fileName;
    private String filePath;
    private Long fileSize;
}
