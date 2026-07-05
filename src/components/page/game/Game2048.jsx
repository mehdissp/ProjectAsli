
// ============================================================
// ===== Game2048.jsx - بازی ۲۰۴۸ =====
// ============================================================
import React, { useState, useEffect, useCallback, useRef } from 'react';
import LoginModal from '../RealEstateDetailPageItem/LoginModal/LoginModal';

// ================ متا تگ‌ها ================
const MetaTags = () => {
  return (
    <>
      <title>بازی ۲۰۴۸ | مشاوراملاکی - چالش هوش و دقت</title>
      <meta name="description" content="بازی معمایی ۲۰۴۸ با گرافیک زیبا و چالش‌های ذهنی. امتیاز بگیر، رکورد بزن و با دوستانت رقابت کن." />
      <meta name="keywords" content="بازی ۲۰۴۸, 2048, بازی معمایی, مشاوراملاکی, چالش ذهنی" />
      <meta property="og:title" content="بازی ۲۰۴۸ - مشاوراملاکی" />
      <meta property="og:description" content="بازی معمایی ۲۰۴۸ با گرافیک زیبا و چالش‌های ذهنی" />
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://your-site.com/game-2048'} />
    </>
  );
};

// ================ API رتبه‌بندی ================
const leaderboardAPI = {
  getTopPlayers: async (limit = 10) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, name: 'علی محمدی', phone: '0912***1234', score: 8192, level: 12, time: '12:30', rank: 1 },
      { id: 2, name: 'سارا احمدی', phone: '0913***5678', score: 4096, level: 10, time: '15:20', rank: 2 },
      { id: 3, name: 'رضا کریمی', phone: '0914***9012', score: 2048, level: 8, time: '18:45', rank: 3 },
    ];
  },
  getUserRank: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { rank: 2, score: 4096, level: 10, time: '15:20', totalPlayers: 3 };
  },
  submitScore: async (userId, score, level, time) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

const Game2048 = () => {
  const BOARD_SIZE = 4;
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [bestTime, setBestTime] = useState(0);
  const [moves, setMoves] = useState(0);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  // ===== State های کاربر =====
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const timerRef = useRef(null);

  // ===== بررسی لاگین =====
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsLoggedIn(true);
        loadUserRank(JSON.parse(userData).id);
      } catch (e) {}
    }
    
    const saved = localStorage.getItem('game2048HighScore');
    if (saved) setHighScore(parseInt(saved));
    
    const savedTime = localStorage.getItem('game2048BestTime');
    if (savedTime) setBestTime(parseInt(savedTime));
    
    loadLeaderboard();
    initializeGame();
  }, []);

  // ===== گوش دادن به تغییر لاگین =====
  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          const parsed = JSON.parse(userData);
          setUser(parsed);
          setIsLoggedIn(true);
          loadUserRank(parsed.id);
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

  // ===== توابع بازی ۲۰۴۸ =====
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const initializeGame = () => {
    const newGrid = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setTimer(0);
    setMoves(0);
    setScoreSubmitted(false);
    
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const addRandomTile = (grid) => {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) emptyCells.push([i, j]);
      }
    }
    if (emptyCells.length === 0) return;
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[row][col] = Math.random() < 0.9 ? 2 : 4;
  };

  const slideRow = (row) => {
    let newRow = row.filter(val => val !== 0);
    let merged = [];
    let scoreGain = 0;
    
    for (let i = 0; i < newRow.length; i++) {
      if (i + 1 < newRow.length && newRow[i] === newRow[i + 1]) {
        const mergedValue = newRow[i] * 2;
        merged.push(mergedValue);
        scoreGain += mergedValue;
        i++;
      } else {
        merged.push(newRow[i]);
      }
    }
    
    while (merged.length < 4) merged.push(0);
    return { row: merged, scoreGain };
  };

  const moveGrid = (direction) => {
    if (gameOver || isPaused || !gameStarted) return;
    
    let newGrid = grid.map(row => [...row]);
    let totalScore = 0;
    let moved = false;

    const processGrid = (grid, reverse) => {
      let newGrid = grid.map(row => [...row]);
      let score = 0;
      let hasMoved = false;

      for (let i = 0; i < 4; i++) {
        let row = reverse ? [...newGrid[i]].reverse() : [...newGrid[i]];
        const result = slideRow(row);
        const newRow = reverse ? result.row.reverse() : result.row;
        score += result.scoreGain;
        
        if (newRow.join(',') !== newGrid[i].join(',')) hasMoved = true;
        newGrid[i] = newRow;
      }
      
      return { grid: newGrid, score, moved: hasMoved };
    };

    const transpose = (grid) => {
      const newGrid = Array(4).fill(null).map(() => Array(4).fill(0));
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          newGrid[j][i] = grid[i][j];
        }
      }
      return newGrid;
    };

    let result;
    if (direction === 'LEFT') {
      result = processGrid(newGrid, false);
    } else if (direction === 'RIGHT') {
      result = processGrid(newGrid, true);
    } else if (direction === 'UP') {
      const transposed = transpose(newGrid);
      result = processGrid(transposed, false);
      newGrid = transpose(result.grid);
    } else if (direction === 'DOWN') {
      const transposed = transpose(newGrid);
      result = processGrid(transposed, true);
      newGrid = transpose(result.grid);
    }

    if (result.moved) {
      setMoves(prev => prev + 1);
      totalScore += result.score;
      setScore(prev => prev + result.score);
      
      if (score + result.score > highScore) {
        setHighScore(score + result.score);
        localStorage.setItem('game2048HighScore', (score + result.score).toString());
      }
      
      addRandomTile(newGrid);
      setGrid(newGrid);
      
      if (checkGameOver(newGrid)) {
        setGameOver(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }
  };

  const checkGameOver = (grid) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) return false;
        if (j < 3 && grid[i][j] === grid[i][j + 1]) return false;
        if (i < 3 && grid[i][j] === grid[i + 1][j]) return false;
      }
    }
    return true;
  };

  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    initializeGame();
  };

  // ===== ثبت امتیاز =====
  useEffect(() => {
    if (gameOver && score > 0 && isLoggedIn && user && !scoreSubmitted) {
      const timeStr = formatTime(timer);
      leaderboardAPI.submitScore(user.id, score, Math.floor(score / 1000) + 1, timeStr)
        .then(() => {
          setScoreSubmitted(true);
          loadLeaderboard();
          loadUserRank(user.id);
        });
    }
  }, [gameOver, score, isLoggedIn, user, timer, scoreSubmitted]);

  // ===== کنترل کیبورد =====
  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        e.preventDefault();
        const direction = key.replace('Arrow', '').toUpperCase();
        moveGrid(direction);
      }
      if (key === 'r' || key === 'R') resetGame();
      if (key === ' ' || key === 'Space') {
        e.preventDefault();
        if (gameStarted && !gameOver) setIsPaused(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveGrid, gameStarted, gameOver]);

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
          triggerSource="game_2048"
          redirectTo="/games/2048"
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
          <div className="actions">
            <button 
              className="leaderboard-toggle"
              onClick={() => setShowLeaderboard(!showLeaderboard)}
            >
              🏆 رتبه‌بندی
            </button>
            <button className="back-btn" onClick={() => window.location.href = '/games'}>
              ← بازگشت
            </button>
          </div>
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
            <h1>🔢 بازی ۲۰۴۸</h1>
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
              <span className="info-icon">🏆</span>
              <span className="info-value level">سطح {Math.floor(score / 1000) + 1}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">👆</span>
              <span className="info-value moves">{moves} حرکت</span>
            </div>
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <span className="info-value timer">{formatTime(timer)}</span>
            </div>
          </div>

          {/* ===== تخته بازی ===== */}
          <div className="board-wrapper">
            <div className="board">
              {grid.map((row, i) => (
                <div key={i} className="row">
                  {row.map((cell, j) => {
                    const value = cell;
                    let className = 'cell';
                    if (value > 0) className += ` cell-${value}`;
                    return (
                      <div key={`${i}-${j}`} className={className}>
                        {value > 0 ? value : ''}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* نمایشگر شروع */}
            {!gameStarted && (
              <div className="start-overlay">
                <div className="start-content">
                  <div className="start-icon">🔢</div>
                  <h2>بازی ۲۰۴۸</h2>
                  <p>با حرکت دادن کاشی‌ها به عدد ۲۰۴۸ برسید!</p>
                  <button className="start-btn" onClick={initializeGame}>
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
                  <h2>بازی تمام شد!</h2>
                  <div className="final-score">
                    امتیاز: <span>{score}</span>
                  </div>
                  <div className="final-stats">
                    <div>حرکات: {moves}</div>
                    <div>⏱️ {formatTime(timer)}</div>
                    <div>سطح: {Math.floor(score / 1000) + 1}</div>
                  </div>
                  {bestTime > 0 && (
                    <div className="best-time-display">🏅 بهترین زمان: {formatTime(bestTime)}</div>
                  )}
                  <div className="game-over-buttons">
                    <button className="play-again-btn" onClick={resetGame}>
                      بازی دوباره
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ===== دکمه‌های کنترل ===== */}
          <div className="controls">
            <button 
              className="control-btn primary"
              onClick={() => {
                if (gameStarted && !gameOver) setIsPaused(prev => !prev);
              }}
            >
              {isPaused ? '▶ ادامه' : '⏸ مکث'}
            </button>
            <button className="control-btn secondary" onClick={resetGame}>
              🔄 بازی جدید
            </button>
          </div>

          <div className="info">
            <div className="instructions">
              <span>⬆️⬇️⬅️➡️ حرکت</span>
              <span className="sep">|</span>
              <span>␣ مکث</span>
              <span className="sep">|</span>
              <span>R ریستارت</span>
            </div>
          </div>
        </div>

        {/* ===== محتوای سئو ===== */}
        <div className="seo-content">
          <h2>بازی ۲۰۴۸ - چالش هوش و دقت</h2>
          <p>
            بازی ۲۰۴۸ یکی از محبوب‌ترین بازی‌های معمایی است که در سایت مشاوراملاکی طراحی شده 
            تا ذهن شما را به چالش بکشد. با ترکیب کاشی‌ها به عدد ۲۰۴۸ برسید و رکوردهای جدید ثبت کنید!
          </p>
          
          <h3>چطور بازی کنیم؟</h3>
          <ol>
            <li>با کلیدهای جهت‌نما (↑ ↓ ← →) کاشی‌ها را حرکت دهید</li>
            <li>کاشی‌های همرنگ با هم ترکیب می‌شوند</li>
            <li>هدف رسیدن به عدد ۲۰۴۸ است</li>
            <li>هرچه عدد بزرگتر، امتیاز بیشتر</li>
          </ol>
          
          <div className="seo-tags">
            <span className="tag">#بازی_۲۰۴۸</span>
            <span className="tag">#بازی_معمایی</span>
            <span className="tag">#مشاوراملاکی</span>
            <span className="tag">#چالش_ذهنی</span>
          </div>
        </div>
      </div>

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

        .actions {
          display: flex;
          gap: 10px;
          align-items: center;
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

        .back-btn {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 18px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
        }

        .back-btn:hover {
          background: rgba(255,255,255,0.2);
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
          max-width: 500px;
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
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #a29bfe, #6c5ce7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
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
          font-size: 18px;
          font-weight: 700;
          color: #fff;
        }

        .stat-value.score {
          color: #a29bfe;
        }

        .stat-value.high-score {
          color: #ffd93d;
        }

        .game-info {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0,0,0,0.3);
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .info-icon {
          font-size: 14px;
        }

        .info-value {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
        }

        .info-value.level {
          color: #a29bfe;
        }
        .info-value.moves {
          color: #4ecdc4;
        }
        .info-value.timer {
          color: #ffd93d;
        }

        .board-wrapper {
          position: relative;
          background: rgba(0,0,0,0.3);
          border-radius: 16px;
          padding: 10px;
        }

        .board {
          display: flex;
          flex-direction: column;
          gap: 10px;
          aspect-ratio: 1;
        }

        .row {
          display: flex;
          gap: 10px;
          flex: 1;
        }

        .cell {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          transition: all 0.15s ease;
          font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
        }

        .cell-2 { background: #eee4da; color: #776e65; }
        .cell-4 { background: #ede0c8; color: #776e65; }
        .cell-8 { background: #f2b179; color: #f9f6f2; }
        .cell-16 { background: #f59563; color: #f9f6f2; }
        .cell-32 { background: #f67c5f; color: #f9f6f2; }
        .cell-64 { background: #f65e3b; color: #f9f6f2; }
        .cell-128 { background: #edcf72; color: #f9f6f2; font-size: 24px; }
        .cell-256 { background: #edcc61; color: #f9f6f2; font-size: 24px; }
        .cell-512 { background: #edc850; color: #f9f6f2; font-size: 24px; }
        .cell-1024 { background: #edc53f; color: #f9f6f2; font-size: 20px; }
        .cell-2048 { background: #edc22e; color: #f9f6f2; font-size: 20px; box-shadow: 0 0 30px rgba(237, 194, 46, 0.3); }
        .cell-4096 { background: #60d9b4; color: #f9f6f2; font-size: 18px; }
        .cell-8192 { background: #45c9a8; color: #f9f6f2; font-size: 18px; }

        /* ===== اورلی‌ها ===== */
        .start-overlay,
        .pause-overlay,
        .game-over-overlay {
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
          color: #a29bfe;
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
          background: linear-gradient(135deg, #a29bfe, #6c5ce7);
          color: white;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 10px;
        }

        .start-btn:hover,
        .play-again-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(162, 155, 254, 0.4);
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
          background: linear-gradient(135deg, #a29bfe, #6c5ce7);
          color: white;
          box-shadow: 0 4px 15px rgba(162, 155, 254, 0.3);
        }

        .control-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(162, 155, 254, 0.4);
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

        /* ===== سئو ===== */
        .seo-content {
          max-width: 500px;
          width: 100%;
          margin-top: 30px;
          padding: 20px;
          background: rgba(255,255,255,0.03);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.8);
        }

        .seo-content h2 {
          color: #a29bfe;
          font-size: 22px;
          margin-bottom: 15px;
        }

        .seo-content h3 {
          color: #ffd93d;
          font-size: 18px;
          margin-top: 20px;
          margin-bottom: 10px;
        }

        .seo-content p {
          line-height: 1.8;
          margin-bottom: 15px;
        }

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
          background: rgba(162, 155, 254, 0.1);
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 12px;
          color: #a29bfe;
          border: 1px solid rgba(162, 155, 254, 0.2);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

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

          .cell {
            font-size: 20px;
          }

          .cell-128, .cell-256, .cell-512 { font-size: 18px; }
          .cell-1024, .cell-2048 { font-size: 16px; }
          .cell-4096, .cell-8192 { font-size: 14px; }

          .top-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .user-section {
            justify-content: center;
          }

          .actions {
            justify-content: center;
          }

          .leaderboard-toggle,
          .back-btn {
            font-size: 12px;
            padding: 6px 14px;
          }
        }
      `}</style>
    </>
  );
};

export default Game2048;