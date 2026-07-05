// ============================================================
// ===== GameSelector.jsx - صفحه انتخاب بازی =====
// ============================================================
import React, { useState, useEffect } from 'react';
import SnakeGame from './SnakeGame '; // ✅ فاصله اضافی رو حذف کردم
import ClickGame from './ClickGame';
import Game2048 from './Game2048';

const GameSelector = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // بررسی وضعیت لاگین
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsLoggedIn(true);
      } catch (e) {}
    }

    // گوش دادن به تغییر لاگین
    const handleAuthChange = () => {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
          setIsLoggedIn(true);
        } catch (e) {}
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  // ===== اطلاعات بازی‌ها =====
  const games = [
    {
      id: 'snake',
      title: '🐍 مار استاد',
      description: 'بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته',
      icon: '🐍',
      color: '#4ecdc4',
      bgGradient: 'linear-gradient(135deg, #0f0c29, #302b63)',
      difficulty: 'متوسط',
      timePerRound: '1-3 دقیقه',
      players: '۱۲,۴۵۰ نفر',
      popular: true,
      seoScore: 85
    },
    {
      id: 'click',
      title: '🖱️ ضربه به مشاور',
      description: 'بازی کلیکی سریع و اعتیادآور برای افزایش تعامل کاربران',
      icon: '🖱️',
      color: '#ffd93d',
      bgGradient: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      difficulty: 'آسان',
      timePerRound: '۳۰ ثانیه',
      players: '۲۸,۷۵۰ نفر',
      popular: true,
      seoScore: 98
    },
    {
      id: '2048',
      title: '🔢 بازی ۲۰۴۸',
      description: 'بازی معمایی چالش‌برانگیز برای تقویت هوش و دقت',
      icon: '🔢',
      color: '#a29bfe',
      bgGradient: 'linear-gradient(135deg, #2d1b69, #11998e)',
      difficulty: 'سخت',
      timePerRound: '۵-۱۵ دقیقه',
      players: '۸,۹۲۰ نفر',
      popular: false,
      seoScore: 92
    }
  ];

  // ===== رندر بازی انتخاب شده =====
  const renderGame = () => {
    switch (selectedGame) {
      case 'snake':
        return <SnakeGame />;
      case 'click':
        return <ClickGame />;
      case '2048':
        return <Game2048 />;
      default:
        return null;
    }
  };

  // ===== صفحه انتخاب بازی =====
  const renderSelector = () => (
    <div className="selector-wrapper" dir="rtl">
      {/* هدر */}
      <div className="selector-header">
        <div className="header-content">
          <h1>🎮 مرکز بازی‌های مشاوراملاکی</h1>
          <p>بازی مورد نظر خود را انتخاب کنید و لحظات خوشی را تجربه کنید</p>
          {isLoggedIn && user && (
            <div className="user-badge">
              👋 خوش آمدید {user.name || user.username}
            </div>
          )}
        </div>
      </div>

      {/* کارت‌های بازی */}
      <div className="games-grid">
        {games.map((game) => (
          <div
            key={game.id}
            className={`game-card ${game.popular ? 'popular' : ''}`}
            onClick={() => setSelectedGame(game.id)}
            style={{ background: game.bgGradient }}
          >
            {game.popular && (
              <div className="popular-badge">🔥 محبوب</div>
            )}
            <div className="game-icon" style={{ color: game.color }}>
              {game.icon}
            </div>
            <h2 className="game-title">{game.title}</h2>
            <p className="game-description">{game.description}</p>
            
            <div className="game-stats">
              <div className="stat">
                <span className="stat-label">🎯 سختی</span>
                <span className="stat-value">{game.difficulty}</span>
              </div>
              <div className="stat">
                <span className="stat-label">⏱️ زمان</span>
                <span className="stat-value">{game.timePerRound}</span>
              </div>
              <div className="stat">
                <span className="stat-label">👥 بازیکنان</span>
                <span className="stat-value">{game.players}</span>
              </div>
              <div className="stat">
                <span className="stat-label">📊 امتیاز سئو</span>
                <span className="stat-value seo-score">{game.seoScore}%</span>
              </div>
            </div>

            <button className="play-button">
              🎯 شروع بازی
            </button>

            <div className="seo-badge">
              ⚡ تاثیر سئو: {game.seoScore}%
            </div>
          </div>
        ))}
      </div>

      {/* اطلاعات سئو */}
      <div className="seo-info">
        <h3>📈 چرا بازی‌ها برای سئو مفید هستند؟</h3>
        <div className="seo-benefits">
          <div className="benefit">
            <span>⏱️</span>
            <div>
              <h4>افزایش زمان ماندگاری</h4>
              <p>کاربران با بازی کردن بیشتر در سایت می‌مانند</p>
            </div>
          </div>
          <div className="benefit">
            <span>🔄</span>
            <div>
              <h4>کاهش نرخ پرش</h4>
              <p>بازی‌های جذاب کاربران را درگیر نگه می‌دارند</p>
            </div>
          </div>
          <div className="benefit">
            <span>📤</span>
            <div>
              <h4>افزایش اشتراک‌گذاری</h4>
              <p>کاربران رکوردهای خود را با دوستان به اشتراک می‌گذارند</p>
            </div>
          </div>
          <div className="benefit">
            <span>👤</span>
            <div>
              <h4>افزایش ثبت‌نام</h4>
              <p>برای ثبت رکوردها، کاربران ثبت‌نام می‌کنند</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .selector-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          padding: 40px 20px;
          font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
        }

        .selector-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .header-content h1 {
          font-size: 42px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #4ecdc4, #ffd93d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header-content p {
          color: rgba(255,255,255,0.6);
          font-size: 18px;
          margin-bottom: 15px;
        }

        .user-badge {
          display: inline-block;
          background: rgba(255,255,255,0.1);
          padding: 8px 24px;
          border-radius: 30px;
          color: #fff;
          font-size: 14px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .games-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .game-card {
          position: relative;
          padding: 35px 25px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .game-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%);
          pointer-events: none;
        }

        .game-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          border-color: rgba(255,255,255,0.2);
        }

        .game-card.popular {
          border-color: rgba(255,217,61,0.3);
        }

        .popular-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(135deg, #ffd93d, #f6b93b);
          color: #333;
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
        }

        .game-icon {
          font-size: 64px;
          margin-bottom: 15px;
          display: block;
        }

        .game-title {
          color: #fff;
          font-size: 24px;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .game-description {
          color: rgba(255,255,255,0.7);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .game-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 20px;
        }

        .stat {
          background: rgba(255,255,255,0.05);
          padding: 8px 12px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .stat-label {
          display: block;
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-value {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin-top: 2px;
        }

        .stat-value.seo-score {
          color: #4ecdc4;
        }

        .play-button {
          background: linear-gradient(135deg, #4ecdc4, #44b39d);
          border: none;
          color: white;
          padding: 12px 30px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
          font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
        }

        .play-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
        }

        .seo-badge {
          margin-top: 12px;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.05);
          padding: 4px 12px;
          border-radius: 20px;
          display: inline-block;
        }

        .seo-info {
          max-width: 1200px;
          margin: 50px auto 0;
          padding: 30px;
          background: rgba(255,255,255,0.03);
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .seo-info h3 {
          color: #fff;
          font-size: 24px;
          text-align: center;
          margin-bottom: 30px;
        }

        .seo-benefits {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .benefit {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 15px;
          background: rgba(255,255,255,0.03);
          border-radius: 16px;
          transition: all 0.3s;
        }

        .benefit:hover {
          background: rgba(255,255,255,0.06);
        }

        .benefit span {
          font-size: 32px;
          flex-shrink: 0;
        }

        .benefit h4 {
          color: #fff;
          font-size: 16px;
          margin: 0 0 5px 0;
        }

        .benefit p {
          color: rgba(255,255,255,0.5);
          font-size: 13px;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .games-grid {
            grid-template-columns: 1fr;
          }

          .header-content h1 {
            font-size: 28px;
          }

          .game-stats {
            grid-template-columns: 1fr 1fr;
          }

          .seo-benefits {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );

  // ============================================================
  // ===== رندر نهایی =====
  // ============================================================
  return selectedGame ? renderGame() : renderSelector();
};

export default GameSelector;