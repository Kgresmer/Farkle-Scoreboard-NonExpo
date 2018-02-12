import React from 'react';
import {Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ children, onPress, buttonStyleDyn, textStyleDyn, disabled }) => {
    const { buttonStyle, textStyle } = styles;
    const combinedButtonStyles = StyleSheet.flatten([buttonStyle, buttonStyleDyn]);
    const combinedTextStyles = StyleSheet.flatten([textStyle, textStyleDyn]);
    return (
        <TouchableOpacity
            onPress={onPress}
            style={combinedButtonStyles}
            disabled={disabled}
        >
            <Text style={combinedTextStyles}>
                {children}
            </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    buttonStyle: {
        justifyContent: 'center',
        alignSelf: 'stretch', //stretch to fill the limits of the container
        backgroundColor: '#0b7a75',
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    textStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: 'center',
        justifyContent: 'center'
    }
});

export { Button };