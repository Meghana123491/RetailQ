import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  GitCompare,
  Settings,
  User,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/logo.png';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Compare', href: '/compare', icon: GitCompare },
];

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`
      sticky top-0 h-screen bg-card border-r border-border transition-all duration-300 z-40 
      ${isCollapsed ? 'w-16' : 'w-64'} 
      flex flex-col
    `}>
      {/* Logo Section */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={logo} alt="RetailQ" className="w-8 h-8" />
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-foreground">RetailQ</h1>
              <p className="text-xs text-muted-foreground">E-commerce Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                  ${active 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-primary-foreground' : ''}`} />
                {!isCollapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <Separator />

      {/* User Section */}
      <div className="p-4">
        {user && (
          <div className="space-y-2">
            <NavLink
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <User className="w-5 h-5" />
              {!isCollapsed && <span className="font-medium">Profile</span>}
            </NavLink>
            
            <NavLink
              to="/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Settings className="w-5 h-5" />
              {!isCollapsed && <span className="font-medium">Settings</span>}
            </NavLink>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="w-full justify-start gap-3 px-3 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && <span>Logout</span>}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};