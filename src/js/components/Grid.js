import React from "react"
import grid from "./constGrid"
import ReactWindowResizeListener from 'window-resize-listener-react';
import { connect } from "react-redux"
//fetchCoordsFromDB && setCoord via Redux
import { fetchCoordsFromDB, setCoord } from "../actions/coordinateActions"

@connect((store) => {
    return {
        coordinate: store.coordinate.coordinate,
    };
})

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstValue: undefined,
            secondValue: undefined,
            clickBool: true,
            x1: undefined,
            x2: undefined,
            y1: undefined,
            y2: undefined,
            target1: undefined,
            target2: undefined,
            //wWidth: window.innerWidth,
            //wHeight: window.innerHeight,
            message: "Status: Choose the first coordinate",
            submitBtnDisabled: true, //for enabling & disabling setCoords button 
            fetchCoordsBtnDisabled: true, //for enabling & disabling fetchCoords button
            ResizeData: {
                Height: innerHeight,
                Width: innerWidth
            }
        };
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize(e) {
        console.log("e.currentTarget: "+e.currentTarget.innerWidth)
        console.log("WidthW: "+this.state.ResizeData.Width)
        if(this.state.ResizeData.Width != e.currentTarget.innerWidth) {
            console.log("Someting is different here!! Ooooups!!!")
            this.drawArrowFirstEl(this.state.target1)
            this.drawArrowSecondEl(this.state.target2)

        }
        this.setState({
            ResizeData: {
                Height: e.currentTarget.innerHeight,
                Width: e.currentTarget.innerWidth,
            }
        })
        

    }

    //Function submits coordinates to the DB via Backend (using Redux)
    submitCoordinates(c1, c2) {
        //Checks if c1 && c2 coordinates are not the same AND both values are chosen before submitted 
        if (this.state.secondValue != undefined && this.state.firstValue != this.state.secondValue) {
            console.log(c1 + " and " + c2);
            try {
                this.props.dispatch(setCoord(c1, c2))

                this.setState({
                    message: "Status: Coordinates submitted successfully. Square IDs: (" + this.state.firstValue + ", " + this.state.secondValue + ")",
                    submitBtnDisabled: true,
                    firstValue: undefined,
                    secondValue: undefined,
                })
            }
            catch (err) {
                this.setState({
                    message: "Status: Error! Communication with Back-End is faulty."
                })
            }

            ///////////////////////////////////////////////////////////////////////
            //här borde man nog ha en if sats som kollar mot DB om värdena har matats in, innan man säger att det gick bra
            /*  //////////////////////////////////////////////////////////////////////
              this.setState({
                  message: "Status: Coordinates submitted successfully. Square IDs: (" + this.state.firstValue + ", " + this.state.secondValue + ")",
                  submitBtnDisabled: true,
                  firstValue: undefined,
                  secondValue: undefined,
              })
  */

        }
        else {
            console.log("Please choose two different coordinates")
            this.setState({ message: "Status: Please choose two different coordinates" })
        }
    }

    //Function for fetching an array of all coordinates stored in DB.
    fetchCoordsFromDB() {
        this.props.dispatch(fetchCoordsFromDB())
        true
    }

    //Selects two coordinates in the Grid. 
    gridClick(e, i) {
        const target = e.target

        //Sets first value
        if (this.state.clickBool == true) {

            this.setState({ firstValue: i }, () => {

                //Sets clickBool to false to go to second value on next click.
                this.setState({ clickBool: false })
                //Flush second value
                this.setState({ secondValue: undefined })

                //Sends coordinates of selected element to drawArrowFirstEl.
                this.drawArrowFirstEl(target)

                //disable the setCoords button
                this.setState({ submitBtnDisabled: true })

                this.setState({ message: "Status: Choose the second coordinate" })

                this.setState({ 
                target1: target
                })

            });

            //Sets second value
        } else if (i != this.state.firstValue) {
            this.setState({ secondValue: i }, () => {
                //Sets clickBool to true to go to first value if user clicks different coordinate again.
                //Sort of reset
                this.setState({ clickBool: true })

                //Sends coordinates of selected element to drawArrowSecondEl.
                this.drawArrowSecondEl(target)

                //Enable the setCoord button
                this.setState({ submitBtnDisabled: false })

                this.setState({ message: "Status: Ready to submit, or rechoose the first coordinate" })
                
                this.setState({ 
                target2: target
                })
            });
        }
        else {
            console.log("Please choose two different coordinates")
            this.setState({ message: "Status: Please choose two different coordinates" })
        }
    }

    //Applies the css class circle on first selected coordinate to mark first value.
    marked(i) {
        if (this.state.firstValue == i) {
            return (
                <div className="circle"></div>
            )
        }
    }

    drawArrowFirstEl(element) {
        if(!element){
            return
        }
        //Height and width of the first chosen square div.
        var elementHeight = element.offsetHeight;
        var elementWidth = element.offsetWidth;

        //Find the center X and Y coordinate of the first chosen square div.
        this.setState({
            x1: element.getBoundingClientRect().left + elementWidth / 2,
            y1: element.getBoundingClientRect().top + elementHeight / 2 + window.scrollY
        })
    }

    drawArrowSecondEl(element) {
        if(!element){
            return
        }
        //height and width of the second chosen square div.
        var elementHeight2 = element.offsetHeight;
        var elementWidth2 = element.offsetWidth;

        //Find the center X and Y coordinate of the second chosen square div.
        this.setState({
            x2: element.getBoundingClientRect().left + elementWidth2 / 2,
            y2: element.getBoundingClientRect().top + elementHeight2 / 2 + window.scrollY
        })
    }

    //Draws the svg arrow between first and second value.
    drawArrow() {
        if (this.state.secondValue != undefined) {
            return (
                <svg className="svgStyle">
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="4" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,1 L0,5 L5,3 z" />
                        </marker>
                    </defs>

                    <line className="line" x1={this.state.x1} y1={this.state.y1} x2={this.state.x2} y2={this.state.y2}
                        markerEnd="url(#arrow)" />
                </svg>
            )
        }
    }

    render() {

        //ANVÄNDS DETTA?
        const { coordinate } = this.props;

        return (
            <div>
               
                <div className="contentContainer">

                    <div className="infoContainer">
                        <h3> Culture & Beliefs</h3>
                        <p>Is the client's status quo and long term goals a good match with our values and beliefs?</p>
                        <h3>Challenging</h3>
                        <p>Is the assignment challenging, do you learn and developing your skillset?</p>
                    </div>

                    {/*
                    Draw the Grid with 100 squares, including the X and Y axis.
                    The grid is formed of 100 square divs. 
                    Each square has a unique key, "i".
                    If a square div is clicked, execute gridClick() to handle the coordinate data.
                    Draw a circle in the square div (if it was the first chosen coordinate).
                    */}
                    <div className="grid">
                        <div className="xNy">

                            <button className="button" disabled={this.state.submitBtnDisabled}
                                onClick={() => this.submitCoordinates(this.state.firstValue, this.state.secondValue)}>Submit</button>

                        </div>
                        {grid.map((i) => {
                            return (<div key={i} onClick={(e) => this.gridClick(e, i)} className="square">{this.marked(i)}</div>);
                        })}

                    </div>

                    {this.drawArrow()}

                    <div>
                        {/*
                        inspiration
                        http://stackoverflow.com/questions/30187781/react-js-disable-button-when-input-is-empty
                        
                        disabled = true gör det button grå och oklickbar
                                   false gör det grönt                        
                        */}
                        {/*<button className="button" disabled={this.state.fetchCoordsBtnDisabled}
                            onClick={this.fetchCoordsFromDB.bind(this)}>load coords</button>*/}


                    </div>

                    {/*the Status messages*/}
                    <div className="statusBar">
                        <h4>{this.state.message}</h4>
                            <ReactWindowResizeListener onResize={this.handleResize} />
                    </div>
                </div>
            </div>
        );
    }
}

