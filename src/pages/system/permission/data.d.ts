/**
 * 列表展示的字段
 */
export interface TableListItem {
  id?: number;
  isEnabled?: boolean;
  name?: string;
  memo?: string;
  urls?: string[];
  createdDate?: Date;
  menuName: string;
}

/**
 * 表单展示的数据
 */
export interface MenuTree {
  id: number;
  name: string;
  children: MenuTree[];
}

/**
 * 分页数据
 */
export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

/**
 * 搜索的数据
 */
export interface TableListParams {
  id: null;
  sorter: string;
  status: string;
  name: string;
  current: number;
  currentPage: number;
  pageNumber: number;
  orderProperty: string;
  orderDirection: string;
}
