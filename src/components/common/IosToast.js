import React from 'react';
import {Text, View, Modal, StyleSheet} from 'react-native';


const IosToast = ({children, visible}) => {

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
        }}>
            <Modal
                visible={visible}
                transparent
                animationType="slide"
                onRequestClose={() => {}}
            >
                <View style={styles.containerStyles}>
                    <Text style={styles.textStyles}>{children}</Text>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    textStyles: {
        fontSize: 14,
        borderRadius: 20,
        overflow: 'hidden',
        lineHeight: 25,
        textAlign: 'center',
        backgroundColor: 'white',
        padding: 15,
        color: 'black',
        marginBottom: 35,
        width: 150,
        height: 55,
    },

    containerStyles: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

export {IosToast};