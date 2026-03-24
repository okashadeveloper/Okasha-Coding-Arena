import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ArraySum() {
  const navigate = useNavigate();
  const [input, setInput] = useState('10,20,30,40,50');
  const [sum, setSum] = useState(0);
  const resultRef = useRef(null);
  const sumRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, rotationX: -20 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleSum = () => {
    const numbers = input.split(',').map((n) => parseInt(n.trim()));
    const total = numbers.reduce((acc, curr) => acc + curr, 0);
    setSum(total);

    gsap.fromTo(
      resultRef.current,
      { opacity: 0, scale: 0, rotation: 180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      }
    );

    const counter = { value: 0 };
    gsap.to(counter, {
      value: total,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        if (sumRef.current) {
          sumRef.current.textContent = Math.floor(counter.value).toString();
        }
      },
    });

    gsap.to(sumRef.current, {
      scale: 1.2,
      duration: 0.3,
      yoyo: true,
      repeat: 3,
      ease: 'power2.inOut',
    });
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
        Calculate Array Sum
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
            placeholder="10,20,30,40,50"
          />
        </div>

        <button
          onClick={handleSum}
          className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Calculate Sum
          </span>
        </button>
      </div>

      {sum > 0 && (
        <div
          ref={resultRef}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-lg border border-cyan-400/50 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Total Sum:</h2>
          <div
            ref={sumRef}
            className="text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
          >
            {sum}
          </div>
          <p className="text-gray-300 text-lg">
            Sum of: [{input}]
          </p>
          <div className="mt-6 bg-gray-900/50 rounded-lg p-4 inline-block">
            <code className="text-cyan-400">
              {input.split(',').map((n) => n.trim()).join(' + ')} = {sum}
            </code>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-3">Explanation (Roman Urdu)</h3>
        <p className="text-gray-300 mb-3">
          Numbers ka sum nikalne ke liye reduce use karte hain jo accumulator aur current value ko
          jor kar total banata jata hai.
        </p>
        <div className="bg-gray-900/50 rounded-lg p-4">
          <code className="text-cyan-400">const total = numbers.reduce((acc, curr) =&gt; acc + curr, 0);</code>
        </div>
      </div>
    </div>
  );
}
