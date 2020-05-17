export interface Critter {
  type: string;
  name: string;
  price: number;
  shadowSize?: string;
  location: string;
  time: string;
  jan: boolean;
  feb: boolean;
  mar: boolean;
  apr: boolean;
  may: boolean;
  jun: boolean;
  jul: boolean;
  aug: boolean;
  sep: boolean;
  oct: boolean;
  nov: boolean;
  dec: boolean;
}

export interface Fossil {
  name: string;
  price: number;
}

export interface FossilGroup {
  name: string;
  parts: Fossil[];
}

export interface FossilJSON {
  standalone: Fossil[];
  multipart: FossilGroup[];
}

export interface Flower {
  type: string;
  color: string;
  hybrid_colors?: string[];
}

export interface FlowerGroup {
  name: string,
  flowers: Flower[];
}