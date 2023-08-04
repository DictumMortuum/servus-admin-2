const url = process.env.REACT_APP_ENDPOINT;

export const createLocation = name => fetch(`${url}/locations`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name
  })
});

export const updateStatsLocation = (id, location_id) => fetch(`${url}/bgstatslocations/${id}`, {
  method: "PUT",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    location_id
  })
});

export const createPlayer = name => fetch(`${url}/players`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name,
    surname: "",
    email: ""
  })
});

export const updateStatsPlayer = (id, player_id) => fetch(`${url}/bgstatsplayers/${id}`, {
  method: "PUT",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    player_id
  })
});

export const updateStatsPlay = (id, play_id) => fetch(`${url}/bgstatsplays/${id}`, {
  method: "PUT",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    play_id
  })
});

export const createPlay = payload => fetch(`${url}/plays`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "boardgame_id": payload.game.boardgame_id,
    "date": new Date(payload.play_date),
    "location_id": payload.location.location_id,
    "play_data": null,
    "stats": payload.stats.map(d => ({
      "boardgame_id": payload.game.boardgame_id,
      "data": {
        "score": parseInt(d.score),
        "won": d.winner,
        "new_player": d.new_player,
        "seat_order": d.seat_order,
        "start_player": d.start_player,
        "winner": d.winner,
      },
      "player_id": d.player.player_id,
    }))
  })
});

export const createIgnore = ({ name, store_id })=> fetch(`${url}/ignoredprices`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name,
    store_id,
  })
});

export const createIgnoreName = ({ name })=> fetch(`${url}/ignorednames`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name,
  })
});

export const searchCachedPrice = id => fetch(`${url}/cachedprices/search/${id}`, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});

export const createPriceFromCachedPrice = id => fetch(`${url}/cachedprices/create/${id}`, {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});
