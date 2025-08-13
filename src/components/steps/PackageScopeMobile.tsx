import { Chip } from '@/components/Chip'
import { MobileStepWrapper } from '@/components/ui/mobile-step-wrapper'
import { MobileFriendlyTextInput } from '@/components/ui/mobile-friendly-text-input'
import { trackEvent } from '@/lib/utils'
import servicesConfig from '@/data/services.json'

interface PackageScopeMobileProps {
  service: string
  package: string
  finish: string
  brand: string
  addons: string[]
  colorIdea: string
  onPackageChange: (pkg: string) => void
  onFinishChange: (finish: string) => void
  onBrandChange: (brand: string) => void
  onAddonsChange: (addons: string[]) => void
  onColorIdeaChange: (color: string) => void
  onNext: () => void
  onBack: () => void
}

export function PackageScopeMobile({
  service,
  package: selectedPackage,
  finish,
  brand,
  addons,
  colorIdea,
  onPackageChange,
  onFinishChange,
  onBrandChange,
  onAddonsChange,
  onColorIdeaChange,
  onNext,
  onBack
}: PackageScopeMobileProps) {
  const serviceConfig = servicesConfig.services[service as keyof typeof servicesConfig.services] as any

  const handleAddonToggle = (addonId: string) => {
    if (addons.includes(addonId)) {
      onAddonsChange(addons.filter(id => id !== addonId))
    } else {
      onAddonsChange([...addons, addonId])
    }
    trackEvent('toggle_addon', { addon: addonId, service })
  }

  const handlePackageSelect = (pkgId: string) => {
    onPackageChange(pkgId)
    trackEvent('select_package', { package: pkgId, service })
  }

  const handleFinishSelect = (finishId: string) => {
    onFinishChange(finishId)
    trackEvent('select_finish', { finish: finishId, service })
  }

  const handleBrandSelect = (brandId: string) => {
    onBrandChange(brandId)
    trackEvent('select_brand', { brand: brandId, service })
  }

  const handleNext = () => {
    if (canProceed()) {
      onNext()
    }
  }

  // Check if user can proceed to next step
  const canProceed = () => {
    if (service === 'wrapping') {
      return selectedPackage && finish
    }
    // For PPF and detailing, just require package selection
    return selectedPackage
  }

  const getNextButtonText = () => {
    if (service === 'wrapping') {
      if (!selectedPackage) return 'Select a package to continue'
      if (!finish) return 'Select a finish to continue'
    } else {
      if (!selectedPackage) return 'Select a package to continue'
    }
    return 'Next'
  }

  return (
    <MobileStepWrapper
      onNext={handleNext}
      onBack={onBack}
      nextDisabled={!canProceed()}
      nextText={getNextButtonText()}
      showBackButton={true}
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Package & Scope</h2>
        <p className="text-gray-400">Select your preferred options</p>
      </div>

      {/* Package Selection */}
      <div className="space-y-3">
        <label className="text-white font-medium">Package</label>
        <div className="grid gap-3">
          {serviceConfig.packages.map((pkg: any) => (
            <Chip
              key={pkg.id}
              label={pkg.name}
              description={pkg.description}
              isSelected={selectedPackage === pkg.id}
              onClick={() => handlePackageSelect(pkg.id)}
            />
          ))}
        </div>
      </div>

      {/* Finish Selection (for wrapping) */}
      {service === 'wrapping' && serviceConfig.finishes && (
        <div className="space-y-3">
          <label className="text-white font-medium">Finish</label>
          <div className="grid gap-3">
            {serviceConfig.finishes.map((finishOption: any) => (
              <Chip
                key={finishOption.id}
                label={finishOption.name}
                description={finishOption.description}
                isSelected={finish === finishOption.id}
                onClick={() => handleFinishSelect(finishOption.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Brand Selection (for PPF) */}
      {service === 'ppf' && serviceConfig.brands && (
        <div className="space-y-3">
          <label className="text-white font-medium">Brand Preference</label>
          <div className="grid gap-3">
            {serviceConfig.brands.map((brandOption: any) => (
              <Chip
                key={brandOption.id}
                label={brandOption.name}
                description={brandOption.description}
                isSelected={brand === brandOption.id}
                onClick={() => handleBrandSelect(brandOption.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Add-ons (for detailing) */}
      {service === 'detailing' && serviceConfig.addons && (
        <div className="space-y-3">
          <label className="text-white font-medium">Additional Services</label>
          <div className="grid gap-3">
            {serviceConfig.addons.map((addon: any) => (
              <Chip
                key={addon.id}
                label={addon.name}
                description={addon.description}
                isSelected={addons.includes(addon.id)}
                onClick={() => handleAddonToggle(addon.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Color Idea (for wrapping) */}
      {service === 'wrapping' && (
        <MobileFriendlyTextInput
          value={colorIdea}
          onChange={onColorIdeaChange}
          placeholder="e.g., Matte black, Gloss red, Satin blue"
          label="Color Idea (Optional)"
          className="bg-gray-800 border-gray-600 text-white"
        />
      )}
    </MobileStepWrapper>
  )
}
