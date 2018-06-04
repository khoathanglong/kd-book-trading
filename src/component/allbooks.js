import React from 'react';
import {
	Col, 
	Container,
	Row,
	Button,
	Card, 
	CardImg, 
	CardBody, 
	CardTitle,
	CardText 
} from 'reactstrap';
import {ConnectAllBooks} from '../HOC.js'
import Masonry from 'react-masonry-component';

const AllBooks= (props)=>{
	const {name, requestTrading} =props.allbooks.user;//could only pass name and requestTrading
	const generateButton=(userName,owner,allbooksCurrentID,allbooksCurrentIndex)=>{
		//get index of current requestTrading book
		let bookOnRequestIndex=requestTrading.findIndex(book=>book.id==allbooksCurrentID);
		let button;
		if (userName===owner){
			button=<Button color="success" className="owned-button">Onwned</Button>
		}else{
			if (bookOnRequestIndex>-1){
				button=
					<React.Fragment >
						<Button
							color="danger"
							className="cancel-button" 
							onClick={()=>props.allbooks.cancelRequest(bookOnRequestIndex,allbooksCurrentIndex)}
						>
							Cancel
						</Button>{" "}
					</React.Fragment>
			}else{
				button=
					<Button
						className="request-button" 
						color="primary" 
						onClick={()=>props.allbooks.requestTrading(allbooksCurrentIndex,userName)}
					>
						Request
					</Button>
			}
		}
		return button
	}
	return (
		<Container fluid>
			<Masonry>
			{props.allbooks.allbooks.map((each,index)=>{
				return (
					<Col sm="6" xs="12" md="3" key={index}>
						<Card>
					        <CardImg top width="100%" src={each.img} alt={each.name} />
					        	<CardTitle>{each.title}</CardTitle>
					        	<CardText>
					        		{generateButton(name,each.owner,each.id,index)}
					        	</CardText>
					      </Card>
					</Col>
				)
			})}
			</Masonry>
		</Container>
	)
};

export default ConnectAllBooks(AllBooks)