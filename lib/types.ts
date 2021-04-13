// This file has no imports on purpose
// So it can easily be consumed by other TS projects

export type Error = 1 | 2 | 3 | 4;

export type UnsubscribeFunc = () => void;

export type MessageBase = {
  id?: number;
  type: string;
  [key: string]: any;
};

export type OppEventBase = {
  origin: string;
  time_fired: string;
  context: {
    id: string;
    user_id: string;
  };
};

export type OppEvent = OppEventBase & {
  event_type: string;
  data: { [key: string]: any };
};

export type StateChangedEvent = OppEventBase & {
  event_type: "state_changed";
  data: {
    entity_id: string;
    new_state: OppEntity | null;
    old_state: OppEntity | null;
  };
};

export type OppConfig = {
  latitude: number;
  longitude: number;
  elevation: number;
  unit_system: {
    length: string;
    mass: string;
    volume: string;
    temperature: string;
  };
  location_name: string;
  time_zone: string;
  components: string[];
  config_dir: string;
  allowlist_external_dirs: string[];
  allowlist_external_urls: string[];
  version: string;
  config_source: string;
  safe_mode: boolean;
  state: "NOT_RUNNING" | "STARTING" | "RUNNING" | "STOPPING" | "FINAL_WRITE";
  external_url: string | null;
  internal_url: string | null;
};

export type OppEntityBase = {
  entity_id: string;
  state: string;
  last_changed: string;
  last_updated: string;
  attributes: OppEntityAttributeBase;
  context: { id: string; user_id: string | null };
};

export type OppEntityAttributeBase = {
  friendly_name?: string;
  unit_of_measurement?: string;
  icon?: string;
  entity_picture?: string;
  supported_features?: number;
  hidden?: boolean;
  assumed_state?: boolean;
  device_class?: string;
};

export type OppEntity = OppEntityBase & {
  attributes: { [key: string]: any };
};

export type OppEntities = { [entity_id: string]: OppEntity };

export type OppService = {
  name?: string;
  description: string;
  target?: {} | null;
  fields: {
    [field_name: string]: {
      name?: string;
      description: string;
      example: string | boolean | number;
      selector?: {};
    };
  };
};

export type OppDomainServices = {
  [service_name: string]: OppService;
};

export type OppServices = {
  [domain: string]: OppDomainServices;
};

export type OppUser = {
  id: string;
  is_owner: boolean;
  name: string;
};

export type OppServiceTarget = {
  entity_id?: string | string[];
  device_id?: string | string[];
  area_id?: string | string[];
};
