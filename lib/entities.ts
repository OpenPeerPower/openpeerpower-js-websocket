import { getCollection } from "./collection.js";
import { OppEntities, StateChangedEvent, UnsubscribeFunc } from "./types.js";
import { Connection } from "./connection.js";
import { Store } from "./store.js";
import { getStates } from "./commands.js";

function processEvent(store: Store<OppEntities>, event: StateChangedEvent) {
  const state = store.state;
  if (state === undefined) return;

  const { entity_id, new_state } = event.data;
  if (new_state) {
    store.setState({ [new_state.entity_id]: new_state });
  } else {
    const newEntities = { ...state };
    delete newEntities[entity_id];
    store.setState(newEntities, true);
  }
}

async function fetchEntities(conn: Connection): Promise<OppEntities> {
  const states = await getStates(conn);
  const entities: OppEntities = {};
  for (let i = 0; i < states.length; i++) {
    const state = states[i];
    entities[state.entity_id] = state;
  }
  return entities;
}

const subscribeUpdates = (conn: Connection, store: Store<OppEntities>) =>
  conn.subscribeEvents<StateChangedEvent>(
    (ev) => processEvent(store, ev as StateChangedEvent),
    "state_changed"
  );

export const entitiesColl = (conn: Connection) =>
  getCollection(conn, "_ent", fetchEntities, subscribeUpdates);

export const subscribeEntities = (
  conn: Connection,
  onChange: (state: OppEntities) => void
): UnsubscribeFunc => entitiesColl(conn).subscribe(onChange);
