export function validateBook(book) {
  const errors = {};

  if (!book.title?.trim()) {
    errors.title = 'O título é obrigatório';
  }

  if (!book.author?.trim()) {
    errors.author = 'O autor é obrigatório';
  }

  if (!book.totalPages) {
    errors.totalPages = 'O número total de páginas é obrigatório';
  } else if (Number(book.totalPages) <= 0) {
    errors.totalPages = 'O número total de páginas deve ser maior que zero';
  }

  if (book.currentPage < 0) {
    errors.currentPage = 'A página atual não pode ser negativa';
  } else if (Number(book.currentPage) > Number(book.totalPages)) {
    errors.currentPage = 'A página atual não pode ser maior que o total de páginas';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
