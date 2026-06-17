export default function UserPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">My Profile</h1>
        <p className="text-slate-500 dark:text-slate-400">View and edit your personal information.</p>
      </div>
      
      <div className="max-w-md p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
         <p className="text-slate-500 italic">User details will appear here...</p>
      </div>
    </div>
  );
}