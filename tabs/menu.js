'use strict';

var React = require('react-native'),
    Header = require('../components/header'),
    Profile = require('./menu/profile'),
    History = require('./menu/history'),
    About = require('./menu/about'),
    Dispatcher = require('../dispatcher/dispatcher'),
    Constants = require('../constants/constants'),
    stylingHelper = require('./../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var ActionTypes = Constants.ActionTypes;

var {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var LOGOUT_REQUEST_URL = 'http://localhost:3000/logout'

var menuTab = React.createClass({
  getInitialState: function () {
    return {
      currentPage: 'menu'
    };
  },

  logout: function () {
    fetch(LOGOUT_REQUEST_URL, {
      method: 'GET'
    }).then(function () {
      AsyncStorage.multiRemove(['userId', 'token']);
      Dispatcher.dispatch({
        type: ActionTypes.LOGOUT
      });
    });
  },

  changePage: function(name) {
    if (name === undefined) {
      var name = 'menu';
    }
    this.setState({currentPage: name});
  },

  render: function() {
    var displayTab;
    if (this.state.currentPage ==='menu') {
      displayTab = (
        <View style={styles.innercontainer}>
          <TouchableHighlight style={styles.link} onPress={ () => { this.changePage('profile'); }}>
                <Text style={styles.text}>View Your Profile</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.link} onPress={ () => { this.changePage('history'); }}>
                <Text style={styles.text}>View Your History</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.link} onPress={ () => { this.changePage('about'); }}>
                <Text style={styles.text}>About Us</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.link} onPress={ () => { this.logout(); }}>
                <Text style={styles.text}>Logout</Text>
          </TouchableHighlight>
        </View>
      );
    } else if (this.state.currentPage === 'profile') {
      displayTab = (
        <Profile onback={this.changePage}/>
      );
    } else if (this.state.currentPage === 'history') {
      displayTab = (
        <History onback={this.changePage}/>
      );
    } else if (this.state.currentPage === 'about') {
      displayTab = (
        <About onback={this.changePage}/>
      );
    }

    return (
      <View style={ styles.container }>
        <Header />
        {displayTab}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: styleExtend({
  }, 'container'),
  innercontainer: styleExtend({
    padding: 20,
    flex: 1,
  }, 'center'),
  link: styleExtend({
    margin: 7
  }, 'center', 'button'),
  text: styleExtend({
  }, 'submitfont')
});

module.exports = menuTab;