import {
    RECEIVE_DECKS,
    ADD_DECK,
    DELETE_DECK,
    ADD_CARD,
} from "../actions/index";

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            };
        case ADD_DECK:
            return {
                [action.title]: {
                    title: action.title,
                    questions: [],
                },
                ...state,
            };
        case DELETE_DECK:
            delete state[action.title];
            return {
                [action.title]: {
                    ...state[action.title],
                    questions: [],
                    delete: true,
                },
                ...state,
            };
        case ADD_CARD:
            return {
                ...state,
                [action.deckTitle]: {
                    ...state[action.deckTitle],
                    questions: [
                        ...state[action.deckTitle].questions,
                        action.card,
                    ],
                },
            };
        default:
            return state;
    }
}
