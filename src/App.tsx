import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { AdsPage } from '@/pages/AdsPage'
import { BookingPage } from '@/pages/BookingPage';
import { BrewGear } from '@/pages/BrewGearPage'
import { GiftCards } from '@/pages/GiftCardsPage'
import { CoffeeDetails } from '@/pages/CoffeeDetailsPage'
import { CoffeeList } from '@/pages/CoffeeListPage'
import { CartPage } from '@/pages/CartPage'
import { CartProvider } from './context/CartContext'
import { CheckoutPage } from '@/features/home/CheckoutPage'
import { AboutPage } from '@/pages/AboutPage';
import { ShippingPage } from '@/pages/ShippingPage';
import { BrewGuidePage } from '@/pages/BrewGuidePage';
import { ShopBeansPage } from '@/pages/ShopBeansPage'
import { QuickViewModal } from '@/features/products/QuickViewModal'
import { HomeHeader } from '@/features/home/HomeHeader';
import { HomeFooter } from '@/features/home/HomeFooter';
import { BuildYourBoxPage } from '@/pages/BuildYourBoxPage'
import { SupportPage } from '@/pages/SupportPage'
import { CoffeeToolsPage } from '@/pages/CoffeeToolsPage'
import { BookingFormPage } from '@/pages/BookingFormPage'
import { GoldenHourPage } from '@/pages/GoldenHourPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ConsultationPage } from '@/pages/ConsultationPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { OrderSuccessPage } from '@/pages/OrderSuccessPage'

function App() {
  return (
    <CartProvider>
      <HomeHeader />

      <main className="min-h-screen">
        <Routes>
          {/* --- Main Pages --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop-beans" element={<ShopBeansPage />} />
          <Route path="/coffee-list" element={<CoffeeList />} />
          <Route path="/coffee/:id" element={<CoffeeDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} /> {/* ← Route جديد */}

          <Route path="/about" element={<AboutPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/brew-guide" element={<BrewGuidePage />} />
          <Route path="/support" element={<SupportPage />} />

          <Route path="/book-table" element={<BookingPage />} />
          <Route path="/booking-form" element={<BookingFormPage />} />
          <Route path="/brew-gear" element={<BrewGear />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/build-your-box" element={<BuildYourBoxPage />} />
          <Route path="/golden-hour" element={<GoldenHourPage />} />
          <Route path="/coffee-tools" element={<CoffeeToolsPage />} />

          <Route path="/beans" element={<AdsPage />} />
          <Route path="/ads" element={<Navigate to="/beans" replace />} />
          <Route path="/coffee" element={<Navigate to="/coffee-list" replace />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <HomeFooter />

      <QuickViewModal />

    </CartProvider>
  )
}

export default App