import React from 'react';
import { HashRouter as Router } from "react-router-dom";
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import Layout from './Bar';
// import authProvider from './authProvider';
import themeProvider from './themeProvider';
import simpleRestProvider from 'ra-data-simple-rest';
// import dataProvider from './dataProvider';
// import Login from './components/Login';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import { PlayList, PlayCreate, PlayEdit } from './resources/plays';
// import { BGStatsPlayerList, BGStatsPlayerEdit } from './resources/bgstats/players';
// import { BGStatsLocationList, BGStatsLocationEdit } from './resources/bgstats/locations';
// import { BGStatsGamesList } from './resources/bgstats/games';
// import { BGStatsPlayList, BGStatsPlayEdit } from './resources/bgstats/plays';
import { YoutubeDLList, YoutubeDLEdit } from './resources/youtubedl';
import Dashboard from './components/Dashboard';
import { BookEdit, BookList, BookCreate } from './resources/books';
import { PlayerEdit, PlayerCreate, PlayerList } from './resources/players';
import { EurovisionvoteList } from './resources/eurovisionvotes';
import { EurovisionparticipationList } from './resources/eurovisionparticipations';
import { DevicesCreate, DevicesEdit, DevicesList } from './resources/devices';
import { ConfigurationCreate, ConfigurationEdit, ConfigurationList } from './resources/configurations';
import { PlaylistCreate, PlaylistEdit, PlaylistList } from './resources/playlists';

const App = () => {
  return (
    <Router>
      <Admin theme={themeProvider} dataProvider={simpleRestProvider(process.env.REACT_APP_ENDPOINT)} dashboard={Dashboard}>
        <Resource name="configurations" list={ConfigurationList} edit={ConfigurationEdit} create={ConfigurationCreate} />
        <Resource name="books" list={BookList} edit={BookEdit} create={BookCreate} />
        <Resource name="players" list={PlayerList} edit={PlayerEdit} create={PlayerCreate} recordRepresentation={(record) => `${record.name} ${record.surname}`} />
        <Resource name="plays" list={PlayList} edit={PlayEdit} create={PlayCreate} />
        <Resource name="stats" />
        <Resource name="locations" />
        <Resource name="boardgames" list={ListGuesser} edit={EditGuesser} />
        <Resource name="stores" list={ListGuesser} edit={EditGuesser} />
        <Resource name="devices" list={DevicesList} edit={DevicesEdit} create={DevicesCreate} />
        {/* <Resource name="bgstatsplayers" list={BGStatsPlayerList} edit={BGStatsPlayerEdit} />
        <Resource name="bgstatslocations" list={BGStatsLocationList} edit={BGStatsLocationEdit} />
        <Resource name="bgstatsgames" list={BGStatsGamesList} />
        <Resource name="bgstatsplays" list={BGStatsPlayList} edit={BGStatsPlayEdit} />
        <Resource name="bgstats" /> */}
        <Resource name="youtubedl" list={YoutubeDLList} edit={YoutubeDLEdit} />
        <Resource name="playlists" list={PlaylistList} edit={PlaylistEdit} create={PlaylistCreate} />
        <Resource name="eurovisionvotes" list={EurovisionvoteList} />
        <Resource name="eurovisionparticipations" list={EurovisionparticipationList} />
      </Admin>
    </Router>
  );
}

export default App;
