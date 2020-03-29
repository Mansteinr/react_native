import Types from '../../actionTypes'
import { act } from 'react-test-renderer'
const defaultState = {
}
/**
 * 如何动态设置store 和动态获取store 难点storeKeh不固定
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction (state = defaultState, action) {
  switch (action.type) {
    case Types.POPULAR_REFRESH_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
          items: action.items,
          isLoading: false,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      }
    case Types.POPULAR_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
          hideLoadingMore: true, // 第一次刷新的时候 不需要加载更多
        }
      }
    case Types.POPULAR_REFRESH_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false
        }
      }
    case Types.POPULAR_LOAD_MORE_SUCCESS:
      console.log(action)
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      }
    case Types.POPULAR_LOAD_MORE_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex
        }
      }
    default:
      return state
  }
}
