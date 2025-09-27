import React from 'react';
import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { formatPrice } from '@/utils/currency';
import productsData from '@/data/products.json';
import heroImage from '@/assets/hero-banner.jpg';

const Home: React.FC = () => {
  const featuredProducts = productsData.filter(product => product.featured).slice(0, 3);
  const trendingProducts = productsData.filter(product => product.trending).slice(0, 4);

  const stats = [
    {
      title: 'Total Revenue',
      value: formatPrice(125420),
      change: '+12.5%',
      icon: DollarSign,
      trend: 'up'
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '+8.2%',
      icon: ShoppingCart,
      trend: 'up'
    },
    {
      title: 'Customers',
      value: '856',
      change: '+15.3%',
      icon: Users,  
      trend: 'up'
    },
    {
      title: 'Growth Rate',
      value: '23.4%',
      change: '+4.1%',
      icon: TrendingUp,
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="RetailQ Hero" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative px-8 py-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to RetailQ Dashboard
            </h1>
            <p className="text-xl mb-6 text-primary-foreground/90">
              Your modern e-commerce command center. Monitor performance, manage products, 
              and grow your business with powerful analytics.
            </p>
            <div className="flex gap-4">
              <Button variant="secondary" size="lg">
                View Analytics
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Manage Products
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Badge variant={stat.trend === 'up' ? 'default' : 'destructive'} className="text-xs">
                    {stat.change}
                  </Badge>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Featured Products */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Featured Products</CardTitle>
              <CardDescription>
                Handpicked products performing exceptionally well
              </CardDescription>
            </div>
            <Button variant="outline">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="compact"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Products */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Trending Now
              </CardTitle>
              <CardDescription>
                Products that are gaining popularity
              </CardDescription>
            </div>
            <Button variant="outline">
              View Trending
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="compact"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover-lift cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">Add New Product</CardTitle>
            <CardDescription>
              Expand your catalog with new items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              Add Product
            </Button>
          </CardContent>
        </Card>

        <Card className="hover-lift cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">Process Orders</CardTitle>
            <CardDescription>
              Manage pending and recent orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Orders
            </Button>
          </CardContent>
        </Card>

        <Card className="hover-lift cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">Customer Support</CardTitle>
            <CardDescription>
              Handle customer inquiries and feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Support Center
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;