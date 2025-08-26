import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack
} from '@mui/material';
import { exampleSchemas } from '../../data/exampleSchemas';
import type { SchemaExample } from '../../types/schema';

interface ExampleSelectorProps {
  onSelectExample: (example: SchemaExample) => void;
  selectedId?: string;
}

const ExampleSelector: React.FC<ExampleSelectorProps> = ({
  onSelectExample,
  selectedId
}) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        示例模板
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        选择一个示例快速开始，或者在编辑器中创建自己的 Schema
      </Typography>
      
      <Grid container spacing={2}>
        {exampleSchemas.map((example) => (
          <Grid item xs={12} sm={6} md={4} key={example.id}>
            <Card 
              variant={selectedId === example.id ? "elevation" : "outlined"}
              sx={{ 
                height: '100%',
                border: selectedId === example.id ? 2 : 1,
                borderColor: selectedId === example.id ? 'primary.main' : 'divider'
              }}
            >
              <CardContent sx={{ pb: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Typography variant="h6" component="h3">
                    {example.title}
                  </Typography>
                  {selectedId === example.id && (
                    <Chip label="当前" color="primary" size="small" />
                  )}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {example.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  onClick={() => onSelectExample(example)}
                  variant={selectedId === example.id ? "contained" : "outlined"}
                >
                  {selectedId === example.id ? '已选择' : '选择此模板'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ExampleSelector;