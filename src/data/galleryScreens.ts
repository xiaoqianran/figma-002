// Auto-derived from Figma "Yeki - VPN App UI KIT" • "🎉 User Interface" page
// 54 high-fidelity screens. Categories inferred intelligently from Figma naming.

export interface GalleryScreen {
  id: string // Figma node ID
  name: string // Full Figma name e.g. "31 - Speedtest - Off"
  title: string // Clean title without number prefix
  category: string
  // Which Prototype Lab view (if any) this maps to for "Open in Lab" — powers smart navigation
  labView?: 'connected' | 'speedtest' | 'servers' | 'profile' | 'stats' | 'subscription' | 'edit-profile' | 'change-password' | 'logout' | 'stats-empty'
  // Whether we have a fully interactive React implementation
  implemented: boolean
}

function cleanTitle(fullName: string): string {
  return fullName.replace(/^\d+\s*-\s*/, '').trim()
}

function inferCategory(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('splash') || n.includes('onboarding')) return 'Onboarding'
  if (n.includes('login') || n.includes('sign up') || n.includes('forgot password') || n.includes('verification') || n.includes('reset password') || n.includes('password created')) return 'Authentication'
  if (n.includes('home') || n.includes('connected') || n.includes('connecting') || n.includes('not connected')) return 'Home'
  if (n.includes('server list')) return 'Servers'
  if (n.includes('speedtest')) return 'Speedtest'
  if (n.includes('statistics')) return 'Statistics'
  if (n.includes('profile') && !n.includes('edit') && !n.includes('confirmation')) return 'Profile'
  if (n.includes('pro ') || n.includes('plan') || n.includes('my active')) return 'Billing'
  if (n.includes('payment')) return 'Payments'
  if (n.includes('edit profile') || n.includes('change password') || n.includes('confirmation') || n.includes('logout') || n.includes('details changed')) return 'Account'
  return 'Other'
}

function getLabView(name: string): GalleryScreen['labView'] | undefined {
  const n = name.toLowerCase()
  // Precise mappings for smart "Open in Lab" pre-selection (order matters: specific first)
  if (n.includes('edit profile') || n.includes('edit-profile')) return 'edit-profile'
  if (n.includes('change password') || n.includes('change-password')) return 'change-password'
  if (n.includes('logout')) return 'logout'
  if (n.includes('statistics') && (n.includes('empty') || n.includes('34'))) return 'stats-empty'
  if (n.includes('statistics')) return 'stats'
  if (n.includes('speedtest')) return 'speedtest'
  if (n.includes('server list')) return 'servers'
  if (n.includes('profile')) return 'profile'
  if (n.includes('pro ') || n.includes('plan') || n.includes('subscription') || n.includes('payment') || n.includes('active')) return 'subscription'
  if (n.includes('home') || n.includes('connected') || n.includes('connecting') || n.includes('not connected')) return 'connected'
  return undefined
}

function isImplemented(name: string): boolean {
  const n = name.toLowerCase()
  // Core flows currently have rich interactive implementations (Batch 4 additions: logout + empty states)
  return (
    n.includes('speedtest') ||
    n.includes('server list') ||
    n.includes('statistics') ||
    n.includes('profile') ||
    n.includes('pro ') ||
    n.includes('plan') ||
    n.includes('payment') ||
    n.includes('home') ||
    n.includes('connected') ||
    n.includes('connecting') ||
    n.includes('logout')
  )
}

const rawScreens = [
  { id: '9:96', name: '01 - Splash With Dark Background' },
  { id: '9:263', name: '02 - Splash With Light Background' },
  { id: '9:295', name: '03 - Onboarding 1' },
  { id: '9:461', name: '04 - Onboarding 2' },
  { id: '9:500', name: '05 - Onboarding 3' },
  { id: '9:543', name: '06 - Sign Up Empty' },
  { id: '11:377', name: '07 - Sign Up Filled' },
  { id: '11:494', name: '08 - Sign Up Done' },
  { id: '15:996', name: '09 - Login Empty' },
  { id: '15:1072', name: '10 - Login Filled' },
  { id: '15:1141', name: '11 - Login Failed' },
  { id: '12:445', name: '12 - Forgot Password Empty' },
  { id: '12:552', name: '13 - Forgot Password Filled' },
  { id: '12:599', name: '14 - Forgot Password Code Sent' },
  { id: '12:668', name: '15 - Verification Empty' },
  { id: '12:719', name: '16 - Verification Filled' },
  { id: '12:822', name: '17 - Reset Password Empty' },
  { id: '12:899', name: '18 - Reset Password Filled' },
  { id: '12:966', name: '19 - Password Created' },
  { id: '16:1504', name: '20 - Home, Not Connected, Not Choose Server' },
  { id: '19:786', name: '21 - Home, Not Connected, Japan Server' },
  { id: '19:1106', name: '22 - Home, Not Connected, Not Choose Server Pro' },
  { id: '19:1132', name: '23 - Home, Not Connected, Japan Server Pro' },
  { id: '19:1305', name: '24 - Home, Connecting, Singapore Server' },
  { id: '19:1546', name: '25 - Home, Connecting, Japan Server Pro' },
  { id: '21:1689', name: '26 - Home, Connected, Singapore Server' },
  { id: '21:1715', name: '27 - Home, Connected, Japan Server Pro' },
  { id: '22:2218', name: '28 - Server List Screen, Search Inactive' },
  { id: '22:2704', name: '29 - Server List Screen, Search Active' },
  { id: '22:3425', name: '30 - Server List Screen, Search Active, But Empty' },
  { id: '24:1574', name: '31 - Speedtest - Off' },
  { id: '24:2084', name: '32 - Speedtest - On Progress' },
  { id: '24:2217', name: '33 - Speedtest - Done' },
  { id: '27:2748', name: '34 - Statistics - Empty' },
  { id: '24:2574', name: '35 - Statistics - Filled' },
  { id: '38:3005', name: '36 - Profile Without Photo' },
  { id: '38:3288', name: '37 - Profile With Photo' },
  { id: '38:3402', name: '38 - Profile With Photo, Pro' },
  { id: '38:3521', name: '39 - Pro Details' },
  { id: '38:3787', name: '40 - Pro Monthly Details' },
  { id: '38:3958', name: '41 - Pro Yearly Details' },
  { id: '38:4038', name: '42 - Choose Payment Method' },
  { id: '38:4188', name: '43 - Payment Success' },
  { id: '38:4309', name: '44 - Payment Failed' },
  { id: '38:4348', name: '45 - My Active Monthly Plan' },
  { id: '38:4615', name: '46 - My Active Yearly Plan' },
  { id: '38:4736', name: '47 - Confirmation Cancel' },
  { id: '45:2239', name: '48 - Edit Profile' },
  { id: '45:2435', name: '49 - Confirmation for Edit Profile' },
  { id: '46:2473', name: '50 - Profile Details Changed' },
  { id: '46:2642', name: '51 - Change Password Empty' },
  { id: '46:2747', name: '52 - Change Password Empty' },
  { id: '46:2540', name: '53 - Password Created' },
  { id: '46:2884', name: '54 - Logout Confirmation' },
]

export const galleryScreens: GalleryScreen[] = rawScreens.map((s) => ({
  id: s.id,
  name: s.name,
  title: cleanTitle(s.name),
  category: inferCategory(s.name),
  labView: getLabView(s.name),
  implemented: isImplemented(s.name),
}))

// Unique sorted categories for filters
export const allCategories = Array.from(
  new Set(galleryScreens.map((s) => s.category))
).sort()

// Quick lookup helpers
export function getScreenById(id: string) {
  return galleryScreens.find((s) => s.id === id)
}

export function getImplementedScreens() {
  return galleryScreens.filter((s) => s.implemented)
}

// Human-friendly labels for Lab views (used in CTAs and feedback banners)
export const labViewLabel: Record<NonNullable<GalleryScreen['labView']>, string> = {
  'connected': 'Main Interface',
  'speedtest': 'Speedtest Flow',
  'servers': 'Server List',
  'profile': 'Profile',
  'stats': 'Statistics',
  'subscription': 'Pro Subscription',
  'edit-profile': 'Edit Profile',
  'change-password': 'Change Password',
  'logout': 'Logout Confirmation',
  'stats-empty': 'Statistics (Empty)',
}

// Optional: get screens that map to the same Lab view (for suggested flows / related)
export function getRelatedScreensForLabView(labView: GalleryScreen['labView'], excludeId?: string): GalleryScreen[] {
  if (!labView) return []
  return galleryScreens.filter(s => s.labView === labView && s.id !== excludeId).slice(0, 4)
}
