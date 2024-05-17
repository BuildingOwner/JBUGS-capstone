package jbugs.eclass.repository;

import jbugs.eclass.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findByMemberId(Long memberId);
}
