import ReactHtmlParser from 'react-html-parser';
import snarkdown from 'snarkdown';
import React  from 'react';
import {history} from '../history'

const Section = ({ index, className, h2, text, children }) => {
    return 	<section key={index} className={className}>
    			<h2>{text}</h2>
    			{children}
    		</section>;
};

const Card = ({ index, className, title, link, text, children }) => {
    return 	<div key={index} className={className} style={{cursor: 'pointer'}} onClick={(e) => {history.push(link)}}>
    			<h5 className="card-title">{title}</h5>
				<p className="card-text">{text}</p>
    			{children}
        	</div>;
};

const Markdown = ({ index, text }) => {
    return ReactHtmlParser(snarkdown(text));
};

const Col = ({ index, className, children }) => {
    return <div key={index} className={className}>{children}</div>;
};

const Row = ({ index, className, children }) => {
    return <div key={index} className="row">{children}</div>;
};

const Tag = ({ index, className, text, tag, children }) => {
	if(typeof(children) == "string")
		return ReactHtmlParser('<'+tag+' key={'+index+'} className="'+className+'">'+children+'</'+tag+'>');
	console.log(children);
	console.log('----------------------------')
	var temp = [];

	for(var i=0; i<children.length; i++){
		temp.push(ReactHtmlParser('<'+tag+' key={'+index+'} className="'+className+'">'+children[i]+'</'+tag+'>'));
	}

	return temp;

};

export default {
	Section,
	Card,
	Markdown,
	Col,
	Row,
	Tag
}