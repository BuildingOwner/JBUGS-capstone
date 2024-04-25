package jbugs.eclass.file;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Data
public class ItemForm {
    private Long itemId;
    private String title;
    private List<MultipartFile> imageFiles;
    private MultipartFile attachFile;
}