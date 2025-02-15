/**
 * parseBookmarks
 * Parses a Netscape‑formatted bookmarks HTML string into an object:
 * {
 *   folderName1: [{ title, url, icon }, ...],
 *   folderName2: [...],
 *   ...
 * }
 */
export function parseBookmarks(htmlString) {
  // Use DOMParser to parse the HTML string
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const bookmarksData = {};

  // In Netscape format, folders are represented by <H3> elements
  // and links by <A> elements that follow.
  // This simple parser assumes a structure where an H3 is followed by a DL containing bookmarks.
  const h3Elements = doc.querySelectorAll('h3');
  h3Elements.forEach((h3) => {
    const folderName = h3.textContent.trim();
    // The next sibling <DL> should contain bookmark <A> elements.
    let dl = h3.nextElementSibling;
    if (dl && dl.nodeName.toLowerCase() === 'dl') {
      const aElements = dl.querySelectorAll('a');
      const bookmarks = [];
      aElements.forEach((a) => {
        bookmarks.push({
          title: a.textContent.trim(),
          url: a.getAttribute('href'),
          icon: a.getAttribute('icon') || '' // Captures the icon attribute if available
        });
      });
      bookmarksData[folderName] = bookmarks;
    }
  });
  console.log("Parsed Bookmarks Data:", bookmarksData);
  return bookmarksData;
}
