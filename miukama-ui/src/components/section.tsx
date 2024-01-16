import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
interface SectionProps {
  plan: string | boolean | null;
  highLight?: boolean;
  module?: boolean;
  first?: boolean;
  last?: boolean;
  firstRow?: boolean;
  lastRow?: boolean;
  displayBorder?: boolean;
  onClick?: () => void;
}

const Section: React.FC<SectionProps> = ({
  plan,
  highLight = false,
  module = false,
  first = false,
  last = false,
  firstRow,
  lastRow,
  displayBorder,
  onClick,
}) => {
  function splitBySecondCapital(word: string) {
    const parts = word.split(/(?=[A-Z][^A-Z])/);
    return parts.length > 1 ? `${parts[0]} ${parts[1]}` : word;
  }

  return (
    <>
      <Box
        sx={{
          padding: highLight
            ? '0px 20px'
            : first
            ? '0px 0px 0px 20px'
            : last
            ? '0px 20px 0px 0px'
            : 'none',
          pt: highLight && !module && firstRow ? '30px' : 'none',
          mt: highLight && !module && firstRow ? '-30px' : 'none',
          mb: highLight && !module && lastRow ? '-30px' : 'none',
          pb: highLight && !module && lastRow ? '30px' : 'none',
          wordWrap: 'breakWord',
          textAlign: 'center',
          fontWeight: 700,
          textTransform: module ? 'capitalize' : 'none',
          borderLeft: first ? '1px solid #C1C1C1;' : '',
          bgcolor: highLight ? '#B20000' : '#FFF',
          color: highLight ? '#FFF' : '#333333',
          borderTopLeftRadius: firstRow && first ? '5px' : 'none',
          borderBottomRightRadius:
            (lastRow && last) || highLight ? '5px' : 'none',
          borderBottomLeftRadius: lastRow && first ? '5px' : 'none',
          borderTopRightRadius:
            (firstRow && last) || highLight ? '5px' : 'none',
          borderRadius:
            (highLight && !module && firstRow && !first) ||
            (highLight && !module && lastRow && !first)
              ? '10px'
              : 'none',
        }}
        onClick={onClick}>
        {typeof plan === 'boolean' ? (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderBottom: displayBorder ? 'none' : '0.4px solid #C1C1C1',
              padding: '10px ',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {plan === true ? (
              <CheckCircleRoundedIcon
                color={highLight ? 'secondary' : 'primary'}
              />
            ) : (
              <CancelRoundedIcon color={highLight ? 'secondary' : 'primary'} />
            )}
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderBottom: displayBorder ? 'none' : '0.4px solid #C1C1C1',
              padding: highLight ? '20px 0' : '20px',
            }}>
            {module ? (
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                }}>
                {splitBySecondCapital(plan as string)}
              </Typography>
            ) : (
              <Typography
                variant={highLight ? 'body2' : 'caption'}
                sx={{
                  wordWrap: 'breakWord',
                  textAlign: 'center',
                  fontSize: highLight ? '13px' : 'none',
                  fontWeight: highLight ? 700 : 'none',
                }}>
                {plan}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Section;
