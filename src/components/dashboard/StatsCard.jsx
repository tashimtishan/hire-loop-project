const StatsCard = ({ icon, label, value }) => {
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 flex flex-col gap-6">
      <div className="text-gray-400">{icon}</div>
      <div>
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        <p className="text-white text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;