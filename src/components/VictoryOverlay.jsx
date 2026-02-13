import { useState } from 'react';
import { motion } from 'framer-motion';
import './VictoryOverlay.css';

const confettiEmojis = ['🎉', '✨', '🌟', '🎊', '💫', '🏆', '👑', '⭐'];

const panelVariants = {
    hidden: { opacity: 0, scale: 0.7, y: 60 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { type: 'spring', stiffness: 180, damping: 18, staggerChildren: 0.12, delayChildren: 0.3 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function VictoryOverlay({ score, onRestart, gifts }) {
    const [confettiPieces] = useState(() => {
        const giftEmojis = gifts ? gifts.map(g => g.emoji) : [];
        const allEmojis = [...confettiEmojis, ...giftEmojis, ...giftEmojis];

        return Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            fontSize: `${0.8 + Math.random() * 1.5}rem`,
            emoji: allEmojis[i % allEmojis.length]
        }));
    });

    return (
        <motion.div
            className="victory-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Confetti */}
            <div className="confetti-container">
                {confettiPieces.map((piece) => (
                    <span
                        key={piece.id}
                        className="confetti-piece"
                        style={{
                            left: piece.left,
                            animationDelay: piece.animationDelay,
                            animationDuration: piece.animationDuration,
                            fontSize: piece.fontSize
                        }}
                    >
                        {piece.emoji}
                    </span>
                ))}
            </div>

            <motion.div
                className="victory-panel"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="victory-crown"
                    variants={itemVariants}
                    animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >👑</motion.div>
                <motion.h1 className="victory-title" variants={itemVariants}>Victory!</motion.h1>
                <motion.p className="victory-subtitle" variants={itemVariants}>
                    The Warrior rescued the Princess! Together they returned to the village,
                    where they were welcomed as heroes and lived happily ever after.
                </motion.p>

                <motion.div className="victory-score-card" variants={itemVariants}>
                    <span className="victory-score-label">Final Score</span>
                    <motion.span
                        className="victory-score-value"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.3, 1] }}
                        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                    >{score.toLocaleString()}</motion.span>
                </motion.div>

                <motion.div className="victory-badges" variants={itemVariants}>
                    {['🐉 Dragon Slayer', '🧠 Quiz Master', '⭐ Legend'].map((badge, i) => (
                        <motion.span
                            key={i}
                            className="victory-badge"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 + i * 0.15, type: 'spring', stiffness: 300 }}
                        >{badge}</motion.span>
                    ))}
                </motion.div>

                {gifts && gifts.length > 0 && (
                    <motion.div className="victory-giftbox" variants={itemVariants}>
                        <div className="giftbox-lid">🎁</div>
                        <p className="giftbox-label">Gifts Collected</p>
                        <div className="giftbox-items">
                            {gifts.map((gift, idx) => (
                                <motion.span
                                    key={idx}
                                    className="gift-item"
                                    title={gift.name}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 1.2 + idx * 0.1, type: 'spring' }}
                                >{gift.emoji}</motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}

                <motion.button
                    id="play-again-btn"
                    className="victory-restart-btn"
                    onClick={onRestart}
                    variants={itemVariants}
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                >
                    🔄 Play Again
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
