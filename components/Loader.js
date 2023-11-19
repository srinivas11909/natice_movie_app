import React from "react";
import { View } from "react-native";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const Loader = () => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={"large"} animating={true} color={MD2Colors.red800} />
        </View>
    )
}

export default Loader