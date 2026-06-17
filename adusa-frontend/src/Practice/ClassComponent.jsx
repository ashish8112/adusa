import {Component} from "react" 
export default class StudentCard extends Component{ 
    render(){
        return <h1>Class Component</h1>
    }
}
// or below 
// import React from "react"
// export default class StudentCard extends React.Component{
//     render(){
//         return <h1>Class Component</h1>
//     }
// }

//After React 17+ we don't need to import React as it is done automatically during JSX transform, but  
// to use React object literal which consist Component class we have to import React 
// React = {
//   Component: class Component { ... },
//   useState: function() { ... },
//   useEffect: function() { ... },
//   // ...aur bahut kuch
// }
