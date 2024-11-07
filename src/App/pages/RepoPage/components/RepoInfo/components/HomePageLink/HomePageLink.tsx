import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { LinkIcon } from 'components/';
import style from './HomePageLink.module.scss';

export type HomePageLinkProps = Omit<React.ComponentProps<'a'>, 'children'> & {
  href: string;
};

const HomePageLink: React.FC<HomePageLinkProps> = observer(({ className, href, ...props }) => {
  return (
    <span className={classNames(style.link, className)}>
      <LinkIcon className={style.icon} width={16} height={16} />
      <a className={style.anchor} href={href} {...props}>
        {href?.replace(/.+:\/\//, '')}
      </a>
    </span>
  );
});

export default HomePageLink;
