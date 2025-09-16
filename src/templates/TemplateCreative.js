export default function TemplateCreative({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="bg-white text-dark rounded shadow-lg overflow-hidden mx-auto position-relative" style={{maxWidth: "80rem"}}>
      {/* Creative Background Pattern */}
      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25">
        <svg width="100%" height="100%" className="position-absolute top-0 start-0">
          <defs>
            <pattern id="creative-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#6366f1"/>
              <rect x="15" y="15" width="10" height="10" fill="none" stroke="#8b5cf6" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#creative-pattern)"/>
        </svg>
      </div>

      {/* Header with Creative Design */}
      <div className="position-relative p-4 p-md-5" style={{background: "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)"}}>
        <div className="position-absolute top-0 end-0 opacity-25" style={{width: "128px", height: "128px"}}>
          <svg viewBox="0 0 100 100" className="w-100 h-100">
            <circle cx="50" cy="50" r="40" fill="white"/>
            <circle cx="30" cy="30" r="8" fill="#6366f1"/>
            <circle cx="70" cy="70" r="8" fill="#8b5cf6"/>
            <circle cx="70" cy="30" r="8" fill="#ec4899"/>
            <circle cx="30" cy="70" r="8" fill="#f59e0b"/>
          </svg>
        </div>

        <div className="d-flex flex-column flex-lg-row align-items-center gap-4 position-relative" style={{zIndex: 10}}>
          {data.photo ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-1">
                <div className="w-32 h-32 bg-white rounded-full"></div>
              </div>
              <img
                src={data.photo || "/placeholder.svg?height=120&width=120&query=profile%20photo"}
                alt="Profile"
                className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          ) : null}

          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">
              {data.name || "Your Name"}
            </h1>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-purple-100">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                {data.email || "Email"}
              </span>
              {data.phone && (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  {data.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {data.summary ? (
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <p className="text-white text-lg leading-relaxed text-center lg:text-left">
              {data.summary}
            </p>
          </div>
        ) : null}
      </div>

      {/* Main Content with Creative Layout */}
      <div className="relative p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Experience Section - Takes up more space */}
          <div className="lg:col-span-8 space-y-6">
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-1">Professional Journey</h2>
                  <p className="text-gray-600">Career highlights and achievements</p>
                </div>
              </div>

              <div className="space-y-6">
                {(data.experiences || []).length ? (
                  data.experiences.map((x, i) => (
                    <div key={i} className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
                      <div className="absolute top-4 left-4 w-4 h-4 bg-blue-500 rounded-full"></div>
                      <div className="absolute top-6 left-6 w-px h-16 bg-blue-300"></div>

                      <div className="ml-12">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                          <h3 className="text-2xl font-bold text-gray-800">{x.title || "Job Title"}</h3>
                          <div className="flex items-center gap-2 mt-2 lg:mt-0">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              {x.duration || "Duration"}
                            </span>
                          </div>
                        </div>
                        <p className="text-lg text-indigo-600 font-semibold mb-3">{x.company || "Company"}</p>
                        {x.description ? (
                          <p className="text-gray-700 leading-relaxed text-lg">{x.description}</p>
                        ) : null}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4" />
                    </svg>
                    <p className="text-gray-500 text-lg">Share your professional experiences to showcase your career path.</p>
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
                    <h2 className="text-3xl font-bold text-gray-800 mb-1">Featured Projects</h2>
                    <p className="text-gray-600">Innovative solutions and creative work</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.projects.map((p, i) => (
                    <div key={i} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 2.25-4.5l.5 1.5 1 2.5 2.25-.5s.5-1.5 0-2.5l-1-1.5c.5 1.5.5 3 0 4.5.879 0 2.5-.5 2.5-.5a3 3 0 01-2.12 2.12z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{p.name || "Project"}</h3>
                      {p.link ? (
                        <a href={p.link} className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium mb-3" target="_blank" rel="noreferrer">
                          <span>View Project</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                        </a>
                      ) : null}
                      {p.description ? (
                        <p className="text-gray-700 leading-relaxed">{p.description}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          {/* Sidebar with Education and Skills */}
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
                  <h2 className="text-3xl font-bold text-gray-800 mb-1">Education</h2>
                  <p className="text-gray-600">Academic achievements</p>
                </div>
              </div>

              <div className="space-y-4">
                {(data.education || []).length ? (
                  data.education.map((e, i) => (
                    <div key={i} className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-5 border border-green-100">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg mb-1">{e.level || "Degree"}</h3>
                          <p className="text-green-700 font-semibold mb-1">{e.organization || "Institution"}</p>
                          <p className="text-gray-600 text-sm">
                            {[e.startDate, e.endDate].filter(Boolean).join(" - ") || "Duration"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-100 text-center">
                    <svg className="w-12 h-12 text-green-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    <p className="text-gray-600">Highlight your educational journey.</p>
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
                    <h2 className="text-3xl font-bold text-gray-800 mb-1">Skills & Expertise</h2>
                    <p className="text-gray-600">Technical and soft skills</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {skills.map((s, i) => (
                    <div key={i} className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-4 border border-orange-200 text-center">
                      <span className="text-orange-800 font-semibold text-sm">{s}</span>
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
