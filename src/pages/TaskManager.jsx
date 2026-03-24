import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Plus, Trash2, Check, CreditCard as Edit2, X, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TaskManager() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');

  const containerRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    gsap.fromTo(
      '.stat-card',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }
    );
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      priority,
      createdAt: Date.now(),
    };

    setTasks([task, ...tasks]);
    setNewTask('');

    setTimeout(() => {
      const newTaskElement = document.querySelector(`[data-task-id="${task.id}"]`);
      if (newTaskElement) {
        gsap.fromTo(
          newTaskElement,
          { opacity: 0, x: -100, scale: 0.8, rotationY: -90 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
          }
        );
      }
    }, 10);
  };

  const toggleTask = (id) => {
    const taskElement = document.querySelector(`[data-task-id="${id}"]`);

    gsap.to(taskElement, {
      scale: 1.05,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    const taskElement = document.querySelector(`[data-task-id="${id}"]`);

    gsap.to(taskElement, {
      opacity: 0,
      x: 100,
      rotation: 10,
      scale: 0.5,
      duration: 0.4,
      ease: 'back.in(1.7)',
      onComplete: () => {
        setTasks(tasks.filter((task) => task.id !== id));
      },
    });
  };

  const startEdit = (id, title) => {
    setEditingId(id);
    setEditText(title);
  };

  const saveEdit = () => {
    if (!editText.trim()) return;

    setTasks(
      tasks.map((task) =>
        task.id === editingId ? { ...task, title: editText } : task
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'from-red-500 to-pink-500';
      case 'medium':
        return 'from-yellow-500 to-orange-500';
      case 'low':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div ref={containerRef}>
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-lg bg-gray-800/50 border border-cyan-500/30 text-gray-200 hover:border-cyan-400 hover:bg-gray-800 transition-all"
      >
        <ArrowLeft className="w-5 h-5 text-cyan-400" />
        Back
      </button>
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Advanced Task Manager
      </h1>

      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6 text-center">
          <h3 className="text-4xl font-bold text-cyan-400 mb-2">{stats.total}</h3>
          <p className="text-gray-300">Total Tasks</p>
        </div>
        <div className="stat-card bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 text-center">
          <h3 className="text-4xl font-bold text-purple-400 mb-2">{stats.active}</h3>
          <p className="text-gray-300">Active</p>
        </div>
        <div className="stat-card bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6 text-center">
          <h3 className="text-4xl font-bold text-green-400 mb-2">{stats.completed}</h3>
          <p className="text-gray-300">Completed</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8 mb-8">
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">New Task:</label>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="What needs to be done?"
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="text-gray-300">Priority:</label>
          {['low', 'medium', 'high'].map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                priority === p
                  ? `bg-gradient-to-r ${getPriorityColor(p)} text-white scale-105`
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={addTask}
          className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 w-full"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Add Task
          </span>
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === f
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            data-task-id={task.id}
            className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border rounded-2xl p-6 transition-all ${
              task.completed
                ? 'border-green-500/30 opacity-60'
                : 'border-cyan-500/30'
            }`}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all ${
                  task.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-cyan-400 hover:border-cyan-300'
                }`}
              >
                {task.completed && <Check className="w-4 h-4 text-white m-auto" />}
              </button>

              <div
                className={`flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r ${getPriorityColor(
                  task.priority
                )}`}
              />

              {editingId === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                  className="flex-1 px-3 py-2 bg-gray-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              ) : (
                <p
                  className={`flex-1 text-gray-200 ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.title}
                </p>
              )}

              <div className="flex gap-2">
                {editingId === task.id ? (
                  <>
                    <button
                      onClick={saveEdit}
                      className="p-2 bg-green-500/20 border border-green-500/50 rounded-lg hover:bg-green-500/30 transition-all"
                    >
                      <Check className="w-4 h-4 text-green-400" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-all"
                    >
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(task.id, task.title)}
                      className="p-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-all"
                    >
                      <Edit2 className="w-4 h-4 text-cyan-400" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-lg border border-gray-700/30 rounded-2xl p-12 text-center">
          <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">
            {filter === 'all'
              ? 'No tasks yet. Create one to get started!'
              : `No ${filter} tasks.`}
          </p>
        </div>
      )}

      <div className="mt-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-3">Explanation (Roman Urdu)</h3>
        <p className="text-gray-300 mb-3">
          Ye app localStorage use karti hai tasks save karne ke liye. Aap naye task add, edit, delete
          aur complete toggle kar sakte hain. Priority ke hisaab se color badges dikhte hain.
        </p>
        <div className="bg-gray-900/50 rounded-lg p-4">
          <code className="text-cyan-400">
            const task = {'{'} id: Date.now().toString(), title, completed: false, priority {'}'};
          </code>
        </div>
      </div>
    </div>
  );
}
