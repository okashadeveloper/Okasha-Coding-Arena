import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MissingNumber() {
  const navigate = useNavigate();
  const [input, setInput] = useState('1,2,3,5,6,7,8,9,10');
  const [missing, setMissing] = useState(null);
  const resultRef = useRef(null);
  const numberRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, rotationX: -20 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleFind = () => {
    const numbers = input.split(',').map((n) => parseInt(n.trim())).sort((a, b) => a - b);
    let missingNum = null;

    for (let i = 0; i < numbers.length - 1; i++) {
      if (numbers[i + 1] - numbers[i] > 1) {
        missingNum = numbers[i] + 1;
        break;
      }
    }

    setMissing(missingNum);

    gsap.fromTo(
      resultRef.current,
      { opacity: 0, scale: 0, y: -100 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      }
    );

    if (missingNum) {
      gsap.fromTo(
        numberRef.current,
        { scale: 0, rotation: 720, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.4)',
        }
      );

      const counter = { value: 0 };
      gsap.to(counter, {
        value: missingNum,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = Math.floor(counter.value).toString();
          }
        },
      });
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
        Find Missing Number from Array
      </h1>

      <div
        ref={cardRef}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8 mb-8"
      >
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Enter sequential numbers (with one missing):
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="1,2,3,5,6,7,8,9,10"
          />
        </div>

        <button
          onClick={handleFind}
          className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Find Missing Number
          </span>
        </button>
      </div>

      {missing !== null && (
        <div
          ref={resultRef}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-lg border border-cyan-400/50 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            Missing Number:
          </h2>
          <div className="relative inline-block mb-6">
            <div
              ref={numberRef}
              className="text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {missing}
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl rounded-full" />
          </div>
          <p className="text-gray-300 text-lg">
            From sequence: [{input}]
          </p>
          <div className="mt-6 bg-gray-900/50 rounded-lg p-4 inline-block">
            <code className="text-cyan-400">
              The missing number in the sequence is: {missing}
            </code>
          </div>
        </div>
      )}

      {missing === null && input && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 text-center">
          <p className="text-yellow-400">
            No missing number found. Make sure your sequence has a gap!
          </p>
        </div>
      )}

      <div className="mt-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-3">Explanation (Roman Urdu)</h3>
        <p className="text-gray-300 mb-3">
          Pehle numbers ko sort karte hain. Phir adjacent numbers ka difference check karte hain.
          Agar gap 1 se zyada ho to missing number previous + 1 hota hai.
        </p>
        <div className="bg-gray-900/50 rounded-lg p-4">
          <code className="text-cyan-400">
            for (let i = 0; i &lt; arr.length - 1; i++) {'{'} if (arr[i+1] - arr[i] &gt; 1) missing = arr[i] + 1; {'}'}
          </code>
        </div>
      </div>
    </div>
  );
}
