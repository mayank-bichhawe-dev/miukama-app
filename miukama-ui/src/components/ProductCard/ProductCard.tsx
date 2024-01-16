import * as React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Box } from '@mui/material';
import { ProductCardProps } from '@/interfaces/product';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { loginLocalStorageHelper } from '@/utils/loginLocalStorageHelper';
// @TODO: move css to css module
// @TODO: add size
const s3ImageBaseUrl = process.env.NEXT_PUBLIC_S3_IMAGE_BASE_URL;

export default function ProductCard({
  title,
  subTitle,
  avatar,
  image,
  id,
  size,
  price,
  handelEditCard,
  userId,
}: ProductCardProps) {
  const userDetails = loginLocalStorageHelper.getUserDetails();
  const editCard = () => {
    userDetails?.id === userId && handelEditCard && handelEditCard(Number(id));
  };
  return (
    <Box
      sx={{
        transform: size === 'small' ? 'scale(.58)' : 'none',
        width: '100%',
        marginBottom: '4rem',
      }}>
      <Box
        sx={{
          textAlign: 'center',
          background:
            'linear-gradient(to top,#000000 65%,transparent 65% 100%)',
          paddingBottom: '3rem',
        }}
        onClick={() => editCard()}>
        {image ? (
          <img
            src={`${s3ImageBaseUrl}${image}`}
            alt={subTitle}
            style={{
              width: '14.8rem',
              aspectRatio: '5.3/6',
              maxWidth: '80%',
              borderRadius: '5px',
            }}
          />
        ) : (
          <DescriptionOutlinedIcon
            sx={{
              width: '14rem',
              aspectRatio: '5/6',
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          height: '.25rem',
          background:
            'linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 49.02%, rgba(255, 255, 255, 0) 100%)',
        }}></Box>
      <Box
        sx={{
          padding: '1.125rem 1.5rem',
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%)',
          boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(20px)',
        }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '1rem',
            alignItems: 'center',
          }}>
          <Avatar src={`${s3ImageBaseUrl}${avatar}`} />
          <Typography variant="body1" noWrap>
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '1rem',
            alignItems: 'center',
            marginTop: '1rem',
          }}>
          <Typography
            variant="h5"
            sx={{
              fontSize: '22px',
              lineHeight: '26px',
            }}
            noWrap>
            {subTitle}
          </Typography>
          {price ? (
            <Chip
              sx={{
                height: '26px',
                color: '#FFFFFF',
                paddingLeft: '.75rem',
                paddingRight: '.75rem',
              }}
              icon={<FormatListBulletedIcon />}
              size="small"
              color="success"
              label={price}
            />
          ) : null}
          {/* product details */}
        </Box>
      </Box>
    </Box>
  );
}
