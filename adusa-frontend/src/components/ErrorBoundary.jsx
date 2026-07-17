import { Component } from "react";

export default class ErrorBoundary extends Component{
    constructor(props){
        super(props);
        this.state={hasError:false}
    }
    static getDerivedStateFromError(error){
        return {hasError:true,error:error.message}
    }
    componentDidCatch(error,errorInfo){
        console.error(error,errorInfo);
    }
    render(){
        if(this.state.hasError)
        {
            return(
                <p>Something Went Wrong: {this.state.error}</p>
            )
        }
        return this.props.children
    }
}