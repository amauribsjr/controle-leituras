const BOOKS_KEY = 'reading-progress-books';

export const getBooks = () => {
  try {
    const books = localStorage.getItem(BOOKS_KEY);
    console.log('getBooks - Raw storage data:', books); // Debug log 1
    return books ? JSON.parse(books) : [];
  } catch (error) {
    console.error('getBooks - Error reading from localStorage:', error);
    return [];
  }
};

export const addBook = (book) => {
  try {
    console.log('addBook - Adding new book:', book); // Debug log 2
    const books = getBooks();
    console.log('addBook - Current books in storage:', books); // Debug log 3
    books.push(book);
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    console.log('addBook - Updated storage with new book'); // Debug log 4
  } catch (error) {
    console.error('addBook - Error saving to localStorage:', error);
  }
};

export const updateBook = (id, updatedBook) => {
  try {
    const books = getBooks();
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
      books[index] = updatedBook;
      localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    }
  } catch (error) {
    console.error('updateBook - Error:', error);
  }
};

export const deleteBook = (id) => {
  try {
    const books = getBooks();
    const filteredBooks = books.filter((book) => book.id !== id);
    localStorage.setItem(BOOKS_KEY, JSON.stringify(filteredBooks));
  } catch (error) {
    console.error('deleteBook - Error:', error);
  }
};
