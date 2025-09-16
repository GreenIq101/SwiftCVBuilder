export default function TemplateGradient({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="bg-white rounded overflow-hidden shadow mx-auto position-relative" style={{maxWidth: "96rem"}}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20"></div>

      {/* Floating Shapes */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-white/15 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/25 rounded-full blur-md animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Header Section */}
      <div className="relative p-8 text-white">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {data.photo ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full p-2 animate-spin" style={{animationDuration: '8s'}}>
                <div className="w-32 h-32 bg-white rounded-full"></div>
              </div>
              <img
                src={data.photo || "/placeholder.svg?height=120&width=120&query=profile%20photo"}
                alt="Profile"
                className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full border-4 border-emerald-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          ) : null}

          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-black mb-4 tracking-tight text-white drop-shadow-lg">
              {data.name || "Your Name"}
            </h1>
            <div className="flex flex-col sm:flex-row items-center gap-6 text-emerald-100 text-lg">
              <span className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                {data.email || "Email"}
              </span>
              {data.phone && (
                <span className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  {data.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {data.summary ? (
          <div className="mt-8 bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
            <p className="text-white text-xl leading-relaxed text-center lg:text-left drop-shadow-md">
              {data.summary}
            </p>
          </div>
        ) : null}
      </div>

      {/* Main Content */}
      <div className="relative bg-white p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Column - Experience */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-1">Professional Experience</h2>
                <p className="text-gray-600 text-lg">Career journey and accomplishments</p>
              </div>
            </div>

            <div className="space-y-6">
              {(data.experiences || []).length ? (
                data.experiences.map((x, i) => (
                  <div key={i} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                          <h3 className="text-2xl font-bold text-gray-800">{x.title || "Job Title"}</h3>
                          <span className="text-sm text-emerald-700 font-semibold bg-emerald-100 px-3 py-1 rounded-full mt-2 lg:mt-0">
                            {x.duration || "Duration"}
                          </span>
                        </div>
                        <p className="text-lg text-teal-600 font-semibold mb-3">{x.company || "Company"}</p>
                        {x.description ? (
                          <p className="text-gray-700 leading-relaxed text-lg">{x.description}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 text-center border border-emerald-200">
                  <svg className="w-16 h-16 text-emerald-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4" />
                  </svg>
                  <p className="text-gray-600 text-lg">Share your professional experiences to highlight your career path.</p>
                </div>
              )}
            </div>
          </section>

          {/* Right Column - Education & Skills */}
          <section className="space-y-6">

            {/* Education Section */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-1">Education</h2>
                  <p className="text-gray-600 text-lg">Academic qualifications</p>
                </div>
              </div>

              <div className="space-y-4">
                {(data.education || []).length ? (
                  data.education.map((e, i) => (
                    <div key={i} className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-xl mb-1">{e.level || "Degree"}</h3>
                          <p className="text-cyan-600 font-semibold text-lg mb-1">{e.organization || "Institution"}</p>
                          <p className="text-gray-600">
                            {[e.startDate, e.endDate].filter(Boolean).join(" - ") || "Duration"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 text-center border border-cyan-200">
                    <svg className="w-16 h-16 text-cyan-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    <p className="text-gray-600 text-lg">Add your educational background to showcase your qualifications.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Skills Section */}
            {skills.length ? (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-1">Skills & Expertise</h2>
                    <p className="text-gray-600 text-lg">Technical and professional skills</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {skills.map((s, i) => (
                    <div key={i} className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-5 border border-orange-200 text-center hover:shadow-lg transition-shadow">
                      <span className="text-orange-800 font-bold text-lg">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Projects Section */}
            {(data.projects || []).length ? (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-1">Featured Projects</h2>
                    <p className="text-gray-600 text-lg">Notable work and achievements</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {data.projects.map((p, i) => (
                    <div key={i} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 shadow-sm hover:shadow-lg transition-shadow">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{p.name || "Project"}</h3>
                      {p.link ? (
                        <a href={p.link} className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold mb-3" target="_blank" rel="noreferrer">
                          <span>View Project</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                        </a>
                      ) : null}
                      {p.description ? (
                        <p className="text-gray-700 leading-relaxed text-lg">{p.description}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  )
}
