'use-client';

import React from 'react';

export const CustomBullets = () => {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '5px',
        height: '5px',
        backgroundColor: 'red',
        borderRadius: '50%',
        marginRight: '10px',
        marginBottom: '3px',
      }}></span>
  );
};

const PrivacyPolicyDataList = ({ data }: { data: string[] }) => {
  return (
    <ul>
      {data.map((point, index) => (
        <li
          style={{
            margin: '1rem 0',
            listStyle: 'none',
          }}
          key={index}>
          <CustomBullets /> {point}
        </li>
      ))}
    </ul>
  );
};

export default PrivacyPolicyDataList;
