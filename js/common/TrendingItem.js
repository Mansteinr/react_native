import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// 显示html
import HTMLView from 'react-native-htmlview'
export default class TrendingItem extends React.Component{
  render () {
    
    const { item } = this.props
    console.log(item)
    
    if(!item) return null
    let favoriteButton = <TouchableOpacity
      style={{padding:6}}
      onPress = {() => {

      }}
      underlayColor={'transparent'} // 按下时 颜色
    >
      <FontAwesome
        name={'star-o'}
        size={26}
        style={{color: 'red'}}
      />
    </TouchableOpacity>
    // 用p包裹主要是为了方便设置样式
    let description = `<p>${item.description}</p>`
    console.log(description, 'description')
    return(
      <TouchableOpacity
        onPress = {this.props.onSelect}
      >
        <View style={styles.cell_container}>
          <Text style={styles.title}>{item.fullName}</Text>
          {/* <Text style={styles.title}>{JSON.stringify(item)}</Text> */}
          {/* {description} */}
          {/* <Text style={styles.description}>{item.description}</Text> */}
          <HTMLView value={description}
            onLinkPress={url => {
              
            }}
            stylesheet={{
              p: styles.description,
              a: styles.description,
            }}
          />
          <Text style={styles.description}>{ item.meta}</Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text>Build By:</Text>
              {item.contributors.map((v, k) => {
                return <Image
                  key={k}
                  style={{ height: 22, width: 22, margin: 2}}
                  source={{ uri: v}}
                />
              }) }
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text>Star:</Text>
              <Text>{ item.starCount }</Text>
            </View>
            {favoriteButton}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray', // shadow针对对ios 设置阴影
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2 // 安卓设置阴影
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  }
})