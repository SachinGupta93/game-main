import { motion, AnimatePresence } from 'framer-motion';
import './QuestionCard.css';

const optionVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            delay: i * 0.08,
            type: 'spring',
            stiffness: 300,
            damping: 24
        }
    })
};

export default function QuestionCard({
    question, selectedAnswer, answerResult,
    onSelectAnswer, isPaused, isTransitioning,
    showHint, hintText, onHint, resultMessage,
    questionNumber, totalQuestions, room
}) {
    return (
        <motion.div
            className="question-card"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            key={question.question}
        >
            {/* Question header */}
            <div className="question-header">
                <motion.span
                    className="question-number"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    Question {questionNumber} of {totalQuestions}
                </motion.span>
            </div>

            {/* Question text */}
            <div className="question-body">
                <motion.p
                    className="question-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                >
                    {question.question}
                </motion.p>
                {question.image && (
                    <motion.div
                        className="question-image-container"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <img src={question.image} alt="Question Visual" className="question-image" />
                    </motion.div>
                )}
                {question.svg && (
                    <motion.div
                        className="question-svg-container"
                        dangerouslySetInnerHTML={{ __html: question.svg }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    />
                )}
            </div>

            {/* Options */}
            <div className="options-grid">
                {question.options.map((option, idx) => {
                    const letter = String.fromCharCode(65 + idx).toLowerCase();
                    let optionClass = `option-button option-${letter}`;

                    if (selectedAnswer) {
                        const isCorrect = option.toLowerCase().trim() === question.answer.toLowerCase().trim();
                        if (option === selectedAnswer) {
                            optionClass += isCorrect ? ' option-correct' : ' option-wrong';
                        } else {
                            optionClass += ' option-disabled';
                        }
                    }

                    return (
                        <motion.button
                            key={idx}
                            id={`option-${idx}`}
                            className={optionClass}
                            onClick={() => onSelectAnswer(option)}
                            disabled={!!selectedAnswer || isPaused}
                            custom={idx}
                            variants={optionVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={!selectedAnswer ? { scale: 1.03, y: -2 } : {}}
                            whileTap={!selectedAnswer ? { scale: 0.97 } : {}}
                        >
                            <span className="option-letter">{letter.toUpperCase()}</span>
                            <span className="option-text">{option}</span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Hint & Result */}
            <div className="question-footer">
                <AnimatePresence>
                    {showHint && (
                        <motion.div
                            className="hint-bubble"
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        >
                            <span className="hint-icon">💡</span>
                            <span className="hint-text">{hintText}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {resultMessage && (
                        <motion.div
                            className={`result-msg ${answerResult === 'correct' ? 'result-correct' : 'result-wrong'}`}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                            {resultMessage}
                        </motion.div>
                    )}
                </AnimatePresence>

                {!selectedAnswer && !showHint && (
                    <motion.button
                        id="hint-btn"
                        className="hint-btn"
                        onClick={onHint}
                        disabled={isPaused}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        💡 Use Hint (-5s)
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}
