export const LayoutComponents = ({ children }) => (
  <div className="flex min-h-screen w-full items-center justify-center bg-neutral-900 p-4">
    <div className="w-full max-w-[390px] rounded-[10px] bg-neutral-700">{children}</div>
  </div>
);
