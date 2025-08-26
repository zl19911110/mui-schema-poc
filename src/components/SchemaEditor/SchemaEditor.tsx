import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Alert,
  Button,
  Stack,
  Chip
} from '@mui/material';
import Editor from '@monaco-editor/react';
import { validateJsonSchema, formatJsonSchema } from '../../utils/schemaUtils';

interface SchemaEditorProps {
  schema: any;
  onChange: (schema: any) => void;
  title?: string;
}

const SchemaEditor: React.FC<SchemaEditorProps> = ({
  schema,
  onChange,
  title = 'Schema 编辑器'
}) => {
  const [schemaText, setSchemaText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (schema) {
      setSchemaText(formatJsonSchema(schema));
    }
  }, [schema]);

  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined) return;
    
    setSchemaText(value);
    
    const validation = validateJsonSchema(value);
    if (validation.valid && validation.schema) {
      setError(null);
      setIsValid(true);
      onChange(validation.schema);
    } else {
      setError(validation.error || '无效的 JSON');
      setIsValid(false);
    }
  };

  const handleFormat = () => {
    const validation = validateJsonSchema(schemaText);
    if (validation.valid && validation.schema) {
      setSchemaText(formatJsonSchema(validation.schema));
    }
  };

  const handleReset = () => {
    const basicSchema = {
      type: 'object',
      title: '示例表单',
      properties: {
        name: {
          type: 'string',
          title: '姓名'
        },
        email: {
          type: 'string',
          title: '邮箱',
          format: 'email'
        }
      },
      required: ['name', 'email']
    };
    
    setSchemaText(formatJsonSchema(basicSchema));
    onChange(basicSchema);
  };

  return (
    <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">
          {title}
        </Typography>
        <Chip 
          label={isValid ? '有效' : '无效'} 
          color={isValid ? 'success' : 'error'} 
          size="small" 
        />
      </Stack>
      
      <Stack direction="row" spacing={1} mb={2}>
        <Button 
          size="small" 
          variant="outlined" 
          onClick={handleFormat}
          disabled={!isValid}
        >
          格式化
        </Button>
        <Button 
          size="small" 
          variant="outlined" 
          onClick={handleReset}
        >
          重置
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="body2">
            JSON 语法错误: {error}
          </Typography>
        </Alert>
      )}

      <Box sx={{ flexGrow: 1, border: 1, borderColor: 'divider', borderRadius: 1 }}>
        <Editor
          height="100%"
          language="json"
          theme="vs-dark"
          value={schemaText}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on'
          }}
        />
      </Box>
    </Paper>
  );
};

export default SchemaEditor;