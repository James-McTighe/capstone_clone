import React, { useState } from 'react';

// Structured Help Content
const INSTRUCTION_SLIDES = [
  {
    id: 'data-upload',
    title: '🧪 Data Upload',
    subHeader: 'Configure reactions and visualize reaction plates',
    type: 'list',
    items: [
      'Determine if the HPLC datafile is Chemstation data or processed data.',
      'Upload the Experiment Conditions (Download and fill out template as needed).',
      'Upload the HPLC datafile.',
      'If desired, visualize plates and color wells by Reaction Conditions.',
      'Save setup before proceeding to the rate Information and plotting page.'
    ]
  },
  {
    id: 'kinetics-ratio',
    title: '📈 Kinetics & Analyte Ratio',
    subHeader: 'Visualize Peak Area vs. Time & Analyte Ratio vs. Time',
    type: 'sections',
    sections: [
      {
        heading: 'Kinetics Plot',
        items: [
          'Select reactions to plot',
          'Select time units (days, hours, minutes, seconds)',
          'Select analytes to plot',
          'Color plot by reactant or reaction',
          'Choose plot type (scatter or line). Determine if plots should be generated for each reaction. Reactions can optionally be set to display as separate plots.'
        ]
      },
      {
        heading: 'Analyte Ratio Plot',
        items: [
          'Choose plot type (scatter or line)',
          'Choose a numerator & denominator'
        ]
      }
    ]
  },
  {
    id: 'initial-rate',
    title: '📈 Initial Rate & Plotting',
    subHeader: 'Generate rate summary tables & exponential fit plots',
    type: 'list',
    items: [
      'Enter a value for rate constant (k)',
      '(optional) Manually select growth/decay profile per analyte',
      'View rate summary tables for chosen reactions & analytes.',
      'Select which analytes to fit for each reaction.',
      'Add/Delete plots for export report',
      'Export report and download processed data file.'
    ]
  },
  {
    id: 'utilities',
    title: '⚙️ Utilities',
    subHeader: 'Common mathematical calculations performed in a laboratory setting.',
    type: 'nested',
    sections: [
      {
        heading: 'Concentration Calculations',
        subItems: [
          'Mass from Volume and Concentration',
          'Volume from Mass and Concentration',
          'Concentration from Mass & Volume'
        ]
      },
      { heading: 'Dilutions', subItems: [] },
      { heading: 'Enantiomeric / Diastereomeric Excess', subItems: [] }
    ]
  }
];

function HelpModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === INSTRUCTION_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? INSTRUCTION_SLIDES.length - 1 : prev - 1));
  };

  const slide = INSTRUCTION_SLIDES[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm antialiased">
      {/* Modal Container */}
      <div className="relative flex flex-col w-full max-w-2xl bg-white border shadow-2xl rounded-2xl border-slate-200 max-h-[85vh] overflow-hidden">
        
        {/* Header Banner */}
        <header className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <div>
            <div className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
              Application Documentation
            </div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">
              User Instructions
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Carousel Content Frame */}
        <main className="flex-1 px-8 py-6 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {slide.title}
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-1">
              {slide.subHeader}
            </p>
          </div>

          <hr className="border-slate-100 my-4" />

          {/* Dynamic Content Renderer */}
          <div className="space-y-4 min-h-[240px]">
            {/* Render Model A: Standard Ordered Steps List */}
            {slide.type === 'list' && (
              <ol className="space-y-2.5">
                {slide.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                    <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-indigo-600 rounded-full bg-indigo-50 shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            )}

            {/* Render Model B: Multi-Section Lists */}
            {slide.type === 'sections' && (
              <div className="space-y-6">
                {slide.sections.map((sect, sIdx) => (
                  <div key={sIdx}>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                      {sect.heading}
                    </h4>
                    <ol className="space-y-2">
                      {sect.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                          <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-indigo-600 rounded-full bg-indigo-50 shrink-0 mt-0.5">
                            {itemIdx + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            )}

            {/* Render Model C: Nested Feature Lists */}
            {slide.type === 'nested' && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Solves For:
                </h4>
                <ul className="space-y-3">
                  {slide.sections.map((sect, sIdx) => (
                    <li key={sIdx} className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {sect.heading}
                      </div>
                      {sect.subItems.length > 0 && (
                        <ul className="mt-2 ml-3.5 space-y-1.5 border-l border-slate-200 pl-3">
                          {sect.subItems.map((sub, subIdx) => (
                            <li key={subIdx} className="text-xs text-slate-500 flex items-center gap-1.5">
                              <span className="text-slate-300">—</span> {sub}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>

        {/* Carousel Control Toolbar Footer */}
        <footer className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={prevSlide}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Quick Nav Progress Dots */}
          <div className="flex items-center gap-2">
            {INSTRUCTION_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </footer>

      </div>
    </div>
  );
}

export default HelpModal;
