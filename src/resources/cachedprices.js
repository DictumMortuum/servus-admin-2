import {
  Datagrid,
  ImageField,
  List,
  NumberField,
  ReferenceField,
  TextField,
  UrlField,
  useRecordContext,
  DeleteButton
} from 'react-admin';
import { createIgnore, createPriceFromCachedPrice } from './api';
import Button from '@mui/material/Button';

const IgnoreButton = () => {
  const record = useRecordContext();

  const handleClick = async () => {
    createIgnore(record).then(rs => rs.json()).then(rs => {
      console.log(rs);
    });
  }

  return <Button variant="contained" onClick={handleClick}>Ignore</Button>;
}

const CreateButton = () => {
  const record = useRecordContext();

  const handleClick = async () => {
    createPriceFromCachedPrice(record.id).then(rs => rs.json()).then(rs => {
      console.log(rs);
    });
  }

  return <Button variant="contained" onClick={handleClick}>Create</Button>;
}

export const CachedpriceList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="store_id" reference="stores">
        <TextField source="name" />
      </ReferenceField>
      <ImageField source="store_thumb" />
      <TextField source="name" />
      <NumberField source="price" />
      <NumberField source="stock" />
      <UrlField source="url" />
      <IgnoreButton />
      <CreateButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
