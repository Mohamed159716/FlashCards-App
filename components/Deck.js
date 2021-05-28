import React, { Component } from "react";
import { Text, View, TouchableOpacity, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";

import { addDeck, deleteDeck } from "./../actions/index";

class Deck extends Component {
    componentDidMount() {
        const { navigation, deckTitle } = this.props;

        navigation.setOptions({ title: deckTitle });
    }

    toHome = () => {
        this.props.navigation.dispatch(CommonActions.goBack());
    };

    render() {
        const { deck, navigation } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.deckText}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.count}>
                        {deck.questions.length} Cards
                    </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: "#2c3e50" }]}
                        onPress={() =>
                            navigation.navigate("Quiz", {
                                deckTitle: deck.title,
                            })
                        }
                    >
                        <Text style={{ color: "#fff", fontSize: 15 }}>
                            Start Quiz
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.btn,
                            { backgroundColor: "none", marginBottom: 30 },
                        ]}
                        onPress={() =>
                            navigation.navigate("AddCard", {
                                deckTitle: deck.title,
                            })
                        }
                    >
                        <Text style={{ fontSize: 15 }}>Add Card</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
    },
    deckText: {
        alignItems: "center",
    },
    title: {
        color: "#333",
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 5,
    },
    count: {
        color: "#666",
        fontSize: 18,
    },
    btn: {
        backgroundColor: "#ccc",
        width: "50%",
        marginBottom: 20,
        borderRadius: 5,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
});

function mapStateToProps(decks, { route }) {
    const { deckTitle } = route.params;

    return {
        deck: decks[deckTitle],
        deckTitle,
    };
}

export default connect(mapStateToProps)(Deck);
