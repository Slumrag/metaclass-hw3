import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { downloadReadMe } from 'App/api';
import { Text } from 'components/';
import style from './DisplayReadMe.module.scss';

export type DisplayReadMeProps = {
  /** ссылка на файл */
  src: string;
  className?: string;
};

const DisplayReadMe: React.FC<DisplayReadMeProps> = ({ src, className }) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    downloadReadMe(src).then(({ data }) => {
      setMarkdown(data as string);
    });
  }, [src]);

  return (
    <div className={classNames(style.container, className)}>
      <Text className={style.title} weight="bold">
        README.md
      </Text>
      <Markdown className={style.markdown} remarkPlugins={[remarkGfm]}>
        {markdown}
      </Markdown>
    </div>
  );
};

export default DisplayReadMe;
