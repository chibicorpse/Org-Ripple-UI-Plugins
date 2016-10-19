import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.CLIENTNOTES, types.CLIENTNOTES_SUCCESS, types.CLIENTNOTES_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/clinicalNotes'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId, source) {
  return {
    types: [types.CLIENTNOTES_GET, types.CLIENTNOTES_GET_SUCCESS, types.CLIENTNOTES_GET_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/clinicalNotes/' + compositionId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.CLIENTNOTES_CREATE, types.CLIENTNOTES_CREATE_SUCCESS, types.CLIENTNOTES_CREATE_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/clinicalNotes',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.CLIENTNOTES_UPDATE, types.CLIENTNOTES_UPDATE_SUCCESS, types.CLIENTNOTES_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/clinicalNotes',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function clinicalnotesActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

clinicalnotesActions.$inject = ['$ngRedux'];