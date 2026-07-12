import React, { useState, useEffect, useCallback } from 'react';
import './Arrows.css'; // نام فایل CSS جدید

const Arrows = () => {
  // --- حالت‌های بازی ---
  const [gridSize, setGridSize] = useState(5);
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [exitPos, setExitPos] = useState({ row: 4, col: 4 });
  const [arrows, setArrows] = useState([]);
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // --- تولید مرحله ---
  const generateLevel = useCallback((levelNum) => {
    // افزایش سایز صفحه با هر مرحله
    const newSize = Math.min(5 + Math.floor((levelNum - 1) / 2), 8);
    setGridSize(newSize);

    // موقعیت شروع (گوشه بالا چپ)
    const startRow = 0;
    const startCol = 0;
    // موقعیت خروجی (گوشه پایین راست)
    const exitRow = newSize - 1;
    const exitCol = newSize - 1;
    setExitPos({ row: exitRow, col: exitCol });
    setPlayerPos({ row: startRow, col: startCol });

    // تولید فلش‌های تصادفی (به جز روی نقطه شروع و خروجی)
    const newArrows = [];
    const directions = ['up', 'down', 'left', 'right'];
    // تعداد فلش‌ها با سطح افزایش می‌یابد
    const arrowCount = Math.min(3 + levelNum, 10);

    for (let i = 0; i < arrowCount; i++) {
      let row, col, attempts = 0;
      let isOverlap = true;
      while (isOverlap && attempts < 50) {
        row = Math.floor(Math.random() * newSize);
        col = Math.floor(Math.random() * newSize);
        isOverlap = (row === startRow && col === startCol) ||
                    (row === exitRow && col === exitCol) ||
                    newArrows.some(a => a.row === row && a.col === col);
        attempts++;
      }
      if (!isOverlap) {
        const direction = directions[Math.floor(Math.random() * directions.length)];
        newArrows.push({ id: i, row, col, direction });
      }
    }

    // اطمینان از وجود یک مسیر اولیه (با قرار دادن فلش‌های اجباری)
    // این بخش ساده‌ترین مسیر ممکن را ایجاد می‌کند
    let currentRow = startRow, currentCol = startCol;
    while (currentRow < exitRow || currentCol < exitCol) {
      if (currentRow < exitRow && Math.random() > 0.4) {
        const nextRow = currentRow + 1;
        if (!newArrows.some(a => a.row === nextRow && a.col === currentCol) &&
            !(nextRow === startRow && currentCol === startCol) &&
            !(nextRow === exitRow && currentCol === exitCol)) {
          newArrows.push({ id: newArrows.length, row: nextRow, col: currentCol, direction: 'down' });
        }
        currentRow++;
      } else if (currentCol < exitCol) {
        const nextCol = currentCol + 1;
        if (!newArrows.some(a => a.row === currentRow && a.col === nextCol) &&
            !(currentRow === startRow && nextCol === startCol) &&
            !(currentRow === exitRow && nextCol === exitCol)) {
          newArrows.push({ id: newArrows.length, row: currentRow, col: nextCol, direction: 'right' });
        }
        currentCol++;
      }
    }

    setArrows(newArrows);
    setMoves(0);
    setGameWon(false);
  }, []);

  // --- شروع یا تغییر مرحله ---
  useEffect(() => {
    if (gameStarted) {
      generateLevel(level);
    }
  }, [level, gameStarted, generateLevel]);

  // --- حرکت بازیکن ---
  const movePlayer = (direction) => {
    if (gameWon) return;

    let newRow = playerPos.row;
    let newCol = playerPos.col;

    switch (direction) {
      case 'up': newRow = Math.max(0, newRow - 1); break;
      case 'down': newRow = Math.min(gridSize - 1, newRow + 1); break;
      case 'left': newCol = Math.max(0, newCol - 1); break;
      case 'right': newCol = Math.min(gridSize - 1, newCol + 1); break;
      default: return;
    }

    // بررسی برخورد با فلش در مقصد
    const targetArrowIndex = arrows.findIndex(a => a.row === newRow && a.col === newCol);
    if (targetArrowIndex !== -1) {
      const arrow = arrows[targetArrowIndex];
      // حرکت در جهت فلش
      let pushedRow = newRow, pushedCol = newCol;
      switch (arrow.direction) {
        case 'up': pushedRow = Math.max(0, pushedRow - 1); break;
        case 'down': pushedRow = Math.min(gridSize - 1, pushedRow + 1); break;
        case 'left': pushedCol = Math.max(0, pushedCol - 1); break;
        case 'right': pushedCol = Math.min(gridSize - 1, pushedCol + 1); break;
        default: return;
      }
      // فلش را حذف می‌کنیم (استفاده شده)
      setArrows(prevArrows => prevArrows.filter((_, index) => index !== targetArrowIndex));
      setPlayerPos({ row: pushedRow, col: pushedCol });
    } else {
      // حرکت عادی
      setPlayerPos({ row: newRow, col: newCol });
    }
    setMoves(prev => prev + 1);
  };

  // --- بررسی برخورد با خروجی ---
  useEffect(() => {
    if (playerPos.row === exitPos.row && playerPos.col === exitPos.col && gameStarted) {
      setGameWon(true);
    }
  }, [playerPos, exitPos, gameStarted]);

  // --- چرخش فلش (با کلیک) ---
  const rotateArrow = (id) => {
    setArrows(prevArrows =>
      prevArrows.map(arrow =>
        arrow.id === id
          ? {
              ...arrow,
              direction: {
                up: 'right',
                right: 'down',
                down: 'left',
                left: 'up'
              }[arrow.direction]
            }
          : arrow
      )
    );
  };

  // --- شروع بازی ---
  const startGame = () => {
    setLevel(1);
    setGameStarted(true);
    setMoves(0);
    setGameWon(false);
  };

  // --- مرحله بعد ---
  const nextLevel = () => {
    setLevel(prev => prev + 1);
    setGameWon(false);
  };

  // --- ریست کامل ---
  const resetGame = () => {
    setGameStarted(false);
    setLevel(1);
    setMoves(0);
    setGameWon(false);
  };

  // --- رندر صفحه منو ---
  if (!gameStarted) {
    return (
      <div className="apg-game-container">
        <div className="apg-menu">
          <h1 className="apg-title">🎯 Arrows</h1>
          <h2 className="apg-subtitle">Puzzle Escape</h2>
          <p className="apg-description">
            با چرخاندن فلش‌ها (کلیک روی آن‌ها) مسیر را به سمت خروجی باز کنید.
          </p>
          <p className="apg-description">
            بازیکن (⚫) را با دکمه‌های پایین حرکت دهید.
          </p>
          <button className="apg-menu-btn" onClick={startGame}>
            شروع بازی
          </button>
          <div className="apg-controls-info">
            <span>⬆️</span><span>⬇️</span><span>⬅️</span><span>➡️</span>
          </div>
        </div>
      </div>
    );
  }

  // --- رندر صفحه بازی ---
  return (
    <div className="apg-game-container">
      <div className="apg-game-area">
        {/* هدر */}
        <div className="apg-header">
          <div className="apg-stats">
            <span>🏆 مرحله: {level}</span>
            <span>👣 حرکت: {moves}</span>
          </div>
          <button className="apg-reset-btn" onClick={resetGame}>
            🔄 خروج
          </button>
        </div>

        {/* گرید بازی */}
        <div className="apg-grid-container">
          <div
            className="apg-grid"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize}, 1fr)`
            }}
          >
            {Array.from({ length: gridSize }).map((_, rowIndex) =>
              Array.from({ length: gridSize }).map((_, colIndex) => {
                const isPlayer = playerPos.row === rowIndex && playerPos.col === colIndex;
                const isExit = exitPos.row === rowIndex && exitPos.col === colIndex;
                const arrow = arrows.find(a => a.row === rowIndex && a.col === colIndex);

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`apg-cell ${isExit ? 'apg-exit' : ''}`}
                  >
                    {isPlayer && <div className="apg-player">⚫</div>}
                    {isExit && <div className="apg-exit-icon">🚪</div>}
                    {arrow && !isPlayer && (
                      <div
                        className={`apg-arrow-icon apg-arrow-${arrow.direction}`}
                        onClick={() => rotateArrow(arrow.id)}
                      >
                        {arrow.direction === 'up' && '⬆️'}
                        {arrow.direction === 'down' && '⬇️'}
                        {arrow.direction === 'left' && '⬅️'}
                        {arrow.direction === 'right' && '➡️'}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* کنترل‌ها */}
        <div className="apg-controls">
          <button className="apg-control-btn" onClick={() => movePlayer('up')}>⬆️</button>
          <div className="apg-control-row">
            <button className="apg-control-btn" onClick={() => movePlayer('left')}>⬅️</button>
            <button className="apg-control-btn" onClick={() => movePlayer('down')}>⬇️</button>
            <button className="apg-control-btn" onClick={() => movePlayer('right')}>➡️</button>
          </div>
        </div>

        {/* پیام برنده شدن */}
        {gameWon && (
          <div className="apg-win-overlay">
            <div className="apg-win-modal">
              <h2>🎉 تبریک!</h2>
              <p>مرحله {level} رو با {moves} حرکت تموم کردی!</p>
              <button className="apg-next-btn" onClick={nextLevel}>
                مرحله بعد ➜
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Arrows;