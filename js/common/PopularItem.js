import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class PopularItem extends React.Component{
  render() {
    const { item } = this.props
    if(!item || !item.owner) return null
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
    </TouchableOpacity>,
    ImageComponent = item.owner.avatar_url ?   <Image
    style={{height:22, width: 22}}
    source={{uri: item.owner.avatar_url}}
  /> : <Image
    style={{height:22, width: 22}}
      source={require('./default.png')}
  />
    return(
      <TouchableOpacity
        onPress = {this.props.onSelect}
      >
        <View style={styles.cell_container}>
          <Text style={styles.title}>{item.full_name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text>Author:</Text>
              { ImageComponent }
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text>Stars:</Text>
              <Text>{ item.stargazers_count }</Text>
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