export interface Node {
  label: string;
  checked: boolean;
  indeterminate: boolean;
  children?: Node[];
  parent?: Node | null;
}
