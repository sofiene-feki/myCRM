export const filtersReducer = (state = { serverData: null, serverFilters: {
  partenaire: '',
  qualificationQté: '',
  qualificationWc: '',
  fournisseur: '',
  date : [
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ],
}}, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return { ...state, ...action.payload };
    case 'SET_SERVER_DATA':
      return { ...state, serverData: action.payload };
    case 'RESET_FILTERS':
      return {  serverFilters: {
        partenaire: '',
        qualificationQté: '',
        qualificationWc: '',
        fournisseur: '',
        date : [
          {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
          }
        ],
      }};
    default:
      return state;
  }
};
