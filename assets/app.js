function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".chip").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });
}
setActiveNav();

/* ====== Черновики ====== */
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

/* ====== Отправка учителю ====== */
function sendToTeacher(grade, topic, textareaId){
  const text = document.getElementById(textareaId)?.value || "";
  if(!text.trim()){
    alert("Сначала напиши ответ.");
    return;
  }
  const entry = {
    id: Date.now(),
    grade,
    topic,
    text,
    score: "",
    reflection: "",
    date: new Date().toLocaleString()
  };
  const all = JSON.parse(localStorage.getItem("textlab_results") || "[]");
  all.push(entry);
  localStorage.setItem("textlab_results", JSON.stringify(all));
  alert("Работа отправлена учителю.");
}

/* ====== Чек-листы ====== */
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

window.TextLab = { hookDraft, simpleChecklistScore, sendToTeacher };
