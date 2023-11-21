import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  BooleanField,
  BooleanInput,
  SelectInput,
  useRecordContext,
  Button,
  EditButton,
} from 'react-admin';

const updateProcessed = ({ id }) => fetch(`${process.env.REACT_APP_ENDPOINT}/youtubedl/${id}`, {
  method: "PUT",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    processed: true
  })
});

const download = ({ url, series }) => fetch(`https://nas.dictummortuum.com/hooks/youtube-dl`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url,
    path: `/volume1/plex/greek series/${series}`,
    owner: "dimitris@dictummortuum.com",
    group: "dimitris@dictummortuum.com",
  })
});

const ProcessButton = () => {
  const record = useRecordContext();

  const handleClick = async () => {
    const dl = await download(record);
    const upd = await updateProcessed(record).then(rs => rs.json());
    console.log(dl, upd);
  }

  return <Button variant="contained" onClick={handleClick}>Download</Button>;
}

export const filters = [
  <SelectInput source="processed" alwaysOn choices={[
    { id: 0, name: "Not processed" },
    { id: 1, name: "Processed" },
  ]} />
];

export const YoutubeDLList = () => (
  <List filters={filters}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="series" />
      <TextField source="url" />
      <BooleanField source="processed" />
      <ProcessButton />
      <EditButton />
    </Datagrid>
  </List>
);

export const YoutubeDLEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="series" />
      <TextInput source="url" />
      <BooleanInput source="processed" />
    </SimpleForm>
  </Edit>
);
