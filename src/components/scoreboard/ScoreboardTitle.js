import React, {Component} from "react";
import {
    Text,
    View,
    Platform,
    Image,
    TouchableOpacity
} from "react-native";
import {Confirm} from "../common/Confirm";
import {RulesModal} from "./RulesModal";


class ScoreboardListItem extends Component {

    state = {showExitModal: false, showRulesModal: false};

    showRulesModal() {
        this.setState({showExitModal: false, showRulesModal: true})
    }

    closeRulesModal() {
        this.setState({showExitModal: false, showRulesModal: false})
    }

    showExitModal() {
        this.setState({showExitModal: true, showRulesModal: false})
    }

    closeExitModal() {
        this.setState({showExitModal: false, showRulesModal: false})
    }

    closeExitModalAndNavigateAway() {
        this.setState({showExitModal: false, showRulesModal: false});
        this.props.navigation.navigate('AddPlayers');
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={this.showExitModal.bind(this)}
                    >
                        <Image
                            style={{height: 60, width: 60, marginLeft: 7}}
                            source={require('./exiticon.png')}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.nameStyles}>
                    Scoreboard
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={this.showRulesModal.bind(this)}
                    >
                        <Image
                            style={{height: 60, width: 60, marginRight: 7}}
                            source={require('./rulesicon.png')}
                        />
                    </TouchableOpacity>
                </View>
                <Confirm
                    visible={this.state.showExitModal}
                    onAccept={this.closeExitModalAndNavigateAway.bind(this)}
                    onDecline={this.closeExitModal.bind(this)}
                >
                    Are you sure you want to exit the game?{'\n'}
                    All of the scores will be reset.
                </Confirm>
                <RulesModal onAccept={this.closeRulesModal.bind(this)}/>
            </View>
        )
    }
}

const styles = {
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#0b7a75',
        height: 80,
        marginTop: Platform.OS == "ios" ? 20 : 0,
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    nameStyles: {
        alignSelf: 'center',
        fontSize: 30,
        marginLeft: 10,
        lineHeight: 35,
        color: 'white',
    },
};

export default ScoreboardListItem;