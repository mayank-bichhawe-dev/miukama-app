'use client';
import NavigationDrawer from '@/components/navigationDrawer/navigationDrawer';
import MenuItems from '@/components/navigationDrawer/navigationDrawerConfiguration';
import { Box } from '@mui/material';

export default function DashboardLayout({
  children,
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavigationDrawer menuItems={MenuItems()} />
      <Box sx={{ pl: { md: '260px' } }}>{children}</Box>
    </section>
  );
}
