import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, User as AdminIcon, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

interface Props {
  setIsAdminLoggedIn: (val: boolean) => void;
}

const AdminLogin: React.FC<Props> = ({ setIsAdminLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulated Admin Check (Replace with Firebase Auth logic)
    setTimeout(() => {
      if (username === 'admin' && password === 'admin@123') {
        setIsAdminLoggedIn(true);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid Admin Credentials!');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#00008B] flex flex-col items-center justify-center p-6 font-inter">
      <div className="w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl animate-fadeIn relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
        
        <div className="text-center mb-10 relative z-10">
          <div className="w-20 h-20 bg-[#00008B] rounded-[1.8rem] flex items-center justify-center mx-auto mb-4 shadow-lg">
             <ShieldCheck size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Admin Gateway</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Authorized Access Only</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 p-4 rounded-2xl flex items-center gap-3 border border-red-100 text-red-600 animate-shake">
            <AlertCircle size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="relative group">
            <AdminIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#00008B] transition-colors" size={20} />
            <input 
              required
              type="text" 
              placeholder="Username" 
              className="w-full bg-gray-50 p-5 pl-12 rounded-2xl font-bold border border-gray-100 outline-none focus:bg-white focus:border-blue-200 transition-all text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#00008B] transition-colors" size={20} />
            <input 
              required
              type="password" 
              placeholder="Password" 
              className="w-full bg-gray-50 p-5 pl-12 rounded-2xl font-bold border border-gray-100 outline-none focus:bg-white focus:border-blue-200 transition-all text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#00008B] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Enter Dashboard'}
            {!loading && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.4em]">Secure Encryption Active</p>
        </div>
      </div>
      
      <button onClick={() => navigate('/')} className="mt-8 text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
        Back to Website
      </button>
    </div>
  );
};

export default AdminLogin;

