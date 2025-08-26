export interface SchemaExample {
  id: string;
  title: string;
  description: string;
  type: string;
  schema: any;
  uiSchema?: any;
  formData?: any;
}

export interface SchemaFormProps {
  schema: any;
  uiSchema?: any;
  formData?: any;
  onSubmit?: (data: any) => void;
  onChange?: (data: any) => void;
}

// 新增：通用组件渲染的 Schema 接口
export interface ComponentSchema {
  _isJSONSchemaObject?: boolean;
  version?: string;
  type?: string;
  'x-component'?: string;
  'x-component-props'?: Record<string, any>;
  'x-decorator'?: string;
  'x-decorator-props'?: Record<string, any>;
  properties?: Record<string, ComponentSchema>;
  title?: string;
  description?: string;
  [key: string]: any;
}

export interface ExtendedSchemaExample {
  id: string;
  title: string;
  description: string;
  type: 'form' | 'component'; // 区分表单和组件
  schema: any;
  uiSchema?: any;
  formData?: any;
}