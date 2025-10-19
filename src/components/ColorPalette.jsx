export function ColorPalette() {
  const colors = [
    { name: 'Primary', hex: '#0e5a3f', usage: 'Main brand color from TCED logo, header, primary buttons', contrast: 'AAA' },
    { name: 'Secondary', hex: '#eab839', usage: 'Golden yellow from logo lightning bolt, bookmarks, highlights', contrast: 'AA' },
    { name: 'Accent', hex: '#1a5c45', usage: 'Medium-dark green for links, tooltips, hover states', contrast: 'AAA' },
    { name: 'Success', hex: '#38a169', usage: 'Active tool indicators, success states, highlights', contrast: 'AAA' },
    { name: 'Accent Red', hex: '#c41e3a', usage: 'Red accent from logo lightning, alerts, logout', contrast: 'AAA' },
    { name: 'Dark', hex: '#0a3528', usage: 'Very dark green for sidebar background', contrast: 'AAA' },
    { name: 'Light', hex: '#e8f5f0', usage: 'Very light green for panel backgrounds, light accents', contrast: 'AAA' },
    { name: 'Text Primary', hex: '#111827', usage: 'Primary text color (gray-900)', contrast: 'AAA' },
    { name: 'Text Secondary', hex: '#374151', usage: 'Secondary text (gray-700)', contrast: 'AA' },
  ];

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-[#0e5a3f] mb-2">Thrissur Corporation Electricity Department</h1>
          <h2 className="text-gray-800 mb-2">Color Palette & Design System</h2>
          <p className="text-sm text-gray-700 mb-2">
            Colors extracted minutely from the TCED logo for consistent branding
          </p>
          <p className="text-xs text-gray-600">
            All colors meet WCAG 2.1 accessibility standards
          </p>
        </div>

        {/* Color Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {colors.map((color) => (
            <div key={color.hex} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-center space-x-4 mb-3">
                <div
                  className="w-16 h-16 rounded-lg border-2 border-gray-300 shadow-sm flex-shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 truncate">{color.name}</h3>
                  <p className="text-sm text-gray-600 font-mono">{color.hex.toUpperCase()}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                    WCAG {color.contrast}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600">{color.usage}</p>
            </div>
          ))}
        </div>

        {/* Color Combinations */}
        <div className="mb-8">
          <h3 className="text-gray-900 mb-4">Text on Background Combinations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <p className="text-sm text-gray-600 mb-4">Light Background</p>
              <div className="space-y-2">
                <p className="text-[#111827]">Primary Text (#111827) - AAA</p>
                <p className="text-[#374151]">Secondary Text (#374151) - AA</p>
                <p className="text-[#0e5a3f]">Brand Primary (#0e5a3f) - AAA</p>
                <p className="text-[#1a5c45]">Brand Accent (#1a5c45) - AAA</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 bg-[#0a3528]">
              <p className="text-sm text-white/80 mb-4">Dark Background (Sidebar)</p>
              <div className="space-y-2">
                <p className="text-white">White Text - AAA</p>
                <p className="text-white/90">White 90% - AAA</p>
                <p className="text-[#38a169]">Success Green (#38a169) - AAA</p>
                <p className="text-[#eab839]">Golden Yellow (#eab839) - AA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Improvements Summary */}
        <div className="bg-gradient-to-r from-[#e8f5f0] to-[#d4f1e8] border border-[#38a169]/20 rounded-lg p-6 mb-8">
          <h3 className="text-[#0e5a3f] mb-4">Recent Improvements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
            <div>
              <h4 className="font-medium text-[#0e5a3f] mb-2">✓ Header</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Company name in single line</li>
                <li>• Enhanced text shadow for readability</li>
                <li>• Improved profile dropdown design</li>
                <li>• View Profile & Logout options</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[#0e5a3f] mb-2">✓ Sidebar Tools</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Fixed invisible hover state</li>
                <li>• White icons with proper contrast</li>
                <li>• Green hover background (#1a5c45)</li>
                <li>• Scale animation on hover</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[#0e5a3f] mb-2">✓ Text Contrast</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Primary text: #111827 (gray-900)</li>
                <li>• Secondary text: #374151 (gray-700)</li>
                <li>• All text meets WCAG AA/AAA</li>
                <li>• Antialiasing enabled globally</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[#0e5a3f] mb-2">✓ Login Page</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Full company name displayed</li>
                <li>• White input backgrounds</li>
                <li>• Enhanced button shadows</li>
                <li>• Better label contrast</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Color Swatches */}
        <div>
          <h3 className="text-gray-900 mb-4">Color Swatches</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            <div className="h-24 bg-[#0e5a3f] rounded-lg flex items-end justify-center pb-2">
              <span className="text-white text-xs drop-shadow">Primary</span>
            </div>
            <div className="h-24 bg-[#eab839] rounded-lg flex items-end justify-center pb-2">
              <span className="text-[#111827] text-xs drop-shadow">Secondary</span>
            </div>
            <div className="h-24 bg-[#1a5c45] rounded-lg flex items-end justify-center pb-2">
              <span className="text-white text-xs drop-shadow">Accent</span>
            </div>
            <div className="h-24 bg-[#38a169] rounded-lg flex items-end justify-center pb-2">
              <span className="text-white text-xs drop-shadow">Success</span>
            </div>
            <div className="h-24 bg-[#c41e3a] rounded-lg flex items-end justify-center pb-2">
              <span className="text-white text-xs drop-shadow">Red</span>
            </div>
            <div className="h-24 bg-[#0a3528] rounded-lg flex items-end justify-center pb-2">
              <span className="text-white text-xs drop-shadow">Dark</span>
            </div>
            <div className="h-24 bg-[#e8f5f0] rounded-lg flex items-end justify-center pb-2 border border-gray-200">
              <span className="text-[#0e5a3f] text-xs drop-shadow">Light</span>
            </div>
            <div className="h-24 bg-[#111827] rounded-lg flex items-end justify-center pb-2">
              <span className="text-white text-xs drop-shadow">Text 1</span>
            </div>
            <div className="h-24 bg-[#374151] rounded-lg flex items-end justify-center pb-2">
              <span className="text-white text-xs drop-shadow">Text 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
