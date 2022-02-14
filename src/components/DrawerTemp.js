import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";


const DrawerTemp = () => {
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
      <Divider />
      <div className='d-flex justify-content-center'>
        <Link to='/meals' className='btn btn-dark'>Meals</Link>
      </div>
      <Divider />
      <div className='d-flex justify-content-center'>
        <Link to='/ingredients' className='btn btn-dark'>Ingredients</Link>
      </div>
      </Box>
  );

  return (
    <div>
      {['Abrir'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <FiMenu size={30}/>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default DrawerTemp;