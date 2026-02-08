function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".chip").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
}
setActiveNav();

function saveDraft(key, value){
  try{ localStorage.setItem(key, value); }catch(e){}
}
function loadDraft(key){
  try{ return localStorage.getItem(key) || ""; }catch(e){ return ""; }
}

function hookDraft(areaId, storageKey){
  const el = document.getElementById(areaId);
  if(!el) return;
  el.value = loadDraft(storageKey);
  el.addEventListener("input", () => saveDraft(storageKey, el.value));
}

function simpleChecklistScore(rootId){
  const root = document.getElementById(rootId);
  if(!root) return;
  const btn = root.querySelector("[data-score-btn]");
  const out = root.querySelector("[data-score-out]");
  if(!btn || !out) return;

  btn.addEventListener("click", ()=>{
    const checks = [...root.querySelectorAll("input[type=checkbox]")];
    const done = checks.filter(c=>c.checked).length;
    out.textContent = `Отмечено: ${done} из ${checks.length}.`;
  });
}

// Expose helpers
window.TextLab = { hookDraft, simpleChecklistScore };
