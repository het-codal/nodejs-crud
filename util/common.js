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
  const result = await data
    .skip(offset)
    .limit(limit)
    .sort({ [sortKey]: sortBy });
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

exports.arrayGet = async (key, data, defaultValue) => {
  if (
    Array.isArray(data) &&
    key in data &&
    data[key] != "" &&
    data[key] !== undefined
  ) {
    return data[key];
  }
  return defaultValue;
};

exports.objectToArray = async (data) => {
  let newData = [];
  if (typeof data === "object") {
    data = await Object.entries(data);
    for (var i = 0; i < data.length; i++) {
      newData[data[i][0]] = data[i][1];
    }
  } else {
    return data;
  }
  return newData;
};
