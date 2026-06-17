import { Component } from "react";
export default class StateClassComponent extends Component{
    constructor(props)
    {
        super(props)
        this.state={count:0}
    }
    render(){
        return <h1>{this.props.name}-{this.state.count}</h1>
    }
}