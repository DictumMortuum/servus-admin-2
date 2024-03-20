import * as React from "react";
import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  SelectInput
} from 'react-admin';

const postFilters = [
  <TextInput source="name@like" label="Search" />,
  <SelectInput source="category" label="Category" choices={[
    { id: "ΞΕΝΟ", name: "ΞΕΝΟ" },
    { id: "ΑΡΧΑΙΟ", name: "ΑΡΧΑΙΟ" },
    { id: "ΕΛΛΗΝΙΚΟ", name: "ΕΛΛΗΝΙΚΟ" },
    { id: "ΠΟΙΗΣΗ", name: "ΠΟΙΗΣΗ" },
    { id: "ΙΣΤΟΡΙΑ - ΠΟΛΙΤΙΚΗ - ΦΙΛΟΣΟΦΙΑ", name: "ΙΣΤΟΡΙΑ - ΠΟΛΙΤΙΚΗ - ΦΙΛΟΣΟΦΙΑ" },
    { id: "ΘΕΩΡΙΑ ΘΕΑΤΡΟΥ - ΥΠΟΚΡΙΤΙΚΗΣ", name: "ΘΕΩΡΙΑ ΘΕΑΤΡΟΥ - ΥΠΟΚΡΙΤΙΚΗΣ" },
    { id: "ΛΕΥΚΩΜΑΤΑ - ΚΙΝΗΜΑΤΟΓΡΑΦΟΣ", name: "ΛΕΥΚΩΜΑΤΑ - ΚΙΝΗΜΑΤΟΓΡΑΦΟΣ" },
  ]} />
];

export const BookList = () => (
  <List perPage={50} filters={postFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="category" />
      <TextField source="isbn" />
      <TextField source="writer" />
      <TextField source="translation" />
      <TextField source="publisher" />
    </Datagrid>
  </List>
);

const BookForm = () => (
  <SimpleForm>
    <TextInput source="name" />
    <TextInput source="category" />
    <TextInput source="isbn" />
    <TextInput source="writer" />
    <TextInput source="translation" />
    <TextInput source="publisher" />
  </SimpleForm>
)

export const BookEdit = () => (
  <Edit>
    <BookForm />
  </Edit>
);

export const BookCreate = () => (
  <Create redirect="list">
    <BookForm />
  </Create>
);
