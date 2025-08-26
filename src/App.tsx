// import React, { useState, useEffect } from 'react';
// import { ThemeProvider, createTheme, CssBaseline, Box, Alert, Snackbar } from '@mui/material';
// import AppLayout from './components/Layout';
// import SchemaEditor from './components/SchemaEditor';
// import SchemaRenderer from './components/SchemaRenderer';
// import ExampleSelector from './components/ExampleSelector';
// import { exampleSchemas } from './data/exampleSchemas';
// import type { SchemaExample } from './types/schema';
// import { getDefaultFormData } from './utils/schemaUtils';

// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//   },
//   typography: {
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//     ].join(','),
//   },
// });

// function App() {
//   const [currentSchema, setCurrentSchema] = useState<any>(null);
//   const [currentUISchema, setCurrentUISchema] = useState<any>({});
//   const [formData, setFormData] = useState<any>({});
//   const [selectedExampleId, setSelectedExampleId] = useState<string>('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   // 初始化时加载第一个示例
//   useEffect(() => {
//     if (exampleSchemas.length > 0) {
//       const firstExample = exampleSchemas[0];
//       handleSelectExample(firstExample);
//     }
//   }, []);

//   const handleSelectExample = (example: SchemaExample) => {
//     setCurrentSchema(example.schema);
//     setCurrentUISchema(example.uiSchema || {});
//     setFormData(example.formData || getDefaultFormData(example.schema));
//     setSelectedExampleId(example.id);
//     showSnackbar(`已加载示例: ${example.title}`);
//   };

//   const handleSchemaChange = (schema: any) => {
//     setCurrentSchema(schema);
//     // 当 schema 改变时，重置表单数据
//     const defaultData = getDefaultFormData(schema);
//     setFormData(defaultData);
//     setSelectedExampleId(''); // 清除选中的示例
//   };

//   const handleFormDataChange = (data: any) => {
//     setFormData(data);
//   };

//   const handleFormSubmit = (data: any) => {
//     console.log('表单提交数据:', data);
//     showSnackbar('表单提交成功！查看控制台获取详细数据。');
//   };

//   const showSnackbar = (message: string) => {
//     setSnackbarMessage(message);
//     setSnackbarOpen(true);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const leftPanel = (
//     <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//       <SchemaEditor
//         schema={currentSchema}
//         onChange={handleSchemaChange}
//         title="JSON Schema 编辑器"
//       />
//     </Box>
//   );

//   const rightPanel = (
//     <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//       <SchemaRenderer
//         schema={currentSchema}
//         uiSchema={currentUISchema}
//         formData={formData}
//         onChange={handleFormDataChange}
//         onSubmit={handleFormSubmit}
//         title="表单预览"
//       />
//     </Box>
//   );

//   const bottomPanel = (
//     <ExampleSelector
//       onSelectExample={handleSelectExample}
//       selectedId={selectedExampleId}
//     />
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ minHeight: '100vh' }}>
//         <AppLayout
//           leftPanel={leftPanel}
//           rightPanel={rightPanel}
//           bottomPanel={bottomPanel}
//         >
//           {/* 这里可以放置其他内容 */}
//         </AppLayout>
//       </Box>

//       {/* 消息提示 */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </ThemeProvider>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Alert, Snackbar } from '@mui/material';
import AppLayout from './components/Layout';
import SchemaEditor from './components/SchemaEditor';
import SchemaRenderer from './components/SchemaRenderer';
import ComponentRenderer from './components/ComponentRenderer';
import ExampleSelector from './components/ExampleSelector';
import { exampleSchemas } from './data/exampleSchemas';
import type { ExtendedSchemaExample } from './types/schema';
import { getDefaultFormData } from './utils/schemaUtils';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const [currentSchema, setCurrentSchema] = useState<any>(null);
  const [currentUISchema, setCurrentUISchema] = useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const [selectedExampleId, setSelectedExampleId] = useState<string>('');
  const [currentSchemaType, setCurrentSchemaType] = useState<'form' | 'component'>('form');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // 初始化时加载第一个示例
  useEffect(() => {
    if (exampleSchemas.length > 0) {
      const firstExample = exampleSchemas[0];
      handleSelectExample(firstExample);
    }
  }, []);

  const handleSelectExample = (example: ExtendedSchemaExample) => {
    setCurrentSchema(example.schema);
    setCurrentUISchema(example.uiSchema || {});
    setFormData(example.formData || getDefaultFormData(example.schema));
    setSelectedExampleId(example.id);
    setCurrentSchemaType(example.type);
    showSnackbar(`已加载示例: ${example.title}`);
  };

  const handleSchemaChange = (schema: any) => {
    setCurrentSchema(schema);
    
    // 尝试自动检测 schema 类型
    if (schema && typeof schema === 'object') {
      if (schema['x-component'] || schema['_isJSONSchemaObject']) {
        setCurrentSchemaType('component');
      } else if (schema.type === 'object' && schema.properties) {
        setCurrentSchemaType('form');
        const defaultData = getDefaultFormData(schema);
        setFormData(defaultData);
      }
    }
    
    setSelectedExampleId(''); // 清除选中的示例
  };

  const handleFormDataChange = (data: any) => {
    setFormData(data);
  };

  const handleFormSubmit = (data: any) => {
    console.log('表单提交数据:', data);
    showSnackbar('表单提交成功！查看控制台获取详细数据。');
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const leftPanel = (
    <SchemaEditor
      schema={currentSchema}
      onChange={handleSchemaChange}
      title="JSON Schema 编辑器"
    />
  );

  // 根据 schema 类型选择正确的渲染器
  const rightPanel = currentSchemaType === 'form' ? (
    <SchemaRenderer
      schema={currentSchema}
      uiSchema={currentUISchema}
      formData={formData}
      onChange={handleFormDataChange}
      onSubmit={handleFormSubmit}
      title="表单预览"
    />
  ) : (
    <ComponentRenderer
      schema={currentSchema}
      title="组件预览"
    />
  );

  const bottomPanel = (
    <ExampleSelector
      onSelectExample={handleSelectExample}
      selectedId={selectedExampleId}
    />
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh' }}>
        <AppLayout
          leftPanel={leftPanel}
          rightPanel={rightPanel}
          bottomPanel={bottomPanel}
        >
          {/* 这里可以放置其他内容 */}
        </AppLayout>
      </Box>

      {/* 消息提示 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;