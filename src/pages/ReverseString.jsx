import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReverseString() {
  const navigate = useNavigate();
  const [input, setInput] = useState('Hello World');
  const [result, setResult] = useState('');
  const resultRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, rotationX: -20 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleReverse = () => {
    const reversed = input.split('').reverse().join('');
    setResult(reversed);

    gsap.fromTo(
      resultRef.current,
      { scale: 0, rotation: 360, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      }
    );

    const letters = resultRef.current?.querySelectorAll('.letter');
    if (letters) {
      gsap.fromTo(
        letters,
        { opacity: 0, y: -30, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: 'back.out(1.7)',
        }
      );
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-lg bg-gray-800/50 border border-cyan-500/30 text-gray-200 hover:border-cyan-400 hover:bg-gray-800 transition-all"
      >
        <ArrowLeft className="w-5 h-5 text-cyan-400" />
        Back
      </button>
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Reverse String from Variable
      </h1>

      <div
        ref={cardRef}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8 mb-8"
      >
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Enter a string:</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="Hello World"
          />
        </div>

        <button
          onClick={handleReverse}
          className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
        >
          <span className="relative z-10 flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Reverse String
          </span>
        </button>
      </div>

      {result && (
        <div
          ref={resultRef}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-lg border border-cyan-400/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Result:</h2>
          <div className="flex flex-wrap gap-1 text-3xl font-bold mb-6">
            {result.split('').map((char, index) => (
              <span
                key={index}
                className="letter bg-gradient-to-br from-cyan-500 to-purple-500 bg-clip-text text-transparent"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
          <p className="text-gray-300">
            Original: "{input}" → Reversed: "{result}"
          </p>
        </div>
      )}

      <div className="mt-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-3">Explanation (Roman Urdu)</h3>
        <p className="text-gray-300 mb-3">
          String ko pehle characters mei split karte hain, phir us array ko reverse karte hain,
          aur phir join karke wapas string bana dete hain.
        </p>
        <div className="bg-gray-900/50 rounded-lg p-4">
          <code className="text-cyan-400">const reversed = input.split('').reverse().join('');</code>
        </div>
      </div>
    </div>
  );
}
