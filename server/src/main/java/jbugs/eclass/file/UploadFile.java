package jbugs.eclass.file;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class UploadFile {
    @Id
    @GeneratedValue
    @Column(name = "upload_file_id")
    private Long id;

    private String uploadFileName;
    private String storeFileName;
    private String filePath;
    public UploadFile(String uploadFileName, String storeFileName) {
        this.uploadFileName = uploadFileName;
        this.storeFileName = storeFileName;
    }

    public UploadFile() {

    }
}
