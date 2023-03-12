import { StyleSheet, Text, View, Button, ScrollView, Pressable, Image} from 'react-native';
import { useState} from 'react';


const ListItem = (props) => {

    return(
        <View style = {styles.listItem}>
            <Text 
                style = {styles.titleText}
                adjustsFontSizeToFit
                >{props.songTitle}</Text>
            <Text style = {styles.number}> {props.numVotes}</Text>
            <View style = {styles.buttons}>
                <Pressable
                    style = {({pressed}) => [pressed ? {...styles.triangle, opacity: 0.4} : styles.triangle]}
                    onPress = {props.upvotePressed}/>
                <Pressable 
                     style = {({pressed}) => [pressed ? {...styles.trianglDown, opacity: 0.4} : styles.triangleDown]}
                     onPress = {props.downvotePressed} />
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    listItem: {
        //flex: 10,
        backgroundColor: 'gray',
        height: 50,
        borderBottomWidth: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10
    },
    titleText: {
        flex: 10,
        color: 'white',
        fontSize: 18,
        width: 150,
        margin: 5
   //     backgroundColor: 'yellow'
    },
    triangle: {
   //     backgroundColor: "transparent",
    //    borderStyle: "solid",
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderBottomWidth: 25,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "#5A5A5A",
      },
      triangleDown: {
   //     backgroundColor: "transparent",
     //   borderStyle: "solid",
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderTopWidth: 25,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: "#5A5A5A",
      },
      buttons: {
        flex: 2,
       // backgroundColor: 'green',
        flexDirection: 'row'
      },
      number: { 
        flex: 2,
       // backgroundColor: 'red'
      }
})


export default ListItem