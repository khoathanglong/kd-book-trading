import React, { Component } from 'react';
import './App.css';
import Navbar from './component/navbar.js';
import SearchBar from './component/searchbar.js';
import MyBooks from './component/mybooks.js';
import AllBooks from './component/allbooks.js';
import {Switch, Route} from 'react-router-dom';
import Tab from './component/tab.js'
export const mybooksContext=React.createContext({});
export const allbooksContext=React.createContext({});
export const addbookContext=React.createContext({});

const fakeUserState={
  name:'admin',
  image:'xyz.jpg',
  fetching:false, //for adding new book in the list
  requestTrading:[], //book that is requested to trade
  error:null,
  books_own:[
    {
      img:"https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
      title:'book1',
      id:1,
      trader:null,
    }
  ],
}

class App extends Component {
  constructor(props){
    super();
    this.state={
      requestedBooks:[],//books that are searching
      fetching:false, 
      user:fakeUserState,
      allbooks:[
        {
          img:"https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
          title:'book1',
          id:1,
          owner:'admin',
          trader:null, //who asked for this book
        },
        {
          img:"https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
          title:'book2',
          id:2,
          owner:'admin2',
          trader:null,//who asked for this book
        },
      ]
    }
    this.searchBook=this.searchBook.bind(this);
    this.addBook=this.addBook.bind(this);
    this.removeBook=this.removeBook.bind(this);
    this.requestTrading=this.requestTrading.bind(this);
    this.cancelRequest=this.cancelRequest.bind(this);
  }
  componentDidMount(){
    // this.searchBook()
  } 

  componentDidUpdate(){
    console.log(this.state)
  }

  searchBook(e,name){
    e.preventDefault();
    let bookName=e.target.bookRequest.value;
    // let bookName="dragon ball"
    let url='https://www.googleapis.com/books/v1/volumes?projection=lite&langRestrict=en&q=';
    fetch(`${url}${bookName}`)
    .then(res=>res.json())
    .then(res=>{
      const book=res.items.map((each,i)=>{
        return {
          title:each.volumeInfo.title,
          img:each.volumeInfo.imageLinks?each.volumeInfo.imageLinks.thumbnail:"not found image",
          id:new Date(),
          trader:"he@",
        }
      });
      this.setState(state=>({requestedBooks:book}))
    })
  }

  addBook(index){
    //add book to the database first
    //if succeed, then change the sate accordingly
    //temporarily setState until connect with server
    // fetch(`/user/${book}`,{
    //   type:"put",
    //   data://
    // })
    let bookAdded=this.state.requestedBooks[index];

    this.setState(state=>{
      return {
        user:{
          ...state.user,
          books_own:[...state.user.books_own,bookAdded]
        },
        allbooks:[
          ...state.allbooks,
          {...bookAdded,owner:state.user.name}
        ]
      }
    })
  }

  removeBook(index){
    //remove book to the database first
    //if succeed, then change the sate accordingly
    //temporarily setState until connect with server
    // fetch(`/user/${book}`,{
    //   type:"put",
    //   data://
    // })
    let books_own=this.state.user.books_own.slice();
    //get index of book removed in allbooks list, then remove it 
    let bookIndex=this.state.allbooks.findIndex(e=>books_own[index].id===e.id);
    books_own.splice(index,1);//remove 1 book
    this.setState(state=>{
      return {
        user:{
          ...state.user,
          books_own
        },
        allbooks:[
        ...state.allbooks.slice(0,bookIndex),
        ...state.allbooks.slice(bookIndex+1)
        ]
      }
    })
  }

  requestTrading(index,trader){    //saved request in dbs first, then set State
    let bookOnRequest={...this.state.allbooks[index]};
    bookOnRequest.trader=trader;//add trader name to the bookOnRequest
    this.setState(
      {
        allbooks:[
          ...this.state.allbooks.slice(0,index),
         bookOnRequest,
          ...this.state.allbooks.slice(index+1),

        ], 
        user:{
          ...this.state.user,
          requestTrading:[
            ...this.state.user.requestTrading,
            bookOnRequest
          ]
        }
      }
    )
  }

  cancelRequest(bookOnRequestIndex,allbooksIndex){//remove the book from requestTrading
    this.setState({//happens after send request to server
      user:{
        ...this.state.user,
        requestTrading:[
          ...this.state.user.requestTrading.slice(0,bookOnRequestIndex),
          ...this.state.user.requestTrading.slice(bookOnRequestIndex+1)
        ]
      },
      allbooks:[
        ...this.state.allbooks.slice(0,allbooksIndex),
        {...this.state.allbooks[allbooksIndex],trader:null}, //remove trader name from allbooks
        ...this.state.allbooks.slice(allbooksIndex+1)
      ]
    })
  }

  render() {
    return (
      <mybooksContext.Provider 
        value={{
          user:this.state.user,
          removeBook:this.removeBook
        }}
      >
      <allbooksContext.Provider //pass all neccessary props to "value" to consume in the child
        value={{
          allbooks:this.state.allbooks,
          user:this.state.user,
          requestTrading:this.requestTrading,
          cancelRequest:this.cancelRequest
        }}
      >
      <addbookContext.Provider
        value={{
          fetching:this.state.fetching,
          requestedBooks:this.state.requestedBooks,
          searchBook:this.searchBook,
          addBook:this.addBook
        }}
      >
        <Navbar />
        <Tab/>
   {/*     <Switch>
          <Route exact path="/" component={AllBooks} />
          <Route exact path="/mybooks" component={MyBooks} />
          <Route exact path="/addbook" component={SearchBar} />

        </Switch>*/}
      </addbookContext.Provider>
      </allbooksContext.Provider>
      </mybooksContext.Provider>
    );
  }
}

export default App;
