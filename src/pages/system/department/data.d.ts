/**
 * 列表展示的字段
 */
export interface TableListItem {
  id?: number;
  name?: string;
  order?: number;
  createdDate?: Date;
  children?: TableListItem[];
}

export interface DepartmentTree {
  id: number;
  name: string;
  children: DepartmentTree[];
}

export interface TableListParams {
  id: number;
}
