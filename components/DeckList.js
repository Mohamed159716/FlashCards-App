import React, { Component } from "react";
import { Text, View, Button, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { fetchDecks } from "./../utils/api";
import { receiveDecks } from "../actions";
import DeckItem from "./DeckItem";
import Loading from "./Loading";
import { StatusBar } from "expo-status-bar";

class DeckList extends Component {
    state = {
        ready: false,
    };

    componentDidMount() {
        const { dispatch } = this.props;

        fetchDecks()
            .then((decks) => {
                return dispatch(receiveDecks(decks));
            })
            .then(() => this.setState(() => ({ ready: true })));
    }

    render() {
        const { ready } = this.state;
        const { navigation, decks } = this.props;

        if (!ready) {
            return <Loading />;
        }

        const DATA = Object.values(decks);

        const renderItem = ({ item }) => (
            <DeckItem
                title={item.title}
                countCards={item.questions.length}
                navigation={navigation}
            />
        );

        return (
            <FlatList
                contentContainerStyle={styles.container}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

function mapStateToProps(decks) {
    return {
        decks,
    };
}

export default connect(mapStateToProps)(DeckList);
