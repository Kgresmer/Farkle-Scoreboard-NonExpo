import React, {Component} from 'react';
import {Text, View, Modal, StyleSheet, ListView} from 'react-native';
import {CardSection, Button, Card} from './common';
import { connect } from 'react-redux';
import { addPlayerToRoster, playerDeleted } from '../actions';
import PlayerListItem from "./PlayerListItem";


class AddExistingPlayer extends Component {
    static navigationOptions = {
        title: 'Fill Your Roster',
        headerStyle: {
            backgroundColor: '#0b7a75'
        },
        headerTitleStyle: {
            color: 'white'
        }
    };

    componentWillMount() {
        this.createDataSource(this.props.playerList);
    }

    // TODO may not be needed
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps.playerList);
    }

    createDataSource(players) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(players);
    }

    onFinishAdding() {
        this.props.navigation.navigate('AddPlayers');
    }

    renderRow(player) {
        return <PlayerListItem player={player}/>;
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={{flex: 1}}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Button
                            textStyleDyn={styles.readyButtonTextStyle}
                            buttonStyleDyn={styles.readyButtonStyle}
                            onPress={this.onFinishAdding.bind(this)}>
                            Done!
                        </Button>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5
    },
    existingButtonStyle: {},
    newButtonStyle: {},
    readyButtonTextStyle: {
        fontSize: 30,
        paddingTop: 4,
        paddingBottom: 4,
    },
    readyButtonStyle: {}
});

const mapStateToProps = (state) => {
    console.log('map state in existing');
    console.log(state);
    return {roster: state.player.roster, playerList: state.player.playerList};
};

export default connect(mapStateToProps, {addPlayerToRoster, playerDeleted})(AddExistingPlayer);