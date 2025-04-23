'use client'
import Footer from '@/components/util/Footer';
import Header from '@/components/util/Header';
import Sidebar from '@/components/util/Sidebar';
import { ArrowUpDown, Check, ChevronLeft, ChevronRight, Edit, Eye, Filter, Trash } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

export default function Dashboard() {

    // Sample data for books
    const initialData = [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', status: 'Available', publishDate: '1925-04-10', price: '$12.99', coverImage: '/images/g.png' },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', status: 'Available', publishDate: '1960-07-11', price: '$14.99', coverImage: '/api/placeholder/200/300' },
        { id: 3, title: '1984', author: 'George Orwell', genre: 'Science Fiction', status: 'On Loan', publishDate: '1949-06-08', price: '$11.99', coverImage: '/api/placeholder/200/300' },
        { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', status: 'Available', publishDate: '1813-01-28', price: '$9.99', coverImage: '/api/placeholder/200/300' },
        { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', status: 'Available', publishDate: '1937-09-21', price: '$13.99', coverImage: '/api/placeholder/200/300' },
        { id: 6, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Coming-of-age', status: 'On Loan', publishDate: '1951-07-16', price: '$10.99', coverImage: '/api/placeholder/200/300' },
        { id: 7, title: 'Brave New World', author: 'Aldous Huxley', genre: 'Science Fiction', status: 'Available', publishDate: '1932-06-01', price: '$12.49', coverImage: '/api/placeholder/200/300' },
        { id: 8, title: 'Lord of the Flies', author: 'William Golding', genre: 'Adventure', status: 'Available', publishDate: '1954-09-17', price: '$11.49', coverImage: '/api/placeholder/200/300' },
        { id: 9, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fantasy', status: 'On Loan', publishDate: '1988-01-01', price: '$10.99', coverImage: '/api/placeholder/200/300' },
        { id: 10, title: 'Moby Dick', author: 'Herman Melville', genre: 'Adventure', status: 'Available', publishDate: '1851-10-18', price: '$12.99', coverImage: '/api/placeholder/200/300' },
        { id: 11, title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'Gothic', status: 'Available', publishDate: '1847-12-19', price: '$9.99', coverImage: '/api/placeholder/200/300' },
        { id: 12, title: 'Don Quixote', author: 'Miguel de Cervantes', genre: 'Classic', status: 'On Loan', publishDate: '1605-01-16', price: '$14.99', coverImage: '/api/placeholder/200/300' },
    ];

    // State for data
    const [data, setData] = useState(initialData);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8); // Showing 8 cards per page
    const [selectedRows, setSelectedRows] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [visibleColumns, setVisibleColumns] = useState({
        id: true,
        title: true,
        author: true,
        genre: true,
        status: true,
        publishDate: true,
        price: true,
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
                item.title.toLowerCase().includes(searchTerm) ||
                item.author.toLowerCase().includes(searchTerm) ||
                item.genre.toLowerCase().includes(searchTerm) ||
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
                        <h1 className="text-2xl font-bold text-gray-800">Book Inventory</h1>
                        <p className="text-gray-600">Manage your book collection</p>
                    </div>

                    {/* Card List Section */}
                    <div className="bg-white rounded-lg shadow text-black p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                            <h3 className="font-bold text-lg text-gray-700">Book Management</h3>
                            
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Sort dropdown */}
                                <div className="relative text-black">
                                    <select 
                                        className="pl-2 pr-8 py-2 border rounded-md appearance-none"
                                        value={`${sortConfig.key}-${sortConfig.direction}`}
                                        onChange={(e) => {
                                            const [key, direction] = e.target.value.split('-');
                                            setSortConfig({ key, direction });
                                        }}
                                    >
                                        <option value="id-asc">ID (Ascending)</option>
                                        <option value="id-desc">ID (Descending)</option>
                                        <option value="title-asc">Title (A-Z)</option>
                                        <option value="title-desc">Title (Z-A)</option>
                                        <option value="author-asc">Author (A-Z)</option>
                                        <option value="author-desc">Author (Z-A)</option>
                                        <option value="genre-asc">Genre (A-Z)</option>
                                        <option value="genre-desc">Genre (Z-A)</option>
                                        <option value="publishDate-asc">Publish Date (Oldest)</option>
                                        <option value="publishDate-desc">Publish Date (Newest)</option>
                                        <option value="price-asc">Price (Low to High)</option>
                                        <option value="price-desc">Price (High to Low)</option>
                                    </select>
                                    <ArrowUpDown size={16} className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
                                </div>
                                
                                {/* Filter input */}
                                <div className="relative text-black">
                                    <input
                                        type="text"
                                        placeholder="Search books..."
                                        className="pl-8 pr-4 py-2 border rounded-md w-full sm:w-auto"
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
                                        <span>Fields</span>
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

                                {/* Select all checkbox */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                                        onChange={toggleAllRows}
                                    />
                                    <span className="text-sm text-gray-500">Select All</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {paginatedData.map((book) => (
                                <div 
                                    key={book.id} 
                                    className={`border rounded-lg overflow-hidden shadow-sm ${
                                        selectedRows.includes(book.id) ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                                    }`}
                                >
                                    <div className="relative">
                                        {/* Selection checkbox */}
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(book.id)}
                                            onChange={() => toggleRowSelection(book.id)}
                                            className="absolute top-2 right-2 z-10 w-5 h-5"
                                        />
                                        
                                        {/* Book cover image */}
                                        <div className="flex justify-center bg-gray-50 p-4">
                                           <Image 
                                           src={book.coverImage}
                                             alt={book.title}
                                                width={300}
                                                height={300}
                                           />
                                        </div>
                                    </div>
                                    
                                    <div className="p-4">
                                        {visibleColumns.title && (
                                            <h4 className="font-medium text-gray-900 text-lg mb-1 line-clamp-1">{book.title}</h4>
                                        )}
                                        
                                        {visibleColumns.author && (
                                            <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
                                        )}
                                        
                                        <div className="space-y-2 text-sm mb-3">
                                            {visibleColumns.id && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">ID:</span>
                                                    <span className="text-gray-900">{book.id}</span>
                                                </div>
                                            )}
                                            
                                            {visibleColumns.genre && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Genre:</span>
                                                    <span className="text-gray-900">{book.genre}</span>
                                                </div>
                                            )}
                                            
                                            {visibleColumns.publishDate && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Published:</span>
                                                    <span className="text-gray-900">{book.publishDate}</span>
                                                </div>
                                            )}
                                            
                                            {visibleColumns.price && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Price:</span>
                                                    <span className="text-gray-900 font-medium">{book.price}</span>
                                                </div>
                                            )}
                                            
                                            {visibleColumns.status && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Status:</span>
                                                    <span className={`${
                                                        book.status === 'Available' ? 'text-green-600' : 'text-amber-600'
                                                    } font-medium`}>
                                                        {book.status}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {visibleColumns.actions && (
                                            <div className="flex justify-between border-t pt-3 mt-3">
                                                <button className="flex items-center text-blue-600 hover:text-blue-800">
                                                    <Eye size={16} className="mr-1" />
                                                    <span>View</span>
                                                </button>
                                                <button className="flex items-center text-green-600 hover:text-green-800">
                                                    <Edit size={16} className="mr-1" />
                                                    <span>Edit</span>
                                                </button>
                                                <button className="flex items-center text-red-600 hover:text-red-800">
                                                    <Trash size={16} className="mr-1" />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty state */}
                        {paginatedData.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 mb-2">No books found matching your criteria</p>
                                <p className="text-gray-400">Try adjusting your search or filters</p>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="py-4 mt-6 flex items-center justify-between border-t">
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
                                        of <span className="font-medium">{sortedData.length}</span> books
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