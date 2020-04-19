import React from 'react'
import {  AsyncStorage } from 'react-native'
import Trending from 'gitreactnativeplugin'
// 操作标识符 popular和trending模块数据处理不一样 所以用标识符以示区别
export const FLAG_STORAGE = { flag_popular: 'popular', flag_trending: 'trending' }

export class localStorage {

  /**
   * 保存数据
   */
  saveData(url, data, callback) {
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback)
  }
 
  // 获取数据
  /**
   *  是标识符 因为popluar和trending数据结构不一样  故穿个标识符 以示区别
   */
  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if(!error) {
          try{
            resolve(JSON.parse(result))
          } catch(e) {
            reject(e)
          }
        } else {
          reject(error)
        }
      })
    })
  }

  /**
   * 获取网络数据
   */
  fetchNetData(url, flag) {
    console.log(url, flag, 'fetchNetData')
    return new Promise((resolve, reject) => {
      if (flag !== FLAG_STORAGE.flag_trending) {
        fetch(url)
        .then(response => {
          if(response.ok) {
            return response.json()
          }
          throw new Error('Network response was not ok')
        })
        .then(responseData => {
          this.saveData(url, responseData)
          resolve(responseData)
        })
        .catch(error => {
          reject(error)
        })
      } else {
        new Trending().fetchTrending(url)
          .then(items => {
            console.log(items, 'Trending')
            if (!items) {
              throw new Error('出差了')
            }
            console.log(url)
            this.saveData(url, items)
            resolve(items)
          }).catch(err => {
            console.log(err, 'Trending')
          reject(err)
        })
      }
    })
  }


  /**
   * 
   * 获取数据 优先获取本地数据 如果无本地数据或者本地数据过期则获取网络数据
   */
  fetchData(url, flag) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url, flag).then(wrapData => {
        if(wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
          resolve(wrapData)
        } else {
          this.fetchNetData(url, flag).then(res => {
            resolve(this._wrapData(res))
          }).catch(error => {
            reject(error.message)
          })
        }
      }).catch(error => {
        this.fetchNetData(url, flag).then(res => {
          resolve(this._wrapData(res))
        }).catch(error => {
          reject(error.message)
        })
      })
    })
  }

    // 打个时间戳
    _wrapData(data) {
      return {data: data, timestamp: new Date().getTime()}
    }


  static checkTimestampValid(timestamp) {
    const currentDate = new Date(), targetDate = new Date()

    targetDate.setTime(timestamp)
    if(currentDate.getMonth() !== targetDate.getMonth()) return false
    if(currentDate.getDate() !== targetDate.getDate()) return false
    if(currentDate.getHours() - targetDate.getHours() > 4) return false

    return true
  }
}

export const TimeSpan = (showText, searchText) => {
  this.showText = showText
  this.searchText = searchText
}