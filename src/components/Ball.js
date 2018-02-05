import React, {Component} from 'react';
import {View, Animated} from 'react-native';

class Ball extends Component {
    componentWillMount() {
        this.position = new Animated.ValueXY({x: 30, y: 30});
        Animated.spring(this.position, {
            toValue: {x: 200, y: 500}
        }).start();
    }

    render() {
        return (
            <Animated.View style={this.position.getLayout()}>
                <View style={styles.ball}/>
            </Animated.View>
        )
    }
}

const styles = {
    ball: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: 'black',
        margin: 30
    }
};

export default Ball;