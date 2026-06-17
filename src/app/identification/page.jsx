
"use client";

import { useState } from 'react';

// --- SKIN DATABASE ---
const skinDatabase = [
    { 
        id: "p01",
        name: "Fungal Acne",
        category: "Bumps & Acne",
        tags: ["small uniform bumps", "forehead", "itchy"],
        why: "Scientifically known as Pityrosporum Folliculitis. It is caused by an overgrowth of yeast inside the hair follicles.",
        solution: "Use an antifungal wash containing Ketoconazole. Keep the area dry and switch to oil-free hydrators.",
        avoid: "Avoid face oils, fatty acids (Polysorbates), and heavy makeup.",
        product: "Ketoconazole 2% Wash, Salicylic Acid (BHA)"
    },
    { 
        id: "p02",
        name: "Melasma",
        category: "Pigmentation",
        tags: ["patchy brown spots", "cheeks", "no sensation"],
        why: "A pigmentary disorder caused by overactive melanocytes, triggered by UV exposure and hormonal fluctuations.",
        solution: "Daily SPF 50+ protection is vital. Use tyrosinase inhibitors like Alpha Arbutin.",
        avoid: "Avoid direct sunlight and harsh physical scrubs.",
        product: "Alpha Arbutin, Tranexamic Acid, Tinted Mineral Sunscreen"
    },
    { 
        id: "p03",
        name: "Rosacea",
        category: "Redness & Rash",
        tags: ["diffuse redness", "tiny red vessels", "burning"],
        why: "A chronic inflammatory condition that makes the face turn red and may produce small bumps.",
        solution: "Identify triggers. Use soothing ingredients like Azelaic acid and Centella Asiatica.",
        avoid: "Avoid fragrance, alcohol-based toners, and extreme heat.",
        product: "Azelaic Acid, Centella Serum, Soothing Cream"
    },
    { 
        id: "p04",
        name: "Enlarged Pores",
        category: "Texture",
        tags: ["large visible pores", "cheeks", "no sensation"],
        why: "Caused by excess oil production or loss of skin elasticity over time.",
        solution: "Use Niacinamide to regulate oil and Retinoids to improve skin firmness.",
        avoid: "Avoid heavy, pore-clogging (comedogenic) creams.",
        product: "Niacinamide 10%, Salicylic Acid (BHA), Retinol"
    },
    { 
        id: "p05",
        name: "Rough Texture",
        category: "Texture",
        tags: ["rough sandpaper feel", "forehead", "dryness"],
        why: "Accumulation of dead skin cells and lack of moisture leads to an uneven surface.",
        solution: "Regular chemical exfoliation with AHAs and deep hydration.",
        avoid: "Avoid harsh physical scrubs.",
        product: "Lactic Acid 10%, Hyaluronic Acid, Ceramide Cream"
    }
];

const categoryDetails = {
    "Bumps & Acne": {
        appearance: ["small uniform bumps", "hard white bumps", "large painful bumps"],
        sensations: ["no sensation", "itchy", "painful"]
    },
    "Pigmentation": {
        appearance: ["patchy brown spots", "small dark freckles", "post-acne red marks"],
        sensations: ["no sensation", "stinging"]
    },
    "Redness & Rash": {
        appearance: ["diffuse redness", "tiny red vessels", "scaly red patches"],
        sensations: ["burning", "itchy", "hot"]
    },
    "Texture": {
        appearance: ["rough sandpaper feel", "large visible pores", "uneven skin tone"],
        sensations: ["dryness", "tightness", "no sensation"]
    }
};

export default function ClinicalDiagnosisUI() {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [userInput, setUserInput] = useState({ appearance: "", location: "forehead", sensation: "" });
    const [finalResult, setFinalResult] = useState(null);

    const handleIdentification = () => {
        let bestMatch = null;
        let highestScore = -1;

        skinDatabase.forEach(item => {
            let score = 0;
            if (item.category === selectedCategory) score += 5; 
            if (item.tags.includes(userInput.appearance)) score += 10; 
            if (item.tags.includes(userInput.location)) score += 2;
            if (item.tags.includes(userInput.sensation)) score += 2;

            if (score > highestScore) {
                highestScore = score;
                bestMatch = item;
            }
        });

        setFinalResult(bestMatch);
        setStep(3);
    };

    return (
        // <div className="min-h-screen bg-[#020d0a] text-emerald-100/70 py-20 px-6 font-sans antialiased selection:bg-emerald-500/30">
        //     <div className="max-w-4xl mx-auto">
                
        //         {/* --- HEADER --- */}
        //         <div className="text-center mb-16">
        //             <span className="text-[10px] font-black tracking-[0.4em] uppercase text-emerald-400 bg-emerald-500/10 px-5 py-2 rounded-full border border-emerald-500/20 shadow-sm">
        //                 AI Diagnostic Intelligence
        //             </span>
        //             <h1 className="text-6xl md:text-8xl font-black tracking-tighter mt-8 uppercase leading-[0.8] text-white">
        //                 Skin <br/>
        //                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">Identifier</span>
        //             </h1>
        //         </div>

        //         {/* --- STEP 1: CATEGORY --- */}
        //         {step === 1 && (
        //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
        //                 {Object.keys(categoryDetails).map(cat => (
        //                     <button key={cat} onClick={() => { setSelectedCategory(cat); setStep(2); }} 
        //                         className="p-10 bg-emerald-950/20 border border-emerald-900/30 rounded-[2.5rem] text-left hover:border-emerald-500/50 hover:bg-emerald-900/40 transition-all duration-300 group shadow-xl backdrop-blur-sm">
        //                         <h3 className="text-2xl font-black group-hover:text-emerald-400 uppercase tracking-tighter text-emerald-50">{cat}</h3>
        //                         <p className="text-[10px] opacity-40 mt-3 font-bold uppercase tracking-widest">Select Category</p>
        //                     </button>
        //                 ))}
        //             </div>
        //         )}

        //         {/* --- STEP 2: ASSESSMENT --- */}
        //         {step === 2 && (
        //             <div className="bg-[#051612] border border-emerald-900/50 p-10 rounded-[3rem] shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-500">
        //                 <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase text-emerald-700 mb-8 hover:text-emerald-400 transition-colors tracking-widest">← Back</button>
        //                 <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase text-white">Assessment: <span className="text-emerald-400 italic">{selectedCategory}</span></h2>
                        
        //                 <div className="space-y-8">
        //                     <div className="space-y-4">
        //                         <label className="text-[10px] font-black uppercase tracking-widest text-emerald-700 block ml-1">Visual Observation</label>
        //                         <select onChange={(e)=>setUserInput({...userInput, appearance: e.target.value})} className="w-full p-5 bg-[#020d0a] border border-emerald-900/50 rounded-2xl font-bold text-lg text-emerald-100 outline-none focus:ring-2 focus:ring-emerald-600 appearance-none cursor-pointer transition-all">
        //                             <option value="" className="bg-emerald-950">Select visual match...</option>
        //                             {categoryDetails[selectedCategory].appearance.map(opt => <option key={opt} value={opt} className="bg-emerald-950">{opt}</option>)}
        //                         </select>
        //                     </div>

        //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        //                         <div className="space-y-4">
        //                             <label className="text-[10px] font-black uppercase tracking-widest text-emerald-700 block ml-1">Location</label>
        //                             <select onChange={(e)=>setUserInput({...userInput, location: e.target.value})} className="w-full p-5 bg-[#020d0a] border border-emerald-900/50 rounded-2xl font-bold text-emerald-100 outline-none focus:ring-2 focus:ring-emerald-600 appearance-none cursor-pointer">
        //                                 <option value="forehead" className="bg-emerald-950">Forehead</option>
        //                                 <option value="cheeks" className="bg-emerald-950">Cheeks</option>
        //                                 <option value="jawline" className="bg-emerald-950">Jawline</option>
        //                                 <option value="under eyes" className="bg-emerald-950">Under Eyes</option>
        //                             </select>
        //                         </div>
        //                         <div className="space-y-4">
        //                             <label className="text-[10px] font-black uppercase tracking-widest text-emerald-700 block ml-1">Sensation</label>
        //                             <select onChange={(e)=>setUserInput({...userInput, sensation: e.target.value})} className="w-full p-5 bg-[#020d0a] border border-emerald-900/50 rounded-2xl font-bold text-emerald-100 outline-none focus:ring-2 focus:ring-emerald-600 appearance-none cursor-pointer">
        //                                 <option value="" className="bg-emerald-950">Select sensation...</option>
        //                                 {categoryDetails[selectedCategory].sensations.map(opt => <option key={opt} value={opt} className="bg-emerald-950">{opt}</option>)}
        //                             </select>
        //                         </div>
        //                     </div>

        //                     <button onClick={handleIdentification} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-lg shadow-emerald-950/40 transition-all active:scale-[0.98]">Analyze Profile</button>
        //                 </div>
        //             </div>
        //         )}

        //         {/* --- STEP 3: RESULT --- */}
        //         {step === 3 && finalResult ? (
        //             <div className="bg-[#051612] border border-emerald-900/50 rounded-[3.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
        //                 <div className="p-12 bg-emerald-600 text-white text-center shadow-inner relative overflow-hidden">
        //                     {/* Decorative glow */}
        //                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
        //                     <span className="text-[11px] font-black uppercase tracking-[0.4em] opacity-80 mb-4 block relative z-10">Diagnostic Result</span>
        //                     <h2 className="text-5xl font-black tracking-tighter uppercase relative z-10">{finalResult.name}</h2>
        //                 </div>

        //                 <div className="p-10 space-y-10">
        //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        //                         <div>
        //                             <h4 className="text-[11px] font-black text-emerald-500 uppercase tracking-widest border-b border-emerald-900/50 pb-2 mb-4">Clinical Why</h4>
        //                             <p className="text-sm text-emerald-100/60 leading-relaxed">{finalResult.why}</p>
        //                         </div>
        //                         <div>
        //                             <h4 className="text-[11px] font-black text-teal-400 uppercase tracking-widest border-b border-emerald-900/50 pb-2 mb-4">Treatment Protocol</h4>
        //                             <p className="text-sm text-emerald-100/60 leading-relaxed">{finalResult.solution}</p>
        //                         </div>
        //                     </div>

        //                     <div className="p-8 bg-amber-500/5 border border-amber-500/10 rounded-3xl">
        //                         <h4 className="text-[11px] font-black text-amber-500 uppercase mb-2 tracking-widest">⚠️ Avoidance List</h4>
        //                         <p className="text-sm font-bold text-amber-200/60 italic leading-relaxed">{finalResult.avoid}</p>
        //                     </div>

        //                     <div className="p-10 bg-[#020d0a] rounded-[2.5rem] text-center border border-emerald-900/50 group hover:border-emerald-500/50 transition-colors">
        //                         <h4 className="text-[10px] font-black text-emerald-800 uppercase mb-4 tracking-[0.3em] group-hover:text-emerald-500 transition-colors">Recommended Actives</h4>
        //                         <p className="text-2xl font-black uppercase text-emerald-50">{finalResult.product}</p>
        //                     </div>

        //                     <button onClick={()=>setStep(1)} className="w-full py-6 border border-emerald-900/50 rounded-2xl font-black text-[11px] text-emerald-800 hover:text-emerald-100 hover:bg-emerald-950 uppercase tracking-widest transition-all">New Assessment</button>
        //                 </div>
        //             </div>
        //         ) : step === 3 && (
        //             <div className="text-center p-20 bg-emerald-950/10 rounded-[3rem] border border-emerald-900/30 border-dashed">
        //                  <h3 className="text-xl font-bold text-emerald-900 uppercase tracking-tighter">No Exact Match Found</h3>
        //                  <button onClick={()=>setStep(1)} className="mt-6 text-emerald-500 font-black uppercase text-[10px] tracking-widest border-b border-emerald-500/30 hover:border-emerald-500 transition-all">Restart Session</button>
        //             </div>
        //         )}
        //     </div>
        // </div>
        <div className="min-h-screen bg-[#051612] text-slate-200/80 py-20 px-6 font-sans antialiased selection:bg-[#14B8A6]/30">
            <div className="max-w-4xl mx-auto">
                
                {/* --- HEADER --- */}
                <div className="text-center mb-16">
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#14B8A6] bg-[#14B8A6]/10 px-6 py-2.5 rounded-full border border-[#14B8A6]/20 shadow-[0_0_20px_rgba(20,184,166,0.1)]">
                        AI Diagnostic Intelligence
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mt-8 uppercase leading-[0.8] text-white">
                        Skin <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-emerald-300 italic">Identifier</span>
                    </h1>
                </div>

                {/* --- STEP 1: CATEGORY --- */}
                {step === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-500">
                        {Object.keys(categoryDetails).map(cat => (
                            <button key={cat} onClick={() => { setSelectedCategory(cat); setStep(2); }} 
                                className="p-10 bg-white/[0.03] border border-white/10 rounded-[2.5rem] text-left hover:border-[#14B8A6]/50 hover:bg-[#14B8A6]/5 transition-all duration-500 group backdrop-blur-xl relative overflow-hidden">
                                {/* Hover Glow Effect */}
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#14B8A6]/10 rounded-full blur-3xl group-hover:bg-[#14B8A6]/20 transition-all"></div>
                                
                                <h3 className="text-2xl font-black group-hover:text-[#14B8A6] uppercase tracking-tighter text-white transition-colors">{cat}</h3>
                                <p className="text-[10px] text-slate-500 mt-3 font-bold uppercase tracking-[0.2em] group-hover:text-slate-300 transition-colors">Select Category</p>
                            </button>
                        ))}
                    </div>
                )}

                {/* --- STEP 2: ASSESSMENT --- */}
                {step === 2 && (
                    <div className="bg-white/[0.02] border border-white/10 p-10 rounded-[3rem] shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-8 duration-700">
                        <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase text-slate-500 mb-8 hover:text-[#14B8A6] transition-colors tracking-widest flex items-center gap-2">
                           <span className="text-lg">←</span> Back to selection
                        </button>
                        <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase text-white">Assessment: <span className="text-[#14B8A6] italic">{selectedCategory}</span></h2>
                        
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block ml-1">Visual Observation</label>
                                <select onChange={(e)=>setUserInput({...userInput, appearance: e.target.value})} className="w-full p-6 bg-[#083336]/30 border border-white/5 rounded-2xl font-bold text-lg text-white outline-none focus:ring-2 focus:ring-[#14B8A6]/50 appearance-none cursor-pointer transition-all hover:bg-[#083336]/50">
                                    <option value="" className="bg-[#051612]">Select visual match...</option>
                                    {categoryDetails[selectedCategory].appearance.map(opt => <option key={opt} value={opt} className="bg-[#051612]">{opt}</option>)}
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block ml-1">Location</label>
                                    <select onChange={(e)=>setUserInput({...userInput, location: e.target.value})} className="w-full p-5 bg-[#083336]/30 border border-white/5 rounded-2xl font-bold text-white outline-none focus:ring-2 focus:ring-[#14B8A6]/50 appearance-none cursor-pointer">
                                        <option value="forehead" className="bg-[#051612]">Forehead</option>
                                        <option value="cheeks" className="bg-[#051612]">Cheeks</option>
                                        <option value="jawline" className="bg-[#051612]">Jawline</option>
                                        <option value="under eyes" className="bg-[#051612]">Under Eyes</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block ml-1">Sensation</label>
                                    <select onChange={(e)=>setUserInput({...userInput, sensation: e.target.value})} className="w-full p-5 bg-[#083336]/30 border border-white/5 rounded-2xl font-bold text-white outline-none focus:ring-2 focus:ring-[#14B8A6]/50 appearance-none cursor-pointer">
                                        <option value="" className="bg-[#051612]">Select sensation...</option>
                                        {categoryDetails[selectedCategory].sensations.map(opt => <option key={opt} value={opt} className="bg-[#051612]">{opt}</option>)}
                                    </select>
                                </div>
                            </div>

                            <button onClick={handleIdentification} className="w-full bg-[#14B8A6] hover:bg-[#119e8e] text-white py-6 rounded-2xl font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(20,184,166,0.2)] transition-all active:scale-[0.98] mt-4">
                                Analyze Profile
                            </button>
                        </div>
                    </div>
                )}

                {/* --- STEP 3: RESULT --- */}
                {step === 3 && finalResult && (
                    <div className="bg-white/[0.02] border border-white/10 rounded-[3.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-700">
                        <div className="p-14 bg-[#14B8A6] text-white text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent"></div>
                            <span className="text-[11px] font-black uppercase tracking-[0.5em] opacity-70 mb-4 block relative z-10">Diagnostic Result</span>
                            <h2 className="text-6xl font-black tracking-tighter uppercase relative z-10 leading-none">{finalResult.name}</h2>
                        </div>

                        <div className="p-12 space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <h4 className="text-[11px] font-black text-[#14B8A6] uppercase tracking-widest border-b border-white/5 pb-2 mb-4">Clinical Why</h4>
                                    <p className="text-base text-slate-300/80 leading-relaxed font-medium">{finalResult.why}</p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[11px] font-black text-[#14B8A6] uppercase tracking-widest border-b border-white/5 pb-2 mb-4">Treatment Protocol</h4>
                                    <p className="text-base text-slate-300/80 leading-relaxed font-medium">{finalResult.solution}</p>
                                </div>
                            </div>

                            <div className="p-8 bg-rose-500/5 border border-rose-500/10 rounded-3xl">
                                <h4 className="text-[11px] font-black text-rose-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                                    ⚠️ Avoidance List
                                </h4>
                                <p className="text-sm font-bold text-rose-200/60 italic leading-relaxed">{finalResult.avoid}</p>
                            </div>

                            <div className="p-10 bg-[#083336]/40 rounded-[2.5rem] text-center border border-white/5 group hover:border-[#14B8A6]/30 transition-all">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-[0.4em] group-hover:text-[#14B8A6] transition-colors">Recommended Actives</h4>
                                <p className="text-3xl font-black uppercase text-white drop-shadow-sm">{finalResult.product}</p>
                            </div>

                            <button onClick={()=>setStep(1)} className="w-full py-6 border border-white/5 rounded-2xl font-black text-[11px] text-slate-500 hover:text-white hover:bg-white/5 uppercase tracking-widest transition-all">
                                New Assessment
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}