const initialState = {
  error: false,  
  loading: true,
  Cars: [],
};

export const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SUCCESS':
      return {
        ...state,
        error: false,
        loading: false,
        Cars: action.payload,  
      };

    case 'GET_FAIL':
      return {
        ...state,  
        error: true,
        loading: false,  
      };

    default:
      return state; 
  }
};