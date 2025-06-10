const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1';

export const searchBookSuggestions = async (query) => {
  try {
    const response = await fetch(
      `${GOOGLE_BOOKS_API}/volumes?q=${encodeURIComponent(query)}&maxResults=40&orderBy=relevance`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch book suggestions');
    }
    const data = await response.json();

    return (
      data.items?.map((item) => ({
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.[0] || 'Unknown Author',
        totalPages: item.volumeInfo.pageCount || 0,
      })) || []
    );
  } catch (error) {
    console.error('Error fetching book suggestions:', error);
    return [];
  }
};
