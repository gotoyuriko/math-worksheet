import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from './questionsData';
import './App.scss';

// Animation variants moved outside component for performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const questionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const scoreVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

const starVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

function App() {
  const [userAnswers, setUserAnswers] = useState({});
  const [userName, setUserName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [nameError, setNameError] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Refs for focus management
  const nameInputRef = useRef(null);
  const submitButtonRef = useRef(null);
  const scoreRef = useRef(null);

  // Calculate progress
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercentage = (answeredCount / questions.length) * 100;

  const handleAnswerSelect = (questionId, answer) => {
    if (!isSubmitted) {
      setUserAnswers({
        ...userAnswers,
        [questionId]: answer
      });
    }
  };

  const handleSubmit = () => {
    if (!userName.trim()) {
      setNameError(true);
      // Focus on name input when validation fails
      nameInputRef.current?.focus();
      return;
    }

    let calculatedScore = 0;
    questions.forEach((question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setIsSubmitted(true);
    setNameError(false);
  };

  const handleResetClick = () => {
    // Only show confirmation if there's something to lose
    if (answeredCount > 0 || userName.trim()) {
      setShowResetConfirm(true);
    } else {
      // Nothing to lose, just reset
      confirmReset();
    }
  };

  const confirmReset = () => {
    setUserAnswers({});
    setUserName('');
    setIsSubmitted(false);
    setScore(0);
    setNameError(false);
    setShowResetConfirm(false);

    // Scroll to top and focus on name input
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 300);
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
    if (nameError && e.target.value.trim()) {
      setNameError(false);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isSubmitted) {
      handleSubmit();
    }
  };

  // Focus on score when it appears
  useEffect(() => {
    if (isSubmitted && scoreRef.current) {
      scoreRef.current.focus();
    }
  }, [isSubmitted]);

  // Get encouragement message based on score
  const getEncouragementMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "🌟 WOW! Perfect Score! You're a Math Star! 🌟";
    if (percentage >= 90) return "🎉 Amazing! You're almost perfect! 🎉";
    if (percentage >= 70) return "😊 Great job! You're doing awesome! 👏";
    if (percentage >= 50) return "💪 Good effort! Keep practicing! 📚";
    return "🌈 Keep trying! You can do it! ⭐";
  };

  return (
    <div className="app">
      <motion.div
        className="container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>🎯 Math Worksheet 🎯</h1>
          <h2>Rounding Off to Nearest 10</h2>
        </motion.div>

        {!isSubmitted && (
          <motion.div
            className="progress-bar-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="progress-info">
              <span className="progress-text">
                📝 Answered: {answeredCount} of {questions.length}
              </span>
              <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}

        <motion.div
          className={`name-input-section ${nameError ? 'error' : ''}`}
          variants={questionVariants}
          animate={nameError ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={nameError ? { duration: 0.4 } : {}}
        >
          <label htmlFor="userName">✏️ What's your name?</label>
          <input
            ref={nameInputRef}
            type="text"
            id="userName"
            value={userName}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your name here..."
            disabled={isSubmitted}
            aria-required="true"
            aria-invalid={nameError}
            aria-describedby={nameError ? "name-error" : undefined}
          />
          <AnimatePresence>
            {nameError && (
              <motion.p
                id="name-error"
                className="error-message"
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                😊 Oops! Don't forget to write your name!
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="questions-container"
          variants={containerVariants}
          role="group"
          aria-label="Math questions"
        >
          {questions.map((question) => {
            const isCorrect = isSubmitted && userAnswers[question.id] === question.correctAnswer;
            const isWrong = isSubmitted && userAnswers[question.id] && userAnswers[question.id] !== question.correctAnswer;
            const isAnswered = !!userAnswers[question.id];

            return (
              <motion.div
                key={question.id}
                className={`question-card ${isSubmitted ? (isCorrect ? 'correct' : isWrong ? 'wrong' : '') : ''} ${isAnswered && !isSubmitted ? 'answered' : ''}`}
                variants={questionVariants}
                whileHover={!isSubmitted ? { y: -5 } : {}}
              >
                <div className="question-header">
                  <h3>Question {question.id}</h3>
                  {isAnswered && !isSubmitted && (
                    <motion.span
                      className="checkmark"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      ✓
                    </motion.span>
                  )}
                </div>
                <p className="question-text">{question.question}</p>

                <div
                  className="options"
                  role="radiogroup"
                  aria-labelledby={`question-${question.id}`}
                  aria-required="true"
                >
                  {question.options.map((option) => {
                    const isSelected = userAnswers[question.id] === option;
                    const isCorrectOption = isSubmitted && option === question.correctAnswer;

                    return (
                      <motion.button
                        key={option}
                        className={`option-button ${isSelected ? 'selected' : ''} ${
                          isSubmitted && isCorrectOption ? 'correct-option' : ''
                        } ${
                          isSubmitted && isSelected && !isCorrectOption ? 'wrong-option' : ''
                        }`}
                        onClick={() => handleAnswerSelect(question.id, option)}
                        disabled={isSubmitted}
                        variants={buttonVariants}
                        whileHover={!isSubmitted ? "hover" : {}}
                        whileTap={!isSubmitted ? "tap" : {}}
                        animate={isSelected && !isSubmitted ? { scale: [1, 1.05, 1] } : {}}
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={`Answer option ${option}`}
                      >
                        {option}
                      </motion.button>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <motion.div
                    className="feedback"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    role="status"
                    aria-live="polite"
                  >
                    {isCorrect ? (
                      <span className="feedback-correct">
                        <motion.span
                          className="star"
                          variants={starVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          ⭐
                        </motion.span>
                        Correct! Well done! 🎉
                      </span>
                    ) : userAnswers[question.id] ? (
                      <span className="feedback-wrong">Not quite! The answer is {question.correctAnswer} 💡</span>
                    ) : (
                      <span className="feedback-unanswered">The answer is {question.correctAnswer} 📝</span>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="action-buttons"
          variants={questionVariants}
        >
          {!isSubmitted ? (
            <motion.button
              ref={submitButtonRef}
              className="submit-button"
              onClick={handleSubmit}
              onKeyDown={handleKeyDown}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label="Submit your answers"
            >
              🚀 Submit My Answers!
            </motion.button>
          ) : (
            <AnimatePresence>
              <motion.div
                ref={scoreRef}
                className="score-section"
                variants={scoreVariants}
                initial="hidden"
                animate="visible"
                tabIndex="-1"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                <h2>🎊 Your Score 🎊</h2>
                <motion.div
                  className="score-display"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2
                  }}
                  aria-label={`You scored ${score} out of ${questions.length}`}
                >
                  <div className="stars-container">
                    {Array.from({ length: score }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="score-star"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.5 + i * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </div>
                  <div className="score-number">{score} / {questions.length}</div>
                </motion.div>
                <p className="score-message">
                  {getEncouragementMessage()}
                </p>
              </motion.div>
            </AnimatePresence>
          )}

          <motion.button
            className="reset-button"
            onClick={handleResetClick}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Reset the worksheet"
          >
            🔄 Try Again!
          </motion.button>
        </motion.div>

        <motion.footer
          className="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>© www.mathinenglish.com</p>
        </motion.footer>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showResetConfirm && (
            <>
              <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={cancelReset}
              />
              <motion.div
                className="modal-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="modal-content"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  role="dialog"
                  aria-labelledby="confirm-title"
                  aria-describedby="confirm-message"
                >
                  <div className="modal-icon">⚠️</div>
                  <h3 id="confirm-title">Are you sure?</h3>
                  <p id="confirm-message">
                    {isSubmitted
                      ? "Do you want to start over and try again? 🤔"
                      : "This will erase all your answers. Are you sure? 🤔"}
                  </p>
                  <div className="modal-buttons">
                    <motion.button
                      className="modal-button cancel-button"
                      onClick={cancelReset}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      ❌ No, Go Back
                    </motion.button>
                    <motion.button
                      className="modal-button confirm-button"
                      onClick={confirmReset}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      ✅ Yes, Start Over
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
