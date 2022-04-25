exports.getCurrentUser = async (user) => {
  return user;
};

exports.getPagination = async (
  data,
  page,
  size,
  totalItems,
  sortBy,
  sortKey
) => {
  page = page ? page - 1 : page;
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  totalItems = await data.count();
  const result = await data.skip(offset).limit(limit);
  page = page + 1;
  const currentPage = page;
  const nextPage = page + 1;
  const totalPages = Math.ceil(totalItems / limit);
  const lastPage = totalPages;
  const previousPage = currentPage === 1 ? 1 : currentPage - 1;
  const firstPage = 1;
  return {
    result,
    totalItems,
    totalPages,
    previousPage,
    currentPage,
    nextPage,
    firstPage,
    lastPage,
  };
};
