import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { MultiDropdown, Input, SearchIcon, IconButton } from 'components/';
import { type Option } from 'components/MultiDropdown';
import style from './SearchRepo.module.scss';

export type SearchParameters = {
  type: string;
  organization: string | null;
};

export type SearchRepoProps = {
  className?: string;
  typeOptions: Option[];
  onSubmit: (search: SearchParameters) => void;
};

const SearchRepo: React.FC<SearchRepoProps> = observer(({ className, typeOptions, onSubmit }) => {
  const [organization, setOrganization] = useState('');
  const [type, setType] = useState<Option[]>([]);

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
    setOrganization(value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const searchParams = { type: type[0]?.value, organization };
      // console.log(searchParams);
      onSubmit(searchParams);
    },
    [onSubmit, type, organization],
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
        <Input
          className={style.input}
          value={organization}
          placeholder="Enter organization name"
          onChange={handleInput}
        />
        <IconButton type="submit" disabled={!organization} icon={<SearchIcon />} />
      </div>
    </form>
  );
});

export default SearchRepo;
