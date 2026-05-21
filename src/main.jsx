import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Apple,
  BadgePercent,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  Home,
  Leaf,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  ReceiptText,
  Search,
  ShoppingBag,
  Smartphone,
  Star,
  Trash2,
  Truck,
  User,
  X
} from 'lucide-react';
import './styles.css';

const products = [
  {
    id: 1,
    name: 'Organic Banana Bunch',
    category: 'Fruits',
    price: 89,
    unit: '6 pcs',
    rating: 4.8,
    tag: 'Best seller',
    image:
      'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Farm Fresh Strawberries',
    category: 'Fruits',
    price: 249,
    unit: '1 box',
    rating: 4.9,
    tag: 'Fresh today',
    image:
      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Avocado Hass Pack',
    category: 'Fruits',
    price: 299,
    unit: '4 pcs',
    rating: 4.7,
    tag: 'Ready soon',
    image:
      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Green Garden Broccoli',
    category: 'Vegetables',
    price: 119,
    unit: '1 head',
    rating: 4.7,
    tag: 'Organic',
    image:
      'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    name: 'Rainbow Bell Peppers',
    category: 'Vegetables',
    price: 159,
    unit: '3 pack',
    rating: 4.6,
    tag: 'Color mix',
    image:
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    name: 'Baby Spinach Leaves',
    category: 'Vegetables',
    price: 79,
    unit: '250 g',
    rating: 4.8,
    tag: 'Washed',
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 7,
    name: 'Artisan Sourdough Loaf',
    category: 'Bakery',
    price: 189,
    unit: '1 loaf',
    rating: 4.9,
    tag: 'Baked 7 AM',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 8,
    name: 'Butter Croissant Box',
    category: 'Bakery',
    price: 220,
    unit: '4 pcs',
    rating: 4.8,
    tag: 'Flaky',
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 9,
    name: 'Amul Taaza Milk',
    category: 'Dairy',
    price: 68,
    unit: '1 L',
    rating: 4.6,
    tag: 'Daily fresh',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 10,
    name: 'Greek Yogurt Plain',
    category: 'Dairy',
    price: 145,
    unit: '500 g',
    rating: 4.7,
    tag: 'Protein rich',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 11,
    name: 'Cold Pressed Orange Juice',
    category: 'Drinks',
    price: 199,
    unit: '750 ml',
    rating: 4.9,
    tag: 'No sugar',
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 12,
    name: 'Sparkling Mineral Water',
    category: 'Drinks',
    price: 120,
    unit: '6 cans',
    rating: 4.5,
    tag: 'Chilled',
    image:
      'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=600&q=80'
  }
];

const categories = ['All', 'Fruits', 'Vegetables', 'Bakery', 'Dairy', 'Drinks'];

const paymentMethods = [
  { id: 'upi', label: 'Add UPI', detail: 'Pay with any UPI ID', icon: Smartphone },
  { id: 'phonepe', label: 'PhonePe', detail: 'Open PhonePe payment', icon: Smartphone },
  { id: 'gpay', label: 'GPay', detail: 'Google Pay checkout', icon: Smartphone },
  { id: 'cod', label: 'Cash', detail: 'Pay on delivery', icon: ReceiptText }
];

function formatMoney(value) {
  return `Rs. ${Math.round(value).toLocaleString('en-IN')}`;
}

function buildBillText(order) {
  const lines = [
    'QuickBasket Grocery - Order Bill',
    `Order ID: ${order.id}`,
    `Date: ${order.date}`,
    '',
    'Customer Details',
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `Address: ${order.customer.address}`,
    `Payment: ${order.paymentLabel}`,
    '',
    'Items'
  ];

  order.items.forEach((item) => {
    lines.push(
      `${item.name} (${item.unit}) - ${item.quantity} x ${formatMoney(item.price)} = ${formatMoney(
        item.price * item.quantity
      )}`
    );
  });

  lines.push(
    '',
    `Subtotal: ${formatMoney(order.subtotal)}`,
    `Delivery: ${order.deliveryFee === 0 ? 'Free' : formatMoney(order.deliveryFee)}`,
    `Savings: -${formatMoney(order.savings)}`,
    `Total Paid: ${formatMoney(order.total)}`,
    '',
    'Order is placed. Thank you for shopping with QuickBasket.'
  );

  return lines.join('\n');
}

function App() {
  const [cart, setCart] = useState({ 1: 2, 4: 1, 7: 1 });
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [latestBill, setLatestBill] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [customer, setCustomer] = useState({
    name: '',
    address: '',
    phone: '',
    upi: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesQuery =
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, quantity]) => {
          const product = products.find((item) => item.id === Number(id));
          return product ? { ...product, quantity } : null;
        })
        .filter(Boolean),
    [cart]
  );

  const subtotal = cartItems.reduce(
    (totalValue, item) => totalValue + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const savings = subtotal * 0.08;
  const total = Math.max(subtotal + deliveryFee - savings, 0);
  const cartCount = cartItems.reduce((totalCount, item) => totalCount + item.quantity, 0);
  const selectedPayment = paymentMethods.find((method) => method.id === paymentMethod);

  function updateCart(productId, change) {
    setCart((currentCart) => {
      const currentQuantity = currentCart[productId] ?? 0;
      const nextQuantity = Math.max(currentQuantity + change, 0);

      if (nextQuantity === 0) {
        const { [productId]: _removedItem, ...rest } = currentCart;
        return rest;
      }

      return {
        ...currentCart,
        [productId]: nextQuantity
      };
    });
  }

  function removeFromCart(productId) {
    setCart((currentCart) => {
      const { [productId]: _removedItem, ...rest } = currentCart;
      return rest;
    });
  }

  function handleBuyNow(productId) {
    setCart({ [productId]: 1 });
    setCheckoutOpen(true);
    setOrderPlaced(false);
  }

  function handleCustomerChange(field, value) {
    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [field]: value
    }));
    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [field]: ''
    }));
  }

  function validateCheckout() {
    const nextErrors = {};

    if (!customer.name.trim()) {
      nextErrors.name = 'Enter customer name';
    }

    if (!customer.address.trim()) {
      nextErrors.address = 'Enter delivery address';
    }

    if (!/^[6-9]\d{9}$/.test(customer.phone.trim())) {
      nextErrors.phone = 'Enter a valid 10 digit Indian phone number';
    }

    if (paymentMethod === 'upi' && !/^[\w.-]+@[\w.-]+$/.test(customer.upi.trim())) {
      nextErrors.upi = 'Enter a valid UPI ID';
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function placeOrder() {
    if (cartItems.length === 0 || !validateCheckout()) {
      return;
    }

    const order = {
      id: `QB${Date.now().toString().slice(-8)}`,
      date: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      customer: {
        name: customer.name.trim(),
        address: customer.address.trim(),
        phone: customer.phone.trim(),
        upi: customer.upi.trim()
      },
      paymentLabel: selectedPayment?.label ?? 'UPI',
      items: cartItems,
      subtotal,
      deliveryFee,
      savings,
      total
    };

    setLatestBill(order);
    setCheckoutOpen(false);
    setOrderPlaced(true);
    setCart({});
  }

  function downloadBill(order = latestBill) {
    if (!order) {
      return;
    }

    const blob = new Blob([buildBillText(order)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `QuickBasket-Bill-${order.id}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="QuickBasket Grocery home">
          <span className="brand-mark">
            <ShoppingBag size={21} aria-hidden="true" />
          </span>
          <span>QuickBasket</span>
        </a>

        <nav className={mobileNavOpen ? 'nav-links nav-links-open' : 'nav-links'}>
          <a href="#deals" onClick={() => setMobileNavOpen(false)}>
            Deals
          </a>
          <a href="#products" onClick={() => setMobileNavOpen(false)}>
            Products
          </a>
          <a href="#delivery" onClick={() => setMobileNavOpen(false)}>
            Delivery
          </a>
          <a href="#cart" onClick={() => setMobileNavOpen(false)}>
            Cart
          </a>
        </nav>

        <div className="topbar-actions">
          <button className="location-pill" type="button">
            <MapPin size={17} aria-hidden="true" />
            <span>Deliver to Home</span>
          </button>
          <button
            className="icon-button mobile-menu-button"
            type="button"
            aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMobileNavOpen((isOpen) => !isOpen)}
          >
            {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {orderPlaced && latestBill && (
        <section className="order-toast" role="status" aria-live="polite">
          <CheckCircle2 size={24} aria-hidden="true" />
          <div>
            <strong>Order is placed</strong>
            <span>
              {latestBill.customer.name}, your groceries will be delivered to{' '}
              {latestBill.customer.address}.
            </span>
          </div>
          <button type="button" onClick={() => downloadBill()}>
            <Download size={16} aria-hidden="true" />
            Bill
          </button>
          <button type="button" aria-label="Close order message" onClick={() => setOrderPlaced(false)}>
            <X size={16} aria-hidden="true" />
          </button>
        </section>
      )}

      <main id="top" className="main-layout">
        <section className="content-column">
          <section className="hero-section" aria-labelledby="hero-title">
            <div className="hero-copy">
              <span className="eyebrow">
                <Leaf size={16} aria-hidden="true" />
                Fresh groceries in 30 minutes
              </span>
              <h1 id="hero-title">Fresh food, fast baskets, zero fuss.</h1>
              <p>
                Shop crisp produce, bakery staples, chilled drinks, and weekly
                essentials from one clean grocery dashboard with Indian pricing.
              </p>

              <div className="hero-actions">
                <a className="primary-button" href="#products">
                  Start shopping
                  <ChevronRight size={18} aria-hidden="true" />
                </a>
                <a className="secondary-button" href="#deals">
                  Today&apos;s deals
                </a>
              </div>
            </div>

            <div className="hero-visual" aria-label="Fresh grocery arrangement">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=85"
                alt="Fresh vegetables and fruit arranged in grocery crates"
              />
              <div className="floating-card">
                <span>Weekly basket</span>
                <strong>{formatMoney(total)}</strong>
              </div>
            </div>
          </section>

          <section id="deals" className="deal-grid" aria-label="QuickBasket benefits">
            <article className="deal-panel">
              <BadgePercent size={24} aria-hidden="true" />
              <div>
                <h2>8% basket savings</h2>
                <p>Applied automatically to fresh picks and pantry staples.</p>
              </div>
            </article>
            <article className="deal-panel accent-panel">
              <Truck size={24} aria-hidden="true" />
              <div>
                <h2>Free delivery over Rs. 999</h2>
                <p>Choose a delivery window that fits dinner, lunch, or now.</p>
              </div>
            </article>
            <article className="deal-panel">
              <Clock3 size={24} aria-hidden="true" />
              <div>
                <h2>30 minute express</h2>
                <p>Fresh produce is picked, packed, and routed quickly.</p>
              </div>
            </article>
          </section>

          <section id="products" className="products-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  <Apple size={16} aria-hidden="true" />
                  Shop by aisle
                </span>
                <h2>Popular grocery picks</h2>
              </div>
              <label className="search-box">
                <Search size={18} aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search groceries"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
            </div>

            <div className="category-tabs" aria-label="Product categories">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? 'category-tab active-tab' : 'category-tab'}
                  type="button"
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => {
                const quantity = cart[product.id] ?? 0;

                return (
                  <article className="product-card" key={product.id}>
                    <div className="product-image-wrap">
                      <img src={product.image} alt={product.name} />
                      <span>{product.tag}</span>
                    </div>
                    <div className="product-meta">
                      <p>{product.category}</p>
                      <div className="rating">
                        <Star size={15} fill="currentColor" aria-hidden="true" />
                        {product.rating}
                      </div>
                    </div>
                    <h3>{product.name}</h3>
                    <div className="product-footer">
                      <div>
                        <strong>{formatMoney(product.price)}</strong>
                        <span>{product.unit}</span>
                      </div>
                      <div className="product-actions">
                        {quantity > 0 ? (
                          <div className="quantity-control" aria-label={`${product.name} quantity`}>
                            <button
                              type="button"
                              aria-label={`Remove one ${product.name}`}
                              onClick={() => updateCart(product.id, -1)}
                            >
                              <Minus size={15} aria-hidden="true" />
                            </button>
                            <span>{quantity}</span>
                            <button
                              type="button"
                              aria-label={`Add one ${product.name}`}
                              onClick={() => updateCart(product.id, 1)}
                            >
                              <Plus size={15} aria-hidden="true" />
                            </button>
                          </div>
                        ) : (
                          <button
                            className="add-button"
                            type="button"
                            onClick={() => updateCart(product.id, 1)}
                          >
                            <Plus size={16} aria-hidden="true" />
                            Add
                          </button>
                        )}
                        <button
                          className="buy-button"
                          type="button"
                          onClick={() => handleBuyNow(product.id)}
                        >
                          Buy now
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </section>

        <aside id="cart" className="cart-panel" aria-labelledby="cart-title">
          <div className="cart-header">
            <div>
              <span className="eyebrow">
                <ShoppingBag size={16} aria-hidden="true" />
                {cartCount} items
              </span>
              <h2 id="cart-title">Your basket</h2>
            </div>
            <span className="cart-status">Live cart</span>
          </div>

          <div className="delivery-box" id="delivery">
            <div>
              <p>Delivery window</p>
              <strong>Today, 6:00 - 6:30 PM</strong>
            </div>
            <Clock3 size={22} aria-hidden="true" />
          </div>

          <div className="cart-items">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={35} aria-hidden="true" />
                <p>Your basket is waiting for something fresh.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      {item.quantity} x {formatMoney(item.price)}
                    </p>
                    <div className="cart-item-actions">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name}`}
                        onClick={() => updateCart(item.id, -1)}
                      >
                        <Minus size={14} aria-hidden="true" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name}`}
                        onClick={() => updateCart(item.id, 1)}
                      >
                        <Plus size={14} aria-hidden="true" />
                      </button>
                      <button
                        className="remove-button"
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <strong>{formatMoney(item.price * item.quantity)}</strong>
                </article>
              ))
            )}
          </div>

          <div className="summary-card">
            <div>
              <span>Subtotal</span>
              <strong>{formatMoney(subtotal)}</strong>
            </div>
            <div>
              <span>Delivery</span>
              <strong>{deliveryFee === 0 ? 'Free' : formatMoney(deliveryFee)}</strong>
            </div>
            <div>
              <span>Savings</span>
              <strong>-{formatMoney(savings)}</strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{formatMoney(total)}</strong>
            </div>
          </div>

          <section className="billing-section" aria-label="Billing section">
            <div>
              <ReceiptText size={18} aria-hidden="true" />
              <strong>Billing ready</strong>
            </div>
            <p>Checkout will collect customer name, address, phone number, and payment mode.</p>
          </section>

          <button
            className="checkout-button"
            type="button"
            disabled={cartItems.length === 0}
            onClick={() => setCheckoutOpen(true)}
          >
            Checkout
            <ChevronRight size={18} aria-hidden="true" />
          </button>

          {latestBill && (
            <button className="download-bill-button" type="button" onClick={() => downloadBill()}>
              <Download size={17} aria-hidden="true" />
              Download last bill
            </button>
          )}
        </aside>
      </main>

      {checkoutOpen && (
        <div className="modal-backdrop" role="presentation">
          <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
            <div className="modal-header">
              <div>
                <span className="eyebrow">
                  <ReceiptText size={16} aria-hidden="true" />
                  Billing section
                </span>
                <h2 id="checkout-title">Checkout</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                aria-label="Close checkout"
                onClick={() => setCheckoutOpen(false)}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="checkout-grid">
              <form className="customer-form" onSubmit={(event) => event.preventDefault()}>
                <label>
                  <span>
                    <User size={16} aria-hidden="true" />
                    Customer name
                  </span>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={customer.name}
                    onChange={(event) => handleCustomerChange('name', event.target.value)}
                  />
                  {formErrors.name && <small>{formErrors.name}</small>}
                </label>

                <label>
                  <span>
                    <Home size={16} aria-hidden="true" />
                    Customer address
                  </span>
                  <textarea
                    placeholder="Flat, street, area, city"
                    value={customer.address}
                    onChange={(event) => handleCustomerChange('address', event.target.value)}
                  />
                  {formErrors.address && <small>{formErrors.address}</small>}
                </label>

                <label>
                  <span>
                    <Phone size={16} aria-hidden="true" />
                    Phone number
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="10 digit mobile number"
                    value={customer.phone}
                    onChange={(event) => handleCustomerChange('phone', event.target.value)}
                  />
                  {formErrors.phone && <small>{formErrors.phone}</small>}
                </label>

                <div className="payment-section">
                  <strong>Payment method</strong>
                  <div className="payment-options">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;

                      return (
                        <button
                          key={method.id}
                          className={
                            paymentMethod === method.id
                              ? 'payment-option active-payment'
                              : 'payment-option'
                          }
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                        >
                          <Icon size={18} aria-hidden="true" />
                          <span>{method.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  {paymentMethod === 'upi' && (
                    <label className="upi-field">
                      <span>UPI ID</span>
                      <input
                        type="text"
                        placeholder="name@upi"
                        value={customer.upi}
                        onChange={(event) => handleCustomerChange('upi', event.target.value)}
                      />
                      {formErrors.upi && <small>{formErrors.upi}</small>}
                    </label>
                  )}
                  <p>{selectedPayment?.detail}</p>
                </div>
              </form>

              <aside className="bill-preview" aria-label="Order bill preview">
                <div className="bill-title">
                  <ReceiptText size={20} aria-hidden="true" />
                  <strong>Bill preview</strong>
                </div>

                <div className="bill-items">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <strong>{formatMoney(item.price * item.quantity)}</strong>
                    </div>
                  ))}
                </div>

                <div className="summary-card checkout-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>{formatMoney(subtotal)}</strong>
                  </div>
                  <div>
                    <span>Delivery</span>
                    <strong>{deliveryFee === 0 ? 'Free' : formatMoney(deliveryFee)}</strong>
                  </div>
                  <div>
                    <span>Savings</span>
                    <strong>-{formatMoney(savings)}</strong>
                  </div>
                  <div className="summary-total">
                    <span>Payable</span>
                    <strong>{formatMoney(total)}</strong>
                  </div>
                </div>

                <button className="place-order-button" type="button" onClick={placeOrder}>
                  Place order
                  <CheckCircle2 size={18} aria-hidden="true" />
                </button>
              </aside>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
