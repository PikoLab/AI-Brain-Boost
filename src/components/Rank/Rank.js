import React, {Component} from 'react';


class Rank extends Component{
    constructor(){
        super();
        this.state={
            emoji:''
        }
    }

    componentDidMount(){
        this.generateEmoji(this.props.entries)
    }

    componentDidUpdate(prevProps,prevState){
        if (prevProps.entries === this.props.entires && prevProps.name===this.props.name){
            return null
        }
        this.generateEmoji(this.props.entries);
    }

    generateEmoji = (entries) => {
        fetch(`https://bkz2a79fkl.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
        .then(response => response.json())
        .then(data => this.setState({emoji: data.input}))
        .catch(console.log)
    }

    render(){
        return(
            <div className='f2' >
                <div>
                    {`${this.props.name}, your current entry count is...`}
                </div>
                <div className='f1'>
                    {this.props.entries}
                </div>
                <div className='f3'>
                    {`Rank Badge: ${this.state.emoji}`}
                </div>
            </div>
        );

    }
}

export default Rank; 