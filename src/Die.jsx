import React from 'react'

export default function Die(props) {
    const dieStyles = {
        backgroundColor: props.isHeld ? "#59E391" : "white",
      };
    // console.log(props.isHeld)
    return (
        <div style={dieStyles} onClick={props.holdDice}>
            {props.value}
        </div>
    )
}