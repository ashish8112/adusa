import { Component } from "react";

class ErrorBoundary extends Component{
    constructor(props)
    {
        super(props)
        this.state={hasError:false} 
    }
    static getDerivedStateFromError(error){ // used for Fallback UI and update the state
        return {hasError:true}
    }
    static componentDidCatch(error,errorInfo)
    {
        console.error(error,errorInfo)
    }
    render(){
        if(this.state.hasError)
            return <h1>Something Went Wrong.</h1>
        return this.props.children
    }
}

export default ErrorBoundary