import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type Product = {
  id: number;
  name: string;
  category: string;
  power: number;
  color: string;
  ledType: string;
  price: number;
  image: string;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'LED Panel Pro 600',
    category: 'Панели',
    power: 40,
    color: 'Холодный белый',
    ledType: 'SMD',
    price: 3499,
    image: '/placeholder.svg',
    description: 'Профессиональная LED панель для офисов'
  },
  {
    id: 2,
    name: 'LED Strip RGB',
    category: 'Ленты',
    power: 15,
    color: 'RGB',
    ledType: 'RGB',
    price: 1299,
    image: '/placeholder.svg',
    description: 'Цветная LED лента с управлением'
  },
  {
    id: 3,
    name: 'LED Bulb Smart',
    category: 'Лампы',
    power: 12,
    color: 'Теплый белый',
    ledType: 'COB',
    price: 899,
    image: '/placeholder.svg',
    description: 'Умная LED лампа с приложением'
  },
  {
    id: 4,
    name: 'LED Spotlight 50W',
    category: 'Прожекторы',
    power: 50,
    color: 'Дневной свет',
    ledType: 'COB',
    price: 2199,
    image: '/placeholder.svg',
    description: 'Мощный LED прожектор для улицы'
  },
  {
    id: 5,
    name: 'LED Panel Slim 300',
    category: 'Панели',
    power: 20,
    color: 'Холодный белый',
    ledType: 'SMD',
    price: 1899,
    image: '/placeholder.svg',
    description: 'Тонкая LED панель для потолков'
  },
  {
    id: 6,
    name: 'LED Strip Warm',
    category: 'Ленты',
    power: 10,
    color: 'Теплый белый',
    ledType: 'SMD',
    price: 999,
    image: '/placeholder.svg',
    description: 'Теплая LED лента для уюта'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  });
  
  const [filters, setFilters] = useState({
    power: [] as number[],
    color: [] as string[],
    ledType: [] as string[]
  });

  const powerOptions = [10, 15, 20, 40, 50];
  const colorOptions = ['Холодный белый', 'Теплый белый', 'Дневной свет', 'RGB'];
  const ledTypeOptions = ['SMD', 'COB', 'RGB'];

  const handleFilterChange = (category: 'power' | 'color' | 'ledType', value: number | string) => {
    setFilters(prev => {
      const currentValues = prev[category] as (number | string)[];
      const newValues = currentValues.includes(value as never)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value as never];
      
      return { ...prev, [category]: newValues };
    });
  };

  const applyFilters = () => {
    let filtered = products;

    if (filters.power.length > 0) {
      filtered = filtered.filter(p => filters.power.includes(p.power));
    }
    if (filters.color.length > 0) {
      filtered = filtered.filter(p => filters.color.includes(p.color));
    }
    if (filters.ledType.length > 0) {
      filtered = filtered.filter(p => filters.ledType.includes(p.ledType));
    }

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setFilters({ power: [], color: [], ledType: [] });
    setFilteredProducts(products);
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderForm.name || !orderForm.phone || !orderForm.address) {
      toast.error('Заполните обязательные поля');
      return;
    }

    toast.success('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.');
    setCheckoutOpen(false);
    setCart([]);
    setOrderForm({
      name: '',
      phone: '',
      email: '',
      address: '',
      comment: ''
    });
  };

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'catalog', label: 'Каталог', icon: 'Package' },
    { id: 'about', label: 'О компании', icon: 'Building2' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck' },
    { id: 'contacts', label: 'Контакты', icon: 'Phone' },
    { id: 'blog', label: 'Блог', icon: 'BookOpen' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Lightbulb" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">LED Store</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon name={item.icon as any} size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Icon name="Lightbulb" size={24} className="text-primary" />
                    LED Store
                  </SheetTitle>
                  <SheetDescription>
                    Навигация по сайту
                  </SheetDescription>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-4">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 text-left p-3 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Icon name={item.icon as any} size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cart.length === 0 ? 'Корзина пуста' : `Товаров: ${cart.length}`}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  ))}
                  {cart.length > 0 && (
                    <>
                      <Separator />
                      <div className="flex justify-between items-center font-bold">
                        <span>Итого:</span>
                        <span>{getTotalPrice()} ₽</span>
                      </div>
                      <Button className="w-full" onClick={handleCheckout}>
                        Оформить заказ
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {activeSection === 'home' && (
          <div className="space-y-16">
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-12 md:p-16">
              <div className="relative z-10 max-w-2xl space-y-6 animate-fade-in">
                <h2 className="text-4xl md:text-6xl font-bold">
                  Освещение будущего
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground">
                  Профессиональная LED продукция для дома и бизнеса. Энергоэффективность, долговечность, стиль.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" onClick={() => setActiveSection('catalog')}>
                    Каталог товаров
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setActiveSection('about')}>
                    О компании
                  </Button>
                </div>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
                <Icon name="Lightbulb" size={400} className="text-primary" />
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold">Популярные товары</h3>
                <Button variant="link" onClick={() => setActiveSection('catalog')}>
                  Смотреть все
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 3).map((product, index) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="aspect-square bg-muted flex items-center justify-center">
                      <Icon name="Lightbulb" size={80} className="text-primary/30" />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Мощность:</span>
                          <span className="font-medium">{product.power}W</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Цвет:</span>
                          <span className="font-medium">{product.color}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Тип LED:</span>
                          <span className="font-medium">{product.ledType}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{product.price} ₽</span>
                      <Button onClick={() => addToCart(product)}>
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">Каталог LED продукции</h2>
              <p className="text-muted-foreground">Найдено товаров: {filteredProducts.length}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <aside className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Filter" size={20} />
                      Фильтры
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Мощность (W)</Label>
                      {powerOptions.map(power => (
                        <div key={power} className="flex items-center space-x-2">
                          <Checkbox
                            id={`power-${power}`}
                            checked={filters.power.includes(power)}
                            onCheckedChange={() => handleFilterChange('power', power)}
                          />
                          <label
                            htmlFor={`power-${power}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {power}W
                          </label>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Цвет свечения</Label>
                      {colorOptions.map(color => (
                        <div key={color} className="flex items-center space-x-2">
                          <Checkbox
                            id={`color-${color}`}
                            checked={filters.color.includes(color)}
                            onCheckedChange={() => handleFilterChange('color', color)}
                          />
                          <label
                            htmlFor={`color-${color}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {color}
                          </label>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Тип светодиодов</Label>
                      {ledTypeOptions.map(type => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={filters.ledType.includes(type)}
                            onCheckedChange={() => handleFilterChange('ledType', type)}
                          />
                          <label
                            htmlFor={`type-${type}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button onClick={applyFilters} className="flex-1">
                      Применить
                    </Button>
                    <Button onClick={resetFilters} variant="outline" className="flex-1">
                      Сбросить
                    </Button>
                  </CardFooter>
                </Card>
              </aside>

              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                      <div className="aspect-square bg-muted flex items-center justify-center">
                        <Icon name="Lightbulb" size={80} className="text-primary/30" />
                      </div>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <Badge variant="secondary">{product.category}</Badge>
                        </div>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Мощность:</span>
                            <span className="font-medium">{product.power}W</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Цвет:</span>
                            <span className="font-medium">{product.color}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Тип LED:</span>
                            <span className="font-medium">{product.ledType}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <span className="text-2xl font-bold">{product.price} ₽</span>
                        <Button onClick={() => addToCart(product)}>
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold">О компании LED Store</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground">
                LED Store — ведущий поставщик профессиональной светодиодной продукции в России. Мы предлагаем широкий ассортимент LED решений для дома, офиса и промышленных объектов.
              </p>
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <Card>
                  <CardHeader>
                    <Icon name="Award" size={40} className="text-primary mb-4" />
                    <CardTitle>10+ лет опыта</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Профессиональная работа на рынке LED технологий</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Icon name="Users" size={40} className="text-primary mb-4" />
                    <CardTitle>5000+ клиентов</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Доверяют нашему качеству и сервису</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Icon name="PackageCheck" size={40} className="text-primary mb-4" />
                    <CardTitle>Гарантия 3 года</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">На всю нашу продукцию</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'delivery' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold">Доставка</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Truck" size={24} />
                  Способы доставки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Курьерская доставка по Москве</h4>
                  <p className="text-muted-foreground">Бесплатно при заказе от 5000 ₽. Доставка 1-2 дня.</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-semibold">Доставка по России</h4>
                  <p className="text-muted-foreground">Транспортные компании. Срок 3-7 дней.</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-semibold">Самовывоз</h4>
                  <p className="text-muted-foreground">Из нашего офиса в Москве. Бесплатно.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" size={24} />
                    Адрес
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Москва, ул. Примерная, д. 123</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Phone" size={24} />
                    Телефон
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Mail" size={24} />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">info@ledstore.ru</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Clock" size={24} />
                    Режим работы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00<br />Сб-Вс: выходной</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'blog' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold">Блог</h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Как выбрать LED освещение для дома',
                  date: '15 декабря 2024',
                  excerpt: 'Подробное руководство по выбору светодиодного освещения для жилых помещений.'
                },
                {
                  title: 'Преимущества LED технологий',
                  date: '10 декабря 2024',
                  excerpt: 'Почему LED освещение экономичнее и экологичнее традиционных ламп.'
                },
                {
                  title: 'RGB подсветка: тренды 2024',
                  date: '5 декабря 2024',
                  excerpt: 'Как использовать RGB освещение в современном интерьере.'
                }
              ].map((post, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Icon name="Calendar" size={16} />
                      {post.date}
                    </div>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="link" className="p-0">
                      Читать далее
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t mt-16">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Lightbulb" size={24} className="text-primary" />
              <span className="font-bold">LED Store</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 LED Store. Все права защищены.
            </p>
          </div>
        </div>
      </footer>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="ShoppingBag" size={24} />
              Оформление заказа
            </DialogTitle>
            <DialogDescription>
              Заполните форму, и мы свяжемся с вами для подтверждения заказа
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleOrderSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                placeholder="Иван Иванов"
                value={orderForm.name}
                onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={orderForm.phone}
                onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.ru"
                value={orderForm.email}
                onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Адрес доставки *</Label>
              <Textarea
                id="address"
                placeholder="Москва, ул. Примерная, д. 1, кв. 1"
                value={orderForm.address}
                onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                required
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Комментарий к заказу</Label>
              <Textarea
                id="comment"
                placeholder="Дополнительная информация..."
                value={orderForm.comment}
                onChange={(e) => setOrderForm({ ...orderForm, comment: e.target.value })}
                rows={3}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Товаров:</span>
                <span className="font-medium">{cart.length} шт.</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Итого к оплате:</span>
                <span className="text-primary">{getTotalPrice()} ₽</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setCheckoutOpen(false)}>
                Отмена
              </Button>
              <Button type="submit" className="flex-1">
                <Icon name="Check" size={16} className="mr-2" />
                Подтвердить заказ
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;