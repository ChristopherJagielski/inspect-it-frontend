import React, { useEffect, useRef, useState } from 'react';

const Canvas = props => {

    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    const [coords, setNewCoords] = useState({x:"", y:""})

    const img = new Image()
    img.src = props.image

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = 750
        canvas.height = 450
        canvas.style.border = 2
        console.log("draw")
        const context = canvas.getContext('2d')

        context.fillStyle = 'rgb(255, 0, 0, 0.22)'
        contextRef.current = context

        img.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
          };
        }, [props.image])

    const markDefect = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        console.log('fff',props.enableMarking)
        if (props.enableMarking) {
            contextRef.current.fillRect(offsetX - 12, offsetY - 12, 25, 25);
            setNewCoords({x: offsetX, y: offsetY})

            props.setcoordinates(coords)
        } else { 
            window.alert('Pick a defect name first')
        }

        console.log("click ", props)
        }

    return <canvas
            ref={canvasRef}
            onClick={markDefect}
            />
}

export default Canvas   