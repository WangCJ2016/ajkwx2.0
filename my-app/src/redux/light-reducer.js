import {fromJS} from 'immutable';

const initialState = {
  models:[],
  lights:[]
};
export default function(state=initialState,action){
  switch (action.type) {
    case 'GETMODELSCENE':
      return fromJS(state).set('models',action.models).toJS()
    case 'HOMELIGHTCHANGESTATE':
      return fromJS(state).setIn(['modelState',action.payload],true).setIn(['modelState',action.unpayload],false).toJS()
    case 'GETLIGHTWAYS':
      return fromJS(state).set('lights',action.lights).toJS()
    case 'CHANGELIGHTSTATUS':
        return fromJS(state).setIn(['lights',action.id,'status'],action.status).toJS()
    default:
      return state
  }
}
