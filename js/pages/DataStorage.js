/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { localStorage } from '../common/utils'
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  AsyncStorage
} from 'react-native'
const KEY = 'save_key'
export default class DataStorage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchKey: '',
      showText: ''
    }
    this.dataStorage = new localStorage()
  }

  onChangeText = (value) => {
    this.searchKey = value;
  }

  doSave = () => {
    let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
    this.dataStorage.fetchData(url).then(res => {
      let showData = `初次数据加载时间：${new Date(res.timestamp)}\n${JSON.stringify(res.data)}`
      this.setState({
        showText: showData
      })
    }).catch(err => {
      console.error(err.message)
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={ styles.welcome }>离线缓存框架设计</Text>
        <TextInput
          style={ styles.input }
          onChangeText={ this.onChangeText }
        />
        <View style={styles.input_container}>
          <Text style={styles.input_Text} onPress = { this.doSave }>
            存储
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
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 100,
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


