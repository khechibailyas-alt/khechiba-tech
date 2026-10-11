const fs=require("fs"),path=require("path"),dir=path.join(__dirname,"images");
const ok=/\.(jpe?g|png|webp|avif)$/i,ignore=/^(hero-background|khechiba-shopping-bag|publicite-sacs)$/i;
const files=fs.readdirSync(dir).filter(f=>ok.test(f)&&!ignore.test(path.parse(f).name)),groups=new Map();
for(const file of files){const stem=path.parse(file).name;const m=stem.match(/^(.*?)[-_](front|back|side|inside|interior|detail|zoom|left|right|angle\d*|\d{1,2})$/i);const key=(m?m[1]:stem).toLowerCase();if(!groups.has(key))groups.set(key,{id:key,name:(m?m[1]:stem).replace(/[-_]+/g," "),price:"3500 دج",description:"اسألنا عن الموديل والتوفر",images:[]});groups.get(key).images.push("images/"+file)}
const out=[...groups.values()].map(p=>({...p,images:p.images.sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}))}));
fs.writeFileSync(path.join(__dirname,"products.json"),JSON.stringify(out,null,2),"utf8");console.log(`Catalog generated: ${out.length} products`);
