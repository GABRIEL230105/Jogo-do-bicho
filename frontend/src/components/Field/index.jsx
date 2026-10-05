// Input com label flutuante e linha em gradiente (substitui .wrap-input / .focus-input)
export const Field = ({ label, value, onChange, type = "text" }) => (
  <div className="relative mb-9 border-b-2 border-neutral-400">
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="peer block h-11 w-full bg-transparent px-1 text-[15px] text-white outline-none"
    />
    <span className="pointer-events-none absolute left-0 top-4 pl-1 text-[15px] text-neutral-500 transition-all duration-300 peer-focus:-top-4 peer-[:not(:placeholder-shown)]:-top-4">
      {label}
    </span>
    <span className="pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-0 bg-gradient-to-l from-cyan-400 to-fuchsia-600 transition-all duration-300 peer-focus:w-full peer-[:not(:placeholder-shown)]:w-full" />
  </div>
);
