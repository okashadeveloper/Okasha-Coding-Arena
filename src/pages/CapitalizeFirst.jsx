import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CaseSensitive, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CapitalizeFirst() {
  const navigate = useNavigate();
  const [input, setInput] = useState('hello world from javascript');
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

  const handleCapitalize = () => {
    const capitalized = input
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setResult(capitalized);

    gsap.fromTo(
      resultRef.current,
      { opacity: 0, y: 50, rotationX: -90 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'power3.out',
      }
    );

    const words = resultRef.current?.querySelectorAll('.word');
    if (words) {
      gsap.fromTo(
        words,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(2)',
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
        Capitalize First Letter of Each Word
      </h1>

      <div
        ref={cardRef}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8 mb-8"
      >
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Enter a sentence:</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="hello world from javascript"
          />
        </div>

        <button
          onClick={handleCapitalize}
          className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
        >
          <span className="relative z-10 flex items-center gap-2">
            <CaseSensitive className="w-5 h-5" />
            Capitalize
          </span>
        </button>
      </div>

      {result && (
        <div
          ref={resultRef}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-lg border border-cyan-400/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Result:</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {result.split(' ').map((word, index) => (
              <div
                key={index}
                className="word bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl px-6 py-4 text-white font-bold text-2xl shadow-lg shadow-cyan-500/30"
              >
                {word}
              </div>
            ))}
          </div>
          <p className="text-gray-300">
            Original: "{input}"
          </p>
          <p className="text-cyan-400 font-bold mt-2">
            Capitalized: "{result}"
          </p>
        </div>
      )}

      <div className="mt-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-3">Explanation (Roman Urdu)</h3>
        <p className="text-gray-300 mb-3">
          Sentence ko words mei split karte hain, har word ka pehla letter uppercase karte hain,
          phir join karke final sentence banate hain.
        </p>
        <div className="bg-gray-900/50 rounded-lg p-4">
          <code className="text-cyan-400">input.split(' ').map(w =&gt; w.charAt(0).toUpperCase() + w.slice(1)).join(' ');</code>
        </div>
      </div>
    </div>
  );
}
