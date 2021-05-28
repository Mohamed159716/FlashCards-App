import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";

const DeckItem = ({ title, countCards, navigation }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("Deck", { deckTitle: title })}
        >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.count}>{countCards} cards</Text>
        </TouchableOpacity>
    );
};

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        backgroundColor: "#2980b9",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 30,
    },
    title: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 25,
    },
    count: {
        color: "#fff",
        fontSize: 18,
    },
});

export default DeckItem;
