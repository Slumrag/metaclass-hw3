import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight as highlightStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
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
          <Markdown
            className={style.markdown}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code(props) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <SyntaxHighlighter
                    // {...rest}
                    PreTag="div"
                    language={match[1]}
                    style={highlightStyle}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdown}
          </Markdown>
        </div>
      )}
    </>
  );
});

export default DisplayReadMe;
