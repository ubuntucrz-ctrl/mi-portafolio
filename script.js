const track=document.getElementById('track'),secs=[...track.children],links=document.getElementById('links');
secs.forEach((s,i)=>{const b=document.createElement('button');b.textContent=s.dataset.n;b.onclick=()=>go(i);links.appendChild(b)});
function go(i){track.scrollTo({left:i*track.clientWidth})}
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(+b.dataset.go-1));
function upd(){
  const w=track.clientWidth,i=Math.round(track.scrollLeft/w);
  [...links.children].forEach((b,j)=>b.classList.toggle('on',i===j));
  document.getElementById('bar').style.width=(track.scrollLeft/(track.scrollWidth-w||1))*100+'%';
  if(i===1)document.querySelectorAll('.sk').forEach(s=>s.classList.add('go'));
}
track.addEventListener('scroll',upd,{passive:true});upd();
// la rueda del mouse mueve la página en horizontal
track.addEventListener('wheel',e=>{
  if(Math.abs(e.deltaY)>Math.abs(e.deltaX)&&!e.target.closest('section').matches(':hover.scrollable')){
    const s=e.target.closest('section');
    if(s.scrollHeight>s.clientHeight+2)return;
    e.preventDefault();track.scrollLeft+=e.deltaY;
  }
},{passive:false});
addEventListener('keydown',e=>{
  const i=Math.round(track.scrollLeft/track.clientWidth);
  if(e.key==='ArrowRight')go(Math.min(i+1,secs.length-1));
  if(e.key==='ArrowLeft')go(Math.max(i-1,0));
});
// texto que se escribe solo
const roles=['Desarrolladora de software','Desarrolladora web','Resolviendo problemas con código'];
let r=0,c=0,del=false;const t=document.getElementById('typed');
(function tick(){
  const w=roles[r];t.textContent=w.slice(0,c);
  if(!del&&c===w.length){del=true;return setTimeout(tick,1600)}
  if(del&&c===0){del=false;r=(r+1)%roles.length}
  c+=del?-1:1;setTimeout(tick,del?30:70);
})();
// filtros de proyectos
document.getElementById('filters').addEventListener('click',e=>{
  const b=e.target.closest('.tag');if(!b)return;
  document.querySelectorAll('.tag').forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('#projects .card').forEach(c=>c.style.display=(b.dataset.f==='todos'||c.dataset.t===b.dataset.f)?'':'none');
});
// copiar correo
document.getElementById('copy').onclick=async function(){
  try{await navigator.clipboard.writeText('tucorreo@ejemplo.com');this.textContent='Correo copiado'}catch(e){this.textContent='Copia: tucorreo@ejemplo.com'}
};