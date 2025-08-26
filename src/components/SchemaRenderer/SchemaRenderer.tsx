import React from 'react';
import { Box, Paper, Typography, Alert, Chip } from '@mui/material';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';

interface SchemaFormProps {
  schema: any;
  uiSchema?: any;
  formData?: any;
  onSubmit?: (data: any) => void;
  onChange?: (data: any) => void;
}

interface SchemaRendererProps extends SchemaFormProps {
  title?: string;
}

const SchemaRenderer: React.FC<SchemaRendererProps> = ({
  schema,
  uiSchema,
  formData,
  onSubmit,
  onChange,
  title = '表单预览'
}) => {
  console.log('SchemaRenderer received:', { schema, uiSchema, formData });

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data.formData);
    onSubmit?.(data.formData);
  };

  const handleChange = (data: any) => {
    onChange?.(data.formData);
  };

  if (!schema) {
    return (
      <Paper sx={{ p: 3, minHeight: '400px' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Alert severity="info">
          请在左侧编辑器中输入有效的 JSON Schema
        </Alert>
      </Paper>
    );
  }

  // 检查是否是有效的表单 schema
  if (!schema.type || schema.type !== 'object' || !schema.properties) {
    return (
      <Paper sx={{ p: 3, minHeight: '400px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            {title}
          </Typography>
          <Chip 
            label="表单模式" 
            color="primary" 
            size="small" 
          />
        </Box>
        <Alert severity="warning">
          无效的表单 Schema。表单 Schema 需要包含 type: "object" 和 properties 字段。
        </Alert>
      </Paper>
    );
  }

  try {
    return (
      <Paper sx={{ p: 3, minHeight: '400px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            {title}
          </Typography>
          <Chip 
            label="表单模式" 
            color="primary" 
            size="small" 
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            validator={validator}
            onSubmit={handleSubmit}
            onChange={handleChange}
            showErrorList={false}
            liveValidate
          />
        </Box>
      </Paper>
    );
  } catch (error) {
    console.error('SchemaRenderer error:', error);
    return (
      <Paper sx={{ p: 3, minHeight: '400px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            {title}
          </Typography>
          <Chip 
            label="表单模式" 
            color="primary" 
            size="small" 
          />
        </Box>
        <Alert severity="error" sx={{ mt: 2 }}>
          表单渲染错误: {error instanceof Error ? error.message : '未知错误'}
        </Alert>
      </Paper>
    );
  }
};

export default SchemaRenderer;