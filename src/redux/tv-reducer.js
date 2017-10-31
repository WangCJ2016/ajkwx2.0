
const initialState = {
  tvs:[]
};


export default function TvReducer(state = initialState, action) {
  switch (action.type) {
    case 'INITAILSTATE': {
      return {...state, 'tvs': action.tv}
    }
    default:
      return state;
  }
}
