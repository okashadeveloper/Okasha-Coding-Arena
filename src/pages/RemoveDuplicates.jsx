import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RemoveDuplicates() {
  const navigate = useNavigate();
  const [input, setInput] = useState('1,2,3,2,4,3,5');
  const [result, setResult] = useState([]);
  const resultRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, rotationX: -20 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleRemoveDuplicates = () => {
    const numbers = input.split(',').map((n) => parseInt(n.trim()));
    const unique = [...new Set(numbers)];
    setResult(unique);

    gsap.fromTo(
      resultRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }
    );

    gsap.fromTo(
      '.result-item',
      { opacity: 0, x: -50, rotationY: -90 },
      {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
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
        Remove Duplicate Numbers from Array
      </h1>

      <div
        ref={cardRef}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8 mb-8"
      >
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Enter comma-separated numbers:
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="1,2,3,2,4,3,5"
          />
        </div>

        <button
          onClick={handleRemoveDuplicates}
          className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Remove Duplicates
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {result.length > 0 && (
        <div
          ref={resultRef}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-lg border border-cyan-400/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Result:</h2>
          <div className="flex flex-wrap gap-4">
            {result.map((num, index) => (
              <div
                key={index}
                className="result-item bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl px-6 py-4 text-white font-bold text-2xl shadow-lg shadow-cyan-500/30"
              >
                {num}
              </div>
            ))}
          </div>
          <p className="mt-6 text-gray-300">
            Original: [{input}] → Unique: [{result.join(', ')}]
          </p>
        </div>
      )}

      <div className="mt-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-3">Explanation (Roman Urdu)</h3>
        <p className="text-gray-300 mb-3">
          Duplicates hatane ke liye Set use karte hain jo sirf unique values rakhta hai.
          Array ko Set mei daal kar spread karke wapas array bana dete hain.
        </p>
        <div className="bg-gray-900/50 rounded-lg p-4">
          <code className="text-cyan-400">const unique = [...new Set(numbers)];</code>
        </div>
      </div>
    </div>
  );
}
