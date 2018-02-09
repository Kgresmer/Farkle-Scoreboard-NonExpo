import React, {Component} from 'react';
import {Button, Card, CardSection} from "../components/common/index";
import {connect} from 'react-redux';
import {Platform, Text, Animated, Easing, View, StyleSheet} from "react-native";
import SortableList from "react-native-sortable-list/src/SortableList";
import {createInitialPlayerOrderList, updatePlayerOrderList} from "../actions";

class SetPlayerOrder extends Component {
    static navigationOptions = {
        title: 'Set Player Order',
        headerStyle: {
            backgroundColor: '#0b7a75'
        },
        headerTitleStyle:  {
            color: 'white'
        }
    };

    componentWillMount() {
        console.log('compinent will mount');
        console.log(this.props);
        this.props.createInitialPlayerOrderList();
        this.getData(this.props.sortedPlayerList);
    }

    componentWillReceiveProps(nextProps) {
        console.log('will receive props');
        console.log(nextProps);
        this.getData(nextProps.playerList)
    }

    getData(playerList) {
        this.dataSource = playerList;
    }

    render() {
        console.log('rendering view');
        return (
            <View style={styles.container}>
                <SortableList
                    style={styles.list}
                    contentContainerStyle={styles.contentContainer}
                    data={this.getData}
                    renderRow={this._renderRow} />
            </View>
        )
    }

    _renderRow = ({data, active}) => {
        return <Row data={data} active={active} />
    }
}

const mapStateToProps = (state) => {
    return {
        roster: state.player.roster,
        playerList: state.player.playerList,
        sortedPlayerList: state.sortOrder.sortedPlayerList
    };
};

export default connect(mapStateToProps, {createInitialPlayerOrderList, updatePlayerOrderList})(SetPlayerOrder);

class Row extends Component {

    constructor(props) {
        console.log('row constructor');
        super(props);

        this._active = new Animated.Value(0);

        this._style = {
            ...Platform.select({
                ios: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1],
                        }),
                    }],
                    shadowRadius: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10],
                    }),
                },

                android: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.07],
                        }),
                    }],
                    elevation: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 6],
                    }),
                },
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start();
        }
    }

    render() {
        console.log('rendering row');
        const {data, active} = this.props;

        return (
            <Animated.View style={[
                styles.row,
                this._style,
            ]}>
                <View>
                    <CardSection style={{backgroundColor: '#05a8aa'}}>
                        <Text style={styles.nameStyles}>
                            {data.name}
                        </Text>
                    </CardSection>
                </View>
                <View>
                    <CardSection style={{backgroundColor: '#05a8aa', padding: 3}}>
                        <Text style={styles.textStyles}>
                            Wins: {data.wins} Losses: {data.losses} {"\n"}
                            Best Score: {data.bestScore} {"\n"}
                            Worst Score: {data.worstScore}
                        </Text>
                    </CardSection>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',

        ...Platform.select({
            ios: {
                paddingTop: 20,
            },
        }),
    },
    textStyles: {
        alignSelf: 'stretch',
        fontSize: 16,
        color: 'white',
    },
    nameStyles: {
        alignSelf: 'stretch',
        fontSize: 21,
        color: 'white',
    },
    list: {
        flex: 1,
    },
    contentContainer: {
        width: window.width,

        ...Platform.select({
            ios: {
                paddingHorizontal: 30,
            },

            android: {
                paddingHorizontal: 0,
            }
        })
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        height: 80,
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        borderRadius: 4,


        ...Platform.select({
            ios: {
                width: window.width - 30 * 2,
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: {height: 2, width: 2},
                shadowRadius: 2,
            },

            android: {
                width: window.width - 30 * 2,
                elevation: 0,
                marginHorizontal: 30,
            },
        })
    }
});