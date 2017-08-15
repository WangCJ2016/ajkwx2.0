import Immutable from 'seamless-immutable'

const initialState = {
  tvs:[]
};


export default function TvReducer(state = Immutable(initialState), action) {
  switch (action.type) {
    case 'INITAILSTATE': {
      return Immutable.set(Immutable(state),'tvs',action.tv)
    }
    default:
      return state;
  }
}
