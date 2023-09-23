/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
    useCallback,
    useState,
    useLayoutEffect,
    useEffect,
    useRef,
  } from 'react';
  import axios from 'axios';
import {BASE_URL} from '@env';

  import {useData, useTheme, useTranslation} from '../hooks/';
  import {Block, Button, Image, Input, Product, Text} from '../components/';
  import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
  import {Animated, Easing} from 'react-native';
  import Lottie from 'lottie-react-native';
  
  import {
    StyleSheet,
    View,
    SafeAreaView,
    Platform,
    TouchableOpacity,
    TouchableHighlight,
  } from 'react-native';
  import {useNavigation} from '@react-navigation/core';
  import {useHeaderHeight} from '@react-navigation/stack';
  
  export default function AnimationPage({navigation, route}) {
    const {assets, fonts, sizes, gradients, colors} = useTheme();
    const {data,formDataCopy} = route.params;
     const [dietPlan, setDietPlan] = useState('');


    const animationProgress = useRef(new Animated.Value(0));
  
    useEffect(() => {
  
    }, []);
    useEffect(() => {
      console.log(formDataCopy , "formdata");
      
        // Start the animation
        axios
        .get(`${BASE_URL}get_recommended_diet/${formDataCopy.customer_id}`,)
        .then((response) => {
          // console.log(response.data.data.recommended_diet_list , "data for sandeepsss");
          // Handle the successful response from the backend if needed
          setDietPlan(response.data.data.recommended_diet_list)
        
        })
        .catch((error) => {
          // Handle the error if needed
        });
        Animated.timing(animationProgress.current, {
            toValue: 1,
            duration: 15000,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start();
      

     
    
        // Wait for 2 seconds before showing the next page
        if(dietPlan !== null){
          const timeout = setTimeout(() => {
            // Navigate to the next page n
            navigation.navigate('Progress', {data ,formDataCopy , dietPlan});
          }, 5000);
          return () => clearTimeout(timeout);
        }else{
          console.log("not ok");
          
        }
    
    
        // Clean up the timeout when the component unmounts
     
      });
  
console.log(dietPlan , "new diet plan");

  
    return (
      <Block safe>
      <Block  
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: sizes.padding}}>
        
        <Block style={styles.container3}>
        <Lottie
                   style={styles.backgroundAnimation}
                   
                    source={require('../assets/json/upload.json')}
                    progress={animationProgress.current}
                  />
  
        </Block>
        <Block  padding={10} center align='center' >
            <Text semibold>Please wait for the Diet calculation </Text>
            <Text semibold>Our Ai is working on it </Text>
        </Block>
      
       
  
       
      </Block>
      {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: 30,
              paddingRight:10
            }}>
  
            <TouchableOpacity >
            <Image
              source={assets.Button}
           
            />
            </TouchableOpacity>
          </View> */}
      
    </Block>
    );
  }
  const styles = StyleSheet.create({
    container3:{
      flex:0,
      zIndex:10,
       },
    backgroundAnimation: {
      height:250,
      alignSelf:'center',
      position: 'relative',
      // zIndex:-10,
  
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    container:{
      position:'relative',
      marginTop:40
    },
    container1: {
      flex: 1,
      // backgroundColor: '#22faa0',
  
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  
    img: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {backgroundColor: '', flexDirection: 'row', flex: 1},
    cover: {padding: 30, width: '50%', height: '10%'},
    text: {padding: 30},
    container: {
      flex: 1,
      // flexDirection: "row", // set elements horizontally, try column.
      padding: 30,
      justifyContent: 'center',
    },
    container2: {
     position:'absolute',
     bottom:0,
      justifyContent: 'flex-end',
      alignContent: 'flex-end',
      alignSelf: 'flex-end',
      padding: 30,
    },
  
    mainCardView: {
      // top:70,
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffff',
      borderRadius: 25,
      shadowColor: 'gray',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 16,
      paddingRight: 14,
      marginTop: 6,
      marginBottom: 6,
      marginLeft: 16,
      marginRight: 16,
    },
    subCardView: {
      height: 20,
      width: 50,
      borderRadius: 0,
      backgroundColor: 'transparent',
      // borderColor: "green",
      // borderWidth: 1,
      // borderStyle: "solid",
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  