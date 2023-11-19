import React from "react";
import { ScrollView, StyleSheet, Text, View,Pressable,Image,Dimensions } from "react-native";
import { fallbackMoviePoster, posterImgSm } from "../api/db";

const Cast = ({cast,navigation}) => {
    console.log(cast)
    return(
        <View style={style.castWrapper}>
            <Text style={style.castTitle}>Top Cast</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 15}}
            >
             {
                cast && cast.map((person, index)=>{
                    return(
                        <Pressable onPress={() => console.log(index)} key={index} style={{marginRight: 40}}>
                      <View style={style.wrapper}>
                        <Image source={{uri: posterImgSm(person.profile_path) || fallbackMoviePoster}} style={{width: 96,height: 96, borderRadius: '50%'}}/>
                      </View>
                      <Text style={{color: "#fff", textAlign: "center",marginTop: 10}}>
                       {
                         person?.character.length>10? person.character.slice(0,10)+'...' : person?.character
                       }
                      </Text>
                      <Text style={{color: "#fff", textAlign: "center"}}>
                                {
                                    person?.original_name.length>10? person.original_name.slice(0,10)+'...' : person?.original_name
                                }
                            </Text>
                    </Pressable>
                    )
                })
             }

            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    castWrapper: {
      marginTop: 20,
      marginBottom: 40
    },
    castTitle: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 12,
        marginLeft: 20
    },
    wrapper: {
        overflow: "hidden",
        width: 96   ,
        height: 96,
        borderRadius: "50%"
    }
})

export default Cast;