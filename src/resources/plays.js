import React from 'react';
import LocationInput from './util/LocationInput';
import { filterToQuery } from './util/common';
import {
  ArrayInput,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  SimpleFormIterator,
  Create,
  AutocompleteInput,
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  List,
  SingleFieldList,
  TextField,
  DateInput,
  Edit,
  ReferenceField,
  BooleanInput,
  TextInput,
  FunctionField,
  useGetOne
} from 'react-admin';
import { useWatch } from 'react-hook-form';

const createTransform = record => {
  delete record.boardgame;

  console.log(record.play_data);

  if (record.play_data.teams === undefined) {
    return {
      ...record,
      date: new Date(record.date),
      stats: record.stats.map(d => ({...d, boardgame_id: record.boardgame_id})),
      play_data: record.play_data === "" ? null : record.play_data,
    }
  } else {
    if (record.play_data.teams.length === 0) {
      delete record.play_data.teams;
      return {
        ...record,
        date: new Date(record.date),
        stats: record.stats.map(d => ({...d, boardgame_id: record.boardgame_id})),
        play_data: record.play_data === "" ? null : record.play_data,
      }
    }

    const teams = record.play_data.teams.map(d => {
      if (typeof d === "string") {
        return d.split(",").map(i => parseInt(i))
      } else if (Array.isArray(d)) {
        return d
      }

      return [];
    });

    return {
      ...record,
      date: new Date(record.date),
      stats: record.stats.map(d => ({...d, boardgame_id: record.boardgame_id})),
      play_data: record.play_data === "" ? null : { ...record.play_data, teams },
    }
  }
}

const IgnoreButton = () => {
  const id = useWatch({ name: 'boardgame_id' });
  const { data, isLoading, error } = useGetOne("boardgames", { id });
  if (isLoading) { return <p>Loading</p>; }
  if (error) { return <p>ERROR</p>; }
  return <img src={data?.square200} width="200" height="200" alt="" />
}

const PlayForm = () => {
  return (
    <SimpleForm>
      <ReferenceInput source="boardgame_id" reference="boardgames" sort={{ "field": "name", "order": "ASC" }}>
        <AutocompleteInput source="name" optionText="name" optionValue="id" filterToQuery={filterToQuery} />
      </ReferenceInput>
      <IgnoreButton />
      <LocationInput />
      <DateInput source="date" />
      {/* <TextInput source="play_data" /> */}
      <BooleanInput source="play_data.solo" />
      <ArrayInput source="stats">
        <SimpleFormIterator inline>
          <TextField source="player.id" />
          <ReferenceInput source="player_id" reference="players">
            <AutocompleteInput source="name" optionValue="id" filterToQuery={filterToQuery} />
          </ReferenceInput>
          <NumberInput source="data.score" />
          <BooleanInput source="data.won" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="play_data.teams">
        <SimpleFormIterator inline>
          <TextInput />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  )
}

export const PlayEdit = () => (
  <Edit transform={createTransform}>
    <PlayForm />
  </Edit>
);

export const PlayCreate = () => (
  <Create transform={createTransform}>
    <PlayForm />
  </Create>
);

export const PlayList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="boardgame_id" reference="boardgames">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="date" />
      <TextField source="location.name" />
      <ArrayField source="stats">
        <SingleFieldList>
          <ChipField source="player.name" />
        </SingleFieldList>
      </ArrayField>
      <FunctionField render={record => JSON.stringify(record.play_data)} />
    </Datagrid>
  </List>
);
