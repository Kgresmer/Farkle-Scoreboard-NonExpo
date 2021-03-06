import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = (
    {   label,
        value,
        onChangeText,
        placeholder,
        secureTextEntry,
        keyboardType,
        style,
        inputDynStyle,
        maxLength
    }) => {
    const { inputStyle, containerStyle } = styles;
    return (
        <View style={[containerStyle, style]}>
            <TextInput
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor={'rgba(255,255,255, 0.7)'}
                autoCorrect={false}
                style={[inputStyle, inputDynStyle]}
                value={value}
                maxLength={maxLength}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: 'white',
        paddingRight: 5,
        paddingLeft: 15,
        fontSize: 19,
        lineHeight: 25,
        flex: 2,
    },
    labelStyle: {
        color: 'white',
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 32,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { Input };