import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Button,
  BooleanInput,
  EditButton,
  Create,
  ReferenceInput,
  ReferenceField,
  AutocompleteInput,
  SimpleFormIterator,
  ArrayInput,
  useRecordContext,
  useDataProvider,
  useNotify,
} from 'react-admin';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { filterToQuery } from './util/common';

export const scrapeUrl = ({ id, list_only }) => fetch(`${process.env.REACT_APP_BOARDGAMES_ENDPOINT}/boardgames/scrape/url/${id}`, {
  method: "POST",
  body: JSON.stringify({
    list_only,
  }),
  headers: {
    'Content-Type': 'application/json'
  },
}).then(rs => rs.json());

export const scrapeStore = ({ id }) => fetch(`${process.env.REACT_APP_BOARDGAMES_ENDPOINT}/boardgames/scrape/${id}`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
}).then(rs => rs.json());

export const ScrapeButton = ({ list_only = false }) => {
  const notify = useNotify();
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();
  const label = list_only ? "List" : "Scrape";
  console.log(record)

  const { mutate, isPending } = useMutation({
    mutationFn: () => dataProvider.scrapeUrl({ ...record, list_only }),
    onSuccess: () => {
      notify(`Scheduling ${record.url} for scraping`);
      queryClient.invalidateQueries({
        queryKey: ["scrapeurls", "getList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["scrapes", "getList"],
      });
    },
  });

  return <Button label={label} onClick={() => mutate()} disabled={isPending} />;
}

const ScrapeAllButton = () => {
  const notify = useNotify();
  const record = useRecordContext();
  const dataProvider = useDataProvider();

  const { mutate, isPending } = useMutation({
    mutationFn: () => dataProvider.scrapeStore(record),
    onSuccess: ({ data }) => {
      data.forEach(({ scraped, instock, pages_visited, preorder, outofstock }) => {
        notify(`Scraped: ${scraped}, Instock: ${instock}, Preorder: ${preorder}, OutOfStock: ${outofstock}, Pages: ${pages_visited}`);
      });
    },
  });

  return <Button label="Scrape" onClick={() => mutate()} disabled={isPending} />;
}

export const ScrapeList = () => (
  <List>
    <Datagrid rowClick="">
      <ReferenceField source="store_id" reference="stores">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="allowed_domain" />
      <TextField source="tag" />
      <ScrapeAllButton />
      <EditButton />
    </Datagrid>
  </List>
);

const ScrapeForm = () => (
  <SimpleForm>
    <ReferenceInput source="store_id" reference="stores" sort={{ "field": "name", "order": "ASC" }}>
      <AutocompleteInput source="name" optionText="name" optionValue="id" filterToQuery={filterToQuery} />
    </ReferenceInput>
    <TextInput source="sel_item" />
    <TextInput source="sel_name" />
    <TextInput source="sel_item_thumb" />
    <TextInput source="sel_item_instock" />
    <TextInput source="sel_item_preorder" />
    <TextInput source="sel_item_outofstock" />
    <TextInput source="sel_price" />
    <TextInput source="sel_alt_price" />
    <TextInput source="sel_original_price" />
    <TextInput source="sel_url" />
    <TextInput source="sel_next" />
    <TextInput source="tag" />
    <TextInput source="allowed_domain" />
    <BooleanInput source="absolute_next_url" />
    <ArrayInput source="urls">
      <SimpleFormIterator inline>
        <TextInput source="url" />
        <div>
          <ScrapeButton />
        </div>
      </SimpleFormIterator>
    </ArrayInput>
  </SimpleForm>
)

export const ScrapeEdit = () => (
  <Edit>
    <ScrapeForm />
  </Edit>
);

export const ScrapeCreate = () => (
  <Create redirect="list">
    <ScrapeForm />
  </Create>
);
