import React from 'react';

class Loader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cursor: 0,
            loadedItems: [],
            flag: 0,
            loaded: false
        };
        this.handleNext = this.handleNext.bind(this);
        this.handleFetch = this.handleFetch.bind(this);
    }

    handleFetch(){
        const promiseList = this.props.render();
        this.setState({
            loaded: false
        });
        console.log(this.state.loaded);
        Promise.all(promiseList.map(p => 
            p.catch(() => this.props.err))).then((values) =>
            {
                this.setState((state) => ({
                    loadedItems: state.loadedItems.concat(values),
                    flag: 1,
                    loaded: true
                }));
                console.log(this.state.loaded);
            }).catch((err)=>{
                console.log("unable to load");
            })
    }
    componentDidMount(){
        this.handleFetch();
    }

    handleNext(){
        console.log("this is clicked");
        this.handleFetch();
        console.log(this.state.loadedItems);
        this.setState((state) => ({
            cursor: state.cursor + this.props.n
        }));
        
    }
    render(){
    const showList = this.state.loadedItems.slice(
        this.state.cursor, this.state.cursor + this.props.n).map((value, index) => <li key={index}>{value}</li>);
        return(
            <div>
                <h1>I am here</h1>
                <h1>{this.flag}</h1>
                <ul>{showList}</ul>
                <button onClick={this.handleNext}>Next</button>
            </div>
        );
    }
}

export default Loader;
