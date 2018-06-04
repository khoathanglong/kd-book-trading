// handle error when could not find the book from goole api
import React, {Component} from 'react'
import {
	Row, 
	Col,
	Container, 
	Form, 
	FormGroup,
	Label,
	Input,
	Button,
	Card,CardImg , CardTitle,

} from 'reactstrap';
import {Consumer} from '../App.js';
import Masonry from 'react-masonry-component';
import "../style/searchbar.css";
import {ConnectAddBook} from '../HOC.js'
class SeachBar extends Component {
	constructor(props){
		super(props);
		  this.toggle = this.toggle.bind(this);
		  this.state = {
		      tooltipOpen: false
		  };
	}
	toggle() {
	    this.setState({
	      tooltipOpen: !this.state.tooltipOpen
	    });
  	}
	render(){
		return(
			<React.Fragment>
				<Form inline onSubmit={this.props.addbook.searchBook}>
					<FormGroup>
						<Input 
							type="text"
							placeholder="type your book name"
							name="bookRequest"
							required
						/>
					</FormGroup>
					<Button color="primary">
						Search
					</Button><br/> 
					{this.props.addbook.fetching?
						<span>Searching your book</span>:
						this.props.addbook.error?
						<span>{`Error: ${this.props.addbook.error}`}</span>
						:""
					}
				</Form><br/>
					<Masonry >
						{this.props.addbook.requestedBooks.map((each,i)=>{
							return (
									<Col sm="4" xs="6" md="3"  key={i}>
										<Card onClick={()=>this.props.addbook.addBook(i)}>
											<CardImg className="addbook" src={each.img} />
											<CardTitle>{each.title}</CardTitle>
										</Card>
									</Col>
							)
						})}
					</Masonry>
			</React.Fragment>
		)
	}
}

export default ConnectAddBook(SeachBar)