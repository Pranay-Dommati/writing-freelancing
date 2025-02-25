import React from 'react';
import NavigationBar from './Navbar';

const TermsAndConditions = () => {
  return (
    <>
      <NavigationBar />
      <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-lg rounded-lg p-10">
            <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
              Terms and Conditions
            </h1>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Disclaimer
                </h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    The platform does not guarantee any job, assignment, or payment.
                  </li>
                  <li>
                    The company is not responsible for any damages, losses, or conflicts that arise from student interactions.
                  </li>
                  <li>
                    By using this platform, users agree to take full responsibility for their actions.
                  </li>
                  <li>
                    The platform is not responsible for:
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Any disputes, conflicts, or disagreements between students.</li>
                      <li>The quality, accuracy, or originality of completed work.</li>
                      <li>Payments, refunds, or financial agreements between students.</li>
                      <li>Any academic misconduct or violations of institutional policies.</li>
                    </ul>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Platform Usage
                </h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    This website is a student-to-student connection platform where:
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Students can post assignments they need help with.</li>
                      <li>Other students can apply to complete assignments and earn money.</li>
                    </ul>
                  </li>
                  <li>
                    The platform is only meant to connect students in need of help with those willing to assist.
                  </li>
                  <li>
                    The platform is not responsible after students connect with each other—all further interactions are solely between them.
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TermsAndConditions;
