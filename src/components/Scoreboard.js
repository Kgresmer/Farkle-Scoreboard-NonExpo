import React, { Component } from 'react';
import { Button } from "../components/common/index";
import { connect } from 'react-redux';
import {Text, View} from "react-native";

class Scoreboard extends Component {
    static navigationOptions = {
        title: 'Scoreboard',
        headerStyle: {
            backgroundColor: '#0b7a75'
        },
        headerTitleStyle:  {
            color: 'white'
        }
    };

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        // TODO prompt user when trying to go back.
        // TODO Add IOS support
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true; //return true to block back button
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Scoreboard</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5
    }

});


const mapStateToProps = (state) => {
    return {};
};

export default Scoreboard;