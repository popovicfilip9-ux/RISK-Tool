import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Shield, 
  BarChart3, 
  AlertTriangle, 
  BookOpen, 
  Users, 
  LogOut,
  Menu,
  History,
  FileCheck,
  Workflow,
  Download,
  Settings,
  Target
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user, logout, hasPermission } = useAuth();
  const location = useLocation();

  const navigationItems = [
    {
      title: 'Dashboard',
      icon: BarChart3,
      href: '/',
      requiredRole: 'viewer'
    },
    {
      title: 'Risk Management',
      icon: AlertTriangle,
      href: '/risks',
      requiredRole: 'assessor'
    },
    {
      title: 'FMEA Overview',
      icon: Target,
      href: '/fmea',
      requiredRole: 'assessor'
    },
    {
      title: 'Risk Generator',
      icon: Settings,
      href: '/generator',
      requiredRole: 'assessor'
    },
    {
      title: 'Approval Workflows',
      icon: Workflow,
      href: '/workflows',
      requiredRole: 'assessor'
    },
    {
      title: 'Export Center',
      icon: Download,
      href: '/export',
      requiredRole: 'assessor'
    },
    {
      title: 'Regulatory References',
      icon: BookOpen,
      href: '/references',
      requiredRole: 'viewer'
    },
    {
      title: 'User Management',
      icon: Users,
      href: '/users',
      requiredRole: 'administrator'
    },
    {
      title: 'Audit Trail',
      icon: History,
      href: '/audit',
      requiredRole: 'administrator'
    }
  ];

  const filteredNavItems = navigationItems.filter(item => 
    hasPermission(item.requiredRole)
  );

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="font-bold text-lg">GMP/GDP</h1>
                <p className="text-xs text-muted-foreground">Risk Assessment</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              {filteredNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.href}
                  >
                    <Link to={item.href} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger>
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <h2 className="text-xl font-semibold text-gray-800">
                {navigationItems.find(item => item.href === location.pathname)?.title || 'Dashboard'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{user?.name}</span>
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {user?.role}
                </span>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
