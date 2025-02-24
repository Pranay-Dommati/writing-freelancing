import React from 'react';
import NavigationBar from './Navbar';
import '../styles/about-page.css';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* About Section */}
          <section className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-12 -mt-14 pb-12 text-center relative z-10">
                About FreelanceWriting
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-gray-600 leading-relaxed text-center">
                  FreelanceWriting connects college students who need writing assistance 
                  with student writers. Our platform facilitates seamless 
                  collaboration while providing opportunities for students to earn through writing.
                </p>
              </div>
            </div>

            {/* How It Works Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">
                How It Works
              </h2>

              {/* Cards Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Card 1: For Students */}
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                  <div className="flex justify-center mb-6">
                    <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-500">
                      <path 
                        fill="currentColor"
                        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
                      />
                      <path 
                        fill="currentColor"
                        d="M7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 text-center mb-4">
                    For Students Needing Writing Help
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Post your writing assignment details',
                      'Set your budget per page',
                      'Get matched with skilled writers',
                      'Receive an email with writer details'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card 2: For Writers */}
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                  <div className="flex justify-center mb-6">
                    <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-500">
                      <path 
                        fill="currentColor"
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 text-center mb-4">
                    For Student Writers
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Browse available writing opportunities',
                      'Choose assignments that match your expertise',
                      'Apply with your preferred contact method',
                      'Connect and earn by writing'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
