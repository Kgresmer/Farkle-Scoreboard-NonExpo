import React, {Component} from 'react';
import {Button} from "../components/common";
import {StyleSheet, View, FlatList, Text, BackHandler, ToastAndroid} from "react-native";
import PlayerListItem from "./PlayerListItem";
import AddNewPlayer from "./AddNewPlayer";
import {connect} from 'react-redux';
import {removePlayerFromRoster, playerCreated} from "../actions";

class AddPlayers extends Component {
    static navigationOptions = {
        title: 'Fill Your Roster',
        titleStyle: {
            textAlign: 'center'
        },
        headerStyle: {
            backgroundColor: '#0b7a75'
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerLeft: null
    };

    state = {showNewPlayerModal: false};

    addNewPlayer(name) {
        this.props.playerCreated(name);
        this.closeAddNewPlayerModal();
        ToastAndroid.show('Player Added', ToastAndroid.SHORT);
    };

    dropPlayer(id) {
        this.props.removePlayerFromRoster(id);
    };

    onExistingPlayerPress() {
        this.props.navigation.navigate('AddExistingPlayers');
    }

    onNewPlayerPress() {
        this.setState({showNewPlayerModal: true});
    }

    onReadyButtonPress() {
        this.props.navigation.navigate('SetPlayerOrder');
    }

    closeAddNewPlayerModal() {
        this.setState({showNewPlayerModal: false});
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true; //return true to block back button
    }

    componentWillMount() {
        this.createDataSource(this.props.roster);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps.roster);
    }

    createDataSource(players) {
        this.dataSource = players;
    }

    renderRow({item}) {
        return <PlayerListItem dropPlayer={this.dropPlayer.bind(this)} player={item}/>;
    }

    checkForEmptyRoster() {
        if (this.props.roster.length > 0) {
            return (<FlatList
                data={this.dataSource}
                renderItem={this.renderRow.bind(this)}
            />);
        } else {
            return (<Text style={styles.emptyRosterText}>
                Your Roster is Empty.{'\n'}Click below to add players.
            </Text>);
        }
    }

    checkForEmptyPlayerList() {
        if (this.props.playerList.length < 1) {
            return (
                <Button
                    disabled={true}
                    buttonStyleDyn={styles.existingButtonDisabledStyle}
                    textStyleDyn={{marginBottom: 10}}
                    onPress={()=>{}}>
                    Add Existing Player
                </Button>
            )
        } else {
            return (
                <Button
                    buttonStyleDyn={styles.existingButtonStyle}
                    onPress={this.onExistingPlayerPress.bind(this)}>
                    Add Existing Player
                </Button>
            )
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {this.checkForEmptyRoster()}
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2}}>
                        {this.checkForEmptyPlayerList()}
                    </View>
                    <View style={{flex: 2}}>
                        <Button
                            buttonStyleDyn={styles.newButtonStyle}
                            onPress={this.onNewPlayerPress.bind(this)}>
                            Add New Player
                        </Button>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Button
                            textStyleDyn={styles.readyButtonTextStyle}
                            buttonStyleDyn={styles.readyButtonStyle}
                            onPress={this.onReadyButtonPress.bind(this)}>
                            Ready!
                        </Button>
                    </View>
                </View>
                <AddNewPlayer
                    visible={this.state.showNewPlayerModal}
                    closeModal={this.closeAddNewPlayerModal.bind(this)}
                    addPlayer={this.addNewPlayer.bind(this)}
                />
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
    },
    existingButtonStyle: {
        height: 60
    },
    existingButtonDisabledStyle: {
        height: 60,
        backgroundColor: 'rgba(11,172,167,0.40)',
    },
    newButtonStyle: {
        height: 60
    },
    readyButtonTextStyle: {
        fontSize: 30,
        paddingTop: 6,
        paddingBottom: 6,
    },
    readyButtonStyle: {},
    emptyRosterText: {
        marginTop: 40,
        fontSize: 30,
        color: 'rgba(11,172,167,0.40)',
        textAlign: 'center'
    }
});


const mapStateToProps = (state) => {
    console.log('map state to props')
    console.log(state);
    return {
        roster: state.player.roster,
        playerList: state.player.playerList
    };
};

export default connect(mapStateToProps, {
    removePlayerFromRoster,
    playerCreated
})(AddPlayers);