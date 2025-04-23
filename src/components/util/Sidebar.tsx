import { ChevronRight, LogOut, Menu, SquareKanban, User, X } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {

 const [sidebarOpen, setSidebarOpen] = useState(true);
    
const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
}
  return (
         <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 ease-in-out flex flex-col`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              {sidebarOpen ? (
                <>
                  <h1 className="text-xl font-bold">On Progress</h1>
                  <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-700">
                    <X size={20} />
                  </button>
                </>
              ) : (
                <button onClick={toggleSidebar} className="p-1 mx-auto rounded-md hover:bg-gray-700">
                  <Menu size={20} />
                </button>
              )}
            </div>
            
            <nav className="flex-1 overflow-y-auto pt-4">
              <ul>
                {[
                  { name: 'Home', href:'/dashboard', icon: <SquareKanban size={20} /> },
                  { name: 'Book', href:'/book', icon: <SquareKanban size={20} /> },
                  { name: 'List', href:'/listing', icon: <ChevronRight size={20} /> },
                  { name: 'Profile', href:'/profile', icon: <User size={20} /> },
                  { name: 'Logout', href:'/', icon: <LogOut size={20} /> }
                ].map((item, index) => (
                  <li key={index}>
                    <a href={item.href || "#"} className="flex items-center p-4 hover:bg-gray-700">
                      <span className="mr-3">{item.icon}</span>
                      {sidebarOpen && <span>{item.name}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
    
            <div className="p-4 border-t border-gray-700">
              {sidebarOpen ? (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-500 mr-3"></div>
                  <div>
                    <p className="font-semibold">User Name</p>
                    <p className="text-xs text-gray-400">user@example.com</p>
                  </div>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-500 mx-auto"></div>
              )}
            </div>
          </div>
  )
}
