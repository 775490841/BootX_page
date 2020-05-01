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
 * 搜索的数据
 */
export interface TableListParams {
  id?: number;
  isEnabled?: boolean;
  name?: string;
  memo?: string;
  beginDate?: Date;
  endDate?: Date;
  url: string;
  plugin: string;
}
