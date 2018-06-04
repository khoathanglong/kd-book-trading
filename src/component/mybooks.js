import React from 'react';
import '../style/mybooks.css';
import Masonry from 'react-masonry-component';
import {ConnectMyBooks} from '../HOC.js'

import {
	Col,
	Container, 
	Card, 
	CardImg, 
	CardText, 
 	CardTitle,  
 	Button} from 'reactstrap';

const MyBooks = (props)=>{
	return (
		<Container>
			<Masonry>
				{props.mybooks.user.books_own.map((each,index)=>{
					return (
						<Col sm="6" xs="12" md="4" lg="3"  key={index}>
							<Card>
								<CardImg src={each.img}/>
								<CardTitle>{each.title}</CardTitle>
								<CardText>
									Trader: {" "}
										{each.trader?each.trader.slice(0,each.trader.indexOf('@')):"No"}
										{each.trader
											?<React.Fragment>
												<br/>
												Accept: {" "}
													<i class="fa fa-check"></i>{" "}
													<i class="fa fa-close"></i>
											</React.Fragment>	
											:""
										}	
								</CardText>
								<div
									className="card-text-remove"
									onClick={()=>props.mybooks.removeBook(index)}
								>
									<i class="fa fa-window-close"></i>
								</div>
							</Card>
						</Col>
					)
				})}
			</Masonry>
		</Container>	
	)
};
export default ConnectMyBooks(MyBooks)