import React from 'react';
import '../App.css';
import {history} from '../history'
import Header from '../components/Header';
import funcs from '../components/JSX_Components';

const ValidComponents = ["Section","Card","Markdown","Col","Row","Tag"];

class Home extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            jsxString: "",
            jsxError: false,
            jsx: []
        };

    }

    componentWillMount(){
        var user = window.sessionStorage.getItem("user");
        if(!user) {
          history.push("/login");
          return;
        }
    }

    renderChildren(i, elements){
        if(elements.length > 0)
            if(typeof(elements[0]) != "object")
                return elements;

        var recChildren = [], recTemp, children = [];

        for(var j=0; j<elements.length; j++){
            recTemp = elements[j].props;
            recChildren = [];
            
            if(recTemp)
                if(ValidComponents.includes(elements[j].component)){
                    if(recTemp.children)
                        recChildren = this.renderChildren(j, recTemp.children);

                    if(recTemp != undefined){
                        recTemp['index'] = i+""+j;
                        recTemp['children'] = recChildren;

                        children.push(funcs[elements[j].component](recTemp));
                    }
                }
        }

        return children;
    }

    renderJSX(value){
        var jsxError = true;
        var jsxString = value;
        var children, temp, renderJSX = [];

        try{
            jsxString = JSON.parse(jsxString);

            for(var i=0; i<jsxString.length; i++){
                children = [];
                temp = jsxString[i].props;
                
                if(temp)
                    if(ValidComponents.includes(jsxString[i].component)){
                        if(temp.children)
                            children = this.renderChildren(i, temp.children);

                        renderJSX.push(funcs[jsxString[i].component]({index: i, text: temp.text, children: children, className: temp.className}));
                    }
            }
            
            jsxError = false;

        }catch(err){
            console.log(err);
            jsxError = true;
        }
        
        this.setState({jsxError: jsxError, jsx: renderJSX, jsxString: value});
    }

    render(){
        const {jsxError, jsxString, jsx} = this.state;
        return(
            <div className="App">
                <Header loggedIn={true} />
                <div className="row">
                    <div className="col-sm-3 col-xs-12" style={{textAlign:'center'}}>
                        <textarea   value={this.state.jsxString}
                                    onChange={(e) => this.renderJSX(e.target.value)}
                                    placeholder="Enter Your JSX Code Here..."
                                    className="jsx-input" rows="20"></textarea>
                    </div>
                    <div className="col-sm-9 col-xs-12">
                        {jsx}
                        {jsxError && jsxString != "" && <h6 className="error-jsx">Invalid JSX Input Provided</h6>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;