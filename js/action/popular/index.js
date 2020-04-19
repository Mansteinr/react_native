import Types from '../../actionTypes'
import { handleData } from '../actionUtils'
import localStorage, { FLAG_STORAGE } from '../../common/utils'
// 获取最热数据的异步action 异步action 需要配置redux-thunk 否则不能发动异步请求
export function onRefreshPopular(storeName, url, pageSize) {
  return dispatch => {
    dispatch({
      type: Types.POPULAR_REFRESH,
      storeName
    })
    let dataStore = new localStorage()
    // 异步action
    dataStore.fetchData(url, FLAG_STORAGE.flag_popular).
      then(data => {
        handleData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize)
      }).catch(err => {
        console.log(err.message)
        dispatch({
          type: Types.POPULAR_REFRESH_FAIL,
          storeName,
          err
        })
      })
  }
}

//对第一次加载的30条数据进行分拆
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callBack) {
  console.log(storeName, pageIndex, pageSize, dataArray)
  return dispatch => {
    setTimeout(() => { // 模拟网络请求
      
      if ((pageIndex - 1) * pageSize >= dataArray.length) { // 已经加载完数据
        if (typeof callBack === 'function') {
          callBack('no more')
        }
        dispatch({
          type: Types.POPULAR_LOAD_MORE_FAIL,
          error: 'no more',
          storeName: storeName,
          pageSize: --pageIndex,
          projectModels: dataArray
        })
      } else {
        // 本次加载的最大数量
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex
        
        dispatch({
          type: Types.POPULAR_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModels: dataArray.slice(0, max),
        })
      }
    }, 500)
  }
}