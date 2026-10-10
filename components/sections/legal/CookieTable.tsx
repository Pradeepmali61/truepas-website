import { cookieCategories } from "@/lib/legal";

// Cookie names and durations are listed in the Third-Party section, so the table only covers categories
const cell = "border-b border-line p-[15px] text-left align-top text-sm leading-[22px]";

export default function CookieTable() {
  return (
    <div tabIndex={0} className="my-1 overflow-x-auto rounded-2xl border border-line shadow-card focus-visible:outline-primary">
      <table className="w-full min-w-[560px] border-collapse bg-white">
        <caption className="sr-only">TruePas cookie categories, purposes and consent status</caption>
        <thead className="bg-sky-50">
          <tr>
            {["Cookie Category", "Purpose", "Required / Optional"].map((h) => (
              <th key={h} scope="col" className={`${cell} font-semibold`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cookieCategories.map((c) => (
            <tr key={c.category}>
              <td className={cell}>{c.category}</td>
              <td className={cell}>{c.purpose}</td>
              <td className={cell}>{c.required}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
