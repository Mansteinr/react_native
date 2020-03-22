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

export default class Favorite extends Component {
  render () {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Favorite pages</Text>
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
