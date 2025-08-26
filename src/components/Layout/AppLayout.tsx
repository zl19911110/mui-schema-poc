import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Box,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  Button,
  Stack,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  GitHub as GitHubIcon,
  Code as CodeIcon
} from '@mui/icons-material';

interface AppLayoutProps {
  children: React.ReactNode;
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  bottomPanel?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  leftPanel,
  rightPanel,
  bottomPanel
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerWidth = 400;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <CodeIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MUI Schema POC
          </Typography>
          
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip 
              label="React + TypeScript" 
              size="small" 
              variant="outlined" 
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
            />
            <Button
              color="inherit"
              startIcon={<GitHubIcon />}
              href="https://github.com/zl19911110/mui-schema-poc"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        {/* Desktop Layout */}
        {!isMobile && (
          <>
            {/* Left Panel */}
            <Box
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                borderRight: 1,
                borderColor: 'divider',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ height: '100%', p: 2 }}>
                {leftPanel}
              </Box>
            </Box>

            {/* Right Panel */}
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <Box sx={{ height: '100%', p: 2 }}>
                {rightPanel}
              </Box>
            </Box>
          </>
        )}

        {/* Mobile Layout */}
        {isMobile && (
          <>
            {/* Mobile Drawer */}
            <Drawer
              variant="temporary"
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  maxWidth: '90vw'
                },
              }}
            >
              <Box sx={{ p: 2, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Schema 编辑器</Typography>
                  <IconButton onClick={handleDrawerToggle}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                {leftPanel}
              </Box>
            </Drawer>

            {/* Mobile Main Content */}
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <Box sx={{ height: '100%', p: 2 }}>
                {rightPanel}
              </Box>
            </Box>
          </>
        )}
      </Box>

      {/* Bottom Panel */}
      {bottomPanel && (
        <Container maxWidth={false} sx={{ py: 2 }}>
          {bottomPanel}
        </Container>
      )}
    </Box>
  );
};

export default AppLayout;