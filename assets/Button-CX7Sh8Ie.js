import{j as c}from"./index-thH317NW.js";const m=({variant:e="primary",size:t="md",fullWidth:s=!1,className:o="",children:r,...n})=>{const a="inline-flex items-center justify-center font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",i={primary:"bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",secondary:"bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500",outline:"border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800",ghost:"text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"},l={sm:"px-3 py-1.5 text-sm",md:"px-4 py-2 text-sm",lg:"px-6 py-3 text-base"},d=s?"w-full":"",b=`
    ${a} 
    ${i[e]} 
    ${l[t]} 
    ${d} 
    ${o}
  `.trim();return c.jsx("button",{className:b,...n,children:r})};export{m as B};
