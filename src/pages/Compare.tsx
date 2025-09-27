import React, { useState } from 'react';
import { Search, Plus, X, Star, Check, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatPrice } from '@/utils/currency';
import productsData from '@/data/products.json';

const Compare: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addProduct = (productId: string) => {
    if (selectedProducts.length < 4 && !selectedProducts.includes(productId)) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(id => id !== productId));
  };

  const compareProducts = productsData.filter(product => 
    selectedProducts.includes(product.id)
  );

  const availableProducts = productsData.filter(product => 
    !selectedProducts.includes(product.id) &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const comparisonFeatures = [
    { key: 'price', label: 'Price', type: 'price' },
    { key: 'originalPrice', label: 'Original Price', type: 'price' },
    { key: 'brand', label: 'Brand', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'rating', label: 'Rating', type: 'rating' },
    { key: 'reviews', label: 'Reviews', type: 'number' },
    { key: 'stockCount', label: 'Stock', type: 'number' },
    { key: 'inStock', label: 'Available', type: 'boolean' }
  ];

  const renderFeatureValue = (product: any, feature: any) => {
    const value = product[feature.key];
    
    switch (feature.type) {
      case 'price':
        return value ? formatPrice(value) : '-';
      case 'rating':
        return (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{value}</span>
          </div>
        );
      case 'boolean':
        return value ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <X className="w-4 h-4 text-red-500" />
        );
      case 'number':
        return value?.toLocaleString() || '-';
      default:
        return value || '-';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Product Comparison</h1>
        <p className="text-muted-foreground">
          Compare up to 4 products side by side to make informed decisions
        </p>
      </div>

      {/* Product Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Products to Compare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Available Products */}
            {searchQuery && (
              <div className="max-h-40 overflow-y-auto space-y-2">
                {availableProducts.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium text-sm">{product.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {product.brand} • {formatPrice(product.price)}
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => addProduct(product.id)}
                      disabled={selectedProducts.length >= 4}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Selected Products Count */}
            <div className="text-sm text-muted-foreground">
              {selectedProducts.length}/4 products selected
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {compareProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Product Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-4 font-medium">Feature</th>
                    {compareProducts.map((product) => (
                      <th key={product.id} className="text-center p-4 min-w-48">
                        <div className="space-y-3">
                          <div className="relative">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded-lg mx-auto"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              className="absolute -top-2 -right-2 w-6 h-6 p-0"
                              onClick={() => removeProduct(product.id)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <div>
                            <div className="font-medium text-sm">{product.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {product.brand}
                            </div>
                          </div>
                          {product.trending && (
                            <Badge className="bg-accent text-accent-foreground text-xs">
                              Trending
                            </Badge>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature) => (
                    <tr key={feature.key} className="border-t border-border">
                      <td className="p-4 font-medium text-muted-foreground">
                        {feature.label}
                      </td>
                      {compareProducts.map((product) => (
                        <td key={product.id} className="text-center p-4">
                          {renderFeatureValue(product, feature)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t border-border">
                    <td className="p-4 font-medium text-muted-foreground">
                      Tags
                    </td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="text-center p-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {product.tags.map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-border bg-muted/20">
                    <td className="p-4 font-medium">
                      Actions
                    </td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="text-center p-4">
                        <div className="space-y-2">
                          <Button size="sm" className="w-full">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            Add to Cart
                          </Button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {compareProducts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No products selected</h3>
            <p className="text-muted-foreground mb-4">
              Search and select products above to start comparing
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Compare;