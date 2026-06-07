import React from 'react';

function Home() {
  const features = [
    "Generating plate layouts from reaction conditions",
    "Graphing Peak Area over Time",
    "Graphing Analyte Ratio over Time",
    "Calculating initial rates",
    "Graphing exponential fit of reactions",
    "Downloading plots as PNGs",
    "Downloading report summaries as PDFs",
    "Downloading processed data as Excel files",
    "Solving common laboratory calculations"
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 py-16 px-6 text-center border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-950/60 rounded-full border border-indigo-800/50 mb-4">
            Analytics Platform
          </div>
          <div className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Kinetics Visualization App
          </div>
          <div className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto font-normal">
            Upload raw data, visualize real-time reaction plots, and automate initial rate calculations.
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              About the Software
            </h3>
            <p className="mt-2 text-base text-slate-600 leading-relaxed">
              This application is engineered to streamline and automate the process of visualizing 
              and analyzing kinetic data derived from High-Performance Liquid Chromatography (HPLC) experiments.
            </p>
          </div>

          <hr className="border-slate-100 my-6" />

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Supported Features & Capabilities
            </h4>
            
            {/* Feature Grid */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-start space-x-3 bg-slate-50/70 hover:bg-slate-50 p-3 rounded-xl border border-slate-100 transition-colors"
                >
                  <svg 
                    className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                  <span className="text-sm font-medium text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
