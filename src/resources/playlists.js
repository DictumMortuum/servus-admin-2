import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  BooleanField,
  useRecordContext,
  Button,
  EditButton,
  Create,
  CreateButton,
  TopToolbar,
} from 'react-admin';

const PlayButton = () => {
  const record = useRecordContext();

  const play = ({ playlist_id }) => fetch(`${process.env.REACT_APP_ENDPOINT}/playlists/play/${playlist_id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const handleClick = async () => {
    const upd = await play(record).then(rs => rs.json());
    console.log(upd);
  }

  return <Button variant="contained" color="error" onClick={handleClick}>Play</Button>;
}

const StopButton = () => {
  const stop = () => fetch(`${process.env.REACT_APP_ENDPOINT}/playlists/stop`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const handleClick = async () => {
    const upd = await stop().then(rs => rs.json());
    console.log(upd);
  }

  return <Button color="error" onClick={handleClick}>Stop Music</Button>;
}

const ListActions = () => (
  <TopToolbar>
    <StopButton />
    <CreateButton />
  </TopToolbar>
);

export const PlaylistList = () => (
  <List actions={<ListActions/>}>
    <Datagrid rowClick="">
      {/* <TextField source="playlist_id" /> */}
      <TextField source="name" />
      <PlayButton />
      {/* <TextField source="url" /> */}
      <BooleanField source="downloaded" />
      <EditButton />
    </Datagrid>
  </List>
);

const PlaylistForm = () => (
  <SimpleForm>
    <TextInput source="name" />
    <TextInput source="url" />
  </SimpleForm>
)

export const PlaylistEdit = () => (
  <Edit>
    <PlaylistForm />
  </Edit>
);

export const PlaylistCreate = () => (
  <Create redirect="list">
    <PlaylistForm />
  </Create>
);
