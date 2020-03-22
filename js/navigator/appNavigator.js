import {
  createStackNavigator
} from 'react-navigation-stack'
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation-tabs'
import {
  createDrawerNavigator,
  DrawerItems
} from 'react-navigation-drawer'
import {
  // 当app启动的时候 跳转至欢迎页面 从欢迎页跳转至首页的时候
  // 这个时候 首页不需要返回欢迎页了
  //  如果用createStackNavigator 还会跳转至上一级路由 即欢迎页
  createSwitchNavigator // 用途是一次只显示一个页面。 默认情况下，它不处理返回操作，并在你切换时将路由重置为默认状态
} from 'react-navigation'


import React from 'react'
import My from '../pages/My'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import Welcome from '../pages/Welcome'
import Popular from '../pages/Popular'
import Favorite from '../pages/Favorite'
import Trending from '../pages/Trending'
import FetchDemo from '../pages/FetchDemo'
import DataStorage from '../pages/DataStorage'
import AsyncStorageDemo from '../pages/AsyncStorageDemo'

import { connect } from 'react-redux'
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers'

export const rootCom = 'Init' // 设置根路由 就是createSwitchNavigator包裹的两个




//初始化导航器 主要是用来加载welcome页面 之后跳转至主导航器
const initNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      headerShown: false // 可以通过header设置为null 来禁用StackNavigation的Navigation的bar 这样就可以全屏显示了
    }
  }
})
// 主导航器
const mainNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false // 可以通过header设置为null 来禁用StackNavigation的Navigation的bar 这样就可以全屏显示了
    }
  },
  Detail: {
    screen: Detail
  },
  Favorite: {
    screen: Favorite,
    navigationOptions: {
      headerShown: false // 可以通过header设置为null 来禁用StackNavigation的Navigation的bar 这样就可以全屏显示了
    }
  },
  My: {
    screen: My,
    navigationOptions: {
      headerShown: false // 可以通过header设置为null 来禁用StackNavigation的Navigation的bar 这样就可以全屏显示了
    }
  },
  Popular: {
    screen: Popular,
    navigationOptions: {
      headerShown: false // 可以通过header设置为null 来禁用StackNavigation的Navigation的bar 这样就可以全屏显示了
    }
  },
  Trending: {
    screen: Trending,
    navigationOptions: {
      headerShown: false // 可以通过header设置为null 来禁用StackNavigation的Navigation的bar 这样就可以全屏显示了
    }
  },
  FetchDemo: {
    screen: FetchDemo
  },
  DataStorage: {
    screen: DataStorage
  },
  AsyncStorageDemo: {
    screen: AsyncStorageDemo
  }
})

export const RootNavigator = createSwitchNavigator({
  Init: initNavigator,
  Main: mainNavigator
}, {
  navigationOptions: {
    headerShown: false // 可以通过header设置为null 来禁用StackNavigation的Navigation的bar 这样就可以全屏显示了
  }
})

/**
 * 1、初始化react-navigation与react-redux中间件
 * 该方法的一个很大作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * 
 */
export const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  'root' // 设置的key
)

/**
 * 2、将根导航器组件传递给createReduxContainer函数
 *    并返回一个navigation state 和dispatch函数作为props的新组件
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */

 const AppWithNavigationState = createReduxContainer(RootNavigator, 'root')

 /**
  * State到prosp的映射关系
  */

const mapStateToProps = state => ({
  state: state.nav
})
  
/**
 * 链接React组件与 Redux Store
 */
 export default connect(mapStateToProps)(AppWithNavigationState)