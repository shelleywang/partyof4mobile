// UserStore.js

var Dispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/constants');
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _store = {};

var _storeData = function (data) {
  for (var x in data) {
    _store[x] = data[x];
  }
};

var _clearData = function () {
  for (var x in _store) {
    _store[x] = null;
  }
};

var UserStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getData: function () {
    return _store;
  }

});

UserStore.dispatchToken = Dispatcher.register(function (action) {

  switch(action.type) {

    case ActionTypes.STORE_USER:
      _storeData(action.payload);
      UserStore.emitChange();
      break;

    case ActionTypes.LOGOUT:
      _clearData();
      UserStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = UserStore;