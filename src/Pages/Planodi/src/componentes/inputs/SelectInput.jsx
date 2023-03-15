import React from 'react';
import { Select, FormControl, InputLabel } from '@material-ui/core';

export default function SelectInput() {
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
      <Select
        native
        value=""
        label="Age"
        inputProps={{
          name: 'age',
          id: 'outlined-age-native-simple'
        }}
      >
        <option aria-label="None" value="" />
        <option value={10}>Ten</option>
      </Select>
    </FormControl>
  );
}
