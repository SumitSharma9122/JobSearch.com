import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../../redux/jobSlice'
import { Code2, Database, Palette, Monitor, Server, BrainCircuit, PenTool, BarChart3 } from 'lucide-react'

const categories = [
    { name: "Frontend Developer", icon: <Monitor size={18} />, color: "from-blue-500 to-cyan-400" },
    { name: "Backend Developer", icon: <Server size={18} />, color: "from-green-500 to-emerald-400" },
    { name: "Full Stack Developer", icon: <Code2 size={18} />, color: "from-purple-500 to-violet-400" },
    { name: "Data Science", icon: <Database size={18} />, color: "from-orange-500 to-amber-400" },
    { name: "UI/UX Designer", icon: <Palette size={18} />, color: "from-pink-500 to-rose-400" },
    { name: "AI / ML Engineer", icon: <BrainCircuit size={18} />, color: "from-indigo-500 to-blue-400" },
    { name: "Graphic Designer", icon: <PenTool size={18} />, color: "from-red-500 to-orange-400" },
    { name: "Data Analyst", icon: <BarChart3 size={18} />, color: "from-teal-500 to-cyan-400" },
]

const CategoryCarousel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (cat) => {
        dispatch(setSearchedQuery(cat));
        navigate("/browse");
    }

    return (
        <div className='max-w-6xl mx-auto px-4 py-16'>
            <div className='text-center mb-10 animate-fade-in'>
                <h2 className='text-3xl font-bold text-gray-800'>Browse by <span className='gradient-text'>Category</span></h2>
                <p className='text-gray-500 mt-2'>Explore opportunities in your area of expertise</p>
            </div>
            <div className='flex gap-3 overflow-x-auto no-scrollbar pb-4 justify-center flex-wrap'>
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(cat.name)}
                        className={`group flex items-center gap-2.5 bg-white text-gray-700 font-medium py-3 px-5 rounded-xl shadow-sm border border-gray-100 whitespace-nowrap hover-lift animate-fade-in-up opacity-0 stagger-${Math.min(index + 1, 6)}`}
                    >
                        <span className={`bg-gradient-to-r ${cat.color} text-white p-1.5 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                            {cat.icon}
                        </span>
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CategoryCarousel
