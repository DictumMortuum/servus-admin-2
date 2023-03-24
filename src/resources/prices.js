import {
  BooleanField,
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
  TextInput,
  UrlField,
  SelectInput
} from 'react-admin';

const postFilters = [
  <TextInput source="name@like" label="Search" />,
  <SelectInput source="batch" label="Batch" choices={[
    { id: 1, name: "Active Batch" },
    { id: 0, name: "Inactive Batch" },
  ]} />
];

export const PriceList = () => (
  <List filters={postFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="boardgame_id" reference="boardgames" />
      <DateField source="date" />
      <ReferenceField source="store_id" reference="stores" />
      <TextField source="store_thumb" />
      <TextField source="name" />
      <NumberField source="price" />
      <NumberField source="stock" />
      <UrlField source="url" />
      <BooleanField source="mapped" />
      <BooleanField source="ignored" />
      <NumberField source="batch" />
    </Datagrid>
  </List>
);
