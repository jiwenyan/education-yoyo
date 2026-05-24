import { useRef, useEffect, useCallback } from 'react';
import styles from './TracingCanvas.module.css';

export default function TracingCanvas({ onDrawEnd, disabled }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const hasDrawn = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getPos = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  const startDrawing = useCallback(
    (e) => {
      if (disabled) return;
      e.preventDefault();
      isDrawing.current = true;
      hasDrawn.current = true;
      const pos = getPos(e);
      const ctx = canvasRef.current.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    },
    [disabled, getPos]
  );

  const draw = useCallback(
    (e) => {
      if (!isDrawing.current || disabled) return;
      e.preventDefault();
      const pos = getPos(e);
      const ctx = canvasRef.current.getContext('2d');
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    },
    [disabled, getPos]
  );

  const endDrawing = useCallback(
    (e) => {
      if (!isDrawing.current) return;
      e.preventDefault();
      isDrawing.current = false;
      if (hasDrawn.current && onDrawEnd) {
        onDrawEnd();
      }
    },
    [onDrawEnd]
  );

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawn.current = false;
  }, []);

  return (
    <div className={styles.wrapper}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={280}
        height={280}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
        data-testid="tracing-canvas"
      />
      <button className={styles.clearBtn} onClick={clear} type="button">
        Clear
      </button>
    </div>
  );
}
