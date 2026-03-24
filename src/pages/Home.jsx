import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Zap, Target, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const challenges = [
  { path: '/remove-duplicates', title: 'Remove Duplicates', icon: '🔄' },
  { path: '/reverse-string', title: 'Reverse String', icon: '↔️' },
  { path: '/even-odd', title: 'Even/Odd Filter', icon: '🔢' },
  { path: '/largest-number', title: 'Largest Number', icon: '📈' },
  { path: '/count-vowels', title: 'Count Vowels', icon: '🔤' },
  { path: '/capitalize-first', title: 'Capitalize First', icon: '✨' },
  { path: '/remove-falsy', title: 'Remove Falsy', icon: '🚫' },
  { path: '/array-sum', title: 'Array Sum', icon: '➕' },
  { path: '/missing-number', title: 'Missing Number', icon: '🔍' },
];

export default function Home() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: -50, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: 'power4.out',
        }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .fromTo(
          '.stat-card',
          { opacity: 0, scale: 0, rotation: 180 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        )
        .fromTo(
          '.challenge-card',
          { opacity: 0, y: 50, rotationY: -90 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.4'
        );

      const cards = document.querySelectorAll('.challenge-card');
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 5,
            z: 50,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });

      gsap.to('.floating-icon', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef}>
      <div className="text-center mb-16">
        <h1
          ref={titleRef}
          className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Master JavaScript Interviews
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Practice common interview questions with interactive examples and
          real-time results
        </p>
      </div>

      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="stat-card bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6 text-center">
          <Code2 className="floating-icon w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-4xl font-bold text-cyan-400 mb-2">9</h3>
          <p className="text-gray-300">Challenges</p>
        </div>
        <div className="stat-card bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 text-center">
          <Zap className="floating-icon w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-4xl font-bold text-purple-400 mb-2">100%</h3>
          <p className="text-gray-300">Interactive</p>
        </div>
        <div className="stat-card bg-gradient-to-br from-pink-500/10 to-pink-500/5 backdrop-blur-lg border border-pink-500/30 rounded-2xl p-6 text-center">
          <Target className="floating-icon w-12 h-12 text-pink-400 mx-auto mb-4" />
          <h3 className="text-4xl font-bold text-pink-400 mb-2">Real</h3>
          <p className="text-gray-300">Interview Prep</p>
        </div>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {challenges.map((challenge) => (
          <Link
            key={challenge.path}
            to={challenge.path}
            className="challenge-card group block"
          >
            <div className="h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="text-4xl mb-4">{challenge.icon}</div>
              <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-cyan-400 transition-colors">
                {challenge.title}
              </h3>
              <p className="text-gray-400 text-sm">
                Click to practice this challenge
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Link
        to="/task-manager"
        className="challenge-card block mx-auto max-w-2xl"
      >
        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg border-2 border-cyan-400/50 rounded-2xl p-8 text-center hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300">
          <Sparkles className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-cyan-400 mb-2">
            Advanced Project
          </h3>
          <p className="text-gray-300">
            Build a Task Manager with localStorage - Full Featured App
          </p>
        </div>
      </Link>
    </div>
  );
}
