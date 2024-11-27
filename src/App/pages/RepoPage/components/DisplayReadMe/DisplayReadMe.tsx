import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { Suspense, useEffect, useState } from 'react';
import { oneLight as highlightStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { downloadReadMe } from 'App/api';
import { Loader, Skeleton, Text } from 'components/';
import style from './DisplayReadMe.module.scss';

const Markdown = React.lazy(() => import('react-markdown'));
const SyntaxHighlighter = React.lazy(() => import('react-syntax-highlighter/dist/esm/prism'));

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

          <Suspense
            fallback={
              <div className={style.loaderWrapper}>
                <Loader size="l" />
              </div>
            }
          >
            <Markdown
              className={style.markdown}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ children, className }) {
                  const isMultiline = children?.toString().includes('\n');
                  const match = /language-(\w+)/.exec(className || '');
                  return (
                    <Suspense fallback={<Skeleton />}>
                      <SyntaxHighlighter
                        PreTag={isMultiline ? 'div' : 'span'}
                        language={match?.[1] ?? ''}
                        style={highlightStyle}
                        customStyle={!isMultiline ? { padding: 5 } : {}}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </Suspense>
                  );
                },
              }}
            >
              {markdown}
            </Markdown>
          </Suspense>
        </div>
      )}
    </>
  );
});

export default DisplayReadMe;
