import Types from '../../actionTypes'
import localStorage from '../../common/utils'
// 获取最热数据的异步action 异步action 需要配置redux-thunk 否则不能发动异步请求
export function onLoadPopularData(storeName, url) {
  return dispatch => {
    dispatch({
      type: Types.POPULAR_REFRESH,
      storeName
    })
    let dataStore = new localStorage()
    // 异步action
    dataStore.fetchData(url).
      then(data => {
        handleData(dispatch, storeName, data)
      }).catch(err => {
        console.log(err.message)
        dispatch({
          type: Types.LOAD_POPULAR_FAIL,
          storeName,
          err
        })
      })
  }
}

// 处理返回的数据
function handleData(dispatch, storeName, data) {
  dispatch({
    type: Types.LOAD_POPULAR_SUCCESS,
    items: data && data.data && data.data.items,
    storeName
  })
}