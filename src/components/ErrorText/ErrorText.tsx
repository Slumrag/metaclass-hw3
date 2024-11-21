import { observer } from 'mobx-react-lite';
import React, { PropsWithChildren } from 'react';
import { Text } from 'components/';

const ErrorText: React.FC<PropsWithChildren> = observer(({ children }) => {
  return (
    <Text view="p-20" color="secondary">
      {children}
    </Text>
  );
});
export default ErrorText;
