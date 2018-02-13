import React, {Component} from 'react';
import {Button} from "../components/common/index";
import {connect} from 'react-redux';
import {Platform, Text, Animated, Easing, View, StyleSheet, Dimensions} from "react-native";
import SortableList from "react-native-sortable-list";
import {createInitialPlayerOrderList, updatePlayerOrderList} from "../actions";

const window = Dimensions.get('window');

class SetPlayerOrder extends Component {
    static navigationOptions = {
        title: 'Set Player Order',
        headerStyle: {
            backgroundColor: '#0b7a75'
        },
        headerTitleStyle: {
            color: 'white'
        }
    };

    state = {
        roster: {0: {name:''}},
        sortOrder: []
    };

    componentWillMount() {
        this.props.createInitialPlayerOrderList(this.props.roster);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({roster: nextProps.sortedPlayerList});
    }

    onOrderChange(nextOrder) {
        this.setState({sortOrder: nextOrder, roster: this.state.roster});
    }

    onReadyButtonPress() {
        const newRoster = {};
        if (this.state.sortOrder.length > 0) {
            for (let i = 0; i < this.state.sortOrder.length; i++) {
                newRoster[i] = this.state.roster[this.state.sortOrder[i]];
            }
            this.props.updatePlayerOrderList(newRoster);
        } else {
            for (let attr in this.state.roster) {
                if (this.state.roster.hasOwnProperty(attr)) {
                    newRoster[attr] = this.state.roster[attr];
                }
            }
            this.props.updatePlayerOrderList(newRoster);
        }
        this.props.navigation.navigate('Scoreboard');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>click, hold and drag to change the order</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                <SortableList
                    style={styles.list}
                    contentContainerStyle={styles.contentContainer}
                    onChangeOrder={this.onOrderChange.bind(this)}
                    data={this.state.roster}
                    renderRow={this._renderRow}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Button
                            textStyleDyn={styles.readyButtonTextStyle}
                            onPress={this.onReadyButtonPress.bind(this)}>
                            Ready!
                        </Button>
                    </View>
                </View>
            </View>
        )
    }

    _renderRow = ({data, active}) => {
        return <Row data={data} active={active}/>
    }
}

const mapStateToProps = (state) => {
    return {
        roster: state.player.roster,
        sortedPlayerList: state.sortOrder.sortedPlayerList
    };
};

export default connect(mapStateToProps, {createInitialPlayerOrderList, updatePlayerOrderList})(SetPlayerOrder);

class Row extends Component {

    constructor(props) {
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
        const {data} = this.props;
        return (
            <Animated.View style={[
                styles.row,
                this._style,
            ]}>
                <Text style={styles.text}>{data.name}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',

        ...Platform.select({
            ios: {
                paddingTop: 20,
            },
        }),
    },
    readyButtonTextStyle: {
        fontSize: 30,
        paddingTop: 6,
        paddingBottom: 6,
    },
    title: {
        fontSize: 12,
        paddingVertical: 10,
        color: '#999999',
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
        backgroundColor: '#05a8aa',
        padding: 11,
        height: 80,
        flex: 1,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 4,
        overflow: 'hidden',
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
    },
    text: {
        fontSize: 24,
        color: 'white',
    },
});