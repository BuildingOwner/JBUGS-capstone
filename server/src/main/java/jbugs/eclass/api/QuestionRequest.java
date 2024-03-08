package jbugs.eclass.api;

import java.util.List;
import java.util.Objects;

public class QuestionRequest {
    private String type;
    private String question;
    private String answer;
    private List<String> options;

    public String getType() {
        return Objects.requireNonNullElse(type, "");
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }
}
