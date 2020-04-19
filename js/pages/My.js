/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import NavigationBar from '../common/NavigationBar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

const THEME_COLOR = '#678'

export default class My extends Component {
  getRightButton () {
    return <View style={{ flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => { }}>
        <View style={{ padding: 5, marginRight: 8}}>
          <Feather
            name={'search'}
            size={24}
            style={{color: 'white'}}
          ></Feather>
        </View>
      </TouchableOpacity>

    </View>
  }
  getLeftButton (callback) {
    return <TouchableOpacity
      style={{ padding : 8, paddingLeft: 12}}
      onPress={callback}>
        <View>
          <Ionicons
          name={'ios-arrow-back'}
          size={26}
          style={{color: 'white'}}
          ></Ionicons>
        </View>
      </TouchableOpacity>
  }

  render () {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = <NavigationBar
      title="我的"
      statusBar={statusBar}
      style={{ backgroundColor: THEME_COLOR }}
      leftButton = { this.getLeftButton() }
      rightButton = { this.getRightButton() }
    />
    
    return <SafeAreaView style={{ flex: 1 }}>
      {navigationBar}
      <Text style={styles.welcome}>MyPage</Text>
    </SafeAreaView>
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  tabStyle: {
    minWidth: 30
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#fff'
  },
  labelStyle: {
    fontSize: 13
  }
})
