import React from 'react';
import Authorized from '@/utils/Authorized';
import { Link } from 'umi';
import { Button, Divider } from 'antd';

interface MyAuthorizedType {
  authorizedType: 'button' | 'link' | 'a';
  authority: string[];
  url?: string;
  title: string;
  divider?: boolean;
}

const MyAuthorized = ({
  authorizedType,
  authority,
  url,
  title,
  divider,
  ...res
}: MyAuthorizedType) => {
  if (authorizedType === 'link') {
    return (
      <Authorized authority={authority} noMatch="">
        <Link to={url || ''}>{title}</Link>
        {divider && <Divider type="vertical" />}
      </Authorized>
    );
  }
  if (authorizedType === 'button') {
    return (
      <Authorized authority={authority} noMatch="">
        {/* // @ts-ignore */}
        <Button {...res}>{title}</Button>
      </Authorized>
    );
  }
  if (authorizedType === 'a') {
    return (
      <Authorized authority={authority} noMatch="">
        <a {...res}>{title}</a>
        {divider && <Divider type="vertical" />}
      </Authorized>
    );
  }
  return <Authorized authority={['noMatch']} />;
};

export default MyAuthorized;
