import React, { Component } from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    )
};

const styles = {
    containerStyle: {
        padding: 5,
        backgroundColor: '#0b7a75',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
    }
};

export { CardSection };
