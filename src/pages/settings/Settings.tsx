import Appearance from "./general/Appearance/Appearance";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* General Section */}
      <h2 className="text-sm font-semibold text-gray-500 mb-2">General</h2>

      <section className="bg-white rounded-lg shadow p-3 space-y-4 ">
        <Appearance />
      </section>
    </div>
  );
}
