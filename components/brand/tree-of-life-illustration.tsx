export function TreeOfLifeIllustration() {
  return (
    <div
      aria-hidden="true"
      className="racinae-tree-float relative mx-auto aspect-[0.86] w-full max-w-[20rem] min-[360px]:max-w-[23rem]"
    >
      <div className="absolute inset-x-4 bottom-2 h-20 rounded-[100%] bg-primary/10 blur-2xl" />
      <div className="absolute inset-0 rounded-[2.5rem] border border-border/70 bg-card/78 shadow-[var(--shadow-soft)] backdrop-blur-2xl" />
      <div className="absolute inset-3 rounded-[2rem] border border-border/60 bg-background/82 shadow-[inset_0_1px_0_rgb(255_255_255_/_72%)]" />
      <svg
        className="absolute inset-x-0 top-8 mx-auto h-[72%] w-[82%]"
        viewBox="0 0 320 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M160 304C160 244 160 200 160 141"
          stroke="var(--primary)"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          d="M160 224C137 194 117 178 87 168"
          stroke="var(--primary)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M160 200C189 169 217 153 250 145"
          stroke="var(--primary)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M159 174C135 145 110 127 74 116"
          stroke="var(--primary)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M160 154C185 127 210 111 246 101"
          stroke="var(--primary)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M92 138C73 106 46 91 18 92C30 125 54 146 92 138Z"
          fill="var(--life)"
          opacity="0.92"
        />
        <path
          d="M84 181C59 161 34 155 12 164C35 188 59 196 84 181Z"
          fill="var(--accent)"
          opacity="0.84"
        />
        <path
          d="M126 116C113 79 91 58 61 51C65 89 86 113 126 116Z"
          fill="var(--life)"
          opacity="0.76"
        />
        <path
          d="M158 96C168 56 187 31 217 18C222 58 204 88 158 96Z"
          fill="var(--accent)"
          opacity="0.82"
        />
        <path
          d="M221 116C240 83 267 68 296 70C283 103 259 123 221 116Z"
          fill="var(--life)"
          opacity="0.9"
        />
        <path
          d="M236 165C264 142 291 135 316 145C291 172 264 181 236 165Z"
          fill="var(--accent)"
          opacity="0.76"
        />
        <path
          d="M190 82C190 47 203 21 229 0C242 36 231 66 190 82Z"
          fill="var(--life)"
          opacity="0.72"
        />
        <path
          d="M130 82C130 47 117 21 91 0C78 36 89 66 130 82Z"
          fill="var(--accent)"
          opacity="0.68"
        />
        <path
          d="M88 310C114 326 206 326 232 310"
          stroke="var(--accent)"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.78"
        />
      </svg>
      <div className="absolute inset-x-5 bottom-6 rounded-[1.45rem] border border-border/70 bg-card/86 p-4 text-center shadow-[0_18px_45px_rgb(34_34_34_/_8%)] backdrop-blur-xl min-[360px]:inset-x-8 min-[360px]:bottom-8 min-[360px]:p-5">
        <p className="font-heading text-2xl font-semibold leading-none min-[360px]:text-3xl">
          127 souvenirs
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Votre histoire continue de grandir.
        </p>
      </div>
    </div>
  )
}
