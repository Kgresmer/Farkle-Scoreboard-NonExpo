import React, {Component} from 'react';
import {Button} from "../common/index";
import {connect} from 'react-redux';
import {FlatList, Text, View} from "react-native";
import {BackHandler, ToastAndroid, StyleSheet} from "react-native";
import {Confirm, Input} from "../common";
import ScoreboardListItem from "./ScoreboardListItem";
import ScoreboardTitle from "./ScoreboardTitle";
import {updateRoundScore, addRoundScoreToActivePlayerScore} from "../../actions/ScoreboardActions";

class Scoreboard extends Component {
    static navigationOptions = {
        header: <ScoreboardTitle/>
    };

    state = {showModal: false, activePlayer: null};

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    onInputChange(value) {
        this.props.updateRoundScore(value);
    }

    componentWillMount() {
        console.log(this.props)
        this.dataSource = this.props.currentGamePlayersAndScores;
        this.setState({showModal: false, activePlayer: this.props.currentGamePlayersAndScores['0']})
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.dataSource = nextProps.currentGamePlayersAndScores;
        const activePlayer = nextProps.currentGamePlayersAndScores.find((player) => {
            return player.isActive === true;
        });
        console.log(activePlayer);
        this.setState({showModal: false, activePlayer})
    }

    onScoreItButtonPress() {
        this.addRoundScoreToActivePlayerScore(this.state.activePlayer.id);
    }

    renderRow({item}) {
        return <ScoreboardListItem player={item}/>;
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <FlatList
                        data={this.dataSource}
                        renderItem={this.renderRow.bind(this)}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.playerNameStyle}>{this.state.activePlayer.name}'s Turn</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    borderLeftWidth: 10,
                    borderRightWidth: 10,
                    borderTopWidth: 2,
                    borderColor: '#ea651d'
                }}>
                    <View style={styles.inputCard}>
                        <Input
                            label=""
                            inputDynStyle={styles.inputDynStyle}
                            maxLength={6}
                            keyboardType="numeric"
                            placeholder=" 350"
                            onChangeText={(value) => this.onInputChange(value)}
                        />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    borderLeftWidth: 10,
                    borderRightWidth: 10,
                    borderBottomWidth: 10,
                    borderColor: '#ea651d'
                }}>
                    <Button
                        buttonStyleDyn={{flex: 1, backgroundColor: '#05a8aa', padding: 5}}
                        textStyleDyn={{fontSize: 22}}
                        onPress={() => {
                        }}>
                        Farkel
                    </Button>
                    <Button
                        buttonStyleDyn={{flex: 1, backgroundColor: '#05a8aa', padding: 5}}
                        textStyleDyn={{fontSize: 22}}
                        onPress={this.onScoreItButtonPress.bind(this)}>
                        Score It
                    </Button>
                </View>
                <Confirm
                    visible={this.state.showModal}
                    onAccept={() => {
                    }}
                    onDecline={() => {
                    }}
                >
                    Are you sure you want to exit the game?{'\n'}
                    All of the scores will be reset.
                </Confirm>
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
        backgroundColor: 'white'
    },
    displaySection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5
    },
    inputCard: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 0,
        height: 70,
        marginLeft: 7,
        marginRight: 7,
        marginTop: 7,
        borderRadius: 5,
        backgroundColor: '#05a8aa'
    },
    inputDynStyle: {
        fontSize: 20,
        lineHeight: 27,
    },
    playerNameStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1,
        fontSize: 25,
        paddingBottom: 3,
        color: 'white',
        backgroundColor: '#ea651d'
    }
});

const mapStateToProps = (state) => {
    return {
        currentGamePlayersAndScores: state.game.currentGamePlayersAndScores
    };
};

export default connect(mapStateToProps,
    {
        updateRoundScore,
        addRoundScoreToActivePlayerScore
    })(Scoreboard);