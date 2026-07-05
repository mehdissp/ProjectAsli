
// // // // // import React, { useState, useEffect, useCallback, useRef } from 'react';

// // // // // const SnakeGame = () => {
// // // // //   const BOARD_SIZE = 20;
// // // // //   const INITIAL_SNAKE = [
// // // // //     [10, 10],
// // // // //     [10, 9],
// // // // //     [10, 8],
// // // // //   ];
// // // // //   const INITIAL_DIRECTION = 'RIGHT';

// // // // //   const [snake, setSnake] = useState(INITIAL_SNAKE);
// // // // //   const [direction, setDirection] = useState(INITIAL_DIRECTION);
// // // // //   const [food, setFood] = useState(null);
// // // // //   const [gameOver, setGameOver] = useState(false);
// // // // //   const [score, setScore] = useState(0);
// // // // //   const [highScore, setHighScore] = useState(0);
// // // // //   const [isPaused, setIsPaused] = useState(false);
// // // // //   const [gameStarted, setGameStarted] = useState(false);
// // // // //   const [level, setLevel] = useState(1);
// // // // //   const [combo, setCombo] = useState(0);
// // // // //   const [showLevelUp, setShowLevelUp] = useState(false);
// // // // //   const [particles, setParticles] = useState([]);
// // // // //   const [speed, setSpeed] = useState(150);
// // // // //   const [foodEaten, setFoodEaten] = useState(0);
// // // // //   const [specialFood, setSpecialFood] = useState(null);
// // // // //   const [specialFoodTimer, setSpecialFoodTimer] = useState(null);

// // // // //   const canvasRef = useRef(null);
// // // // //   const gameLoopRef = useRef(null);
// // // // //   const animationFrameRef = useRef(null);

// // // // //   // بارگذاری امتیاز برتر از حافظه
// // // // //   useEffect(() => {
// // // // //     const saved = localStorage.getItem('snakeHighScore');
// // // // //     if (saved) setHighScore(parseInt(saved));
// // // // //   }, []);

// // // // //   // ذخیره امتیاز برتر
// // // // //   useEffect(() => {
// // // // //     if (score > highScore) {
// // // // //       setHighScore(score);
// // // // //       localStorage.setItem('snakeHighScore', score.toString());
// // // // //     }
// // // // //   }, [score, highScore]);

// // // // //   const generateFood = useCallback((currentSnake) => {
// // // // //     const maxAttempts = 1000;
// // // // //     for (let i = 0; i < maxAttempts; i++) {
// // // // //       const newFood = [
// // // // //         Math.floor(Math.random() * BOARD_SIZE),
// // // // //         Math.floor(Math.random() * BOARD_SIZE),
// // // // //       ];
// // // // //       if (!currentSnake.some(segment => 
// // // // //         segment[0] === newFood[0] && segment[1] === newFood[1]
// // // // //       ) && !(specialFood && specialFood[0] === newFood[0] && specialFood[1] === newFood[1])) {
// // // // //         return newFood;
// // // // //       }
// // // // //     }
// // // // //     return null;
// // // // //   }, [BOARD_SIZE, specialFood]);

// // // // //   const generateSpecialFood = useCallback((currentSnake) => {
// // // // //     if (Math.random() > 0.15 || specialFood) return;
// // // // //     const maxAttempts = 1000;
// // // // //     for (let i = 0; i < maxAttempts; i++) {
// // // // //       const newFood = [
// // // // //         Math.floor(Math.random() * BOARD_SIZE),
// // // // //         Math.floor(Math.random() * BOARD_SIZE),
// // // // //       ];
// // // // //       if (!currentSnake.some(segment => 
// // // // //         segment[0] === newFood[0] && segment[1] === newFood[1]
// // // // //       ) && !(food && food[0] === newFood[0] && food[1] === newFood[1])) {
// // // // //         setSpecialFood(newFood);
// // // // //         setSpecialFoodTimer(Date.now() + 5000);
// // // // //         return;
// // // // //       }
// // // // //     }
// // // // //   }, [food, specialFood]);

// // // // //   const spawnParticles = useCallback((x, y, color, count = 12) => {
// // // // //     const newParticles = [];
// // // // //     for (let i = 0; i < count; i++) {
// // // // //       const angle = Math.random() * Math.PI * 2;
// // // // //       const speed = 1 + Math.random() * 3;
// // // // //       newParticles.push({
// // // // //         x: x * 25 + 12.5,
// // // // //         y: y * 25 + 12.5,
// // // // //         vx: Math.cos(angle) * speed,
// // // // //         vy: Math.sin(angle) * speed,
// // // // //         life: 1,
// // // // //         color: color,
// // // // //         size: 3 + Math.random() * 4,
// // // // //       });
// // // // //     }
// // // // //     setParticles(prev => [...prev, ...newParticles]);
// // // // //   }, []);

// // // // //   const resetGame = useCallback(() => {
// // // // //     setSnake(INITIAL_SNAKE);
// // // // //     setDirection(INITIAL_DIRECTION);
// // // // //     setGameOver(false);
// // // // //     setScore(0);
// // // // //     setIsPaused(false);
// // // // //     setGameStarted(false);
// // // // //     setLevel(1);
// // // // //     setCombo(0);
// // // // //     setFoodEaten(0);
// // // // //     setSpeed(150);
// // // // //     setSpecialFood(null);
// // // // //     setSpecialFoodTimer(null);
// // // // //     setParticles([]);
// // // // //     const newFood = generateFood(INITIAL_SNAKE);
// // // // //     if (newFood) setFood(newFood);
// // // // //   }, [generateFood]);

// // // // //   const moveSnake = useCallback(() => {
// // // // //     if (gameOver || isPaused || !gameStarted) return;

// // // // //     setSnake(prevSnake => {
// // // // //       const newSnake = [...prevSnake];
// // // // //       const head = newSnake[0];
// // // // //       let newHead;

// // // // //       switch (direction) {
// // // // //         case 'UP': newHead = [head[0] - 1, head[1]]; break;
// // // // //         case 'DOWN': newHead = [head[0] + 1, head[1]]; break;
// // // // //         case 'LEFT': newHead = [head[0], head[1] - 1]; break;
// // // // //         case 'RIGHT': newHead = [head[0], head[1] + 1]; break;
// // // // //         default: return prevSnake;
// // // // //       }

// // // // //       // برخورد با دیوار
// // // // //       if (
// // // // //         newHead[0] < 0 || newHead[0] >= BOARD_SIZE ||
// // // // //         newHead[1] < 0 || newHead[1] >= BOARD_SIZE
// // // // //       ) {
// // // // //         setGameOver(true);
// // // // //         spawnParticles(head[0], head[1], '#ff6b6b', 20);
// // // // //         return prevSnake;
// // // // //       }

// // // // //       const snakeWithoutTail = newSnake.slice(0, -1);
// // // // //       if (snakeWithoutTail.some(segment => 
// // // // //         segment[0] === newHead[0] && segment[1] === newHead[1]
// // // // //       )) {
// // // // //         setGameOver(true);
// // // // //         spawnParticles(head[0], head[1], '#ff6b6b', 20);
// // // // //         return prevSnake;
// // // // //       }

// // // // //       let newSnakeMoved = [newHead, ...snakeWithoutTail];
// // // // //       let ateFood = false;

// // // // //       // غذای معمولی
// // // // //       if (food && newHead[0] === food[0] && newHead[1] === food[1]) {
// // // // //         ateFood = true;
// // // // //         setFoodEaten(prev => prev + 1);
// // // // //         setCombo(prev => prev + 1);
        
// // // // //         const points = 10 + combo * 2;
// // // // //         setScore(prev => prev + points);
// // // // //         spawnParticles(food[0], food[1], '#4ecdc4', 15);

// // // // //         const newFood = generateFood(newSnakeMoved);
// // // // //         if (newFood) {
// // // // //           setFood(newFood);
// // // // //           generateSpecialFood(newSnakeMoved);
// // // // //         } else {
// // // // //           setGameOver(true);
// // // // //           return newSnakeMoved;
// // // // //         }

// // // // //         // افزایش سطح
// // // // //         if (foodEaten > 0 && foodEaten % 5 === 0) {
// // // // //           setLevel(prev => prev + 1);
// // // // //           setSpeed(prev => Math.max(60, prev - 10));
// // // // //           setShowLevelUp(true);
// // // // //           setTimeout(() => setShowLevelUp(false), 2000);
// // // // //         }
// // // // //       }

// // // // //       // غذای ویژه
// // // // //       if (specialFood && newHead[0] === specialFood[0] && newHead[1] === specialFood[1]) {
// // // // //         ateFood = true;
// // // // //         setScore(prev => prev + 50);
// // // // //         spawnParticles(specialFood[0], specialFood[1], '#ffd93d', 25);
// // // // //         setSpecialFood(null);
// // // // //         setSpecialFoodTimer(null);
// // // // //       }

// // // // //       if (ateFood) {
// // // // //         return [newHead, ...newSnake];
// // // // //       }

// // // // //       return newSnakeMoved;
// // // // //     });
// // // // //   }, [direction, food, gameOver, isPaused, gameStarted, generateFood, specialFood, combo, foodEaten, spawnParticles]);

// // // // //   // حلقه بازی با سرعت پویا
// // // // //   useEffect(() => {
// // // // //     if (gameOver || !gameStarted || isPaused) {
// // // // //       if (gameLoopRef.current) {
// // // // //         clearInterval(gameLoopRef.current);
// // // // //         gameLoopRef.current = null;
// // // // //       }
// // // // //       return;
// // // // //     }

// // // // //     if (gameLoopRef.current) {
// // // // //       clearInterval(gameLoopRef.current);
// // // // //     }

// // // // //     gameLoopRef.current = setInterval(moveSnake, speed);
// // // // //     return () => {
// // // // //       if (gameLoopRef.current) {
// // // // //         clearInterval(gameLoopRef.current);
// // // // //         gameLoopRef.current = null;
// // // // //       }
// // // // //     };
// // // // //   }, [moveSnake, gameOver, gameStarted, isPaused, speed]);

// // // // //   // تایمر غذای ویژه
// // // // //   useEffect(() => {
// // // // //     if (!specialFoodTimer) return;
// // // // //     const checkTimer = setInterval(() => {
// // // // //       if (specialFood && Date.now() > specialFoodTimer) {
// // // // //         setSpecialFood(null);
// // // // //         setSpecialFoodTimer(null);
// // // // //       }
// // // // //     }, 100);
// // // // //     return () => clearInterval(checkTimer);
// // // // //   }, [specialFood, specialFoodTimer]);

// // // // //   // انیمیشن ذرات
// // // // //   useEffect(() => {
// // // // //     const animateParticles = () => {
// // // // //       setParticles(prev => 
// // // // //         prev
// // // // //           .map(p => ({
// // // // //             ...p,
// // // // //             x: p.x + p.vx,
// // // // //             y: p.y + p.vy,
// // // // //             life: p.life - 0.02,
// // // // //             vy: p.vy + 0.05,
// // // // //           }))
// // // // //           .filter(p => p.life > 0)
// // // // //       );
// // // // //       animationFrameRef.current = requestAnimationFrame(animateParticles);
// // // // //     };

// // // // //     animateParticles();
// // // // //     return () => {
// // // // //       if (animationFrameRef.current) {
// // // // //         cancelAnimationFrame(animationFrameRef.current);
// // // // //       }
// // // // //     };
// // // // //   }, []);

// // // // //   // کنترل‌های کیبورد
// // // // //   useEffect(() => {
// // // // //     const handleKeyPress = (e) => {
// // // // //       const key = e.key;
      
// // // // //       if (key === ' ' || key === 'Space') {
// // // // //         e.preventDefault();
// // // // //         if (!gameStarted && !gameOver) {
// // // // //           setGameStarted(true);
// // // // //         } else if (!gameOver) {
// // // // //           setIsPaused(prev => !prev);
// // // // //         }
// // // // //         return;
// // // // //       }

// // // // //       if (key === 'r' || key === 'R') {
// // // // //         resetGame();
// // // // //         return;
// // // // //       }

// // // // //       if (!gameStarted || gameOver || isPaused) return;

// // // // //       const oppositeDirections = {
// // // // //         'UP': 'DOWN',
// // // // //         'DOWN': 'UP',
// // // // //         'LEFT': 'RIGHT',
// // // // //         'RIGHT': 'LEFT'
// // // // //       };

// // // // //       let newDirection = null;
// // // // //       switch (key) {
// // // // //         case 'ArrowUp': newDirection = 'UP'; break;
// // // // //         case 'ArrowDown': newDirection = 'DOWN'; break;
// // // // //         case 'ArrowLeft': newDirection = 'RIGHT'; break;
// // // // //         case 'ArrowRight': newDirection = 'LEFT'; break;
// // // // //         default: return;
// // // // //       }

// // // // //       e.preventDefault();
// // // // //       if (newDirection && oppositeDirections[newDirection] !== direction) {
// // // // //         setDirection(newDirection);
// // // // //       }
// // // // //     };

// // // // //     window.addEventListener('keydown', handleKeyPress);
// // // // //     return () => window.removeEventListener('keydown', handleKeyPress);
// // // // //   }, [direction, gameStarted, gameOver, isPaused, resetGame]);

// // // // //   // کنترل‌های لمسی برای موبایل
// // // // //   const [touchStart, setTouchStart] = useState(null);
// // // // //   const handleTouchStart = (e) => {
// // // // //     const touch = e.touches[0];
// // // // //     setTouchStart({ x: touch.clientX, y: touch.clientY });
// // // // //   };

// // // // //   const handleTouchEnd = (e) => {
// // // // //     if (!touchStart) return;
// // // // //     const touch = e.changedTouches[0];
// // // // //     const dx = touch.clientX - touchStart.x;
// // // // //     const dy = touch.clientY - touchStart.y;
    
// // // // //     if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
// // // // //       if (!gameStarted && !gameOver) {
// // // // //         setGameStarted(true);
// // // // //       } else if (!gameOver) {
// // // // //         setIsPaused(prev => !prev);
// // // // //       }
// // // // //       return;
// // // // //     }

// // // // //     if (Math.abs(dx) > Math.abs(dy)) {
// // // // //       if (dx > 0 && direction !== 'LEFT') setDirection('RIGHT');
// // // // //       else if (dx < 0 && direction !== 'RIGHT') setDirection('LEFT');
// // // // //     } else {
// // // // //       if (dy > 0 && direction !== 'UP') setDirection('DOWN');
// // // // //       else if (dy < 0 && direction !== 'DOWN') setDirection('UP');
// // // // //     }
// // // // //     setTouchStart(null);
// // // // //   };

// // // // //   const renderBoard = () => {
// // // // //     const cells = [];
// // // // //     for (let row = 0; row < BOARD_SIZE; row++) {
// // // // //       for (let col = 0; col < BOARD_SIZE; col++) {
// // // // //         const isSnake = snake.some(segment => segment[0] === row && segment[1] === col);
// // // // //         const isFood = food && food[0] === row && food[1] === col;
// // // // //         const isSpecial = specialFood && specialFood[0] === row && specialFood[1] === col;
// // // // //         const isHead = snake[0] && snake[0][0] === row && snake[0][1] === col;
// // // // //         const isTail = snake[snake.length - 1] && 
// // // // //           snake[snake.length - 1][0] === row && 
// // // // //           snake[snake.length - 1][1] === col;

// // // // //         let className = 'cell';
// // // // //         if (isSnake) className += ' snake';
// // // // //         if (isHead) className += ' head';
// // // // //         if (isTail) className += ' tail';
// // // // //         if (isFood) className += ' food';
// // // // //         if (isSpecial) className += ' special-food';

// // // // //         const style = {};
// // // // //         if (isSnake && !isHead) {
// // // // //           const index = snake.findIndex(seg => seg[0] === row && seg[1] === col);
// // // // //           const gradient = `hsl(${170 + index * 5}, 70%, ${45 + index * 1.5}%)`;
// // // // //           style.background = gradient;
// // // // //         }

// // // // //         cells.push(
// // // // //           <div key={`${row}-${col}`} className={className} style={style} />
// // // // //         );
// // // // //       }
// // // // //     }
// // // // //     return cells;
// // // // //   };

// // // // //   return (
// // // // //     <div className="game-wrapper" dir="rtl">
// // // // //       {/* افکت‌های پس‌زمینه */}
// // // // //       <div className="bg-particles" />
// // // // //       <div className="bg-grid" />

// // // // //       <div className="game-container">
// // // // //         {/* هدر */}
// // // // //         <div className="header">
// // // // //           <div className="header-left">
// // // // //             <h1>
// // // // //               <span className="snake-icon">🐍</span>
// // // // //               مار استاد
// // // // //             </h1>
// // // // //             <div className="level-badge">
// // // // //               <span>🏆</span>
// // // // //               <span>سطح {level}</span>
// // // // //             </div>
// // // // //           </div>
// // // // //           <div className="stats">
// // // // //             <div className="stat-item">
// // // // //               <span className="stat-label">امتیاز</span>
// // // // //               <span className="stat-value">{score}</span>
// // // // //             </div>
// // // // //             <div className="stat-item">
// // // // //               <span className="stat-label">بهترین</span>
// // // // //               <span className="stat-value high-score">{highScore}</span>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* صفحه بازی */}
// // // // //         <div className="board-wrapper">
// // // // //           <div 
// // // // //             className="board"
// // // // //             onTouchStart={handleTouchStart}
// // // // //             onTouchEnd={handleTouchEnd}
// // // // //             style={{
// // // // //               display: 'grid',
// // // // //               gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
// // // // //               gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
// // // // //               gap: '2px',
// // // // //               backgroundColor: 'rgba(255,255,255,0.05)',
// // // // //               padding: '12px',
// // // // //               borderRadius: '16px',
// // // // //               position: 'relative',
// // // // //             }}
// // // // //           >
// // // // //             {renderBoard()}

// // // // //             {/* لایه ذرات */}
// // // // //             {particles.map((p, i) => (
// // // // //               <div
// // // // //                 key={i}
// // // // //                 className="particle"
// // // // //                 style={{
// // // // //                   position: 'absolute',
// // // // //                   left: p.x,
// // // // //                   top: p.y,
// // // // //                   width: p.size,
// // // // //                   height: p.size,
// // // // //                   background: p.color,
// // // // //                   borderRadius: '50%',
// // // // //                   opacity: p.life,
// // // // //                   transform: `scale(${p.life})`,
// // // // //                   pointerEvents: 'none',
// // // // //                 }}
// // // // //               />
// // // // //             ))}

// // // // //             {/* اعلان افزایش سطح */}
// // // // //             {showLevelUp && (
// // // // //               <div className="level-up-overlay">
// // // // //                 <div className="level-up-text">
// // // // //                   ⭐ سطح {level}!
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}

// // // // //             {/* صفحه پایان بازی */}
// // // // //             {gameOver && (
// // // // //               <div className="game-over-overlay">
// // // // //                 <div className="game-over-content">
// // // // //                   <div className="game-over-icon">💀</div>
// // // // //                   <h2>بازی تمام شد!</h2>
// // // // //                   <div className="final-score">
// // // // //                     امتیاز: <span>{score}</span>
// // // // //                   </div>
// // // // //                   <div className="final-stats">
// // // // //                     <div>سطح: {level}</div>
// // // // //                     <div>غذا: {foodEaten}</div>
// // // // //                   </div>
// // // // //                   <button className="play-again-btn" onClick={resetGame}>
// // // // //                     بازی دوباره
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}

// // // // //             {/* صفحه مکث */}
// // // // //             {isPaused && !gameOver && gameStarted && (
// // // // //               <div className="pause-overlay">
// // // // //                 <div className="pause-icon">⏸️</div>
// // // // //                 <div className="pause-text">مکث</div>
// // // // //               </div>
// // // // //             )}

// // // // //             {/* صفحه شروع */}
// // // // //             {!gameStarted && !gameOver && (
// // // // //               <div className="start-overlay">
// // // // //                 <div className="start-content">
// // // // //                   <div className="start-icon">🐍</div>
// // // // //                   <h2>مار استاد</h2>
// // // // //                   <p>برای شروع دکمه <strong>Space</strong> یا کلیک کن</p>
// // // // //                   <button className="start-btn" onClick={() => setGameStarted(true)}>
// // // // //                     شروع بازی
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* دکمه‌های کنترل */}
// // // // //         <div className="controls">
// // // // //           <button 
// // // // //             className="control-btn primary"
// // // // //             onClick={() => {
// // // // //               if (!gameStarted && !gameOver) {
// // // // //                 setGameStarted(true);
// // // // //               } else if (!gameOver) {
// // // // //                 setIsPaused(prev => !prev);
// // // // //               }
// // // // //             }}
// // // // //           >
// // // // //             {!gameStarted ? '▶ شروع' : isPaused ? '▶ ادامه' : '⏸ مکث'}
// // // // //           </button>
// // // // //           <button className="control-btn secondary" onClick={resetGame}>
// // // // //             🔄 بازی جدید
// // // // //           </button>
// // // // //         </div>

// // // // //         {/* کنترل‌های موبایل */}
// // // // //         <div className="mobile-controls">
// // // // //           <div className="dpad">
// // // // //             <button className="dpad-btn up" onClick={() => direction !== 'DOWN' && setDirection('UP')}>
// // // // //               ▲
// // // // //             </button>
// // // // //             <button className="dpad-btn down" onClick={() => direction !== 'UP' && setDirection('DOWN')}>
// // // // //               ▼
// // // // //             </button>
// // // // //             <button className="dpad-btn left" onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}>
// // // // //               ◄
// // // // //             </button>
// // // // //             <button className="dpad-btn right" onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}>
// // // // //               ►
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* اطلاعات */}
// // // // //         <div className="info">
// // // // //           <div className="combo-display">
// // // // //             {combo > 1 && <span className="combo-text">🔥 کامبو x{combo}</span>}
// // // // //           </div>
// // // // //           <div className="instructions">
// // // // //             <span>↑ ↓ ← →</span>
// // // // //             <span className="sep">|</span>
// // // // //             <span>␣ مکث</span>
// // // // //             <span className="sep">|</span>
// // // // //             <span>R ریستارت</span>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <style jsx>{`
// // // // //         .game-wrapper {
// // // // //           min-height: 100vh;
// // // // //           background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           justify-content: center;
// // // // //           padding: 20px;
// // // // //           position: relative;
// // // // //           overflow: hidden;
// // // // //           font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // // //         }

// // // // //         .bg-particles {
// // // // //           position: absolute;
// // // // //           width: 100%;
// // // // //           height: 100%;
// // // // //           background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
// // // // //                             radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
// // // // //                             radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
// // // // //                             radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
// // // // //                             radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0));
// // // // //           background-size: 200px 200px;
// // // // //           opacity: 0.3;
// // // // //         }

// // // // //         .bg-grid {
// // // // //           position: absolute;
// // // // //           width: 100%;
// // // // //           height: 100%;
// // // // //           background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
// // // // //                             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
// // // // //           background-size: 50px 50px;
// // // // //         }

// // // // //         .game-container {
// // // // //           background: rgba(255,255,255,0.05);
// // // // //           backdrop-filter: blur(20px);
// // // // //           border-radius: 24px;
// // // // //           padding: 30px;
// // // // //           max-width: 600px;
// // // // //           width: 100%;
// // // // //           border: 1px solid rgba(255,255,255,0.1);
// // // // //           box-shadow: 0 25px 50px rgba(0,0,0,0.5);
// // // // //           position: relative;
// // // // //           z-index: 1;
// // // // //         }

// // // // //         .header {
// // // // //           display: flex;
// // // // //           justify-content: space-between;
// // // // //           align-items: center;
// // // // //           margin-bottom: 20px;
// // // // //           flex-wrap: wrap;
// // // // //           gap: 10px;
// // // // //         }

// // // // //         .header-left {
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           gap: 12px;
// // // // //         }

// // // // //         .header h1 {
// // // // //           margin: 0;
// // // // //           font-size: 22px;
// // // // //           font-weight: 700;
// // // // //           background: linear-gradient(135deg, #4ecdc4, #44d4b4);
// // // // //           -webkit-background-clip: text;
// // // // //           -webkit-text-fill-color: transparent;
// // // // //           letter-spacing: -0.5px;
// // // // //         }

// // // // //         .snake-icon {
// // // // //           -webkit-text-fill-color: initial;
// // // // //         }

// // // // //         .level-badge {
// // // // //           background: rgba(78, 205, 196, 0.15);
// // // // //           padding: 4px 12px;
// // // // //           border-radius: 20px;
// // // // //           font-size: 12px;
// // // // //           color: #4ecdc4;
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           gap: 4px;
// // // // //           border: 1px solid rgba(78, 205, 196, 0.2);
// // // // //         }

// // // // //         .stats {
// // // // //           display: flex;
// // // // //           gap: 15px;
// // // // //         }

// // // // //         .stat-item {
// // // // //           display: flex;
// // // // //           flex-direction: column;
// // // // //           align-items: center;
// // // // //         }

// // // // //         .stat-label {
// // // // //           font-size: 10px;
// // // // //           text-transform: uppercase;
// // // // //           color: rgba(255,255,255,0.4);
// // // // //           letter-spacing: 1px;
// // // // //         }

// // // // //         .stat-value {
// // // // //           font-size: 20px;
// // // // //           font-weight: 700;
// // // // //           color: #fff;
// // // // //         }

// // // // //         .stat-value.high-score {
// // // // //           color: #ffd93d;
// // // // //         }

// // // // //         .board-wrapper {
// // // // //           position: relative;
// // // // //         }

// // // // //         .board {
// // // // //           width: 100%;
// // // // //           aspect-ratio: 1;
// // // // //           margin: 0 auto;
// // // // //           position: relative;
// // // // //           background: rgba(0,0,0,0.3);
// // // // //           border-radius: 16px;
// // // // //         }

// // // // //         .cell {
// // // // //           width: 100%;
// // // // //           height: 100%;
// // // // //           background: rgba(255,255,255,0.05);
// // // // //           border-radius: 4px;
// // // // //           transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
// // // // //         }

// // // // //         .cell.snake {
// // // // //           background: linear-gradient(135deg, #4ecdc4, #44b39d);
// // // // //           border-radius: 6px;
// // // // //           box-shadow: 0 0 20px rgba(78, 205, 196, 0.3);
// // // // //         }

// // // // //         .cell.head {
// // // // //           background: linear-gradient(135deg, #5fd9d0, #4ecdc4) !important;
// // // // //           border-radius: 8px;
// // // // //           box-shadow: 0 0 30px rgba(78, 205, 196, 0.6), inset 0 -2px 0 rgba(0,0,0,0.2);
// // // // //           transform: scale(0.9);
// // // // //         }

// // // // //         .cell.tail {
// // // // //           border-radius: 4px;
// // // // //           opacity: 0.7;
// // // // //         }

// // // // //         .cell.food {
// // // // //           background: radial-gradient(circle, #ff6b6b, #ee5a24);
// // // // //           border-radius: 50%;
// // // // //           box-shadow: 0 0 30px rgba(255, 107, 107, 0.6);
// // // // //           animation: foodPulse 0.6s ease-in-out infinite alternate;
// // // // //         }

// // // // //         .cell.special-food {
// // // // //           background: radial-gradient(circle, #ffd93d, #f6b93b);
// // // // //           border-radius: 50%;
// // // // //           box-shadow: 0 0 40px rgba(255, 217, 61, 0.8);
// // // // //           animation: specialPulse 0.3s ease-in-out infinite alternate;
// // // // //         }

// // // // //         @keyframes foodPulse {
// // // // //           from { transform: scale(0.8); }
// // // // //           to { transform: scale(1.1); }
// // // // //         }

// // // // //         @keyframes specialPulse {
// // // // //           from { transform: scale(0.7) rotate(0deg); }
// // // // //           to { transform: scale(1.2) rotate(180deg); }
// // // // //         }

// // // // //         .controls {
// // // // //           display: flex;
// // // // //           gap: 10px;
// // // // //           margin-top: 15px;
// // // // //           justify-content: center;
// // // // //           flex-wrap: wrap;
// // // // //         }

// // // // //         .control-btn {
// // // // //           padding: 10px 25px;
// // // // //           font-size: 14px;
// // // // //           font-weight: 600;
// // // // //           border: none;
// // // // //           border-radius: 12px;
// // // // //           cursor: pointer;
// // // // //           transition: all 0.3s;
// // // // //           letter-spacing: 0.5px;
// // // // //           font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // // //         }

// // // // //         .control-btn.primary {
// // // // //           background: linear-gradient(135deg, #4ecdc4, #44b39d);
// // // // //           color: white;
// // // // //           box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
// // // // //         }

// // // // //         .control-btn.primary:hover {
// // // // //           transform: translateY(-2px);
// // // // //           box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
// // // // //         }

// // // // //         .control-btn.secondary {
// // // // //           background: rgba(255,255,255,0.1);
// // // // //           color: white;
// // // // //           border: 1px solid rgba(255,255,255,0.2);
// // // // //         }

// // // // //         .control-btn.secondary:hover {
// // // // //           background: rgba(255,255,255,0.2);
// // // // //           transform: translateY(-2px);
// // // // //         }

// // // // //         .mobile-controls {
// // // // //           display: none;
// // // // //           margin-top: 15px;
// // // // //           justify-content: center;
// // // // //         }

// // // // //         @media (max-width: 768px) {
// // // // //           .mobile-controls {
// // // // //             display: flex;
// // // // //           }
// // // // //         }

// // // // //         .dpad {
// // // // //           display: grid;
// // // // //           grid-template-columns: 60px 60px 60px;
// // // // //           grid-template-rows: 60px 60px 60px;
// // // // //           gap: 4px;
// // // // //         }

// // // // //         .dpad-btn {
// // // // //           background: rgba(255,255,255,0.1);
// // // // //           border: 1px solid rgba(255,255,255,0.15);
// // // // //           border-radius: 12px;
// // // // //           color: white;
// // // // //           font-size: 20px;
// // // // //           cursor: pointer;
// // // // //           transition: all 0.2s;
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           justify-content: center;
// // // // //           -webkit-tap-highlight-color: transparent;
// // // // //           user-select: none;
// // // // //         }

// // // // //         .dpad-btn:active {
// // // // //           background: rgba(78, 205, 196, 0.3);
// // // // //           transform: scale(0.95);
// // // // //         }

// // // // //         .dpad-btn.up { grid-column: 2; grid-row: 1; }
// // // // //         .dpad-btn.down { grid-column: 2; grid-row: 3; }
// // // // //         .dpad-btn.left { grid-column: 1; grid-row: 2; }
// // // // //         .dpad-btn.right { grid-column: 3; grid-row: 2; }

// // // // //         .info {
// // // // //           margin-top: 15px;
// // // // //           text-align: center;
// // // // //         }

// // // // //         .combo-display {
// // // // //           min-height: 24px;
// // // // //           margin-bottom: 8px;
// // // // //         }

// // // // //         .combo-text {
// // // // //           color: #ffd93d;
// // // // //           font-weight: 700;
// // // // //           font-size: 18px;
// // // // //           animation: comboPop 0.3s ease;
// // // // //         }

// // // // //         @keyframes comboPop {
// // // // //           0% { transform: scale(0.5); opacity: 0; }
// // // // //           50% { transform: scale(1.2); }
// // // // //           100% { transform: scale(1); opacity: 1; }
// // // // //         }

// // // // //         .instructions {
// // // // //           display: flex;
// // // // //           justify-content: center;
// // // // //           gap: 10px;
// // // // //           color: rgba(255,255,255,0.4);
// // // // //           font-size: 13px;
// // // // //           flex-wrap: wrap;
// // // // //           font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // // //         }

// // // // //         .sep {
// // // // //           color: rgba(255,255,255,0.1);
// // // // //         }

// // // // //         /* اورلی‌ها */
// // // // //         .game-over-overlay,
// // // // //         .pause-overlay,
// // // // //         .start-overlay,
// // // // //         .level-up-overlay {
// // // // //           position: absolute;
// // // // //           inset: 0;
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           justify-content: center;
// // // // //           background: rgba(0,0,0,0.75);
// // // // //           backdrop-filter: blur(8px);
// // // // //           border-radius: 16px;
// // // // //           z-index: 10;
// // // // //         }

// // // // //         .game-over-content,
// // // // //         .start-content {
// // // // //           text-align: center;
// // // // //           padding: 30px;
// // // // //           animation: fadeInUp 0.5s ease;
// // // // //         }

// // // // //         .game-over-icon {
// // // // //           font-size: 64px;
// // // // //           margin-bottom: 10px;
// // // // //         }

// // // // //         .game-over-content h2 {
// // // // //           font-size: 32px;
// // // // //           margin: 10px 0;
// // // // //           color: #ff6b6b;
// // // // //           font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // // //         }

// // // // //         .final-score {
// // // // //           font-size: 24px;
// // // // //           color: #fff;
// // // // //           margin: 10px 0;
// // // // //           font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // // //         }

// // // // //         .final-score span {
// // // // //           color: #ffd93d;
// // // // //           font-size: 32px;
// // // // //         }

// // // // //         .final-stats {
// // // // //           display: flex;
// // // // //           justify-content: center;
// // // // //           gap: 30px;
// // // // //           color: rgba(255,255,255,0.6);
// // // // //           margin: 15px 0;
// // // // //           font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // // //         }

// // // // //         .play-again-btn,
// // // // //         .start-btn {
// // // // //           padding: 12px 40px;
// // // // //           font-size: 16px;
// // // // //           font-weight: 600;
// // // // //           border: none;
// // // // //           border-radius: 12px;
// // // // //           background: linear-gradient(135deg, #4ecdc4, #44b39d);
// // // // //           color: white;
// // // // //           cursor: pointer;
// // // // //           transition: all 0.3s;
// // // // //           margin-top: 10px;
// // // // //           font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // // //         }

// // // // //         .play-again-btn:hover,
// // // // //         .start-btn:hover {
// // // // //           transform: scale(1.05);
// // // // //           box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
// // // // //         }

// // // // //         .pause-icon,
// // // // //         .start-icon {
// // // // //           font-size: 56px;
// // // // //           animation: pulse 1.5s ease-in-out infinite;
// // // // //         }

// // // // //         .pause-text {
// // // // //           color: #fff;
// // // // //           font-size: 24px;
// // // // //           font-weight: 700;
// // // // //           margin-top: 10px;
// // // // //           font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // // //         }

// // // // //         .start-content h2 {
// // // // //           font-size: 32px;
// // // // //           color: #fff;
// // // // //           margin: 10px 0;
// // // // //           font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // // //         }

// // // // //         .start-content p {
// // // // //           color: rgba(255,255,255,0.6);
// // // // //           margin: 10px 0 20px;
// // // // //           font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // // //         }

// // // // //         .level-up-text {
// // // // //           font-size: 48px;
// // // // //           font-weight: 700;
// // // // //           color: #ffd93d;
// // // // //           text-shadow: 0 0 40px rgba(255, 217, 61, 0.5);
// // // // //           animation: levelUpPop 0.5s ease;
// // // // //           font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // // //         }

// // // // //         @keyframes fadeInUp {
// // // // //           from { opacity: 0; transform: translateY(20px); }
// // // // //           to { opacity: 1; transform: translateY(0); }
// // // // //         }

// // // // //         @keyframes pulse {
// // // // //           0%, 100% { transform: scale(1); }
// // // // //           50% { transform: scale(1.1); }
// // // // //         }

// // // // //         @keyframes levelUpPop {
// // // // //           0% { transform: scale(0) rotate(-10deg); opacity: 0; }
// // // // //           50% { transform: scale(1.2) rotate(5deg); }
// // // // //           100% { transform: scale(1) rotate(0deg); opacity: 1; }
// // // // //         }

// // // // //         .particle {
// // // // //           position: absolute;
// // // // //           pointer-events: none;
// // // // //           border-radius: 50%;
// // // // //           will-change: transform, opacity;
// // // // //         }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SnakeGame;

// // // // import React, { useState, useEffect, useCallback, useRef } from 'react';

// // // // // متا تگ‌ها به صورت مستقیم در JSX
// // // // const MetaTags = () => {
// // // //   return (
// // // //     <>
// // // //       <title>بازی مار هوشمند | مشاوراملاکی - سرگرمی و چالش</title>
// // // //       <meta name="description" content="بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته. امتیاز بگیر، رکورد بزن و با دوستانت رقابت کن. بازی مار استاد در مشاوراملاکی" />
// // // //       <meta name="keywords" content="بازی مار, مار استاد, بازی آنلاین, سرگرمی, مشاوراملاکی, بازی فکری, چالش" />
// // // //       <meta name="robots" content="index, follow" />
// // // //       <meta property="og:title" content="بازی مار استاد - مشاوراملاکی" />
// // // //       <meta property="og:description" content="بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته. امتیاز بگیر و رکورد بزن!" />
// // // //       <meta property="og:type" content="game" />
// // // //       <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://your-site.com/snake-game'} />
// // // //       <meta name="twitter:card" content="summary_large_image" />
// // // //       <meta name="twitter:title" content="بازی مار استاد - مشاوراملاکی" />
// // // //       <meta name="twitter:description" content="بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته" />
// // // //       <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://your-site.com/snake-game'} />
      
// // // //       {/* Schema Markup */}
// // // //       <script
// // // //         type="application/ld+json"
// // // //         dangerouslySetInnerHTML={{
// // // //           __html: JSON.stringify({
// // // //             "@context": "https://schema.org",
// // // //             "@type": "VideoGame",
// // // //             "name": "بازی مار استاد",
// // // //             "description": "بازی کلاسیک مار با گرافیک مدرن و امکانات ویژه برای مشاوراملاکی",
// // // //             "applicationCategory": "Game",
// // // //             "operatingSystem": "All",
// // // //             "audience": {
// // // //               "@type": "Audience",
// // // //               "audienceType": "همه سنین"
// // // //             },
// // // //             "offers": {
// // // //               "@type": "Offer",
// // // //               "price": "0",
// // // //               "priceCurrency": "IRR"
// // // //             }
// // // //           })
// // // //         }}
// // // //       />
// // // //     </>
// // // //   );
// // // // };

// // // // const SnakeGame = () => {
// // // //   const BOARD_SIZE = 20;
// // // //   const INITIAL_SNAKE = [
// // // //     [10, 10],
// // // //     [10, 9],
// // // //     [10, 8],
// // // //   ];
// // // //   const INITIAL_DIRECTION = 'RIGHT';

// // // //   const [snake, setSnake] = useState(INITIAL_SNAKE);
// // // //   const [direction, setDirection] = useState(INITIAL_DIRECTION);
// // // //   const [food, setFood] = useState(null);
// // // //   const [gameOver, setGameOver] = useState(false);
// // // //   const [score, setScore] = useState(0);
// // // //   const [highScore, setHighScore] = useState(0);
// // // //   const [isPaused, setIsPaused] = useState(false);
// // // //   const [gameStarted, setGameStarted] = useState(false);
// // // //   const [level, setLevel] = useState(1);
// // // //   const [combo, setCombo] = useState(0);
// // // //   const [showLevelUp, setShowLevelUp] = useState(false);
// // // //   const [particles, setParticles] = useState([]);
// // // //   const [speed, setSpeed] = useState(150);
// // // //   const [foodEaten, setFoodEaten] = useState(0);
// // // //   const [specialFood, setSpecialFood] = useState(null);
// // // //   const [specialFoodTimer, setSpecialFoodTimer] = useState(null);
// // // //   const [showShareModal, setShowShareModal] = useState(false);

// // // //   const canvasRef = useRef(null);
// // // //   const gameLoopRef = useRef(null);
// // // //   const animationFrameRef = useRef(null);

// // // //   // بارگذاری امتیاز برتر از حافظه
// // // //   useEffect(() => {
// // // //     const saved = localStorage.getItem('snakeHighScore');
// // // //     if (saved) setHighScore(parseInt(saved));
// // // //   }, []);

// // // //   // ذخیره امتیاز برتر
// // // //   useEffect(() => {
// // // //     if (score > highScore) {
// // // //       setHighScore(score);
// // // //       localStorage.setItem('snakeHighScore', score.toString());
// // // //       // ثبت رویداد برای تحلیل
// // // //       if (typeof window !== 'undefined' && window.gtag) {
// // // //         window.gtag('event', 'high_score', {
// // // //           'score': score,
// // // //           'level': level
// // // //         });
// // // //       }
// // // //     }
// // // //   }, [score, highScore, level]);

// // // //   const generateFood = useCallback((currentSnake) => {
// // // //     const maxAttempts = 1000;
// // // //     for (let i = 0; i < maxAttempts; i++) {
// // // //       const newFood = [
// // // //         Math.floor(Math.random() * BOARD_SIZE),
// // // //         Math.floor(Math.random() * BOARD_SIZE),
// // // //       ];
// // // //       if (!currentSnake.some(segment => 
// // // //         segment[0] === newFood[0] && segment[1] === newFood[1]
// // // //       ) && !(specialFood && specialFood[0] === newFood[0] && specialFood[1] === newFood[1])) {
// // // //         return newFood;
// // // //       }
// // // //     }
// // // //     return null;
// // // //   }, [BOARD_SIZE, specialFood]);

// // // //   const generateSpecialFood = useCallback((currentSnake) => {
// // // //     if (Math.random() > 0.15 || specialFood) return;
// // // //     const maxAttempts = 1000;
// // // //     for (let i = 0; i < maxAttempts; i++) {
// // // //       const newFood = [
// // // //         Math.floor(Math.random() * BOARD_SIZE),
// // // //         Math.floor(Math.random() * BOARD_SIZE),
// // // //       ];
// // // //       if (!currentSnake.some(segment => 
// // // //         segment[0] === newFood[0] && segment[1] === newFood[1]
// // // //       ) && !(food && food[0] === newFood[0] && food[1] === newFood[1])) {
// // // //         setSpecialFood(newFood);
// // // //         setSpecialFoodTimer(Date.now() + 5000);
// // // //         return;
// // // //       }
// // // //     }
// // // //   }, [food, specialFood]);

// // // //   const spawnParticles = useCallback((x, y, color, count = 12) => {
// // // //     const newParticles = [];
// // // //     for (let i = 0; i < count; i++) {
// // // //       const angle = Math.random() * Math.PI * 2;
// // // //       const speed = 1 + Math.random() * 3;
// // // //       newParticles.push({
// // // //         x: x * 25 + 12.5,
// // // //         y: y * 25 + 12.5,
// // // //         vx: Math.cos(angle) * speed,
// // // //         vy: Math.sin(angle) * speed,
// // // //         life: 1,
// // // //         color: color,
// // // //         size: 3 + Math.random() * 4,
// // // //       });
// // // //     }
// // // //     setParticles(prev => [...prev, ...newParticles]);
// // // //   }, []);

// // // //   const resetGame = useCallback(() => {
// // // //     setSnake(INITIAL_SNAKE);
// // // //     setDirection(INITIAL_DIRECTION);
// // // //     setGameOver(false);
// // // //     setScore(0);
// // // //     setIsPaused(false);
// // // //     setGameStarted(false);
// // // //     setLevel(1);
// // // //     setCombo(0);
// // // //     setFoodEaten(0);
// // // //     setSpeed(150);
// // // //     setSpecialFood(null);
// // // //     setSpecialFoodTimer(null);
// // // //     setParticles([]);
// // // //     setShowShareModal(false);
// // // //     const newFood = generateFood(INITIAL_SNAKE);
// // // //     if (newFood) setFood(newFood);
// // // //   }, [generateFood]);

// // // //   const moveSnake = useCallback(() => {
// // // //     if (gameOver || isPaused || !gameStarted) return;

// // // //     setSnake(prevSnake => {
// // // //       const newSnake = [...prevSnake];
// // // //       const head = newSnake[0];
// // // //       let newHead;

// // // //       switch (direction) {
// // // //         case 'UP': newHead = [head[0] - 1, head[1]]; break;
// // // //         case 'DOWN': newHead = [head[0] + 1, head[1]]; break;
// // // //         case 'LEFT': newHead = [head[0], head[1] - 1]; break;
// // // //         case 'RIGHT': newHead = [head[0], head[1] + 1]; break;
// // // //         default: return prevSnake;
// // // //       }

// // // //       // برخورد با دیوار
// // // //       if (
// // // //         newHead[0] < 0 || newHead[0] >= BOARD_SIZE ||
// // // //         newHead[1] < 0 || newHead[1] >= BOARD_SIZE
// // // //       ) {
// // // //         setGameOver(true);
// // // //         spawnParticles(head[0], head[1], '#ff6b6b', 20);
// // // //         return prevSnake;
// // // //       }

// // // //       const snakeWithoutTail = newSnake.slice(0, -1);
// // // //       if (snakeWithoutTail.some(segment => 
// // // //         segment[0] === newHead[0] && segment[1] === newHead[1]
// // // //       )) {
// // // //         setGameOver(true);
// // // //         spawnParticles(head[0], head[1], '#ff6b6b', 20);
// // // //         return prevSnake;
// // // //       }

// // // //       let newSnakeMoved = [newHead, ...snakeWithoutTail];
// // // //       let ateFood = false;

// // // //       // غذای معمولی
// // // //       if (food && newHead[0] === food[0] && newHead[1] === food[1]) {
// // // //         ateFood = true;
// // // //         setFoodEaten(prev => prev + 1);
// // // //         setCombo(prev => prev + 1);
        
// // // //         const points = 10 + combo * 2;
// // // //         setScore(prev => prev + points);
// // // //         spawnParticles(food[0], food[1], '#4ecdc4', 15);

// // // //         const newFood = generateFood(newSnakeMoved);
// // // //         if (newFood) {
// // // //           setFood(newFood);
// // // //           generateSpecialFood(newSnakeMoved);
// // // //         } else {
// // // //           setGameOver(true);
// // // //           return newSnakeMoved;
// // // //         }

// // // //         // افزایش سطح
// // // //         if (foodEaten > 0 && foodEaten % 5 === 0) {
// // // //           setLevel(prev => prev + 1);
// // // //           setSpeed(prev => Math.max(60, prev - 10));
// // // //           setShowLevelUp(true);
// // // //           setTimeout(() => setShowLevelUp(false), 2000);
// // // //         }
// // // //       }

// // // //       // غذای ویژه
// // // //       if (specialFood && newHead[0] === specialFood[0] && newHead[1] === specialFood[1]) {
// // // //         ateFood = true;
// // // //         setScore(prev => prev + 50);
// // // //         spawnParticles(specialFood[0], specialFood[1], '#ffd93d', 25);
// // // //         setSpecialFood(null);
// // // //         setSpecialFoodTimer(null);
// // // //       }

// // // //       if (ateFood) {
// // // //         return [newHead, ...newSnake];
// // // //       }

// // // //       return newSnakeMoved;
// // // //     });
// // // //   }, [direction, food, gameOver, isPaused, gameStarted, generateFood, specialFood, combo, foodEaten, spawnParticles]);

// // // //   // حلقه بازی با سرعت پویا
// // // //   useEffect(() => {
// // // //     if (gameOver || !gameStarted || isPaused) {
// // // //       if (gameLoopRef.current) {
// // // //         clearInterval(gameLoopRef.current);
// // // //         gameLoopRef.current = null;
// // // //       }
// // // //       return;
// // // //     }

// // // //     if (gameLoopRef.current) {
// // // //       clearInterval(gameLoopRef.current);
// // // //     }

// // // //     gameLoopRef.current = setInterval(moveSnake, speed);
// // // //     return () => {
// // // //       if (gameLoopRef.current) {
// // // //         clearInterval(gameLoopRef.current);
// // // //         gameLoopRef.current = null;
// // // //       }
// // // //     };
// // // //   }, [moveSnake, gameOver, gameStarted, isPaused, speed]);

// // // //   // تایمر غذای ویژه
// // // //   useEffect(() => {
// // // //     if (!specialFoodTimer) return;
// // // //     const checkTimer = setInterval(() => {
// // // //       if (specialFood && Date.now() > specialFoodTimer) {
// // // //         setSpecialFood(null);
// // // //         setSpecialFoodTimer(null);
// // // //       }
// // // //     }, 100);
// // // //     return () => clearInterval(checkTimer);
// // // //   }, [specialFood, specialFoodTimer]);

// // // //   // انیمیشن ذرات
// // // //   useEffect(() => {
// // // //     const animateParticles = () => {
// // // //       setParticles(prev => 
// // // //         prev
// // // //           .map(p => ({
// // // //             ...p,
// // // //             x: p.x + p.vx,
// // // //             y: p.y + p.vy,
// // // //             life: p.life - 0.02,
// // // //             vy: p.vy + 0.05,
// // // //           }))
// // // //           .filter(p => p.life > 0)
// // // //       );
// // // //       animationFrameRef.current = requestAnimationFrame(animateParticles);
// // // //     };

// // // //     animateParticles();
// // // //     return () => {
// // // //       if (animationFrameRef.current) {
// // // //         cancelAnimationFrame(animationFrameRef.current);
// // // //       }
// // // //     };
// // // //   }, []);

// // // //   // کنترل‌های کیبورد
// // // //   useEffect(() => {
// // // //     const handleKeyPress = (e) => {
// // // //       const key = e.key;
      
// // // //       if (key === ' ' || key === 'Space') {
// // // //         e.preventDefault();
// // // //         if (!gameStarted && !gameOver) {
// // // //           setGameStarted(true);
// // // //         } else if (!gameOver) {
// // // //           setIsPaused(prev => !prev);
// // // //         }
// // // //         return;
// // // //       }

// // // //       if (key === 'r' || key === 'R') {
// // // //         resetGame();
// // // //         return;
// // // //       }

// // // //       if (!gameStarted || gameOver || isPaused) return;

// // // //       const oppositeDirections = {
// // // //         'UP': 'DOWN',
// // // //         'DOWN': 'UP',
// // // //         'LEFT': 'RIGHT',
// // // //         'RIGHT': 'LEFT'
// // // //       };

// // // //       let newDirection = null;
// // // //       switch (key) {
// // // //         case 'ArrowUp': newDirection = 'UP'; break;
// // // //         case 'ArrowDown': newDirection = 'DOWN'; break;
// // // //         case 'ArrowLeft': newDirection = 'RIGHT'; break;
// // // //         case 'ArrowRight': newDirection = 'LEFT'; break;
// // // //         default: return;
// // // //       }

// // // //       e.preventDefault();
// // // //       if (newDirection && oppositeDirections[newDirection] !== direction) {
// // // //         setDirection(newDirection);
// // // //       }
// // // //     };

// // // //     window.addEventListener('keydown', handleKeyPress);
// // // //     return () => window.removeEventListener('keydown', handleKeyPress);
// // // //   }, [direction, gameStarted, gameOver, isPaused, resetGame]);

// // // //   // کنترل‌های لمسی برای موبایل
// // // //   const [touchStart, setTouchStart] = useState(null);
// // // //   const handleTouchStart = (e) => {
// // // //     const touch = e.touches[0];
// // // //     setTouchStart({ x: touch.clientX, y: touch.clientY });
// // // //   };

// // // //   const handleTouchEnd = (e) => {
// // // //     if (!touchStart) return;
// // // //     const touch = e.changedTouches[0];
// // // //     const dx = touch.clientX - touchStart.x;
// // // //     const dy = touch.clientY - touchStart.y;
    
// // // //     if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
// // // //       if (!gameStarted && !gameOver) {
// // // //         setGameStarted(true);
// // // //       } else if (!gameOver) {
// // // //         setIsPaused(prev => !prev);
// // // //       }
// // // //       return;
// // // //     }

// // // //     if (Math.abs(dx) > Math.abs(dy)) {
// // // //       if (dx > 0 && direction !== 'LEFT') setDirection('RIGHT');
// // // //       else if (dx < 0 && direction !== 'RIGHT') setDirection('LEFT');
// // // //     } else {
// // // //       if (dy > 0 && direction !== 'UP') setDirection('DOWN');
// // // //       else if (dy < 0 && direction !== 'DOWN') setDirection('UP');
// // // //     }
// // // //     setTouchStart(null);
// // // //   };

// // // //   const renderBoard = () => {
// // // //     const cells = [];
// // // //     for (let row = 0; row < BOARD_SIZE; row++) {
// // // //       for (let col = 0; col < BOARD_SIZE; col++) {
// // // //         const isSnake = snake.some(segment => segment[0] === row && segment[1] === col);
// // // //         const isFood = food && food[0] === row && food[1] === col;
// // // //         const isSpecial = specialFood && specialFood[0] === row && specialFood[1] === col;
// // // //         const isHead = snake[0] && snake[0][0] === row && snake[0][1] === col;
// // // //         const isTail = snake[snake.length - 1] && 
// // // //           snake[snake.length - 1][0] === row && 
// // // //           snake[snake.length - 1][1] === col;

// // // //         let className = 'cell';
// // // //         if (isSnake) className += ' snake';
// // // //         if (isHead) className += ' head';
// // // //         if (isTail) className += ' tail';
// // // //         if (isFood) className += ' food';
// // // //         if (isSpecial) className += ' special-food';

// // // //         const style = {};
// // // //         if (isSnake && !isHead) {
// // // //           const index = snake.findIndex(seg => seg[0] === row && seg[1] === col);
// // // //           const gradient = `hsl(${170 + index * 5}, 70%, ${45 + index * 1.5}%)`;
// // // //           style.background = gradient;
// // // //         }

// // // //         cells.push(
// // // //           <div 
// // // //             key={`${row}-${col}`} 
// // // //             className={className} 
// // // //             style={style}
// // // //             role="gridcell"
// // // //             aria-label={`سلول ${row} ${col}`}
// // // //           />
// // // //         );
// // // //       }
// // // //     }
// // // //     return cells;
// // // //   };

// // // //   // تابع اشتراک‌گذاری
// // // //   const shareScore = () => {
// // // //     const text = `🐍 من در بازی مار استاد به امتیاز ${score} در سطح ${level} رسیدم!\nآیا میتونی رکورد من رو بزنی؟\nمشاوراملاکی`;
// // // //     const url = typeof window !== 'undefined' ? window.location.href : '';
    
// // // //     if (navigator.share) {
// // // //       navigator.share({
// // // //         title: 'بازی مار استاد - مشاوراملاکی',
// // // //         text: text,
// // // //         url: url,
// // // //       }).catch(() => {});
// // // //     } else {
// // // //       setShowShareModal(true);
// // // //     }
// // // //   };

// // // //   const copyToClipboard = () => {
// // // //     const text = `🐍 من در بازی مار استاد به امتیاز ${score} در سطح ${level} رسیدم!\nآیا میتونی رکورد من رو بزنی؟\nمشاوراملاکی`;
// // // //     navigator.clipboard.writeText(text);
// // // //     setShowShareModal(false);
// // // //   };

// // // //   return (
// // // //     <>
// // // //       {/* متا تگ‌ها برای سئو */}
// // // //       <MetaTags />

// // // //       <div className="game-wrapper" dir="rtl">
// // // //         {/* Breadcrumb برای سئو */}
// // // //         <nav aria-label="مسیر دسترسی" className="breadcrumb">
// // // //           <ol>
// // // //             <li><a href="/">خانه</a></li>
// // // //             <li><a href="/games">بازی‌ها</a></li>
// // // //             <li className="active">بازی مار استاد</li>
// // // //           </ol>
// // // //         </nav>

// // // //         {/* افکت‌های پس‌زمینه */}
// // // //         <div className="bg-particles" aria-hidden="true" />
// // // //         <div className="bg-grid" aria-hidden="true" />

// // // //         <div className="game-container">
// // // //           {/* هدر */}
// // // //           <div className="header">
// // // //             <div className="header-left">
// // // //               <h1>
// // // //                 <span className="snake-icon" aria-hidden="true">🐍</span>
// // // //                 مار استاد
// // // //               </h1>
// // // //               <div className="level-badge" role="status" aria-live="polite">
// // // //                 <span aria-hidden="true">🏆</span>
// // // //                 <span>سطح {level}</span>
// // // //               </div>
// // // //             </div>
// // // //             <div className="stats">
// // // //               <div className="stat-item">
// // // //                 <span className="stat-label">امتیاز</span>
// // // //                 <span className="stat-value" role="status" aria-live="polite">{score}</span>
// // // //               </div>
// // // //               <div className="stat-item">
// // // //                 <span className="stat-label">بهترین</span>
// // // //                 <span className="stat-value high-score" role="status" aria-live="polite">{highScore}</span>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* صفحه بازی */}
// // // //           <div className="board-wrapper">
// // // //             <div 
// // // //               className="board"
// // // //               onTouchStart={handleTouchStart}
// // // //               onTouchEnd={handleTouchEnd}
// // // //               role="grid"
// // // //               aria-label="تخته بازی مار"
// // // //               style={{
// // // //                 display: 'grid',
// // // //                 gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
// // // //                 gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
// // // //                 gap: '2px',
// // // //                 backgroundColor: 'rgba(255,255,255,0.05)',
// // // //                 padding: '12px',
// // // //                 borderRadius: '16px',
// // // //                 position: 'relative',
// // // //               }}
// // // //             >
// // // //               {renderBoard()}

// // // //               {/* لایه ذرات */}
// // // //               {particles.map((p, i) => (
// // // //                 <div
// // // //                   key={i}
// // // //                   className="particle"
// // // //                   style={{
// // // //                     position: 'absolute',
// // // //                     left: p.x,
// // // //                     top: p.y,
// // // //                     width: p.size,
// // // //                     height: p.size,
// // // //                     background: p.color,
// // // //                     borderRadius: '50%',
// // // //                     opacity: p.life,
// // // //                     transform: `scale(${p.life})`,
// // // //                     pointerEvents: 'none',
// // // //                   }}
// // // //                   aria-hidden="true"
// // // //                 />
// // // //               ))}

// // // //               {/* اعلان افزایش سطح */}
// // // //               {showLevelUp && (
// // // //                 <div className="level-up-overlay" role="status" aria-live="assertive">
// // // //                   <div className="level-up-text">
// // // //                     ⭐ سطح {level}!
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {/* صفحه پایان بازی */}
// // // //               {gameOver && (
// // // //                 <div className="game-over-overlay" role="dialog" aria-label="پایان بازی">
// // // //                   <div className="game-over-content">
// // // //                     <div className="game-over-icon" aria-hidden="true">💀</div>
// // // //                     <h2>بازی تمام شد!</h2>
// // // //                     <div className="final-score">
// // // //                       امتیاز: <span>{score}</span>
// // // //                     </div>
// // // //                     <div className="final-stats">
// // // //                       <div>سطح: {level}</div>
// // // //                       <div>غذا: {foodEaten}</div>
// // // //                     </div>
// // // //                     <div className="game-over-buttons">
// // // //                       <button 
// // // //                         className="play-again-btn" 
// // // //                         onClick={resetGame}
// // // //                         aria-label="شروع مجدد بازی"
// // // //                       >
// // // //                         بازی دوباره
// // // //                       </button>
// // // //                       {score > 0 && (
// // // //                         <button 
// // // //                           className="share-btn" 
// // // //                           onClick={shareScore}
// // // //                           aria-label="اشتراک‌گذاری امتیاز"
// // // //                         >
// // // //                           📤 اشتراک‌گذاری
// // // //                         </button>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {/* صفحه مکث */}
// // // //               {isPaused && !gameOver && gameStarted && (
// // // //                 <div className="pause-overlay" role="status" aria-live="polite">
// // // //                   <div className="pause-icon" aria-hidden="true">⏸️</div>
// // // //                   <div className="pause-text">مکث</div>
// // // //                 </div>
// // // //               )}

// // // //               {/* صفحه شروع */}
// // // //               {!gameStarted && !gameOver && (
// // // //                 <div className="start-overlay" role="dialog" aria-label="شروع بازی">
// // // //                   <div className="start-content">
// // // //                     <div className="start-icon" aria-hidden="true">🐍</div>
// // // //                     <h2>مار استاد</h2>
// // // //                     <p>برای شروع دکمه <strong>Space</strong> یا کلیک کن</p>
// // // //                     <button 
// // // //                       className="start-btn" 
// // // //                       onClick={() => setGameStarted(true)}
// // // //                       aria-label="شروع بازی"
// // // //                     >
// // // //                       شروع بازی
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* دکمه‌های کنترل */}
// // // //           <div className="controls">
// // // //             <button 
// // // //               className="control-btn primary"
// // // //               onClick={() => {
// // // //                 if (!gameStarted && !gameOver) {
// // // //                   setGameStarted(true);
// // // //                 } else if (!gameOver) {
// // // //                   setIsPaused(prev => !prev);
// // // //                 }
// // // //               }}
// // // //               aria-label={!gameStarted ? "شروع بازی" : isPaused ? "ادامه بازی" : "مکث بازی"}
// // // //             >
// // // //               {!gameStarted ? '▶ شروع' : isPaused ? '▶ ادامه' : '⏸ مکث'}
// // // //             </button>
// // // //             <button 
// // // //               className="control-btn secondary" 
// // // //               onClick={resetGame}
// // // //               aria-label="بازی جدید"
// // // //             >
// // // //               🔄 بازی جدید
// // // //             </button>
// // // //           </div>

// // // //           {/* کنترل‌های موبایل */}
// // // //           <div className="mobile-controls" aria-label="کنترل‌های حرکتی">
// // // //             <div className="dpad">
// // // //               <button 
// // // //                 className="dpad-btn up" 
// // // //                 onClick={() => direction !== 'DOWN' && setDirection('UP')}
// // // //                 aria-label="بالا"
// // // //               >
// // // //                 ▲
// // // //               </button>
// // // //               <button 
// // // //                 className="dpad-btn down" 
// // // //                 onClick={() => direction !== 'UP' && setDirection('DOWN')}
// // // //                 aria-label="پایین"
// // // //               >
// // // //                 ▼
// // // //               </button>
// // // //               <button 
// // // //                 className="dpad-btn left" 
// // // //                 onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
// // // //                 aria-label="چپ"
// // // //               >
// // // //                 ◄
// // // //               </button>
// // // //               <button 
// // // //                 className="dpad-btn right" 
// // // //                 onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
// // // //                 aria-label="راست"
// // // //               >
// // // //                 ►
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* اطلاعات */}
// // // //           <div className="info">
// // // //             <div className="combo-display">
// // // //               {combo > 1 && <span className="combo-text" role="status">🔥 کامبو x{combo}</span>}
// // // //             </div>
// // // //             <div className="instructions" aria-label="راهنمای کلیدها">
// // // //               <span>↑ ↓ ← →</span>
// // // //               <span className="sep">|</span>
// // // //               <span>␣ مکث</span>
// // // //               <span className="sep">|</span>
// // // //               <span>R ریستارت</span>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* محتوای سئو */}
// // // //         <div className="seo-content">
// // // //           <h2>درباره بازی مار استاد</h2>
// // // //           <p>
// // // //             بازی مار استاد یک بازی کلاسیک و سرگرم‌کننده است که در سایت مشاوراملاکی طراحی شده تا 
// // // //             لحظات خوشی را برای شما به ارمغان بیاورد. این بازی با گرافیک مدرن و امکانات پیشرفته، 
// // // //             تجربه‌ای متفاوت از بازی‌های سنتی مار را به شما ارائه می‌دهد.
// // // //           </p>
          
// // // //           <h3>ویژگی‌های بازی مار</h3>
// // // //           <ul>
// // // //             <li>گرافیک زیبا و مدرن با افکت‌های ویژه</li>
// // // //             <li>سیستم امتیازدهی پویا با ترکیب (کامبو)</li>
// // // //             <li>غذاهای ویژه با امتیاز بیشتر</li>
// // // //             <li>سطح‌بندی پیشرفته با افزایش سرعت</li>
// // // //             <li>قابل بازی در موبایل و دسکتاپ</li>
// // // //             <li>ذخیره خودکار رکوردها</li>
// // // //           </ul>

// // // //           <h3>چطور بازی کنیم؟</h3>
// // // //           <ol>
// // // //             <li>با کلیدهای جهت‌نما (↑ ↓ ← →) مار را حرکت دهید</li>
// // // //             <li>برای شروع بازی کلید Space را بزنید</li>
// // // //             <li>غذاهای قرمز رنگ را بخورید تا امتیاز بگیرید</li>
// // // //             <li>غذاهای طلایی ویژه امتیاز بیشتری دارند</li>
// // // //             <li>با هر ۵ بار غذا خوردن، سطح شما افزایش می‌یابد</li>
// // // //           </ol>
          
// // // //           <h3>چرا بازی مار؟</h3>
// // // //           <p>
// // // //             بازی مار یکی از محبوب‌ترین بازی‌های تاریخ است که با وجود سادگی، چالش‌های زیادی را 
// // // //             برای بازیکنان ایجاد می‌کند. این بازی به بهبود مهارت‌های تصمیم‌گیری، واکنش سریع و 
// // // //             برنامه‌ریزی کمک می‌کند.
// // // //           </p>
          
// // // //           <div className="seo-tags">
// // // //             <span className="tag">#بازی_مار</span>
// // // //             <span className="tag">#مار_استاد</span>
// // // //             <span className="tag">#مشاوراملاکی</span>
// // // //             <span className="tag">#بازی_آنلاین</span>
// // // //             <span className="tag">#سرگرمی</span>
// // // //           </div>
// // // //         </div>

// // // //         {/* مودال اشتراک‌گذاری */}
// // // //         {showShareModal && (
// // // //           <div className="share-modal" role="dialog" aria-label="اشتراک‌گذاری امتیاز">
// // // //             <div className="share-modal-content">
// // // //               <h3>اشتراک‌گذاری امتیاز</h3>
// // // //               <p>امتیاز خود را با دوستانتان به اشتراک بگذارید!</p>
// // // //               <div className="share-buttons">
// // // //                 <button onClick={copyToClipboard} className="share-btn copy-btn">
// // // //                   📋 کپی متن
// // // //                 </button>
// // // //                 <button 
// // // //                   onClick={() => {
// // // //                     const url = typeof window !== 'undefined' ? window.location.href : '';
// // // //                     window.open(`https://t.me/share/url?url=${url}&text=🐍 من در بازی مار استاد به امتیاز ${score} رسیدم!`);
// // // //                   }}
// // // //                   className="share-btn telegram"
// // // //                 >
// // // //                   📨 تلگرام
// // // //                 </button>
// // // //                 <button 
// // // //                   onClick={() => {
// // // //                     const url = typeof window !== 'undefined' ? window.location.href : '';
// // // //                     window.open(`https://api.whatsapp.com/send?text=🐍 من در بازی مار استاد به امتیاز ${score} رسیدم! ${url}`);
// // // //                   }}
// // // //                   className="share-btn whatsapp"
// // // //                 >
// // // //                   💬 واتساپ
// // // //                 </button>
// // // //               </div>
// // // //               <button onClick={() => setShowShareModal(false)} className="close-modal">
// // // //                 ✖ بستن
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         <style jsx>{`
// // // //           .game-wrapper {
// // // //             min-height: 100vh;
// // // //             background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
// // // //             display: flex;
// // // //             flex-direction: column;
// // // //             align-items: center;
// // // //             justify-content: center;
// // // //             padding: 20px;
// // // //             position: relative;
// // // //             overflow: hidden;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .breadcrumb {
// // // //             width: 100%;
// // // //             max-width: 600px;
// // // //             padding: 10px 0;
// // // //             color: rgba(255,255,255,0.6);
// // // //             font-size: 14px;
// // // //             margin-bottom: 10px;
// // // //           }

// // // //           .breadcrumb ol {
// // // //             display: flex;
// // // //             list-style: none;
// // // //             padding: 0;
// // // //             margin: 0;
// // // //             gap: 8px;
// // // //           }

// // // //           .breadcrumb li {
// // // //             display: flex;
// // // //             align-items: center;
// // // //           }

// // // //           .breadcrumb li:not(:last-child)::after {
// // // //             content: '/';
// // // //             margin-left: 8px;
// // // //             color: rgba(255,255,255,0.3);
// // // //           }

// // // //           .breadcrumb a {
// // // //             color: rgba(255,255,255,0.6);
// // // //             text-decoration: none;
// // // //             transition: color 0.3s;
// // // //           }

// // // //           .breadcrumb a:hover {
// // // //             color: #4ecdc4;
// // // //           }

// // // //           .breadcrumb .active {
// // // //             color: #4ecdc4;
// // // //           }

// // // //           .bg-particles {
// // // //             position: absolute;
// // // //             width: 100%;
// // // //             height: 100%;
// // // //             background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
// // // //                               radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
// // // //                               radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
// // // //                               radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
// // // //                               radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0));
// // // //             background-size: 200px 200px;
// // // //             opacity: 0.3;
// // // //           }

// // // //           .bg-grid {
// // // //             position: absolute;
// // // //             width: 100%;
// // // //             height: 100%;
// // // //             background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
// // // //                               linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
// // // //             background-size: 50px 50px;
// // // //           }

// // // //           .game-container {
// // // //             background: rgba(255,255,255,0.05);
// // // //             backdrop-filter: blur(20px);
// // // //             border-radius: 24px;
// // // //             padding: 30px;
// // // //             max-width: 600px;
// // // //             width: 100%;
// // // //             border: 1px solid rgba(255,255,255,0.1);
// // // //             box-shadow: 0 25px 50px rgba(0,0,0,0.5);
// // // //             position: relative;
// // // //             z-index: 1;
// // // //           }

// // // //           .header {
// // // //             display: flex;
// // // //             justify-content: space-between;
// // // //             align-items: center;
// // // //             margin-bottom: 20px;
// // // //             flex-wrap: wrap;
// // // //             gap: 10px;
// // // //           }

// // // //           .header-left {
// // // //             display: flex;
// // // //             align-items: center;
// // // //             gap: 12px;
// // // //           }

// // // //           .header h1 {
// // // //             margin: 0;
// // // //             font-size: 22px;
// // // //             font-weight: 700;
// // // //             background: linear-gradient(135deg, #4ecdc4, #44d4b4);
// // // //             -webkit-background-clip: text;
// // // //             -webkit-text-fill-color: transparent;
// // // //             letter-spacing: -0.5px;
// // // //           }

// // // //           .snake-icon {
// // // //             -webkit-text-fill-color: initial;
// // // //           }

// // // //           .level-badge {
// // // //             background: rgba(78, 205, 196, 0.15);
// // // //             padding: 4px 12px;
// // // //             border-radius: 20px;
// // // //             font-size: 12px;
// // // //             color: #4ecdc4;
// // // //             display: flex;
// // // //             align-items: center;
// // // //             gap: 4px;
// // // //             border: 1px solid rgba(78, 205, 196, 0.2);
// // // //           }

// // // //           .stats {
// // // //             display: flex;
// // // //             gap: 15px;
// // // //           }

// // // //           .stat-item {
// // // //             display: flex;
// // // //             flex-direction: column;
// // // //             align-items: center;
// // // //           }

// // // //           .stat-label {
// // // //             font-size: 10px;
// // // //             text-transform: uppercase;
// // // //             color: rgba(255,255,255,0.4);
// // // //             letter-spacing: 1px;
// // // //           }

// // // //           .stat-value {
// // // //             font-size: 20px;
// // // //             font-weight: 700;
// // // //             color: #fff;
// // // //           }

// // // //           .stat-value.high-score {
// // // //             color: #ffd93d;
// // // //           }

// // // //           .board-wrapper {
// // // //             position: relative;
// // // //           }

// // // //           .board {
// // // //             width: 100%;
// // // //             aspect-ratio: 1;
// // // //             margin: 0 auto;
// // // //             position: relative;
// // // //             background: rgba(0,0,0,0.3);
// // // //             border-radius: 16px;
// // // //           }

// // // //           .cell {
// // // //             width: 100%;
// // // //             height: 100%;
// // // //             background: rgba(255,255,255,0.05);
// // // //             border-radius: 4px;
// // // //             transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
// // // //           }

// // // //           .cell.snake {
// // // //             background: linear-gradient(135deg, #4ecdc4, #44b39d);
// // // //             border-radius: 6px;
// // // //             box-shadow: 0 0 20px rgba(78, 205, 196, 0.3);
// // // //           }

// // // //           .cell.head {
// // // //             background: linear-gradient(135deg, #5fd9d0, #4ecdc4) !important;
// // // //             border-radius: 8px;
// // // //             box-shadow: 0 0 30px rgba(78, 205, 196, 0.6), inset 0 -2px 0 rgba(0,0,0,0.2);
// // // //             transform: scale(0.9);
// // // //           }

// // // //           .cell.tail {
// // // //             border-radius: 4px;
// // // //             opacity: 0.7;
// // // //           }

// // // //           .cell.food {
// // // //             background: radial-gradient(circle, #ff6b6b, #ee5a24);
// // // //             border-radius: 50%;
// // // //             box-shadow: 0 0 30px rgba(255, 107, 107, 0.6);
// // // //             animation: foodPulse 0.6s ease-in-out infinite alternate;
// // // //           }

// // // //           .cell.special-food {
// // // //             background: radial-gradient(circle, #ffd93d, #f6b93b);
// // // //             border-radius: 50%;
// // // //             box-shadow: 0 0 40px rgba(255, 217, 61, 0.8);
// // // //             animation: specialPulse 0.3s ease-in-out infinite alternate;
// // // //           }

// // // //           @keyframes foodPulse {
// // // //             from { transform: scale(0.8); }
// // // //             to { transform: scale(1.1); }
// // // //           }

// // // //           @keyframes specialPulse {
// // // //             from { transform: scale(0.7) rotate(0deg); }
// // // //             to { transform: scale(1.2) rotate(180deg); }
// // // //           }

// // // //           .controls {
// // // //             display: flex;
// // // //             gap: 10px;
// // // //             margin-top: 15px;
// // // //             justify-content: center;
// // // //             flex-wrap: wrap;
// // // //           }

// // // //           .control-btn {
// // // //             padding: 10px 25px;
// // // //             font-size: 14px;
// // // //             font-weight: 600;
// // // //             border: none;
// // // //             border-radius: 12px;
// // // //             cursor: pointer;
// // // //             transition: all 0.3s;
// // // //             letter-spacing: 0.5px;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .control-btn.primary {
// // // //             background: linear-gradient(135deg, #4ecdc4, #44b39d);
// // // //             color: white;
// // // //             box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
// // // //           }

// // // //           .control-btn.primary:hover {
// // // //             transform: translateY(-2px);
// // // //             box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
// // // //           }

// // // //           .control-btn.secondary {
// // // //             background: rgba(255,255,255,0.1);
// // // //             color: white;
// // // //             border: 1px solid rgba(255,255,255,0.2);
// // // //           }

// // // //           .control-btn.secondary:hover {
// // // //             background: rgba(255,255,255,0.2);
// // // //             transform: translateY(-2px);
// // // //           }

// // // //           .mobile-controls {
// // // //             display: none;
// // // //             margin-top: 15px;
// // // //             justify-content: center;
// // // //           }

// // // //           @media (max-width: 768px) {
// // // //             .mobile-controls {
// // // //               display: flex;
// // // //             }
// // // //           }

// // // //           .dpad {
// // // //             display: grid;
// // // //             grid-template-columns: 60px 60px 60px;
// // // //             grid-template-rows: 60px 60px 60px;
// // // //             gap: 4px;
// // // //           }

// // // //           .dpad-btn {
// // // //             background: rgba(255,255,255,0.1);
// // // //             border: 1px solid rgba(255,255,255,0.15);
// // // //             border-radius: 12px;
// // // //             color: white;
// // // //             font-size: 20px;
// // // //             cursor: pointer;
// // // //             transition: all 0.2s;
// // // //             display: flex;
// // // //             align-items: center;
// // // //             justify-content: center;
// // // //             -webkit-tap-highlight-color: transparent;
// // // //             user-select: none;
// // // //           }

// // // //           .dpad-btn:active {
// // // //             background: rgba(78, 205, 196, 0.3);
// // // //             transform: scale(0.95);
// // // //           }

// // // //           .dpad-btn.up { grid-column: 2; grid-row: 1; }
// // // //           .dpad-btn.down { grid-column: 2; grid-row: 3; }
// // // //           .dpad-btn.left { grid-column: 1; grid-row: 2; }
// // // //           .dpad-btn.right { grid-column: 3; grid-row: 2; }

// // // //           .info {
// // // //             margin-top: 15px;
// // // //             text-align: center;
// // // //           }

// // // //           .combo-display {
// // // //             min-height: 24px;
// // // //             margin-bottom: 8px;
// // // //           }

// // // //           .combo-text {
// // // //             color: #ffd93d;
// // // //             font-weight: 700;
// // // //             font-size: 18px;
// // // //             animation: comboPop 0.3s ease;
// // // //           }

// // // //           @keyframes comboPop {
// // // //             0% { transform: scale(0.5); opacity: 0; }
// // // //             50% { transform: scale(1.2); }
// // // //             100% { transform: scale(1); opacity: 1; }
// // // //           }

// // // //           .instructions {
// // // //             display: flex;
// // // //             justify-content: center;
// // // //             gap: 10px;
// // // //             color: rgba(255,255,255,0.4);
// // // //             font-size: 13px;
// // // //             flex-wrap: wrap;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .sep {
// // // //             color: rgba(255,255,255,0.1);
// // // //           }

// // // //           /* اورلی‌ها */
// // // //           .game-over-overlay,
// // // //           .pause-overlay,
// // // //           .start-overlay,
// // // //           .level-up-overlay {
// // // //             position: absolute;
// // // //             inset: 0;
// // // //             display: flex;
// // // //             align-items: center;
// // // //             justify-content: center;
// // // //             background: rgba(0,0,0,0.75);
// // // //             backdrop-filter: blur(8px);
// // // //             border-radius: 16px;
// // // //             z-index: 10;
// // // //           }

// // // //           .game-over-content,
// // // //           .start-content {
// // // //             text-align: center;
// // // //             padding: 30px;
// // // //             animation: fadeInUp 0.5s ease;
// // // //           }

// // // //           .game-over-icon {
// // // //             font-size: 64px;
// // // //             margin-bottom: 10px;
// // // //           }

// // // //           .game-over-content h2 {
// // // //             font-size: 32px;
// // // //             margin: 10px 0;
// // // //             color: #ff6b6b;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .final-score {
// // // //             font-size: 24px;
// // // //             color: #fff;
// // // //             margin: 10px 0;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .final-score span {
// // // //             color: #ffd93d;
// // // //             font-size: 32px;
// // // //           }

// // // //           .final-stats {
// // // //             display: flex;
// // // //             justify-content: center;
// // // //             gap: 30px;
// // // //             color: rgba(255,255,255,0.6);
// // // //             margin: 15px 0;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .game-over-buttons {
// // // //             display: flex;
// // // //             gap: 10px;
// // // //             justify-content: center;
// // // //             flex-wrap: wrap;
// // // //           }

// // // //           .play-again-btn,
// // // //           .start-btn {
// // // //             padding: 12px 40px;
// // // //             font-size: 16px;
// // // //             font-weight: 600;
// // // //             border: none;
// // // //             border-radius: 12px;
// // // //             background: linear-gradient(135deg, #4ecdc4, #44b39d);
// // // //             color: white;
// // // //             cursor: pointer;
// // // //             transition: all 0.3s;
// // // //             margin-top: 10px;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .play-again-btn:hover,
// // // //           .start-btn:hover {
// // // //             transform: scale(1.05);
// // // //             box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
// // // //           }

// // // //           .share-btn {
// // // //             padding: 12px 30px;
// // // //             font-size: 16px;
// // // //             font-weight: 600;
// // // //             border: none;
// // // //             border-radius: 12px;
// // // //             background: linear-gradient(135deg, #ffd93d, #f6b93b);
// // // //             color: #333;
// // // //             cursor: pointer;
// // // //             transition: all 0.3s;
// // // //             margin-top: 10px;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .share-btn:hover {
// // // //             transform: scale(1.05);
// // // //             box-shadow: 0 8px 25px rgba(255, 217, 61, 0.4);
// // // //           }

// // // //           .pause-icon,
// // // //           .start-icon {
// // // //             font-size: 56px;
// // // //             animation: pulse 1.5s ease-in-out infinite;
// // // //           }

// // // //           .pause-text {
// // // //             color: #fff;
// // // //             font-size: 24px;
// // // //             font-weight: 700;
// // // //             margin-top: 10px;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .start-content h2 {
// // // //             font-size: 32px;
// // // //             color: #fff;
// // // //             margin: 10px 0;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .start-content p {
// // // //             color: rgba(255,255,255,0.6);
// // // //             margin: 10px 0 20px;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .level-up-text {
// // // //             font-size: 48px;
// // // //             font-weight: 700;
// // // //             color: #ffd93d;
// // // //             text-shadow: 0 0 40px rgba(255, 217, 61, 0.5);
// // // //             animation: levelUpPop 0.5s ease;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           @keyframes fadeInUp {
// // // //             from { opacity: 0; transform: translateY(20px); }
// // // //             to { opacity: 1; transform: translateY(0); }
// // // //           }

// // // //           @keyframes pulse {
// // // //             0%, 100% { transform: scale(1); }
// // // //             50% { transform: scale(1.1); }
// // // //           }

// // // //           @keyframes levelUpPop {
// // // //             0% { transform: scale(0) rotate(-10deg); opacity: 0; }
// // // //             50% { transform: scale(1.2) rotate(5deg); }
// // // //             100% { transform: scale(1) rotate(0deg); opacity: 1; }
// // // //           }

// // // //           .particle {
// // // //             position: absolute;
// // // //             pointer-events: none;
// // // //             border-radius: 50%;
// // // //             will-change: transform, opacity;
// // // //           }

// // // //           /* محتوای سئو */
// // // //           .seo-content {
// // // //             max-width: 600px;
// // // //             width: 100%;
// // // //             margin-top: 30px;
// // // //             padding: 20px;
// // // //             background: rgba(255,255,255,0.03);
// // // //             border-radius: 16px;
// // // //             border: 1px solid rgba(255,255,255,0.05);
// // // //             color: rgba(255,255,255,0.8);
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .seo-content h2 {
// // // //             color: #4ecdc4;
// // // //             font-size: 22px;
// // // //             margin-bottom: 15px;
// // // //           }

// // // //           .seo-content h3 {
// // // //             color: #ffd93d;
// // // //             font-size: 18px;
// // // //             margin-top: 20px;
// // // //             margin-bottom: 10px;
// // // //           }

// // // //           .seo-content p {
// // // //             line-height: 1.8;
// // // //             margin-bottom: 15px;
// // // //           }

// // // //           .seo-content ul, 
// // // //           .seo-content ol {
// // // //             padding-right: 20px;
// // // //             line-height: 2;
// // // //             margin-bottom: 15px;
// // // //           }

// // // //           .seo-content li {
// // // //             margin-bottom: 5px;
// // // //           }

// // // //           .seo-tags {
// // // //             display: flex;
// // // //             flex-wrap: wrap;
// // // //             gap: 10px;
// // // //             margin-top: 20px;
// // // //           }

// // // //           .seo-tags .tag {
// // // //             background: rgba(78, 205, 196, 0.1);
// // // //             padding: 5px 15px;
// // // //             border-radius: 20px;
// // // //             font-size: 12px;
// // // //             color: #4ecdc4;
// // // //             border: 1px solid rgba(78, 205, 196, 0.2);
// // // //           }

// // // //           /* مودال اشتراک‌گذاری */
// // // //           .share-modal {
// // // //             position: fixed;
// // // //             inset: 0;
// // // //             background: rgba(0,0,0,0.8);
// // // //             backdrop-filter: blur(10px);
// // // //             display: flex;
// // // //             align-items: center;
// // // //             justify-content: center;
// // // //             z-index: 1000;
// // // //             animation: fadeIn 0.3s ease;
// // // //           }

// // // //           .share-modal-content {
// // // //             background: linear-gradient(135deg, #1a1a2e, #16213e);
// // // //             padding: 30px;
// // // //             border-radius: 20px;
// // // //             max-width: 400px;
// // // //             width: 90%;
// // // //             text-align: center;
// // // //             border: 1px solid rgba(255,255,255,0.1);
// // // //             position: relative;
// // // //           }

// // // //           .share-modal-content h3 {
// // // //             color: #fff;
// // // //             font-size: 24px;
// // // //             margin-bottom: 10px;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .share-modal-content p {
// // // //             color: rgba(255,255,255,0.6);
// // // //             margin-bottom: 20px;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .share-buttons {
// // // //             display: flex;
// // // //             flex-direction: column;
// // // //             gap: 10px;
// // // //           }

// // // //           .share-buttons .share-btn {
// // // //             padding: 12px;
// // // //             border: none;
// // // //             border-radius: 12px;
// // // //             cursor: pointer;
// // // //             font-size: 16px;
// // // //             font-weight: 600;
// // // //             transition: all 0.3s;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .share-buttons .share-btn:hover {
// // // //             transform: scale(1.02);
// // // //           }

// // // //           .share-buttons .share-btn.telegram {
// // // //             background: #0088cc;
// // // //             color: white;
// // // //           }

// // // //           .share-buttons .share-btn.whatsapp {
// // // //             background: #25d366;
// // // //             color: white;
// // // //           }

// // // //           .share-buttons .share-btn.copy-btn {
// // // //             background: rgba(255,255,255,0.1);
// // // //             color: white;
// // // //             border: 1px solid rgba(255,255,255,0.2);
// // // //           }

// // // //           .close-modal {
// // // //             margin-top: 15px;
// // // //             padding: 10px 30px;
// // // //             border: none;
// // // //             border-radius: 10px;
// // // //             background: rgba(255,255,255,0.1);
// // // //             color: rgba(255,255,255,0.6);
// // // //             cursor: pointer;
// // // //             transition: all 0.3s;
// // // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // // //           }

// // // //           .close-modal:hover {
// // // //             background: rgba(255,255,255,0.2);
// // // //           }

// // // //           @keyframes fadeIn {
// // // //             from { opacity: 0; }
// // // //             to { opacity: 1; }
// // // //           }

// // // //           /* responsive */
// // // //           @media (max-width: 480px) {
// // // //             .game-container {
// // // //               padding: 15px;
// // // //             }

// // // //             .header h1 {
// // // //               font-size: 18px;
// // // //             }

// // // //             .stat-value {
// // // //               font-size: 16px;
// // // //             }

// // // //             .seo-content {
// // // //               padding: 15px;
// // // //             }

// // // //             .seo-content h2 {
// // // //               font-size: 18px;
// // // //             }

// // // //             .seo-content h3 {
// // // //               font-size: 16px;
// // // //             }
// // // //           }
// // // //         `}</style>
// // // //       </div>
// // // //     </>
// // // //   );
// // // // };

// // // // export default SnakeGame;
// // // import React, { useState, useEffect, useCallback, useRef } from 'react';

// // // // متا تگ‌ها به صورت مستقیم در JSX
// // // const MetaTags = () => {
// // //   return (
// // //     <>
// // //       <title>بازی مار هوشمند | مشاوراملاکی - سرگرمی و چالش</title>
// // //       <meta name="description" content="بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته. امتیاز بگیر، رکورد بزن و با دوستانت رقابت کن. بازی مار استاد در مشاوراملاکی" />
// // //       <meta name="keywords" content="بازی مار, مار استاد, بازی آنلاین, سرگرمی, مشاوراملاکی, بازی فکری, چالش" />
// // //       <meta name="robots" content="index, follow" />
// // //       <meta property="og:title" content="بازی مار استاد - مشاوراملاکی" />
// // //       <meta property="og:description" content="بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته. امتیاز بگیر و رکورد بزن!" />
// // //       <meta property="og:type" content="game" />
// // //       <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://your-site.com/snake-game'} />
// // //       <meta name="twitter:card" content="summary_large_image" />
// // //       <meta name="twitter:title" content="بازی مار استاد - مشاوراملاکی" />
// // //       <meta name="twitter:description" content="بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته" />
// // //       <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://your-site.com/snake-game'} />
      
// // //       <script
// // //         type="application/ld+json"
// // //         dangerouslySetInnerHTML={{
// // //           __html: JSON.stringify({
// // //             "@context": "https://schema.org",
// // //             "@type": "VideoGame",
// // //             "name": "بازی مار استاد",
// // //             "description": "بازی کلاسیک مار با گرافیک مدرن و امکانات ویژه برای مشاوراملاکی",
// // //             "applicationCategory": "Game",
// // //             "operatingSystem": "All",
// // //             "audience": {
// // //               "@type": "Audience",
// // //               "audienceType": "همه سنین"
// // //             },
// // //             "offers": {
// // //               "@type": "Offer",
// // //               "price": "0",
// // //               "priceCurrency": "IRR"
// // //             }
// // //           })
// // //         }}
// // //       />
// // //     </>
// // //   );
// // // };

// // // const SnakeGame = () => {
// // //   const BOARD_SIZE = 20;
// // //   const INITIAL_SNAKE = [
// // //     [10, 10],
// // //     [10, 9],
// // //     [10, 8],
// // //   ];
// // //   const INITIAL_DIRECTION = 'RIGHT';

// // //   const [snake, setSnake] = useState(INITIAL_SNAKE);
// // //   const [direction, setDirection] = useState(INITIAL_DIRECTION);
// // //   const [food, setFood] = useState(null);
// // //   const [gameOver, setGameOver] = useState(false);
// // //   const [score, setScore] = useState(0);
// // //   const [highScore, setHighScore] = useState(0);
// // //   const [isPaused, setIsPaused] = useState(false);
// // //   const [gameStarted, setGameStarted] = useState(false);
// // //   const [level, setLevel] = useState(1);
// // //   const [combo, setCombo] = useState(0);
// // //   const [showLevelUp, setShowLevelUp] = useState(false);
// // //   const [particles, setParticles] = useState([]);
// // //   const [speed, setSpeed] = useState(150);
// // //   const [foodEaten, setFoodEaten] = useState(0);
// // //   const [specialFood, setSpecialFood] = useState(null);
// // //   const [specialFoodTimer, setSpecialFoodTimer] = useState(null);
// // //   const [showShareModal, setShowShareModal] = useState(false);

// // //   const canvasRef = useRef(null);
// // //   const gameLoopRef = useRef(null);
// // //   const animationFrameRef = useRef(null);

// // //   // بارگذاری امتیاز برتر از حافظه
// // //   useEffect(() => {
// // //     const saved = localStorage.getItem('snakeHighScore');
// // //     if (saved) setHighScore(parseInt(saved));
// // //   }, []);

// // //   // ذخیره امتیاز برتر
// // //   useEffect(() => {
// // //     if (score > highScore) {
// // //       setHighScore(score);
// // //       localStorage.setItem('snakeHighScore', score.toString());
// // //       if (typeof window !== 'undefined' && window.gtag) {
// // //         window.gtag('event', 'high_score', {
// // //           'score': score,
// // //           'level': level
// // //         });
// // //       }
// // //     }
// // //   }, [score, highScore, level]);

// // //   // تولید غذا
// // //   const generateFood = useCallback((currentSnake) => {
// // //     const maxAttempts = 1000;
// // //     for (let i = 0; i < maxAttempts; i++) {
// // //       const newFood = [
// // //         Math.floor(Math.random() * BOARD_SIZE),
// // //         Math.floor(Math.random() * BOARD_SIZE),
// // //       ];
// // //       // چک می‌کنیم که غذا روی مار یا غذای ویژه نباشه
// // //       if (!currentSnake.some(segment => 
// // //         segment[0] === newFood[0] && segment[1] === newFood[1]
// // //       ) && !(specialFood && specialFood[0] === newFood[0] && specialFood[1] === newFood[1])) {
// // //         return newFood;
// // //       }
// // //     }
// // //     return null;
// // //   }, [BOARD_SIZE, specialFood]);

// // //   // تولید غذای ویژه
// // //   const generateSpecialFood = useCallback((currentSnake) => {
// // //     if (Math.random() > 0.15 || specialFood) return;
// // //     const maxAttempts = 1000;
// // //     for (let i = 0; i < maxAttempts; i++) {
// // //       const newFood = [
// // //         Math.floor(Math.random() * BOARD_SIZE),
// // //         Math.floor(Math.random() * BOARD_SIZE),
// // //       ];
// // //       if (!currentSnake.some(segment => 
// // //         segment[0] === newFood[0] && segment[1] === newFood[1]
// // //       ) && !(food && food[0] === newFood[0] && food[1] === newFood[1])) {
// // //         setSpecialFood(newFood);
// // //         setSpecialFoodTimer(Date.now() + 5000);
// // //         return;
// // //       }
// // //     }
// // //   }, [food, specialFood]);

// // //   const spawnParticles = useCallback((x, y, color, count = 12) => {
// // //     const newParticles = [];
// // //     for (let i = 0; i < count; i++) {
// // //       const angle = Math.random() * Math.PI * 2;
// // //       const speed = 1 + Math.random() * 3;
// // //       newParticles.push({
// // //         x: x * 25 + 12.5,
// // //         y: y * 25 + 12.5,
// // //         vx: Math.cos(angle) * speed,
// // //         vy: Math.sin(angle) * speed,
// // //         life: 1,
// // //         color: color,
// // //         size: 3 + Math.random() * 4,
// // //       });
// // //     }
// // //     setParticles(prev => [...prev, ...newParticles]);
// // //   }, []);

// // //   // ریست بازی - با تولید غذا در همان ابتدا
// // //   const resetGame = useCallback(() => {
// // //     setSnake(INITIAL_SNAKE);
// // //     setDirection(INITIAL_DIRECTION);
// // //     setGameOver(false);
// // //     setScore(0);
// // //     setIsPaused(false);
// // //     setGameStarted(false);
// // //     setLevel(1);
// // //     setCombo(0);
// // //     setFoodEaten(0);
// // //     setSpeed(150);
// // //     setSpecialFood(null);
// // //     setSpecialFoodTimer(null);
// // //     setParticles([]);
// // //     setShowShareModal(false);
    
// // //     // تولید غذا برای شروع بازی
// // //     const newFood = generateFood(INITIAL_SNAKE);
// // //     setFood(newFood);
// // //   }, [generateFood]);

// // //   // شروع بازی - اگر غذا وجود نداشت تولید کن
// // //   const startGame = useCallback(() => {
// // //     if (!food) {
// // //       const newFood = generateFood(snake);
// // //       setFood(newFood);
// // //     }
// // //     setGameStarted(true);
// // //   }, [food, snake, generateFood]);

// // //   const moveSnake = useCallback(() => {
// // //     if (gameOver || isPaused || !gameStarted) return;

// // //     setSnake(prevSnake => {
// // //       const newSnake = [...prevSnake];
// // //       const head = newSnake[0];
// // //       let newHead;

// // //       switch (direction) {
// // //         case 'UP': newHead = [head[0] - 1, head[1]]; break;
// // //         case 'DOWN': newHead = [head[0] + 1, head[1]]; break;
// // //         case 'LEFT': newHead = [head[0], head[1] - 1]; break;
// // //         case 'RIGHT': newHead = [head[0], head[1] + 1]; break;
// // //         default: return prevSnake;
// // //       }

// // //       // برخورد با دیوار
// // //       if (
// // //         newHead[0] < 0 || newHead[0] >= BOARD_SIZE ||
// // //         newHead[1] < 0 || newHead[1] >= BOARD_SIZE
// // //       ) {
// // //         setGameOver(true);
// // //         spawnParticles(head[0], head[1], '#ff6b6b', 20);
// // //         return prevSnake;
// // //       }

// // //       const snakeWithoutTail = newSnake.slice(0, -1);
// // //       if (snakeWithoutTail.some(segment => 
// // //         segment[0] === newHead[0] && segment[1] === newHead[1]
// // //       )) {
// // //         setGameOver(true);
// // //         spawnParticles(head[0], head[1], '#ff6b6b', 20);
// // //         return prevSnake;
// // //       }

// // //       let newSnakeMoved = [newHead, ...snakeWithoutTail];
// // //       let ateFood = false;

// // //       // غذای معمولی
// // //       if (food && newHead[0] === food[0] && newHead[1] === food[1]) {
// // //         ateFood = true;
// // //         setFoodEaten(prev => prev + 1);
// // //         setCombo(prev => prev + 1);
        
// // //         const points = 10 + combo * 2;
// // //         setScore(prev => prev + points);
// // //         spawnParticles(food[0], food[1], '#4ecdc4', 15);

// // //         // تولید غذای جدید
// // //         const newFood = generateFood(newSnakeMoved);
// // //         if (newFood) {
// // //           setFood(newFood);
// // //           generateSpecialFood(newSnakeMoved);
// // //         } else {
// // //           // اگر جایی برای غذا نبود بازی تمام می‌شود
// // //           setGameOver(true);
// // //           return newSnakeMoved;
// // //         }

// // //         // افزایش سطح
// // //         if (foodEaten > 0 && foodEaten % 5 === 0) {
// // //           setLevel(prev => prev + 1);
// // //           setSpeed(prev => Math.max(60, prev - 10));
// // //           setShowLevelUp(true);
// // //           setTimeout(() => setShowLevelUp(false), 2000);
// // //         }
// // //       }

// // //       // غذای ویژه
// // //       if (specialFood && newHead[0] === specialFood[0] && newHead[1] === specialFood[1]) {
// // //         ateFood = true;
// // //         setScore(prev => prev + 50);
// // //         spawnParticles(specialFood[0], specialFood[1], '#ffd93d', 25);
// // //         setSpecialFood(null);
// // //         setSpecialFoodTimer(null);
// // //       }

// // //       if (ateFood) {
// // //         return [newHead, ...newSnake];
// // //       }

// // //       return newSnakeMoved;
// // //     });
// // //   }, [direction, food, gameOver, isPaused, gameStarted, generateFood, specialFood, combo, foodEaten, spawnParticles]);

// // //   // حلقه بازی
// // //   useEffect(() => {
// // //     if (gameOver || !gameStarted || isPaused) {
// // //       if (gameLoopRef.current) {
// // //         clearInterval(gameLoopRef.current);
// // //         gameLoopRef.current = null;
// // //       }
// // //       return;
// // //     }

// // //     if (gameLoopRef.current) {
// // //       clearInterval(gameLoopRef.current);
// // //     }

// // //     gameLoopRef.current = setInterval(moveSnake, speed);
// // //     return () => {
// // //       if (gameLoopRef.current) {
// // //         clearInterval(gameLoopRef.current);
// // //         gameLoopRef.current = null;
// // //       }
// // //     };
// // //   }, [moveSnake, gameOver, gameStarted, isPaused, speed]);

// // //   // تایمر غذای ویژه
// // //   useEffect(() => {
// // //     if (!specialFoodTimer) return;
// // //     const checkTimer = setInterval(() => {
// // //       if (specialFood && Date.now() > specialFoodTimer) {
// // //         setSpecialFood(null);
// // //         setSpecialFoodTimer(null);
// // //       }
// // //     }, 100);
// // //     return () => clearInterval(checkTimer);
// // //   }, [specialFood, specialFoodTimer]);

// // //   // انیمیشن ذرات
// // //   useEffect(() => {
// // //     const animateParticles = () => {
// // //       setParticles(prev => 
// // //         prev
// // //           .map(p => ({
// // //             ...p,
// // //             x: p.x + p.vx,
// // //             y: p.y + p.vy,
// // //             life: p.life - 0.02,
// // //             vy: p.vy + 0.05,
// // //           }))
// // //           .filter(p => p.life > 0)
// // //       );
// // //       animationFrameRef.current = requestAnimationFrame(animateParticles);
// // //     };

// // //     animateParticles();
// // //     return () => {
// // //       if (animationFrameRef.current) {
// // //         cancelAnimationFrame(animationFrameRef.current);
// // //       }
// // //     };
// // //   }, []);

// // //   // تولید غذا در شروع اولیه
// // //   useEffect(() => {
// // //     if (!food && !gameStarted && !gameOver) {
// // //       const newFood = generateFood(INITIAL_SNAKE);
// // //       setFood(newFood);
// // //     }
// // //   }, [food, gameStarted, gameOver, generateFood]);

// // //   // کنترل‌های کیبورد
// // //   useEffect(() => {
// // //     const handleKeyPress = (e) => {
// // //       const key = e.key;
      
// // //       if (key === ' ' || key === 'Space') {
// // //         e.preventDefault();
// // //         if (!gameStarted && !gameOver) {
// // //           startGame();
// // //         } else if (!gameOver) {
// // //           setIsPaused(prev => !prev);
// // //         }
// // //         return;
// // //       }

// // //       if (key === 'r' || key === 'R') {
// // //         resetGame();
// // //         return;
// // //       }

// // //       if (!gameStarted || gameOver || isPaused) return;

// // //       const oppositeDirections = {
// // //         'UP': 'DOWN',
// // //         'DOWN': 'UP',
// // //         'LEFT': 'RIGHT',
// // //         'RIGHT': 'LEFT'
// // //       };

// // //       let newDirection = null;
// // //       switch (key) {
// // //         case 'ArrowUp': newDirection = 'UP'; break;
// // //         case 'ArrowDown': newDirection = 'DOWN'; break;
// // //         case 'ArrowLeft': newDirection = 'RIGHT'; break;
// // //         case 'ArrowRight': newDirection = 'LEFT'; break;
// // //         default: return;
// // //       }

// // //       e.preventDefault();
// // //       if (newDirection && oppositeDirections[newDirection] !== direction) {
// // //         setDirection(newDirection);
// // //       }
// // //     };

// // //     window.addEventListener('keydown', handleKeyPress);
// // //     return () => window.removeEventListener('keydown', handleKeyPress);
// // //   }, [direction, gameStarted, gameOver, isPaused, resetGame, startGame]);

// // //   // کنترل‌های لمسی
// // //   const [touchStart, setTouchStart] = useState(null);
// // //   const handleTouchStart = (e) => {
// // //     const touch = e.touches[0];
// // //     setTouchStart({ x: touch.clientX, y: touch.clientY });
// // //   };

// // //   const handleTouchEnd = (e) => {
// // //     if (!touchStart) return;
// // //     const touch = e.changedTouches[0];
// // //     const dx = touch.clientX - touchStart.x;
// // //     const dy = touch.clientY - touchStart.y;
    
// // //     if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
// // //       if (!gameStarted && !gameOver) {
// // //         startGame();
// // //       } else if (!gameOver) {
// // //         setIsPaused(prev => !prev);
// // //       }
// // //       return;
// // //     }

// // //     if (Math.abs(dx) > Math.abs(dy)) {
// // //       if (dx > 0 && direction !== 'LEFT') setDirection('RIGHT');
// // //       else if (dx < 0 && direction !== 'RIGHT') setDirection('LEFT');
// // //     } else {
// // //       if (dy > 0 && direction !== 'UP') setDirection('DOWN');
// // //       else if (dy < 0 && direction !== 'DOWN') setDirection('UP');
// // //     }
// // //     setTouchStart(null);
// // //   };

// // //   const renderBoard = () => {
// // //     const cells = [];
// // //     for (let row = 0; row < BOARD_SIZE; row++) {
// // //       for (let col = 0; col < BOARD_SIZE; col++) {
// // //         const isSnake = snake.some(segment => segment[0] === row && segment[1] === col);
// // //         const isFood = food && food[0] === row && food[1] === col;
// // //         const isSpecial = specialFood && specialFood[0] === row && specialFood[1] === col;
// // //         const isHead = snake[0] && snake[0][0] === row && snake[0][1] === col;
// // //         const isTail = snake[snake.length - 1] && 
// // //           snake[snake.length - 1][0] === row && 
// // //           snake[snake.length - 1][1] === col;

// // //         let className = 'cell';
// // //         if (isSnake) className += ' snake';
// // //         if (isHead) className += ' head';
// // //         if (isTail) className += ' tail';
// // //         if (isFood) className += ' food';
// // //         if (isSpecial) className += ' special-food';

// // //         const style = {};
// // //         if (isSnake && !isHead) {
// // //           const index = snake.findIndex(seg => seg[0] === row && seg[1] === col);
// // //           const gradient = `hsl(${170 + index * 5}, 70%, ${45 + index * 1.5}%)`;
// // //           style.background = gradient;
// // //         }

// // //         cells.push(
// // //           <div 
// // //             key={`${row}-${col}`} 
// // //             className={className} 
// // //             style={style}
// // //             role="gridcell"
// // //             aria-label={`سلول ${row} ${col}`}
// // //           />
// // //         );
// // //       }
// // //     }
// // //     return cells;
// // //   };

// // //   const shareScore = () => {
// // //     const text = `🐍 من در بازی مار استاد به امتیاز ${score} در سطح ${level} رسیدم!\nآیا میتونی رکورد من رو بزنی؟\nمشاوراملاکی`;
// // //     const url = typeof window !== 'undefined' ? window.location.href : '';
    
// // //     if (navigator.share) {
// // //       navigator.share({
// // //         title: 'بازی مار استاد - مشاوراملاکی',
// // //         text: text,
// // //         url: url,
// // //       }).catch(() => {});
// // //     } else {
// // //       setShowShareModal(true);
// // //     }
// // //   };

// // //   const copyToClipboard = () => {
// // //     const text = `🐍 من در بازی مار استاد به امتیاز ${score} در سطح ${level} رسیدم!\nآیا میتونی رکورد من رو بزنی؟\nمشاوراملاکی`;
// // //     navigator.clipboard.writeText(text);
// // //     setShowShareModal(false);
// // //   };

// // //   return (
// // //     <>
// // //       <MetaTags />

// // //       <div className="game-wrapper" dir="rtl">
// // //         <nav aria-label="مسیر دسترسی" className="breadcrumb">
// // //           <ol>
// // //             <li><a href="/">خانه</a></li>
// // //             <li><a href="/games">بازی‌ها</a></li>
// // //             <li className="active">بازی مار استاد</li>
// // //           </ol>
// // //         </nav>

// // //         <div className="bg-particles" aria-hidden="true" />
// // //         <div className="bg-grid" aria-hidden="true" />

// // //         <div className="game-container">
// // //           <div className="header">
// // //             <div className="header-left">
// // //               <h1>
// // //                 <span className="snake-icon" aria-hidden="true">🐍</span>
// // //                 مار استاد
// // //               </h1>
// // //               <div className="level-badge" role="status" aria-live="polite">
// // //                 <span aria-hidden="true">🏆</span>
// // //                 <span>سطح {level}</span>
// // //               </div>
// // //             </div>
// // //             <div className="stats">
// // //               <div className="stat-item">
// // //                 <span className="stat-label">امتیاز</span>
// // //                 <span className="stat-value" role="status" aria-live="polite">{score}</span>
// // //               </div>
// // //               <div className="stat-item">
// // //                 <span className="stat-label">بهترین</span>
// // //                 <span className="stat-value high-score" role="status" aria-live="polite">{highScore}</span>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="board-wrapper">
// // //             <div 
// // //               className="board"
// // //               onTouchStart={handleTouchStart}
// // //               onTouchEnd={handleTouchEnd}
// // //               role="grid"
// // //               aria-label="تخته بازی مار"
// // //               style={{
// // //                 display: 'grid',
// // //                 gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
// // //                 gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
// // //                 gap: '2px',
// // //                 backgroundColor: 'rgba(255,255,255,0.05)',
// // //                 padding: '12px',
// // //                 borderRadius: '16px',
// // //                 position: 'relative',
// // //               }}
// // //             >
// // //               {renderBoard()}

// // //               {particles.map((p, i) => (
// // //                 <div
// // //                   key={i}
// // //                   className="particle"
// // //                   style={{
// // //                     position: 'absolute',
// // //                     left: p.x,
// // //                     top: p.y,
// // //                     width: p.size,
// // //                     height: p.size,
// // //                     background: p.color,
// // //                     borderRadius: '50%',
// // //                     opacity: p.life,
// // //                     transform: `scale(${p.life})`,
// // //                     pointerEvents: 'none',
// // //                   }}
// // //                   aria-hidden="true"
// // //                 />
// // //               ))}

// // //               {showLevelUp && (
// // //                 <div className="level-up-overlay" role="status" aria-live="assertive">
// // //                   <div className="level-up-text">
// // //                     ⭐ سطح {level}!
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {gameOver && (
// // //                 <div className="game-over-overlay" role="dialog" aria-label="پایان بازی">
// // //                   <div className="game-over-content">
// // //                     <div className="game-over-icon" aria-hidden="true">💀</div>
// // //                     <h2>بازی تمام شد!</h2>
// // //                     <div className="final-score">
// // //                       امتیاز: <span>{score}</span>
// // //                     </div>
// // //                     <div className="final-stats">
// // //                       <div>سطح: {level}</div>
// // //                       <div>غذا: {foodEaten}</div>
// // //                     </div>
// // //                     <div className="game-over-buttons">
// // //                       <button 
// // //                         className="play-again-btn" 
// // //                         onClick={resetGame}
// // //                         aria-label="شروع مجدد بازی"
// // //                       >
// // //                         بازی دوباره
// // //                       </button>
// // //                       {score > 0 && (
// // //                         <button 
// // //                           className="share-btn" 
// // //                           onClick={shareScore}
// // //                           aria-label="اشتراک‌گذاری امتیاز"
// // //                         >
// // //                           📤 اشتراک‌گذاری
// // //                         </button>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {isPaused && !gameOver && gameStarted && (
// // //                 <div className="pause-overlay" role="status" aria-live="polite">
// // //                   <div className="pause-icon" aria-hidden="true">⏸️</div>
// // //                   <div className="pause-text">مکث</div>
// // //                 </div>
// // //               )}

// // //               {!gameStarted && !gameOver && (
// // //                 <div className="start-overlay" role="dialog" aria-label="شروع بازی">
// // //                   <div className="start-content">
// // //                     <div className="start-icon" aria-hidden="true">🐍</div>
// // //                     <h2>مار استاد</h2>
// // //                     <p>برای شروع دکمه <strong>Space</strong> یا کلیک کن</p>
// // //                     <button 
// // //                       className="start-btn" 
// // //                       onClick={startGame}
// // //                       aria-label="شروع بازی"
// // //                     >
// // //                       شروع بازی
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           <div className="controls">
// // //             <button 
// // //               className="control-btn primary"
// // //               onClick={() => {
// // //                 if (!gameStarted && !gameOver) {
// // //                   startGame();
// // //                 } else if (!gameOver) {
// // //                   setIsPaused(prev => !prev);
// // //                 }
// // //               }}
// // //               aria-label={!gameStarted ? "شروع بازی" : isPaused ? "ادامه بازی" : "مکث بازی"}
// // //             >
// // //               {!gameStarted ? '▶ شروع' : isPaused ? '▶ ادامه' : '⏸ مکث'}
// // //             </button>
// // //             <button 
// // //               className="control-btn secondary" 
// // //               onClick={resetGame}
// // //               aria-label="بازی جدید"
// // //             >
// // //               🔄 بازی جدید
// // //             </button>
// // //           </div>

// // //           <div className="mobile-controls" aria-label="کنترل‌های حرکتی">
// // //             <div className="dpad">
// // //               <button 
// // //                 className="dpad-btn up" 
// // //                 onClick={() => direction !== 'DOWN' && setDirection('UP')}
// // //                 aria-label="بالا"
// // //               >
// // //                 ▲
// // //               </button>
// // //               <button 
// // //                 className="dpad-btn down" 
// // //                 onClick={() => direction !== 'UP' && setDirection('DOWN')}
// // //                 aria-label="پایین"
// // //               >
// // //                 ▼
// // //               </button>
// // //               <button 
// // //                 className="dpad-btn left" 
// // //                 onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
// // //                 aria-label="چپ"
// // //               >
// // //                 ◄
// // //               </button>
// // //               <button 
// // //                 className="dpad-btn right" 
// // //                 onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
// // //                 aria-label="راست"
// // //               >
// // //                 ►
// // //               </button>
// // //             </div>
// // //           </div>

// // //           <div className="info">
// // //             <div className="combo-display">
// // //               {combo > 1 && <span className="combo-text" role="status">🔥 کامبو x{combo}</span>}
// // //             </div>
// // //             <div className="instructions" aria-label="راهنمای کلیدها">
// // //               <span>↑ ↓ ← →</span>
// // //               <span className="sep">|</span>
// // //               <span>␣ مکث</span>
// // //               <span className="sep">|</span>
// // //               <span>R ریستارت</span>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="seo-content">
// // //           <h2>درباره بازی مار استاد</h2>
// // //           <p>
// // //             بازی مار استاد یک بازی کلاسیک و سرگرم‌کننده است که در سایت مشاوراملاکی طراحی شده تا 
// // //             لحظات خوشی را برای شما به ارمغان بیاورد. این بازی با گرافیک مدرن و امکانات پیشرفته، 
// // //             تجربه‌ای متفاوت از بازی‌های سنتی مار را به شما ارائه می‌دهد.
// // //           </p>
          
// // //           <h3>ویژگی‌های بازی مار</h3>
// // //           <ul>
// // //             <li>گرافیک زیبا و مدرن با افکت‌های ویژه</li>
// // //             <li>سیستم امتیازدهی پویا با ترکیب (کامبو)</li>
// // //             <li>غذاهای ویژه با امتیاز بیشتر</li>
// // //             <li>سطح‌بندی پیشرفته با افزایش سرعت</li>
// // //             <li>قابل بازی در موبایل و دسکتاپ</li>
// // //             <li>ذخیره خودکار رکوردها</li>
// // //           </ul>

// // //           <h3>چطور بازی کنیم؟</h3>
// // //           <ol>
// // //             <li>با کلیدهای جهت‌نما (↑ ↓ ← →) مار را حرکت دهید</li>
// // //             <li>برای شروع بازی کلید Space را بزنید</li>
// // //             <li>غذاهای قرمز رنگ را بخورید تا امتیاز بگیرید</li>
// // //             <li>غذاهای طلایی ویژه امتیاز بیشتری دارند</li>
// // //             <li>با هر ۵ بار غذا خوردن، سطح شما افزایش می‌یابد</li>
// // //           </ol>
          
// // //           <h3>چرا بازی مار؟</h3>
// // //           <p>
// // //             بازی مار یکی از محبوب‌ترین بازی‌های تاریخ است که با وجود سادگی، چالش‌های زیادی را 
// // //             برای بازیکنان ایجاد می‌کند. این بازی به بهبود مهارت‌های تصمیم‌گیری، واکنش سریع و 
// // //             برنامه‌ریزی کمک می‌کند.
// // //           </p>
          
// // //           <div className="seo-tags">
// // //             <span className="tag">#بازی_مار</span>
// // //             <span className="tag">#مار_استاد</span>
// // //             <span className="tag">#مشاوراملاکی</span>
// // //             <span className="tag">#بازی_آنلاین</span>
// // //             <span className="tag">#سرگرمی</span>
// // //           </div>
// // //         </div>

// // //         {showShareModal && (
// // //           <div className="share-modal" role="dialog" aria-label="اشتراک‌گذاری امتیاز">
// // //             <div className="share-modal-content">
// // //               <h3>اشتراک‌گذاری امتیاز</h3>
// // //               <p>امتیاز خود را با دوستانتان به اشتراک بگذارید!</p>
// // //               <div className="share-buttons">
// // //                 <button onClick={copyToClipboard} className="share-btn copy-btn">
// // //                   📋 کپی متن
// // //                 </button>
// // //                 <button 
// // //                   onClick={() => {
// // //                     const url = typeof window !== 'undefined' ? window.location.href : '';
// // //                     window.open(`https://t.me/share/url?url=${url}&text=🐍 من در بازی مار استاد به امتیاز ${score} رسیدم!`);
// // //                   }}
// // //                   className="share-btn telegram"
// // //                 >
// // //                   📨 تلگرام
// // //                 </button>
// // //                 <button 
// // //                   onClick={() => {
// // //                     const url = typeof window !== 'undefined' ? window.location.href : '';
// // //                     window.open(`https://api.whatsapp.com/send?text=🐍 من در بازی مار استاد به امتیاز ${score} رسیدم! ${url}`);
// // //                   }}
// // //                   className="share-btn whatsapp"
// // //                 >
// // //                   💬 واتساپ
// // //                 </button>
// // //               </div>
// // //               <button onClick={() => setShowShareModal(false)} className="close-modal">
// // //                 ✖ بستن
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}

// // //         <style jsx>{`
// // //           /* تمام استایل‌های قبلی به همین شکل باقی می‌مانند */
// // //           .game-wrapper {
// // //             min-height: 100vh;
// // //             background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
// // //             display: flex;
// // //             flex-direction: column;
// // //             align-items: center;
// // //             justify-content: center;
// // //             padding: 20px;
// // //             position: relative;
// // //             overflow: hidden;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .breadcrumb {
// // //             width: 100%;
// // //             max-width: 600px;
// // //             padding: 10px 0;
// // //             color: rgba(255,255,255,0.6);
// // //             font-size: 14px;
// // //             margin-bottom: 10px;
// // //           }

// // //           .breadcrumb ol {
// // //             display: flex;
// // //             list-style: none;
// // //             padding: 0;
// // //             margin: 0;
// // //             gap: 8px;
// // //           }

// // //           .breadcrumb li {
// // //             display: flex;
// // //             align-items: center;
// // //           }

// // //           .breadcrumb li:not(:last-child)::after {
// // //             content: '/';
// // //             margin-left: 8px;
// // //             color: rgba(255,255,255,0.3);
// // //           }

// // //           .breadcrumb a {
// // //             color: rgba(255,255,255,0.6);
// // //             text-decoration: none;
// // //             transition: color 0.3s;
// // //           }

// // //           .breadcrumb a:hover {
// // //             color: #4ecdc4;
// // //           }

// // //           .breadcrumb .active {
// // //             color: #4ecdc4;
// // //           }

// // //           .bg-particles {
// // //             position: absolute;
// // //             width: 100%;
// // //             height: 100%;
// // //             background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
// // //                               radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
// // //                               radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
// // //                               radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
// // //                               radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0));
// // //             background-size: 200px 200px;
// // //             opacity: 0.3;
// // //           }

// // //           .bg-grid {
// // //             position: absolute;
// // //             width: 100%;
// // //             height: 100%;
// // //             background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
// // //                               linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
// // //             background-size: 50px 50px;
// // //           }

// // //           .game-container {
// // //             background: rgba(255,255,255,0.05);
// // //             backdrop-filter: blur(20px);
// // //             border-radius: 24px;
// // //             padding: 30px;
// // //             max-width: 600px;
// // //             width: 100%;
// // //             border: 1px solid rgba(255,255,255,0.1);
// // //             box-shadow: 0 25px 50px rgba(0,0,0,0.5);
// // //             position: relative;
// // //             z-index: 1;
// // //           }

// // //           .header {
// // //             display: flex;
// // //             justify-content: space-between;
// // //             align-items: center;
// // //             margin-bottom: 20px;
// // //             flex-wrap: wrap;
// // //             gap: 10px;
// // //           }

// // //           .header-left {
// // //             display: flex;
// // //             align-items: center;
// // //             gap: 12px;
// // //           }

// // //           .header h1 {
// // //             margin: 0;
// // //             font-size: 22px;
// // //             font-weight: 700;
// // //             background: linear-gradient(135deg, #4ecdc4, #44d4b4);
// // //             -webkit-background-clip: text;
// // //             -webkit-text-fill-color: transparent;
// // //             letter-spacing: -0.5px;
// // //           }

// // //           .snake-icon {
// // //             -webkit-text-fill-color: initial;
// // //           }

// // //           .level-badge {
// // //             background: rgba(78, 205, 196, 0.15);
// // //             padding: 4px 12px;
// // //             border-radius: 20px;
// // //             font-size: 12px;
// // //             color: #4ecdc4;
// // //             display: flex;
// // //             align-items: center;
// // //             gap: 4px;
// // //             border: 1px solid rgba(78, 205, 196, 0.2);
// // //           }

// // //           .stats {
// // //             display: flex;
// // //             gap: 15px;
// // //           }

// // //           .stat-item {
// // //             display: flex;
// // //             flex-direction: column;
// // //             align-items: center;
// // //           }

// // //           .stat-label {
// // //             font-size: 10px;
// // //             text-transform: uppercase;
// // //             color: rgba(255,255,255,0.4);
// // //             letter-spacing: 1px;
// // //           }

// // //           .stat-value {
// // //             font-size: 20px;
// // //             font-weight: 700;
// // //             color: #fff;
// // //           }

// // //           .stat-value.high-score {
// // //             color: #ffd93d;
// // //           }

// // //           .board-wrapper {
// // //             position: relative;
// // //           }

// // //           .board {
// // //             width: 100%;
// // //             aspect-ratio: 1;
// // //             margin: 0 auto;
// // //             position: relative;
// // //             background: rgba(0,0,0,0.3);
// // //             border-radius: 16px;
// // //           }

// // //           .cell {
// // //             width: 100%;
// // //             height: 100%;
// // //             background: rgba(255,255,255,0.05);
// // //             border-radius: 4px;
// // //             transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
// // //           }

// // //           .cell.snake {
// // //             background: linear-gradient(135deg, #4ecdc4, #44b39d);
// // //             border-radius: 6px;
// // //             box-shadow: 0 0 20px rgba(78, 205, 196, 0.3);
// // //           }

// // //           .cell.head {
// // //             background: linear-gradient(135deg, #5fd9d0, #4ecdc4) !important;
// // //             border-radius: 8px;
// // //             box-shadow: 0 0 30px rgba(78, 205, 196, 0.6), inset 0 -2px 0 rgba(0,0,0,0.2);
// // //             transform: scale(0.9);
// // //           }

// // //           .cell.tail {
// // //             border-radius: 4px;
// // //             opacity: 0.7;
// // //           }

// // //           .cell.food {
// // //             background: radial-gradient(circle, #ff6b6b, #ee5a24);
// // //             border-radius: 50%;
// // //             box-shadow: 0 0 30px rgba(255, 107, 107, 0.6);
// // //             animation: foodPulse 0.6s ease-in-out infinite alternate;
// // //           }

// // //           .cell.special-food {
// // //             background: radial-gradient(circle, #ffd93d, #f6b93b);
// // //             border-radius: 50%;
// // //             box-shadow: 0 0 40px rgba(255, 217, 61, 0.8);
// // //             animation: specialPulse 0.3s ease-in-out infinite alternate;
// // //           }

// // //           @keyframes foodPulse {
// // //             from { transform: scale(0.8); }
// // //             to { transform: scale(1.1); }
// // //           }

// // //           @keyframes specialPulse {
// // //             from { transform: scale(0.7) rotate(0deg); }
// // //             to { transform: scale(1.2) rotate(180deg); }
// // //           }

// // //           .controls {
// // //             display: flex;
// // //             gap: 10px;
// // //             margin-top: 15px;
// // //             justify-content: center;
// // //             flex-wrap: wrap;
// // //           }

// // //           .control-btn {
// // //             padding: 10px 25px;
// // //             font-size: 14px;
// // //             font-weight: 600;
// // //             border: none;
// // //             border-radius: 12px;
// // //             cursor: pointer;
// // //             transition: all 0.3s;
// // //             letter-spacing: 0.5px;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .control-btn.primary {
// // //             background: linear-gradient(135deg, #4ecdc4, #44b39d);
// // //             color: white;
// // //             box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
// // //           }

// // //           .control-btn.primary:hover {
// // //             transform: translateY(-2px);
// // //             box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
// // //           }

// // //           .control-btn.secondary {
// // //             background: rgba(255,255,255,0.1);
// // //             color: white;
// // //             border: 1px solid rgba(255,255,255,0.2);
// // //           }

// // //           .control-btn.secondary:hover {
// // //             background: rgba(255,255,255,0.2);
// // //             transform: translateY(-2px);
// // //           }

// // //           .mobile-controls {
// // //             display: none;
// // //             margin-top: 15px;
// // //             justify-content: center;
// // //           }

// // //           @media (max-width: 768px) {
// // //             .mobile-controls {
// // //               display: flex;
// // //             }
// // //           }

// // //           .dpad {
// // //             display: grid;
// // //             grid-template-columns: 60px 60px 60px;
// // //             grid-template-rows: 60px 60px 60px;
// // //             gap: 4px;
// // //           }

// // //           .dpad-btn {
// // //             background: rgba(255,255,255,0.1);
// // //             border: 1px solid rgba(255,255,255,0.15);
// // //             border-radius: 12px;
// // //             color: white;
// // //             font-size: 20px;
// // //             cursor: pointer;
// // //             transition: all 0.2s;
// // //             display: flex;
// // //             align-items: center;
// // //             justify-content: center;
// // //             -webkit-tap-highlight-color: transparent;
// // //             user-select: none;
// // //           }

// // //           .dpad-btn:active {
// // //             background: rgba(78, 205, 196, 0.3);
// // //             transform: scale(0.95);
// // //           }

// // //           .dpad-btn.up { grid-column: 2; grid-row: 1; }
// // //           .dpad-btn.down { grid-column: 2; grid-row: 3; }
// // //           .dpad-btn.left { grid-column: 1; grid-row: 2; }
// // //           .dpad-btn.right { grid-column: 3; grid-row: 2; }

// // //           .info {
// // //             margin-top: 15px;
// // //             text-align: center;
// // //           }

// // //           .combo-display {
// // //             min-height: 24px;
// // //             margin-bottom: 8px;
// // //           }

// // //           .combo-text {
// // //             color: #ffd93d;
// // //             font-weight: 700;
// // //             font-size: 18px;
// // //             animation: comboPop 0.3s ease;
// // //           }

// // //           @keyframes comboPop {
// // //             0% { transform: scale(0.5); opacity: 0; }
// // //             50% { transform: scale(1.2); }
// // //             100% { transform: scale(1); opacity: 1; }
// // //           }

// // //           .instructions {
// // //             display: flex;
// // //             justify-content: center;
// // //             gap: 10px;
// // //             color: rgba(255,255,255,0.4);
// // //             font-size: 13px;
// // //             flex-wrap: wrap;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .sep {
// // //             color: rgba(255,255,255,0.1);
// // //           }

// // //           .game-over-overlay,
// // //           .pause-overlay,
// // //           .start-overlay,
// // //           .level-up-overlay {
// // //             position: absolute;
// // //             inset: 0;
// // //             display: flex;
// // //             align-items: center;
// // //             justify-content: center;
// // //             background: rgba(0,0,0,0.75);
// // //             backdrop-filter: blur(8px);
// // //             border-radius: 16px;
// // //             z-index: 10;
// // //           }

// // //           .game-over-content,
// // //           .start-content {
// // //             text-align: center;
// // //             padding: 30px;
// // //             animation: fadeInUp 0.5s ease;
// // //           }

// // //           .game-over-icon {
// // //             font-size: 64px;
// // //             margin-bottom: 10px;
// // //           }

// // //           .game-over-content h2 {
// // //             font-size: 32px;
// // //             margin: 10px 0;
// // //             color: #ff6b6b;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .final-score {
// // //             font-size: 24px;
// // //             color: #fff;
// // //             margin: 10px 0;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .final-score span {
// // //             color: #ffd93d;
// // //             font-size: 32px;
// // //           }

// // //           .final-stats {
// // //             display: flex;
// // //             justify-content: center;
// // //             gap: 30px;
// // //             color: rgba(255,255,255,0.6);
// // //             margin: 15px 0;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .game-over-buttons {
// // //             display: flex;
// // //             gap: 10px;
// // //             justify-content: center;
// // //             flex-wrap: wrap;
// // //           }

// // //           .play-again-btn,
// // //           .start-btn {
// // //             padding: 12px 40px;
// // //             font-size: 16px;
// // //             font-weight: 600;
// // //             border: none;
// // //             border-radius: 12px;
// // //             background: linear-gradient(135deg, #4ecdc4, #44b39d);
// // //             color: white;
// // //             cursor: pointer;
// // //             transition: all 0.3s;
// // //             margin-top: 10px;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .play-again-btn:hover,
// // //           .start-btn:hover {
// // //             transform: scale(1.05);
// // //             box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
// // //           }

// // //           .share-btn {
// // //             padding: 12px 30px;
// // //             font-size: 16px;
// // //             font-weight: 600;
// // //             border: none;
// // //             border-radius: 12px;
// // //             background: linear-gradient(135deg, #ffd93d, #f6b93b);
// // //             color: #333;
// // //             cursor: pointer;
// // //             transition: all 0.3s;
// // //             margin-top: 10px;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .share-btn:hover {
// // //             transform: scale(1.05);
// // //             box-shadow: 0 8px 25px rgba(255, 217, 61, 0.4);
// // //           }

// // //           .pause-icon,
// // //           .start-icon {
// // //             font-size: 56px;
// // //             animation: pulse 1.5s ease-in-out infinite;
// // //           }

// // //           .pause-text {
// // //             color: #fff;
// // //             font-size: 24px;
// // //             font-weight: 700;
// // //             margin-top: 10px;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .start-content h2 {
// // //             font-size: 32px;
// // //             color: #fff;
// // //             margin: 10px 0;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .start-content p {
// // //             color: rgba(255,255,255,0.6);
// // //             margin: 10px 0 20px;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .level-up-text {
// // //             font-size: 48px;
// // //             font-weight: 700;
// // //             color: #ffd93d;
// // //             text-shadow: 0 0 40px rgba(255, 217, 61, 0.5);
// // //             animation: levelUpPop 0.5s ease;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           @keyframes fadeInUp {
// // //             from { opacity: 0; transform: translateY(20px); }
// // //             to { opacity: 1; transform: translateY(0); }
// // //           }

// // //           @keyframes pulse {
// // //             0%, 100% { transform: scale(1); }
// // //             50% { transform: scale(1.1); }
// // //           }

// // //           @keyframes levelUpPop {
// // //             0% { transform: scale(0) rotate(-10deg); opacity: 0; }
// // //             50% { transform: scale(1.2) rotate(5deg); }
// // //             100% { transform: scale(1) rotate(0deg); opacity: 1; }
// // //           }

// // //           .particle {
// // //             position: absolute;
// // //             pointer-events: none;
// // //             border-radius: 50%;
// // //             will-change: transform, opacity;
// // //           }

// // //           .seo-content {
// // //             max-width: 600px;
// // //             width: 100%;
// // //             margin-top: 30px;
// // //             padding: 20px;
// // //             background: rgba(255,255,255,0.03);
// // //             border-radius: 16px;
// // //             border: 1px solid rgba(255,255,255,0.05);
// // //             color: rgba(255,255,255,0.8);
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .seo-content h2 {
// // //             color: #4ecdc4;
// // //             font-size: 22px;
// // //             margin-bottom: 15px;
// // //           }

// // //           .seo-content h3 {
// // //             color: #ffd93d;
// // //             font-size: 18px;
// // //             margin-top: 20px;
// // //             margin-bottom: 10px;
// // //           }

// // //           .seo-content p {
// // //             line-height: 1.8;
// // //             margin-bottom: 15px;
// // //           }

// // //           .seo-content ul, 
// // //           .seo-content ol {
// // //             padding-right: 20px;
// // //             line-height: 2;
// // //             margin-bottom: 15px;
// // //           }

// // //           .seo-content li {
// // //             margin-bottom: 5px;
// // //           }

// // //           .seo-tags {
// // //             display: flex;
// // //             flex-wrap: wrap;
// // //             gap: 10px;
// // //             margin-top: 20px;
// // //           }

// // //           .seo-tags .tag {
// // //             background: rgba(78, 205, 196, 0.1);
// // //             padding: 5px 15px;
// // //             border-radius: 20px;
// // //             font-size: 12px;
// // //             color: #4ecdc4;
// // //             border: 1px solid rgba(78, 205, 196, 0.2);
// // //           }

// // //           .share-modal {
// // //             position: fixed;
// // //             inset: 0;
// // //             background: rgba(0,0,0,0.8);
// // //             backdrop-filter: blur(10px);
// // //             display: flex;
// // //             align-items: center;
// // //             justify-content: center;
// // //             z-index: 1000;
// // //             animation: fadeIn 0.3s ease;
// // //           }

// // //           .share-modal-content {
// // //             background: linear-gradient(135deg, #1a1a2e, #16213e);
// // //             padding: 30px;
// // //             border-radius: 20px;
// // //             max-width: 400px;
// // //             width: 90%;
// // //             text-align: center;
// // //             border: 1px solid rgba(255,255,255,0.1);
// // //             position: relative;
// // //           }

// // //           .share-modal-content h3 {
// // //             color: #fff;
// // //             font-size: 24px;
// // //             margin-bottom: 10px;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .share-modal-content p {
// // //             color: rgba(255,255,255,0.6);
// // //             margin-bottom: 20px;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .share-buttons {
// // //             display: flex;
// // //             flex-direction: column;
// // //             gap: 10px;
// // //           }

// // //           .share-buttons .share-btn {
// // //             padding: 12px;
// // //             border: none;
// // //             border-radius: 12px;
// // //             cursor: pointer;
// // //             font-size: 16px;
// // //             font-weight: 600;
// // //             transition: all 0.3s;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .share-buttons .share-btn:hover {
// // //             transform: scale(1.02);
// // //           }

// // //           .share-buttons .share-btn.telegram {
// // //             background: #0088cc;
// // //             color: white;
// // //           }

// // //           .share-buttons .share-btn.whatsapp {
// // //             background: #25d366;
// // //             color: white;
// // //           }

// // //           .share-buttons .share-btn.copy-btn {
// // //             background: rgba(255,255,255,0.1);
// // //             color: white;
// // //             border: 1px solid rgba(255,255,255,0.2);
// // //           }

// // //           .close-modal {
// // //             margin-top: 15px;
// // //             padding: 10px 30px;
// // //             border: none;
// // //             border-radius: 10px;
// // //             background: rgba(255,255,255,0.1);
// // //             color: rgba(255,255,255,0.6);
// // //             cursor: pointer;
// // //             transition: all 0.3s;
// // //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// // //           }

// // //           .close-modal:hover {
// // //             background: rgba(255,255,255,0.2);
// // //           }

// // //           @keyframes fadeIn {
// // //             from { opacity: 0; }
// // //             to { opacity: 1; }
// // //           }

// // //           @media (max-width: 480px) {
// // //             .game-container {
// // //               padding: 15px;
// // //             }

// // //             .header h1 {
// // //               font-size: 18px;
// // //             }

// // //             .stat-value {
// // //               font-size: 16px;
// // //             }

// // //             .seo-content {
// // //               padding: 15px;
// // //             }

// // //             .seo-content h2 {
// // //               font-size: 18px;
// // //             }

// // //             .seo-content h3 {
// // //               font-size: 16px;
// // //             }
// // //           }
// // //         `}</style>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default SnakeGame;

// // import React, { useState, useEffect, useCallback, useRef } from 'react';

// // // متا تگ‌ها به صورت مستقیم در JSX
// // const MetaTags = () => {
// //   return (
// //     <>
// //       <title>بازی مار هوشمند | مشاوراملاکی - سرگرمی و چالش</title>
// //       <meta name="description" content="بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته. امتیاز بگیر، رکورد بزن و با دوستانت رقابت کن. بازی مار استاد در مشاوراملاکی" />
// //       <meta name="keywords" content="بازی مار, مار استاد, بازی آنلاین, سرگرمی, مشاوراملاکی, بازی فکری, چالش" />
// //       <meta name="robots" content="index, follow" />
// //       <meta property="og:title" content="بازی مار استاد - مشاوراملاکی" />
// //       <meta property="og:description" content="بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته. امتیاز بگیر و رکورد بزن!" />
// //       <meta property="og:type" content="game" />
// //       <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://your-site.com/snake-game'} />
// //       <meta name="twitter:card" content="summary_large_image" />
// //       <meta name="twitter:title" content="بازی مار استاد - مشاوراملاکی" />
// //       <meta name="twitter:description" content="بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته" />
// //       <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://your-site.com/snake-game'} />
      
// //       <script
// //         type="application/ld+json"
// //         dangerouslySetInnerHTML={{
// //           __html: JSON.stringify({
// //             "@context": "https://schema.org",
// //             "@type": "VideoGame",
// //             "name": "بازی مار استاد",
// //             "description": "بازی کلاسیک مار با گرافیک مدرن و امکانات ویژه برای مشاوراملاکی",
// //             "applicationCategory": "Game",
// //             "operatingSystem": "All",
// //             "audience": {
// //               "@type": "Audience",
// //               "audienceType": "همه سنین"
// //             },
// //             "offers": {
// //               "@type": "Offer",
// //               "price": "0",
// //               "priceCurrency": "IRR"
// //             }
// //           })
// //         }}
// //       />
// //     </>
// //   );
// // };

// // const SnakeGame = () => {
// //   const BOARD_SIZE = 20;
// //   const INITIAL_SNAKE = [
// //     [10, 10],
// //     [10, 9],
// //     [10, 8],
// //   ];
// //   const INITIAL_DIRECTION = 'RIGHT';

// //   const [snake, setSnake] = useState(INITIAL_SNAKE);
// //   const [direction, setDirection] = useState(INITIAL_DIRECTION);
// //   const [food, setFood] = useState(null);
// //   const [gameOver, setGameOver] = useState(false);
// //   const [score, setScore] = useState(0);
// //   const [highScore, setHighScore] = useState(0);
// //   const [isPaused, setIsPaused] = useState(false);
// //   const [gameStarted, setGameStarted] = useState(false);
// //   const [level, setLevel] = useState(1);
// //   const [combo, setCombo] = useState(0);
// //   const [showLevelUp, setShowLevelUp] = useState(false);
// //   const [particles, setParticles] = useState([]);
// //   const [speed, setSpeed] = useState(150);
// //   const [foodEaten, setFoodEaten] = useState(0);
// //   const [specialFood, setSpecialFood] = useState(null);
// //   const [specialFoodTimer, setSpecialFoodTimer] = useState(null);
// //   const [showShareModal, setShowShareModal] = useState(false);
  
// //   // حالت‌های تایمر
// //   const [timer, setTimer] = useState(0); // زمان بر حسب ثانیه
// //   const [bestTime, setBestTime] = useState(0); // بهترین زمان
// //   const timerIntervalRef = useRef(null);

// //   const canvasRef = useRef(null);
// //   const gameLoopRef = useRef(null);
// //   const animationFrameRef = useRef(null);

// //   // بارگذاری امتیاز برتر و بهترین زمان از حافظه
// //   useEffect(() => {
// //     const saved = localStorage.getItem('snakeHighScore');
// //     if (saved) setHighScore(parseInt(saved));
    
// //     const savedTime = localStorage.getItem('snakeBestTime');
// //     if (savedTime) setBestTime(parseInt(savedTime));
// //   }, []);

// //   // ذخیره امتیاز برتر و بهترین زمان
// //   useEffect(() => {
// //     if (score > highScore) {
// //       setHighScore(score);
// //       localStorage.setItem('snakeHighScore', score.toString());
// //       if (typeof window !== 'undefined' && window.gtag) {
// //         window.gtag('event', 'high_score', {
// //           'score': score,
// //           'level': level
// //         });
// //       }
// //     }
    
// //     // ذخیره بهترین زمان (زمانی که بازی تمام می‌شه و امتیاز داره)
// //     if (gameOver && timer > 0) {
// //       // فقط زمانی که امتیاز بیشتر از 0 باشه زمان رو ثبت کن
// //       if (score > 0) {
// //         if (bestTime === 0 || timer < bestTime) {
// //           setBestTime(timer);
// //           localStorage.setItem('snakeBestTime', timer.toString());
// //         }
// //       }
// //     }
// //   }, [score, highScore, level, gameOver, timer, bestTime]);

// //   // تولید غذا
// //   const generateFood = useCallback((currentSnake) => {
// //     const maxAttempts = 1000;
// //     for (let i = 0; i < maxAttempts; i++) {
// //       const newFood = [
// //         Math.floor(Math.random() * BOARD_SIZE),
// //         Math.floor(Math.random() * BOARD_SIZE),
// //       ];
// //       if (!currentSnake.some(segment => 
// //         segment[0] === newFood[0] && segment[1] === newFood[1]
// //       ) && !(specialFood && specialFood[0] === newFood[0] && specialFood[1] === newFood[1])) {
// //         return newFood;
// //       }
// //     }
// //     return null;
// //   }, [BOARD_SIZE, specialFood]);

// //   // تولید غذای ویژه
// //   const generateSpecialFood = useCallback((currentSnake) => {
// //     if (Math.random() > 0.15 || specialFood) return;
// //     const maxAttempts = 1000;
// //     for (let i = 0; i < maxAttempts; i++) {
// //       const newFood = [
// //         Math.floor(Math.random() * BOARD_SIZE),
// //         Math.floor(Math.random() * BOARD_SIZE),
// //       ];
// //       if (!currentSnake.some(segment => 
// //         segment[0] === newFood[0] && segment[1] === newFood[1]
// //       ) && !(food && food[0] === newFood[0] && food[1] === newFood[1])) {
// //         setSpecialFood(newFood);
// //         setSpecialFoodTimer(Date.now() + 5000);
// //         return;
// //       }
// //     }
// //   }, [food, specialFood]);

// //   const spawnParticles = useCallback((x, y, color, count = 12) => {
// //     const newParticles = [];
// //     for (let i = 0; i < count; i++) {
// //       const angle = Math.random() * Math.PI * 2;
// //       const speed = 1 + Math.random() * 3;
// //       newParticles.push({
// //         x: x * 25 + 12.5,
// //         y: y * 25 + 12.5,
// //         vx: Math.cos(angle) * speed,
// //         vy: Math.sin(angle) * speed,
// //         life: 1,
// //         color: color,
// //         size: 3 + Math.random() * 4,
// //       });
// //     }
// //     setParticles(prev => [...prev, ...newParticles]);
// //   }, []);

// //   // ریست بازی
// //   const resetGame = useCallback(() => {
// //     setSnake(INITIAL_SNAKE);
// //     setDirection(INITIAL_DIRECTION);
// //     setGameOver(false);
// //     setScore(0);
// //     setIsPaused(false);
// //     setGameStarted(false);
// //     setLevel(1);
// //     setCombo(0);
// //     setFoodEaten(0);
// //     setSpeed(150);
// //     setSpecialFood(null);
// //     setSpecialFoodTimer(null);
// //     setParticles([]);
// //     setShowShareModal(false);
// //     setTimer(0); // ریست تایمر
    
// //     // توقف تایمر
// //     if (timerIntervalRef.current) {
// //       clearInterval(timerIntervalRef.current);
// //       timerIntervalRef.current = null;
// //     }
    
// //     const newFood = generateFood(INITIAL_SNAKE);
// //     setFood(newFood);
// //   }, [generateFood]);

// //   // شروع بازی
// //   const startGame = useCallback(() => {
// //     if (!food) {
// //       const newFood = generateFood(snake);
// //       setFood(newFood);
// //     }
// //     setGameStarted(true);
// //     setTimer(0);
    
// //     // شروع تایمر
// //     if (timerIntervalRef.current) {
// //       clearInterval(timerIntervalRef.current);
// //     }
// //     timerIntervalRef.current = setInterval(() => {
// //       setTimer(prev => prev + 1);
// //     }, 1000);
// //   }, [food, snake, generateFood]);

// //   // توقف تایمر هنگام مکث یا پایان بازی
// //   useEffect(() => {
// //     if (isPaused || gameOver || !gameStarted) {
// //       if (timerIntervalRef.current) {
// //         clearInterval(timerIntervalRef.current);
// //         timerIntervalRef.current = null;
// //       }
// //     } else if (gameStarted && !gameOver && !isPaused) {
// //       // اگر تایمر وجود نداشته باشه، دوباره شروع کن
// //       if (!timerIntervalRef.current) {
// //         timerIntervalRef.current = setInterval(() => {
// //           setTimer(prev => prev + 1);
// //         }, 1000);
// //       }
// //     }
    
// //     return () => {
// //       if (timerIntervalRef.current) {
// //         clearInterval(timerIntervalRef.current);
// //         timerIntervalRef.current = null;
// //       }
// //     };
// //   }, [isPaused, gameOver, gameStarted]);

// //   // فرمت کردن زمان
// //   const formatTime = (seconds) => {
// //     const mins = Math.floor(seconds / 60);
// //     const secs = seconds % 60;
// //     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// //   };

// //   const moveSnake = useCallback(() => {
// //     if (gameOver || isPaused || !gameStarted) return;

// //     setSnake(prevSnake => {
// //       const newSnake = [...prevSnake];
// //       const head = newSnake[0];
// //       let newHead;

// //       switch (direction) {
// //         case 'UP': newHead = [head[0] - 1, head[1]]; break;
// //         case 'DOWN': newHead = [head[0] + 1, head[1]]; break;
// //         case 'LEFT': newHead = [head[0], head[1] - 1]; break;
// //         case 'RIGHT': newHead = [head[0], head[1] + 1]; break;
// //         default: return prevSnake;
// //       }

// //       // برخورد با دیوار
// //       if (
// //         newHead[0] < 0 || newHead[0] >= BOARD_SIZE ||
// //         newHead[1] < 0 || newHead[1] >= BOARD_SIZE
// //       ) {
// //         setGameOver(true);
// //         spawnParticles(head[0], head[1], '#ff6b6b', 20);
// //         // توقف تایمر
// //         if (timerIntervalRef.current) {
// //           clearInterval(timerIntervalRef.current);
// //           timerIntervalRef.current = null;
// //         }
// //         return prevSnake;
// //       }

// //       const snakeWithoutTail = newSnake.slice(0, -1);
// //       if (snakeWithoutTail.some(segment => 
// //         segment[0] === newHead[0] && segment[1] === newHead[1]
// //       )) {
// //         setGameOver(true);
// //         spawnParticles(head[0], head[1], '#ff6b6b', 20);
// //         // توقف تایمر
// //         if (timerIntervalRef.current) {
// //           clearInterval(timerIntervalRef.current);
// //           timerIntervalRef.current = null;
// //         }
// //         return prevSnake;
// //       }

// //       let newSnakeMoved = [newHead, ...snakeWithoutTail];
// //       let ateFood = false;

// //       // غذای معمولی
// //       if (food && newHead[0] === food[0] && newHead[1] === food[1]) {
// //         ateFood = true;
// //         setFoodEaten(prev => prev + 1);
// //         setCombo(prev => prev + 1);
        
// //         const points = 10 + combo * 2;
// //         setScore(prev => prev + points);
// //         spawnParticles(food[0], food[1], '#4ecdc4', 15);

// //         const newFood = generateFood(newSnakeMoved);
// //         if (newFood) {
// //           setFood(newFood);
// //           generateSpecialFood(newSnakeMoved);
// //         } else {
// //           setGameOver(true);
// //           if (timerIntervalRef.current) {
// //             clearInterval(timerIntervalRef.current);
// //             timerIntervalRef.current = null;
// //           }
// //           return newSnakeMoved;
// //         }

// //         // افزایش سطح
// //         if (foodEaten > 0 && foodEaten % 5 === 0) {
// //           setLevel(prev => prev + 1);
// //           setSpeed(prev => Math.max(60, prev - 10));
// //           setShowLevelUp(true);
// //           setTimeout(() => setShowLevelUp(false), 2000);
// //         }
// //       }

// //       // غذای ویژه
// //       if (specialFood && newHead[0] === specialFood[0] && newHead[1] === specialFood[1]) {
// //         ateFood = true;
// //         setScore(prev => prev + 50);
// //         spawnParticles(specialFood[0], specialFood[1], '#ffd93d', 25);
// //         setSpecialFood(null);
// //         setSpecialFoodTimer(null);
// //       }

// //       if (ateFood) {
// //         return [newHead, ...newSnake];
// //       }

// //       return newSnakeMoved;
// //     });
// //   }, [direction, food, gameOver, isPaused, gameStarted, generateFood, specialFood, combo, foodEaten, spawnParticles]);

// //   // حلقه بازی
// //   useEffect(() => {
// //     if (gameOver || !gameStarted || isPaused) {
// //       if (gameLoopRef.current) {
// //         clearInterval(gameLoopRef.current);
// //         gameLoopRef.current = null;
// //       }
// //       return;
// //     }

// //     if (gameLoopRef.current) {
// //       clearInterval(gameLoopRef.current);
// //     }

// //     gameLoopRef.current = setInterval(moveSnake, speed);
// //     return () => {
// //       if (gameLoopRef.current) {
// //         clearInterval(gameLoopRef.current);
// //         gameLoopRef.current = null;
// //       }
// //     };
// //   }, [moveSnake, gameOver, gameStarted, isPaused, speed]);

// //   // تایمر غذای ویژه
// //   useEffect(() => {
// //     if (!specialFoodTimer) return;
// //     const checkTimer = setInterval(() => {
// //       if (specialFood && Date.now() > specialFoodTimer) {
// //         setSpecialFood(null);
// //         setSpecialFoodTimer(null);
// //       }
// //     }, 100);
// //     return () => clearInterval(checkTimer);
// //   }, [specialFood, specialFoodTimer]);

// //   // انیمیشن ذرات
// //   useEffect(() => {
// //     const animateParticles = () => {
// //       setParticles(prev => 
// //         prev
// //           .map(p => ({
// //             ...p,
// //             x: p.x + p.vx,
// //             y: p.y + p.vy,
// //             life: p.life - 0.02,
// //             vy: p.vy + 0.05,
// //           }))
// //           .filter(p => p.life > 0)
// //       );
// //       animationFrameRef.current = requestAnimationFrame(animateParticles);
// //     };

// //     animateParticles();
// //     return () => {
// //       if (animationFrameRef.current) {
// //         cancelAnimationFrame(animationFrameRef.current);
// //       }
// //     };
// //   }, []);

// //   // تولید غذا در شروع اولیه
// //   useEffect(() => {
// //     if (!food && !gameStarted && !gameOver) {
// //       const newFood = generateFood(INITIAL_SNAKE);
// //       setFood(newFood);
// //     }
// //   }, [food, gameStarted, gameOver, generateFood]);

// //   // کنترل‌های کیبورد
// //   useEffect(() => {
// //     const handleKeyPress = (e) => {
// //       const key = e.key;
      
// //       if (key === ' ' || key === 'Space') {
// //         e.preventDefault();
// //         if (!gameStarted && !gameOver) {
// //           startGame();
// //         } else if (!gameOver) {
// //           setIsPaused(prev => !prev);
// //         }
// //         return;
// //       }

// //       if (key === 'r' || key === 'R') {
// //         resetGame();
// //         return;
// //       }

// //       if (!gameStarted || gameOver || isPaused) return;

// //       const oppositeDirections = {
// //         'UP': 'DOWN',
// //         'DOWN': 'UP',
// //         'LEFT': 'RIGHT',
// //         'RIGHT': 'LEFT'
// //       };

// //       let newDirection = null;
// //       switch (key) {
// //         case 'ArrowUp': newDirection = 'UP'; break;
// //         case 'ArrowDown': newDirection = 'DOWN'; break;
// //         case 'ArrowLeft': newDirection = 'RIGHT'; break;
// //         case 'ArrowRight': newDirection = 'LEFT'; break;
// //         default: return;
// //       }

// //       e.preventDefault();
// //       if (newDirection && oppositeDirections[newDirection] !== direction) {
// //         setDirection(newDirection);
// //       }
// //     };

// //     window.addEventListener('keydown', handleKeyPress);
// //     return () => window.removeEventListener('keydown', handleKeyPress);
// //   }, [direction, gameStarted, gameOver, isPaused, resetGame, startGame]);

// //   // کنترل‌های لمسی
// //   const [touchStart, setTouchStart] = useState(null);
// //   const handleTouchStart = (e) => {
// //     const touch = e.touches[0];
// //     setTouchStart({ x: touch.clientX, y: touch.clientY });
// //   };

// //   const handleTouchEnd = (e) => {
// //     if (!touchStart) return;
// //     const touch = e.changedTouches[0];
// //     const dx = touch.clientX - touchStart.x;
// //     const dy = touch.clientY - touchStart.y;
    
// //     if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
// //       if (!gameStarted && !gameOver) {
// //         startGame();
// //       } else if (!gameOver) {
// //         setIsPaused(prev => !prev);
// //       }
// //       return;
// //     }

// //     if (Math.abs(dx) > Math.abs(dy)) {
// //       if (dx > 0 && direction !== 'LEFT') setDirection('RIGHT');
// //       else if (dx < 0 && direction !== 'RIGHT') setDirection('LEFT');
// //     } else {
// //       if (dy > 0 && direction !== 'UP') setDirection('DOWN');
// //       else if (dy < 0 && direction !== 'DOWN') setDirection('UP');
// //     }
// //     setTouchStart(null);
// //   };

// //   const renderBoard = () => {
// //     const cells = [];
// //     for (let row = 0; row < BOARD_SIZE; row++) {
// //       for (let col = 0; col < BOARD_SIZE; col++) {
// //         const isSnake = snake.some(segment => segment[0] === row && segment[1] === col);
// //         const isFood = food && food[0] === row && food[1] === col;
// //         const isSpecial = specialFood && specialFood[0] === row && specialFood[1] === col;
// //         const isHead = snake[0] && snake[0][0] === row && snake[0][1] === col;
// //         const isTail = snake[snake.length - 1] && 
// //           snake[snake.length - 1][0] === row && 
// //           snake[snake.length - 1][1] === col;

// //         let className = 'cell';
// //         if (isSnake) className += ' snake';
// //         if (isHead) className += ' head';
// //         if (isTail) className += ' tail';
// //         if (isFood) className += ' food';
// //         if (isSpecial) className += ' special-food';

// //         const style = {};
// //         if (isSnake && !isHead) {
// //           const index = snake.findIndex(seg => seg[0] === row && seg[1] === col);
// //           const gradient = `hsl(${170 + index * 5}, 70%, ${45 + index * 1.5}%)`;
// //           style.background = gradient;
// //         }

// //         cells.push(
// //           <div 
// //             key={`${row}-${col}`} 
// //             className={className} 
// //             style={style}
// //             role="gridcell"
// //             aria-label={`سلول ${row} ${col}`}
// //           />
// //         );
// //       }
// //     }
// //     return cells;
// //   };

// //   const shareScore = () => {
// //     const timeStr = formatTime(timer);
// //     const text = `🐍 من در بازی مار استاد به امتیاز ${score} در سطح ${level} و زمان ${timeStr} رسیدم!\nآیا میتونی رکورد من رو بزنی؟\nمشاوراملاکی`;
// //     const url = typeof window !== 'undefined' ? window.location.href : '';
    
// //     if (navigator.share) {
// //       navigator.share({
// //         title: 'بازی مار استاد - مشاوراملاکی',
// //         text: text,
// //         url: url,
// //       }).catch(() => {});
// //     } else {
// //       setShowShareModal(true);
// //     }
// //   };

// //   const copyToClipboard = () => {
// //     const timeStr = formatTime(timer);
// //     const text = `🐍 من در بازی مار استاد به امتیاز ${score} در سطح ${level} و زمان ${timeStr} رسیدم!\nآیا میتونی رکورد من رو بزنی؟\nمشاوراملاکی`;
// //     navigator.clipboard.writeText(text);
// //     setShowShareModal(false);
// //   };

// //   return (
// //     <>
// //       <MetaTags />

// //       <div className="game-wrapper" dir="rtl">
// //         <nav aria-label="مسیر دسترسی" className="breadcrumb">
// //           <ol>
// //             <li><a href="/">خانه</a></li>
// //             <li><a href="/games">بازی‌ها</a></li>
// //             <li className="active">بازی مار استاد</li>
// //           </ol>
// //         </nav>

// //         <div className="bg-particles" aria-hidden="true" />
// //         <div className="bg-grid" aria-hidden="true" />

// //         <div className="game-container">
// //           <div className="header">
// //             <div className="header-left">
// //               <h1>
// //                 <span className="snake-icon" aria-hidden="true">🐍</span>
// //                 مار استاد
// //               </h1>
// //               <div className="level-badge" role="status" aria-live="polite">
// //                 <span aria-hidden="true">🏆</span>
// //                 <span>سطح {level}</span>
// //               </div>
// //             </div>
// //             <div className="stats">
// //               <div className="stat-item">
// //                 <span className="stat-label">امتیاز</span>
// //                 <span className="stat-value" role="status" aria-live="polite">{score}</span>
// //               </div>
// //               <div className="stat-item">
// //                 <span className="stat-label">بهترین</span>
// //                 <span className="stat-value high-score" role="status" aria-live="polite">{highScore}</span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* نمایش تایمر */}
// //           <div className="timer-container">
// //             <div className="timer-display">
// //               <span className="timer-icon">⏱️</span>
// //               <span className="timer-value">{formatTime(timer)}</span>
// //               {bestTime > 0 && (
// //                 <span className="best-time">
// //                   🏅 {formatTime(bestTime)}
// //                 </span>
// //               )}
// //             </div>
// //           </div>

// //           <div className="board-wrapper">
// //             <div 
// //               className="board"
// //               onTouchStart={handleTouchStart}
// //               onTouchEnd={handleTouchEnd}
// //               role="grid"
// //               aria-label="تخته بازی مار"
// //               style={{
// //                 display: 'grid',
// //                 gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
// //                 gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
// //                 gap: '2px',
// //                 backgroundColor: 'rgba(255,255,255,0.05)',
// //                 padding: '12px',
// //                 borderRadius: '16px',
// //                 position: 'relative',
// //               }}
// //             >
// //               {renderBoard()}

// //               {particles.map((p, i) => (
// //                 <div
// //                   key={i}
// //                   className="particle"
// //                   style={{
// //                     position: 'absolute',
// //                     left: p.x,
// //                     top: p.y,
// //                     width: p.size,
// //                     height: p.size,
// //                     background: p.color,
// //                     borderRadius: '50%',
// //                     opacity: p.life,
// //                     transform: `scale(${p.life})`,
// //                     pointerEvents: 'none',
// //                   }}
// //                   aria-hidden="true"
// //                 />
// //               ))}

// //               {showLevelUp && (
// //                 <div className="level-up-overlay" role="status" aria-live="assertive">
// //                   <div className="level-up-text">
// //                     ⭐ سطح {level}!
// //                   </div>
// //                 </div>
// //               )}

// //               {gameOver && (
// //                 <div className="game-over-overlay" role="dialog" aria-label="پایان بازی">
// //                   <div className="game-over-content">
// //                     <div className="game-over-icon" aria-hidden="true">💀</div>
// //                     <h2>بازی تمام شد!</h2>
// //                     <div className="final-score">
// //                       امتیاز: <span>{score}</span>
// //                     </div>
// //                     <div className="final-stats">
// //                       <div>سطح: {level}</div>
// //                       <div>غذا: {foodEaten}</div>
// //                       <div>⏱️ {formatTime(timer)}</div>
// //                     </div>
// //                     {bestTime > 0 && (
// //                       <div className="best-time-display">
// //                         🏅 بهترین زمان: {formatTime(bestTime)}
// //                       </div>
// //                     )}
// //                     <div className="game-over-buttons">
// //                       <button 
// //                         className="play-again-btn" 
// //                         onClick={resetGame}
// //                         aria-label="شروع مجدد بازی"
// //                       >
// //                         بازی دوباره
// //                       </button>
// //                       {score > 0 && (
// //                         <button 
// //                           className="share-btn" 
// //                           onClick={shareScore}
// //                           aria-label="اشتراک‌گذاری امتیاز"
// //                         >
// //                           📤 اشتراک‌گذاری
// //                         </button>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //               {isPaused && !gameOver && gameStarted && (
// //                 <div className="pause-overlay" role="status" aria-live="polite">
// //                   <div className="pause-icon" aria-hidden="true">⏸️</div>
// //                   <div className="pause-text">مکث</div>
// //                 </div>
// //               )}

// //               {!gameStarted && !gameOver && (
// //                 <div className="start-overlay" role="dialog" aria-label="شروع بازی">
// //                   <div className="start-content">
// //                     <div className="start-icon" aria-hidden="true">🐍</div>
// //                     <h2>مار استاد</h2>
// //                     <p>برای شروع دکمه <strong>Space</strong> یا کلیک کن</p>
// //                     <button 
// //                       className="start-btn" 
// //                       onClick={startGame}
// //                       aria-label="شروع بازی"
// //                     >
// //                       شروع بازی
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           <div className="controls">
// //             <button 
// //               className="control-btn primary"
// //               onClick={() => {
// //                 if (!gameStarted && !gameOver) {
// //                   startGame();
// //                 } else if (!gameOver) {
// //                   setIsPaused(prev => !prev);
// //                 }
// //               }}
// //               aria-label={!gameStarted ? "شروع بازی" : isPaused ? "ادامه بازی" : "مکث بازی"}
// //             >
// //               {!gameStarted ? '▶ شروع' : isPaused ? '▶ ادامه' : '⏸ مکث'}
// //             </button>
// //             <button 
// //               className="control-btn secondary" 
// //               onClick={resetGame}
// //               aria-label="بازی جدید"
// //             >
// //               🔄 بازی جدید
// //             </button>
// //           </div>

// //           <div className="mobile-controls" aria-label="کنترل‌های حرکتی">
// //             <div className="dpad">
// //               <button 
// //                 className="dpad-btn up" 
// //                 onClick={() => direction !== 'DOWN' && setDirection('UP')}
// //                 aria-label="بالا"
// //               >
// //                 ▲
// //               </button>
// //               <button 
// //                 className="dpad-btn down" 
// //                 onClick={() => direction !== 'UP' && setDirection('DOWN')}
// //                 aria-label="پایین"
// //               >
// //                 ▼
// //               </button>
// //               <button 
// //                 className="dpad-btn left" 
// //                 onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
// //                 aria-label="چپ"
// //               >
// //                 ◄
// //               </button>
// //               <button 
// //                 className="dpad-btn right" 
// //                 onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
// //                 aria-label="راست"
// //               >
// //                 ►
// //               </button>
// //             </div>
// //           </div>

// //           <div className="info">
// //             <div className="combo-display">
// //               {combo > 1 && <span className="combo-text" role="status">🔥 کامبو x{combo}</span>}
// //             </div>
// //             <div className="instructions" aria-label="راهنمای کلیدها">
// //               <span>↑ ↓ ← →</span>
// //               <span className="sep">|</span>
// //               <span>␣ مکث</span>
// //               <span className="sep">|</span>
// //               <span>R ریستارت</span>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="seo-content">
// //           <h2>درباره بازی مار استاد</h2>
// //           <p>
// //             بازی مار استاد یک بازی کلاسیک و سرگرم‌کننده است که در سایت مشاوراملاکی طراحی شده تا 
// //             لحظات خوشی را برای شما به ارمغان بیاورد. این بازی با گرافیک مدرن و امکانات پیشرفته، 
// //             تجربه‌ای متفاوت از بازی‌های سنتی مار را به شما ارائه می‌دهد.
// //           </p>
          
// //           <h3>ویژگی‌های بازی مار</h3>
// //           <ul>
// //             <li>گرافیک زیبا و مدرن با افکت‌های ویژه</li>
// //             <li>سیستم امتیازدهی پویا با ترکیب (کامبو)</li>
// //             <li>غذاهای ویژه با امتیاز بیشتر</li>
// //             <li>سطح‌بندی پیشرفته با افزایش سرعت</li>
// //             <li>قابل بازی در موبایل و دسکتاپ</li>
// //             <li>ذخیره خودکار رکوردها و بهترین زمان</li>
// //             <li>تایمر دقیق برای ثبت زمان بازی</li>
// //           </ul>

// //           <h3>چطور بازی کنیم؟</h3>
// //           <ol>
// //             <li>با کلیدهای جهت‌نما (↑ ↓ ← →) مار را حرکت دهید</li>
// //             <li>برای شروع بازی کلید Space را بزنید</li>
// //             <li>غذاهای قرمز رنگ را بخورید تا امتیاز بگیرید</li>
// //             <li>غذاهای طلایی ویژه امتیاز بیشتری دارند</li>
// //             <li>با هر ۵ بار غذا خوردن، سطح شما افزایش می‌یابد</li>
// //           </ol>
          
// //           <h3>چرا بازی مار؟</h3>
// //           <p>
// //             بازی مار یکی از محبوب‌ترین بازی‌های تاریخ است که با وجود سادگی، چالش‌های زیادی را 
// //             برای بازیکنان ایجاد می‌کند. این بازی به بهبود مهارت‌های تصمیم‌گیری، واکنش سریع و 
// //             برنامه‌ریزی کمک می‌کند.
// //           </p>
          
// //           <div className="seo-tags">
// //             <span className="tag">#بازی_مار</span>
// //             <span className="tag">#مار_استاد</span>
// //             <span className="tag">#مشاوراملاکی</span>
// //             <span className="tag">#بازی_آنلاین</span>
// //             <span className="tag">#سرگرمی</span>
// //           </div>
// //         </div>

// //         {showShareModal && (
// //           <div className="share-modal" role="dialog" aria-label="اشتراک‌گذاری امتیاز">
// //             <div className="share-modal-content">
// //               <h3>اشتراک‌گذاری امتیاز</h3>
// //               <p>امتیاز خود را با دوستانتان به اشتراک بگذارید!</p>
// //               <div className="share-buttons">
// //                 <button onClick={copyToClipboard} className="share-btn copy-btn">
// //                   📋 کپی متن
// //                 </button>
// //                 <button 
// //                   onClick={() => {
// //                     const url = typeof window !== 'undefined' ? window.location.href : '';
// //                     const timeStr = formatTime(timer);
// //                     window.open(`https://t.me/share/url?url=${url}&text=🐍 من در بازی مار استاد به امتیاز ${score} در زمان ${timeStr} رسیدم!`);
// //                   }}
// //                   className="share-btn telegram"
// //                 >
// //                   📨 تلگرام
// //                 </button>
// //                 <button 
// //                   onClick={() => {
// //                     const url = typeof window !== 'undefined' ? window.location.href : '';
// //                     const timeStr = formatTime(timer);
// //                     window.open(`https://api.whatsapp.com/send?text=🐍 من در بازی مار استاد به امتیاز ${score} در زمان ${timeStr} رسیدم! ${url}`);
// //                   }}
// //                   className="share-btn whatsapp"
// //                 >
// //                   💬 واتساپ
// //                 </button>
// //               </div>
// //               <button onClick={() => setShowShareModal(false)} className="close-modal">
// //                 ✖ بستن
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         <style jsx>{`
// //           .game-wrapper {
// //             min-height: 100vh;
// //             background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
// //             display: flex;
// //             flex-direction: column;
// //             align-items: center;
// //             justify-content: center;
// //             padding: 20px;
// //             position: relative;
// //             overflow: hidden;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .breadcrumb {
// //             width: 100%;
// //             max-width: 600px;
// //             padding: 10px 0;
// //             color: rgba(255,255,255,0.6);
// //             font-size: 14px;
// //             margin-bottom: 10px;
// //           }

// //           .breadcrumb ol {
// //             display: flex;
// //             list-style: none;
// //             padding: 0;
// //             margin: 0;
// //             gap: 8px;
// //           }

// //           .breadcrumb li {
// //             display: flex;
// //             align-items: center;
// //           }

// //           .breadcrumb li:not(:last-child)::after {
// //             content: '/';
// //             margin-left: 8px;
// //             color: rgba(255,255,255,0.3);
// //           }

// //           .breadcrumb a {
// //             color: rgba(255,255,255,0.6);
// //             text-decoration: none;
// //             transition: color 0.3s;
// //           }

// //           .breadcrumb a:hover {
// //             color: #4ecdc4;
// //           }

// //           .breadcrumb .active {
// //             color: #4ecdc4;
// //           }

// //           .bg-particles {
// //             position: absolute;
// //             width: 100%;
// //             height: 100%;
// //             background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
// //                               radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
// //                               radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
// //                               radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
// //                               radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0));
// //             background-size: 200px 200px;
// //             opacity: 0.3;
// //           }

// //           .bg-grid {
// //             position: absolute;
// //             width: 100%;
// //             height: 100%;
// //             background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
// //                               linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
// //             background-size: 50px 50px;
// //           }

// //           .game-container {
// //             background: rgba(255,255,255,0.05);
// //             backdrop-filter: blur(20px);
// //             border-radius: 24px;
// //             padding: 30px;
// //             max-width: 600px;
// //             width: 100%;
// //             border: 1px solid rgba(255,255,255,0.1);
// //             box-shadow: 0 25px 50px rgba(0,0,0,0.5);
// //             position: relative;
// //             z-index: 1;
// //           }

// //           .header {
// //             display: flex;
// //             justify-content: space-between;
// //             align-items: center;
// //             margin-bottom: 10px;
// //             flex-wrap: wrap;
// //             gap: 10px;
// //           }

// //           .header-left {
// //             display: flex;
// //             align-items: center;
// //             gap: 12px;
// //           }

// //           .header h1 {
// //             margin: 0;
// //             font-size: 22px;
// //             font-weight: 700;
// //             background: linear-gradient(135deg, #4ecdc4, #44d4b4);
// //             -webkit-background-clip: text;
// //             -webkit-text-fill-color: transparent;
// //             letter-spacing: -0.5px;
// //           }

// //           .snake-icon {
// //             -webkit-text-fill-color: initial;
// //           }

// //           .level-badge {
// //             background: rgba(78, 205, 196, 0.15);
// //             padding: 4px 12px;
// //             border-radius: 20px;
// //             font-size: 12px;
// //             color: #4ecdc4;
// //             display: flex;
// //             align-items: center;
// //             gap: 4px;
// //             border: 1px solid rgba(78, 205, 196, 0.2);
// //           }

// //           .stats {
// //             display: flex;
// //             gap: 15px;
// //           }

// //           .stat-item {
// //             display: flex;
// //             flex-direction: column;
// //             align-items: center;
// //           }

// //           .stat-label {
// //             font-size: 10px;
// //             text-transform: uppercase;
// //             color: rgba(255,255,255,0.4);
// //             letter-spacing: 1px;
// //           }

// //           .stat-value {
// //             font-size: 20px;
// //             font-weight: 700;
// //             color: #fff;
// //           }

// //           .stat-value.high-score {
// //             color: #ffd93d;
// //           }

// //           /* استایل تایمر */
// //           .timer-container {
// //             display: flex;
// //             justify-content: center;
// //             margin-bottom: 15px;
// //           }

// //           .timer-display {
// //             display: flex;
// //             align-items: center;
// //             gap: 12px;
// //             background: rgba(0,0,0,0.3);
// //             padding: 8px 20px;
// //             border-radius: 30px;
// //             border: 1px solid rgba(255,255,255,0.1);
// //           }

// //           .timer-icon {
// //             font-size: 18px;
// //           }

// //           .timer-value {
// //             font-size: 20px;
// //             font-weight: 700;
// //             color: #4ecdc4;
// //             font-family: 'Courier New', monospace;
// //             min-width: 60px;
// //             text-align: center;
// //           }

// //           .best-time {
// //             font-size: 14px;
// //             color: #ffd93d;
// //             padding-right: 12px;
// //             border-right: 1px solid rgba(255,255,255,0.1);
// //           }

// //           .board-wrapper {
// //             position: relative;
// //           }

// //           .board {
// //             width: 100%;
// //             aspect-ratio: 1;
// //             margin: 0 auto;
// //             position: relative;
// //             background: rgba(0,0,0,0.3);
// //             border-radius: 16px;
// //           }

// //           .cell {
// //             width: 100%;
// //             height: 100%;
// //             background: rgba(255,255,255,0.05);
// //             border-radius: 4px;
// //             transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
// //           }

// //           .cell.snake {
// //             background: linear-gradient(135deg, #4ecdc4, #44b39d);
// //             border-radius: 6px;
// //             box-shadow: 0 0 20px rgba(78, 205, 196, 0.3);
// //           }

// //           .cell.head {
// //             background: linear-gradient(135deg, #5fd9d0, #4ecdc4) !important;
// //             border-radius: 8px;
// //             box-shadow: 0 0 30px rgba(78, 205, 196, 0.6), inset 0 -2px 0 rgba(0,0,0,0.2);
// //             transform: scale(0.9);
// //           }

// //           .cell.tail {
// //             border-radius: 4px;
// //             opacity: 0.7;
// //           }

// //           .cell.food {
// //             background: radial-gradient(circle, #ff6b6b, #ee5a24);
// //             border-radius: 50%;
// //             box-shadow: 0 0 30px rgba(255, 107, 107, 0.6);
// //             animation: foodPulse 0.6s ease-in-out infinite alternate;
// //           }

// //           .cell.special-food {
// //             background: radial-gradient(circle, #ffd93d, #f6b93b);
// //             border-radius: 50%;
// //             box-shadow: 0 0 40px rgba(255, 217, 61, 0.8);
// //             animation: specialPulse 0.3s ease-in-out infinite alternate;
// //           }

// //           @keyframes foodPulse {
// //             from { transform: scale(0.8); }
// //             to { transform: scale(1.1); }
// //           }

// //           @keyframes specialPulse {
// //             from { transform: scale(0.7) rotate(0deg); }
// //             to { transform: scale(1.2) rotate(180deg); }
// //           }

// //           .controls {
// //             display: flex;
// //             gap: 10px;
// //             margin-top: 15px;
// //             justify-content: center;
// //             flex-wrap: wrap;
// //           }

// //           .control-btn {
// //             padding: 10px 25px;
// //             font-size: 14px;
// //             font-weight: 600;
// //             border: none;
// //             border-radius: 12px;
// //             cursor: pointer;
// //             transition: all 0.3s;
// //             letter-spacing: 0.5px;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .control-btn.primary {
// //             background: linear-gradient(135deg, #4ecdc4, #44b39d);
// //             color: white;
// //             box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
// //           }

// //           .control-btn.primary:hover {
// //             transform: translateY(-2px);
// //             box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
// //           }

// //           .control-btn.secondary {
// //             background: rgba(255,255,255,0.1);
// //             color: white;
// //             border: 1px solid rgba(255,255,255,0.2);
// //           }

// //           .control-btn.secondary:hover {
// //             background: rgba(255,255,255,0.2);
// //             transform: translateY(-2px);
// //           }

// //           .mobile-controls {
// //             display: none;
// //             margin-top: 15px;
// //             justify-content: center;
// //           }

// //           @media (max-width: 768px) {
// //             .mobile-controls {
// //               display: flex;
// //             }
// //           }

// //           .dpad {
// //             display: grid;
// //             grid-template-columns: 60px 60px 60px;
// //             grid-template-rows: 60px 60px 60px;
// //             gap: 4px;
// //           }

// //           .dpad-btn {
// //             background: rgba(255,255,255,0.1);
// //             border: 1px solid rgba(255,255,255,0.15);
// //             border-radius: 12px;
// //             color: white;
// //             font-size: 20px;
// //             cursor: pointer;
// //             transition: all 0.2s;
// //             display: flex;
// //             align-items: center;
// //             justify-content: center;
// //             -webkit-tap-highlight-color: transparent;
// //             user-select: none;
// //           }

// //           .dpad-btn:active {
// //             background: rgba(78, 205, 196, 0.3);
// //             transform: scale(0.95);
// //           }

// //           .dpad-btn.up { grid-column: 2; grid-row: 1; }
// //           .dpad-btn.down { grid-column: 2; grid-row: 3; }
// //           .dpad-btn.left { grid-column: 1; grid-row: 2; }
// //           .dpad-btn.right { grid-column: 3; grid-row: 2; }

// //           .info {
// //             margin-top: 15px;
// //             text-align: center;
// //           }

// //           .combo-display {
// //             min-height: 24px;
// //             margin-bottom: 8px;
// //           }

// //           .combo-text {
// //             color: #ffd93d;
// //             font-weight: 700;
// //             font-size: 18px;
// //             animation: comboPop 0.3s ease;
// //           }

// //           @keyframes comboPop {
// //             0% { transform: scale(0.5); opacity: 0; }
// //             50% { transform: scale(1.2); }
// //             100% { transform: scale(1); opacity: 1; }
// //           }

// //           .instructions {
// //             display: flex;
// //             justify-content: center;
// //             gap: 10px;
// //             color: rgba(255,255,255,0.4);
// //             font-size: 13px;
// //             flex-wrap: wrap;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .sep {
// //             color: rgba(255,255,255,0.1);
// //           }

// //           .game-over-overlay,
// //           .pause-overlay,
// //           .start-overlay,
// //           .level-up-overlay {
// //             position: absolute;
// //             inset: 0;
// //             display: flex;
// //             align-items: center;
// //             justify-content: center;
// //             background: rgba(0,0,0,0.75);
// //             backdrop-filter: blur(8px);
// //             border-radius: 16px;
// //             z-index: 10;
// //           }

// //           .game-over-content,
// //           .start-content {
// //             text-align: center;
// //             padding: 30px;
// //             animation: fadeInUp 0.5s ease;
// //           }

// //           .game-over-icon {
// //             font-size: 64px;
// //             margin-bottom: 10px;
// //           }

// //           .game-over-content h2 {
// //             font-size: 32px;
// //             margin: 10px 0;
// //             color: #ff6b6b;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .final-score {
// //             font-size: 24px;
// //             color: #fff;
// //             margin: 10px 0;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .final-score span {
// //             color: #ffd93d;
// //             font-size: 32px;
// //           }

// //           .final-stats {
// //             display: flex;
// //             justify-content: center;
// //             gap: 30px;
// //             color: rgba(255,255,255,0.6);
// //             margin: 15px 0;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .best-time-display {
// //             color: #ffd93d;
// //             font-size: 18px;
// //             margin: 10px 0;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .game-over-buttons {
// //             display: flex;
// //             gap: 10px;
// //             justify-content: center;
// //             flex-wrap: wrap;
// //           }

// //           .play-again-btn,
// //           .start-btn {
// //             padding: 12px 40px;
// //             font-size: 16px;
// //             font-weight: 600;
// //             border: none;
// //             border-radius: 12px;
// //             background: linear-gradient(135deg, #4ecdc4, #44b39d);
// //             color: white;
// //             cursor: pointer;
// //             transition: all 0.3s;
// //             margin-top: 10px;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .play-again-btn:hover,
// //           .start-btn:hover {
// //             transform: scale(1.05);
// //             box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
// //           }

// //           .share-btn {
// //             padding: 12px 30px;
// //             font-size: 16px;
// //             font-weight: 600;
// //             border: none;
// //             border-radius: 12px;
// //             background: linear-gradient(135deg, #ffd93d, #f6b93b);
// //             color: #333;
// //             cursor: pointer;
// //             transition: all 0.3s;
// //             margin-top: 10px;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .share-btn:hover {
// //             transform: scale(1.05);
// //             box-shadow: 0 8px 25px rgba(255, 217, 61, 0.4);
// //           }

// //           .pause-icon,
// //           .start-icon {
// //             font-size: 56px;
// //             animation: pulse 1.5s ease-in-out infinite;
// //           }

// //           .pause-text {
// //             color: #fff;
// //             font-size: 24px;
// //             font-weight: 700;
// //             margin-top: 10px;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .start-content h2 {
// //             font-size: 32px;
// //             color: #fff;
// //             margin: 10px 0;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .start-content p {
// //             color: rgba(255,255,255,0.6);
// //             margin: 10px 0 20px;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .level-up-text {
// //             font-size: 48px;
// //             font-weight: 700;
// //             color: #ffd93d;
// //             text-shadow: 0 0 40px rgba(255, 217, 61, 0.5);
// //             animation: levelUpPop 0.5s ease;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           @keyframes fadeInUp {
// //             from { opacity: 0; transform: translateY(20px); }
// //             to { opacity: 1; transform: translateY(0); }
// //           }

// //           @keyframes pulse {
// //             0%, 100% { transform: scale(1); }
// //             50% { transform: scale(1.1); }
// //           }

// //           @keyframes levelUpPop {
// //             0% { transform: scale(0) rotate(-10deg); opacity: 0; }
// //             50% { transform: scale(1.2) rotate(5deg); }
// //             100% { transform: scale(1) rotate(0deg); opacity: 1; }
// //           }

// //           .particle {
// //             position: absolute;
// //             pointer-events: none;
// //             border-radius: 50%;
// //             will-change: transform, opacity;
// //           }

// //           .seo-content {
// //             max-width: 600px;
// //             width: 100%;
// //             margin-top: 30px;
// //             padding: 20px;
// //             background: rgba(255,255,255,0.03);
// //             border-radius: 16px;
// //             border: 1px solid rgba(255,255,255,0.05);
// //             color: rgba(255,255,255,0.8);
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .seo-content h2 {
// //             color: #4ecdc4;
// //             font-size: 22px;
// //             margin-bottom: 15px;
// //           }

// //           .seo-content h3 {
// //             color: #ffd93d;
// //             font-size: 18px;
// //             margin-top: 20px;
// //             margin-bottom: 10px;
// //           }

// //           .seo-content p {
// //             line-height: 1.8;
// //             margin-bottom: 15px;
// //           }

// //           .seo-content ul, 
// //           .seo-content ol {
// //             padding-right: 20px;
// //             line-height: 2;
// //             margin-bottom: 15px;
// //           }

// //           .seo-content li {
// //             margin-bottom: 5px;
// //           }

// //           .seo-tags {
// //             display: flex;
// //             flex-wrap: wrap;
// //             gap: 10px;
// //             margin-top: 20px;
// //           }

// //           .seo-tags .tag {
// //             background: rgba(78, 205, 196, 0.1);
// //             padding: 5px 15px;
// //             border-radius: 20px;
// //             font-size: 12px;
// //             color: #4ecdc4;
// //             border: 1px solid rgba(78, 205, 196, 0.2);
// //           }

// //           .share-modal {
// //             position: fixed;
// //             inset: 0;
// //             background: rgba(0,0,0,0.8);
// //             backdrop-filter: blur(10px);
// //             display: flex;
// //             align-items: center;
// //             justify-content: center;
// //             z-index: 1000;
// //             animation: fadeIn 0.3s ease;
// //           }

// //           .share-modal-content {
// //             background: linear-gradient(135deg, #1a1a2e, #16213e);
// //             padding: 30px;
// //             border-radius: 20px;
// //             max-width: 400px;
// //             width: 90%;
// //             text-align: center;
// //             border: 1px solid rgba(255,255,255,0.1);
// //             position: relative;
// //           }

// //           .share-modal-content h3 {
// //             color: #fff;
// //             font-size: 24px;
// //             margin-bottom: 10px;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .share-modal-content p {
// //             color: rgba(255,255,255,0.6);
// //             margin-bottom: 20px;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .share-buttons {
// //             display: flex;
// //             flex-direction: column;
// //             gap: 10px;
// //           }

// //           .share-buttons .share-btn {
// //             padding: 12px;
// //             border: none;
// //             border-radius: 12px;
// //             cursor: pointer;
// //             font-size: 16px;
// //             font-weight: 600;
// //             transition: all 0.3s;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .share-buttons .share-btn:hover {
// //             transform: scale(1.02);
// //           }

// //           .share-buttons .share-btn.telegram {
// //             background: #0088cc;
// //             color: white;
// //           }

// //           .share-buttons .share-btn.whatsapp {
// //             background: #25d366;
// //             color: white;
// //           }

// //           .share-buttons .share-btn.copy-btn {
// //             background: rgba(255,255,255,0.1);
// //             color: white;
// //             border: 1px solid rgba(255,255,255,0.2);
// //           }

// //           .close-modal {
// //             margin-top: 15px;
// //             padding: 10px 30px;
// //             border: none;
// //             border-radius: 10px;
// //             background: rgba(255,255,255,0.1);
// //             color: rgba(255,255,255,0.6);
// //             cursor: pointer;
// //             transition: all 0.3s;
// //             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
// //           }

// //           .close-modal:hover {
// //             background: rgba(255,255,255,0.2);
// //           }

// //           @keyframes fadeIn {
// //             from { opacity: 0; }
// //             to { opacity: 1; }
// //           }

// //           @media (max-width: 480px) {
// //             .game-container {
// //               padding: 15px;
// //             }

// //             .header h1 {
// //               font-size: 18px;
// //             }

// //             .stat-value {
// //               font-size: 16px;
// //             }

// //             .timer-value {
// //               font-size: 16px;
// //               min-width: 50px;
// //             }

// //             .best-time {
// //               font-size: 12px;
// //             }

// //             .seo-content {
// //               padding: 15px;
// //             }

// //             .seo-content h2 {
// //               font-size: 18px;
// //             }

// //             .seo-content h3 {
// //               font-size: 16px;
// //             }

// //             .final-stats {
// //               gap: 15px;
// //               font-size: 14px;
// //               flex-wrap: wrap;
// //             }
// //           }
// //         `}</style>
// //       </div>
// //     </>
// //   );
// // };

// // export default SnakeGame;

// import React, { useState, useEffect, useCallback, useRef } from 'react';

// // متا تگ‌ها
// const MetaTags = () => {
//   return (
//     <>
//       <title>بازی مار هوشمند | مشاوراملاکی - سرگرمی و چالش</title>
//       <meta name="description" content="بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته. امتیاز بگیر، رکورد بزن و با دوستانت رقابت کن. بازی مار استاد در مشاوراملاکی" />
//       <meta name="keywords" content="بازی مار, مار استاد, بازی آنلاین, سرگرمی, مشاوراملاکی, بازی فکری, چالش, رتبه‌بندی" />
//       <meta name="robots" content="index, follow" />
//       <meta property="og:title" content="بازی مار استاد - مشاوراملاکی" />
//       <meta property="og:description" content="بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته. امتیاز بگیر و رکورد بزن!" />
//       <meta property="og:type" content="game" />
//       <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://your-site.com/snake-game'} />
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content="بازی مار استاد - مشاوراملاکی" />
//       <meta name="twitter:description" content="بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته" />
//       <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://your-site.com/snake-game'} />
      
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "VideoGame",
//             "name": "بازی مار استاد",
//             "description": "بازی کلاسیک مار با گرافیک مدرن و امکانات ویژه برای مشاوراملاکی",
//             "applicationCategory": "Game",
//             "operatingSystem": "All",
//             "audience": {
//               "@type": "Audience",
//               "audienceType": "همه سنین"
//             },
//             "offers": {
//               "@type": "Offer",
//               "price": "0",
//               "priceCurrency": "IRR"
//             }
//           })
//         }}
//       />
//     </>
//   );
// };

// // ================ دیتای شبیه‌سازی شده ================
// // این دیتا بعداً با API واقعی جایگزین می‌شه
// const MOCK_LEADERBOARD = [
//   { id: 1, name: 'علی محمدی', phone: '0912***1234', score: 2850, level: 12, time: '03:45', rank: 1 },
//   { id: 2, name: 'سارا احمدی', phone: '0913***5678', score: 2450, level: 10, time: '04:20', rank: 2 },
//   { id: 3, name: 'رضا کریمی', phone: '0914***9012', score: 2100, level: 9, time: '05:10', rank: 3 },
//   { id: 4, name: 'مریم حسینی', phone: '0915***3456', score: 1850, level: 8, time: '06:30', rank: 4 },
//   { id: 5, name: 'احمد نوری', phone: '0916***7890', score: 1600, level: 7, time: '07:15', rank: 5 },
//   { id: 6, name: 'زهرا رضایی', phone: '0917***2345', score: 1400, level: 6, time: '08:00', rank: 6 },
//   { id: 7, name: 'محمد جعفری', phone: '0918***6789', score: 1200, level: 5, time: '09:20', rank: 7 },
//   { id: 8, name: 'نرگس محمدی', phone: '0919***0123', score: 1000, level: 4, time: '10:45', rank: 8 },
//   { id: 9, name: 'حسین اکبری', phone: '0910***4567', score: 800, level: 3, time: '12:30', rank: 9 },
//   { id: 10, name: 'فاطمه کریمی', phone: '0911***8901', score: 600, level: 2, time: '15:00', rank: 10 },
// ];

// // ================ سرویس API شبیه‌سازی شده ================
// const leaderboardAPI = {
//   // دریافت لیست برترین‌ها
//   getTopPlayers: async (limit = 10) => {
//     // شبیه‌سازی تاخیر شبکه
//     await new Promise(resolve => setTimeout(resolve, 500));
//     return MOCK_LEADERBOARD.slice(0, limit);
//   },

//   // دریافت رتبه کاربر
//   getUserRank: async (userId) => {
//     await new Promise(resolve => setTimeout(resolve, 300));
//     const user = MOCK_LEADERBOARD.find(u => u.id === userId);
//     if (user) {
//       return {
//         rank: user.rank,
//         score: user.score,
//         level: user.level,
//         time: user.time,
//         totalPlayers: MOCK_LEADERBOARD.length
//       };
//     }
//     return null;
//   },

//   // ثبت امتیاز جدید
//   submitScore: async (userId, score, level, time) => {
//     await new Promise(resolve => setTimeout(resolve, 500));
//     // شبیه‌سازی ثبت امتیاز
//     console.log(`امتیاز ${score} برای کاربر ${userId} ثبت شد`);
//     return { success: true, message: 'امتیاز با موفقیت ثبت شد' };
//   }
// };

// // ================ کامپوننت اصلی بازی ================
// const SnakeGame = () => {
//   const BOARD_SIZE = 20;
//   const INITIAL_SNAKE = [
//     [10, 10],
//     [10, 9],
//     [10, 8],
//   ];
//   const INITIAL_DIRECTION = 'RIGHT';

//   // ================ State های بازی ================
//   const [snake, setSnake] = useState(INITIAL_SNAKE);
//   const [direction, setDirection] = useState(INITIAL_DIRECTION);
//   const [food, setFood] = useState(null);
//   const [gameOver, setGameOver] = useState(false);
//   const [score, setScore] = useState(0);
//   const [highScore, setHighScore] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [gameStarted, setGameStarted] = useState(false);
//   const [level, setLevel] = useState(1);
//   const [combo, setCombo] = useState(0);
//   const [showLevelUp, setShowLevelUp] = useState(false);
//   const [particles, setParticles] = useState([]);
//   const [speed, setSpeed] = useState(150);
//   const [foodEaten, setFoodEaten] = useState(0);
//   const [specialFood, setSpecialFood] = useState(null);
//   const [specialFoodTimer, setSpecialFoodTimer] = useState(null);
//   const [showShareModal, setShowShareModal] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [bestTime, setBestTime] = useState(0);
//   const timerIntervalRef = useRef(null);

//   // ================ State های کاربر و رتبه‌بندی ================
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [userRank, setUserRank] = useState(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [loginPhone, setLoginPhone] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');
//   const [loginError, setLoginError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showLeaderboard, setShowLeaderboard] = useState(false);

//   const canvasRef = useRef(null);
//   const gameLoopRef = useRef(null);
//   const animationFrameRef = useRef(null);

//   // ================ دیتای کاربران شبیه‌سازی شده ================
//   const MOCK_USERS = [
//     { id: 1, name: 'علی محمدی', phone: '09121231234', password: '1234', email: 'ali@email.com' },
//     { id: 2, name: 'سارا احمدی', phone: '09131235678', password: '1234', email: 'sara@email.com' },
//     { id: 3, name: 'رضا کریمی', phone: '09141239012', password: '1234', email: 'reza@email.com' },
//   ];

//   // ================ بارگذاری دیتا ================
//   useEffect(() => {
//     // بارگذاری امتیاز برتر و بهترین زمان
//     const saved = localStorage.getItem('snakeHighScore');
//     if (saved) setHighScore(parseInt(saved));
    
//     const savedTime = localStorage.getItem('snakeBestTime');
//     if (savedTime) setBestTime(parseInt(savedTime));

//     // بارگذاری وضعیت لاگین
//     const savedUser = localStorage.getItem('snakeUser');
//     if (savedUser) {
//       const userData = JSON.parse(savedUser);
//       setUser(userData);
//       setIsLoggedIn(true);
//       loadUserRank(userData.id);
//     }

//     // بارگذاری رتبه‌بندی
//     loadLeaderboard();
//   }, []);

//   // ================ توابع API ================
//   const loadLeaderboard = async () => {
//     setIsLoading(true);
//     try {
//       const data = await leaderboardAPI.getTopPlayers(10);
//       setLeaderboard(data);
//     } catch (error) {
//       console.error('خطا در دریافت رتبه‌بندی:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const loadUserRank = async (userId) => {
//     try {
//       const data = await leaderboardAPI.getUserRank(userId);
//       if (data) {
//         setUserRank(data);
//       }
//     } catch (error) {
//       console.error('خطا در دریافت رتبه کاربر:', error);
//     }
//   };

//   const submitScoreToLeaderboard = async () => {
//     if (!isLoggedIn || !user) {
//       setShowLoginModal(true);
//       return false;
//     }

//     try {
//       const timeStr = formatTime(timer);
//       const result = await leaderboardAPI.submitScore(user.id, score, level, timeStr);
//       if (result.success) {
//         // به‌روزرسانی رتبه‌بندی
//         await loadLeaderboard();
//         await loadUserRank(user.id);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('خطا در ثبت امتیاز:', error);
//       return false;
//     }
//   };

//   // ================ توابع لاگین ================
//   const handleLogin = (e) => {
//     e.preventDefault();
//     setLoginError('');

//     // پیدا کردن کاربر
//     const foundUser = MOCK_USERS.find(u => u.phone === loginPhone && u.password === loginPassword);
    
//     if (foundUser) {
//       setUser(foundUser);
//       setIsLoggedIn(true);
//       localStorage.setItem('snakeUser', JSON.stringify(foundUser));
//       setShowLoginModal(false);
//       setLoginPhone('');
//       setLoginPassword('');
//       loadUserRank(foundUser.id);
//     } else {
//       setLoginError('شماره موبایل یا رمز عبور اشتباه است');
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUser(null);
//     setUserRank(null);
//     localStorage.removeItem('snakeUser');
//   };

//   // ================ توابع بازی ================
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const generateFood = useCallback((currentSnake) => {
//     const maxAttempts = 1000;
//     for (let i = 0; i < maxAttempts; i++) {
//       const newFood = [
//         Math.floor(Math.random() * BOARD_SIZE),
//         Math.floor(Math.random() * BOARD_SIZE),
//       ];
//       if (!currentSnake.some(segment => 
//         segment[0] === newFood[0] && segment[1] === newFood[1]
//       ) && !(specialFood && specialFood[0] === newFood[0] && specialFood[1] === newFood[1])) {
//         return newFood;
//       }
//     }
//     return null;
//   }, [BOARD_SIZE, specialFood]);

//   const generateSpecialFood = useCallback((currentSnake) => {
//     if (Math.random() > 0.15 || specialFood) return;
//     const maxAttempts = 1000;
//     for (let i = 0; i < maxAttempts; i++) {
//       const newFood = [
//         Math.floor(Math.random() * BOARD_SIZE),
//         Math.floor(Math.random() * BOARD_SIZE),
//       ];
//       if (!currentSnake.some(segment => 
//         segment[0] === newFood[0] && segment[1] === newFood[1]
//       ) && !(food && food[0] === newFood[0] && food[1] === newFood[1])) {
//         setSpecialFood(newFood);
//         setSpecialFoodTimer(Date.now() + 5000);
//         return;
//       }
//     }
//   }, [food, specialFood]);

//   const spawnParticles = useCallback((x, y, color, count = 12) => {
//     const newParticles = [];
//     for (let i = 0; i < count; i++) {
//       const angle = Math.random() * Math.PI * 2;
//       const speed = 1 + Math.random() * 3;
//       newParticles.push({
//         x: x * 25 + 12.5,
//         y: y * 25 + 12.5,
//         vx: Math.cos(angle) * speed,
//         vy: Math.sin(angle) * speed,
//         life: 1,
//         color: color,
//         size: 3 + Math.random() * 4,
//       });
//     }
//     setParticles(prev => [...prev, ...newParticles]);
//   }, []);

//   const resetGame = useCallback(() => {
//     setSnake(INITIAL_SNAKE);
//     setDirection(INITIAL_DIRECTION);
//     setGameOver(false);
//     setScore(0);
//     setIsPaused(false);
//     setGameStarted(false);
//     setLevel(1);
//     setCombo(0);
//     setFoodEaten(0);
//     setSpeed(150);
//     setSpecialFood(null);
//     setSpecialFoodTimer(null);
//     setParticles([]);
//     setShowShareModal(false);
//     setTimer(0);
    
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//       timerIntervalRef.current = null;
//     }
    
//     const newFood = generateFood(INITIAL_SNAKE);
//     setFood(newFood);
//   }, [generateFood]);

//   const startGame = useCallback(() => {
//     if (!food) {
//       const newFood = generateFood(snake);
//       setFood(newFood);
//     }
//     setGameStarted(true);
//     setTimer(0);
    
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }
//     timerIntervalRef.current = setInterval(() => {
//       setTimer(prev => prev + 1);
//     }, 1000);
//   }, [food, snake, generateFood]);

//   // ================ ذخیره امتیاز ================
//   useEffect(() => {
//     if (score > highScore) {
//       setHighScore(score);
//       localStorage.setItem('snakeHighScore', score.toString());
//     }
//   }, [score, highScore]);

//   // ثبت امتیاز در رتبه‌بندی هنگام پایان بازی
//   useEffect(() => {
//     if (gameOver && score > 0 && isLoggedIn) {
//       submitScoreToLeaderboard();
//     }
//   }, [gameOver, score, isLoggedIn]);

//   // ================ بقیه توابع بازی (همانند قبل) ================
//   const moveSnake = useCallback(() => {
//     if (gameOver || isPaused || !gameStarted) return;

//     setSnake(prevSnake => {
//       const newSnake = [...prevSnake];
//       const head = newSnake[0];
//       let newHead;

//       switch (direction) {
//         case 'UP': newHead = [head[0] - 1, head[1]]; break;
//         case 'DOWN': newHead = [head[0] + 1, head[1]]; break;
//         case 'LEFT': newHead = [head[0], head[1] - 1]; break;
//         case 'RIGHT': newHead = [head[0], head[1] + 1]; break;
//         default: return prevSnake;
//       }

//       if (
//         newHead[0] < 0 || newHead[0] >= BOARD_SIZE ||
//         newHead[1] < 0 || newHead[1] >= BOARD_SIZE
//       ) {
//         setGameOver(true);
//         spawnParticles(head[0], head[1], '#ff6b6b', 20);
//         if (timerIntervalRef.current) {
//           clearInterval(timerIntervalRef.current);
//           timerIntervalRef.current = null;
//         }
//         return prevSnake;
//       }

//       const snakeWithoutTail = newSnake.slice(0, -1);
//       if (snakeWithoutTail.some(segment => 
//         segment[0] === newHead[0] && segment[1] === newHead[1]
//       )) {
//         setGameOver(true);
//         spawnParticles(head[0], head[1], '#ff6b6b', 20);
//         if (timerIntervalRef.current) {
//           clearInterval(timerIntervalRef.current);
//           timerIntervalRef.current = null;
//         }
//         return prevSnake;
//       }

//       let newSnakeMoved = [newHead, ...snakeWithoutTail];
//       let ateFood = false;

//       if (food && newHead[0] === food[0] && newHead[1] === food[1]) {
//         ateFood = true;
//         setFoodEaten(prev => prev + 1);
//         setCombo(prev => prev + 1);
        
//         const points = 10 + combo * 2;
//         setScore(prev => prev + points);
//         spawnParticles(food[0], food[1], '#4ecdc4', 15);

//         const newFood = generateFood(newSnakeMoved);
//         if (newFood) {
//           setFood(newFood);
//           generateSpecialFood(newSnakeMoved);
//         } else {
//           setGameOver(true);
//           if (timerIntervalRef.current) {
//             clearInterval(timerIntervalRef.current);
//             timerIntervalRef.current = null;
//           }
//           return newSnakeMoved;
//         }

//         if (foodEaten > 0 && foodEaten % 5 === 0) {
//           setLevel(prev => prev + 1);
//           setSpeed(prev => Math.max(60, prev - 10));
//           setShowLevelUp(true);
//           setTimeout(() => setShowLevelUp(false), 2000);
//         }
//       }

//       if (specialFood && newHead[0] === specialFood[0] && newHead[1] === specialFood[1]) {
//         ateFood = true;
//         setScore(prev => prev + 50);
//         spawnParticles(specialFood[0], specialFood[1], '#ffd93d', 25);
//         setSpecialFood(null);
//         setSpecialFoodTimer(null);
//       }

//       if (ateFood) {
//         return [newHead, ...newSnake];
//       }

//       return newSnakeMoved;
//     });
//   }, [direction, food, gameOver, isPaused, gameStarted, generateFood, specialFood, combo, foodEaten, spawnParticles]);

//   // ================ useEffect ها ================
//   useEffect(() => {
//     if (gameOver || !gameStarted || isPaused) {
//       if (gameLoopRef.current) {
//         clearInterval(gameLoopRef.current);
//         gameLoopRef.current = null;
//       }
//       return;
//     }

//     if (gameLoopRef.current) {
//       clearInterval(gameLoopRef.current);
//     }

//     gameLoopRef.current = setInterval(moveSnake, speed);
//     return () => {
//       if (gameLoopRef.current) {
//         clearInterval(gameLoopRef.current);
//         gameLoopRef.current = null;
//       }
//     };
//   }, [moveSnake, gameOver, gameStarted, isPaused, speed]);

//   useEffect(() => {
//     if (isPaused || gameOver || !gameStarted) {
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//         timerIntervalRef.current = null;
//       }
//     } else if (gameStarted && !gameOver && !isPaused) {
//       if (!timerIntervalRef.current) {
//         timerIntervalRef.current = setInterval(() => {
//           setTimer(prev => prev + 1);
//         }, 1000);
//       }
//     }
    
//     return () => {
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//         timerIntervalRef.current = null;
//       }
//     };
//   }, [isPaused, gameOver, gameStarted]);

//   useEffect(() => {
//     if (!specialFoodTimer) return;
//     const checkTimer = setInterval(() => {
//       if (specialFood && Date.now() > specialFoodTimer) {
//         setSpecialFood(null);
//         setSpecialFoodTimer(null);
//       }
//     }, 100);
//     return () => clearInterval(checkTimer);
//   }, [specialFood, specialFoodTimer]);

//   useEffect(() => {
//     const animateParticles = () => {
//       setParticles(prev => 
//         prev
//           .map(p => ({
//             ...p,
//             x: p.x + p.vx,
//             y: p.y + p.vy,
//             life: p.life - 0.02,
//             vy: p.vy + 0.05,
//           }))
//           .filter(p => p.life > 0)
//       );
//       animationFrameRef.current = requestAnimationFrame(animateParticles);
//     };

//     animateParticles();
//     return () => {
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!food && !gameStarted && !gameOver) {
//       const newFood = generateFood(INITIAL_SNAKE);
//       setFood(newFood);
//     }
//   }, [food, gameStarted, gameOver, generateFood]);

//   // ================ کنترل‌های کیبورد ================
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       const key = e.key;
      
//       if (key === ' ' || key === 'Space') {
//         e.preventDefault();
//         if (!gameStarted && !gameOver) {
//           startGame();
//         } else if (!gameOver) {
//           setIsPaused(prev => !prev);
//         }
//         return;
//       }

//       if (key === 'r' || key === 'R') {
//         resetGame();
//         return;
//       }

//       if (!gameStarted || gameOver || isPaused) return;

//       const oppositeDirections = {
//         'UP': 'DOWN',
//         'DOWN': 'UP',
//         'LEFT': 'RIGHT',
//         'RIGHT': 'LEFT'
//       };

//       let newDirection = null;
//       switch (key) {
//         case 'ArrowUp': newDirection = 'UP'; break;
//         case 'ArrowDown': newDirection = 'DOWN'; break;
//         case 'ArrowLeft': newDirection = 'RIGHT'; break;
//         case 'ArrowRight': newDirection = 'LEFT'; break;
//         default: return;
//       }

//       e.preventDefault();
//       if (newDirection && oppositeDirections[newDirection] !== direction) {
//         setDirection(newDirection);
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [direction, gameStarted, gameOver, isPaused, resetGame, startGame]);

//   // ================ کنترل‌های لمسی ================
//   const [touchStart, setTouchStart] = useState(null);
//   const handleTouchStart = (e) => {
//     const touch = e.touches[0];
//     setTouchStart({ x: touch.clientX, y: touch.clientY });
//   };

//   const handleTouchEnd = (e) => {
//     if (!touchStart) return;
//     const touch = e.changedTouches[0];
//     const dx = touch.clientX - touchStart.x;
//     const dy = touch.clientY - touchStart.y;
    
//     if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
//       if (!gameStarted && !gameOver) {
//         startGame();
//       } else if (!gameOver) {
//         setIsPaused(prev => !prev);
//       }
//       return;
//     }

//     if (Math.abs(dx) > Math.abs(dy)) {
//       if (dx > 0 && direction !== 'LEFT') setDirection('RIGHT');
//       else if (dx < 0 && direction !== 'RIGHT') setDirection('LEFT');
//     } else {
//       if (dy > 0 && direction !== 'UP') setDirection('DOWN');
//       else if (dy < 0 && direction !== 'DOWN') setDirection('UP');
//     }
//     setTouchStart(null);
//   };

//   // ================ رندر تخته ================
//   const renderBoard = () => {
//     const cells = [];
//     for (let row = 0; row < BOARD_SIZE; row++) {
//       for (let col = 0; col < BOARD_SIZE; col++) {
//         const isSnake = snake.some(segment => segment[0] === row && segment[1] === col);
//         const isFood = food && food[0] === row && food[1] === col;
//         const isSpecial = specialFood && specialFood[0] === row && specialFood[1] === col;
//         const isHead = snake[0] && snake[0][0] === row && snake[0][1] === col;

//         let className = 'cell';
//         if (isSnake) className += ' snake';
//         if (isHead) className += ' head';
//         if (isFood) className += ' food';
//         if (isSpecial) className += ' special-food';

//         const style = {};
//         if (isSnake && !isHead) {
//           const index = snake.findIndex(seg => seg[0] === row && seg[1] === col);
//           const gradient = `hsl(${170 + index * 5}, 70%, ${45 + index * 1.5}%)`;
//           style.background = gradient;
//         }

//         cells.push(
//           <div 
//             key={`${row}-${col}`} 
//             className={className} 
//             style={style}
//             role="gridcell"
//           />
//         );
//       }
//     }
//     return cells;
//   };

//   // ================ اشتراک‌گذاری ================
//   const shareScore = () => {
//     const timeStr = formatTime(timer);
//     const text = `🐍 من در بازی مار استاد به امتیاز ${score} در سطح ${level} و زمان ${timeStr} رسیدم!\nآیا میتونی رکورد من رو بزنی؟\nمشاوراملاکی`;
//     const url = typeof window !== 'undefined' ? window.location.href : '';
    
//     if (navigator.share) {
//       navigator.share({
//         title: 'بازی مار استاد - مشاوراملاکی',
//         text: text,
//         url: url,
//       }).catch(() => {});
//     } else {
//       setShowShareModal(true);
//     }
//   };

//   const copyToClipboard = () => {
//     const timeStr = formatTime(timer);
//     const text = `🐍 من در بازی مار استاد به امتیاز ${score} در سطح ${level} و زمان ${timeStr} رسیدم!\nآیا میتونی رکورد من رو بزنی؟\nمشاوراملاکی`;
//     navigator.clipboard.writeText(text);
//     setShowShareModal(false);
//   };

//   // ================ رندر ================
//   return (
//     <>
//       <MetaTags />

//       <div className="game-wrapper" dir="rtl">
//         {/* نوار بالایی با وضعیت کاربر */}
//         <div className="top-bar">
//           <div className="user-section">
//             {isLoggedIn ? (
//               <div className="user-info">
//                 <span className="user-name">👤 {user.name}</span>
//                 {userRank && (
//                   <span className="user-rank">🏅 رتبه #{userRank.rank}</span>
//                 )}
//                 <button className="logout-btn" onClick={handleLogout}>
//                   خروج
//                 </button>
//               </div>
//             ) : (
//               <button className="login-btn" onClick={() => setShowLoginModal(true)}>
//                 🔑 ورود / ثبت‌نام
//               </button>
//             )}
//           </div>
//           <button 
//             className="leaderboard-toggle"
//             onClick={() => setShowLeaderboard(!showLeaderboard)}
//           >
//             🏆 رتبه‌بندی
//           </button>
//         </div>

//         {/* مودال لاگین */}
//         {showLoginModal && (
//           <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
//             <div className="modal-content" onClick={e => e.stopPropagation()}>
//               <button className="modal-close" onClick={() => setShowLoginModal(false)}>✖</button>
//               <h2>🔑 ورود به حساب کاربری</h2>
//               <p className="modal-subtitle">برای ثبت امتیاز و شرکت در مسابقه وارد شوید</p>
              
//               <form onSubmit={handleLogin}>
//                 <div className="form-group">
//                   <label>شماره موبایل</label>
//                   <input
//                     type="tel"
//                     placeholder="مثال: 09121231234"
//                     value={loginPhone}
//                     onChange={(e) => setLoginPhone(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>رمز عبور</label>
//                   <input
//                     type="password"
//                     placeholder="رمز عبور خود را وارد کنید"
//                     value={loginPassword}
//                     onChange={(e) => setLoginPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 {loginError && <div className="error-message">{loginError}</div>}
//                 <button type="submit" className="submit-btn">ورود</button>
//               </form>
              
//               <div className="demo-accounts">
//                 <p>👤 حساب‌های آزمایشی:</p>
//                 <div className="demo-list">
//                   <span>09121231234 / 1234</span>
//                   <span>09131235678 / 1234</span>
//                   <span>09141239012 / 1234</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* پنل رتبه‌بندی */}
//         {showLeaderboard && (
//           <div className="leaderboard-panel">
//             <div className="leaderboard-header">
//               <h3>🏆 برترین بازیکنان</h3>
//               <button className="close-leaderboard" onClick={() => setShowLeaderboard(false)}>✖</button>
//             </div>
            
//             {isLoading ? (
//               <div className="loading">در حال بارگذاری...</div>
//             ) : (
//               <>
//                 {/* رتبه کاربر (اگر لاگین کرده باشد) */}
//                 {isLoggedIn && userRank && (
//                   <div className="user-rank-box">
//                     <div className="user-rank-info">
//                       <span>🌟 رتبه شما</span>
//                       <span className="rank-number">#{userRank.rank}</span>
//                       <span className="rank-score">امتیاز: {userRank.score}</span>
//                     </div>
//                   </div>
//                 )}

//                 {/* لیست برترین‌ها */}
//                 <div className="leaderboard-list">
//                   {leaderboard.map((player, index) => (
//                     <div 
//                       key={player.id} 
//                       className={`leaderboard-item ${isLoggedIn && user?.id === player.id ? 'current-user' : ''}`}
//                     >
//                       <div className="rank">#{player.rank}</div>
//                       <div className="player-info">
//                         <div className="player-name">{player.name}</div>
//                         <div className="player-details">
//                           <span>امتیاز: {player.score}</span>
//                           <span>سطح: {player.level}</span>
//                           <span>⏱️ {player.time}</span>
//                         </div>
//                       </div>
//                       {/* نمایش شماره موبایل فقط برای کاربر لاگین شده */}
//                       {isLoggedIn ? (
//                         <div className="player-phone">{player.phone}</div>
//                       ) : (
//                         <div className="player-phone locked">🔒 برای مشاهده شماره وارد شوید</div>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {!isLoggedIn && (
//                   <div className="login-prompt">
//                     <p>🔑 برای شرکت در مسابقه و کسب امتیاز، وارد حساب کاربری خود شوید</p>
//                     <button className="login-prompt-btn" onClick={() => setShowLoginModal(true)}>
//                       ورود / ثبت‌نام
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         )}

//         {/* بقیه بخش‌های بازی (همانند قبل) */}
//         <div className="bg-particles" aria-hidden="true" />
//         <div className="bg-grid" aria-hidden="true" />

//         <div className="game-container">
//           <div className="header">
//             <div className="header-left">
//               <h1>
//                 <span className="snake-icon" aria-hidden="true">🐍</span>
//                 مار استاد
//               </h1>
//               <div className="level-badge" role="status">
//                 <span aria-hidden="true">🏆</span>
//                 <span>سطح {level}</span>
//               </div>
//             </div>
//             <div className="stats">
//               <div className="stat-item">
//                 <span className="stat-label">امتیاز</span>
//                 <span className="stat-value">{score}</span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-label">بهترین</span>
//                 <span className="stat-value high-score">{highScore}</span>
//               </div>
//             </div>
//           </div>

//           <div className="timer-container">
//             <div className="timer-display">
//               <span className="timer-icon">⏱️</span>
//               <span className="timer-value">{formatTime(timer)}</span>
//               {bestTime > 0 && (
//                 <span className="best-time">🏅 {formatTime(bestTime)}</span>
//               )}
//             </div>
//           </div>

//           <div className="board-wrapper">
//             <div 
//               className="board"
//               onTouchStart={handleTouchStart}
//               onTouchEnd={handleTouchEnd}
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
//                 gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
//                 gap: '2px',
//                 backgroundColor: 'rgba(255,255,255,0.05)',
//                 padding: '12px',
//                 borderRadius: '16px',
//                 position: 'relative',
//               }}
//             >
//               {renderBoard()}

//               {particles.map((p, i) => (
//                 <div
//                   key={i}
//                   className="particle"
//                   style={{
//                     position: 'absolute',
//                     left: p.x,
//                     top: p.y,
//                     width: p.size,
//                     height: p.size,
//                     background: p.color,
//                     borderRadius: '50%',
//                     opacity: p.life,
//                     transform: `scale(${p.life})`,
//                     pointerEvents: 'none',
//                   }}
//                 />
//               ))}

//               {showLevelUp && (
//                 <div className="level-up-overlay">
//                   <div className="level-up-text">⭐ سطح {level}!</div>
//                 </div>
//               )}

//               {gameOver && (
//                 <div className="game-over-overlay">
//                   <div className="game-over-content">
//                     <div className="game-over-icon">💀</div>
//                     <h2>بازی تمام شد!</h2>
//                     <div className="final-score">
//                       امتیاز: <span>{score}</span>
//                     </div>
//                     <div className="final-stats">
//                       <div>سطح: {level}</div>
//                       <div>غذا: {foodEaten}</div>
//                       <div>⏱️ {formatTime(timer)}</div>
//                     </div>
//                     {bestTime > 0 && (
//                       <div className="best-time-display">🏅 بهترین زمان: {formatTime(bestTime)}</div>
//                     )}
//                     <div className="game-over-buttons">
//                       <button className="play-again-btn" onClick={resetGame}>
//                         بازی دوباره
//                       </button>
//                       {score > 0 && (
//                         <button className="share-btn" onClick={shareScore}>
//                           📤 اشتراک‌گذاری
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {isPaused && !gameOver && gameStarted && (
//                 <div className="pause-overlay">
//                   <div className="pause-icon">⏸️</div>
//                   <div className="pause-text">مکث</div>
//                 </div>
//               )}

//               {!gameStarted && !gameOver && (
//                 <div className="start-overlay">
//                   <div className="start-content">
//                     <div className="start-icon">🐍</div>
//                     <h2>مار استاد</h2>
//                     <p>برای شروع دکمه <strong>Space</strong> یا کلیک کن</p>
//                     <button className="start-btn" onClick={startGame}>
//                       شروع بازی
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="controls">
//             <button 
//               className="control-btn primary"
//               onClick={() => {
//                 if (!gameStarted && !gameOver) {
//                   startGame();
//                 } else if (!gameOver) {
//                   setIsPaused(prev => !prev);
//                 }
//               }}
//             >
//               {!gameStarted ? '▶ شروع' : isPaused ? '▶ ادامه' : '⏸ مکث'}
//             </button>
//             <button className="control-btn secondary" onClick={resetGame}>
//               🔄 بازی جدید
//             </button>
//           </div>

//           <div className="mobile-controls">
//             <div className="dpad">
//               <button className="dpad-btn up" onClick={() => direction !== 'DOWN' && setDirection('UP')}>▲</button>
//               <button className="dpad-btn down" onClick={() => direction !== 'UP' && setDirection('DOWN')}>▼</button>
//               <button className="dpad-btn left" onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}>◄</button>
//               <button className="dpad-btn right" onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}>►</button>
//             </div>
//           </div>

//           <div className="info">
//             <div className="combo-display">
//               {combo > 1 && <span className="combo-text">🔥 کامبو x{combo}</span>}
//             </div>
//             <div className="instructions">
//               <span>↑ ↓ ← →</span>
//               <span className="sep">|</span>
//               <span>␣ مکث</span>
//               <span className="sep">|</span>
//               <span>R ریستارت</span>
//             </div>
//           </div>
//         </div>

//         {/* محتوای سئو */}
//         <div className="seo-content">
//           <h2>درباره بازی مار استاد</h2>
//           <p>
//             بازی مار استاد یک بازی کلاسیک و سرگرم‌کننده است که در سایت مشاوراملاکی طراحی شده تا 
//             لحظات خوشی را برای شما به ارمغان بیاورد. این بازی با گرافیک مدرن و امکانات پیشرفته، 
//             تجربه‌ای متفاوت از بازی‌های سنتی مار را به شما ارائه می‌دهد.
//           </p>
          
//           <h3>ویژگی‌های بازی مار</h3>
//           <ul>
//             <li>گرافیک زیبا و مدرن با افکت‌های ویژه</li>
//             <li>سیستم امتیازدهی پویا با ترکیب (کامبو)</li>
//             <li>غذاهای ویژه با امتیاز بیشتر</li>
//             <li>سطح‌بندی پیشرفته با افزایش سرعت</li>
//             <li>قابل بازی در موبایل و دسکتاپ</li>
//             <li>ذخیره خودکار رکوردها و بهترین زمان</li>
//             <li>سیستم رتبه‌بندی و مسابقات</li>
//           </ul>

//           <h3>چطور بازی کنیم؟</h3>
//           <ol>
//             <li>با کلیدهای جهت‌نما (↑ ↓ ← →) مار را حرکت دهید</li>
//             <li>برای شروع بازی کلید Space را بزنید</li>
//             <li>غذاهای قرمز رنگ را بخورید تا امتیاز بگیرید</li>
//             <li>غذاهای طلایی ویژه امتیاز بیشتری دارند</li>
//             <li>با هر ۵ بار غذا خوردن، سطح شما افزایش می‌یابد</li>
//           </ol>
          
//           <div className="seo-tags">
//             <span className="tag">#بازی_مار</span>
//             <span className="tag">#مار_استاد</span>
//             <span className="tag">#مشاوراملاکی</span>
//             <span className="tag">#بازی_آنلاین</span>
//             <span className="tag">#سرگرمی</span>
//           </div>
//         </div>

//         {/* مودال اشتراک‌گذاری */}
//         {showShareModal && (
//           <div className="share-modal">
//             <div className="share-modal-content">
//               <h3>اشتراک‌گذاری امتیاز</h3>
//               <p>امتیاز خود را با دوستانتان به اشتراک بگذارید!</p>
//               <div className="share-buttons">
//                 <button onClick={copyToClipboard} className="share-btn copy-btn">
//                   📋 کپی متن
//                 </button>
//                 <button 
//                   onClick={() => {
//                     const url = typeof window !== 'undefined' ? window.location.href : '';
//                     const timeStr = formatTime(timer);
//                     window.open(`https://t.me/share/url?url=${url}&text=🐍 من در بازی مار استاد به امتیاز ${score} در زمان ${timeStr} رسیدم!`);
//                   }}
//                   className="share-btn telegram"
//                 >
//                   📨 تلگرام
//                 </button>
//                 <button 
//                   onClick={() => {
//                     const url = typeof window !== 'undefined' ? window.location.href : '';
//                     const timeStr = formatTime(timer);
//                     window.open(`https://api.whatsapp.com/send?text=🐍 من در بازی مار استاد به امتیاز ${score} در زمان ${timeStr} رسیدم! ${url}`);
//                   }}
//                   className="share-btn whatsapp"
//                 >
//                   💬 واتساپ
//                 </button>
//               </div>
//               <button onClick={() => setShowShareModal(false)} className="close-modal">
//                 ✖ بستن
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ================ استایل‌ها ================ */}
//         <style jsx>{`
//           .game-wrapper {
//             min-height: 100vh;
//             background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: flex-start;
//             padding: 20px;
//             position: relative;
//             overflow: hidden;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           /* ===== نوار بالایی ===== */
//           .top-bar {
//             width: 100%;
//             max-width: 600px;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             padding: 10px 0;
//             margin-bottom: 10px;
//             gap: 10px;
//             flex-wrap: wrap;
//           }

//           .user-section {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//           }

//           .user-info {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             background: rgba(255,255,255,0.05);
//             padding: 6px 15px;
//             border-radius: 20px;
//             border: 1px solid rgba(255,255,255,0.1);
//           }

//           .user-name {
//             color: #fff;
//             font-size: 14px;
//           }

//           .user-rank {
//             color: #ffd93d;
//             font-size: 12px;
//             background: rgba(255,217,61,0.15);
//             padding: 2px 10px;
//             border-radius: 12px;
//           }

//           .login-btn {
//             background: linear-gradient(135deg, #4ecdc4, #44b39d);
//             color: white;
//             border: none;
//             padding: 8px 20px;
//             border-radius: 20px;
//             cursor: pointer;
//             font-size: 14px;
//             font-weight: 600;
//             transition: all 0.3s;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .login-btn:hover {
//             transform: scale(1.05);
//             box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
//           }

//           .logout-btn {
//             background: rgba(255,107,107,0.2);
//             color: #ff6b6b;
//             border: 1px solid rgba(255,107,107,0.3);
//             padding: 4px 12px;
//             border-radius: 12px;
//             cursor: pointer;
//             font-size: 12px;
//             transition: all 0.3s;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .logout-btn:hover {
//             background: rgba(255,107,107,0.3);
//           }

//           .leaderboard-toggle {
//             background: rgba(255,217,61,0.15);
//             color: #ffd93d;
//             border: 1px solid rgba(255,217,61,0.2);
//             padding: 8px 18px;
//             border-radius: 20px;
//             cursor: pointer;
//             font-size: 14px;
//             font-weight: 600;
//             transition: all 0.3s;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .leaderboard-toggle:hover {
//             background: rgba(255,217,61,0.25);
//             transform: scale(1.05);
//           }

//           /* ===== مودال لاگین ===== */
//           .modal-overlay {
//             position: fixed;
//             inset: 0;
//             background: rgba(0,0,0,0.8);
//             backdrop-filter: blur(10px);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             z-index: 1000;
//             animation: fadeIn 0.3s ease;
//           }

//           .modal-content {
//             background: linear-gradient(135deg, #1a1a2e, #16213e);
//             padding: 30px;
//             border-radius: 20px;
//             max-width: 400px;
//             width: 90%;
//             border: 1px solid rgba(255,255,255,0.1);
//             position: relative;
//           }

//           .modal-close {
//             position: absolute;
//             top: 15px;
//             left: 15px;
//             background: none;
//             border: none;
//             color: rgba(255,255,255,0.5);
//             font-size: 20px;
//             cursor: pointer;
//             transition: color 0.3s;
//           }

//           .modal-close:hover {
//             color: #fff;
//           }

//           .modal-content h2 {
//             color: #fff;
//             font-size: 24px;
//             margin-bottom: 5px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .modal-subtitle {
//             color: rgba(255,255,255,0.5);
//             font-size: 14px;
//             margin-bottom: 20px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .form-group {
//             margin-bottom: 15px;
//           }

//           .form-group label {
//             display: block;
//             color: rgba(255,255,255,0.7);
//             font-size: 13px;
//             margin-bottom: 5px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .form-group input {
//             width: 100%;
//             padding: 10px 15px;
//             border-radius: 10px;
//             border: 1px solid rgba(255,255,255,0.1);
//             background: rgba(255,255,255,0.05);
//             color: #fff;
//             font-size: 14px;
//             transition: border-color 0.3s;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//             direction: ltr;
//           }

//           .form-group input:focus {
//             outline: none;
//             border-color: #4ecdc4;
//           }

//           .form-group input::placeholder {
//             color: rgba(255,255,255,0.3);
//           }

//           .error-message {
//             color: #ff6b6b;
//             font-size: 13px;
//             margin-bottom: 15px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .submit-btn {
//             width: 100%;
//             padding: 12px;
//             border: none;
//             border-radius: 10px;
//             background: linear-gradient(135deg, #4ecdc4, #44b39d);
//             color: white;
//             font-size: 16px;
//             font-weight: 600;
//             cursor: pointer;
//             transition: all 0.3s;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .submit-btn:hover {
//             transform: scale(1.02);
//             box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
//           }

//           .demo-accounts {
//             margin-top: 20px;
//             padding-top: 15px;
//             border-top: 1px solid rgba(255,255,255,0.05);
//           }

//           .demo-accounts p {
//             color: rgba(255,255,255,0.4);
//             font-size: 12px;
//             margin-bottom: 8px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .demo-list {
//             display: flex;
//             flex-wrap: wrap;
//             gap: 8px;
//           }

//           .demo-list span {
//             background: rgba(255,255,255,0.05);
//             padding: 4px 12px;
//             border-radius: 8px;
//             color: rgba(255,255,255,0.5);
//             font-size: 11px;
//             direction: ltr;
//             font-family: 'Courier New', monospace;
//           }

//           /* ===== پنل رتبه‌بندی ===== */
//           .leaderboard-panel {
//             width: 100%;
//             max-width: 600px;
//             background: rgba(255,255,255,0.03);
//             border-radius: 16px;
//             border: 1px solid rgba(255,255,255,0.05);
//             padding: 20px;
//             margin-bottom: 15px;
//             backdrop-filter: blur(10px);
//           }

//           .leaderboard-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 15px;
//           }

//           .leaderboard-header h3 {
//             color: #ffd93d;
//             font-size: 18px;
//             margin: 0;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .close-leaderboard {
//             background: none;
//             border: none;
//             color: rgba(255,255,255,0.3);
//             font-size: 18px;
//             cursor: pointer;
//             transition: color 0.3s;
//           }

//           .close-leaderboard:hover {
//             color: #fff;
//           }

//           .loading {
//             color: rgba(255,255,255,0.5);
//             text-align: center;
//             padding: 20px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .user-rank-box {
//             background: linear-gradient(135deg, rgba(78,205,196,0.1), rgba(255,217,61,0.05));
//             border: 1px solid rgba(78,205,196,0.2);
//             border-radius: 12px;
//             padding: 12px 20px;
//             margin-bottom: 15px;
//           }

//           .user-rank-info {
//             display: flex;
//             align-items: center;
//             gap: 15px;
//             color: #fff;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .rank-number {
//             font-size: 24px;
//             font-weight: 700;
//             color: #ffd93d;
//           }

//           .rank-score {
//             color: rgba(255,255,255,0.6);
//             font-size: 14px;
//           }

//           .leaderboard-list {
//             display: flex;
//             flex-direction: column;
//             gap: 6px;
//             max-height: 400px;
//             overflow-y: auto;
//           }

//           .leaderboard-list::-webkit-scrollbar {
//             width: 4px;
//           }

//           .leaderboard-list::-webkit-scrollbar-track {
//             background: rgba(255,255,255,0.05);
//             border-radius: 10px;
//           }

//           .leaderboard-list::-webkit-scrollbar-thumb {
//             background: rgba(78,205,196,0.3);
//             border-radius: 10px;
//           }

//           .leaderboard-item {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             padding: 10px 15px;
//             background: rgba(255,255,255,0.03);
//             border-radius: 10px;
//             transition: background 0.3s;
//           }

//           .leaderboard-item:hover {
//             background: rgba(255,255,255,0.06);
//           }

//           .leaderboard-item.current-user {
//             background: rgba(78,205,196,0.08);
//             border: 1px solid rgba(78,205,196,0.15);
//           }

//           .rank {
//             font-size: 14px;
//             font-weight: 700;
//             color: #ffd93d;
//             min-width: 35px;
//             font-family: 'Courier New', monospace;
//           }

//           .player-info {
//             flex: 1;
//           }

//           .player-name {
//             color: #fff;
//             font-size: 14px;
//             font-weight: 600;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .player-details {
//             display: flex;
//             gap: 12px;
//             color: rgba(255,255,255,0.4);
//             font-size: 11px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .player-phone {
//             color: rgba(255,255,255,0.5);
//             font-size: 12px;
//             direction: ltr;
//             font-family: 'Courier New', monospace;
//           }

//           .player-phone.locked {
//             color: rgba(255,255,255,0.2);
//             font-size: 11px;
//           }

//           .login-prompt {
//             text-align: center;
//             padding: 20px;
//             margin-top: 15px;
//             border-top: 1px solid rgba(255,255,255,0.05);
//           }

//           .login-prompt p {
//             color: rgba(255,255,255,0.5);
//             font-size: 14px;
//             margin-bottom: 12px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .login-prompt-btn {
//             background: linear-gradient(135deg, #4ecdc4, #44b39d);
//             color: white;
//             border: none;
//             padding: 10px 30px;
//             border-radius: 12px;
//             cursor: pointer;
//             font-size: 14px;
//             font-weight: 600;
//             transition: all 0.3s;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .login-prompt-btn:hover {
//             transform: scale(1.05);
//             box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
//           }

//           /* ===== بقیه استایل‌ها (همانند قبل) ===== */
//           .bg-particles {
//             position: fixed;
//             width: 100%;
//             height: 100%;
//             background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
//                               radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
//                               radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
//                               radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
//                               radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0));
//             background-size: 200px 200px;
//             opacity: 0.3;
//             pointer-events: none;
//           }

//           .bg-grid {
//             position: fixed;
//             width: 100%;
//             height: 100%;
//             background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
//                               linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
//             background-size: 50px 50px;
//             pointer-events: none;
//           }

//           .game-container {
//             background: rgba(255,255,255,0.05);
//             backdrop-filter: blur(20px);
//             border-radius: 24px;
//             padding: 30px;
//             max-width: 600px;
//             width: 100%;
//             border: 1px solid rgba(255,255,255,0.1);
//             box-shadow: 0 25px 50px rgba(0,0,0,0.5);
//             position: relative;
//             z-index: 1;
//           }

//           .header {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 10px;
//             flex-wrap: wrap;
//             gap: 10px;
//           }

//           .header-left {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//           }

//           .header h1 {
//             margin: 0;
//             font-size: 22px;
//             font-weight: 700;
//             background: linear-gradient(135deg, #4ecdc4, #44d4b4);
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//             letter-spacing: -0.5px;
//           }

//           .snake-icon {
//             -webkit-text-fill-color: initial;
//           }

//           .level-badge {
//             background: rgba(78, 205, 196, 0.15);
//             padding: 4px 12px;
//             border-radius: 20px;
//             font-size: 12px;
//             color: #4ecdc4;
//             display: flex;
//             align-items: center;
//             gap: 4px;
//             border: 1px solid rgba(78, 205, 196, 0.2);
//           }

//           .stats {
//             display: flex;
//             gap: 15px;
//           }

//           .stat-item {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//           }

//           .stat-label {
//             font-size: 10px;
//             text-transform: uppercase;
//             color: rgba(255,255,255,0.4);
//             letter-spacing: 1px;
//           }

//           .stat-value {
//             font-size: 20px;
//             font-weight: 700;
//             color: #fff;
//           }

//           .stat-value.high-score {
//             color: #ffd93d;
//           }

//           .timer-container {
//             display: flex;
//             justify-content: center;
//             margin-bottom: 15px;
//           }

//           .timer-display {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             background: rgba(0,0,0,0.3);
//             padding: 8px 20px;
//             border-radius: 30px;
//             border: 1px solid rgba(255,255,255,0.1);
//           }

//           .timer-icon {
//             font-size: 18px;
//           }

//           .timer-value {
//             font-size: 20px;
//             font-weight: 700;
//             color: #4ecdc4;
//             font-family: 'Courier New', monospace;
//             min-width: 60px;
//             text-align: center;
//           }

//           .best-time {
//             font-size: 14px;
//             color: #ffd93d;
//             padding-right: 12px;
//             border-right: 1px solid rgba(255,255,255,0.1);
//           }

//           .board-wrapper {
//             position: relative;
//           }

//           .board {
//             width: 100%;
//             aspect-ratio: 1;
//             margin: 0 auto;
//             position: relative;
//             background: rgba(0,0,0,0.3);
//             border-radius: 16px;
//           }

//           .cell {
//             width: 100%;
//             height: 100%;
//             background: rgba(255,255,255,0.05);
//             border-radius: 4px;
//             transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
//           }

//           .cell.snake {
//             background: linear-gradient(135deg, #4ecdc4, #44b39d);
//             border-radius: 6px;
//             box-shadow: 0 0 20px rgba(78, 205, 196, 0.3);
//           }

//           .cell.head {
//             background: linear-gradient(135deg, #5fd9d0, #4ecdc4) !important;
//             border-radius: 8px;
//             box-shadow: 0 0 30px rgba(78, 205, 196, 0.6), inset 0 -2px 0 rgba(0,0,0,0.2);
//             transform: scale(0.9);
//           }

//           .cell.food {
//             background: radial-gradient(circle, #ff6b6b, #ee5a24);
//             border-radius: 50%;
//             box-shadow: 0 0 30px rgba(255, 107, 107, 0.6);
//             animation: foodPulse 0.6s ease-in-out infinite alternate;
//           }

//           .cell.special-food {
//             background: radial-gradient(circle, #ffd93d, #f6b93b);
//             border-radius: 50%;
//             box-shadow: 0 0 40px rgba(255, 217, 61, 0.8);
//             animation: specialPulse 0.3s ease-in-out infinite alternate;
//           }

//           @keyframes foodPulse {
//             from { transform: scale(0.8); }
//             to { transform: scale(1.1); }
//           }

//           @keyframes specialPulse {
//             from { transform: scale(0.7) rotate(0deg); }
//             to { transform: scale(1.2) rotate(180deg); }
//           }

//           .controls {
//             display: flex;
//             gap: 10px;
//             margin-top: 15px;
//             justify-content: center;
//             flex-wrap: wrap;
//           }

//           .control-btn {
//             padding: 10px 25px;
//             font-size: 14px;
//             font-weight: 600;
//             border: none;
//             border-radius: 12px;
//             cursor: pointer;
//             transition: all 0.3s;
//             letter-spacing: 0.5px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .control-btn.primary {
//             background: linear-gradient(135deg, #4ecdc4, #44b39d);
//             color: white;
//             box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
//           }

//           .control-btn.primary:hover {
//             transform: translateY(-2px);
//             box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
//           }

//           .control-btn.secondary {
//             background: rgba(255,255,255,0.1);
//             color: white;
//             border: 1px solid rgba(255,255,255,0.2);
//           }

//           .control-btn.secondary:hover {
//             background: rgba(255,255,255,0.2);
//             transform: translateY(-2px);
//           }

//           .mobile-controls {
//             display: none;
//             margin-top: 15px;
//             justify-content: center;
//           }

//           @media (max-width: 768px) {
//             .mobile-controls {
//               display: flex;
//             }
//           }

//           .dpad {
//             display: grid;
//             grid-template-columns: 60px 60px 60px;
//             grid-template-rows: 60px 60px 60px;
//             gap: 4px;
//           }

//           .dpad-btn {
//             background: rgba(255,255,255,0.1);
//             border: 1px solid rgba(255,255,255,0.15);
//             border-radius: 12px;
//             color: white;
//             font-size: 20px;
//             cursor: pointer;
//             transition: all 0.2s;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             -webkit-tap-highlight-color: transparent;
//             user-select: none;
//           }

//           .dpad-btn:active {
//             background: rgba(78, 205, 196, 0.3);
//             transform: scale(0.95);
//           }

//           .dpad-btn.up { grid-column: 2; grid-row: 1; }
//           .dpad-btn.down { grid-column: 2; grid-row: 3; }
//           .dpad-btn.left { grid-column: 1; grid-row: 2; }
//           .dpad-btn.right { grid-column: 3; grid-row: 2; }

//           .info {
//             margin-top: 15px;
//             text-align: center;
//           }

//           .combo-display {
//             min-height: 24px;
//             margin-bottom: 8px;
//           }

//           .combo-text {
//             color: #ffd93d;
//             font-weight: 700;
//             font-size: 18px;
//             animation: comboPop 0.3s ease;
//           }

//           @keyframes comboPop {
//             0% { transform: scale(0.5); opacity: 0; }
//             50% { transform: scale(1.2); }
//             100% { transform: scale(1); opacity: 1; }
//           }

//           .instructions {
//             display: flex;
//             justify-content: center;
//             gap: 10px;
//             color: rgba(255,255,255,0.4);
//             font-size: 13px;
//             flex-wrap: wrap;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .sep {
//             color: rgba(255,255,255,0.1);
//           }

//           .game-over-overlay,
//           .pause-overlay,
//           .start-overlay,
//           .level-up-overlay {
//             position: absolute;
//             inset: 0;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             background: rgba(0,0,0,0.75);
//             backdrop-filter: blur(8px);
//             border-radius: 16px;
//             z-index: 10;
//           }

//           .game-over-content,
//           .start-content {
//             text-align: center;
//             padding: 30px;
//             animation: fadeInUp 0.5s ease;
//           }

//           .game-over-icon {
//             font-size: 64px;
//             margin-bottom: 10px;
//           }

//           .game-over-content h2 {
//             font-size: 32px;
//             margin: 10px 0;
//             color: #ff6b6b;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .final-score {
//             font-size: 24px;
//             color: #fff;
//             margin: 10px 0;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .final-score span {
//             color: #ffd93d;
//             font-size: 32px;
//           }

//           .final-stats {
//             display: flex;
//             justify-content: center;
//             gap: 30px;
//             color: rgba(255,255,255,0.6);
//             margin: 15px 0;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .best-time-display {
//             color: #ffd93d;
//             font-size: 18px;
//             margin: 10px 0;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .game-over-buttons {
//             display: flex;
//             gap: 10px;
//             justify-content: center;
//             flex-wrap: wrap;
//           }

//           .play-again-btn,
//           .start-btn {
//             padding: 12px 40px;
//             font-size: 16px;
//             font-weight: 600;
//             border: none;
//             border-radius: 12px;
//             background: linear-gradient(135deg, #4ecdc4, #44b39d);
//             color: white;
//             cursor: pointer;
//             transition: all 0.3s;
//             margin-top: 10px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .play-again-btn:hover,
//           .start-btn:hover {
//             transform: scale(1.05);
//             box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
//           }

//           .share-btn {
//             padding: 12px 30px;
//             font-size: 16px;
//             font-weight: 600;
//             border: none;
//             border-radius: 12px;
//             background: linear-gradient(135deg, #ffd93d, #f6b93b);
//             color: #333;
//             cursor: pointer;
//             transition: all 0.3s;
//             margin-top: 10px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .share-btn:hover {
//             transform: scale(1.05);
//             box-shadow: 0 8px 25px rgba(255, 217, 61, 0.4);
//           }

//           .pause-icon,
//           .start-icon {
//             font-size: 56px;
//             animation: pulse 1.5s ease-in-out infinite;
//           }

//           .pause-text {
//             color: #fff;
//             font-size: 24px;
//             font-weight: 700;
//             margin-top: 10px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .start-content h2 {
//             font-size: 32px;
//             color: #fff;
//             margin: 10px 0;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .start-content p {
//             color: rgba(255,255,255,0.6);
//             margin: 10px 0 20px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .level-up-text {
//             font-size: 48px;
//             font-weight: 700;
//             color: #ffd93d;
//             text-shadow: 0 0 40px rgba(255, 217, 61, 0.5);
//             animation: levelUpPop 0.5s ease;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           @keyframes fadeInUp {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//           }

//           @keyframes pulse {
//             0%, 100% { transform: scale(1); }
//             50% { transform: scale(1.1); }
//           }

//           @keyframes levelUpPop {
//             0% { transform: scale(0) rotate(-10deg); opacity: 0; }
//             50% { transform: scale(1.2) rotate(5deg); }
//             100% { transform: scale(1) rotate(0deg); opacity: 1; }
//           }

//           .particle {
//             position: absolute;
//             pointer-events: none;
//             border-radius: 50%;
//             will-change: transform, opacity;
//           }

//           @keyframes fadeIn {
//             from { opacity: 0; }
//             to { opacity: 1; }
//           }

//           .seo-content {
//             max-width: 600px;
//             width: 100%;
//             margin-top: 30px;
//             padding: 20px;
//             background: rgba(255,255,255,0.03);
//             border-radius: 16px;
//             border: 1px solid rgba(255,255,255,0.05);
//             color: rgba(255,255,255,0.8);
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .seo-content h2 {
//             color: #4ecdc4;
//             font-size: 22px;
//             margin-bottom: 15px;
//           }

//           .seo-content h3 {
//             color: #ffd93d;
//             font-size: 18px;
//             margin-top: 20px;
//             margin-bottom: 10px;
//           }

//           .seo-content p {
//             line-height: 1.8;
//             margin-bottom: 15px;
//           }

//           .seo-content ul, 
//           .seo-content ol {
//             padding-right: 20px;
//             line-height: 2;
//             margin-bottom: 15px;
//           }

//           .seo-content li {
//             margin-bottom: 5px;
//           }

//           .seo-tags {
//             display: flex;
//             flex-wrap: wrap;
//             gap: 10px;
//             margin-top: 20px;
//           }

//           .seo-tags .tag {
//             background: rgba(78, 205, 196, 0.1);
//             padding: 5px 15px;
//             border-radius: 20px;
//             font-size: 12px;
//             color: #4ecdc4;
//             border: 1px solid rgba(78, 205, 196, 0.2);
//           }

//           .share-modal {
//             position: fixed;
//             inset: 0;
//             background: rgba(0,0,0,0.8);
//             backdrop-filter: blur(10px);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             z-index: 1000;
//             animation: fadeIn 0.3s ease;
//           }

//           .share-modal-content {
//             background: linear-gradient(135deg, #1a1a2e, #16213e);
//             padding: 30px;
//             border-radius: 20px;
//             max-width: 400px;
//             width: 90%;
//             text-align: center;
//             border: 1px solid rgba(255,255,255,0.1);
//             position: relative;
//           }

//           .share-modal-content h3 {
//             color: #fff;
//             font-size: 24px;
//             margin-bottom: 10px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .share-modal-content p {
//             color: rgba(255,255,255,0.6);
//             margin-bottom: 20px;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .share-buttons {
//             display: flex;
//             flex-direction: column;
//             gap: 10px;
//           }

//           .share-buttons .share-btn {
//             padding: 12px;
//             border: none;
//             border-radius: 12px;
//             cursor: pointer;
//             font-size: 16px;
//             font-weight: 600;
//             transition: all 0.3s;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .share-buttons .share-btn:hover {
//             transform: scale(1.02);
//           }

//           .share-buttons .share-btn.telegram {
//             background: #0088cc;
//             color: white;
//           }

//           .share-buttons .share-btn.whatsapp {
//             background: #25d366;
//             color: white;
//           }

//           .share-buttons .share-btn.copy-btn {
//             background: rgba(255,255,255,0.1);
//             color: white;
//             border: 1px solid rgba(255,255,255,0.2);
//           }

//           .close-modal {
//             margin-top: 15px;
//             padding: 10px 30px;
//             border: none;
//             border-radius: 10px;
//             background: rgba(255,255,255,0.1);
//             color: rgba(255,255,255,0.6);
//             cursor: pointer;
//             transition: all 0.3s;
//             font-family: 'Vazir', 'IRANSans', Arial, sans-serif;
//           }

//           .close-modal:hover {
//             background: rgba(255,255,255,0.2);
//           }

//           @media (max-width: 480px) {
//             .game-container {
//               padding: 15px;
//             }

//             .header h1 {
//               font-size: 18px;
//             }

//             .stat-value {
//               font-size: 16px;
//             }

//             .timer-value {
//               font-size: 16px;
//               min-width: 50px;
//             }

//             .best-time {
//               font-size: 12px;
//             }

//             .seo-content {
//               padding: 15px;
//             }

//             .seo-content h2 {
//               font-size: 18px;
//             }

//             .seo-content h3 {
//               font-size: 16px;
//             }

//             .final-stats {
//               gap: 15px;
//               font-size: 14px;
//               flex-wrap: wrap;
//             }

//             .leaderboard-item {
//               flex-wrap: wrap;
//               gap: 6px;
//             }

//             .player-details {
//               flex-wrap: wrap;
//               gap: 6px;
//             }

//             .top-bar {
//               flex-direction: column;
//               align-items: stretch;
//             }

//             .user-section {
//               justify-content: center;
//             }

//             .leaderboard-toggle {
//               width: 100%;
//               text-align: center;
//             }

//             .user-info {
//               flex-wrap: wrap;
//               justify-content: center;
//             }
//           }
//         `}</style>
//       </div>
//     </>
//   );
// };

// export default SnakeGame;
import React, { useState, useEffect, useCallback, useRef } from 'react';
import LoginModal from '../RealEstateDetailPageItem/LoginModal/LoginModal';

// ================ متا تگ‌ها ================
const MetaTags = () => {
  return (
    <>
      <title>بازی مار هوشمند | مشاوراملاکی - سرگرمی و چالش</title>
      <meta name="description" content="بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته. امتیاز بگیر، رکورد بزن و با دوستانت رقابت کن." />
      <meta name="keywords" content="بازی مار, مار استاد, بازی آنلاین, سرگرمی, مشاوراملاکی, رتبه‌بندی" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="بازی مار استاد - مشاوراملاکی" />
      <meta property="og:description" content="بازی کلاسیک مار با گرافیک مدرن و امکانات پیشرفته" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://your-site.com/snake-game'} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": "بازی مار استاد",
            "description": "بازی کلاسیک مار با گرافیک مدرن و امکانات ویژه",
            "applicationCategory": "Game",
            "operatingSystem": "All",
            "audience": {
              "@type": "Audience",
              "audienceType": "همه سنین"
            }
          })
        }}
      />
    </>
  );
};

// ================ سرویس API رتبه‌بندی ================
const leaderboardAPI = {
  getTopPlayers: async (limit = 10) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // این دیتا بعداً با API واقعی جایگزین می‌شه
    return [
      { id: 1, name: 'علی محمدی', phone: '0912***1234', score: 2850, level: 12, time: '03:45', rank: 1 },
      { id: 2, name: 'سارا احمدی', phone: '0913***5678', score: 2450, level: 10, time: '04:20', rank: 2 },
      { id: 3, name: 'رضا کریمی', phone: '0914***9012', score: 2100, level: 9, time: '05:10', rank: 3 },
      { id: 4, name: 'مریم حسینی', phone: '0915***3456', score: 1850, level: 8, time: '06:30', rank: 4 },
      { id: 5, name: 'احمد نوری', phone: '0916***7890', score: 1600, level: 7, time: '07:15', rank: 5 },
      { id: 6, name: 'زهرا رضایی', phone: '0917***2345', score: 1400, level: 6, time: '08:00', rank: 6 },
      { id: 7, name: 'محمد جعفری', phone: '0918***6789', score: 1200, level: 5, time: '09:20', rank: 7 },
      { id: 8, name: 'نرگس محمدی', phone: '0919***0123', score: 1000, level: 4, time: '10:45', rank: 8 },
    ];
  },

  getUserRank: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const ranks = {
      1: { rank: 1, score: 2850, level: 12, time: '03:45', totalPlayers: 8 },
      2: { rank: 2, score: 2450, level: 10, time: '04:20', totalPlayers: 8 },
      3: { rank: 3, score: 2100, level: 9, time: '05:10', totalPlayers: 8 },
    };
    return ranks[userId] || null;
  },

  submitScore: async (userId, score, level, time) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`✅ امتیاز ${score} برای کاربر ${userId} ثبت شد`);
    return { success: true, message: 'امتیاز با موفقیت ثبت شد' };
  }
};

// ================ کامپوننت اصلی بازی ================
const SnakeGame = () => {
  const BOARD_SIZE = 20;
  const INITIAL_SNAKE = [
    [10, 10],
    [10, 9],
    [10, 8],
  ];
  const INITIAL_DIRECTION = 'RIGHT';

  // ===== State های بازی =====
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [particles, setParticles] = useState([]);
  const [speed, setSpeed] = useState(150);
  const [foodEaten, setFoodEaten] = useState(0);
  const [specialFood, setSpecialFood] = useState(null);
  const [specialFoodTimer, setSpecialFoodTimer] = useState(null);
  const [timer, setTimer] = useState(0);
  const [bestTime, setBestTime] = useState(0);
  const timerIntervalRef = useRef(null);

  // ===== State های کاربر و رتبه‌بندی =====
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const gameLoopRef = useRef(null);
  const animationFrameRef = useRef(null);

  // ===== بررسی وضعیت لاگین از localStorage =====
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
        loadUserRank(parsedUser.id);
      } catch (e) {
        console.error('خطا در بارگذاری اطلاعات کاربر:', e);
      }
    }
  }, []);

  // ===== گوش‌دادن به رویداد تغییر وضعیت لاگین =====
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
          loadLeaderboard();
        } catch (e) {
          console.error('خطا در بروزرسانی کاربر:', e);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setUserRank(null);
      }
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  // ===== بارگذاری امتیاز برتر و بهترین زمان =====
  useEffect(() => {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) setHighScore(parseInt(saved));
    
    const savedTime = localStorage.getItem('snakeBestTime');
    if (savedTime) setBestTime(parseInt(savedTime));

    loadLeaderboard();
  }, []);

  // ===== ذخیره امتیاز برتر و بهترین زمان =====
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  // ===== ثبت امتیاز در رتبه‌بندی هنگام پایان بازی =====
  useEffect(() => {
    if (gameOver && score > 0 && isLoggedIn && user && !scoreSubmitted) {
      const timeStr = formatTime(timer);
      leaderboardAPI.submitScore(user.id, score, level, timeStr)
        .then(() => {
          setScoreSubmitted(true);
          loadLeaderboard();
          loadUserRank(user.id);
        })
        .catch(err => console.error('خطا در ثبت امتیاز:', err));
    }
  }, [gameOver, score, isLoggedIn, user, timer, level, scoreSubmitted]);

  // ===== توابع API =====
  const loadLeaderboard = async () => {
    setIsLoading(true);
    try {
      const data = await leaderboardAPI.getTopPlayers(10);
      setLeaderboard(data);
    } catch (error) {
      console.error('خطا در دریافت رتبه‌بندی:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserRank = async (userId) => {
    try {
      const data = await leaderboardAPI.getUserRank(userId);
      if (data) {
        setUserRank(data);
      }
    } catch (error) {
      console.error('خطا در دریافت رتبه کاربر:', error);
    }
  };

  // ===== توابع بازی =====
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateFood = useCallback((currentSnake) => {
    const maxAttempts = 1000;
    for (let i = 0; i < maxAttempts; i++) {
      const newFood = [
        Math.floor(Math.random() * BOARD_SIZE),
        Math.floor(Math.random() * BOARD_SIZE),
      ];
      if (!currentSnake.some(segment => 
        segment[0] === newFood[0] && segment[1] === newFood[1]
      ) && !(specialFood && specialFood[0] === newFood[0] && specialFood[1] === newFood[1])) {
        return newFood;
      }
    }
    return null;
  }, [BOARD_SIZE, specialFood]);

  const generateSpecialFood = useCallback((currentSnake) => {
    if (Math.random() > 0.15 || specialFood) return;
    const maxAttempts = 1000;
    for (let i = 0; i < maxAttempts; i++) {
      const newFood = [
        Math.floor(Math.random() * BOARD_SIZE),
        Math.floor(Math.random() * BOARD_SIZE),
      ];
      if (!currentSnake.some(segment => 
        segment[0] === newFood[0] && segment[1] === newFood[1]
      ) && !(food && food[0] === newFood[0] && food[1] === newFood[1])) {
        setSpecialFood(newFood);
        setSpecialFoodTimer(Date.now() + 5000);
        return;
      }
    }
  }, [food, specialFood]);

  const spawnParticles = useCallback((x, y, color, count = 12) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      newParticles.push({
        x: x * 25 + 12.5,
        y: y * 25 + 12.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: color,
        size: 3 + Math.random() * 4,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setGameStarted(false);
    setLevel(1);
    setCombo(0);
    setFoodEaten(0);
    setSpeed(150);
    setSpecialFood(null);
    setSpecialFoodTimer(null);
    setParticles([]);
    setTimer(0);
    setScoreSubmitted(false);
    
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    const newFood = generateFood(INITIAL_SNAKE);
    setFood(newFood);
  }, [generateFood]);

  const startGame = useCallback(() => {
    if (!food) {
      const newFood = generateFood(snake);
      setFood(newFood);
    }
    setGameStarted(true);
    setTimer(0);
    setScoreSubmitted(false);
    
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    timerIntervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  }, [food, snake, generateFood]);

  // ===== حرکت مار =====
  const moveSnake = useCallback(() => {
    if (gameOver || isPaused || !gameStarted) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = newSnake[0];
      let newHead;

      switch (direction) {
        case 'UP': newHead = [head[0] - 1, head[1]]; break;
        case 'DOWN': newHead = [head[0] + 1, head[1]]; break;
        case 'LEFT': newHead = [head[0], head[1] - 1]; break;
        case 'RIGHT': newHead = [head[0], head[1] + 1]; break;
        default: return prevSnake;
      }

      // برخورد با دیوار
      if (
        newHead[0] < 0 || newHead[0] >= BOARD_SIZE ||
        newHead[1] < 0 || newHead[1] >= BOARD_SIZE
      ) {
        setGameOver(true);
        spawnParticles(head[0], head[1], '#ff6b6b', 20);
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        return prevSnake;
      }

      const snakeWithoutTail = newSnake.slice(0, -1);
      if (snakeWithoutTail.some(segment => 
        segment[0] === newHead[0] && segment[1] === newHead[1]
      )) {
        setGameOver(true);
        spawnParticles(head[0], head[1], '#ff6b6b', 20);
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        return prevSnake;
      }

      let newSnakeMoved = [newHead, ...snakeWithoutTail];
      let ateFood = false;

      // غذای معمولی
      if (food && newHead[0] === food[0] && newHead[1] === food[1]) {
        ateFood = true;
        setFoodEaten(prev => prev + 1);
        setCombo(prev => prev + 1);
        
        const points = 10 + combo * 2;
        setScore(prev => prev + points);
        spawnParticles(food[0], food[1], '#4ecdc4', 15);

        const newFood = generateFood(newSnakeMoved);
        if (newFood) {
          setFood(newFood);
          generateSpecialFood(newSnakeMoved);
        } else {
          setGameOver(true);
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          return newSnakeMoved;
        }

        if (foodEaten > 0 && foodEaten % 5 === 0) {
          setLevel(prev => prev + 1);
          setSpeed(prev => Math.max(60, prev - 10));
          setShowLevelUp(true);
          setTimeout(() => setShowLevelUp(false), 2000);
        }
      }

      // غذای ویژه
      if (specialFood && newHead[0] === specialFood[0] && newHead[1] === specialFood[1]) {
        ateFood = true;
        setScore(prev => prev + 50);
        spawnParticles(specialFood[0], specialFood[1], '#ffd93d', 25);
        setSpecialFood(null);
        setSpecialFoodTimer(null);
      }

      if (ateFood) {
        return [newHead, ...newSnake];
      }

      return newSnakeMoved;
    });
  }, [direction, food, gameOver, isPaused, gameStarted, generateFood, specialFood, combo, foodEaten, spawnParticles]);

  // ===== useEffect ها =====
  useEffect(() => {
    if (gameOver || !gameStarted || isPaused) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

    gameLoopRef.current = setInterval(moveSnake, speed);
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, [moveSnake, gameOver, gameStarted, isPaused, speed]);

  useEffect(() => {
    if (isPaused || gameOver || !gameStarted) {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    } else if (gameStarted && !gameOver && !isPaused) {
      if (!timerIntervalRef.current) {
        timerIntervalRef.current = setInterval(() => {
          setTimer(prev => prev + 1);
        }, 1000);
      }
    }
    
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [isPaused, gameOver, gameStarted]);

  useEffect(() => {
    if (!specialFoodTimer) return;
    const checkTimer = setInterval(() => {
      if (specialFood && Date.now() > specialFoodTimer) {
        setSpecialFood(null);
        setSpecialFoodTimer(null);
      }
    }, 100);
    return () => clearInterval(checkTimer);
  }, [specialFood, specialFoodTimer]);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
            vy: p.vy + 0.05,
          }))
          .filter(p => p.life > 0)
      );
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    };

    animateParticles();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!food && !gameStarted && !gameOver) {
      const newFood = generateFood(INITIAL_SNAKE);
      setFood(newFood);
    }
  }, [food, gameStarted, gameOver, generateFood]);

  // ===== کنترل‌های کیبورد =====
  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      
      if (key === ' ' || key === 'Space') {
        e.preventDefault();
        if (!gameStarted && !gameOver) {
          startGame();
        } else if (!gameOver) {
          setIsPaused(prev => !prev);
        }
        return;
      }

      if (key === 'r' || key === 'R') {
        resetGame();
        return;
      }

      if (!gameStarted || gameOver || isPaused) return;

      const oppositeDirections = {
        'UP': 'DOWN',
        'DOWN': 'UP',
        'LEFT': 'RIGHT',
        'RIGHT': 'LEFT'
      };

      let newDirection = null;
      switch (key) {
        case 'ArrowUp': newDirection = 'UP'; break;
        case 'ArrowDown': newDirection = 'DOWN'; break;
        case 'ArrowLeft': newDirection = 'RIGHT'; break;
        case 'ArrowRight': newDirection = 'LEFT'; break;
        default: return;
      }

      e.preventDefault();
      if (newDirection && oppositeDirections[newDirection] !== direction) {
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted, gameOver, isPaused, resetGame, startGame]);

  // ===== کنترل‌های لمسی =====
  const [touchStart, setTouchStart] = useState(null);
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
      if (!gameStarted && !gameOver) {
        startGame();
      } else if (!gameOver) {
        setIsPaused(prev => !prev);
      }
      return;
    }

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && direction !== 'LEFT') setDirection('RIGHT');
      else if (dx < 0 && direction !== 'RIGHT') setDirection('LEFT');
    } else {
      if (dy > 0 && direction !== 'UP') setDirection('DOWN');
      else if (dy < 0 && direction !== 'DOWN') setDirection('UP');
    }
    setTouchStart(null);
  };

  // ===== رندر تخته =====
  const renderBoard = () => {
    const cells = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const isSnake = snake.some(segment => segment[0] === row && segment[1] === col);
        const isFood = food && food[0] === row && food[1] === col;
        const isSpecial = specialFood && specialFood[0] === row && specialFood[1] === col;
        const isHead = snake[0] && snake[0][0] === row && snake[0][1] === col;

        let className = 'cell';
        if (isSnake) className += ' snake';
        if (isHead) className += ' head';
        if (isFood) className += ' food';
        if (isSpecial) className += ' special-food';

        const style = {};
        if (isSnake && !isHead) {
          const index = snake.findIndex(seg => seg[0] === row && seg[1] === col);
          const gradient = `hsl(${170 + index * 5}, 70%, ${45 + index * 1.5}%)`;
          style.background = gradient;
        }

        cells.push(
          <div 
            key={`${row}-${col}`} 
            className={className} 
            style={style}
            role="gridcell"
          />
        );
      }
    }
    return cells;
  };

  // ===== اشتراک‌گذاری =====
  const shareScore = () => {
    const timeStr = formatTime(timer);
    const text = `🐍 من در بازی مار استاد به امتیاز ${score} در سطح ${level} و زمان ${timeStr} رسیدم!\nآیا میتونی رکورد من رو بزنی؟\nمشاوراملاکی`;
    const url = typeof window !== 'undefined' ? window.location.href : '';
    
    if (navigator.share) {
      navigator.share({
        title: 'بازی مار استاد - مشاوراملاکی',
        text: text,
        url: url,
      }).catch(() => {});
    } else {
      // کپی در کلیپ‌بورد
      navigator.clipboard.writeText(text + '\n' + url);
      alert('✅ متن اشتراک‌گذاری کپی شد!');
    }
  };

  // ============================================================
  // ===== رندر =====
  // ============================================================
  return (
    <>
      <MetaTags />

      {/* مودال لاگین - از کامپوننت شما استفاده می‌کنه */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={(userData) => {
            console.log('✅ کاربر با موفقیت وارد شد:', userData);
            setUser(userData);
            setIsLoggedIn(true);
            loadUserRank(userData.id);
            loadLeaderboard();
          }}
          triggerSource="snake_game"
          redirectTo="/games/snake-game"
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
              <button 
                className="login-btn" 
                onClick={() => setShowLoginModal(true)}
              >
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

        {/* ===== پس‌زمینه ===== */}
        <div className="bg-particles" aria-hidden="true" />
        <div className="bg-grid" aria-hidden="true" />

        {/* ===== کانتینر بازی ===== */}
        <div className="game-container">
          <div className="header">
            <div className="header-left">
              <h1>
                <span className="snake-icon" aria-hidden="true">🐍</span>
                مار استاد
              </h1>
              <div className="level-badge" role="status">
                <span aria-hidden="true">🏆</span>
                <span>سطح {level}</span>
              </div>
            </div>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">امتیاز</span>
                <span className="stat-value">{score}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">بهترین</span>
                <span className="stat-value high-score">{highScore}</span>
              </div>
            </div>
          </div>

          <div className="timer-container">
            <div className="timer-display">
              <span className="timer-icon">⏱️</span>
              <span className="timer-value">{formatTime(timer)}</span>
              {bestTime > 0 && (
                <span className="best-time">🏅 {formatTime(bestTime)}</span>
              )}
            </div>
          </div>

          <div className="board-wrapper">
            <div 
              className="board"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
                gap: '2px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '12px',
                borderRadius: '16px',
                position: 'relative',
              }}
            >
              {renderBoard()}

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
                  }}
                />
              ))}

              {showLevelUp && (
                <div className="level-up-overlay">
                  <div className="level-up-text">⭐ سطح {level}!</div>
                </div>
              )}

              {gameOver && (
                <div className="game-over-overlay">
                  <div className="game-over-content">
                    <div className="game-over-icon">💀</div>
                    <h2>بازی تمام شد!</h2>
                    <div className="final-score">
                      امتیاز: <span>{score}</span>
                    </div>
                    <div className="final-stats">
                      <div>سطح: {level}</div>
                      <div>غذا: {foodEaten}</div>
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

              {isPaused && !gameOver && gameStarted && (
                <div className="pause-overlay">
                  <div className="pause-icon">⏸️</div>
                  <div className="pause-text">مکث</div>
                </div>
              )}

              {!gameStarted && !gameOver && (
                <div className="start-overlay">
                  <div className="start-content">
                    <div className="start-icon">🐍</div>
                    <h2>مار استاد</h2>
                    <p>برای شروع دکمه <strong>Space</strong> یا کلیک کن</p>
                    <button className="start-btn" onClick={startGame}>
                      شروع بازی
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="controls">
            <button 
              className="control-btn primary"
              onClick={() => {
                if (!gameStarted && !gameOver) {
                  startGame();
                } else if (!gameOver) {
                  setIsPaused(prev => !prev);
                }
              }}
            >
              {!gameStarted ? '▶ شروع' : isPaused ? '▶ ادامه' : '⏸ مکث'}
            </button>
            <button className="control-btn secondary" onClick={resetGame}>
              🔄 بازی جدید
            </button>
          </div>

          <div className="mobile-controls">
            <div className="dpad">
              <button className="dpad-btn up" onClick={() => direction !== 'DOWN' && setDirection('UP')}>▲</button>
              <button className="dpad-btn down" onClick={() => direction !== 'UP' && setDirection('DOWN')}>▼</button>
              <button className="dpad-btn left" onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}>◄</button>
              <button className="dpad-btn right" onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}>►</button>
            </div>
          </div>

          <div className="info">
            <div className="combo-display">
              {combo > 1 && <span className="combo-text">🔥 کامبو x{combo}</span>}
            </div>
            <div className="instructions">
              <span>↑ ↓ ← →</span>
              <span className="sep">|</span>
              <span>␣ مکث</span>
              <span className="sep">|</span>
              <span>R ریستارت</span>
            </div>
          </div>
        </div>

        {/* ===== محتوای سئو ===== */}
        <div className="seo-content">
          <h2>درباره بازی مار استاد</h2>
          <p>
            بازی مار استاد یک بازی کلاسیک و سرگرم‌کننده است که در سایت مشاوراملاکی طراحی شده تا 
            لحظات خوشی را برای شما به ارمغان بیاورد.
          </p>
          
          <h3>ویژگی‌های بازی مار</h3>
          <ul>
            <li>گرافیک زیبا و مدرن با افکت‌های ویژه</li>
            <li>سیستم امتیازدهی پویا با ترکیب (کامبو)</li>
            <li>غذاهای ویژه با امتیاز بیشتر</li>
            <li>سطح‌بندی پیشرفته با افزایش سرعت</li>
            <li>قابل بازی در موبایل و دسکتاپ</li>
            <li>سیستم رتبه‌بندی و مسابقات</li>
          </ul>

          <h3>چطور بازی کنیم؟</h3>
          <ol>
            <li>با کلیدهای جهت‌نما (↑ ↓ ← →) مار را حرکت دهید</li>
            <li>برای شروع بازی کلید Space را بزنید</li>
            <li>غذاهای قرمز رنگ را بخورید تا امتیاز بگیرید</li>
            <li>غذاهای طلایی ویژه امتیاز بیشتری دارند</li>
          </ol>
          
          <div className="seo-tags">
            <span className="tag">#بازی_مار</span>
            <span className="tag">#مار_استاد</span>
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
          position: relative;
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

        /* ===== بقیه استایل‌ها ===== */
        .bg-particles {
          position: fixed;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0));
          background-size: 200px 200px;
          opacity: 0.3;
          pointer-events: none;
        }

        .bg-grid {
          position: fixed;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

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
          margin-bottom: 10px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header h1 {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
          background: linear-gradient(135deg, #4ecdc4, #44d4b4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .snake-icon {
          -webkit-text-fill-color: initial;
        }

        .level-badge {
          background: rgba(78, 205, 196, 0.15);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          color: #4ecdc4;
          display: flex;
          align-items: center;
          gap: 4px;
          border: 1px solid rgba(78, 205, 196, 0.2);
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

        .stat-value.high-score {
          color: #ffd93d;
        }

        .timer-container {
          display: flex;
          justify-content: center;
          margin-bottom: 15px;
        }

        .timer-display {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(0,0,0,0.3);
          padding: 8px 20px;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .timer-icon {
          font-size: 18px;
        }

        .timer-value {
          font-size: 20px;
          font-weight: 700;
          color: #4ecdc4;
          font-family: 'Courier New', monospace;
          min-width: 60px;
          text-align: center;
        }

        .best-time {
          font-size: 14px;
          color: #ffd93d;
          padding-right: 12px;
          border-right: 1px solid rgba(255,255,255,0.1);
        }

        .board-wrapper {
          position: relative;
        }

        .board {
          width: 100%;
          aspect-ratio: 1;
          margin: 0 auto;
          position: relative;
          background: rgba(0,0,0,0.3);
          border-radius: 16px;
        }

        .cell {
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cell.snake {
          background: linear-gradient(135deg, #4ecdc4, #44b39d);
          border-radius: 6px;
          box-shadow: 0 0 20px rgba(78, 205, 196, 0.3);
        }

        .cell.head {
          background: linear-gradient(135deg, #5fd9d0, #4ecdc4) !important;
          border-radius: 8px;
          box-shadow: 0 0 30px rgba(78, 205, 196, 0.6);
          transform: scale(0.9);
        }

        .cell.food {
          background: radial-gradient(circle, #ff6b6b, #ee5a24);
          border-radius: 50%;
          box-shadow: 0 0 30px rgba(255, 107, 107, 0.6);
          animation: foodPulse 0.6s ease-in-out infinite alternate;
        }

        .cell.special-food {
          background: radial-gradient(circle, #ffd93d, #f6b93b);
          border-radius: 50%;
          box-shadow: 0 0 40px rgba(255, 217, 61, 0.8);
          animation: specialPulse 0.3s ease-in-out infinite alternate;
        }

        @keyframes foodPulse {
          from { transform: scale(0.8); }
          to { transform: scale(1.1); }
        }

        @keyframes specialPulse {
          from { transform: scale(0.7) rotate(0deg); }
          to { transform: scale(1.2) rotate(180deg); }
        }

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

        .mobile-controls {
          display: none;
          margin-top: 15px;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .mobile-controls {
            display: flex;
          }
        }

        .dpad {
          display: grid;
          grid-template-columns: 60px 60px 60px;
          grid-template-rows: 60px 60px 60px;
          gap: 4px;
        }

        .dpad-btn {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          color: white;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        .dpad-btn:active {
          background: rgba(78, 205, 196, 0.3);
          transform: scale(0.95);
        }

        .dpad-btn.up { grid-column: 2; grid-row: 1; }
        .dpad-btn.down { grid-column: 2; grid-row: 3; }
        .dpad-btn.left { grid-column: 1; grid-row: 2; }
        .dpad-btn.right { grid-column: 3; grid-row: 2; }

        .info {
          margin-top: 15px;
          text-align: center;
        }

        .combo-display {
          min-height: 24px;
          margin-bottom: 8px;
        }

        .combo-text {
          color: #ffd93d;
          font-weight: 700;
          font-size: 18px;
          animation: comboPop 0.3s ease;
        }

        @keyframes comboPop {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
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

        .game-over-overlay,
        .pause-overlay,
        .start-overlay,
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

        .game-over-content,
        .start-content {
          text-align: center;
          padding: 30px;
          animation: fadeInUp 0.5s ease;
        }

        .game-over-icon {
          font-size: 64px;
          margin-bottom: 10px;
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
          gap: 30px;
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

        .play-again-btn,
        .start-btn {
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

        .play-again-btn:hover,
        .start-btn:hover {
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

        .pause-icon,
        .start-icon {
          font-size: 56px;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .pause-text {
          color: #fff;
          font-size: 24px;
          font-weight: 700;
          margin-top: 10px;
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

        .level-up-text {
          font-size: 48px;
          font-weight: 700;
          color: #ffd93d;
          text-shadow: 0 0 40px rgba(255, 217, 61, 0.5);
          animation: levelUpPop 0.5s ease;
        }

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

        .particle {
          position: absolute;
          pointer-events: none;
          border-radius: 50%;
          will-change: transform, opacity;
        }

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
          color: #4ecdc4;
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

          .timer-value {
            font-size: 16px;
            min-width: 50px;
          }

          .best-time {
            font-size: 12px;
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

          .final-stats {
            gap: 15px;
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
        }
      `}</style>
    </>
  );
};

export default SnakeGame;