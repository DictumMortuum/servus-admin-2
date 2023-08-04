import {
  Datagrid,
  List,
  TextField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const IgnoredNameList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);

export const IgnoredNameCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export const IgnoredNameEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);
