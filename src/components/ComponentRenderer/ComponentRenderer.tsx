import React from 'react';
import { Box, Paper, Typography, Alert } from '@mui/material';
import { renderComponent } from '../ComponentRegistry';
import type { ComponentSchema } from '../../types/schema';

interface ComponentRendererProps {
  schema: ComponentSchema;
  title?: string;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  schema,
  title = '组件预览'
}) => {
  if (!schema) {
    return (
      <Paper sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Alert severity="info">
          请在左侧编辑器中输入有效的组件 Schema
        </Alert>
      </Paper>
    );
  }

  try {
    const renderedComponent = renderComponent(schema);
    
    return (
      <Paper sx={{ p: 3, height: '100%', overflow: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {renderedComponent}
        </Box>
      </Paper>
    );
  } catch (error) {
    return (
      <Paper sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Alert severity="error" sx={{ mt: 2 }}>
          渲染错误: {error instanceof Error ? error.message : '未知错误'}
        </Alert>
      </Paper>
    );
  }
};

export default ComponentRenderer;