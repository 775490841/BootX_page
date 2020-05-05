import { Alert, Table } from 'antd';
import { ColumnProps, TableProps } from 'antd/es/table';
import React, { Fragment } from 'react';

import { TableListItem } from '../data';
import styles from './index.less';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface StandardTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: StandardTableColumnProps[];
  data: TableListItem[];
}

export interface StandardTableColumnProps extends ColumnProps<TableListItem> {
  needTotal?: boolean;
  total?: number;
}

interface StandardTableState {
  selectedRowKeys: string[];
  needTotalList: StandardTableColumnProps[];
}

// @ts-ignore
const StandardTable: React.FC<StandardTableProps<TableListItem>, StandardTableState> = (props) => {
  const { data = [], rowKey, ...rest } = props;
  return (
    <div className={styles.standardTable}>
      <div className={styles.tableAlert}>
        <Alert
          message={
            <Fragment>
              共 <a style={{ fontWeight: 600 }}>{data?.length}</a> 项&nbsp;&nbsp;
            </Fragment>
          }
          type="info"
          showIcon
        />
      </div>
      <Table rowKey={rowKey || 'id'} dataSource={data} pagination={false} {...rest} />
    </div>
  );
};

export default StandardTable;
