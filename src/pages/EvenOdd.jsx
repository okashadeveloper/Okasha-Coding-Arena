import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Filter, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EvenOdd() {
  const navigate = useNavigate();
  const [input, setInput] = useState('1,2,3,4,5,6,7,8,9,10');
  const [evens, setEvens] = useState([]);
  const [odds, setOdds] = useState([]);
  const resultRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, rotationX: -20 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleFilter = () => {
    const numbers = input.split(',').map((n) => parseInt(n.trim()));
    const evenNums = numbers.filter((n) => n % 2 === 0);
    const oddNums = numbers.filter((n) => n % 2 !== 0);

    setEvens(evenNums);
    setOdds(oddNums);

    gsap.fromTo(
      resultRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.even-item',
      { opacity: 0, x: -100, rotation: -180 },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      }
    );

    gsap.fromTo(
      '.odd-item',
      { opacity: 0, x: 100, rotation: 180 },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.7)',
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
        Filter Even / Odd Numbers
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
            placeholder="1,2,3,4,5,6,7,8,9,10"
          />
        </div>

        <button
          onClick={handleFilter}
          className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Numbers
          </span>
        </button>
      </div>

      {evens.length > 0 && (
        <div ref={resultRef} className="space-y-6">
          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 backdrop-blur-lg border border-cyan-400/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Even Numbers:</h2>
            <div className="flex flex-wrap gap-4">
              {evens.map((num, index) => (
                <div
                  key={index}
                  className="even-item bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl px-6 py-4 text-white font-bold text-2xl shadow-lg shadow-cyan-500/30"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-lg border border-purple-400/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6">Odd Numbers:</h2>
            <div className="flex flex-wrap gap-4">
              {odds.map((num, index) => (
                <div
                  key={index}
                  className="odd-item bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl px-6 py-4 text-white font-bold text-2xl shadow-lg shadow-purple-500/30"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="mt-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-3">Explanation (Roman Urdu)</h3>
        <p className="text-gray-300 mb-3">
          Even numbers wo hote hain jinke n % 2 === 0 hota hai,
          aur Odd numbers ke liye n % 2 !== 0 hota hai. Isi base par filter lagate hain.
        </p>
        <div className="bg-gray-900/50 rounded-lg p-4">
          <code className="text-cyan-400">const even = arr.filter(n =&gt; n % 2 === 0);</code><br/>
          <code className="text-cyan-400">const odd = arr.filter(n =&gt; n % 2 !== 0);</code>
        </div>
      </div>
    </div>
  );
}
