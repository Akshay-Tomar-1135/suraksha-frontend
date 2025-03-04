export interface AddRequestQuery {
  user_id: number;
  source: object;
  destination: object;
  date_time: string;
}

export type AddRequestResponse = string;

export interface ErrorResponse {
  message: string;
  detail: {
    loc: (string | number)[];
    msg: string;
    type: string;
  }[];
}

export interface FindBuddyQuery {
  user_id: number;
  source: object;
  destination: object;
  date_time: string;
}

export interface FindBuddyResponse {
  buddies: {
    buddy_id: number;
    name: string;
    phone_number: string;
    matching_percentage: number;
  }[];
}

export interface RequestBuddyQuery {
  user_id: number;
  buddy_id: number;
}

export interface RequestBuddyResponse {
  message: string;
}

export interface SearchRequestQuery {
  source: Record<string, any>;
  destination: Record<string, any>;
  date_time: string;
  source_diameter: number;
  destination_diameter: number;
  time_range: number;
}

export type SearchRequestResponse = string;
