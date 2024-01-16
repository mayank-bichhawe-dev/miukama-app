import React from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { KeyPrefix, TFunction } from 'i18next';

interface itemCardProps {
  // eslint-disable-next-line no-unused-vars
  handleItemCard: (id: number) => void;
  itemCardSelectedId: number;
  id: number;
  cardName: string;
  cardValue: number;
  cardPercent: number;
  cardToday: number;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}
const ItemCard = ({
  t,
  handleItemCard,
  itemCardSelectedId = 1,
  id,
  cardName = '',
  cardValue,
  cardPercent,
  cardToday,
}: itemCardProps) => {
  function formatValue(value: any) {
    if (value > 999) {
      const formattedValue = (value / 1000).toFixed(2);
      return formattedValue.endsWith('.00')
        ? (value / 1000).toFixed(0) + 'k'
        : formattedValue + 'k';
    } else {
      return value.toString();
    }
  }
  let cardsValue = formatValue(cardValue);
  let todayValue = formatValue(cardToday);

  return (
    <Box
      onClick={() => handleItemCard(id)}
      padding="1rem 1rem"
      minWidth="11rem"
      height="7.3rem"
      sx={{
        background: itemCardSelectedId === id ? '#B20000' : '#FFFFFF1C',
        clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)',
        cursor: 'pointer',
      }}>
      <Box display="flex" alignItems="center">
        <Typography variant="caption">{cardName}</Typography>
        <IconButton sx={{ ml: 'auto' }}>
          <GroupsOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ pt: '.2rem', pb: '.2rem' }}>
        <Typography variant="h4" fontWeight={600}>
          {cardsValue.toLocaleString()}
        </Typography>
      </Box>
      <Box display="flex" columnGap=".313rem" alignItems="center">
        <Typography fontSize=".625rem">
          <IconButton>
            <ArrowDropUpIcon sx={{ width: '.813rem', height: '.813rem' }} />
          </IconButton>
          {cardPercent.toLocaleString()}
        </Typography>
        <Typography variant="caption" fontWeight={100}>
          {todayValue.toLocaleString()} {t('product.productCardName.todays')}
        </Typography>
      </Box>
    </Box>
  );
};

export default ItemCard;
