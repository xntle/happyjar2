import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = ({title, showBackButton = false, mb = 10}) => {
    useRouter();
  return (
    <View style={[styles.container, {marginBottom:mb}]}>
      {
        showBackButton && (
            <View>
                {/* <BackButton router={router}/> */}
            </View>
        )
      }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItem: 'center',
        marginTop: 5,
        gap: 10
    },
    title: {
        fontSize: hp(2.7),
        fontWeight: theme.font.semibold,
        color: theme.color.textDark

    }
    // backButton: 
})