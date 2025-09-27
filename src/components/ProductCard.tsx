import React from 'react';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/utils/currency';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  stockCount: number;
  tags: string[];
  trending?: boolean;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  variant?: 'default' | 'compact' | 'featured';
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onClick,
  variant = 'default' 
}) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleCardClick = () => {
    onClick?.(product);
  };

  return (
    <Card className={`
      group cursor-pointer hover-lift transition-smooth overflow-hidden
      ${variant === 'featured' ? 'border-accent/20' : 'border-border'}
      ${variant === 'compact' ? 'h-64' : 'h-96'}
    `}>
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className={`relative ${variant === 'compact' ? 'h-32' : 'h-48'} overflow-hidden`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onClick={handleCardClick}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-1">
            {product.trending && (
              <Badge className="bg-accent text-accent-foreground text-xs">
                Trending
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
              <Eye className="w-4 h-4" />
            </Button>
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="outline" className="text-destructive border-destructive">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Category & Brand */}
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{product.brand}</span>
          </div>

          {/* Product Name */}
          <h3 
            className="font-semibold text-foreground mb-2 line-clamp-2 cursor-pointer hover:text-accent transition-colors"
            onClick={handleCardClick}
          >
            {product.name}
          </h3>

          {/* Description - only for non-compact variant */}
          {variant !== 'compact' && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              className="flex-1" 
              disabled={!product.inStock}
              onClick={(e) => {
                e.stopPropagation();
                // Add to cart logic here
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>

          {/* Stock Count */}
          {product.inStock && product.stockCount < 20 && (
            <p className="text-xs text-warning mt-2">
              Only {product.stockCount} left in stock
            </p>
          )}
        </CardContent>
      </div>
    </Card>
  );
};