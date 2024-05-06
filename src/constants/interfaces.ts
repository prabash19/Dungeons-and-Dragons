export interface Spell {
  index: string;
  name: string;
  level: number;
  url: string;
}

export type SpellsData = Spell[];
export interface SpellDetails {
  index: string;
  name: string;
  level: number;
  casting_time: string;
  range: string;
  components: string[];
  duration: string;
  concentration: boolean;
  ritual: boolean;
  attack_type?: string;
  classes?: { index: string; name: string; url: string }[];
  subclasses?: { index: string; name: string; url: string }[];
  school?: { index: string; name: string; url: string };
  damage?: {
    damage_type?: { index: string; name: string; url: string };
    damage_at_slot_level?: Record<string, string>;
  };
  desc: string[];
  higher_level?: string[];
  material?: string;
  url: string;
}
