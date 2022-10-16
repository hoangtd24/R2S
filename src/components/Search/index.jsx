import React from 'react'
import { IconButton } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import './styles.scss'

const Search = ({ placeholder, onChange, width, searchValue, onSearch }) => {

  return (
    <div style={{ width: width }} className="search">
      <input
        className="search__input"
        type="text"
        placeholder={`${placeholder}...`}
        value={searchValue}
        onChange={onChange}
      />
      <div>
        <IconButton className="search__icon" onClick={onSearch}>
          <SearchOutlinedIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Search
