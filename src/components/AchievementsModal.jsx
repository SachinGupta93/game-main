import './AchievementsModal.css';

export default function AchievementsModal({ achievements, unlocked, onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="achievements-panel" onClick={e => e.stopPropagation()}>
                <div className="achievements-header">
                    <h2>🏆 Achievements</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>
                <div className="achievements-grid">
                    {achievements.map(ach => {
                        const isUnlocked = unlocked.includes(ach.id);
                        return (
                            <div key={ach.id} className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                                <div className="ach-icon">{ach.icon}</div>
                                <div className="ach-info">
                                    <span className="ach-name">{ach.name}</span>
                                    <span className="ach-desc">{ach.description}</span>
                                </div>
                                {isUnlocked && <span className="ach-check">✓</span>}
                            </div>
                        );
                    })}
                </div>
                <div className="achievements-footer">
                    <span>{unlocked.length} / {achievements.length} Unlocked</span>
                </div>
            </div>
        </div>
    );
}
