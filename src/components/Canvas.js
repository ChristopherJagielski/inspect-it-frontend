import React, { useEffect, useRef } from 'react';

const Canvas = props => {

    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    const img = new Image()
    img.src = props.image
    // img.width = 750
    // img.height = 450

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = 750
        canvas.height = 450
        canvas.style.border = 2

        const context = canvas.getContext('2d')
        // context.scale(1, 1)
        context.fillStyle = 'rgb(221, 121, 38, 0.45)'
        contextRef.current = context
          
        // context.fillStyle = '#FFFFFF'
        // context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        img.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
          };

        console.log(props.image)
        }, [img])

    const markDefect = ({nativeEvent}) => {
            const {offsetX, offsetY} = nativeEvent;
            contextRef.current.fillRect(offsetX, offsetY, 20, 20)
            
        }

    return <canvas 
            // style={{ width: 750, height: 500, border:2}} 
            ref={canvasRef} {...props}
            onMouseDown={markDefect}
            />
}

export default Canvas   