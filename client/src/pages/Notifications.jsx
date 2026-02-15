import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import { useSelector } from 'react-redux'
import {
    Bell, BellOff, Briefcase, Eye, MessageSquare, CheckCircle2, XCircle, Clock,
    Trash2, CheckCheck, Filter, Search, Star, UserCheck, TrendingUp
} from 'lucide-react'

const Notifications = () => {
    const { user } = useSelector(store => store.auth);

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'job_match',
            icon: <Briefcase size={18} />,
            iconColor: 'text-blue-500 bg-blue-50',
            title: 'New job match: Senior React Developer',
            description: 'Google India is hiring for a role that matches your profile.',
            time: '2 hours ago',
            read: false,
        },
        {
            id: 2,
            type: 'profile_view',
            icon: <Eye size={18} />,
            iconColor: 'text-purple-500 bg-purple-50',
            title: 'Profile viewed by recruiter',
            description: 'A recruiter from Accenture viewed your profile.',
            time: '5 hours ago',
            read: false,
        },
        {
            id: 3,
            type: 'application',
            icon: <CheckCircle2 size={18} />,
            iconColor: 'text-green-500 bg-green-50',
            title: 'Application shortlisted',
            description: 'Your application for Full Stack Developer at Flipkart has been shortlisted!',
            time: '1 day ago',
            read: false,
        },
        {
            id: 4,
            type: 'message',
            icon: <MessageSquare size={18} />,
            iconColor: 'text-indigo-500 bg-indigo-50',
            title: 'New message from HR Manager',
            description: 'Hi, we would like to schedule an interview with you...',
            time: '1 day ago',
            read: true,
        },
        {
            id: 5,
            type: 'application',
            icon: <XCircle size={18} />,
            iconColor: 'text-red-500 bg-red-50',
            title: 'Application not selected',
            description: 'Unfortunately, your application for Data Analyst at Amazon was not selected.',
            time: '2 days ago',
            read: true,
        },
        {
            id: 6,
            type: 'job_match',
            icon: <Star size={18} />,
            iconColor: 'text-amber-500 bg-amber-50',
            title: 'Recommended: UI/UX Designer at Swiggy',
            description: 'Based on your skills, we think this role is a great match.',
            time: '2 days ago',
            read: true,
        },
        {
            id: 7,
            type: 'profile_view',
            icon: <UserCheck size={18} />,
            iconColor: 'text-teal-500 bg-teal-50',
            title: 'Recruiter saved your profile',
            description: 'A recruiter from TCS saved your profile for future reference.',
            time: '3 days ago',
            read: true,
        },
        {
            id: 8,
            type: 'system',
            icon: <TrendingUp size={18} />,
            iconColor: 'text-orange-500 bg-orange-50',
            title: 'Weekly Job Digest',
            description: '15 new jobs matching your profile were posted this week. Check them out!',
            time: '5 days ago',
            read: true,
        },
    ]);

    const [activeFilter, setActiveFilter] = useState('all');
    const [searchText, setSearchText] = useState('');

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'unread', label: 'Unread' },
        { id: 'job_match', label: 'Jobs' },
        { id: 'application', label: 'Applications' },
        { id: 'profile_view', label: 'Profile' },
        { id: 'message', label: 'Messages' },
    ];

    const filteredNotifications = notifications.filter(n => {
        if (activeFilter === 'unread') return !n.read;
        if (activeFilter !== 'all') return n.type === activeFilter;
        return true;
    }).filter(n => {
        if (!searchText) return true;
        return n.title.toLowerCase().includes(searchText.toLowerCase()) ||
            n.description.toLowerCase().includes(searchText.toLowerCase());
    });

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50/20'>
            <Navbar />
            <div className='max-w-3xl mx-auto px-4 py-8'>
                {/* Header */}
                <div className='flex items-center justify-between mb-6 animate-fade-in'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-800 flex items-center gap-3'>
                            Notifications
                            {unreadCount > 0 && (
                                <span className='bg-brand-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-scale-in'>
                                    {unreadCount} new
                                </span>
                            )}
                        </h1>
                        <p className='text-gray-400 mt-1'>Stay updated with your job search activity</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        {unreadCount > 0 && (
                            <button onClick={markAllRead} className='flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all'>
                                <CheckCheck size={16} /> Mark all read
                            </button>
                        )}
                        {notifications.length > 0 && (
                            <button onClick={clearAll} className='flex items-center gap-1.5 px-4 py-2 bg-white border border-red-200 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all'>
                                <Trash2 size={16} /> Clear all
                            </button>
                        )}
                    </div>
                </div>

                {/* Search + Filters */}
                <div className='mb-6 space-y-4 animate-fade-in-up'>
                    {/* Search */}
                    <div className='relative'>
                        <Search size={18} className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search notifications..."
                            className='w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm hover:border-gray-300'
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div className='flex gap-2 overflow-x-auto no-scrollbar pb-1'>
                        {filters.map(f => (
                            <button
                                key={f.id}
                                onClick={() => setActiveFilter(f.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeFilter === f.id
                                    ? 'bg-brand-500 text-white shadow-sm'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                    }`}
                            >
                                {f.label}
                                {f.id === 'unread' && unreadCount > 0 && (
                                    <span className='ml-1.5 bg-white/20 text-xs px-1.5 py-0.5 rounded-full'>{unreadCount}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notification List */}
                <div className='space-y-3'>
                    {filteredNotifications.length === 0 ? (
                        <div className='flex flex-col items-center justify-center py-16 animate-fade-in'>
                            <div className='w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4'>
                                <BellOff size={32} className='text-gray-300' />
                            </div>
                            <h3 className='text-lg font-semibold text-gray-600'>No notifications</h3>
                            <p className='text-sm text-gray-400 mt-1'>
                                {activeFilter === 'unread' ? "You're all caught up!" : "Nothing here yet. Check back later."}
                            </p>
                        </div>
                    ) : (
                        filteredNotifications.map((notif, index) => (
                            <div
                                key={notif.id}
                                onClick={() => markAsRead(notif.id)}
                                className={`group flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200 hover-lift animate-fade-in-up opacity-0 ${!notif.read
                                    ? 'bg-white border-brand-100 shadow-sm'
                                    : 'bg-white/70 border-gray-100 hover:bg-white'
                                    }`}
                                style={{ animationDelay: `${Math.min(index * 0.06, 0.4)}s` }}
                            >
                                {/* Icon */}
                                <div className={`w-10 h-10 rounded-xl ${notif.iconColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                    {notif.icon}
                                </div>

                                {/* Content */}
                                <div className='flex-1 min-w-0'>
                                    <div className='flex items-start justify-between gap-2'>
                                        <div>
                                            <p className={`text-sm ${!notif.read ? 'font-semibold text-gray-800' : 'font-medium text-gray-700'}`}>
                                                {notif.title}
                                            </p>
                                            <p className='text-xs text-gray-500 mt-0.5 line-clamp-1'>{notif.description}</p>
                                        </div>
                                        {!notif.read && (
                                            <div className='w-2.5 h-2.5 rounded-full bg-brand-500 shrink-0 mt-1.5 animate-pulse-glow'></div>
                                        )}
                                    </div>
                                    <div className='flex items-center gap-3 mt-2'>
                                        <span className='text-[11px] text-gray-400 flex items-center gap-1'><Clock size={11} /> {notif.time}</span>
                                    </div>
                                </div>

                                {/* Delete */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                                    className='p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shrink-0'
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Notifications
