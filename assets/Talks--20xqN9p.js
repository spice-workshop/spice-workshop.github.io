import{c as n,a as r,j as e,C as p,F as h}from"./index-DTYzZzCZ.js";import{T as l}from"./ScheduleData-DJR_ndtC.js";import{S as u}from"./SectionTitle-1aawg2z6.js";import{B as f}from"./Button-wmcB3OTO.js";import{S as b}from"./SEO-D9WLdGPA.js";import{S as g}from"./search-BYZx3Lnw.js";const j=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],k=n("chevron-down",j);const v=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],w=n("chevron-up",v),E=()=>{const[i,c]=r.useState("Day 1"),[a,d]=r.useState(""),[m,x]=r.useState(null),o=(l[i]||[]).filter(t=>t.title.toLowerCase().includes(a.toLowerCase())||t.speaker.toLowerCase().includes(a.toLowerCase())||t.abstract.toLowerCase().includes(a.toLowerCase()));return e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in",children:[e.jsx(b,{title:"Talks & Abstracts | SPiCE 2 Conference",description:"Browse accepted talks and abstracts for the SPiCE 2 conference. Search by speaker, title, or topic.",url:"https://spice-workshop.github.io/talks",children:e.jsx("script",{type:"application/ld+json",children:`
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "itemListElement": [
                  ${Object.values(l).flat().map((t,s)=>`
                    {
                      "@type": "ListItem",
                      "position": ${s+1},
                      "item": {
                        "@type": "EducationalOccupationalCredential",
                        "name": "${t.title.replace(/"/g,'\\"')}",
                        "description": "${t.abstract.replace(/"/g,'\\"').replace(/\n/g," ")}",
                        "credentialCategory": "Conference Talk",
                        "educationalLevel": "Professional",
                        "recognizedBy": {
                          "@type": "Organization",
                          "name": "SPiCE 2 Conference"
                        }
                      }
                    }
                  `).join(",")}
                ]
              }
            `})}),e.jsxs("div",{className:"text-center mb-8",children:[e.jsx(u,{children:"Talks & Abstracts"}),e.jsx("p",{className:"text-slate-600 mt-[-1rem]",children:"Select a day and search to filter scheduled talks."})]}),e.jsx("div",{className:"flex justify-center flex-wrap gap-2 mb-6",children:Object.keys(l).map(t=>e.jsx(f,{onClick:()=>c(t),variant:i===t?"primary":"outline",className:"transition-colors",children:t},t))}),e.jsxs("div",{className:"relative mb-8 max-w-lg mx-auto",children:[e.jsx("input",{type:"text",placeholder:"Search talks...",className:"pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400",value:a,onChange:t=>d(t.target.value)}),e.jsx(g,{className:"w-5 h-5 text-slate-400 absolute left-3 top-3.5"})]}),e.jsx("div",{className:"space-y-3 min-h-[300px]",children:o.length>0?o.map(t=>{const s=m===t.id;return e.jsxs("div",{className:"border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow",children:[e.jsxs("div",{className:"p-4 cursor-pointer flex justify-between items-start bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors",onClick:()=>x(s?null:t.id),children:[e.jsxs("div",{className:"flex-grow",children:[e.jsxs("div",{className:"flex flex-col md:flex-row md:items-center gap-2 mb-1",children:[e.jsx("span",{className:"text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 w-fit",children:t.time}),e.jsx("h4",{className:"font-bold text-lg text-slate-800 dark:text-slate-100",children:t.title})]}),e.jsxs("p",{className:"text-slate-600 dark:text-slate-400 font-medium",children:[t.speaker," ",e.jsxs("span",{className:"text-slate-400 dark:text-slate-500 font-normal",children:["| ",t.affiliation]})]})]}),e.jsx("div",{className:"mt-1 text-indigo-500 ml-4",children:s?e.jsx(w,{size:20}):e.jsx(k,{size:20})})]}),s&&e.jsxs("div",{className:"p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 animate-fade-in",children:[e.jsx("p",{className:"text-slate-700 dark:text-slate-300 leading-relaxed mb-4",children:t.abstract}),e.jsx("div",{className:"flex gap-4",children:e.jsxs("a",{href:p.links.cloudDrive,className:"flex items-center text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline",children:[e.jsx(h,{size:16,className:"mr-2"})," Download Slides"]})})]})]},t.id)}):e.jsx("p",{className:"text-center text-slate-500 italic py-10",children:"No talks found."})})]})};export{E as default};
