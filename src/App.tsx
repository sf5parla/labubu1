import React, { useEffect, useState } from 'react';
import { ShoppingCart, Star, Gift, Zap, Shield, Users, TrendingUp, Award, Clock, AlertTriangle, X, CheckCircle, Heart, Eye } from 'lucide-react';

// Enhanced product data with more realistic conversion elements
const productsData = [
  {
    id: 1,
    name: "LABUBU Plush Pendant Blind Box",
    images: [
      "https://www.popcity.au/cdn/shop/files/Untitled_design_5_dba33b73-3b8f-45e5-9bc6-eea246728cd7.png",
      "https://www.popcity.au/cdn/shop/files/20231026_161756_375885__1200x1200_ee173543-6c43-4e7f-b527-c9b114f08ff7.jpg",
      "https://www.popcity.au/cdn/shop/files/20231026_161757_127994__1200x1200_091b7b2a-fb15-4314-9868-825e18fb6f95.jpg"
    ],
    originalPrice: "$89.99",
    currentPrice: "FREE",
    type: "free",
    badge: "🎁 100% FREE",
    urgencyText: "Only 7 left in stock!",
    socialProof: "1,247 people claimed today",
    rating: 4.9,
    reviews: 2847,
    description: "Ultra-rare collectible blind box featuring exclusive LABUBU designs. Perfect for collectors!",
    freeLimit: 50,
    freeOrdered: 43,
    savings: "$89.99"
  },
  {
    id: 2,
    name: "LABUBU × PRONOUNCE Wings Fantasy",
    images: [
      "https://prod-america-res.popmart.com/default/20240925_114646_929763____1_____1200x1200.jpg",
      "https://prod-america-res.popmart.com/default/20240925_114645_491148____scene_2_____1200x1200.jpg",
      "https://prod-america-res.popmart.com/default/20240925_114646_710105____scene_6_____1200x1200.jpg"
    ],
    originalPrice: "$149.99",
    currentPrice: "FREE",
    type: "free",
    badge: "🔥 HOT DEAL",
    urgencyText: "Last 3 available!",
    socialProof: "892 people watching this",
    rating: 4.8,
    reviews: 1923,
    description: "Exclusive collaboration vinyl plush with premium fantasy wings design. Limited edition!",
    freeLimit: 25,
    freeOrdered: 22,
    savings: "$149.99"
  },
  {
    id: 3,
    name: "LABUBU × PRONOUNCE Be Fancy",
    images: [
      "https://prod-america-res.popmart.com/default/20240308_143249_616646__1200x1200.jpg",
      "https://prod-america-res.popmart.com/default/20240308_143253_694504__1200x1200.jpg",
      "https://prod-america-res.popmart.com/default/20240308_143259_536754__1200x1200.jpg"
    ],
    originalPrice: "$119.99",
    currentPrice: "$19.99",
    type: "sale",
    badge: "⚡ 83% OFF",
    urgencyText: "Flash sale ends in 2 hours!",
    socialProof: "567 sold in last 24h",
    rating: 4.9,
    reviews: 1456,
    description: "Premium vinyl plush with fancy styling. High-quality materials and detailed craftsmanship.",
    savings: "$100.00"
  },
  {
    id: 4,
    name: "MEGA LABUBU 1000% Tony Chopper",
    images: [
      "https://prod-america-res.popmart.com/default/20250403_164752_923165____1_mega-labubu-1000-tony-tony-chopper_mega_details_popmart-us_____1200x1200.jpg",
      "https://prod-america-res.popmart.com/default/20250403_164752_429814____scene_1_mega-labubu-1000-tony-tony-chopper_mega_details_popmart-us_____1200x1200.jpg",
      "https://prod-america-res.popmart.com/default/20250403_164752_085899____scene_2_mega-labubu-1000-tony-tony-chopper_mega_details_popmart-us_____1200x1200.jpg"
    ],
    originalPrice: "$1,299.99",
    currentPrice: "FREE",
    type: "free",
    badge: "🚨 MEGA DEAL",
    urgencyText: "ONLY 1 LEFT!",
    socialProof: "2,341 people want this",
    rating: 5.0,
    reviews: 89,
    description: "MASSIVE 1000% size collectible! This is a once-in-a-lifetime opportunity to own this giant piece.",
    freeLimit: 5,
    freeOrdered: 4,
    savings: "$1,299.99"
  },
  {
    id: 5,
    name: "MEGA LABUBU 1000% Sketch Edition",
    images: [
      "https://prod-america-res.popmart.com/default/20240927_114625_019976____scene_1_____1200x1200.jpg",
      "https://prod-america-res.popmart.com/default/20240927_114625_448559____scene_2_____1200x1200.jpg",
      "https://prod-america-res.popmart.com/default/20240927_114625_508800____scene_3_____1200x1200.jpg"
    ],
    originalPrice: "$1,499.99",
    currentPrice: "$899.99",
    type: "premium",
    badge: "💎 EXCLUSIVE",
    urgencyText: "Limited to 100 pieces worldwide",
    socialProof: "Only 12 left in stock",
    rating: 5.0,
    reviews: 34,
    description: "Ultra-rare artist edition sketch design. Investment-grade collectible with certificate of authenticity.",
    savings: "$600.00"
  },
  {
    id: 6,
    name: "MEGA LABUBU TEC 1000% All About Us",
    images: [
      "https://prod-america-res.popmart.com/default/20240313_173349_222944__1200x1200.jpg",
      "https://prod-america-res.popmart.com/default/20240313_173412_015548__1200x1200.jpg",
      "https://prod-america-res.popmart.com/default/20240313_173352_870862__1200x1200.jpg"
    ],
    originalPrice: "$999.99",
    currentPrice: "FREE",
    type: "free",
    badge: "🎯 FREE TODAY",
    urgencyText: "Last 2 available!",
    socialProof: "1,789 people claimed",
    rating: 4.9,
    reviews: 567,
    description: "Premium TEC edition with special 'All About Us' theme. Collector's dream piece worth nearly $1,000!",
    freeLimit: 15,
    freeOrdered: 13,
    savings: "$999.99"
  }
];

// Enhanced countdown timer with more urgency
const CountdownTimer = () => {
  const [time, setTime] = useState({ hours: 1, minutes: 47, seconds: 33 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (num) => num.toString().padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-3 px-4 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20 animate-pulse"></div>
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <div className="flex items-center gap-2 text-sm sm:text-base font-bold">
          <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-bounce" />
          <span className="text-yellow-100">🚨 FLASH SALE ENDS IN:</span>
        </div>
        <div className="bg-black/40 px-3 py-2 rounded-lg font-mono text-yellow-300 shadow-inner border border-yellow-400/30 text-lg sm:text-xl font-bold">
          {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
        </div>
        <span className="text-yellow-100 animate-pulse text-sm sm:text-base font-bold">⚡ DON'T MISS OUT!</span>
      </div>
    </div>
  );
};

// Enhanced product component with better mobile optimization
const ProductCard = ({ product, onClaimClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % product.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [product.images.length]);

  const progressPercentage = product.freeLimit 
    ? (product.freeOrdered / product.freeLimit) * 100 
    : 0;
  
  const remaining = product.freeLimit 
    ? product.freeLimit - product.freeOrdered 
    : 0;

  const getBadgeColor = (type) => {
    switch (type) {
      case 'free':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg animate-pulse';
      case 'sale':
        return 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg';
      case 'premium':
        return 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getPriceColor = (type) => {
    switch (type) {
      case 'free':
        return 'text-green-600 font-black text-xl sm:text-2xl';
      case 'sale':
        return 'text-orange-600 font-black text-xl sm:text-2xl';
      case 'premium':
        return 'text-purple-600 font-black text-xl sm:text-2xl';
      default:
        return 'text-gray-600 font-black text-xl sm:text-2xl';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-100 h-full flex flex-col relative">
      {/* Wishlist heart */}
      <button 
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-3 left-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all"
      >
        <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
      </button>

      {/* Image container */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        
        {/* Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide ${getBadgeColor(product.type)}`}>
            {product.badge}
          </span>
        </div>
        
        {/* Social proof overlay */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Eye className="w-3 h-3" />
          {product.socialProof}
        </div>

        {/* Savings badge */}
        {product.savings && (
          <div className="absolute top-12 right-3 bg-yellow-400 text-black px-2 py-1 rounded-lg text-xs font-bold">
            Save {product.savings}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3rem] leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="ml-1 text-sm text-gray-600 font-semibold">({product.reviews})</span>
          </div>
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            ⚡ Fast shipping
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Price section */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-base sm:text-lg font-semibold">
              {product.originalPrice}
            </span>
          )}
          <span className={getPriceColor(product.type)}>
            {product.currentPrice}
          </span>
        </div>

        {/* Urgency indicator */}
        <div className="text-center mb-4">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs sm:text-sm font-bold animate-pulse flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            {product.urgencyText}
          </span>
        </div>

        {/* Progress bar for limited items */}
        {product.freeLimit && (
          <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
            <div className="text-center text-xs sm:text-sm font-bold text-orange-700 mb-2 flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3" />
              🔥 Only {remaining} left in stock!
            </div>
            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-red-600 transition-all duration-1000 shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow">
                {product.freeOrdered}/{product.freeLimit}
              </div>
            </div>
          </div>
        )}

        {/* Claim button */}
        <button
          onClick={() => onClaimClick(product)}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 sm:py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg"
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          {product.type === 'free' ? 'CLAIM FREE NOW!' : 'GET THIS DEAL!'}
          <Zap className="w-4 h-4 animate-pulse" />
        </button>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-1">
            <Gift className="w-3 h-3" />
            <span>Free Ship</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span>Authentic</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced order popup with content locker integration
const OrderPopup = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    city: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    onClose();
    
    // Trigger AdBlueMedia content locker
    if (typeof window._iE === 'function') {
      window._iE();
    } else {
      alert('🎉 Order submitted! Please complete the verification to claim your free LABUBU!');
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-blue-400/30 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-6">
          <div className="text-4xl sm:text-6xl mb-4">🎉</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Almost Yours!</h2>
          <p className="text-blue-100 text-base sm:text-lg">
            Secure your <span className="font-bold text-yellow-300">{product.name}</span> now!
          </p>
          <div className="mt-4 bg-yellow-400/20 border border-yellow-400/50 rounded-lg p-3">
            <p className="text-yellow-200 text-sm font-semibold">
              ⚡ You're saving {product.savings || product.originalPrice}!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name *"
            required
            className="w-full px-4 py-3 rounded-xl border-0 focus:ring-4 focus:ring-white/50 transition-all text-base font-medium"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />
          
          <input
            type="email"
            placeholder="Email Address *"
            required
            className="w-full px-4 py-3 rounded-xl border-0 focus:ring-4 focus:ring-white/50 transition-all text-base font-medium"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Country *"
              required
              className="px-4 py-3 rounded-xl border-0 focus:ring-4 focus:ring-white/50 transition-all text-base font-medium"
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
            />
            <input
              type="text"
              placeholder="City *"
              required
              className="px-4 py-3 rounded-xl border-0 focus:ring-4 focus:ring-white/50 transition-all text-base font-medium"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
            />
          </div>
          
          <input
            type="text"
            placeholder="Full Address *"
            required
            className="w-full px-4 py-3 rounded-xl border-0 focus:ring-4 focus:ring-white/50 transition-all text-base font-medium"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-70 flex items-center justify-center gap-3 text-lg"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                🚀 CLAIM MY {product.type === 'free' ? 'FREE' : ''} LABUBU!
                <Award className="w-5 h-5" />
              </>
            )}
          </button>
          
          <div className="text-center">
            <p className="text-blue-200 text-sm">✅ 100% Secure • ✅ Free Worldwide Shipping • ✅ Money Back Guarantee</p>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main App component
function App() {
  const [orderPopup, setOrderPopup] = useState({ isOpen: false, product: null });

  const handleClaimClick = (product) => {
    setOrderPopup({ isOpen: true, product });
  };

  const closeOrderPopup = () => {
    setOrderPopup({ isOpen: false, product: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Countdown timer */}
      <CountdownTimer />

      {/* Hero section */}
      <div className="relative">
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVif-0r6WnSvfAd0k5QhahOSC91LeijZHuH33uIIHysuAnerdmqkPyqQHg3_z0eVBhtnuUDr9ZTmz21sYug55SLvFeguNjevqGKoeom2gF1k-papg9oITPBopoP60S67HxaWWoWnBk9wAVCnG0zhhZt6yYZJ5fCWTHbUPxoSbd_xKFUi2UAYy4k8FJA2h1/s16000/Banner.png"
          alt="LABUBU Banner"
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl animate-pulse">
              🔥 FREE LABUBU GIVEAWAY! 🔥
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-yellow-300 font-bold drop-shadow-lg">
              Worth Over $5,000 - Claim Yours FREE!
            </p>
            <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-block">
              <p className="text-white font-semibold text-sm sm:text-base">
                🚨 Limited Time: Over 15,000 people claimed in 24 hours!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Free shipping banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-500 text-white text-center py-4 sm:py-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
        <div className="relative z-10">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <Gift className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce" />
            🚚 FREE WORLDWIDE SHIPPING!
            <Gift className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce" />
          </h3>
          <p className="text-green-100 font-semibold text-sm sm:text-base">
            ✅ No minimum order • ✅ Express delivery • ✅ 100% guaranteed
          </p>
        </div>
      </div>

      {/* Social proof banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-3 sm:py-4">
        <div className="flex items-center justify-center gap-2 sm:gap-4 text-sm sm:text-lg font-semibold">
          <Users className="w-4 h-4 sm:w-6 sm:h-6" />
          <span>🔥 Over 50,000 LABUBUs claimed in 24 hours!</span>
          <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 animate-pulse" />
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 mb-4">
            🎁 CLAIM YOUR FREE LABUBU NOW!
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 font-semibold">
            Limited quantities available - These premium collectibles won't last long!
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold">
            <Clock className="w-4 h-4" />
            Hurry! Sale ends soon
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {productsData.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClaimClick={handleClaimClick}
            />
          ))}
        </div>
      </div>

      {/* Trust indicators */}
      <div className="bg-gray-100 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
            Why Choose Our Store?
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mb-3" />
              <h4 className="font-bold text-gray-800 text-sm sm:text-base">100% Secure</h4>
              <p className="text-gray-600 text-xs sm:text-sm">SSL encrypted</p>
            </div>
            <div className="flex flex-col items-center">
              <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-3" />
              <h4 className="font-bold text-gray-800 text-sm sm:text-base">Free Shipping</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Worldwide delivery</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mb-3" />
              <h4 className="font-bold text-gray-800 text-sm sm:text-base">Premium Quality</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Authentic only</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-orange-600 mb-3" />
              <h4 className="font-bold text-gray-800 text-sm sm:text-base">50K+ Customers</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Join our community</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-blue-400">Store</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-blue-400">Help</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">Shipping</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">Returns</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">Track Order</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-blue-400">Shop</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">Keychains</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">Plush Toys</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">Accessories</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">Collections</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-blue-400">Follow</h4>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors text-sm">
                  f
                </a>
                <a href="#" className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors text-sm">
                  t
                </a>
                <a href="#" className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors text-sm">
                  i
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 LABUBU Store. All rights reserved. Secure shopping guaranteed.</p>
          </div>
        </div>
      </footer>

      {/* Order popup */}
      <OrderPopup
        isOpen={orderPopup.isOpen}
        onClose={closeOrderPopup}
        product={orderPopup.product}
      />
    </div>
  );
}

export default App;