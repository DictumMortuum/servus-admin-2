import {
  Datagrid,
  EmailField,
  List,
  TextField,
  ReferenceField
} from 'react-admin';

export const EurovisionparticipationList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="user_id" />
      <EmailField source="email" />
      <ReferenceField reference="boardgames" source="boardgame_id">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
