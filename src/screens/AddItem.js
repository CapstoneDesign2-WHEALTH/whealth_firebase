import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';

import database from '@react-native-firebase/database';

let addItem = (category, itemName, item) => { //addItem 쪽으로 category, itemName, item 을 입력받으면 차례로 ref(),child(),set()에 넣어서 database에 항목 추가
  database().ref(category).child(itemName).set(item);
};

export default function AddItem (){
    const [inputString, onChangeText] = React.useState(""); //onChangeText를 통해서 입력값에 변화가 있을 때 inputString 값 업데이트

    const  handleSubmit = () => {
      var parsedString = inputString.split("."); // inputString을 '.'을 기준으로 나눠서 parsedString에 넣음 (3개의 string으로)
      for(let i=0;i<parsedString.length;i=i+3){
        if(!parsedString[i+1] && !parsedString[i+2]){ // 만약 2번째, 3번째 string 값이 비어있으면 해당 카테고리를 삭제
          let categoryName = parsedString[i];
          let itemsRef = database().ref(categoryName);
          itemsRef.remove();
          continue;
        }
        if(!parsedString[i+2]){ // 만약 3번째 string 값이 비어있으면 해당 항목의 name, value를 둘다 삭제
          let categoryName = parsedString[i].concat("/");
          categoryName = categoryName.concat(parsedString[i+1]);
          let itemsRef = database().ref(categoryName);
          itemsRef.remove();
          continue;
        }
        addItem(parsedString[i], parsedString[i+1], parsedString[i+2]); // parsedString 배열의 각 값을 addItem에 넣어줌 (category, itemName, item)
      }
      Alert.alert('Item saved successfully'); // item이 성공적으로 파이어베이스 데이터베이스에 저장됐음을 alert
    };

    return (  // Add Item 화면
      <View style={styles.main}>
        <Text style={styles.title}>Add Item</Text> 
        <TextInput style={styles.itemInput} onChangeText={text => onChangeText(text)} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 150,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});