import React from 'react';
import './BookmarkList.css';

const BookmarkList = ({ bookmarks }) => {
  if (!bookmarks || bookmarks.length === 0) {
    return <div className="bookmark-list empty">No bookmarks found.</div>;
  }

  return (
      <div className="bookmark-list">
        {bookmarks.map((bookmark, index) => (
            <a
                key={index}
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bookmark-item"
            >
              {/* Render the icon if provided */}
              {bookmark.icon ? (
                  <img src={bookmark.icon} alt="icon" className="bookmark-icon" />
              ) : (
                  <span className="bookmark-icon">🔖</span>
              )}
              <span className="bookmark-title">{bookmark.title}</span>
            </a>
        ))}
      </div>
  );
};

export default BookmarkList;
