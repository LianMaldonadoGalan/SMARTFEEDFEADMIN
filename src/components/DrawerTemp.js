import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import { Button as Button2 } from "../styles/Button";
import { FaRegWindowClose } from "react-icons/fa";


const DrawerTemp = ({ logout, user }) => {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='d-flex justify-content-center'>
        <img src={require('../images/logo.jfif')} width="200" height="200"/>
      </div>
      
      <div className='d-flex justify-content-center'>
        <Link to='/meals' ><Button2 type="button" style={{marginBottom: 10, width: 245}}>Platillos</Button2></Link>
      </div>
      <Divider />
      <div className='d-flex justify-content-center'>
        <Link to='/ingredients' ><Button2 type="button" style={{marginTop: 10, width: 245} }>Ingredientes</Button2></Link>
      </div>
      <div className='d-flex justify-content-center'>
        <Button onClick={logout} type="button" color="error" style={{marginTop: 275, width: 245}} variant="contained" endIcon={<FaRegWindowClose />}>Cerrar Sesion</Button>
      </div>
      
      </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <FiMenu size={30} color={'#1f1809'}/>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            color="#f1fff0"
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default DrawerTemp;