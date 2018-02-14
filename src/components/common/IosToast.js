import React from 'react';
import {Text, View, Modal, StyleSheet} from 'react-native';


const IosToast = ({children, visible}) => {
    const {textStyles, containerStyles} = styles;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
          >
          <View style={containerStyles}>
              <Text style={textStyles}>{children}</Text>
          </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
    cardStyles: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5,
        overflow: 'hidden'
    },
    textStyles: {
        flex: 1,
        fontSize: 18,
        borderRadius: 15,
        textAlign: 'center',
        lineHeight: 25,
        marginBottom: 45,
        backgroundColor: 'white',
        padding: 15,
        color: 'black'
    },
    containerStyles: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export {IosToast};