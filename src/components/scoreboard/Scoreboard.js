import React, {Component} from 'react';
import {Button} from "../common/index";
import {connect} from 'react-redux';
import { FlatList, Text, View} from "react-native";
import {BackHandler, ToastAndroid, StyleSheet} from "react-native";
import {Confirm, Input} from "../common";
import ScoreboardListItem from "./ScoreboardListItem";
import ScoreboardTitle from "./ScoreboardTitle";

class Scoreboard extends Component {
    static navigationOptions = {
        header: <ScoreboardTitle/>
    };

    state = {showModal: false};

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    componentWillMount() {
        console.log(this.props)
        this.createDataSource(this.props.roster, this.props.sortedPlayerList);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.createDataSource(nextProps.roster, nextProps.sortedPlayerList);
    }

    createDataSource(roster, sortedPlayerListObject) {
        const dataSource = [];
        for (let i = 0; i < roster.length; i++) {
            dataSource[i] = sortedPlayerListObject[i];
        }
        console.log(dataSource)
        this.dataSource = dataSource;
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
                    <View style={styles.displaySection}>
                        <Text style={styles.playerNameStyle}>Kevin's Turn</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.inputCard}>
                        <Input
                            label=""
                            inputDynStyle={styles.inputDynStyle}
                            maxLength={6}
                            keyboardType="default"
                            placeholder=" 350"
                            onChangeText={() => {
                            }}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Button
                        buttonStyleDyn={{flex: 1, backgroundColor: '#05a8aa'}}
                        textStyleDyn={{fontSize: 22}}
                        onPress={() => {
                        }}>
                        Farkel
                    </Button>
                    <Button
                        buttonStyleDyn={{flex: 1, backgroundColor: '#05a8aa'}}
                        textStyleDyn={{fontSize: 22}}
                        onPress={() => {
                        }}>
                        Score It
                    </Button>
                </View>
                <Confirm
                    visible={this.state.showModal}
                    onAccept={() => {}}
                    onDecline={() => {}}
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
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'white'
    },
    displaySection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputCard: {
        flex: 2,
        padding: 12,
        borderWidth: 0,
        height: 70,
        borderRadius: 5,
        backgroundColor: '#05a8aa'
    },
    inputDynStyle: {
        fontSize: 20,
        lineHeight: 27,
    },
    playerNameStyle: {
        fontSize: 25,
        lineHeight: 32,
        color: 'black'
    }
});

const mapStateToProps = (state) => {
    console.log(state)
    return {
        roster: state.player.roster,
        sortedPlayerList: state.sortOrder.sortedPlayerList
    };
};

export default connect(mapStateToProps, {})(Scoreboard);