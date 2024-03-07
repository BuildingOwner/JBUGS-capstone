package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Admin {
    @Id
    @GeneratedValue
    @Column(name = "admin_id")
    private Long id;

    @OneToOne(mappedBy = "admin", fetch = FetchType.LAZY)
    private Member member;

}
