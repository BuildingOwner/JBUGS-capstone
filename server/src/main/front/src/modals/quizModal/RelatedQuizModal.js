import ReactModal from "react-modal";
import styles from "./QuizInfoModal.module.css";

const RelatedQuizModal = (props) => {
    ReactModal.setAppElement("#root")
    const quiz = props.relatedQuiz

    return (
        <ReactModal
            className={styles.modalContainer}
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}>
            <div>{quiz.question}</div>
            <div>
                {
                    quiz.options?.length > 0 ?
                        quiz.options.map((option, i) => <div>{quiz.options[i]}</div>)
                        : null
                }
            </div>
        </ReactModal>
    )
}

export default RelatedQuizModal