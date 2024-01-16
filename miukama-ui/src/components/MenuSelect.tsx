import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import { FormControl, Grid, Avatar, Typography } from '@mui/material';
import { MenuList } from '@/interfaces/menu';
import { useRouter, usePathname } from 'next/navigation';
interface MenuItemListProps {
  selectItem: MenuList[];
  preferredLng: string;
}

export default function MenuItemList({
  selectItem,
  preferredLng,
}: MenuItemListProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selecteId, setSelectedId] = React.useState<number>(1);
  const [currentLanguage, setCurrentLanguage] = React.useState(preferredLng);
  const router = useRouter();
  const pathname = usePathname();
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  React.useEffect(() => {
    const storedValue = localStorage.getItem('preferredLng');
    const items = storedValue ? JSON.parse(storedValue) : null;
    const preferred = items;
    setCurrentLanguage(preferred?.code)
  }, [preferredLng])


  React.useEffect(() => {
    if (preferredLng) {
      setCurrentLanguage(preferredLng);
      const currentSelectedValue = selectItem.find((item) => {
        return item?.code === currentLanguage;
      });
      setSelectedId(currentSelectedValue?.id || 1);
      localStorage.setItem('preferredLng', JSON.stringify(currentSelectedValue));
    }
  }, [currentLanguage]);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    id: number,
    code?: string,
  ) => {
    setSelectedId(id);
    setAnchorEl(null);
    if (code) {
      if (
        pathname.startsWith(`/${currentLanguage}`) ||
        code !== currentLanguage
      ) {
        const newPath = pathname.replace(`/${currentLanguage}`, '');
        router.push(`/${code}${newPath}`);
      } else {
        router.push(pathname);
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedMenu = selectItem.find(
    (value: MenuList) => value.id === selecteId,
  );

  return (
    <Grid display="flex">
      <Avatar
        alt="Country"
        src={
          selectedMenu?.imageUrl
            ? selectedMenu.imageUrl
            : selectedMenu?.languageImgUrl
        }
        sx={{
          ml: '.3rem',
          mt: '2px',
          height: '20.11px',
          width: '21px',
        }}
      />
      <Grid sx={{ mt: 'auto', mb: 'auto', ml: '.5rem' }}>
        <Typography sx={{ fontSize: '12px' }}>
          {selectedMenu?.currencyName
            ? selectedMenu.currencyName
            : selectedMenu?.LangaueName}
        </Typography>
      </Grid>
      <IconButton onClick={handleClickListItem}>
        <KeyboardArrowDownIcon />
      </IconButton>
      <FormControl>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
          elevation={1}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          {selectItem &&
            selectItem.map((option: MenuList) => (
              <MenuItem
                key={option.id}
                selected={option.id === selecteId}
                onClick={(event) =>
                  handleMenuItemClick(event, option.id, option?.code)
                }>
                {option.currencyName ? option.currencyName : option.LangaueName}
              </MenuItem>
            ))}
        </Menu>
      </FormControl>
    </Grid>
  );
}
