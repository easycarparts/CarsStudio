import { useRef } from "react";

type Opt = { label: string; value?: string };

export default function AutoInput({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  inputMode,
  autoComplete = "off",
}: {
  id: string;
  label: string;
  placeholder?: string;
  options: Opt[];
  value?: string;
  onChange: (v: string) => void;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const onFocus = () => {
    // keep the field visible above the keyboard
    setTimeout(() => ref.current?.scrollIntoView({ block: "center", behavior: "smooth" }), 50);
  };

  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-1 block text-sm text-zinc-300">{label}</label>
      <input
        ref={ref}
        id={id}
        list={`${id}-list`}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900/70 px-3 py-3 text-zinc-100 placeholder-zinc-400 outline-none focus:border-zinc-400"
      />
      <datalist id={`${id}-list`}>
        {options.map((o) => (
          <option key={o.value ?? o.label} value={o.value ?? o.label}>{o.label}</option>
        ))}
      </datalist>
    </div>
  );
}


