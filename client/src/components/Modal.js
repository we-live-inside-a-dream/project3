import React from 'react'
import StyledButton from './StyledComponents/Inputs/StyledButton'
import styled from "styled-components";




const MODAL_STYLES ={
   
    position:'fixed',
    top: '50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    backgroundColor:'#FFF',
    padding:'100px',
    zIndex:1000,
    border:'10px solid #fc4445',
    borderRadius:'10px'
}

const OVERLAY_STYLES = {
    border:"10px",
    position:'fixed',
    top:'0',
    left:'0',
    right:'0',
    bottom:'0',
    backgroundColor:'rgba(0,0,0,.7)',
    zIndex:1000
}
function Modal({open,children,onClose}) {
    if(!open) return null

    return (
        <>
        <div style={OVERLAY_STYLES}/>
        { <div style = {MODAL_STYLES}>
            {children}
            <StyledButton onClick={onClose}>Close Modal</StyledButton>
        </div> }
       
        </>
    )
}

export default Modal
