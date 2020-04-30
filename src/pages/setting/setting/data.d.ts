/**
 * 列表展示的字段
 */
export interface SettingConfig {
  name?: string;
  version?: string;
  author?: string;
  installUrl?: string;
  settingUrl?: string;
  uninstallUrl?: string;
  id?: string;
  order?: number;
  isEnabled?: boolean;
  isInstalled?: boolean;
}
