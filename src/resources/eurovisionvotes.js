import {
  BooleanField,
  Datagrid,
  EmailField,
  List,
  TextField,
  useRecordContext,
  useUpdate,
} from 'react-admin';
import Button from '@mui/material/Button';

const ProcessButton = () => {
  const record = useRecordContext();
  const [update] = useUpdate("eurovisionvotes", {
    id: record.id,
    data: {
      ...record,
      included: !record.included,
    },
    previousData: record
  });

  const handleClick = async () => {
    update();
  }

  return <Button variant="contained" onClick={handleClick}>Include</Button>;
}

export const EurovisionvoteList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="user_id" />
      <EmailField source="email" />
      <BooleanField source="included" />
      <ProcessButton />
    </Datagrid>
  </List>
);
