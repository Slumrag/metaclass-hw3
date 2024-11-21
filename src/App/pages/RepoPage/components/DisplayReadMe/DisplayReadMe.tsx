import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
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

const DisplayReadMe: React.FC<DisplayReadMeProps> = observer(({ src, className }) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    if (src !== undefined) {
      downloadReadMe(src)
        .then(({ data }) => {
          setMarkdown(data as string);
        })
        .catch((err) => console.error(err));
    }
  }, [src]);

  return (
    <>
      {markdown && (
        <div className={classNames(style.container, className)}>
          <Text className={style.title} weight="bold">
            README.md
          </Text>
          <Markdown className={style.markdown} remarkPlugins={[remarkGfm]}>
            {markdown}
          </Markdown>
        </div>
      )}
    </>
  );
});

export default DisplayReadMe;
