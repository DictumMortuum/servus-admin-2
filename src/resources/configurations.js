import * as React from "react";
import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  useRecordContext,
  useUpdate,
  BooleanField,
  BooleanInput,
} from 'react-admin';
import Button from '@mui/material/Button';

const ProcessButton = () => {
  const record = useRecordContext();

  const [update] = useUpdate("configurations", {
    id: record.id,
    data: {
      ...record,
      value: !record.value,
    },
    previousData: record
  });

  const handleClick = async () => {
    update();
  }

  return <Button variant="contained" onClick={handleClick}>Include</Button>;
}

export const ConfigurationList = () => (
  <List>
    <Datagrid rowClick="">
      <TextField source="id" />
      <TextField source="config" />
      <BooleanField source="value" />
      <ProcessButton />
    </Datagrid>
  </List>
);

const ConfigurationForm = () => (
  <SimpleForm>
    <TextInput source="config" />
    <BooleanInput source="value" />
  </SimpleForm>
)

export const ConfigurationEdit = () => (
  <Edit>
    <ConfigurationForm />
  </Edit>
);

export const ConfigurationCreate = () => (
  <Create redirect="list">
    <ConfigurationForm />
  </Create>
);
