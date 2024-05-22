package jbugs.eclass.controller;

import jakarta.validation.Valid;
import jbugs.eclass.domain.Member;
import jbugs.eclass.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

//    @GetMapping("/add")
    public String addForm(@ModelAttribute("member") Member member){
        return "members/addMemberForm";
    }

//    @PostMapping("/add")
    public String save(@Valid @ModelAttribute Member member, BindingResult result) {
        if (result.hasErrors()) {
            return "members/addMemberForm";
        }

        try {
            memberService.join(member);
        } catch (IllegalStateException e) {
            return "redirect:/members/add?error=duplicate"; // 이미 존재하는 회원이면 로그인 창으로 이동
        }
        return "redirect:/";
    }
}
