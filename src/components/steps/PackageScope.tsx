
import { motion } from 'framer-motion'
import { Chip } from '@/components/Chip'
import { Input } from '@/components/ui/input'
import servicesConfig from '@/data/services.json'

interface PackageScopeProps {
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

export function PackageScope({
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
}: PackageScopeProps) {
  const serviceConfig = servicesConfig.services[service as keyof typeof servicesConfig.services] as any

  const handleAddonToggle = (addonId: string) => {
    if (addons.includes(addonId)) {
      onAddonsChange(addons.filter(id => id !== addonId))
    } else {
      onAddonsChange([...addons, addonId])
    }
  }

  const handleNext = () => {
    // For wrapping services, require both package and finish
    if (service === 'wrapping') {
      if (!selectedPackage || !finish) {
        return // Don't proceed if requirements not met
      }
    }
    // For other services, allow proceeding
    onNext()
  }

  // Check if user can proceed to next step
  const canProceed = () => {
    if (service === 'wrapping') {
      return selectedPackage && finish
    }
    // For PPF and detailing, just require package selection
    return selectedPackage
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
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
              onClick={() => onPackageChange(pkg.id)}
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
                onClick={() => onFinishChange(finishOption.id)}
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
                onClick={() => onBrandChange(brandOption.id)}
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
        <div className="space-y-3">
          <label className="text-white font-medium">Color Idea (Optional)</label>
          <Input
            value={colorIdea}
            onChange={(e) => onColorIdeaChange(e.target.value)}
            placeholder="e.g., Matte black, Gloss red, Satin blue"
            className="bg-gray-800 border-gray-600 text-white"
          />
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex-1 bg-gray-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-600 transition-all"
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: canProceed() ? 1.02 : 1 }}
          whileTap={{ scale: canProceed() ? 0.98 : 1 }}
          onClick={handleNext}
          disabled={!canProceed()}
          className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
            canProceed()
              ? 'bg-primary text-white hover:bg-red-600'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  )
}
