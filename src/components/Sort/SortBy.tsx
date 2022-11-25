import { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import './SortBy.scss'

const SortBy = (props: any) => {
  const [sortOption, setSortOption] = useState<string>('')

  const handleChange = (event: any) => {
    setSortOption(event.target.value)
    props.sortBy(event.target.value)
  }

  return (
    <div className="sorter">
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="sort-by">Sort by</InputLabel>
        <Select
          labelId="sort-by"
          id="sort-by-select"
          value={sortOption}
          label="Sort by"
          onChange={handleChange}
        >
          <MenuItem value="Year">Year</MenuItem>
          <MenuItem value="Type">Type</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default SortBy
