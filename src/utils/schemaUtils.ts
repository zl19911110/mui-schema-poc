export const validateJsonSchema = (schemaText: string): { valid: boolean; error?: string; schema?: any } => {
  try {
    const schema = JSON.parse(schemaText);
    return { valid: true, schema };
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : '未知错误' 
    };
  }
};

export const formatJsonSchema = (schema: any): string => {
  try {
    return JSON.stringify(schema, null, 2);
  } catch (error) {
    return '';
  }
};

export const getDefaultFormData = (schema: any): any => {
  if (!schema || typeof schema !== 'object') return {};
  
  const formData: any = {};
  
  if (schema.properties) {
    Object.keys(schema.properties).forEach(key => {
      const property = schema.properties[key];
      
      if (property.default !== undefined) {
        formData[key] = property.default;
      } else if (property.type === 'string') {
        formData[key] = '';
      } else if (property.type === 'number' || property.type === 'integer') {
        formData[key] = 0;
      } else if (property.type === 'boolean') {
        formData[key] = false;
      } else if (property.type === 'array') {
        formData[key] = [];
      } else if (property.type === 'object') {
        formData[key] = getDefaultFormData(property);
      }
    });
  }
  
  return formData;
};