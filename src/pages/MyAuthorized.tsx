import React from 'react';
import Authorized from '@/utils/Authorized';
import { Link } from 'umi';
import { Button, Divider } from 'antd';
import constants from '@/utils/constants';

interface MyAuthorizedType {
  authorizedType: 'button' | 'link' | 'a';
  authority: string[];
  url?: string;
  title: string;
  divider?: boolean;
  ignore?: boolean;
}

const ignore = constants.authorityIgnore;

const MyAuthorized = ({
  authorizedType,
  authority,
  url,
  title,
  divider,
  ...res
}: MyAuthorizedType) => {
  if (authorizedType === 'link') {
    if (ignore) {
      return (
        <>
          <Link to={url || ''}>{title}</Link>
          {divider && <Divider type="vertical" />}
        </>
      );
    }
    return (
      <Authorized authority={authority} noMatch="">
        <Link to={url || ''}>{title}</Link>
        {divider && <Divider type="vertical" />}
      </Authorized>
    );
  }
  if (authorizedType === 'button') {
    if (ignore) {
      return (
        <>
          {/* // @ts-ignore */}
          <Button {...res}>{title}</Button>
        </>
      );
    }
    return (
      <Authorized authority={authority} noMatch="">
        {/* // @ts-ignore */}
        <Button {...res}>{title}</Button>
      </Authorized>
    );
  }
  if (authorizedType === 'a') {
    if (ignore) {
      return (
        <>
          <a {...res}>{title}</a>
          {divider && <Divider type="vertical" />}
        </>
      );
    }
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
