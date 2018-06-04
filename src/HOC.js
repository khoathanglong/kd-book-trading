import {mybooksContext, allbooksContext,addbookContext} from './App.js';
import React from 'react';

export const ConnectMyBooks = (Component)=>{
	return (props)=>{
		return (
			<mybooksContext.Consumer>
				{value=><Component {...props} mybooks={value} />}
			</mybooksContext.Consumer>
		)
	}
}

export const ConnectAllBooks = (Component)=>{
	return (props)=>{
		return (
			<allbooksContext.Consumer>
				{value=><Component {...props} allbooks={value} />}
			</allbooksContext.Consumer>
		)
	}
}

export const ConnectAddBook = (Component)=>{
	return (props)=>{
		return (
			<addbookContext.Consumer>
				{value=><Component {...props} addbook={value} />}
			</addbookContext.Consumer>
		)
	}
}