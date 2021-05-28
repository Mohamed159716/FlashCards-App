import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDataResults, MOBILE_FLASHCARD_STORAGE_KEY } from "./_DATA";

export function fetchDecks() {
    return AsyncStorage.getItem(MOBILE_FLASHCARD_STORAGE_KEY)
        .then(formatDataResults)
        .then((data) => data);

    // removeData();
}

const removeData = async () => {
    await AsyncStorage.removeItem(MOBILE_FLASHCARD_STORAGE_KEY);
};

export function submitDeck({ deck, key }) {
    return fetchDecks().then((data) =>
        AsyncStorage.setItem(
            MOBILE_FLASHCARD_STORAGE_KEY,
            JSON.stringify({ [key]: deck, ...data })
        )
    );
}

export function submitCardToDeck({ deckTitle, card }) {
    console.log(card);
    return fetchDecks().then((data) => {
        data[deckTitle].questions.push(card);
        return AsyncStorage.setItem(
            MOBILE_FLASHCARD_STORAGE_KEY,
            JSON.stringify(data)
        );
    });
}
