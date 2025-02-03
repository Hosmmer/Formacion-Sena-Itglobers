import { useEffect, useReducer, useState } from "react";

function useLocalStorage(itemName, initialValue) {

    const [state, dispatch] = useReducer(reducer, initialState({ initialValue }))
    const { sincronizedItem, item, loading, error } = state

    //Actions CREATOR
    const onError = (error) => dispatch({
        type: actionTypes.error,
        payload: error
    })
    const onSucess = (item) => dispatch({
        type: actionTypes.success,
        payload: item
    })

    const onSave = (item) => dispatch({
        type: actionTypes.save,
        payload: item
    })


    const onSincronize = () => dispatch({
        type: actionTypes.sincronize,
    })

    useEffect(() => {
        setTimeout(() => {
            try {
                const localStorageItem = localStorage.getItem(itemName);
                let parsedItem;

                if (!localStorageItem) {
                    localStorage.setItem(itemName, JSON.stringify(initialValue));
                    parsedItem = initialValue;
                } else {
                    parsedItem = JSON.parse(localStorageItem);
                }

                onSucess(parsedItem)
                // setItem(parsedItem);
                // setLoading(false);
                // setSincronizedItem(true);
            } catch (error) {
                onError(error)

            }
        }, 2000);
    }, [sincronizedItem]);

    const saveItem = (newItem) => {
        try {
            localStorage.setItem(itemName, JSON.stringify(newItem));
            onSave(newItem)
        } catch (error) {
            onError(error)

        }

    }

    const sincronizeItem = () => {
        onSincronize()
    }

    return { item, saveItem, loading, error, sincronizeItem };
}

const initialState = ({ initialValue }) => ({
    sincronizedItem: true,
    error: false,
    loading: true,
    item: initialValue
})

const actionTypes = {
    error: 'ERROR',
    success: 'SUCCESS',
    save: 'SAVE',
    sincronize: 'SINCRONIZE'
}


const reducerObject = (state, payload) => ({
    [actionTypes.error]: {
        ...state,
        error: true
    },
    [actionTypes.success]: {
        ...state,
        error: false,
        loading: false,
        sincronizedItem: true,
        item: payload
    },
    [actionTypes.save]: {
        ...state,
        item: payload
    },
    [actionTypes.sincronize]: {
        ...state,
        sincronizedItem: false,
        loading: true,
    }
})

const reducer = (state, action) => {
    return reducerObject(state, action.payload)[action.type] || state;
}


export { useLocalStorage };



// const defaultTodos = [
//     { text: 'Cortar cebolla', completed: true },
//     { text: 'Tomar el Curso de Intro a React.js', completed: false },
//     { text: 'Llorar con la Llorona', completed: false },
//     { text: 'LALALALALA', completed: false },
//     { text: 'Aprendi Estados Derivados', completed: true },

// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));
// localStorage.removeItem('TODOS_V1');