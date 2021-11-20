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

export default function List(){
    const [category, onChangeText] = React.useState(""); // 어느 category의 데이터를 찾을 것인지 입력받으면 category 값을 업데이트
    const [itemsArray, setItemsArray] = React.useState([]); // 

    // -----------------------------------handleSubmit---------------------------------- submit을 눌렀을 때 동작하는 과정
    const  handleSubmit = () => {
      var categoryName = category.concat("/"); // 입력받은 category 뒤에 '/'를 붙여서 categoryName으로 지정 (주소표시)
      let itemsRef = database().ref(categoryName); // 지정한 categoryName에 해당하는 파이어베이스 데이터베이스 항목들을 itemsRef에 불러옴

      // console.log(itemsRef);

      itemsRef.on('value', snapshot => { // on함수(데이터베이스 값이 바뀔 때마다 지속적으로 업데이트해서 읽어오는 함수)
        let data = snapshot.val(); // snapshot함수(파이어베이스 데이터베이스 현재 상태를 읽어옴)
        if(!data){
          return alert("Wrong category name!");
        }
        const items = Object.entries(data); // data에 해당하는 entries (name, value 전부) 를 items에 넣음
        setItemsArray(items); // items 객체를 이용해 itemsArray 배열 값을 set함

        return (
          <View style={styles.container}>
            {itemsArray.length > 0 ? ( // 만약 itemsArray 안에 값이 있으면, 
              <View style={styles.itemsList}>
              {itemsArray.map((item, index) => { //map 함수로 itemsArray 배열을 다 돌아다니면서
                return ( // item[0]: item[1] 양식으로 파이어베이스 데이터베이스의 itemName과 item 값을 출력함 
                  <View key={index}>
                    <Text style={styles.itemtext}>
                      {item[0]}: {item[1]}
                    </Text>
                  </View>
                );
              })}
            </View> // 만약 itemsArray 안에 값이 없으면 No items를 출력함
            ) : (
              <Text>No items</Text>
            )}
          </View>
        );
      });
    };
   // -----------------------------------handleSubmit----------------------------------

   // 기본적으로 보여주는 것들
    return (
      // 일단 List 화면으로 들어왔을 때 No items를 보여줌 + 데이터를 읽어온 후에도 출력 화면은 그대로 유지되게끔
      // category를 입력받는 화면을 밑에 띄움
      <View style={styles.main}>
        <View style={styles.container}>
          {itemsArray.length > 0 ? (
            <View style={styles.itemsList}>
              {itemsArray.map((item, index) => {
                return (
                  <View key={index}>
                    <Text style={styles.itemtext}>
                      {item[0]}: {item[1]}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text>No items</Text>
          )}
        </View> 
        
        <Text style={styles.title}>Enter your category</Text>
        <TextInput style={styles.itemInput} onChangeText={text => onChangeText(text)} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Read</Text>
        </TouchableHighlight>
      </View>
    );
 }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
  },
  itemsList: {
    flex: 1,
    flexDirection: 'column',
  },
  itemtext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left'
  },
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