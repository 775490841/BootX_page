import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Tag, Alert, Row, Col, Collapse } from 'antd';
import releases from './release';
import msgs from './message';

const { Panel } = Collapse;

export default (): React.ReactNode => (
  <PageHeaderWrapper title={false}>
    <Card bodyStyle={{ padding: 8 }}>
      <Alert message="来自于业余前端程序猿的业务制作" type="success" showIcon banner />
    </Card>

    <Card bodyStyle={{ padding: 8, textAlign: 'center' }} style={{ marginTop: 16 }}>
      <Tag>Release V1.0.0</Tag>
      <Tag>JDK 1.8+</Tag>
      <Tag>Spring Boot 2.2.6.RELEASE</Tag>
      <Tag>Ant Design 4.2.0</Tag>
      <Tag>UmiJS 3.1.2</Tag>
      <Tag>React 16.13.1</Tag>
    </Card>
    <Row gutter={16}>
      <Col span={16}>
        <Card style={{ marginTop: 16 }}>
          <Collapse bordered={false} defaultActiveKey={['0_001']}>
            {msgs.map((item: { title: string; list: string[] }, index: number) => (
              <Panel header={item.title} key={`${index}_001`}>
                {item.list.map((info: string, no: number) => (
                  <p key={`${info}`}>
                    {no + 1}. {info}
                  </p>
                ))}
              </Panel>
            ))}
          </Collapse>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="发布日志" size="small" style={{ marginTop: 16 }}>
          <Collapse bordered={false} accordion defaultActiveKey={['0_001']}>
            {releases.map((item: { title: string; list: string[] }, index: number) => (
              <Panel header={item.title} key={`${index}_001`}>
                {item.list.map((info: string, no: number) => (
                  <p key={`${info}`}>
                    {no + 1}. {info}
                  </p>
                ))}
              </Panel>
            ))}
          </Collapse>
        </Card>
      </Col>
    </Row>
  </PageHeaderWrapper>
);
