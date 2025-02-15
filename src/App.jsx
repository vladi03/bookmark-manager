import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import BookmarkList from './components/BookmarkList';
import { parseBookmarks } from './utils/parseBookmarks';
import './App.css';

function App() {
  const [folders, setFolders] = useState({});
  const [selectedFolder, setSelectedFolder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarksData');
    if (savedBookmarks) {
      const parsedData = JSON.parse(savedBookmarks);
      setFolders(parsedData);
      setSelectedFolder(Object.keys(parsedData)[0] || '');
      setIsFileLoaded(true);
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target.result;
        const parsedData = parseBookmarks(result);
        setFolders(parsedData);
        setSelectedFolder(Object.keys(parsedData)[0] || '');
        localStorage.setItem('bookmarksData', JSON.stringify(parsedData));
        setIsFileLoaded(true);
      } catch (error) {
        console.error('Error parsing bookmarks file:', error);
      }
    };
    reader.readAsText(file);
  };

  const handleReload = () => {
    localStorage.removeItem('bookmarksData');
    setFolders({});
    setSelectedFolder('');
    setIsFileLoaded(false);
  };

  // Compute filtered bookmarks based on searchTerm
  const filteredBookmarks =
      selectedFolder && folders[selectedFolder]
          ? folders[selectedFolder].filter((bookmark) =>
              bookmark.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          : [];

  return (
      <div className="app-container">
        <header className="app-header">
          <button className="toggle-sidebar" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            ☰
          </button>
          <h1>📑 Bookmark Manager</h1>
          <div className="file-upload-container">
            {isFileLoaded ? (
                <button className="file-upload-label" onClick={handleReload}>
                  Reload Bookmarks
                </button>
            ) : (
                <>
                  <label htmlFor="file-upload" className="file-upload-label">
                    Upload Bookmarks
                  </label>
                  <input
                      id="file-upload"
                      type="file"
                      accept=".html,.htm"
                      className="file-upload"
                      onChange={handleFileUpload}
                  />
                </>
            )}
          </div>
        </header>

        <div className="app-body">
          <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <Sidebar
                folders={folders}
                selectedFolder={selectedFolder}
                onFolderSelect={(folder) => {
                  setSelectedFolder(folder);
                  setIsSidebarOpen(false);
                }}
            />
          </div>

          <main className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            {/* Pass the filtered bookmarks instead of all bookmarks */}
            <BookmarkList bookmarks={filteredBookmarks} />
          </main>
        </div>
      </div>
  );
}

export default App;
