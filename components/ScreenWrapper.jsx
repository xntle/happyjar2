import {View, Text} from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ScreenWrapper = ({children, bg}) => {
    const { top, bottom } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 5 : 30;
    
    // Add bottom padding for the tab bar (96px height plus any safe area insets)
    const paddingBottom = 96;

    return (
        <View style={{
            flex: 1, 
            paddingTop, 
            paddingBottom,
            backgroundColor: bg || "#fff"
        }}>
        {
            children
        }
        </View>
    )
}

export default ScreenWrapper;