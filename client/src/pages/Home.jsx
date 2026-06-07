import React from 'react';
import { useState } from 'react';
import { BookOpen, Check } from 'lucide-react';
import LinkButton from '../components/Buttons/LinkButton';

import HelpModal from '../components/HowToUse';

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  function InstructionsButton() {
    return (
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 
        text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-800 
        rounded-xl shadow-sm 
        hover:bg-slate-850 hover:text-white transition-all hover:border-slate-700"
      >
        <BookOpen className='w-4 h-4 text-indigo-400' />
        View Run Instructions
      </button>
    )
  }

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
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              About the application
            </h3>
            <InstructionsButton />
            {/* <div className='flex gap-4 m-4'> */}
            {/*   <LinkButton label='one' /> */}
            {/* </div> */}
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
                  <Check
                    className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5"
                  />

                  <span className="text-sm font-medium text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <HelpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}

export default Home;
