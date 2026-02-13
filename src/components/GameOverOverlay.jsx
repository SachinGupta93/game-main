import { motion } from 'framer-motion';
import './GameOverOverlay.css';

const panelVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { type: 'spring', stiffness: 200, damping: 20, staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function GameOverOverlay({ score, level, questionsAnswered, onRestart, keysCount, onRevive, gifts }) {
    return (
        <motion.div
            className="gameover-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="gameover-panel"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="gameover-dragon"
                    variants={itemVariants}
                    animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >🐉</motion.div>
                <motion.h1 className="gameover-title" variants={itemVariants}>Game Over</motion.h1>
                <motion.p className="gameover-subtitle" variants={itemVariants}>
                    The Warrior fought bravely, but the Dragon's power was too great.
                    The Princess remains captured, and hope fades from the kingdom...
                </motion.p>

                <motion.div className="gameover-stats" variants={itemVariants}>
                    <div className="gameover-stat">
                        <span className="stat-value">{score.toLocaleString()}</span>
                        <span className="stat-label">Final Score</span>
                    </div>
                    <div className="gameover-divider" />
                    <div className="gameover-stat">
                        <span className="stat-value">Lvl {level}</span>
                        <span className="stat-label">Level Reached</span>
                    </div>
                    <div className="gameover-divider" />
                    <div className="gameover-stat">
                        <span className="stat-value">{questionsAnswered}</span>
                        <span className="stat-label">Questions</span>
                    </div>
                </motion.div>

                <motion.div className="gameover-actions" variants={itemVariants}>
                    {keysCount > 0 && (
                        <motion.button
                            className="gameover-revive-btn"
                            onClick={onRevive}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            🔑 Use Key to Revive
                        </motion.button>
                    )}
                    <motion.button
                        id="restart-game-btn"
                        className="gameover-restart-btn"
                        onClick={onRestart}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ⚔️ Try Again
                    </motion.button>
                </motion.div>

                {gifts && gifts.length > 0 && (
                    <motion.div className="gameover-giftbox" variants={itemVariants}>
                        <div className="giftbox-lid">🎁</div>
                        <p className="giftbox-label">Gifts Collected</p>
                        <div className="giftbox-items">
                            {gifts.map((gift, idx) => (
                                <motion.span
                                    key={idx}
                                    className="gift-item"
                                    title={gift.name}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 + idx * 0.1, type: 'spring' }}
                                >{gift.emoji}</motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
