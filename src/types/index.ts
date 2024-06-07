export interface Joy {
  [key: string]: any;
  name: string;
  date: string;
  youtube: {
    id: string;
    title: string;
    artist: string;
  };
  quote: {
    message: string;
    name?: string;
  };
  question?: string;
  message: string;
}

export type JoyWithId = Joy & { _id: string };

export interface Cohort {
  name: string;
  names: string[];
}
