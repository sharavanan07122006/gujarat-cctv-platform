function StatCard({ title, value, description, icon, iconBg }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-2">
            {value}
          </h3>

          <p className="text-xs text-slate-500 mt-2">
            {description}
          </p>
        </div>

        <div className={`p-3 rounded-lg ${iconBg}`}>
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;