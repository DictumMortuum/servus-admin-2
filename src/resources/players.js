
import {
  BooleanField,
  Datagrid,
  EmailField,
  List,
  TextField,
  TextInput,
  BooleanInput,
  Edit,
  SimpleForm,
  Create,
  SelectInput,
} from 'react-admin';

const postFilters = [
  <SelectInput source="hidden" label="Hidden" choices={[
    { id: false, name: "OFF" },
    { id: true, name: "ON" },
  ]} />
];

export const PlayerList = () => (
    <List perPage={50} filters={postFilters}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="surname" />
        <EmailField source="email" />
        <BooleanField source="hidden" />
        <TextField source="avatar" />
        <TextField source="bgg_username" />
      </Datagrid>
    </List>
);

const PlayerForm = () => (
  <SimpleForm>
    <TextInput source="name" />
    <TextInput source="surname" />
    <TextInput source="email" />
    <BooleanInput source="hidden" />
    <TextInput source="avatar" />
    <TextInput source="bgg_username" />
  </SimpleForm>
)

export const PlayerEdit = () => (
  <Edit>
    <PlayerForm />
  </Edit>
);

export const PlayerCreate = () => (
  <Create redirect="list">
    <PlayerForm />
  </Create>
);
