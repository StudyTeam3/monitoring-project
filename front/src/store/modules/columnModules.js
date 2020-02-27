export const SETCOLUMNS = 'SETCOLUMNS';

const initialState = {
    columns: ["status", "message_id"]
};

export function setColumns(columns) {
    return {
        type: SETCOLUMNS,
        columns
    }
}

export default function custom(state = initialState, action) {
    if(action.type === 'SETCOLUMNS') {
        return {
            ...state,
            columns: action.columns
        }
    } else {
        return state;
    }
}

