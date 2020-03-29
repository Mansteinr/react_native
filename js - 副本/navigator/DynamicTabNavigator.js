/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * 就是将home组件中的 顶部导航器抽离出来
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
import { createBottomTabNavigator } from 'react-navigation-tabs'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import My from '../pages/My'
import Popular from '../pages/Popular'
import Trending from '../pages/Trending'
import Favorite from '../pages/Favorite'
import NavigationUtil from '../navigator/navigatorUtil'
import { BottomTabBar } from 'react-navigation-tabs'
import { connect } from 'react-redux'

const TABS = {
  Popular: {
    screen: Popular,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({ tintColor, focused }) =>
        <MaterialIcons
          name={'whatshot'}
          size={26}
          style={{color: tintColor}}
        />
      
    }
  },
  Trending: {
    screen: Trending,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'trending-up'}
          size={26}
          style={{color: tintColor}}
        />
      )
    }
  },
  Favorite: {
    screen: Favorite,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'favorite'}
          size={26}
          style={{color: tintColor}}
        />
      )
    }
  },
  My: {
    screen: My,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        <FontAwesome
          name={'user'}
          size={26}
          style={{color: tintColor}}
        />
      )
    }
  }
}

class DynamicTabNavigator extends Component {
  constructor(props) {
    super(props)
    // console.disableYellowBox = true // 禁止警告
  }
  _tabNavigator () {
    if (this.Tabs) {
      // 这样可以防止 每次应为state改变 而重新创建该createBottomTabNavigator
      return this.Tabs
    }
    const { Popular, My, Trending, Favorite } = TABS
    const tabs = { Popular,Trending, Favorite, My } // 在这里就可以根据需要动态配置底部导航器
 
    return this.Tabs = createBottomTabNavigator(tabs, {
      tabBarComponent: props => <TabBarComponent theme={this.props.theme} {...props}/>
    })
  }
  render () {
    const Tab = createAppContainer(this._tabNavigator())
    return <Tab/>
  }
}

class TabBarComponent extends Component {
  constructor(props) {
    super(props)
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime()
    }
  }

  render () {
    return <BottomTabBar
      {...this.props}
      activeTintColor={ this.props.theme }
    />
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator)