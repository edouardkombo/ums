export type Gender = {
  edges: any;
  id: number;
  name: string;
}

export type Group = {
  edges: any;
  id: number;
  name: string;
}

export type Skills = {
  edges: any;
  id: number;
  name: string;
}

export type Query = {
  genders: Gender;
  groups: Group;
  skills: Skills;
}