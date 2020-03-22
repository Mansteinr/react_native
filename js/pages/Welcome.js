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
import NavigationUtil from '../navigator/navigatorUtil'

export default class Welcome extends Component {
  componentDidMount () {
    this.timer = setTimeout(() => {
      NavigationUtil.resetToHomePage({
        navigation: this.props.navigation
      })
    }, 2000)
  }

  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
  }
  render () {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>welfddcomdsde pages</Text>
      </View>
    )
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
  }
})
