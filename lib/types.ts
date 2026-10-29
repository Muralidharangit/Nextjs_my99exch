export interface Team {
  name: string;
  iso?: string;
  short?: string;
  color?: string;
}

export type SeriesCat = 'International' | 'Women' | 'Domestic' | 'League';

export interface Series {
  name: string;
  dates: string;
  cat: SeriesCat;
  teams: string[];
  standing?: string;
  table?: 'ranji' | 'ptl';
}

export type Format = 'Test' | 'ODI' | 'T20';
export type MatchState = 'live' | 'recent' | 'upcoming';

/** headline innings: o = overs as "overs.balls" */
export interface InningsInput {
  t: string;
  r: number;
  w: number;
  o: string;
}

export interface MatchInput {
  id: string;
  series: string;
  desc: string;
  format: Format;
  state: MatchState;
  inns?: InningsInput[];
  teams?: [string, string];
  status: string;
  short: string;
  session?: string;
  venue: string;
  date: string;
  time: string;
  toss?: string;
  win?: Record<string, number>;
  viewers?: string;
}

export interface Match extends MatchInput {
  teams: [string, string];
  cat: SeriesCat;
}

export interface NewsItem {
  id: string;
  cat: string;
  title: string;
  img: string;
  time: string;
  summary: string;
}

export interface Game {
  id: string;
  title: string;
  cat: string;
  tag: string;
  img: string;
  thumb: string;
  tagline: string;
  players: string;
}

/** Image-only slides use img/alt; text overlays use title/sub on top of the image */
export interface AdSlide {
  img: string;
  href: string;
  alt?: string;
  title?: string;
  sub?: string;
  pos?: string;
}

export interface Ads {
  tall: AdSlide[];
  tall2: AdSlide[];
  box: AdSlide[];
  strip: AdSlide[];
}

/** [team, played, won, lost, points, NRR or quotient] */
export type TableRow = [string, number, number, number, number, string];
