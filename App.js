import React from 'react';
import { StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import SimpleApp from "./src/routing";
import {PersistGate} from 'redux-persist/lib/integration/react'
import {persistor, store} from './src/store/configureStore'
import {Spinner} from "./src/components/common";


export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={<Spinner size="large"/>} persistor={persistor}>
                    <SimpleApp style={styles.container}/>
                </PersistGate>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
