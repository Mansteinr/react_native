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
  AsyncStorage
} from 'react-native'
const KEY = 'save_key'
export default class DataStorageAsyncStorageDemo extends Component {

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

  doSave = () => {
    // 用法一
    AsyncStorage.setItem(KEY, this.value, err => {
      err && console.log(err.toString())
    })
    // 用法二
    // AsyncStorage.setItem(KEY, this.value)
    //   .catch(err => {
    //     console.log(err.toString())
    //   })
    // 用法三
    // try {
    //   await AsyncStorage.setItem(KEY, this.value)
    // } catch (error) {
    //   error && console.log(error.toString())
    // }
  }
  getData = () => {
    // 用法一
    AsyncStorage.getItem(KEY, (error, value) => {
      this.setState({
        showText: value
      })
      error && console.log(error.toString())
    })
  }
  doRemove = () => {
    AsyncStorage.removeItem(KEY, err => {
      err && console.log(err.toString())
    })
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={ styles.welcome }>AsyncStorage使用</Text>
        <TextInput
          style={ styles.input }
          onChangeText={ this.onChangeText }
        />
        <View style={styles.input_container}>
          <Text style={styles.input_Text} onPress = { this.doSave }>
            存储
          </Text>
          <Text style={styles.input_Text} onPress = { this.doRemove }>
            删除
          </Text>
          <Text style={styles.input_Text} onPress = { this.getData }>
            获取
          </Text>
        </View>
        <Text>{ this.state.showText }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
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
    height: 50,
    borderColor: 'red',
    borderWidth: 1
  },
  input_Text: {
    backgroundColor: '#789',
    height: 50,
    flex: 1,
    textAlignVertical: 'center',
    textAlign:'center',
    color: '#fff',
    margin: 10,
    borderRadius: 6
  }
})


