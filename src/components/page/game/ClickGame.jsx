import React, { useState, useEffect, useCallback, useRef } from 'react';
import LoginModal from '../RealEstateDetailPageItem/LoginModal/LoginModal';

const MetaTags = () => {
  return (
    <>
      <title>بازی مشاور املاکی | ضربه به مشاور - مشاوراملاکی</title>
      <meta name="description" content="بازی جذاب مشاور املاکی! هرچه سریع‌تر به مشاوران ضربه بزنید و امتیاز بگیرید. رکورد بزنید و با دوستان رقابت کنید." />
      <meta name="keywords" content="بازی مشاور املاکی, ضربه به مشاور, بازی کلیکی, مشاوراملاکی, بازی آنلاین" />
      <meta property="og:title" content="بازی ضربه به مشاور - مشاوراملاکی" />
      <meta property="og:description" content="به مشاوران املاکی ضربه بزنید و امتیاز جمع کنید!" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://your-site.com/click-game'} />
    </>
  );
};

// ================ API رتبه‌بندی ================
const leaderboardAPI = {
  getTopPlayers: async (limit = 10) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, name: 'علی محمدی', phone: '0912***1234', score: 28450, level: 15, time: '12:30', rank: 1 },
      { id: 2, name: 'سارا احمدی', phone: '0913***5678', score: 22340, level: 12, time: '15:20', rank: 2 },
      { id: 3, name: 'رضا کریمی', phone: '0914***9012', score: 18900, level: 10, time: '18:45', rank: 3 },
      { id: 4, name: 'مریم حسینی', phone: '0915***3456', score: 15200, level: 8, time: '22:10', rank: 4 },
      { id: 5, name: 'احمد نوری', phone: '0916***7890', score: 12800, level: 7, time: '25:30', rank: 5 },
    ];
  },
  getUserRank: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { rank: 3, score: 18900, level: 10, time: '18:45', totalPlayers: 5 };
  },
  submitScore: async (userId, score, level, time) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

// ================ کامپوننت اصلی ================
const ClickGame = () => {
  // ===== State های بازی =====
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [targets, setTargets] = useState([]);
  const [specialTarget, setSpecialTarget] = useState(null);
  const [particles, setParticles] = useState([]);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [bestTime, setBestTime] = useState(0);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  // ===== State های کاربر =====
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const gameLoopRef = useRef(null);
  const timerRef = useRef(null);

  // ===== بررسی لاگین =====
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
        loadUserRank(parsedUser.id);
      } catch (e) {}
    }
    
    const saved = localStorage.getItem('clickGameHighScore');
    if (saved) setHighScore(parseInt(saved));
    
    const savedTime = localStorage.getItem('clickGameBestTime');
    if (savedTime) setBestTime(parseInt(savedTime));
    
    loadLeaderboard();
  }, []);

  // ===== گوش دادن به تغییر لاگین =====
  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsLoggedIn(true);
          loadUserRank(parsedUser.id);
        } catch (e) {}
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setUserRank(null);
      }
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  // ===== توابع API =====
  const loadLeaderboard = async () => {
    setIsLoading(true);
    try {
      const data = await leaderboardAPI.getTopPlayers(10);
      setLeaderboard(data);
    } catch (error) {}
    setIsLoading(false);
  };

  const loadUserRank = async (userId) => {
    try {
      const data = await leaderboardAPI.getUserRank(userId);
      if (data) setUserRank(data);
    } catch (error) {}
  };

  // ===== توابع بازی =====
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateTargets = useCallback(() => {
    const count = Math.min(3 + Math.floor(level / 2), 8);
    const newTargets = [];
    const positions = [];
    
    for (let i = 0; i < count; i++) {
      let x, y, attempts = 0;
      do {
        x = 5 + Math.random() * 90;
        y = 5 + Math.random() * 80;
        attempts++;
      } while (
        attempts < 50 && 
        positions.some(p => Math.abs(p.x - x) < 20 && Math.abs(p.y - y) < 20)
      );
      
      positions.push({ x, y });
      newTargets.push({
        id: Date.now() + i,
        x,
        y,
        size: 50 + Math.random() * 20,
        speed: 0.5 + Math.random() * 1.5,
        direction: Math.random() * Math.PI * 2,
        points: 10 + Math.floor(Math.random() * 5) * 5,
        color: `hsl(${Math.random() * 60 + 170}, 70%, 50%)`,
        type: 'normal'
      });
    }
    
    // هدف ویژه
    if (Math.random() < 0.2 && !specialTarget) {
      setSpecialTarget({
        id: Date.now() + 999,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 70,
        size: 60,
        points: 50,
        color: '#ffd93d',
        type: 'special'
      });
    }
    
    setTargets(newTargets);
  }, [level, specialTarget]);

  const spawnParticles = useCallback((x, y, color, count = 15) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 1,
        color: color,
        size: 5 + Math.random() * 10,
        gravity: 0.1
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  const startGame = () => {
    setScore(0);
    setLevel(1);
    setCombo(0);
    setMaxCombo(0);
    setClicks(0);
    setTimeLeft(30);
    setTimer(0);
    setGameStarted(true);
    setGameOver(false);
    setScoreSubmitted(false);
    generateTargets();
    
    // تایمر بازی
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // تایمر زمان کلی
    gameLoopRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const handleClick = (e, target) => {
    if (!gameStarted || gameOver || isPaused) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const isSpecial = target.type === 'special';
    const points = isSpecial ? target.points : target.points * (1 + combo * 0.1);
    const finalPoints = Math.floor(points);
    
    setScore(prev => prev + finalPoints);
    setClicks(prev => prev + 1);
    setCombo(prev => {
      const newCombo = prev + 1;
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      return newCombo;
    });
    
    spawnParticles(x, y, target.color, isSpecial ? 30 : 15);
    
    // حذف هدف
    if (isSpecial) {
      setSpecialTarget(null);
    } else {
      setTargets(prev => prev.filter(t => t.id !== target.id));
    }
    
    // افزایش سطح
    if (clicks > 0 && clicks % 50 === 0) {
      setLevel(prev => {
        const newLevel = prev + 1;
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 2000);
        return newLevel;
      });
    }
    
    // تولید هدف جدید
    setTimeout(() => {
      if (!gameOver) generateTargets();
    }, 100);
  };

  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setCombo(0);
    setMaxCombo(0);
    setClicks(0);
    setTimeLeft(30);
    setTimer(0);
    setTargets([]);
    setSpecialTarget(null);
    setParticles([]);
    setScoreSubmitted(false);
    generateTargets();
  };

  // ===== ثبت امتیاز =====
  useEffect(() => {
    if (gameOver && score > 0 && isLoggedIn && user && !scoreSubmitted) {
      const timeStr = formatTime(timer);
      leaderboardAPI.submitScore(user.id, score, level, timeStr)
        .then(() => {
          setScoreSubmitted(true);
          loadLeaderboard();
          loadUserRank(user.id);
        });
    }
    
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('clickGameHighScore', score.toString());
    }
  }, [gameOver, score, isLoggedIn, user, timer, level, highScore, scoreSubmitted]);

  useEffect(() => {
    if (gameOver && timer > 0 && score > 0) {
      if (bestTime === 0 || timer < bestTime) {
        setBestTime(timer);
        localStorage.setItem('clickGameBestTime', timer.toString());
      }
    }
  }, [gameOver, timer, score, bestTime]);

  // ===== اشتراک‌گذاری =====
  const shareScore = () => {
    const timeStr = formatTime(timer);
    const text = `🖱️ من در بازی ضربه به مشاور به امتیاز ${score} در سطح ${level} و زمان ${timeStr} رسیدم!\nآیا میتونی رکورد من رو بزنی؟\nمشاوراملاکی`;
    
    if (navigator.share) {
      navigator.share({
        title: 'بازی ضربه به مشاور - مشاوراملاکی',
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text + '\n' + window.location.href);
      alert('✅ متن کپی شد!');
    }
  };

  // ============================================================
  // ===== رندر =====
  // ============================================================
  return (
    <>
      <MetaTags />
      
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={(userData) => {
            setUser(userData);
            setIsLoggedIn(true);
            loadUserRank(userData.id);
            loadLeaderboard();
          }}
          triggerSource="click_game"
          redirectTo="/games/click-game"
        />
      )}

      <div className="game-wrapper" dir="rtl">
        {/* ===== نوار بالایی ===== */}
        <div className="top-bar">
          <div className="user-section">
            {isLoggedIn && user ? (
              <div className="user-info">
                <span className="user-name">👤 {user.name || user.username}</span>
                {userRank && (
                  <span className="user-rank">🏅 رتبه #{userRank.rank}</span>
                )}
                <button 
                  className="logout-btn"
                  onClick={() => {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('user');
                    setIsLoggedIn(false);
                    setUser(null);
                    setUserRank(null);
                    window.dispatchEvent(new Event('authChange'));
                  }}
                >
                  خروج
                </button>
              </div>
            ) : (
              <button className="login-btn" onClick={() => setShowLoginModal(true)}>
                🔑 ورود / ثبت‌نام
              </button>
            )}
          </div>
          <button 
            className="leaderboard-toggle"
            onClick={() => setShowLeaderboard(!showLeaderboard)}
          >
            🏆 رتبه‌بندی
          </button>
        </div>

        {/* ===== پنل رتبه‌بندی ===== */}
        {showLeaderboard && (
          <div className="leaderboard-panel">
            <div className="leaderboard-header">
              <h3>🏆 برترین بازیکنان</h3>
              <button className="close-leaderboard" onClick={() => setShowLeaderboard(false)}>✖</button>
            </div>
            
            {isLoading ? (
              <div className="loading">در حال بارگذاری...</div>
            ) : (
              <>
                {isLoggedIn && userRank && (
                  <div className="user-rank-box">
                    <div className="user-rank-info">
                      <span>🌟 رتبه شما</span>
                      <span className="rank-number">#{userRank.rank}</span>
                      <span className="rank-score">امتیاز: {userRank.score}</span>
                    </div>
                  </div>
                )}

                <div className="leaderboard-list">
                  {leaderboard.map((player) => (
                    <div 
                      key={player.id} 
                      className={`leaderboard-item ${isLoggedIn && user?.id === player.id ? 'current-user' : ''}`}
                    >
                      <div className="rank">#{player.rank}</div>
                      <div className="player-info">
                        <div className="player-name">{player.name}</div>
                        <div className="player-details">
                          <span>امتیاز: {player.score}</span>
                          <span>سطح: {player.level}</span>
                          <span>⏱️ {player.time}</span>
                        </div>
                      </div>
                      {isLoggedIn ? (
                        <div className="player-phone">{player.phone}</div>
                      ) : (
                        <div className="player-phone locked">🔒 برای مشاهده وارد شوید</div>
                      )}
                    </div>
                  ))}
                </div>

                {!isLoggedIn && (
                  <div className="login-prompt">
                    <p>🔑 برای شرکت در مسابقه و کسب امتیاز، وارد حساب کاربری خود شوید</p>
                    <button className="login-prompt-btn" onClick={() => setShowLoginModal(true)}>
                      ورود / ثبت‌نام
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ===== بازی ===== */}
        <div className="game-container">
          <div className="header">
            <h1>
              <span className="game-icon">🖱️</span>
              ضربه به مشاور
            </h1>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">امتیاز</span>
                <span className="stat-value score">{score}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">بهترین</span>
                <span className="stat-value high-score">{highScore}</span>
              </div>
            </div>
          </div>

          <div className="game-info">
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <span className="info-value time">{timeLeft}s</span>
            </div>
            <div className="info-item">
              <span className="info-icon">🔥</span>
              <span className="info-value combo">x{combo}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">🏆</span>
              <span className="info-value level">سطح {level}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <span className="info-value timer">{formatTime(timer)}</span>
            </div>
          </div>

          {/* ===== بوم بازی ===== */}
          <div 
            className="game-board"
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1',
              background: 'linear-gradient(135deg, rgba(15,12,41,0.8), rgba(48,43,99,0.8))',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '2px solid rgba(255,255,255,0.05)'
            }}
          >
            {/* ذرات */}
            {particles.map((p, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  position: 'absolute',
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  borderRadius: '50%',
                  opacity: p.life,
                  transform: `scale(${p.life})`,
                  pointerEvents: 'none',
                  transition: 'all 0.05s linear'
                }}
              />
            ))}

            {/* هدف‌ها */}
            {targets.map(target => (
              <div
                key={target.id}
                className="target"
                onClick={(e) => handleClick(e, target)}
                style={{
                  position: 'absolute',
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                  width: `${target.size}px`,
                  height: `${target.size}px`,
                  background: `radial-gradient(circle, ${target.color}, ${target.color}dd)`,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  boxShadow: `0 0 30px ${target.color}66, inset 0 -4px 0 rgba(0,0,0,0.1)`,
                  transform: 'translate(-50%, -50%) scale(1)',
                  transition: 'transform 0.1s ease',
                  animation: 'float 2s ease-in-out infinite',
                  userSelect: 'none',
                  zIndex: target.type === 'special' ? 5 : 1,
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(0.85)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
              >
                {target.type === 'special' ? (
                  <span style={{ fontSize: '24px' }}>⭐</span>
                ) : (
                  <span>{target.points}</span>
                )}
              </div>
            ))}

            {/* هدف ویژه */}
            {specialTarget && (
              <div
                key={specialTarget.id}
                className="target special"
                onClick={(e) => handleClick(e, specialTarget)}
                style={{
                  position: 'absolute',
                  left: `${specialTarget.x}%`,
                  top: `${specialTarget.y}%`,
                  width: `${specialTarget.size}px`,
                  height: `${specialTarget.size}px`,
                  background: 'radial-gradient(circle, #ffd93d, #f6b93b)',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  boxShadow: '0 0 50px #ffd93d88, inset 0 -4px 0 rgba(0,0,0,0.1)',
                  transform: 'translate(-50%, -50%)',
                  animation: 'specialFloat 0.8s ease-in-out infinite',
                  userSelect: 'none',
                  zIndex: 5,
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(0.85)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
              >
                ⭐
              </div>
            )}

            {/* نمایشگر شروع */}
            {!gameStarted && !gameOver && (
              <div className="start-overlay">
                <div className="start-content">
                  <div className="start-icon">🖱️</div>
                  <h2>ضربه به مشاور</h2>
                  <p>هرچه سریع‌تر به مشاوران ضربه بزنید!</p>
                  <button className="start-btn" onClick={startGame}>
                    شروع بازی
                  </button>
                </div>
              </div>
            )}

            {/* نمایشگر مکث */}
            {isPaused && gameStarted && !gameOver && (
              <div className="pause-overlay">
                <div className="pause-icon">⏸️</div>
                <div className="pause-text">مکث</div>
              </div>
            )}

            {/* نمایشگر پایان بازی */}
            {gameOver && (
              <div className="game-over-overlay">
                <div className="game-over-content">
                  <div className="game-over-icon">🎯</div>
                  <h2>زمان تمام شد!</h2>
                  <div className="final-score">
                    امتیاز: <span>{score}</span>
                  </div>
                  <div className="final-stats">
                    <div>سطح: {level}</div>
                    <div>کلیک: {clicks}</div>
                    <div>کامبو: {maxCombo}</div>
                    <div>⏱️ {formatTime(timer)}</div>
                  </div>
                  {bestTime > 0 && (
                    <div className="best-time-display">🏅 بهترین زمان: {formatTime(bestTime)}</div>
                  )}
                  <div className="game-over-buttons">
                    <button className="play-again-btn" onClick={resetGame}>
                      بازی دوباره
                    </button>
                    {score > 0 && (
                      <button className="share-btn" onClick={shareScore}>
                        📤 اشتراک‌گذاری
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* نمایشگر افزایش سطح */}
            {showLevelUp && (
              <div className="level-up-overlay">
                <div className="level-up-text">
                  ⭐ سطح {level}!
                </div>
              </div>
            )}
          </div>

          {/* ===== کنترل‌ها ===== */}
          <div className="controls">
            {gameStarted && !gameOver && (
              <button 
                className="control-btn primary"
                onClick={() => setIsPaused(prev => !prev)}
              >
                {isPaused ? '▶ ادامه' : '⏸ مکث'}
              </button>
            )}
            <button className="control-btn secondary" onClick={resetGame}>
              🔄 بازی جدید
            </button>
          </div>

          <div className="info">
            <div className="instructions">
              <span>🖱️ روی مشاوران کلیک کنید</span>
              <span className="sep">|</span>
              <span>⭐ هدف‌های طلایی امتیاز بیشتر</span>
            </div>
          </div>
        </div>

        {/* ===== محتوای سئو ===== */}
        <div className="seo-content">
          <h2>بازی ضربه به مشاور املاکی</h2>
          <p>
            بازی ضربه به مشاور یک بازی کلیکی سرگرم‌کننده است که در سایت مشاوراملاکی طراحی شده 
            تا لحظات خوشی را برای شما به ارمغان بیاورد. با کلیک روی مشاوران، امتیاز جمع کنید و 
            رکوردهای جدید ثبت کنید!
          </p>
          
          <h3>ویژگی‌های بازی</h3>
          <ul>
            <li>🎯 کلیک سریع روی مشاوران</li>
            <li>⭐ هدف‌های ویژه با امتیاز بیشتر</li>
            <li>🔥 سیستم کامبو و افزایش سطح</li>
            <li>🏆 رتبه‌بندی و رقابت با دیگران</li>
            <li>📱 قابل بازی در موبایل و دسکتاپ</li>
          </ul>

          <h3>چطور بازی کنیم؟</h3>
          <ol>
            <li>روی مشاوران ظاهر شده کلیک کنید</li>
            <li>هر کلیک امتیاز می‌گیرید</li>
            <li>هدف‌های طلایی امتیاز بیشتری دارند</li>
            <li>با هر ۵۰ کلیک سطح شما افزایش می‌یابد</li>
          </ol>
          
          <div className="seo-tags">
            <span className="tag">#بازی_کلیکی</span>
            <span className="tag">#مشاور_املاکی</span>
            <span className="tag">#مشاوراملاکی</span>
            <span className="tag">#بازی_آنلاین</span>
          </div>
        </div>
      </div>

      {/* ===== استایل‌ها ===== */}
      <style jsx>{`
        .game-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
        }

        /* ===== نوار بالایی ===== */
        .top-bar {
          width: 100%;
          max-width: 600px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          margin-bottom: 10px;
          gap: 10px;
          flex-wrap: wrap;
          z-index: 2;
        }

        .user-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.05);
          padding: 6px 15px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          flex-wrap: wrap;
        }

        .user-name {
          color: #fff;
          font-size: 14px;
        }

        .user-rank {
          color: #ffd93d;
          font-size: 12px;
          background: rgba(255,217,61,0.15);
          padding: 2px 10px;
          border-radius: 12px;
        }

        .login-btn {
          background: linear-gradient(135deg, #4ecdc4, #44b39d);
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .login-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
        }

        .logout-btn {
          background: rgba(255,107,107,0.2);
          color: #ff6b6b;
          border: 1px solid rgba(255,107,107,0.3);
          padding: 4px 12px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.3s;
        }

        .logout-btn:hover {
          background: rgba(255,107,107,0.3);
        }

        .leaderboard-toggle {
          background: rgba(255,217,61,0.15);
          color: #ffd93d;
          border: 1px solid rgba(255,217,61,0.2);
          padding: 8px 18px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .leaderboard-toggle:hover {
          background: rgba(255,217,61,0.25);
          transform: scale(1.05);
        }

        /* ===== پنل رتبه‌بندی ===== */
        .leaderboard-panel {
          width: 100%;
          max-width: 600px;
          background: rgba(255,255,255,0.03);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.05);
          padding: 20px;
          margin-bottom: 15px;
          backdrop-filter: blur(10px);
          z-index: 2;
        }

        .leaderboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .leaderboard-header h3 {
          color: #ffd93d;
          font-size: 18px;
          margin: 0;
        }

        .close-leaderboard {
          background: none;
          border: none;
          color: rgba(255,255,255,0.3);
          font-size: 18px;
          cursor: pointer;
        }

        .close-leaderboard:hover {
          color: #fff;
        }

        .loading {
          color: rgba(255,255,255,0.5);
          text-align: center;
          padding: 20px;
        }

        .user-rank-box {
          background: linear-gradient(135deg, rgba(78,205,196,0.1), rgba(255,217,61,0.05));
          border: 1px solid rgba(78,205,196,0.2);
          border-radius: 12px;
          padding: 12px 20px;
          margin-bottom: 15px;
        }

        .user-rank-info {
          display: flex;
          align-items: center;
          gap: 15px;
          color: #fff;
        }

        .rank-number {
          font-size: 24px;
          font-weight: 700;
          color: #ffd93d;
        }

        .rank-score {
          color: rgba(255,255,255,0.6);
          font-size: 14px;
        }

        .leaderboard-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 400px;
          overflow-y: auto;
        }

        .leaderboard-list::-webkit-scrollbar {
          width: 4px;
        }

        .leaderboard-list::-webkit-scrollbar-thumb {
          background: rgba(78,205,196,0.3);
          border-radius: 10px;
        }

        .leaderboard-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 15px;
          background: rgba(255,255,255,0.03);
          border-radius: 10px;
          transition: background 0.3s;
          flex-wrap: wrap;
        }

        .leaderboard-item:hover {
          background: rgba(255,255,255,0.06);
        }

        .leaderboard-item.current-user {
          background: rgba(78,205,196,0.08);
          border: 1px solid rgba(78,205,196,0.15);
        }

        .rank {
          font-size: 14px;
          font-weight: 700;
          color: #ffd93d;
          min-width: 35px;
        }

        .player-info {
          flex: 1;
        }

        .player-name {
          color: #fff;
          font-size: 14px;
          font-weight: 600;
        }

        .player-details {
          display: flex;
          gap: 12px;
          color: rgba(255,255,255,0.4);
          font-size: 11px;
          flex-wrap: wrap;
        }

        .player-phone {
          color: rgba(255,255,255,0.5);
          font-size: 12px;
          direction: ltr;
        }

        .player-phone.locked {
          color: rgba(255,255,255,0.2);
          font-size: 11px;
        }

        .login-prompt {
          text-align: center;
          padding: 20px;
          margin-top: 15px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .login-prompt p {
          color: rgba(255,255,255,0.5);
          font-size: 14px;
          margin-bottom: 12px;
        }

        .login-prompt-btn {
          background: linear-gradient(135deg, #4ecdc4, #44b39d);
          color: white;
          border: none;
          padding: 10px 30px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .login-prompt-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
        }

        /* ===== کانتینر بازی ===== */
        .game-container {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 30px;
          max-width: 600px;
          width: 100%;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
          position: relative;
          z-index: 1;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .header h1 {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
          background: linear-gradient(135deg, #ffd93d, #f6b93b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .game-icon {
          -webkit-text-fill-color: initial;
        }

        .stats {
          display: flex;
          gap: 15px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-label {
          font-size: 10px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          letter-spacing: 1px;
        }

        .stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
        }

        .stat-value.score {
          color: #4ecdc4;
        }

        .stat-value.high-score {
          color: #ffd93d;
        }

        /* ===== اطلاعات بازی ===== */
        .game-info {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0,0,0,0.3);
          padding: 6px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .info-icon {
          font-size: 16px;
        }

        .info-value {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
        }

        .info-value.time {
          color: #ff6b6b;
        }

        .info-value.combo {
          color: #ffd93d;
        }

        .info-value.level {
          color: #4ecdc4;
        }

        .info-value.timer {
          color: #a29bfe;
        }

        /* ===== انیمیشن‌ها ===== */
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }

        @keyframes specialFloat {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }

        /* ===== اورلی‌ها ===== */
        .start-overlay,
        .pause-overlay,
        .game-over-overlay,
        .level-up-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(8px);
          border-radius: 16px;
          z-index: 10;
        }

        .start-content,
        .game-over-content {
          text-align: center;
          padding: 30px;
          animation: fadeInUp 0.5s ease;
        }

        .start-icon,
        .game-over-icon {
          font-size: 64px;
          margin-bottom: 10px;
        }

        .start-content h2 {
          font-size: 32px;
          color: #fff;
          margin: 10px 0;
        }

        .start-content p {
          color: rgba(255,255,255,0.6);
          margin: 10px 0 20px;
        }

        .game-over-content h2 {
          font-size: 32px;
          margin: 10px 0;
          color: #ff6b6b;
        }

        .final-score {
          font-size: 24px;
          color: #fff;
          margin: 10px 0;
        }

        .final-score span {
          color: #ffd93d;
          font-size: 32px;
        }

        .final-stats {
          display: flex;
          justify-content: center;
          gap: 20px;
          color: rgba(255,255,255,0.6);
          margin: 15px 0;
          flex-wrap: wrap;
        }

        .best-time-display {
          color: #ffd93d;
          font-size: 18px;
          margin: 10px 0;
        }

        .game-over-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .start-btn,
        .play-again-btn {
          padding: 12px 40px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #4ecdc4, #44b39d);
          color: white;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 10px;
        }

        .start-btn:hover,
        .play-again-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
        }

        .share-btn {
          padding: 12px 30px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #ffd93d, #f6b93b);
          color: #333;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 10px;
        }

        .share-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(255, 217, 61, 0.4);
        }

        .pause-icon {
          font-size: 56px;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .pause-text {
          color: #fff;
          font-size: 24px;
          font-weight: 700;
          margin-top: 10px;
        }

        .level-up-text {
          font-size: 48px;
          font-weight: 700;
          color: #ffd93d;
          text-shadow: 0 0 40px rgba(255, 217, 61, 0.5);
          animation: levelUpPop 0.5s ease;
        }

        /* ===== کنترل‌ها ===== */
        .controls {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .control-btn {
          padding: 10px 25px;
          font-size: 14px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
        }

        .control-btn.primary {
          background: linear-gradient(135deg, #4ecdc4, #44b39d);
          color: white;
          box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
        }

        .control-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
        }

        .control-btn.secondary {
          background: rgba(255,255,255,0.1);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .control-btn.secondary:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        .info {
          margin-top: 15px;
          text-align: center;
        }

        .instructions {
          display: flex;
          justify-content: center;
          gap: 10px;
          color: rgba(255,255,255,0.4);
          font-size: 13px;
          flex-wrap: wrap;
        }

        .sep {
          color: rgba(255,255,255,0.1);
        }

        /* ===== انیمیشن‌ها ===== */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes levelUpPop {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        /* ===== سئو ===== */
        .seo-content {
          max-width: 600px;
          width: 100%;
          margin-top: 30px;
          padding: 20px;
          background: rgba(255,255,255,0.03);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.8);
        }

        .seo-content h2 {
          color: #ffd93d;
          font-size: 22px;
          margin-bottom: 15px;
        }

        .seo-content h3 {
          color: #4ecdc4;
          font-size: 18px;
          margin-top: 20px;
          margin-bottom: 10px;
        }

        .seo-content p {
          line-height: 1.8;
          margin-bottom: 15px;
        }

        .seo-content ul, 
        .seo-content ol {
          padding-right: 20px;
          line-height: 2;
          margin-bottom: 15px;
        }

        .seo-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }

        .seo-tags .tag {
          background: rgba(78, 205, 196, 0.1);
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 12px;
          color: #4ecdc4;
          border: 1px solid rgba(78, 205, 196, 0.2);
        }

        /* ===== ریسپانسیو ===== */
        @media (max-width: 480px) {
          .game-container {
            padding: 15px;
          }

          .header h1 {
            font-size: 18px;
          }

          .stat-value {
            font-size: 16px;
          }

          .game-info {
            gap: 10px;
          }

          .info-item {
            padding: 4px 12px;
          }

          .info-value {
            font-size: 14px;
          }

          .final-stats {
            gap: 12px;
            font-size: 14px;
          }

          .top-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .user-section {
            justify-content: center;
          }

          .leaderboard-toggle {
            width: 100%;
            text-align: center;
          }

          .user-info {
            justify-content: center;
          }

          .leaderboard-item {
            flex-wrap: wrap;
            gap: 6px;
          }

          .player-details {
            flex-wrap: wrap;
            gap: 6px;
          }

          .seo-content {
            padding: 15px;
          }

          .seo-content h2 {
            font-size: 18px;
          }

          .seo-content h3 {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default ClickGame;