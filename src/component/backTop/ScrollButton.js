import React, {useState} from 'react';
import { IconContext } from 'react-icons';
import {BiSolidUpArrow} from 'react-icons/bi';
import { Button } from './Styles';
  
const ScrollButton = () => {
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <Button>
     <IconContext.Provider value={{ color: '#fc0' }}>
        <BiSolidUpArrow onClick={scrollToTop} 
        style={{display: visible ? 'inline' : 'none'}} />
     </IconContext.Provider>
    </Button>
  );
}
  
export default ScrollButton;