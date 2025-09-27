import React from 'react';
import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { formatPrice } from '@/utils/currency';

const Analytics: React.FC = () => {
  // Mock analytics data
  const kpiData = [
    {
      title: 'Total Revenue',
      value: formatPrice(285400),
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      description: 'Compared to last month'
    },
    {
      title: 'Total Orders',
      value: '2,847',
      change: '+8.4%',
      trend: 'up',
      icon: ShoppingCart,
      description: 'Orders this month'
    },
    {
      title: 'Active Customers',
      value: '1,234',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      description: 'Monthly active users'
    },
    {
      title: 'Conversion Rate',
      value: '3.4%',
      change: '-0.2%',
      trend: 'down',
      icon: TrendingUp,
      description: 'Visitor to purchase rate'
    }
  ];

  const topProducts = [
    { name: 'Premium Wireless Headphones', sales: 245, revenue: 61225, growth: '+23%' },
    { name: 'Smart Fitness Watch', sales: 189, revenue: 37781, growth: '+18%' },
    { name: 'Professional Camera Lens', sales: 87, revenue: 52191, growth: '+15%' },
    { name: 'Ergonomic Office Chair', sales: 156, revenue: 62394, growth: '+12%' },
    { name: 'Premium Coffee Maker', sales: 134, revenue: 40194, growth: '+8%' }
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, color: 'bg-blue-500' },
    { name: 'Fashion', value: 25, color: 'bg-green-500' },
    { name: 'Home & Office', value: 20, color: 'bg-purple-500' },
    { name: 'Photography', value: 12, color: 'bg-orange-500' },
    { name: 'Others', value: 8, color: 'bg-gray-500' }
  ];

  const recentActivity = [
    { type: 'order', message: 'New order #ORD-2847 received', time: '2 minutes ago', amount: formatPrice(12495) },
    { type: 'customer', message: 'New customer registered: Arjun Mehta', time: '15 minutes ago' },
    { type: 'product', message: 'Smart Watch inventory low (5 left)', time: '1 hour ago' },
    { type: 'review', message: '5-star review on Wireless Headphones', time: '2 hours ago' },
    { type: 'order', message: 'Order #ORD-2846 shipped', time: '3 hours ago', amount: formatPrice(8320) }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track your business performance and key metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{kpi.value}</div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={kpi.trend === 'up' ? 'default' : 'destructive'} 
                    className="text-xs flex items-center gap-1"
                  >
                    {kpi.trend === 'up' ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    {kpi.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{kpi.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Products driving the most revenue this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {product.sales} sales • {formatPrice(product.revenue)}
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {product.growth}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm text-muted-foreground">{category.value}%</span>
                  </div>
                  <Progress value={category.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and notifications from your store</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'order' ? 'bg-green-500' :
                  activity.type === 'customer' ? 'bg-blue-500' :
                  activity.type === 'product' ? 'bg-orange-500' :
                  'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                    {activity.amount && (
                      <span className="text-xs font-medium">{activity.amount}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sales Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">+24.5%</div>
            <p className="text-sm text-muted-foreground mt-2">
              Compared to last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">89.2%</div>
            <p className="text-sm text-muted-foreground mt-2">
              Customers who made repeat purchases
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{formatPrice(2840)}</div>
            <p className="text-sm text-muted-foreground mt-2">
              +₹320 from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;