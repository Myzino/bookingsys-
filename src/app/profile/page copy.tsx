'use client'
import Footer from '@/components/util/Footer';
import Header from '@/components/util/Header';
import Sidebar from '@/components/util/Sidebar';
import { Milestone, Shield, User, UserCheck } from 'lucide-react';
import Image from 'next/image'
import { useState } from 'react';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('profile');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    const CardData = [
        { title: 'Admin', icon: <Shield className="text-blue-500" />, description:'Total Admin: 1' },
        { title: 'User', icon: <User className="text-green-500" />, description:'Total Users: 3' },
        { title: 'Appointments', icon: <Milestone className="text-yellow-500" />, description:'Total Appointments: 5' },
    ]

    // Mock user data
    const userData = {
        fullName: "John Doe",
        email: "john.doe@example.com",
        role: "Admin",
        dateJoined: "January 15, 2023",
        lastLogin: "April 20, 2025",
        isVerified: true,
        recentActivity: [
            { type: "Login", date: "April 20, 2025", details: "Logged in from Chrome/Windows" },
            { type: "Appointment", date: "April 18, 2025", details: "Booked appointment #A12345" },
            { type: "Profile", date: "April 15, 2025", details: "Updated profile picture" }
        ]
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                {/* Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
                        <p className="text-gray-600">Manage your account information and preferences</p>
                    </div>

                    {/* Dashboard cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {CardData.map(({ title, icon, description }) => (
                            <div key={title} className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center mb-2">
                                    <span className="mr-3">{icon}</span>
                                    <h3 className="font-bold text-gray-700">{title}</h3>
                                </div>
                                <p className="text-black text-sm p-2 font-bold">{description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Profile Management Content */}
                    <div className="bg-white rounded-lg shadow">
                        {/* Profile Tabs */}
                        <div className="flex border-b px-6">
                            <button 
                                className={`py-4 px-6 font-medium text-sm ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('profile')}
                            >
                                Basic Info
                            </button>
                            <button 
                                className={`py-4 px-6 font-medium text-sm ${activeTab === 'security' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('security')}
                            >
                                Security
                            </button>
                            <button 
                                className={`py-4 px-6 font-medium text-sm ${activeTab === 'activity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('activity')}
                            >
                                Activity
                            </button>
                            <button 
                                className={`py-4 px-6 font-medium text-sm ${activeTab === 'notifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('notifications')}
                            >
                                Notifications
                            </button>
                        </div>

                        {/* Profile Content */}
                        <div className="p-6">
                            {activeTab === 'profile' && (
                                <div>
                                    <div className="flex items-start mb-6">
                                        <div className="mr-6">
                                            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                                <img src="/api/placeholder/96/96" alt="Profile" className="w-full h-full object-cover" />
                                            </div>
                                            <button className="mt-2 w-full text-xs text-blue-600 hover:underline">Change Picture</button>
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-4">
                                                <div className="flex items-center mb-2">
                                                    <h3 className="text-lg font-bold">{userData.fullName}</h3>
                                                    {userData.isVerified && (
                                                        <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">Verified</span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    <p className="mb-1">Role: <span className="font-medium">{userData.role}</span></p>
                                                    <p className="mb-1">Email: <span className="font-medium">{userData.email}</span></p>
                                                    <p className="mb-1">Member since: <span className="font-medium">{userData.dateJoined}</span></p>
                                                    <p>Last login: <span className="font-medium">{userData.lastLogin}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-6">
                                        <h4 className="font-medium mb-4">Edit Profile Information</h4>
                                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <input type="text" defaultValue={userData.fullName} className="w-full p-2 border rounded-md" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                                <input type="email" defaultValue={userData.email} className="w-full p-2 border rounded-md" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div>
                                    <div className="mb-8">
                                        <h4 className="font-medium mb-4">Change Password</h4>
                                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                                <input type="password" className="w-full p-2 border rounded-md" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                                <input type="password" className="w-full p-2 border rounded-md" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                                <input type="password" className="w-full p-2 border rounded-md" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                                    Update Password
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="mb-8 border-t pt-6">
                                        <h4 className="font-medium mb-4">Two-Factor Authentication</h4>
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                                            <div>
                                                <p className="font-medium">Enhance your account security</p>
                                                <p className="text-sm text-gray-600">Require a verification code when logging in</p>
                                            </div>
                                            <div className="flex items-center">
                                                <label className="inline-flex relative items-center cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        className="sr-only peer" 
                                                        checked={twoFactorEnabled}
                                                        onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        </div>
                                        {twoFactorEnabled && (
                                            <div className="mt-4 p-4 border rounded-md">
                                                <p className="mb-2">Scan this QR code with your authenticator app:</p>
                                                <div className="bg-white p-4 inline-block">
                                                    <img src="/api/placeholder/160/160" alt="QR Code" className="w-40 h-40" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-t pt-6">
                                        <h4 className="font-medium mb-4 text-red-600">Danger Zone</h4>
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">Delete Account</p>
                                                    <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                                                </div>
                                                <button 
                                                    className="bg-white text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50"
                                                    onClick={() => setShowDeleteConfirmation(true)}
                                                >
                                                    Delete Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delete Account Confirmation Modal */}
                                    {showDeleteConfirmation && (
                                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                                                <h3 className="text-lg font-bold mb-4">Are you sure?</h3>
                                                <p className="mb-6">This action cannot be undone. All your data will be permanently deleted.</p>
                                                <div className="flex justify-end space-x-3">
                                                    <button 
                                                        className="bg-gray-200 px-4 py-2 rounded-md"
                                                        onClick={() => setShowDeleteConfirmation(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button className="bg-red-600 text-white px-4 py-2 rounded-md">
                                                        Yes, Delete My Account
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'activity' && (
                                <div className='text-black'>
                                    <h4 className="font-medium mb-4">Recent Activity</h4>
                                    <div className="bg-white rounded-lg border">
                                        <div className="divide-y">
                                            {userData.recentActivity.map((activity, index) => (
                                                <div key={index} className="flex items-start p-4">
                                                    <div className="mr-4 mt-1">
                                                        {activity.type === 'Login' && <UserCheck className="text-blue-500" size={20} />}
                                                        {activity.type === 'Appointment' && <Milestone className="text-green-500" size={20} />}
                                                        {activity.type === 'Profile' && <User className="text-purple-500" size={20} />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between">
                                                            <p className="font-medium">{activity.type}</p>
                                                            <p className="text-sm text-gray-500">{activity.date}</p>
                                                        </div>
                                                        <p className="text-sm text-gray-600">{activity.details}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                                        <div>
                                            <h4 className="font-medium mb-4">Recent Bookings</h4>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-center text-gray-500 p-6">No recent bookings</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-4">Login History</h4>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <div className="mb-3 pb-3 border-b">
                                                    <div className="flex justify-between mb-1">
                                                        <p className="font-medium">Chrome / Windows</p>
                                                        <p className="text-sm text-gray-500">April 20, 2025</p>
                                                    </div>
                                                    <p className="text-sm text-gray-600">192.168.1.1 • Current session</p>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between mb-1">
                                                        <p className="font-medium">Safari / MacOS</p>
                                                        <p className="text-sm text-gray-500">April 18, 2025</p>
                                                    </div>
                                                    <p className="text-sm text-gray-600">192.168.1.2</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <h4 className="font-medium mb-6 text-center">Notifications Settings</h4>
                                    <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                                       <Image 
                                       src=""
                                       width={}
                                       height={}
                                       alt=""
                                       />
                                    </div>
                                    <p className="text-gray-600 text-center">Feature under development</p>
                                    <p className="text-sm text-gray-500 text-center mt-2">Notification preferences will be available soon.</p>
                                </div>
                            )}

                            {userData.role === 'Admin' && activeTab === 'admin' && (
                                <div>
                                    <h4 className="font-medium mb-4">Admin Actions</h4>
                                    {/* Admin-specific features would go here */}
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}