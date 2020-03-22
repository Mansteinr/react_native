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
  Text,
  Button
} from 'react-native'
import actions from '../action'
import { connect } from 'react-redux'
class Trending extends Component {
  render () {
    return (
      <View>
        <Text>Trending pages</Text>
        <Button
          title='改变颜色'
          onPress={() => {
            this.props.onThemeChange('#096')
          }}
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(null, mapDispatchToProps)(Trending)