package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Chatting {
    @Id
    @GeneratedValue
    @Column(name = "chatting_id")
    private Long id;

    private String speaker;
    private String contents;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;
}
