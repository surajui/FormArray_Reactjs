import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
//intial state

const intialState = {
	transaction: [
		{ id: 1, text: 'Flower', amount: -50 },
		{ id: 2, text: 'Book', amount: 500 },
		{ id: 1, text: 'Pen', amount: -20 },
		{ id: 1, text: 'Bag', amount: 650 },
	],
};

//GlobalContext
export const GlobalContext = createContext(intialState);

//Global Provider

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, intialState);

	return (
		<GlobalContext.Provider value={{ transaction: state.transaction }}>
			{children}
		</GlobalContext.Provider>
	);
};
