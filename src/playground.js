import React from 'react';
import Loader from './component/myComponent';

class TempComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listOfPromises: [Promise.resolve(1), new Promise((resolve, reject) => {
                setTimeout(resolve, 10000, 'one');
            }), Promise.resolve(3)]
        };
    }

    render(){

        return(
            <div>
                <h1>this is being done</h1>
                <Loader n={3} render={() => this.state.listOfPromises} err={null}/>
            </div>
        );
    }
}

export default TempComponent;
