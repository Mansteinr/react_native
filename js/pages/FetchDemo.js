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
  TextInput,
  Button
} from 'react-native'

export default class FetchDemo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchKey: '',
      showText: ''
    }
  }

  onChangeText = (value) => {
    this.searchKey = value;
  }

  loadData () {
    let url = `https://github.com/search?q=${this.searchKey}`
    fetch(url)
      .then((response) => {
        if (response.ok) {
         return response.text()
        }
        throw new Error('response was not ok')
    })
    .then((responseText) => {
      this.setState({
        showText: responseText
      })
    })
    .catch((error) => {
      console.error(error)
    })
  }
  render () {
    const { navigation } = this.props
    return (
      <View style={ styles.container }>
        <Text style={ styles.welcome }>FetchDemo pages</Text>
        <View style={styles.input_container}>
          <TextInput
            style={ styles.input }
            onChangeText={ this.onChangeText }
          />
          <Button
            title='获取'
            onPress={() => {
              this.loadData()
            }}
          />
        </View>
        <Text>{ this.state.showText }</Text>
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
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'red',
    borderWidth: 1
  }
})
