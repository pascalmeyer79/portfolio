// Utility function to calculate border radius based on project type and image size
export const getBorderRadius = (
  slug: string,
  gridCols: number = 1,
  isAppScreen: boolean = false
): number => {
  // Base sizes for different project types
  // Desktop screens (Tenzir, Porsche): 16px at 1760px (1 column)
  // App screens (Tenzir, Vario): 24px at 896px height
  // Photos (VW): 12px at 1760px (1 column)
  
  let baseRadius: number;
  let maxSize: number;
  
  // App screens: Vario always uses 24px, or if isAppScreen is explicitly true
  if (isAppScreen || slug === 'vario') {
    // App screens: 24px at 896px height
    baseRadius = 24;
    maxSize = 896;
  } else if (slug === 'vw') {
    // VW photos: 12px at 1760px
    baseRadius = 12;
    maxSize = 1760;
  } else {
    // Desktop screens (Tenzir, Porsche): 16px at 1760px
    baseRadius = 16;
    maxSize = 1760;
  }
  
  // Calculate based on grid columns (1 column = full width, 2 columns = half, 3 columns = third)
  const effectiveWidth = maxSize / gridCols;
  const scale = effectiveWidth / maxSize;
  const borderRadius = baseRadius * scale;
  
  // Minimum border radius
  return Math.max(borderRadius, 6);
};

// Check if an image should be excluded from border radius calculation (portraits, logos)
export const shouldExcludeFromBorderRadius = (imagePath: string): boolean => {
  // Exclude portraits
  if (imagePath.includes('pascalmeyer')) {
    return true;
  }
  
  // Exclude logos
  if (imagePath.includes('Logo_') || imagePath.includes('logo_') || imagePath.includes('/references/')) {
    return true;
  }
  
  return false;
};
