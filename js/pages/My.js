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
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import SafeAreaView from 'react-native-safe-area-view'
import NavigationUtil from '../navigator/navigatorUtil'

export default class Popular extends Component {
  constructor(props) {
    super(props)
    // 定义顶部 tab
    this.tabsNames = ['Java', 'JavaScript', 'Adroid', 'React', 'React Native', 'Vue', 'HTML', 'CSS', 'ES6']
  }
  _genTabs () {
    const tabs = {};
    this.tabsNames.forEach((v, k) => {
      tabs[`tab${k}`] = {
        screen: props => <PopularTab {...props} tabLabel={v}/>, // 通过该方法 可以传递参数
        navigationOptions: {
          title: v
        }
      }
    })
    return tabs
  }
  render () {
    const TabNavigator = createAppContainer(createMaterialTopTabNavigator(this._genTabs(), {
      tabBarOptions: {
        tabStyle: styles.tabStyle,
        upperCaseLabel: false, // 不设置的花都是大写
        scrollEnabled: true, // 可以滚动
        style: { //  选项卡 背景色
          backgroundColor: '#678'
        },
        indicatorStyle: styles.indicatorStyle,
        labelStyle: styles.labelStyle // 文字样子
      }
    }))
    return <SafeAreaView style={{flex: 1}}>
      <TabNavigator/>
    </SafeAreaView>
  }
}

class PopularTab extends Component {
  render () {
    const { tabLabel } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> {tabLabel}</Text>
        <Text onPress={() => {
          // 这样的waic点击没有效果 应该多层navigator嵌套导致的 
          // 最内层的nivigator无法跳转至最外层navigator所定义的页面
          // 可以外层navigator 用该外曾navigator跳转
          NavigationUtil.goPage({
            navigation: NavigationUtil.navigation
          }, 'Detail')
        }} style={styles.welcome}> 跳转至详情页 </Text>
        <Text onPress={() => {
          NavigationUtil.goPage({
            navigation: NavigationUtil.navigation
          }, 'FetchDemo')
        }} style={styles.welcome}> 跳转至详FetchDemo </Text>
        <Text onPress={() => {
          NavigationUtil.goPage({
            navigation: NavigationUtil.navigation
          }, 'AsyncStorageDemo')
        }} style={styles.welcome}> 跳转至详AsyncStorage </Text>
        <Text onPress={() => {
          NavigationUtil.goPage({
            navigation: NavigationUtil.navigation
          }, 'DataStorage')
        }} style={styles.welcome}> 跳转至详DataStorage </Text>
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
