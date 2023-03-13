import { StyleSheet, Text, View, Button, ScrollView, Pressable, Image, TextInput} from 'react-native';
import { useState} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';


const SongInput = (props) => {

    const songSubmitHandler = (inputtedValue) => {
        props.onInputSubmit(inputtedValue.name)
        setInputValue('')
    }
    const items = [{id: 1, name: "one"}, {id: 2, name: "two"},{id: 3, name: "three"},{id: 4, name: "four"},{id: 5, name: "five"},{id: 6, name: "six"},{id: 7, name: "seven"},{id: 8, name: "eight"},{id: 9, name: "nine"},]

    const [inputValue, setInputValue] = useState('')
    return(
        <View style = {styles.input}>
        {/* <TextInput
        onChangeText={setInputValue}
        style={styles.inputText}
        value={inputValue}
        placeholder="Enter Song Name"
      /> */}
       <SearchableDropdown
            onItemSelect={(item) => {
                songSubmitHandler(item)
            }}
            //   const items = this.state.selectedItems;
            //   items.push(item)
            //   this.setState({ selectedItems: items });
            // }}
             containerStyle={{ padding: 5, height: 300,  }}
            // onRemoveItem={(item, index) => {
            //   const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
            //   this.setState({ selectedItems: items });
            // }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 500 }}
            items={items}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                style:styles.inputText,
                placeholder:"Enter Song Name"
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />

        <Button title ="submit" onPress={songSubmitHandler}/>
        </View>

    )
}


const styles = StyleSheet.create({
    input: {
     //   flex: 1,

        flexDirection: 'row',
        marginTop: '15%',
     //   backgroundColor: 'green',
        height: 50,
        margin: 50,
        zIndex: 1
    },
    inputText: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: '70%',
        height: '5%',
        paddingLeft: 10,
    //    backgroundColor: 'yellow',
        height: 35,
        width: 250,
    
    },
  });

export default SongInput