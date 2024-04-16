package jbugs.eclass.dto;

import jbugs.eclass.domain.MemberType;
import lombok.Data;

@Data
public class MemberInfoDto {
    private Long memberId;
    private String memberName;
    private MemberType memberType;
    private String firstTrack;
}
