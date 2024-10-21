
import {
  Datagrid,
  List,
  TextField,
  TextInput,
  Edit,
  SimpleForm,
  Create,
} from 'react-admin';

export const DevicesList = () => (
  <List perPage={50}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="mac" />
      <TextField source="alias" />
    </Datagrid>
  </List>
);

const DevicesForm = () => (
  <SimpleForm>
    <TextInput source="mac" />
    <TextInput source="alias" />
  </SimpleForm>
);

export const DevicesEdit = () => (
  <Edit>
    <DevicesForm />
  </Edit>
);

export const DevicesCreate = () => (
  <Create redirect="list">
    <DevicesForm />
  </Create>
);
