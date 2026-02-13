import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TutorialScreen.css';

export default function TutorialScreen({ userName, onComplete }) {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

    const dialogues = [
        {
            title: "Welcome, Warrior!",
            text: `Brave warrior ${userName}! I am Master Jiraiya, the Toad Sage. The legendary dragon Nagshakthi has returned and kidnapped the Princess! Only the power of Knowledge can defeat this beast.`,
            icon: "⚡"
        },
        {
            title: "Rules of Battle",
            text: "RULE 1: Answer correctly to strike Nagshakthi. Wrong answers let the dragon strike back!\n\nRULE 2: Use HINTS if needed, but they cost precious time!",
            icon: "📜"
        },
        {
            title: "Final Warning",
            text: "RULE 3: You have 3 LIVES. Lose them all and the world falls into shadow.\n\nSPEED IS VITAL — faster answers earn bonus points!\n\nNow go, warrior! The Princess awaits!",
            icon: "⚔️"
        }
    ];

    const handleNext = useCallback(() => {
        if (step < dialogues.length - 1) {
            setDirection(1);
            setStep(prev => prev + 1);
        } else {
            onComplete();
        }
    }, [step, dialogues.length, onComplete]);

    const handlePrev = useCallback(() => {
        if (step > 0) {
            setDirection(-1);
            setStep(prev => prev - 1);
        }
    }, [step]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' || e.key === 'ArrowRight') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev]);

    const slideVariants = {
        enter: (dir) => ({
            x: dir > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 300, damping: 30 }
        },
        exit: (dir) => ({
            x: dir > 0 ? -300 : 300,
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.2 }
        })
    };

    return (
        <div className="tutorial-screen">
            {/* Animated background particles */}
            <div className="tutorial-bg-particles">
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="tutorial-particle"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            y: [-20, -200],
                            x: [0, (Math.random() - 0.5) * 100]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: 'easeOut'
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: `${Math.random() * 30}%`
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="tutorial-overlay"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
                <div className="tutorial-content">
                    {/* Jiraiya Character */}
                    <motion.div
                        className="tutorial-jiraiya-container"
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <div className="tutorial-jiraiya">
                            <motion.span
                                className="sage-icon"
                                animate={{ rotate: [0, -3, 3, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            >🧙‍♂️</motion.span>
                            <motion.span
                                className="toad-icon"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            >🐸</motion.span>
                        </div>
                    </motion.div>

                    {/* Dialogue Box */}
                    <div className="tutorial-dialogue-box">
                        <motion.div
                            className="dialogue-name"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Master Jiraiya
                        </motion.div>

                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={step}
                                className="dialogue-content"
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={direction}
                            >
                                <div className="dialogue-step-icon">{dialogues[step].icon}</div>
                                <h3 className="dialogue-step-title">{dialogues[step].title}</h3>
                                <p className="dialogue-text">
                                    {dialogues[step].text}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Step indicator dots */}
                        <div className="tutorial-step-indicator">
                            {dialogues.map((_, i) => (
                                <motion.span
                                    key={i}
                                    className={`step-dot ${i === step ? 'active' : ''} ${i < step ? 'completed' : ''}`}
                                    animate={i === step ? { scale: [1, 1.4, 1.2] } : { scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            ))}
                        </div>

                        <div className="tutorial-btn-group">
                            <AnimatePresence>
                                {step > 0 && (
                                    <motion.button
                                        className="tutorial-prev-btn"
                                        onClick={handlePrev}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        ◀ Previous
                                    </motion.button>
                                )}
                            </AnimatePresence>
                            <motion.button
                                className="tutorial-next-btn"
                                onClick={handleNext}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                layout
                            >
                                {step < dialogues.length - 1 ? 'Next ▶' : 'Begin Quest ⚔️'}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
