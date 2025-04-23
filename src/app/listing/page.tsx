'use client'
import Footer from '@/components/util/Footer';
import Header from '@/components/util/Header';
import Sidebar from '@/components/util/Sidebar';
import { ArrowUpDown, Check, ChevronLeft, ChevronRight, Edit, Eye, Filter, Trash } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Dashboard() {

    // Sample data for the table
    const initialData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2025-04-21' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2025-04-20' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'User', status: 'Inactive', lastLogin: '2025-04-15' },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'User', status: 'Active', lastLogin: '2025-04-19' },
        { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'Admin', status: 'Active', lastLogin: '2025-04-21' },
        { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', role: 'User', status: 'Inactive', lastLogin: '2025-04-10' },
        { id: 7, name: 'David Miller', email: 'david@example.com', role: 'User', status: 'Active', lastLogin: '2025-04-18' },
        { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', role: 'User', status: 'Active', lastLogin: '2025-04-17' },
        { id: 9, name: 'Thomas Taylor', email: 'thomas@example.com', role: 'Admin', status: 'Active', lastLogin: '2025-04-16' },
        { id: 10, name: 'Jessica White', email: 'jessica@example.com', role: 'User', status: 'Inactive', lastLogin: '2025-04-14' },
        { id: 11, name: 'Daniel Clark', email: 'daniel@example.com', role: 'User', status: 'Active', lastLogin: '2025-04-13' },
        { id: 12, name: 'Olivia Martin', email: 'olivia@example.com', role: 'User', status: 'Active', lastLogin: '2025-04-12' },
    ];

    // State for data table
    const [data, setData] = useState(initialData);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedRows, setSelectedRows] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [visibleColumns, setVisibleColumns] = useState({
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        lastLogin: true,
        actions: true
    });
    const [columnMenuOpen, setColumnMenuOpen] = useState(false);

    // Sorting function
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Filter function
    const filteredData = useMemo(() => {
        return data.filter(item => {
            const searchTerm = filterValue.toLowerCase();
            return (
                item.name.toLowerCase().includes(searchTerm) ||
                item.email.toLowerCase().includes(searchTerm) ||
                item.role.toLowerCase().includes(searchTerm) ||
                item.status.toLowerCase().includes(searchTerm)
            );
        });
    }, [data, filterValue]);

    // Sort function
    const sortedData = useMemo(() => {
        const sortableData = [...filteredData];
        sortableData.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        return sortableData;
    }, [filteredData, sortConfig]);

    // Pagination
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        return sortedData.slice(startIndex, startIndex + rowsPerPage);
    }, [sortedData, currentPage, rowsPerPage]);

    // Row selection handlers
    const toggleRowSelection = (id) => {
        setSelectedRows(prev => {
            if (prev.includes(id)) {
                return prev.filter(rowId => rowId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const toggleAllRows = () => {
        if (selectedRows.length === paginatedData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(paginatedData.map(row => row.id));
        }
    };

    // Column visibility handler
    const toggleColumnVisibility = (column) => {
        setVisibleColumns(prev => ({
            ...prev,
            [column]: !prev[column]
        }));
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
                        <h1 className="text-2xl font-bold text-gray-800">Listing Overview</h1>
                        <p className="text-gray-600">Welcome to your Listing panel</p>
                    </div>

                    {/* Dashboard cards */}

                    {/* Data Table Section */}
                    <div className="bg-white rounded-lg shadow text-black p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-700">User Management</h3>
                            
                            <div className="flex items-center space-x-2">
                                {/* Filter input */}
                                <div className="relative text-black">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="pl-8 pr-4 py-2 border rounded-md"
                                        value={filterValue}
                                        onChange={(e) => setFilterValue(e.target.value)}
                                    />
                                    <Filter size={16} className="absolute left-2 top-3 text-gray-400" />
                                </div>
                                
                                {/* Column visibility dropdown */}
                                <div className="relative">
                                    <button 
                                        className="px-3 py-2 border rounded-md flex items-center"
                                        onClick={() => setColumnMenuOpen(!columnMenuOpen)}
                                    >
                                        <Eye size={16} className="mr-1" />
                                        <span>Columns</span>
                                    </button>
                                    
                                    {columnMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                                            {Object.keys(visibleColumns).map(column => (
                                                <div 
                                                    key={column} 
                                                    className="px-4 py-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => toggleColumnVisibility(column)}
                                                >
                                                    <span className="capitalize">{column}</span>
                                                    {visibleColumns[column] && <Check size={16} />}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                                                    onChange={toggleAllRows}
                                                />
                                            </div>
                                        </th>
                                        {visibleColumns.id && (
                                            <th 
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('id')}
                                            >
                                                <div className="flex items-center">
                                                    <span>ID</span>
                                                    <ArrowUpDown size={16} className="ml-1" />
                                                </div>
                                            </th>
                                        )}
                                        {visibleColumns.name && (
                                            <th 
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('name')}
                                            >
                                                <div className="flex items-center">
                                                    <span>Name</span>
                                                    <ArrowUpDown size={16} className="ml-1" />
                                                </div>
                                            </th>
                                        )}
                                        {visibleColumns.email && (
                                            <th 
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('email')}
                                            >
                                                <div className="flex items-center">
                                                    <span>Email</span>
                                                    <ArrowUpDown size={16} className="ml-1" />
                                                </div>
                                            </th>
                                        )}
                                        {visibleColumns.role && (
                                            <th 
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('role')}
                                            >
                                                <div className="flex items-center">
                                                    <span>Role</span>
                                                    <ArrowUpDown size={16} className="ml-1" />
                                                </div>
                                            </th>
                                        )}
                                        {visibleColumns.status && (
                                            <th 
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('status')}
                                            >
                                                <div className="flex items-center">
                                                    <span>Status</span>
                                                    <ArrowUpDown size={16} className="ml-1" />
                                                </div>
                                            </th>
                                        )}
                                        {visibleColumns.lastLogin && (
                                            <th 
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('lastLogin')}
                                            >
                                                <div className="flex items-center">
                                                    <span>Last Login</span>
                                                    <ArrowUpDown size={16} className="ml-1" />
                                                </div>
                                            </th>
                                        )}
                                        {visibleColumns.actions && (
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedData.map((row) => (
                                        <tr key={row.id} className={selectedRows.includes(row.id) ? "bg-blue-50" : ""}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(row.id)}
                                                    onChange={() => toggleRowSelection(row.id)}
                                                />
                                            </td>
                                            {visibleColumns.id && (
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {row.id}
                                                </td>
                                            )}
                                            {visibleColumns.name && (
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{row.name}</div>
                                                </td>
                                            )}
                                            {visibleColumns.email && (
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{row.email}</div>
                                                </td>
                                            )}
                                            {visibleColumns.role && (
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {row.role}
                                                </td>
                                            )}
                                            {visibleColumns.status && (
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                            )}
                                            {visibleColumns.lastLogin && (
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {row.lastLogin}
                                                </td>
                                            )}
                                            {visibleColumns.actions && (
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <button className="text-blue-600 hover:text-blue-900">
                                                            <Eye size={18} />
                                                        </button>
                                                        <button className="text-green-600 hover:text-green-900">
                                                            <Edit size={18} />
                                                        </button>
                                                        <button className="text-red-600 hover:text-red-900">
                                                            <Trash size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="py-3 flex items-center justify-between">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{" "}
                                        <span className="font-medium">
                                            {Math.min(currentPage * rowsPerPage, sortedData.length)}
                                        </span>{" "}
                                        of <span className="font-medium">{sortedData.length}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`relative inline-flex items-center px-4 py-2 border ${
                                                    currentPage === page
                                                        ? 'bg-blue-50 border-blue-500 text-blue-600'
                                                        : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                                                } text-sm font-medium`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}