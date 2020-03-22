/**
 * 导航器配置类
 */

export default class NavigationUtil {
  // 跳转至指定页面
  static goPage (params, page) {
    const navigation = params.navigation
    console.log(NavigationUtil.navigation)
    console.log('.navigation')
    if (!navigation) {
      console.log(navigation + 'navigation不能为空')
      return
    }
    navigation.navigate(page, {...params})
  }
  // 返回上一页
  static goBack (navigation) {
    navigation.goBack()
  }
  // 重置到首页
  static resetToHomePage (params) {
    const { navigation } = params
    navigation.navigate('Main')
  }
}