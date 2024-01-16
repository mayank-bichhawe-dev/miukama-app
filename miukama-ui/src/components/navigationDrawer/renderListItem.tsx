import React from 'react';
import { menuItemsProps } from './navigationDrawerConfiguration';
import RenderListItemButton from './renderListItemButton';

interface RenderListItemProps {
  item: menuItemsProps;
}

const RenderListItem: React.FC<RenderListItemProps> = ({ item }) => {
  const { key, iconName, name, link, displayChip, imageSrc } = item;
  return (
    <div key={item.key}>
      <RenderListItemButton
        key={key}
        id={key}
        primaryText={name}
        links={link}
        iconName={iconName}
        imageSrc={imageSrc}
        showChip={displayChip}
      />
    </div>
  );
};

export default RenderListItem;
