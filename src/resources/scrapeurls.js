import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  Create,
  TextInput,
  ReferenceField,
  BooleanField,
  useRecordContext,
  // useDataProvider,
  // useNotify,
} from 'react-admin';
// import { useMutation } from "@tanstack/react-query";
// import { filterToQuery } from './util/common';
import { ScrapeButton } from './scrape';

const NullField = ({ source }) => {
  const record = useRecordContext();

  if (record[source].Valid) {
    return <TextField source={`${source}.Int32`} />
  }

  return <BooleanField source={`${source}.Valid`} />
}

export const ScrapeUrlList = () => (
  <List>
    <Datagrid rowClick="">
      <ReferenceField source="scrape_id" reference="scrapes">
        <TextField source="allowed_domain" />
      </ReferenceField>
      <TextField source="url" />
      <NullField source="last_scraped" />
      <NullField source="last_instock" />
      <NullField source="last_preorder" />
      <NullField source="last_outofstock" />
      <NullField source="last_pages" />
      <ScrapeButton />
      <ScrapeButton list_only={true} />
      <EditButton />
    </Datagrid>
  </List>
);

const ScrapeUrlForm = () => (
  <SimpleForm>
    <TextInput source="url" />
  </SimpleForm>
)

export const ScrapeUrlEdit = () => (
  <Edit>
    <ScrapeUrlForm />
  </Edit>
);

export const ScrapeUrlCreate = () => (
  <Create redirect="list">
    <ScrapeUrlForm />
  </Create>
);
