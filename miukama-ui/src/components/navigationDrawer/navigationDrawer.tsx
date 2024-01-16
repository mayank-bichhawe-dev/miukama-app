import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemText,
  Typography,
} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import RenderListItem from './renderListItem';
import { menuItemsProps } from './navigationDrawerConfiguration';
import HelpBox from '../helpBox';
import { Divider } from '@mui/material';

const NavigationDrawer = ({ menuItems }: { menuItems: menuItemsProps[] }) => {
  const drawerWidth = 260;
  return (
    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: 1200,
          ['& .MuiDrawer-paper']: {
            width: drawerWidth,
            boxSizing: 'border-box',
            paddingTop: '40px',
            borderWidth: 0,
            background: '#151515',
          },
          '& .MuiDrawer-paper::-webkit-scrollbar': {
            width: '0px',
          },
        }}>
        <Toolbar disableGutters />
        <Box
          sx={{
            display: 'grid',
            rowGap: '35px',
            paddingTop: '65px',
            height: '100%',
          }}>
          <List sx={{ paddingTop: '0' }}>
            <ListItemText>
              <Typography
                variant="caption"
                sx={{ fontSize: '10px', paddingLeft: '28px' }}>
                MAIN MENU
              </Typography>
            </ListItemText>
            {menuItems
              ? menuItems.map((item: menuItemsProps) => {
                  return item.menuType === 'main' ? (
                    <RenderListItem item={item} key={item.key} />
                  ) : null;
                })
              : null}
          </List>
          <Divider
            variant="middle"
            sx={{ borderBottom: '1px dashed #55597D', opacity: 0.5 }}
          />
          <List sx={{ paddingTop: '0' }}>
            <ListItemText sx={{ paddingLeft: '28px' }}>
              <Typography variant="caption" sx={{ fontSize: '10px' }}>
                OPTIONS
              </Typography>
            </ListItemText>
            {menuItems
              ? menuItems.map((item: menuItemsProps) => {
                  return item.menuType === 'options' ? (
                    <RenderListItem item={item} key={item.key} />
                  ) : null;
                })
              : null}
          </List>
          <Box p="13px">
            <HelpBox />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavigationDrawer;
