import React from 'react'
import {  AsyncStorage } from 'react-native'

export default class localStorage {
  /**
   * 保存数据
   */
  saveData(url, data, callback) {
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback)
  }
 

  // 获取数据
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

  fetchNetData(url) {
    return new Promise((resolve, reject) => {
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
    })
  }


  /**
   * 
   * 获取数据 优先获取本地数据 如果无本地数据或者本地数据过期则获取网络数据
   */


  fetchData(url) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url).then(wrapData => {
        if(wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
          resolve(wrapData)
        } else {
          this.fetchNetData(url).then(res => {
            resolve(this._wrapData(res))
          }).catch(error => {
            reject(error.message)
          })
        }
      }).catch(error => {
        this.fetchNetData(url).then(res => {
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