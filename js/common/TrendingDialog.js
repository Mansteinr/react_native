import React, { Component } from 'react'
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons'
// const TimeSpan = 
import { TimeSpan } from './utils'
console.log(TimeSpan, 'TimeSpan')
export const TimeSpans = [new TimeSpan('今 天', 'since=daily'),
    new TimeSpan('本 周', 'since=weekly'), new TimeSpan('本 月', 'since=monthly')]
export default class TrendingDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  show = () => {
    this.setState({
      visible: true
    })
  }
  dismiss = () => {
    this.setState({
      visible: false
    })
  }

  render () {
    const { onClose, onSelect } = this.props
    return <Modal
      transparent={true} //  透明
      visible={this.state.visible} // 显示隐藏
      onRequestClose={ onClose }
    >
      {/* 点击整个屏幕 */}
      <TouchableOpacity
        style={ styles.container }
        onPress={ this.dismiss }
      >
        <MaterialIcons
          name={"arrow-drop-up"}
          size={36}
          style={styles.arrow}
        />
        <View style={styles.content}>
          {Timespans.map((v, k) => {
            return <TouchableOpacity
              onPress={ onSelect(v) }
              // 点击时 颜色
              underlayColor="transparent"
            >
              <View style={ style.text_container }>
                <Text
                  style={ style.text }
                >{v.showText}</Text>
                {
                  i !== Timespans.length - 1 ? <View style={ style.line }></View> : ''
                }
              </View>
            </TouchableOpacity>
          }) }
        </View>
      </TouchableOpacity>
    </Modal>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0, 0.6)',
    flex: 1,
    alignItems: 'center'
  },
  arrow: {
    marginTop: 40,
    color: 'white',
    padding: 0,
    margin: -15
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 3,
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 3
  },
  text_container: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    padding: 8,
    paddingLeft: 26,
    paddingRight: 26
  },
  line: {
    height: 0.3,
    backgroundColor: 'darkgray'
  }
})