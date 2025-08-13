# Cars Studio Funnel - Setup Guide

## 🚀 Quick Start

Your high-converting WhatsApp funnel is ready! Here's how to get it running:

### 1. Install & Run
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### 2. Configure Analytics (Optional)
Edit `index.html` and replace:
- `YOUR_PIXEL_ID` with your Meta Pixel ID
- `YOUR_TIKTOK_PIXEL_ID` with your TikTok Pixel ID

### 3. Customize WhatsApp Number
Edit `src/components/steps/ContactWhatsApp.tsx` and update the WhatsApp number in the `handleWhatsAppSubmit` function.

## 📱 What You've Built

### Mobile-First Funnel (9:16)
- **6 Steps**: Service → Car → Package → Condition/Timing/Location → Budget/Intent → WhatsApp
- **Lead Grading**: Automatic A/B/C scoring
- **WhatsApp Integration**: Pre-filled messages with all data
- **Photo Upload**: Camera/gallery with compression
- **Auto-save**: Progress saved to localStorage

### Key Features
✅ **Service Selection**: Wrapping, PPF, Detailing  
✅ **Car Autosuggest**: Year/Make/Model with UAE database  
✅ **Package Options**: Service-specific configurations  
✅ **Lead Scoring**: Based on service, budget, timing, car segment  
✅ **WhatsApp Handoff**: Complete message with all details  
✅ **Analytics Tracking**: Meta + TikTok pixels  
✅ **UTM Tracking**: Campaign and adset parameters  

## 🎯 Lead Grading System

**Grade A (10+ points)**: High-value leads
- PPF Full Body (5) + High Budget (4) + ASAP (3) + Luxury Car (3)

**Grade B (7-9 points)**: Mid-value leads  
- Full Wrap (4) + Mid Budget (2-3) + This Week (2) + Mid Car (2)

**Grade C (<7 points)**: Entry-level leads
- Detailing (2) + Low Budget (0-1) + Next Week (1) + Entry Car (1)

## 📊 Analytics Events

The funnel tracks:
- `view_content`: Landing page view
- `select_service`: Service selection  
- `step_progress`: Step completion
- `lead_submit`: Phone submission
- `contact_whatsapp`: WhatsApp click

## 🔧 Customization

### Services
Edit `src/data/services.json` to modify:
- Service packages and options
- Budget ranges per service
- Brand preferences
- Add-on services

### Vehicles
Edit `src/data/vehicles.json` to add more car makes/models.

### Styling
Update CSS variables in `src/index.css`:
```css
:root {
  --primary: 0 72% 51%; /* Red accent */
  --background: 222.2 84% 4.9%; /* Dark background */
}
```

### Lead Grading
Modify scoring in `src/lib/utils.ts`:
```typescript
export function calculateLeadGrade(data: {
  service: string
  package?: string
  budget: string
  timing: string
  carMake?: string
}): 'A' | 'B' | 'C'
```

## 📱 Mobile Optimization

- **9:16 Layout**: Perfect for TikTok/Meta vertical traffic
- **Large Tap Targets**: 44px minimum for accessibility
- **Safe Areas**: Respects device notches and home indicators
- **Fast Loading**: <2.5s LCP target
- **Offline Support**: localStorage for progress saving

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Drag & drop the `dist` folder
- **Netlify**: Connect your GitHub repo
- **AWS S3**: Upload `dist` contents to S3 bucket
- **Custom Server**: Serve `dist` folder with any web server

## 📈 Performance Targets

- **Bundle Size**: <200KB initial load
- **Lighthouse Score**: 90+ mobile
- **CLS**: Optimized for Cumulative Layout Shift
- **Image Compression**: Client-side to 1280px max

## 🔒 Security & Privacy

- **No Backend**: All data stays in browser
- **Local Storage**: Progress saved locally
- **No Data Collection**: Only analytics events sent
- **HTTPS Required**: For production deployment

## 📞 Support

For customization requests or questions:
1. Check the `README.md` for detailed documentation
2. Review `src/config/app.ts` for configuration options
3. Modify `src/data/services.json` for service changes

## 🎉 You're Ready!

Your funnel is optimized for:
- **TikTok Ads**: Vertical 9:16 layout
- **Meta Ads**: Facebook/Instagram traffic
- **High Conversion**: Minimal friction, clear CTAs
- **Lead Quality**: Automatic grading and routing
- **WhatsApp Integration**: Seamless handoff

Start driving traffic and watch the qualified leads flow into WhatsApp! 🚗✨
