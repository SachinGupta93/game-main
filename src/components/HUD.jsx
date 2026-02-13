import React from 'react';
import './HUD.css';

export default function HUD({
    level, score, lives, room, timeLeft, maxTime,
    isPaused, soundEnabled, powerUps, hasShield, keysCount, warningCount,
    onTogglePause, onToggleSound, onShowAchievements, onUsePowerUp, onSkip
}) {
    const timerPercent = (timeLeft / maxTime) * 100;
    const timerUrgent = timeLeft <= 5;
    const timerCritical = timeLeft <= 3;

    return (
        <div className="hud">
            {/* Top Row */}
            <div className="hud-top">
                <div className="hud-left">
                    <div className="hud-stat hud-room">
                        <span className="hud-room-emoji">{room.emoji}</span>
                        <span className="hud-room-name">{room.name}</span>
                    </div>
                    <div className="hud-stat hud-level">
                        <span className="hud-label">LVL</span>
                        <span className="hud-value">{level}</span>
                    </div>
                </div>

                <div className="hud-center">
                    <div className={`hud-timer ${timerUrgent ? 'timer-urgent' : ''} ${timerCritical ? 'timer-critical' : ''}`}>
                        <div className="timer-ring-container">
                            <svg className="timer-ring" viewBox="0 0 40 40">
                                <circle
                                    className="timer-ring-bg"
                                    cx="20" cy="20" r="17"
                                    fill="none"
                                    strokeWidth="3"
                                />
                                <circle
                                    className="timer-ring-fill"
                                    cx="20" cy="20" r="17"
                                    fill="none"
                                    strokeWidth="3"
                                    strokeDasharray={`${timerPercent * 1.068} 106.8`}
                                    strokeDashoffset="0"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span className="timer-text">{timeLeft}</span>
                        </div>
                    </div>
                </div>

                <div className="hud-right">
                    {warningCount > 0 && (
                        <div className="hud-warning-indicator" title={`${warningCount} warning${warningCount !== 1 ? 's' : ''} received. ${3 - warningCount} remaining before termination.`}>
                            <span className="warning-icon">⚠️</span>
                            <span className="warning-count">{warningCount}/3</span>
                        </div>
                    )}
                    <div className="hud-stat hud-score">
                        <span className="hud-label">SCORE</span>
                        <span className="hud-value hud-score-value">{score.toLocaleString()}</span>
                    </div>
                    <div className="hud-lives">
                        {[...Array(3)].map((_, i) => (
                            <span key={i} className={`hud-heart ${i < lives ? 'heart-alive' : 'heart-dead'}`}>
                                {i < lives ? '❤️' : '🖤'}
                            </span>
                        ))}
                        {hasShield && <span className="hud-shield-status" title="Shield of Knowledge Active">🛡️</span>}
                        {keysCount > 0 && <span className="hud-keys-status" title="Magic Keys collected">🔑 {keysCount}</span>}
                    </div>
                </div>
            </div>

            {/* Control buttons */}
            <div className="hud-controls">
                <button
                    id="pause-toggle-btn"
                    className="hud-btn"
                    onClick={onTogglePause}
                    title={isPaused ? 'Resume' : 'Pause'}
                >
                    {isPaused ? '▶️' : '⏸️'}
                </button>
                <button
                    id="sound-toggle-btn"
                    className="hud-btn"
                    onClick={onToggleSound}
                    title={soundEnabled ? 'Mute' : 'Unmute'}
                >
                    {soundEnabled ? '🔊' : '🔇'}
                </button>
            </div>

            {/* Power-ups Actions */}
            <div className="hud-powerups">
                {/* Extra Time Button REMOVED as per request */}

                {/* Hint Button Removed as per request */}

                {/* Skip Button */}
                {powerUps.filter(p => p === 'skipQuestion').length > 0 && (
                    <button
                        className="powerup-btn powerup-skip"
                        onClick={onSkip}
                        title="Skip Information"
                    >
                        ⏭️ Skip <span className="powerup-count">{powerUps.filter(p => p === 'skipQuestion').length}</span>
                    </button>
                )}
            </div>
        </div>
    );
}
