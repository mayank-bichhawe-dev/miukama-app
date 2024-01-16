'use client';
import React from 'react';
import Footer from '@/components/footer/FooterHome';
import { useTranslation } from '../../i18n';

export default async function BannerLayout({
  params: { lng },
  children,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <div>
      {children}

      <Footer preferredLng={i18n.language} t={t} />
    </div>
  );
}
