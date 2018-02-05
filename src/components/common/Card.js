import React from 'react';
import {StyleSheet, View} from 'react-native';

const Card = ({children, dynamicStyles}) => {
    const combinedButtonStyles = StyleSheet.flatten([styles.containerStyle, dynamicStyles]);
    return (
        <View style={combinedButtonStyles}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2, //at any corners round them
        borderColor: 'rgba(255,255,255,0.75)',
        backgroundColor: '#0b7a75',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginLeft: 5, //spacing between cards
        marginRight: 5,
        marginTop: 10,

    }
});

export { Card };