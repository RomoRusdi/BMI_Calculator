const VARIANTS = {
  lime: 'sticker bg-lime text-ink active:translate-x-[3px] active:translate-y-[3px] active:sticker-pressed',
  ghost: 'text-white hover:text-lime active:scale-95',
}

export default function Button({ variant = 'lime', className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex select-none items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold uppercase tracking-[0.06em] transition-[transform,box-shadow,color] duration-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  )
}
