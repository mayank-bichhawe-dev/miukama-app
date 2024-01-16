import React, { useContext } from 'react';
import { Typography, Link, Breadcrumbs } from '@mui/material';
import { useRouter } from 'next/navigation';
import { UserLoginContext } from '@/app/[lng]/layout';

interface BannerComponentProps {
  title?: string;
  data: { title: string; link: string }[];
}

const Breadcrumb: React.FC<BannerComponentProps> = ({
  title = 'title',
  data = [],
}) => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);

  return (
    <>
      <Typography
        variant="h4"
        paddingTop={'30px'}
      //sx={{ textAlign: {xs:"center", sm:"center"} }}
      >
        {title}
      </Typography>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
      // sx={{
      //   "& ol": {
      //     justifyContent: {xs:"center", sm:"center", md: "left"}
      //   }
      // }}
      >
        {data.map((value) => (
          <Link
            underline="hover"
            color="inherit"
            onClick={() => router.push(`${langugeRoute}${value.link}`)}
            key="index"
            sx={{ cursor: 'pointer' }}>
            {value.title}
          </Link>
        ))}
        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>
    </>
  );
};

export default Breadcrumb;
