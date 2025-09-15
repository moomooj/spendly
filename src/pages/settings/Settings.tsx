import Appearance from "./general/Appearance/Appearance";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* General Section */}
      <h2 className="text-sm font-semibold mb-2">General</h2>

      <section className="bg-white dark:bg-Sly-grey-900 text-Sly-Text dark:text-white rounded-lg p-3 space-y-4 ">
        <Appearance />
      </section>
    </div>
  );
}
