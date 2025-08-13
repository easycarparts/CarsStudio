# Cars Studio - Instant WhatsApp Quote Funnel

A modern, mobile-first web application for Cars Studio to generate instant quotes for car services via WhatsApp.

## 🚀 Features

- **6-Step Funnel**: Service selection → Car basics → Package scope → Condition/timing/location → Budget/intent → Contact
- **Mobile-First Design**: Optimized for mobile devices with 9:16 aspect ratio
- **Photo Upload**: Support for up to 3 photos with image compression
- **WhatsApp Integration**: Direct WhatsApp messaging with pre-filled quote details
- **Lead Grading**: Automatic lead scoring (A, B, C) based on service, budget, and timing
- **Analytics Tracking**: Meta Pixel, TikTok Pixel, and Google Analytics support
- **Local Storage**: Saves user progress automatically
- **Responsive UI**: Beautiful animations and modern design
  
## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Build Tool**: Vite
- **UI Components**: Radix UI + Custom components
- **Form Handling**: React Hook Form + Zod validation

## 📱 Services Supported

1. **Wrapping**: Full/partial wrap, color change, chrome delete
2. **PPF (Paint Protection Film)**: Full front, track pack, full body
3. **Detailing**: Interior, exterior, full detailing with add-ons

## 🚗 Vehicle Database

Includes comprehensive data for:
- Luxury brands: Porsche, BMW, Mercedes-Benz, Audi, Lexus, Lotus
- Mid-range brands: Ford, Toyota, Honda, Nissan, Volkswagen, Hyundai, Kia
- Years: 2020-2024

## 🔧 Recent Fixes Applied

- ✅ Fixed missing vite.svg reference in index.html
- ✅ Added proper error handling for TikTok tracking pixel
- ✅ Fixed TypeScript compilation errors
- ✅ Added error handling for image compression
- ✅ Fixed useEffect dependency issues
- ✅ Added proper CSS styling for dark theme
- ✅ Added error boundaries for component crashes
- ✅ Fixed tracking pixel initialization timing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd cars-studio-funnel

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup
The app will run with placeholder tracking pixel IDs. To use real tracking:

1. Update `index.html` with your actual Meta Pixel ID
2. Update `index.html` with your actual TikTok Pixel ID
3. Add Google Analytics if needed

## 📊 Lead Grading System

**Grade A (Score 10+)**: High-value leads
- PPF full body or full wrap services
- Budget 4k+ AED
- ASAP timing
- Luxury vehicle brands

**Grade B (Score 7-9)**: Medium-value leads
- PPF full front or track pack
- Budget 2k-4k AED
- This week timing
- Mid-range vehicle brands

**Grade C (Score <7)**: Standard leads
- Basic detailing services
- Lower budgets
- Flexible timing
- Economy vehicle brands

## 🎨 Customization

### Colors
Primary color is defined in `src/index.css` as `--primary: 0 72% 51%` (red)

### Services
Edit `src/data/services.json` to modify:
- Service packages
- Pricing tiers
- Brand options
- Add-ons

### Vehicles
Edit `src/data/vehicles.json` to add/modify vehicle data

## 📱 Mobile Optimization

- Touch-friendly interface
- Safe area support for notched devices
- Optimized image compression
- Smooth animations with Framer Motion

## 🔍 Troubleshooting

### Common Issues
1. **App not loading**: Check browser console for errors
2. **Tracking not working**: Ensure tracking pixels are properly configured
3. **Image upload fails**: Check browser permissions and file size limits
4. **Styling issues**: Clear browser cache and restart dev server

### Development Tips
- Use browser dev tools to debug
- Check network tab for failed requests
- Monitor console for JavaScript errors
- Test on multiple devices and browsers

## 📄 License

This project is proprietary software for Cars Studio.

## 🤝 Support

For technical support or questions, contact the development team.

---

**Cars Studio** - Premium car care services in UAE
XPEL • 3M • STEK • Professional Installation
