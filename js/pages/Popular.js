import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator, //圆形进度条
  RefreshControl
} from 'react-native'
// 关联store和组件
import { connect } from 'react-redux'
import actions from '../action'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import SafeAreaView from 'react-native-safe-area-view'
import PopularItem from '../common/PopularItem'
import NavigationBar from '../common/NavigationBar'
import Toast from 'react-native-easy-toast'
import { DeviceInfo } from 'react-native'
const URL = `https://api.github.com/search/repositories?q=`,
  QUEYR_STR = `&sort=stars`,
  THEME_COLOR = '#678'

export default class Popular extends Component {
  constructor(props) {
    super(props)
    // 定义顶部 tab
    this.tabsNames = ['Java', 'JavaScript', 'Adroid', 'React', 'ReactNative', 'Vue', 'HTML', 'CSS', 'ES6']
  }
  _genTabs() {
    const tabs = {}
    this.tabsNames.forEach((v, k) => {
      tabs[`tab${k}`] = {
        screen: props => <PopularTabPage {...props} tabLabel={v} />, // 通过该方法 可以传递参数
        navigationOptions: {
          title: v
        }
      }
    })
    return tabs
  }
  render () {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = <NavigationBar
      title="最热"
      statusBar={statusBar}
      style={{ backgroundColor: THEME_COLOR}}
    />
    const TabNavigator = createAppContainer(createMaterialTopTabNavigator(this._genTabs(), {
      tabBarOptions: {
        tabStyle: styles.tabStyle,
        upperCaseLabel: false, // 不设置的花都是大写
        scrollEnabled: true, // 可以滚动 安卓是会导致tabBar高度异常 所以在style设置高度为30
        style: { //  选项卡 背景色
          backgroundColor: '#678'
        },
        indicatorStyle: styles.indicatorStyle,
        labelStyle: styles.labelStyle // 文字样子
      }
    }))
    return <SafeAreaView style={{ flex: 1, marginTop: DeviceInfo.isIPhonex_deprecated ? 30 : 0 }}>
      { navigationBar }
      <TabNavigator />
    </SafeAreaView>
  }
}
const pageSize = 10
class PopularTab extends Component {
  constructor(props) {
    super(props)
    const { tabLabel } = this.props
    this.storeName = tabLabel
  }
  componentDidMount() {
    this.loadData()
  }
  loadData = (loadMore) => {
    const { onRefreshPopular, onLoadMorePopular } = this.props
    let url = this.genFetchUrl(this.storeName), store = this._store()
    if (loadMore) {
      console.log(loadMore, store, pageSize)
      // return
      onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
        this.refs.toast.show('没有更多了')
      })
    } else {
      onRefreshPopular(this.storeName, url, pageSize)
    }
  }
  genFetchUrl(key) {
    return URL + key + QUEYR_STR
  }
  renderItem(data) {
    const item = data.item
    return <PopularItem
      item={item}
      onSelect={() => { }}
    />
  }
  _store() {
    const { popular } = this.props
    let store = popular[this.storeName]
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [],//要显示的数据
        hideLoadingMore: true,//默认隐藏加载更多
      }
    }
    return store
  }
  genIndicator() {
    return this._store().hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }
  render() {
    let store = this._store()// 动态获取state

    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModels}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => item.id + ''}
          refreshControl={ //刷新组件
            <RefreshControl
              title='Loading'
              titleColor={ THEME_COLOR }
              colors={['yellow']}
              refreshing={store.isLoading} // 显示刷新进度条
              onRefresh={this.loadData}
              tintColor='green'
            />
          }
          onMomentumScrollBegin={() => {
            // 触犯滚动的时 可以加载更多
            this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
          }}
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            // this.loadData(true)
            setTimeout(() => { // 防止一次加载两个onEndReached
              if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                this.loadData(true)
                this.canLoadMore = false
              }
            }, 100)
          }}
          onEndReachedThreshold={0.5}
        />
        <Toast ref={'toast'}
          position={'center'}
          ></Toast>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  popular: state.popular //  订阅popular
})
const mapDispatchToProps = dispatch => ({
  onRefreshPopular: (storeName, url, pageSize) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
  onLoadMorePopular: (storeName, pageSize, pageIndex, items, callback) => dispatch(actions.onLoadMorePopular(storeName, pageSize, pageIndex, items, callback)),
})
// connect 只是个function 并不一定要放在export后面
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
    padding: 0
    // minWidth: 30 //  minWidth 会导致tabStyle初次加载时闪烁
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#fff'
  },
  labelStyle: {
    fontSize: 13,
    margin: 0
  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: 'red',
    margin: 10
  }
})
