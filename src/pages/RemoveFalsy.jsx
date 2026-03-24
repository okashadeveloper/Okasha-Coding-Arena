import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { XCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RemoveFalsy() {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const resultRef = useRef(null);
  const cardRef = useRef(null);

  const sampleArray = [0, 1, false, 2, '', 3, null, 'hello', undefined, 4, NaN, 'world'];

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, rotationX: -20 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleRemoveFalsy = () => {
    const filtered = sampleArray.filter(Boolean);
    setResult(filtered);

    gsap.fromTo(
      resultRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );

    gsap.fromTo(
      '.truthy-item',
      { opacity: 0, y: 50, rotation: -90 },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(2)',
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
        Remove Falsy Values from Array
      </h1>

      <div
        ref={cardRef}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8 mb-8"
      >
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Sample Array:</label>
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
            <code className="text-cyan-400">
              {JSON.stringify(sampleArray, null, 2)}
            </code>
          </div>
        </div>

        <button
          onClick={handleRemoveFalsy}
          className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
        >
          <span className="relative z-10 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Remove Falsy Values
          </span>
        </button>
      </div>

      {result.length > 0 && (
        <div
          ref={resultRef}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-lg border border-cyan-400/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            Truthy Values Only:
          </h2>
          <div className="flex flex-wrap gap-4 mb-6">
            {result.map((value, index) => (
              <div
                key={index}
                className="truthy-item bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl px-6 py-4 text-white font-bold text-xl shadow-lg shadow-cyan-500/30"
              >
                {typeof value === 'string' ? `"${value}"` : String(value)}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-gray-400 mb-2">Removed (Falsy):</p>
              <code className="text-red-400">
                0, false, "", null, undefined, NaN
              </code>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-gray-400 mb-2">Kept (Truthy):</p>
              <code className="text-cyan-400">
                {JSON.stringify(result)}
              </code>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-3">Explanation (Roman Urdu)</h3>
        <p className="text-gray-300 mb-3">
          Falsy values (0, false, '', null, undefined, NaN) ko hatane ke liye filter(Boolean) use karte hain.
          Boolean function truthy ko true aur falsy ko false bana deta hai.
        </p>
        <div className="bg-gray-900/50 rounded-lg p-4">
          <code className="text-cyan-400">const filtered = arr.filter(Boolean);</code>
        </div>
      </div>
    </div>
  );
}
