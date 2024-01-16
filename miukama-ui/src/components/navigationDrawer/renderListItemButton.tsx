import {
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Chip,
  Link as MuiLink,
} from '@mui/material';
import React from 'react';
import Link from 'next/link';

interface RenderListItemButtonProps {
  id: string;
  primaryText: string;
  links: string;
  iconName?: string;
  imageSrc?: string;
  showChip?: boolean;
}

const RenderListItemButton: React.FC<RenderListItemButtonProps> = ({
  id,
  primaryText,
  links,
  iconName,
  imageSrc,
  showChip = false,
}) => {
  const renderImage = (imageSrc: string) => {
    return (
      <img
        src={imageSrc}
        alt="Icon"
        style={{ width: '24px', height: '24px' }}
      />
    );
  };

  const renderIcon = (iconName: string | undefined) => {
    return <Icon>{iconName}</Icon>;
  };

  return (
    <MuiLink
      href={links}
      key={id}
      component={Link}
      style={{
        textDecoration: 'none',
        color: '#fff',
      }}>
      <ListItemButton
        disableGutters
        sx={{ alignItems: 'flex-start', paddingLeft: '28px' }}>
        <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
          {imageSrc ? renderImage(imageSrc || '') : renderIcon(iconName)}
        </ListItemIcon>
        <ListItemText
          primary={<Box>{primaryText}</Box>}
          primaryTypographyProps={{
            style: { fontSize: '14px', fontWeight: 500 },
          }}
        />
        {showChip ? (
          <Box pr="20px">
            <Chip
              variant="filled"
              size="small"
              color="success"
              label="3 new"
              sx={{
                p: 0,
                height: '20px',
                '& 	.MuiChip-label': { pr: '6px', pl: '6px' },
              }}
            />
          </Box>
        ) : null}
      </ListItemButton>
    </MuiLink>
  );
};

export default RenderListItemButton;
