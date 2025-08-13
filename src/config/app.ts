export const APP_CONFIG = {
  // WhatsApp Configuration
  whatsapp: {
    defaultCountryCode: '+971',
    businessName: 'Cars Studio',
    businessDescription: 'Premium car care services in UAE'
  },

  // Analytics Configuration
  analytics: {
    metaPixelId: 'YOUR_PIXEL_ID', // Replace with your Meta Pixel ID
    tiktokPixelId: 'YOUR_TIKTOK_PIXEL_ID', // Replace with your TikTok Pixel ID
    googleAnalyticsId: 'YOUR_GA_ID' // Replace with your Google Analytics ID
  },

  // Lead Grading Configuration
  leadGrading: {
    // Service weights
    serviceWeights: {
      'ppf_full_body': 5,
      'wrapping_full_wrap': 4,
      'ppf_front_track': 3,
      'detailing': 2
    },
    
    // Budget weights
    budgetWeights: {
      'not_sure': 1,
      'under_500': 0,
      '500_1k': 1,
      '1k_2k': 2,
      '2k_4k': 3,
      '4k_6k': 4,
      '6k_8k': 4,
      'over_4k': 4,
      'over_6k': 4,
      'over_8k': 4,
      'under_1k': 0,
      'under_2k': 0
    },
    
    // Timing weights
    timingWeights: {
      'asap': 3,
      'this_week': 2,
      'next_week': 1
    },
    
    // Car segment weights
    carSegmentWeights: {
      'luxury': 3,
      'mid': 2,
      'entry': 1
    },
    
    // Grade thresholds
    gradeThresholds: {
      'A': 10,
      'B': 7
    }
  },

  // UI Configuration
  ui: {
    maxPhotos: 3,
    maxPhotoSize: 1280, // pixels
    photoQuality: 0.7,
    animationDuration: 200, // milliseconds
    mobileBreakpoint: 768 // pixels
  },

  // Features
  features: {
    enablePhotoUpload: true,
    enableAutoSave: true,
    enableAnalytics: true,
    enableLeadGrading: true,
    enableUTMTracking: true
  }
}
