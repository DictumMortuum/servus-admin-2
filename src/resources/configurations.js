import * as React from "react";
import {
  Datagrid,
  List,
  TextField,
  NumberField,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  Create,
} from 'react-admin';

export const ConfigurationList = () => (
  <List perPage={50}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="config" />
      <NumberField source="value" />
    </Datagrid>
  </List>
);

const ConfigurationForm = () => (
  <SimpleForm>
    <TextInput source="config" />
    <NumberInput source="value" />
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
