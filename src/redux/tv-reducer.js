import {fromJS} from 'immutable';

const initialState = {
  tvs:[]
};


export default function TvReducer(state = initialState, action) {
  switch (action.type) {
    case 'INITAILSTATE': {
      return fromJS(state).set('tvs',action.tv).toJS();
    }

    case 'LOAD_ARTICLES_SUCCESS': {
      return fromJS(state).set('loading',false).set('error',false).set('articleList',action.payload).toJS();
    }

    case 'LOAD_ARTICLES_ERROR': {
      return fromJS(state).set('loading',false).set('error',true).toJS();
    }

    default:
      return state;
  }
}
