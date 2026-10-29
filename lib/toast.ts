/* Small status toast. Call from event handlers only. */
let hideTimer: ReturnType<typeof setTimeout> | undefined;

export function toast(msg: string) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.setAttribute('role', 'status');
    t.className = 'fixed left-1/2 -translate-x-1/2 bottom-20 md:bottom-8 z-[70] bg-navy-900 text-white text-sm px-4 py-3 rounded-lg shadow-lift transition duration-300 opacity-0';
    document.body.append(t);
  }
  const el = t;
  el.textContent = msg;
  el.classList.remove('opacity-0');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => el.classList.add('opacity-0'), 2600);
}
