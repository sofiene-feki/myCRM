export const paginationAndSortReducer = (state = { paginationModel: { page: 0, pageSize: 20 }, sortOptions: [{ field: 'date_de_la_signature', sort: 'desc' }] }, action) => {
  switch (action.type) {
    case 'SET_PAGINATION_MODEL':
      return { ...state, paginationModel: action.payload };
    case 'SET_SORT_MODEL':
      return { ...state, sortOptions: action.payload };
    default:
      return state;
  }
};
