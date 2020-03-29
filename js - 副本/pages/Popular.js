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
  FlatList,
  RefreshControl
} from 'react-native'
// 关联store和组件
import { connect } from 'react-redux'
import actions from '../action'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import SafeAreaView from 'react-native-safe-area-view'
import PopularItem from '../common/PopularItem'

const URL = `https://api.github.com/search/repositories?q=`,
QUEYR_STR = `&sort=stars`
    
export default class Popular extends Component {
  constructor(props) {
    super(props)
    // 定义顶部 tab
    this.tabsNames = ['Java', 'JavaScript', 'Adroid', 'React', 'React Native', 'Vue', 'HTML', 'CSS', 'ES6']
  }
  _genTabs () {
    const tabs = {}
    this.tabsNames.forEach((v, k) => {
      tabs[`tab${k}`] = {
        screen: props => <PopularTabPage {...props} tabLabel={v}/>, // 通过该方法 可以传递参数
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
  constructor(props) {
    super(props)
    const { tabLabel } = this.props
    this.storeName = tabLabel
  }
  componentDidMount() {
    this.loadData()
  }
  loadData = () => {
    const { onLoadPopularData } = this.props
    let url = this.genFetchUrl(this.storeName)
    onLoadPopularData(this.storeName, url)
  }
  genFetchUrl(key) {
    return URL + key + QUEYR_STR
  }
  renderItem (data) {
    const item = data.item
    return <PopularItem
      item = {item}
      onSelect = {() => {}}
    />
  }
  render () {
    const { popular } = this.props
    let store = popular[this.storeName] // 动态获取state
    if(!store) {
      store = {
        items: [],
        isLoading: false
      }
    }
    return (
      <View style={styles.container}>
        <FlatList
          data = {store.items}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => item.id+''}
          refreshControl={ //刷新组件
            <RefreshControl
            title='Loading'
            titleColor= 'red'
            colors ={['yellow']}
            refreshing={store.isLoading} // 显示刷新进度条
            onRefresh={this.loadData}
            tintColor='green'
            />
          }
        />
      </View>
    )
  }
}

const mapStateToProps = state =>({
  popular: state.popular //  订阅popular
})
const mapDispatchToProps = dispatch =>({
  onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url))
})

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

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
