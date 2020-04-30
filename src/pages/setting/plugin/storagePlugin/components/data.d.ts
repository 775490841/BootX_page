export interface CourseTime {
  beginDate: Date;
  endDate: Date;
  id: number;
  key?: string;
}

/**
 * 列表展示的字段
 */
export interface TableListItem {
  name: string;
  version: string;
  author: string;
  installUrl: string;
  settingUrl: string;
  uninstallUrl: string;
  id: string;
  order: number;
  isEnabled: boolean;
  isInstalled: boolean;
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
  id?: number;
  isEnabled?: boolean;
  name?: string;
  memo?: string;
  beginDate?: Date;
  endDate?: Date;
}
