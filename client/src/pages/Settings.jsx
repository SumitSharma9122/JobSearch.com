import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/authSlice'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import {
    User, Lock, Bell, Shield, Eye, EyeOff, Palette, Globe, Trash2, LogOut,
    ChevronRight, Mail, Phone, Briefcase, Moon, Sun, Monitor, Check, Loader2
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const Settings = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('account');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Theme Context
    const { theme, setTheme } = useTheme();

    // Account settings
    const [accountForm, setAccountForm] = useState({
        name: user?.name || user?.fullname || '',
        email: user?.email || '',
        phone: user?.phoneNumber || '',
    });

    // Password
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

    // Notification prefs
    const [notifPrefs, setNotifPrefs] = useState({
        emailJobAlerts: true,
        emailApplicationUpdates: true,
        emailProfileViews: false,
        pushNewJobs: true,
        pushMessages: true,
        pushReminders: false,
        weeklyDigest: true,
    });

    // Privacy
    const [privacyPrefs, setPrivacyPrefs] = useState({
        profileVisible: true,
        showEmail: false,
        showPhone: false,
        allowRecruiterContact: true,
        searchableProfile: true,
    });

    const handleSave = async () => {
        setSaving(true);
        // Simulate save
        await new Promise(r => setTimeout(r, 800));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            // Would call API to delete
            alert('Account deletion requested. This feature will be implemented with backend support.');
        }
    };

    const handleLogout = async () => {
        try {
            const res = await api.get("/user/logout");
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const tabs = [
        { id: 'account', label: 'Account', icon: <User size={18} /> },
        { id: 'password', label: 'Password', icon: <Lock size={18} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
        { id: 'privacy', label: 'Privacy', icon: <Shield size={18} /> },
        { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    ];

    const Toggle = ({ enabled, onToggle }) => (
        <button
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${enabled ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    );

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300'>
            <Navbar />
            <div className='max-w-5xl mx-auto px-4 py-8'>
                {/* Header */}
                <div className='mb-8 animate-fade-in'>
                    <h1 className='text-3xl font-bold text-gray-800 dark:text-white'>Settings</h1>
                    <p className='text-gray-400 mt-1 dark:text-gray-400'>Manage your account preferences and privacy</p>
                </div>

                <div className='flex flex-col md:flex-row gap-6'>
                    {/* Sidebar Tabs */}
                    <div className='w-full md:w-56 shrink-0 animate-fade-in-up'>
                        <div className='bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-2 space-y-1 sticky top-24 transition-colors duration-300'>
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                        ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200'
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                            <div className='border-t border-gray-100 dark:border-gray-700 mt-2 pt-2'>
                                <button onClick={handleLogout} className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors'>
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className='flex-1 animate-fade-in-up stagger-2 opacity-0'>
                        {/* === ACCOUNT TAB === */}
                        {activeTab === 'account' && (
                            <div className='bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-300'>
                                <div className='p-6 border-b border-gray-100 dark:border-gray-700'>
                                    <h2 className='text-lg font-bold text-gray-800 dark:text-white'>Account Information</h2>
                                    <p className='text-sm text-gray-400 mt-1'>Update your personal details</p>
                                </div>
                                <div className='p-6 space-y-5'>
                                    <div>
                                        <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Full Name</label>
                                        <div className='relative'>
                                            <User size={16} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                            <input
                                                type="text"
                                                value={accountForm.name}
                                                onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })}
                                                className='w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Email Address</label>
                                        <div className='relative'>
                                            <Mail size={16} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                            <input
                                                type="email"
                                                value={accountForm.email}
                                                onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
                                                className='w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Phone Number</label>
                                        <div className='relative'>
                                            <Phone size={16} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                            <input
                                                type="tel"
                                                value={accountForm.phone}
                                                onChange={(e) => setAccountForm({ ...accountForm, phone: e.target.value })}
                                                className='w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Role</label>
                                        <div className='relative'>
                                            <Briefcase size={16} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                            <input
                                                type="text"
                                                value={user?.role === 'employer' ? 'Recruiter' : 'Job Seeker'}
                                                disabled
                                                className='w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-between'>
                                    <button onClick={handleDeleteAccount} className='text-sm text-red-500 hover:text-red-600 flex items-center gap-1.5 transition-colors'>
                                        <Trash2 size={14} /> Delete Account
                                    </button>
                                    <button onClick={handleSave} disabled={saving} className='btn-primary bg-brand-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-brand-600 flex items-center gap-2 disabled:opacity-50'>
                                        {saving ? <Loader2 size={16} className='animate-spin' /> : saved ? <Check size={16} /> : null}
                                        {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === PASSWORD TAB === */}
                        {activeTab === 'password' && (
                            <div className='bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-300'>
                                <div className='p-6 border-b border-gray-100 dark:border-gray-700'>
                                    <h2 className='text-lg font-bold text-gray-800 dark:text-white'>Change Password</h2>
                                    <p className='text-sm text-gray-400 mt-1'>Keep your account secure with a strong password</p>
                                </div>
                                <div className='p-6 space-y-5'>
                                    {['currentPassword', 'newPassword', 'confirmPassword'].map((field, i) => {
                                        const labels = ['Current Password', 'New Password', 'Confirm New Password'];
                                        const keys = ['current', 'new', 'confirm'];
                                        return (
                                            <div key={field}>
                                                <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>{labels[i]}</label>
                                                <div className='relative'>
                                                    <Lock size={16} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                                    <input
                                                        type={showPasswords[keys[i]] ? 'text' : 'password'}
                                                        value={passwordForm[field]}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, [field]: e.target.value })}
                                                        placeholder={labels[i]}
                                                        className='w-full pl-10 pr-11 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500'
                                                    />
                                                    <button type='button' onClick={() => setShowPasswords({ ...showPasswords, [keys[i]]: !showPasswords[keys[i]] })} className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                                                        {showPasswords[keys[i]] ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className='bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-xl p-4'>
                                        <p className='text-sm text-amber-700 dark:text-amber-400'>Password must be at least 8 characters with a mix of letters, numbers, and symbols.</p>
                                    </div>
                                </div>
                                <div className='px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex justify-end'>
                                    <button onClick={handleSave} disabled={saving} className='btn-primary bg-brand-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-brand-600 flex items-center gap-2 disabled:opacity-50'>
                                        {saving ? <Loader2 size={16} className='animate-spin' /> : saved ? <Check size={16} /> : null}
                                        {saving ? 'Updating...' : saved ? 'Updated!' : 'Update Password'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === NOTIFICATIONS TAB === */}
                        {activeTab === 'notifications' && (
                            <div className='bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-300'>
                                <div className='p-6 border-b border-gray-100 dark:border-gray-700'>
                                    <h2 className='text-lg font-bold text-gray-800 dark:text-white'>Notification Preferences</h2>
                                    <p className='text-sm text-gray-400 mt-1'>Choose what notifications you receive</p>
                                </div>
                                <div className='p-6 space-y-6'>
                                    {/* Email Notifications */}
                                    <div>
                                        <h3 className='text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-wider flex items-center gap-2'>
                                            <Mail size={16} className='text-brand-500' /> Email Notifications
                                        </h3>
                                        <div className='space-y-4'>
                                            {[
                                                { key: 'emailJobAlerts', label: 'Job Alerts', desc: 'Get notified about new jobs matching your profile' },
                                                { key: 'emailApplicationUpdates', label: 'Application Updates', desc: 'Status changes on your job applications' },
                                                { key: 'emailProfileViews', label: 'Profile Views', desc: 'When recruiters view your profile' },
                                            ].map(item => (
                                                <div key={item.key} className='flex items-center justify-between'>
                                                    <div>
                                                        <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>{item.label}</p>
                                                        <p className='text-xs text-gray-400 mt-0.5'>{item.desc}</p>
                                                    </div>
                                                    <Toggle enabled={notifPrefs[item.key]} onToggle={() => setNotifPrefs({ ...notifPrefs, [item.key]: !notifPrefs[item.key] })} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='border-t border-gray-100 dark:border-gray-700'></div>

                                    {/* Push Notifications */}
                                    <div>
                                        <h3 className='text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-wider flex items-center gap-2'>
                                            <Bell size={16} className='text-brand-500' /> Push Notifications
                                        </h3>
                                        <div className='space-y-4'>
                                            {[
                                                { key: 'pushNewJobs', label: 'New Job Matches', desc: 'Instant alerts when matching jobs are posted' },
                                                { key: 'pushMessages', label: 'Messages', desc: 'When you receive a new message from a recruiter' },
                                                { key: 'pushReminders', label: 'Reminders', desc: 'Application deadlines and follow-up reminders' },
                                            ].map(item => (
                                                <div key={item.key} className='flex items-center justify-between'>
                                                    <div>
                                                        <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>{item.label}</p>
                                                        <p className='text-xs text-gray-400 mt-0.5'>{item.desc}</p>
                                                    </div>
                                                    <Toggle enabled={notifPrefs[item.key]} onToggle={() => setNotifPrefs({ ...notifPrefs, [item.key]: !notifPrefs[item.key] })} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='border-t border-gray-100 dark:border-gray-700'></div>

                                    {/* Digest */}
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>Weekly Job Digest</p>
                                            <p className='text-xs text-gray-400 mt-0.5'>A weekly summary of top jobs and activity</p>
                                        </div>
                                        <Toggle enabled={notifPrefs.weeklyDigest} onToggle={() => setNotifPrefs({ ...notifPrefs, weeklyDigest: !notifPrefs.weeklyDigest })} />
                                    </div>
                                </div>
                                <div className='px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex justify-end'>
                                    <button onClick={handleSave} disabled={saving} className='btn-primary bg-brand-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-brand-600 flex items-center gap-2 disabled:opacity-50'>
                                        {saving ? <Loader2 size={16} className='animate-spin' /> : saved ? <Check size={16} /> : null}
                                        {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Preferences'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === PRIVACY TAB === */}
                        {activeTab === 'privacy' && (
                            <div className='bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-300'>
                                <div className='p-6 border-b border-gray-100 dark:border-gray-700'>
                                    <h2 className='text-lg font-bold text-gray-800 dark:text-white'>Privacy & Visibility</h2>
                                    <p className='text-sm text-gray-400 mt-1'>Control who can see your information</p>
                                </div>
                                <div className='p-6 space-y-5'>
                                    {[
                                        { key: 'profileVisible', label: 'Profile Visibility', desc: 'Allow your profile to appear in recruiter searches' },
                                        { key: 'showEmail', label: 'Show Email', desc: 'Display your email address on your public profile' },
                                        { key: 'showPhone', label: 'Show Phone Number', desc: 'Display your phone number on your public profile' },
                                        { key: 'allowRecruiterContact', label: 'Recruiter Contact', desc: 'Allow recruiters to contact you directly' },
                                        { key: 'searchableProfile', label: 'Searchable Profile', desc: 'Allow your profile to appear in search engines' },
                                    ].map(item => (
                                        <div key={item.key} className='flex items-center justify-between py-1'>
                                            <div>
                                                <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>{item.label}</p>
                                                <p className='text-xs text-gray-400 mt-0.5'>{item.desc}</p>
                                            </div>
                                            <Toggle enabled={privacyPrefs[item.key]} onToggle={() => setPrivacyPrefs({ ...privacyPrefs, [item.key]: !privacyPrefs[item.key] })} />
                                        </div>
                                    ))}
                                </div>
                                <div className='px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex justify-end'>
                                    <button onClick={handleSave} disabled={saving} className='btn-primary bg-brand-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-brand-600 flex items-center gap-2 disabled:opacity-50'>
                                        {saving ? <Loader2 size={16} className='animate-spin' /> : saved ? <Check size={16} /> : null}
                                        {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === APPEARANCE TAB === */}
                        {activeTab === 'appearance' && (
                            <div className='bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-300'>
                                <div className='p-6 border-b border-gray-100 dark:border-gray-700'>
                                    <h2 className='text-lg font-bold text-gray-800 dark:text-white'>Appearance</h2>
                                    <p className='text-sm text-gray-400 mt-1'>Customize your visual experience</p>
                                </div>
                                <div className='p-6'>
                                    <h3 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4'>Theme</h3>
                                    <div className='grid grid-cols-3 gap-3'>
                                        {[
                                            { id: 'light', label: 'Light', icon: <Sun size={20} />, preview: 'bg-white border-2' },
                                            { id: 'dark', label: 'Dark', icon: <Moon size={20} />, preview: 'bg-gray-800 border-2' },
                                            { id: 'system', label: 'System', icon: <Monitor size={20} />, preview: 'bg-gradient-to-r from-white to-gray-800 border-2' },
                                        ].map(t => (
                                            <button
                                                key={t.id}
                                                onClick={() => setTheme(t.id)}
                                                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 hover:shadow-sm ${theme === t.id ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400'}`}
                                            >
                                                <div className={`w-14 h-10 rounded-lg ${t.preview} ${theme === t.id ? 'border-brand-300 dark:border-brand-500' : 'border-gray-200 dark:border-gray-600'}`}></div>
                                                <div className='flex items-center gap-1.5'>
                                                    {t.icon}
                                                    <span className='text-sm font-medium'>{t.label}</span>
                                                </div>
                                                {theme === t.id && <Check size={16} className='text-brand-500' />}
                                            </button>
                                        ))}
                                    </div>

                                    <div className='mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 flex items-start gap-3'>
                                        <Globe size={18} className='text-blue-500 mt-0.5 shrink-0' />
                                        <div>
                                            <p className='text-sm font-medium text-blue-700 dark:text-blue-400'>Language & Region</p>
                                            <p className='text-xs text-blue-500 dark:text-blue-400/70 mt-0.5'>Currently set to <strong>English (India)</strong>. Language settings will be available in a future update.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
