import {ProgramType} from "../types/program";

export interface Content {
  title: string;
  description: string;
  programType: ProgramType;
  images: {
    posterArt: PosterArt;
  };
  releaseYear: number;
}

export interface ContentData {
  total: number;
  entries: Content[];
}

interface PosterArt {
  url: string;
  width: number;
  height: number;
}

export interface FilterData {
  search: string;
  start: number;
  end: number;
  page: number;
}
