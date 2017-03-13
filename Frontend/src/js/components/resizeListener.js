import React from 'react';
//import ReactWindowResizeListener from 'window-resize-listener-react';
 
export default class resizeListener extends React.Component {
 
    constructor() {
        super();
        this.resizeHandler = this.resizeHandler.bind(this);
    }
 
    resizeHandler(event) {
        console.log("Hellooo can u hear me?")
    }
 
    render() {
        return(
            <div>
                <ReactWindowResizeListener onResize={this.resizeHandler} />
            </div>
        )
    }
 
}