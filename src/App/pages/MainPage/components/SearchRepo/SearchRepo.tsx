import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { MultiDropdown, SearchIcon, IconButton, Skeleton } from 'components/';
import Text from 'components/Text';
import { type Option } from 'components/types';
import { rootStore } from 'store/';
import { META } from 'utils/';
import Autocomplete from './components';
import style from './SearchRepo.module.scss';

export type SearchParameters = {
  type: string;
  organization: string | null;
};

export type SearchRepoProps = {
  className?: string;
  typeOptions: Option[];
  typeValue?: Option;
  input?: string;
  history?: string[];
  count: number;
  onSubmit: (search: SearchParameters) => void;
};

const SearchRepo: React.FC<SearchRepoProps> = observer(
  ({ className, typeOptions, typeValue, input = '', history = [], count, onSubmit }) => {
    const { organization } = rootStore;
    const [organizationName, setOrganizationName] = useState(input);
    const initialVal = typeOptions.find((el) => el.key === typeValue?.key);

    const [type, setType] = useState<Option[]>(initialVal ? [initialVal] : []);
    const historyOptions: Option[] = history?.map((el) => ({ key: el, value: el }));

    const [historyValue, setHistoryValue] = useState(historyOptions[0]);
    const getTitle = useCallback((value: Option[]) => {
      if (value.length === 0) {
        return 'Type';
      }
      return value.map((e) => e.value).join(', ');
    }, []);

    const handleDropdownChange = useCallback((value: Option[]): void => {
      setType(value);
    }, []);

    const handleInput = useCallback((value: string): void => {
      setOrganizationName(value);
    }, []);
    const handleHistory = useCallback((option: Option): void => {
      if (option?.key) {
        setHistoryValue(option);
        setOrganizationName(option?.key);
      }
    }, []);

    const handleSubmit = useCallback(
      (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const searchParams = { type: type[0]?.value, organization: organizationName };
        onSubmit(searchParams);
      },
      [onSubmit, type, organizationName],
    );

    return (
      <form className={classNames(style.search, className)} onSubmit={handleSubmit}>
        <MultiDropdown
          className={style.dropdown}
          options={typeOptions}
          value={type}
          onChange={handleDropdownChange}
          getTitle={getTitle}
        />
        <div className={style.searchBar}>
          <Autocomplete
            className={style.autocomplete}
            options={historyOptions}
            value={historyValue}
            inputValue={input}
            placeholder="Enter organization name"
            onChange={handleHistory}
            onInputChange={handleInput}
          />
          <IconButton type="submit" disabled={!organizationName} icon={<SearchIcon />} />
        </div>
        {organization.meta === META.LOADING ? (
          <Skeleton width={200} className={style.repoCount} />
        ) : (
          <Text color="secondary" tag="span" className={style.repoCount}>
            {
              <Text tag="span" weight="bold">
                {count.toLocaleString()}
              </Text>
            }
            repositories were found
          </Text>
        )}
      </form>
    );
  },
);

export default SearchRepo;
