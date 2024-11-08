import classNames from 'classnames';
import React from 'react';
import { MultiDropdown, Input, SearchIcon, IconButton } from 'components/';
import { type Option } from 'components/MultiDropdown';
import style from './SearchRepo.module.scss';

export type SearchParameters = {
  type: string[];
  company: string;
};

export type SearchRepoProps = {
  className?: string;
  onSubmit: (search: SearchParameters) => void;
};

const SearchRepo: React.FC<SearchRepoProps> = ({ className, onSubmit }) => {
  const getTitle = (value: Option[]) => {
    if (value.length === 0) {
      return 'Type';
    }
    return value.map((e) => e.value).join(', ');
  };

  const handleDropdownChange = (value: Option[]): void => {
    throw new Error('Function not implemented.');
  };

  const handleInput = (value: string): void => {
    throw new Error('Function not implemented.');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit({ type: [], company: '' });
  };

  return (
    <form className={classNames(style.search, className)} onSubmit={handleSubmit}>
      <MultiDropdown
        className={style.dropdown}
        options={[]}
        value={[]}
        onChange={handleDropdownChange}
        getTitle={getTitle}
      />
      <div className={style.searchBar}>
        <Input className={style.input} value={''} placeholder="Enter organization name" onChange={handleInput} />
        <IconButton type="submit" icon={<SearchIcon />} />
      </div>
    </form>
  );
};

export default SearchRepo;
