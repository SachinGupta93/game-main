import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './IntroScreen.css';

const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 2 + Math.random() * 4
}));

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2
        }
    },
    exit: {
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.5 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 200, damping: 20 }
    }
};

export default function IntroScreen({ onStart }) {
    const [isExiting, setIsExiting] = useState(false);
    const [userName, setUserName] = useState('');

    const handleInputChange = (e) => {
        setUserName(e.target.value);
    };

    const handleStart = () => {
        if (!userName.trim()) {
            alert("Please enter your warrior name!");
            return;
        }
        setIsExiting(true);
        setTimeout(() => onStart(userName), 600);
    };

    return (
        <AnimatePresence>
            {!isExiting ? (
                <motion.div
                    className="intro-screen"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    key="intro"
                >
                    <div className="intro-particles">
                        {particles.map(p => (
                            <motion.div
                                key={p.id}
                                className="intro-particle"
                                initial={{ opacity: 0, y: 0 }}
                                animate={{
                                    opacity: [0, 1, 1, 0],
                                    y: [0, -window.innerHeight]
                                }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    delay: p.delay,
                                    ease: 'linear'
                                }}
                                style={{
                                    left: `${p.left}%`,
                                    bottom: '-10px',
                                    width: `${p.size}px`,
                                    height: `${p.size}px`
                                }}
                            />
                        ))}
                    </div>

                    <div className="intro-content">
                        <motion.div className="intro-title-glow" variants={itemVariants}>
                            <h1 className="intro-title">
                                <motion.span
                                    className="intro-icon"
                                    animate={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                >🗡️</motion.span>
                                Fantasy Quest
                                <motion.span
                                    className="intro-icon"
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                >🛡️</motion.span>
                            </h1>
                            <h2 className="intro-subtitle">Aptitude Adventure</h2>
                        </motion.div>

                        <motion.div className="intro-story-card" variants={itemVariants}>
                            <div className="intro-story-header">
                                <span className="story-icon">📜</span>
                                <span>The Legend of Garuddwar</span>
                            </div>
                            <p className="intro-story-text">
                                The mighty dragon <strong>Nagshakthi</strong> has attacked the village of <strong>Garuddwar</strong> and kidnapped our beloved <strong>Princess</strong>!
                                Swords cannot pierce its hide—only <strong>knowledge</strong> can weaken its power.
                                Prove your intellect across <strong>7 levels</strong> to defeat the beast and rescue her!
                            </p>
                        </motion.div>

                        <motion.div className="intro-characters" variants={itemVariants}>
                            <motion.div
                                className="intro-character-card hero-card"
                                whileHover={{ scale: 1.03, y: -3 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <div className="character-avatar hero-avatar">🗡️</div>
                                <div className="character-info">
                                    <h3>The Hero</h3>
                                    <p>Brave adventurer on a perilous quest for knowledge.</p>
                                </div>
                            </motion.div>
                            <motion.div
                                className="intro-vs"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >VS</motion.div>
                            <motion.div
                                className="intro-character-card dragon-card"
                                whileHover={{ scale: 1.03, y: -3 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <div className="character-avatar dragon-avatar">🐉</div>
                                <div className="character-info">
                                    <h3>Nagshakthi</h3>
                                    <p>Invincible dragon whose power fades with every correct answer.</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div className="intro-features" variants={itemVariants}>
                            {[
                                { icon: '💡', text: 'Hints & Power-ups' },
                                { icon: '🏆', text: 'Achievements' },
                                { icon: '⏳', text: 'Timed Challenges' },
                                { icon: '❤️', text: '3 Lives' }
                            ].map((feat, i) => (
                                <motion.div
                                    key={i}
                                    className="intro-feature"
                                    whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.08)' }}
                                >
                                    <span>{feat.icon}</span>
                                    <span>{feat.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div className="input-group" variants={itemVariants}>
                            <input
                                type="text"
                                className="warrior-name-input"
                                placeholder="Enter Warrior Name"
                                value={userName}
                                onChange={handleInputChange}
                                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                                maxLength={15}
                            />
                        </motion.div>

                        <motion.button
                            id="start-quest-btn"
                            className="intro-start-btn"
                            onClick={handleStart}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <span className="btn-icon">⚔️</span>
                            Begin Your Quest
                            <span className="btn-icon">⚔️</span>
                        </motion.button>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    className="intro-screen"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    key="intro-exit"
                >
                    <div className="intro-content">
                        <motion.div
                            initial={{ scale: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{ fontSize: '4rem' }}
                        >
                            ⚔️
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
