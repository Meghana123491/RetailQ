import React, { useState } from 'react';
import { Search, UserPlus, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { formatPrice } from '@/utils/currency';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

const Customers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock customers data
  const customers: Customer[] = [
    {
      id: 'CUST-001',
      name: 'Rajesh Kumar',
      email: 'rajesh@email.com',
      phone: '+91 98765 43210',
      totalOrders: 15,
      totalSpent: 45600,
      lastOrder: '2024-01-15',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
    },
    {
      id: 'CUST-002',
      name: 'Priya Sharma',
      email: 'priya@email.com',
      phone: '+91 87654 32109',
      totalOrders: 8,
      totalSpent: 23400,
      lastOrder: '2024-01-14',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b776?w=100&q=80'
    },
    {
      id: 'CUST-003',
      name: 'Amit Patel',
      email: 'amit@email.com',
      phone: '+91 76543 21098',
      totalOrders: 12,
      totalSpent: 38900,
      lastOrder: '2024-01-10',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
    },
    {
      id: 'CUST-004',
      name: 'Sunita Devi',
      email: 'sunita@email.com',
      phone: '+91 65432 10987',
      totalOrders: 5,
      totalSpent: 12800,
      lastOrder: '2024-01-08',
      status: 'inactive',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
    },
    {
      id: 'CUST-005',
      name: 'Vikram Singh',
      email: 'vikram@email.com',
      phone: '+91 54321 09876',
      totalOrders: 22,
      totalSpent: 67800,
      lastOrder: '2024-01-16',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80'
    },
    {
      id: 'CUST-006',
      name: 'Neha Agarwal',
      email: 'neha@email.com',
      phone: '+91 43210 98765',
      totalOrders: 3,
      totalSpent: 8900,
      lastOrder: '2024-01-05',
      status: 'inactive'
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { title: 'Total Customers', value: customers.length.toString(), change: '+8%' },
    { title: 'Active Customers', value: customers.filter(c => c.status === 'active').length.toString(), change: '+12%' },
    { title: 'Avg. Order Value', value: formatPrice(35400), change: '+5%' },
    { title: 'Customer LTV', value: formatPrice(42800), change: '+18%' }
  ];

  const getStatusBadge = (status: Customer['status']) => {
    return (
      <Badge 
        className={
          status === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
        }
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground">
            Manage customer relationships and data • {filteredCustomers.length} customers
          </p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={customer.avatar} />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{customer.totalOrders}</TableCell>
                  <TableCell className="font-medium">
                    {formatPrice(customer.totalSpent)}
                  </TableCell>
                  <TableCell>{new Date(customer.lastOrder).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>View Orders</DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                        <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;