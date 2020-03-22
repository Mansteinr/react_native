/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import React, {Component} from 'react'
import { BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'
import NavigationUtil from '../navigator/navigatorUtil'
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
class Home extends Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props
    // index是0  代表是第一个了 不能在退了
    if (nav.routes[1].index === 0) {
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }
  render () {
    // 渲染的时候 将home的navigator保存起来 传给子组件  
    // 这样就可以解决 因为子组件应为navigator嵌套太多 而无法跳转路由的问题
    // 用 NavigationUtil 将最外层的navigator保存起来
    NavigationUtil.navigation = this.props.navigation
    return <DynamicTabNavigator/>
  }
}

const mapStateToProps = state=>({
  nav:state.nav
})

export default connect(mapStateToProps)(Home)