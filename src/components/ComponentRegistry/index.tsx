import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
  Typography,
  Button,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Chip,
  LinearProgress
} from '@mui/material';
import type { ComponentSchema } from '../../types/schema';

// 组件注册表
const componentRegistry: Record<string, React.ComponentType<any>> = {
  // 布局组件
  'Grid': Grid,
  'Grid.Row': (props: any) => <Grid container {...props} />,
  'Grid.Col': (props: any) => <Grid item {...props} />,
  'Box': Box,
  'Paper': Paper,
  
  // 卡片组件
  'Card': Card,
  'CardItem': (props: any) => (
    <Card sx={{ mb: 2, ...props.sx }}>
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  ),
  'CardContent': CardContent,
  'CardHeader': CardHeader,
  
  // 表格组件
  'Table': (props: any) => (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table {...props} />
    </TableContainer>
  ),
  'TableHead': TableHead,
  'TableBody': TableBody,
  'TableRow': TableRow,
  'TableCell': TableCell,
  
  // 数据展示
  'Typography': Typography,
  'Alert': Alert,
  'List': List,
  'ListItem': ListItem,
  'ListItemText': ListItemText,
  'Divider': Divider,
  'Avatar': Avatar,
  'Chip': Chip,
  'LinearProgress': LinearProgress,
  
  // 交互组件
  'Button': Button,
  
  // 自定义业务组件
  'DataTable': ({ data = [], columns = [] }: any) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col: any, index: number) => (
              <TableCell key={index}>{col.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any, rowIndex: number) => (
            <TableRow key={rowIndex}>
              {columns.map((col: any, colIndex: number) => (
                <TableCell key={colIndex}>
                  {row[col.dataIndex] || '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
  
  'StatsCard': ({ title, value, subtitle, color = 'primary' }: any) => (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" color={`${color}.main`}>
          {value}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  ),
  
  'ActionBar': ({ children, ...props }: any) => (
    <Box sx={{ display: 'flex', gap: 1, mb: 2, ...props.style }}>
      {children}
    </Box>
  )
};

// 组件渲染器
export const renderComponent = (schema: ComponentSchema, key?: string): React.ReactElement => {
  const {
    'x-component': componentType,
    'x-component-props': componentProps = {},
    'x-decorator': decoratorType,
    'x-decorator-props': decoratorProps = {},
    properties,
    title,
    description,
    ...otherProps
  } = schema;

  if (!componentType) {
    return <div key={key}>未指定组件类型</div>;
  }

  const Component = componentRegistry[componentType];
  if (!Component) {
    return (
      <Alert severity="warning" key={key}>
        未找到组件: {componentType}
      </Alert>
    );
  }

  // 渲染子组件
  const children = properties ? 
    Object.entries(properties).map(([childKey, childSchema]) => 
      renderComponent(childSchema, childKey)
    ) : null;

  // 基础组件属性
  const finalProps = {
    ...componentProps,
    key,
    children: children || componentProps.children
  };

  // 如果有标题，添加标题
  if (title && componentType !== 'Typography') {
    finalProps.children = (
      <>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        {finalProps.children}
      </>
    );
  }

  let element = React.createElement(Component, finalProps);

  // 如果有装饰器，应用装饰器
  if (decoratorType && componentRegistry[decoratorType]) {
    const Decorator = componentRegistry[decoratorType];
    element = React.createElement(Decorator, decoratorProps, element);
  }

  return element;
};

export default componentRegistry;