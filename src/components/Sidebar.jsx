import './Sidebar.css';

const Sidebar = ({ folders, selectedFolder, onFolderSelect }) => {
    if (!folders || Object.keys(folders).length === 0) {
        return <div className="no-folders">No folders found.</div>;
    }

    return (
        <>
            {Object.keys(folders).map((folderName) => (
                <div
                    key={folderName}
                    className={`sidebar-item ${selectedFolder === folderName ? 'active' : ''}`}
                    onClick={() => onFolderSelect(folderName)}
                >
                    <span className="folder-icon">📁</span>
                    <span className="folder-name">{folderName}</span>
                </div>
            ))}
        </>
    );
};

export default Sidebar;
