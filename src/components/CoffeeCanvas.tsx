import React, { useRef, useEffect } from 'react';

interface CoffeeCanvasProps {
  progress: number; // 0 to 1 inside coffee journey
}

export const CoffeeCanvas: React.FC<CoffeeCanvasProps> = ({ progress }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Responsive high-DPI scaling
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle seed generator for dust motes and steam
    const dustMotes = Array.from({ length: 35 }, (_, i) => ({
      x: (Math.sin(i * 1.5) * 0.5 + 0.5),
      y: (Math.cos(i * 2.3) * 0.5 + 0.5),
      size: 1 + (i % 3) * 0.8,
      speed: 0.0003 + (i % 5) * 0.0002,
      opacity: 0.2 + (i % 4) * 0.15,
    }));

    // Coffee beans layout definition (normalized 0 to 1 coordinates)
    const beansData = Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * Math.PI * 2;
      const radius = 0.18 + (i % 4) * 0.04;
      return {
        targetX: 0.5 + Math.cos(angle) * radius,
        targetY: 0.48 + Math.sin(angle) * (radius * 0.6),
        startX: 0.5 + (Math.sin(i * 3) * 0.8),
        startY: -0.2 - (i * 0.05),
        rot: (i * 45 * Math.PI) / 180,
        scale: 0.85 + (i % 3) * 0.15,
      };
    });

    const render = () => {
      time += 0.016; // approx 60fps time step
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const p = Math.min(Math.max(progress, 0), 1);

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // --- 1. WOODEN TABLETOP BACKGROUND ---
      const tableGrad = ctx.createLinearGradient(0, 0, width, height);
      tableGrad.addColorStop(0, '#120D0A');
      tableGrad.addColorStop(0.5, '#1C120C');
      tableGrad.addColorStop(1, '#120D0A');
      ctx.fillStyle = tableGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle rustic wood grain lines
      ctx.strokeStyle = 'rgba(58, 33, 21, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < height; i += 18) {
        ctx.beginPath();
        ctx.moveTo(0, i + Math.sin(i * 0.05) * 4);
        ctx.bezierCurveTo(
          width * 0.3, i + Math.cos(i * 0.02) * 8,
          width * 0.7, i + Math.sin(i * 0.03) * 6,
          width, i + Math.cos(i * 0.05) * 4
        );
        ctx.stroke();
      }

      // --- 2. SUNBEAM LIGHT OVERLAY ---
      // Light beam intensity increases with scroll
      const lightIntensity = 0.15 + p * 0.25;
      const sunbeamX = width * (0.85 - p * 0.2);
      const sunbeamY = height * 0.1;
      const sunbeamGrad = ctx.createRadialGradient(
        sunbeamX, sunbeamY, 20,
        sunbeamX, sunbeamY, Math.max(width, height) * 0.85
      );
      sunbeamGrad.addColorStop(0, `rgba(244, 235, 221, ${lightIntensity})`);
      sunbeamGrad.addColorStop(0.4, `rgba(198, 106, 50, ${lightIntensity * 0.4})`);
      sunbeamGrad.addColorStop(1, 'rgba(18, 13, 10, 0)');

      ctx.fillStyle = sunbeamGrad;
      ctx.fillRect(0, 0, width, height);

      // --- 3. DUST MOTES FLOATING IN SUNLIGHT ---
      dustMotes.forEach((mote) => {
        mote.y -= mote.speed;
        if (mote.y < 0) mote.y = 1;
        const mx = mote.x * width + Math.sin(time + mote.y * 10) * 15;
        const my = mote.y * height;

        ctx.fillStyle = `rgba(232, 216, 189, ${mote.opacity * (0.5 + Math.sin(time * 2) * 0.3)})`;
        ctx.beginPath();
        ctx.arc(mx, my, mote.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- 4. SCENE VISUALS BASED ON SCROLL PROGRESS (p) ---

      // SCENE 01: THE ARRIVAL (p: 0.00 -> 0.12)
      if (p < 0.12) {
        const s1Opacity = Math.max(0, 1 - p / 0.10);
        if (s1Opacity > 0.01) {
          ctx.save();
          ctx.globalAlpha = s1Opacity * 0.7;
          const cx = width * 0.5;
          const cy = height * 0.68;

          // Soft ambient table glow
          const glowGrad = ctx.createRadialGradient(cx, cy + 20, 10, cx, cy + 20, 120);
          glowGrad.addColorStop(0, 'rgba(198, 106, 50, 0.25)');
          glowGrad.addColorStop(1, 'rgba(18, 13, 10, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.ellipse(cx, cy + 20, 110, 30, 0, 0, Math.PI * 2);
          ctx.fill();

          // Cup Silhouette
          ctx.strokeStyle = 'rgba(232, 216, 189, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(cx, cy, 35, 22, 0, 0, Math.PI * 2);
          ctx.stroke();

          // Soft Steam Lines
          for (let s = 0; s < 3; s++) {
            const st = (time * 0.7 + s * 0.8) % 2.5;
            const sy = cy - 25 - st * 35;
            const sx = cx + Math.sin(st * 2 + s) * 12;
            const steamAlpha = Math.sin((st / 2.5) * Math.PI) * 0.3;

            ctx.strokeStyle = `rgba(244, 235, 221, ${steamAlpha})`;
            ctx.lineWidth = 2 - st * 0.5;
            ctx.beginPath();
            ctx.moveTo(cx + (s - 1) * 10, cy - 22);
            ctx.quadraticCurveTo(sx + 5, sy + 15, sx, sy);
            ctx.stroke();
          }

          ctx.restore();
        }
      }

      // SCENE 02: THE BEANS (p: 0.10 -> 0.28)
      if (p > 0.05 && p < 0.38) {
        const beanFactor = Math.min(Math.max((p - 0.08) / 0.15, 0), 1);
        const exitFactor = p > 0.28 ? Math.min((p - 0.28) / 0.08, 1) : 0;

        beansData.forEach((b) => {
          // Interpolate bean coordinates
          const bx = (b.startX + (b.targetX - b.startX) * beanFactor - exitFactor * 0.3) * width;
          const by = (b.startY + (b.targetY - b.startY) * beanFactor + exitFactor * 0.4) * height;
          const bOpacity = (1 - exitFactor) * Math.min(beanFactor * 2, 1);

          if (bOpacity > 0.01) {
            ctx.save();
            ctx.translate(bx, by);
            ctx.rotate(b.rot + (1 - beanFactor) * 1.5);
            ctx.scale(b.scale, b.scale);

            // Shadow
            ctx.fillStyle = 'rgba(0,0,0,0.45)';
            ctx.beginPath();
            ctx.ellipse(4, 6, 14, 8, 0, 0, Math.PI * 2);
            ctx.fill();

            // Roasted Coffee Bean Body
            const beanGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, 16);
            beanGrad.addColorStop(0, '#8C5A35');
            beanGrad.addColorStop(0.5, '#3A2115');
            beanGrad.addColorStop(1, '#1A0E08');
            ctx.fillStyle = beanGrad;
            ctx.beginPath();
            ctx.ellipse(0, 0, 14, 9, 0, 0, Math.PI * 2);
            ctx.fill();

            // Center crease
            ctx.strokeStyle = '#120D0A';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(-10, 0);
            ctx.quadraticCurveTo(0, 3, 10, 0);
            ctx.stroke();

            // Specular sheen
            ctx.strokeStyle = 'rgba(232, 216, 189, 0.25)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(-4, -3, 6, Math.PI * 0.8, Math.PI * 1.4);
            ctx.stroke();

            ctx.restore();
          }
        });
      }

      // SCENE 03: THE GRIND (p: 0.25 -> 0.45)
      if (p > 0.22 && p < 0.48) {
        const gEnter = Math.min(Math.max((p - 0.24) / 0.08, 0), 1);
        const gExit = p > 0.40 ? Math.min((p - 0.40) / 0.06, 1) : 0;
        const gOpacity = gEnter * (1 - gExit);

        if (gOpacity > 0.01) {
          ctx.save();
          ctx.globalAlpha = gOpacity;
          const gx = width * 0.5;
          const gy = height * 0.45;

          // Grinder Silhouette & Metallic Body
          ctx.fillStyle = '#21140E';
          ctx.beginPath();
          ctx.roundRect(gx - 45, gy - 70, 90, 140, 8);
          ctx.fill();

          // Brass trim accents
          ctx.strokeStyle = '#C66A32';
          ctx.lineWidth = 3;
          ctx.strokeRect(gx - 45, gy - 70, 90, 140);

          // Hopper Funnel Top
          ctx.fillStyle = '#3A2115';
          ctx.beginPath();
          ctx.moveTo(gx - 65, gy - 110);
          ctx.lineTo(gx + 65, gy - 110);
          ctx.lineTo(gx + 30, gy - 70);
          ctx.lineTo(gx - 30, gy - 70);
          ctx.closePath();
          ctx.fill();

          // Rotating Crank Handle
          const crankAngle = time * 4;
          const crankX = gx + Math.cos(crankAngle) * 50;
          const crankY = gy - 120 + Math.sin(crankAngle) * 15;

          ctx.strokeStyle = '#8C5A35';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(gx, gy - 110);
          ctx.lineTo(crankX, crankY);
          ctx.stroke();

          // Wooden knob on handle
          ctx.fillStyle = '#E8D8BD';
          ctx.beginPath();
          ctx.arc(crankX, crankY, 8, 0, Math.PI * 2);
          ctx.fill();

          // Falling Ground Coffee Particles
          if (p > 0.28) {
            for (let i = 0; i < 20; i++) {
              const particleY = gy + 70 + ((time * 120 + i * 15) % 80);
              const particleX = gx + (Math.sin(i * 1.7) * 20);
              ctx.fillStyle = '#21140E';
              ctx.beginPath();
              ctx.arc(particleX, particleY, 2 + (i % 2), 0, Math.PI * 2);
              ctx.fill();
            }
          }

          ctx.restore();
        }
      }

      // SCENE 04 & 05: THE BLOOM & THE POUR (p: 0.40 -> 0.72)
      if (p > 0.38 && p < 0.75) {
        const bEnter = Math.min(Math.max((p - 0.38) / 0.08, 0), 1);
        const bExit = p > 0.70 ? Math.min((p - 0.70) / 0.05, 1) : 0;
        const bOpacity = bEnter * (1 - bExit);

        if (bOpacity > 0.01) {
          ctx.save();
          ctx.globalAlpha = bOpacity;

          const dx = width * 0.5;
          const dy = height * 0.42;

          // V60 Glass Dripper Cone
          ctx.fillStyle = 'rgba(232, 216, 189, 0.08)';
          ctx.strokeStyle = 'rgba(232, 216, 189, 0.3)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(dx - 90, dy - 60);
          ctx.lineTo(dx + 90, dy - 60);
          ctx.lineTo(dx + 22, dy + 50);
          ctx.lineTo(dx - 22, dy + 50);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Paper Filter inside
          ctx.fillStyle = '#F4EBDD';
          ctx.beginPath();
          ctx.moveTo(dx - 82, dy - 55);
          ctx.lineTo(dx + 82, dy - 55);
          ctx.lineTo(dx + 18, dy + 45);
          ctx.lineTo(dx - 18, dy + 45);
          ctx.closePath();
          ctx.fill();

          // Blooming Coffee Bed
          const bloomFactor = Math.min(Math.max((p - 0.42) / 0.12, 0), 1);
          const bedHeight = 25 + bloomFactor * 12;

          ctx.fillStyle = '#21140E';
          ctx.beginPath();
          ctx.ellipse(dx, dy - 20, 65 + bloomFactor * 5, bedHeight, 0, 0, Math.PI * 2);
          ctx.fill();

          // Bloom Crust & Foam Bubbles
          if (bloomFactor > 0.1) {
            ctx.fillStyle = '#C66A32';
            for (let b = 0; b < 12; b++) {
              const bx = dx + Math.sin(b * 1.5 + time) * (30 * bloomFactor);
              const by = dy - 20 + Math.cos(b * 2.1) * (12 * bloomFactor);
              ctx.beginPath();
              ctx.arc(bx, by, 3 + (b % 4), 0, Math.PI * 2);
              ctx.fill();
            }
          }

          // Gooseneck Kettle Water Stream (p > 0.42)
          if (p > 0.42 && p < 0.68) {
            const kettleX = dx + 120 - Math.sin((p - 0.42) * 10) * 30;
            const kettleY = dy - 130;

            // Gooseneck spout
            ctx.strokeStyle = '#8C5A35';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(kettleX + 40, kettleY - 30);
            ctx.quadraticCurveTo(kettleX + 10, kettleY - 20, kettleX, kettleY);
            ctx.stroke();

            // Glistening Water Stream
            ctx.strokeStyle = 'rgba(244, 235, 221, 0.7)';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(kettleX, kettleY);
            ctx.bezierCurveTo(
              kettleX - 10, dy - 80,
              dx + 5, dy - 60,
              dx, dy - 20
            );
            ctx.stroke();
          }

          // Drip stream coming out bottom of dripper into cup below
          if (p > 0.50) {
            ctx.strokeStyle = '#3A2115';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(dx, dy + 50);
            ctx.lineTo(dx, dy + 150);
            ctx.stroke();

            // Drip droplets
            const dripY = dy + 50 + ((time * 180) % 100);
            ctx.fillStyle = '#C66A32';
            ctx.beginPath();
            ctx.ellipse(dx, dripY, 2.5, 4, 0, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      // SCENE 06, 07, 08: THE WAIT, READY CUP & SWEET MESSAGE (p: 0.70 -> 1.00)
      if (p > 0.68) {
        const cupEnter = Math.min(Math.max((p - 0.68) / 0.12, 0), 1);
        const cx = width * 0.5;
        const cy = height * (0.55 - (p > 0.92 ? (p - 0.92) * 0.1 : 0));
        const cupScale = 0.9 + cupEnter * 0.2;

        ctx.save();
        ctx.globalAlpha = cupEnter;
        ctx.translate(cx, cy);
        ctx.scale(cupScale, cupScale);

        // Soft Table Shadow under cup
        const shadowGrad = ctx.createRadialGradient(0, 70, 10, 0, 70, 140);
        shadowGrad.addColorStop(0, 'rgba(0,0,0,0.7)');
        shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        ctx.ellipse(0, 70, 130, 35, 0, 0, Math.PI * 2);
        ctx.fill();

        // Handcrafted Ceramic Cup Body
        ctx.fillStyle = '#F4EBDD';
        ctx.beginPath();
        ctx.ellipse(0, 0, 100, 70, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cup Rim Thickness
        ctx.strokeStyle = '#E8D8BD';
        ctx.lineWidth = 6;
        ctx.stroke();

        // Inner Coffee Liquid Pool
        const liquidGrad = ctx.createRadialGradient(-15, -10, 5, 0, 0, 85);
        liquidGrad.addColorStop(0, '#59321D');
        liquidGrad.addColorStop(0.6, '#21140E');
        liquidGrad.addColorStop(1, '#120D0A');

        ctx.fillStyle = liquidGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, 86, 58, 0, 0, Math.PI * 2);
        ctx.fill();

        // Golden Crema Swirl Ring
        ctx.strokeStyle = 'rgba(198, 106, 50, 0.45)';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.ellipse(-5, -3, 72, 48, 0.1, 0, Math.PI * 2);
        ctx.stroke();

        // Ripple Animation (Scene 6/7)
        const rippleR = ((time * 30) % 60);
        const rippleAlpha = 1 - rippleR / 60;
        ctx.strokeStyle = `rgba(232, 216, 189, ${rippleAlpha * 0.35})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, rippleR * 1.2, rippleR * 0.8, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Rising Steam Wisps
        for (let s = 0; s < 4; s++) {
          const steamT = (time * 0.8 + s * 1.2) % 3;
          const sy = -30 - steamT * 40;
          const sx = Math.sin(steamT * 2 + s) * 20;
          const opacity = Math.sin((steamT / 3) * Math.PI) * 0.35;

          ctx.strokeStyle = `rgba(244, 235, 221, ${opacity})`;
          ctx.lineWidth = 3 - steamT * 0.5;
          ctx.beginPath();
          ctx.moveTo(sx * 0.5, -20);
          ctx.quadraticCurveTo(sx * 1.5, sy + 20, sx, sy);
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
    />
  );
};
