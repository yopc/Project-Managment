

import React, { useEffect, useMemo, useState } from 'react';
import { Authenticatioin } from '../NewTraining/Store/AuthenticateUser';
import Profile from '../component/Profile';

const EmployessPage = () => {
  const { employees = [], getAllEmployee, loading, error } = Authenticatioin();

  const [query, setQuery] = useState('');
  const [directorate, setDirectorate] = useState('all');

  useEffect(() => {
    getAllEmployee?.();
  }, []);

  const uniqueDirectorates = useMemo(() => {
    const set = new Set(employees.map(e => e?.Directorate).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [employees]);

  const filtered = useMemo(() => {
    let list = [...employees];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(e =>
        [e?.fullName, e?.email, e?.Directorate, e?.JobTitle, e?.phoneNumber, e?.bio]
          .filter(Boolean)
          .some(v => String(v).toLowerCase().includes(q))
      );
    }

    if (directorate !== 'all') {
      list = list.filter(e => (e?.Directorate || '') === directorate);
    }

    return list;
  }, [employees, query, directorate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">Employees</h1>
             
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search name, email, title..."
                  className="w-full sm:w-80 rounded-lg border border-slate-200 bg-white/80 px-4 py-2.5 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                />
                <span className="absolute right-3 top-2.5 text-slate-400">⌕</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {uniqueDirectorates.map(opt => {
                const active = directorate === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setDirectorate(opt)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition
                      ${active
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                  >
                    {opt === 'all' ? 'All Directorates' : opt}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 text-sm text-slate-600">
              {loading ? 'Loading employees…' : `${filtered.length} result${filtered.length === 1 ? '' : 's'}`}
              {error ? <span className="text-rose-600 ml-2">{String(error)}</span> : null}
            </div>
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200" />
                  <div className="flex-1">
                    <div className="h-4 w-1/2 bg-slate-200 rounded" />
                    <div className="h-3 w-1/3 bg-slate-200 rounded mt-2" />
                  </div>
                </div>
                <div className="h-3 w-3/4 bg-slate-200 rounded mt-4" />
                <div className="h-3 w-2/3 bg-slate-200 rounded mt-2" />
                <div className="h-8 w-24 bg-slate-200 rounded mt-4" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              ☺
            </div>
            <p className="text-slate-800 font-medium">No employees found</p>
            <p className="text-slate-500 text-sm">Try a different search or directorate.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(employee => {
              const key = employee?.id || employee?._id || employee?.email || employee?.phoneNumber;
              const sup = employee?.SupplementaryFile ?? [];
              return (
                <div
                  key={key}
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-slate-300"
                >
                  <div className="flex items-start gap-4">
                    <Profile imageSrc={employee?.profilePicture} styleProp={'w-12 h-12 rounded-full'} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="truncate text-slate-900 font-semibold">{employee?.fullName || 'Unnamed'}</h2>
                      
                      </div>
                      <p className="text-sm text-slate-500 truncate">{employee?.email}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 w-28">Job Title</span>
                      <span className="text-slate-800">{employee?.JobTitle || '-'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 w-28">Phone</span>
                      <span className="text-slate-800">{employee?.phoneNumber || '-'}</span>
                    </div>
                  </div>

                    {employee?.Directorate ? (
                          <span className="ml-auto text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {employee.Directorate}
                          </span>
                        ) : null}

                  {employee?.bio ? (
                    <p className="mt-3 line-clamp-3 text-sm text-slate-600">
                      {employee.bio}
                    </p>
                  ) : (
                    <p className="mt-3 text-sm text-slate-400 italic">No bio provided</p>
                  )}

                  {sup.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {sup.map((file, index) => (
                        <a
                          key={index}
                          className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-100 transition"
                          href={file?.data}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={file?.fileName}
                        >
                          ⬇ {file?.fileName || 'Attachment'}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployessPage;