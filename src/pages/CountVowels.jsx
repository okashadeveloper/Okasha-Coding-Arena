import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Type, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CountVowels() {
  const navigate = useNavigate();
  const [input, setInput] = useState('Hello World');
  const [count, setCount] = useState(0);
  const [vowels, setVowels] = useState([]);
  const resultRef = useRef(null);
  const countRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, rotationX: -20 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleCount = () => {
    const vowelChars = 'aeiouAEIOU';
    const foundVowels = input.split('').filter((char) => vowelChars.includes(char));
    setVowels(foundVowels);
    setCount(foundVowels.length);

    gsap.fromTo(
      resultRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );

    const counter = { value: 0 };
    gsap.to(counter, {
      value: foundVowels.length,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = Math.floor(counter.value).toString();
        }
      },
    });

    gsap.fromTo(
      '.vowel-item',
      { opacity: 0, scale: 0, rotation: 360 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        stagger: 0.05,
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
        Count Vowels in String
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
          onClick={handleCount}
          className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Type className="w-5 h-5" />
            Count Vowels
          </span>
        </button>
      </div>

      {count > 0 && (
        <div
          ref={resultRef}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-lg border border-cyan-400/50 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              Total Vowels:
            </h2>
            <div
              ref={countRef}
              className="text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              {count}
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-300 mb-4">Found Vowels:</h3>
          <div className="flex flex-wrap gap-3">
            {vowels.map((vowel, index) => (
              <div
                key={index}
                className="vowel-item bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg px-5 py-3 text-white font-bold text-xl shadow-lg shadow-cyan-500/30"
              >
                {vowel}
              </div>
            ))}
          </div>
          <p className="mt-6 text-gray-300">
            From string: "{input}"
          </p>
        </div>
      )}

      <div className="mt-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-3">Explanation (Roman Urdu)</h3>
        <p className="text-gray-300 mb-3">
          String ko characters mei tod kar har char check karte hain ke kya wo 'aeiouAEIOU' mei hai.
          Jo vowels milen unki list aur count nikal lete hain.
        </p>
        <div className="bg-gray-900/50 rounded-lg p-4">
          <code className="text-cyan-400">const found = input.split('').filter(c =&gt; 'aeiouAEIOU'.includes(c));</code>
        </div>
      </div>
    </div>
  );
}
