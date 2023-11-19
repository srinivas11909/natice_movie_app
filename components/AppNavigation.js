import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import { StyleSheet, View } from "react-native";
import MovieDetail from "../screens/MovieDetialScreen";


const AppNavigation = () => {
    const Stack = createNativeStackNavigator();
    return(
        <View style={style.container}>
          <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
                <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}} />
                <Stack.Screen name="Movie" component={MovieDetail} options={{headerShown: false}} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
    )
}

export default AppNavigation;
const style = StyleSheet.create({
    container:{
        flex: 1,
    }
})