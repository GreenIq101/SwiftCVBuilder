export default function TemplateDark({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="bg-dark text-white rounded overflow-hidden shadow mx-auto position-relative" style={{maxWidth: "80rem"}}>
      {/* Dark Theme Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="dark-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="#60a5fa"/>
              <circle cx="30" cy="30" r="8" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dark-pattern)"/>
        </svg>
      </div>

      {/* Header with Neon Accents */}
      <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black p-8 border-b border-gray-700">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"></div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {data.photo ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full p-1 animate-pulse">
                <div className="w-28 h-28 bg-gray-800 rounded-full"></div>
              </div>
              <img
                src={data.photo || "/placeholder.svg?height=112&width=112&query=profile%20photo"}
                alt="Profile"
                className="relative w-28 h-28 rounded-full object-cover border-2 border-gray-700"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-4 border-gray-900 animate-pulse"></div>
            </div>
          ) : null}

          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-black mb-3 tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {data.name || "Your Name"}
            </h1>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-300">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                {data.email || "Email"}
              </span>
              {data.phone && (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  {data.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {data.summary ? (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <p className="text-gray-200 text-lg leading-relaxed text-center lg:text-left">
              {data.summary}
            </p>
          </div>
        ) : null}
      </div>

      {/* Main Content */}
      <div className="relative p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Experience Section */}
          <div className="lg:col-span-8 space-y-6">
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">Professional Experience</h2>
                  <p className="text-gray-400">Career journey and achievements</p>
                </div>
              </div>

              <div className="space-y-6">
                {(data.experiences || []).length ? (
                  data.experiences.map((x, i) => (
                    <div key={i} className="relative bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 border border-gray-600 hover:border-cyan-400/50 transition-colors">
                      <div className="absolute top-4 left-4 w-4 h-4 bg-cyan-400 rounded-full shadow-lg"></div>
                      <div className="absolute top-6 left-6 w-px h-16 bg-gradient-to-b from-cyan-400 to-transparent"></div>

                      <div className="ml-12">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                          <h3 className="text-2xl font-bold text-white">{x.title || "Job Title"}</h3>
                          <div className="flex items-center gap-2 mt-2 lg:mt-0">
                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-400/30">
                              {x.duration || "Duration"}
                            </span>
                          </div>
                        </div>
                        <p className="text-lg text-blue-300 font-semibold mb-3">{x.company || "Company"}</p>
                        {x.description ? (
                          <p className="text-gray-300 leading-relaxed text-lg">{x.description}</p>
                        ) : null}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-800/50 rounded-2xl p-8 text-center border border-gray-600">
                    <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4" />
                    </svg>
                    <p className="text-gray-400 text-lg">Showcase your professional journey here.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Projects Section */}
            {(data.projects || []).length ? (
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">Featured Projects</h2>
                    <p className="text-gray-400">Innovative work and solutions</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.projects.map((p, i) => (
                    <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 border border-gray-600 hover:border-purple-400/50 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{p.name || "Project"}</h3>
                      {p.link ? (
                        <a href={p.link} className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium mb-3 transition-colors" target="_blank" rel="noreferrer">
                          <span>View Project</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                        </a>
                      ) : null}
                      {p.description ? (
                        <p className="text-gray-300 leading-relaxed">{p.description}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">

            {/* Education Section */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">Education</h2>
                  <p className="text-gray-400">Academic background</p>
                </div>
              </div>

              <div className="space-y-4">
                {(data.education || []).length ? (
                  data.education.map((e, i) => (
                    <div key={i} className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-5 border border-gray-600">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg mb-1">{e.level || "Degree"}</h3>
                          <p className="text-green-300 font-semibold mb-1">{e.organization || "Institution"}</p>
                          <p className="text-gray-400 text-sm">
                            {[e.startDate, e.endDate].filter(Boolean).join(" - ") || "Duration"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 text-center">
                    <svg className="w-12 h-12 text-green-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    <p className="text-gray-400">Add your educational achievements.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Skills Section */}
            {skills.length ? (
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">Skills & Expertise</h2>
                    <p className="text-gray-400">Technical proficiencies</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {skills.map((s, i) => (
                    <div key={i} className="bg-gradient-to-br from-orange-900/50 to-red-900/50 rounded-xl p-4 border border-orange-500/30 text-center backdrop-blur-sm">
                      <span className="text-orange-200 font-semibold text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
