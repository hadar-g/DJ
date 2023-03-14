import { StyleSheet, Text, View, Button, ScrollView, Pressable, Image, Animated} from 'react-native';
import { useState, useRef} from 'react';


const ListItem = (props) => {

    const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration:300,
          useNativeDriver: true, 
        }).start(() => fadeIn());
      };

      const fadeIn = () => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      };

    const upvotePressedHandler = () => {
        const upvotePressedResult = props.upvotePressed()
        if(upvotePressedResult){
        //    console.log('upvote pressed moving up')
        }
      //  console.log("submit value result is: ", upvotePressedResult)
    }

    return(
        <Animated.View style = {[
            styles.listItem,
            {opacity: fadeAnim}
            ]}>

            <View style = {styles.texts}>
            <Text 
                style = {styles.titleText}
                adjustsFontSizeToFit
                >{props.songTitle}</Text>
            <Text>{props.artistName}</Text>
            </View>

            <Text style = {styles.number}> {props.numVotes}</Text>
            <View style = {styles.buttons}>
                <Pressable
                    style = {({pressed}) => [pressed ? {...styles.triangle, opacity: 0.4} : styles.triangle]}
                    onPress = {upvotePressedHandler}/>
                <Pressable 
                     style = {({pressed}) => [pressed ? {...styles.trianglDown, opacity: 0.4} : styles.triangleDown]}
                     onPress = {props.downvotePressed} />
            </View>
        </Animated.View>
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
     
        color: 'white',
        fontSize: 18,

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
      },
      texts: {
        flex: 10,
        width: 150,
        margin: 5

      }
})


export default ListItem