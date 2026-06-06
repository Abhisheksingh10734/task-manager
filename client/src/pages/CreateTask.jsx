import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
import toast from 'react-hot-toast';

const priorities = ['Low', 'Medium', 'High'];

const priorityConfig = {
    Low: { color: 'bg-green-700', text: 'text-green-300', border: 'border-green-600', glow: 'shadow-green-900/40' },
    Medium: { color: 'bg-yellow-700', text: 'text-yellow-300', border: 'border-yellow-600', glow: 'shadow-yellow-900/40' },
    High: { color: 'bg-red-700', text: 'text-red-300', border: 'border-red-600', glow: 'shadow-red-900/40' },
};

const CreateTask = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        date: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Title is required.';
        if (!form.description.trim()) e.description = 'Description is required.';
        if (!form.date) e.date = 'Due date is required.';
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const e2 = validate();
        if (Object.keys(e2).length) { setErrors(e2); return; }
        setSubmitted(true);

        try {
            const res = await api.post("/app/create-task", form);

            toast.success(res.data.message);

            if (res.status === 200 || res.status === 201) {
                setTimeout(() => {
                    navigate("/app/tasks");
                }, 1800);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Task creation failed"
            );
        }
    };

    const cfg = priorityConfig[form.priority];

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#12122a] flex items-center justify-center px-4">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <div className="w-20 h-20 rounded-full bg-[#7c6ef0]/20 border-2 border-[#7c6ef0] flex items-center justify-center">
                        <span className="text-4xl">✓</span>
                    </div>
                    <h2 className="text-white text-2xl font-bold">Task Created!</h2>
                    <p className="text-[#6a6a9a] text-sm">Redirecting to tasks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#12122a] px-4 py-8 sm:px-6 lg:px-8">

            {/* Glow blobs */}
            <div className="fixed top-1/3 left-1/4 w-72 h-72 bg-[#7c6ef0] opacity-[0.04] rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-1/4 right-1/4 w-72 h-72 bg-[#7c6ef0] opacity-[0.04] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-[#6a6a9a] hover:text-white transition text-sm mb-6 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform duration-150">←</span>
                        Back
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#7c6ef0] rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">+</span>
                        </div>
                        <div>
                            <h1 className="text-white text-2xl font-black tracking-wide">New Task</h1>
                            <p className="text-[#6a6a9a] text-xs">Fill in the details below to add a task</p>
                        </div>
                    </div>
                </div>

                {/* Form card */}
                <form onSubmit={handleSubmit} noValidate>
                    <div className="bg-[#1e1e40] border border-[#2e2e5a] rounded-2xl p-6 flex flex-col gap-6">

                        {/* Title */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[#aaa] text-xs font-semibold tracking-widest uppercase">
                                Task Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g. Design landing page"
                                className={`w-full bg-[#12122a] border rounded-xl px-4 py-3 text-white text-sm font-semibold placeholder-[#3a3a6a] focus:outline-none transition-all duration-200
                  ${errors.title ? 'border-red-500 focus:border-red-400' : 'border-[#2e2e5a] focus:border-[#7c6ef0]'}`}
                            />
                            {errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[#aaa] text-xs font-semibold tracking-widest uppercase">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Describe what needs to be done..."
                                rows={4}
                                className={`w-full bg-[#12122a] border rounded-xl px-4 py-3 text-white text-sm placeholder-[#3a3a6a] focus:outline-none transition-all duration-200 resize-none leading-relaxed
                  ${errors.description ? 'border-red-500 focus:border-red-400' : 'border-[#2e2e5a] focus:border-[#7c6ef0]'}`}
                            />
                            {errors.description && <p className="text-red-400 text-xs">{errors.description}</p>}
                        </div>

                        {/* Priority */}
                        <div className="flex flex-col gap-3">
                            <label className="text-[#aaa] text-xs font-semibold tracking-widest uppercase">
                                Priority
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {priorities.map((p) => {
                                    const c = priorityConfig[p];
                                    const active = form.priority === p;
                                    return (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, priority: p }))}
                                            className={`py-2.5 cursor-pointer rounded-xl text-sm font-bold border transition-all duration-150 active:scale-95
                        ${active
                                                    ? `${c.color} ${c.text} ${c.border} shadow-lg ${c.glow}`
                                                    : 'bg-[#12122a] text-[#6a6a9a] border-[#2e2e5a] hover:border-[#3e3e7a]'
                                                }`}
                                        >
                                            {p === 'Low' && '🟢 '}
                                            {p === 'Medium' && '🟡 '}
                                            {p === 'High' && '🔴 '}
                                            {p}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Due date */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[#aaa] text-xs font-semibold tracking-widest uppercase">
                                Due Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                onClick={(e) => e.target.showPicker()}
                                className={`w-full bg-[#12122a] border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all cursor-pointer duration-200
    [color-scheme:dark]
    ${errors.date
                                        ? 'border-red-500 focus:border-red-400'
                                        : 'border-[#2e2e5a] focus:border-[#7c6ef0]'
                                    }`}
                            />
                            {errors.date && <p className="text-red-400 text-xs">{errors.date}</p>}
                        </div>

                        {/* Divider */}
                        <div className="border-t border-[#2e2e5a]" />

                        {/* Preview strip */}
                        {form.title && (
                            <div className={`bg-[#12122a] border-l-4 ${cfg.border} rounded-xl px-4 py-3 flex items-center justify-between`}>
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="text-[#555] text-xs flex-shrink-0">Preview</span>
                                    <span className="text-white text-sm font-semibold truncate">{form.title}</span>
                                </div>
                                <span className={`${cfg.color} ${cfg.text} text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ml-2`}>
                                    {form.priority}
                                </span>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                type="submit"
                                className="flex-1 flex items-center justify-center gap-2 bg-[#7c6ef0] hover:bg-[#6a5cd8] active:scale-95 text-white font-bold py-3 px-6 rounded-xl transition-all duration-150 cursor-pointer"
                            >
                                <span>✓</span> Create Task
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-transparent border border-[#2e2e5a] hover:bg-[#2a2a50] active:scale-95 text-[#aaa] hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-150 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    );
};

export default CreateTask;