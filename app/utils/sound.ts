export const playSound = (type: "success" | "alert") => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
  
      osc.connect(gain);
      gain.connect(audioCtx.destination);
  
      if (type === "success") {
        // Pleasant soft high-pitch blip
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } else {
        // Lower soft tone for alerts/closing positions
        osc.type = "triangle";
        osc.frequency.setValueAtTime(350, audioCtx.currentTime);
        osc.frequency.setValueAtTime(250, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      }
    } catch (e) {
      // AudioContext blocked or not supported
    }
  };